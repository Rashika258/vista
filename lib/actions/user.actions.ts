import { connectToDataBase } from "../dbConnection";
import Community, { ICommunity } from "../models/community.model";
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
    image,
    // path, // Assuming you use path later
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


export async function fetchUserPosts(userId: String) {
    try {
        await connectToDataBase();

    }catch(error) {

    }
}