import { FilterQuery, SortOrder } from "mongoose";
import { connectToDataBase } from "../dbConnection";
import Community, { ICommunity } from "../models/community.model";
import Thread from "../models/thread.model";
import User, { IUserDocument } from "../models/user.model";

export async function fetchUser(userId: string): Promise<IUserDocument | null> {
  try {
    await connectToDataBase();

    const user = await User.findOne<IUserDocument>({ id: userId })
      .populate({
        path: "communities",
        model: Community,
      })
      .exec();

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser({
  id,
  bio,
  name,
  userName, // Use the consistent field name
  image, // path, // Assuming you use path later
}: IUserDocument): Promise<void> {
  try {
    await connectToDataBase();

    await User.findOneAndUpdate(
      { id },
      {
        userName: userName.toLowerCase(), // Ensure consistent use of field names
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    // Uncomment the following if block if you have a revalidatePath function and want to call it based on a condition.
    // if (path === "/profile/edit") {
    //     revalidatePath(path);
    // }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }
  }
}

export async function fetchUserPosts(
  userId: string
): Promise<IUserDocument | null> {
  try {
    await connectToDataBase();

    // Find the user with the given userId
    const user = await User.findOne({ id: userId });

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return null; // or handle this case as needed
    }

    // Populate the 'community' field

    await user.populate([
      {
        path: "community",
        model: Community,
        select: "name id image _id",
      },
      {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    ]);
    // await user.populate({
    //     path: 'community',
    //     model: Community,
    //     select: 'name id image _id',
    // }).execPopulate();

    // // Populate the 'children' field and nested 'author' field
    // await user.populate({
    //     path: 'children',
    //     model: Thread,
    //     populate: {
    //         path: 'author',
    //         model: User,
    //         select: 'name image id',
    //     },
    // }).execPopulate();

    // The 'user' object now has populated 'community' and 'children' fields
    return user as IUserDocument; // Casting to IUserDocument for correct return type
  } catch (error) {
    console.error("Error fetching user posts:", error);
    // Handle the error or throw an exception based on your application's requirements
    throw error;
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDataBase();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: {
        $ne: userId,
      },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          username: {
            $regex: regex,
          },
        },
        {
          name: {
            $regex: regex,
          },
        },
      ];
    }

    const sortOptions = {
      createdAt: sortBy,
    };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await userQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    // throw error;

    // You can log additional information or customize error messages based on the specific error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    } else {
      throw new Error("Failed to fetch users. Unknown error.");
    }
  }
}

export async function getActivity(userId: string) {
  try {
    await connectToDataBase();
    const userThreads = await Thread.find({
      author: userId,
    });

    const childThreadIds = userThreads.reduce(
      async (accPromise, userThread) => {
        const acc = await accPromise;
        return acc.concat(userThread.children);
      },
      Promise.resolve([])
    );

    const replies = await Thread.find({
      _id: { $in: await childThreadIds },
      author: {
        $ne: userId,
      },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
