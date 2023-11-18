import { log } from "console";
import mongoose, { Types } from "mongoose";
import { IUser } from "./user.model";
import { IThread } from "./thread.model";

export interface ICommunity {
    id: string;
    username: string;
    name: string;
    image?: string;
    bio?: string;
    createdBy: Types.ObjectId | IUser; // Assuming IUser is an interface for the User model
    threads: Types.ObjectId[] | IThread[]; // Assuming IThread is an interface for the Thread model
    members: Types.ObjectId[] | IUser[]; // Assuming IUser is an interface for the User model
}

export interface ICommunityDocument extends ICommunity, Document {}

const communitySchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image: String,
    bio: String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    threads:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        },
    ],
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

})

const Community = mongoose.models.Community || mongoose.model<ICommunityDocument>("Community", communitySchema);

const Community1 = mongoose.models.Community ?mongoose.models.Community : mongoose.model("Community", communitySchema);

log(Community, Community1)
export default Community