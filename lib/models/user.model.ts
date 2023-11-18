import mongoose, { Types } from "mongoose";
import { IThread } from "./thread.model";
import { ICommunity } from "./community.model";

export interface IUser {
    id: string;
    userName: string;
    name: string;
    image?: string;
    bio?: string;
    threads: Types.ObjectId[] | IThread[]; // Adjust based on your Thread model
    onboarded: boolean;
    communities: Types.ObjectId[] | ICommunity[]; // Adjust based on your Community model
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>({
    id:{
        type: String,
        required: true
    },
    userName:{
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
     threads:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        }
     ],
     onboarded:{
        type: Boolean,
        default: false
     },
     communities:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Community"
        }
     ]
});

const User = (mongoose.models.User as mongoose.Model<IUserDocument>) || mongoose.model('User', userSchema);

export default User;


