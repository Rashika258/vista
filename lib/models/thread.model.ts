import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";


export interface IThread {
    threadText: string;
    author: Schema.Types.ObjectId | IUser;
    community?: Schema.Types.ObjectId;
    createdAt?: Date;
    parentId?: string;
    children?: Schema.Types.ObjectId[] | IThread[];
}

export interface IThreadDocument extends Omit<IThread, 'children'>, Document {}

const threadSchema = new mongoose.Schema({
    threadText:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Community"
    },
    createdAt :{
        type: Date,
        default: Date.now
    },
    parentId:{
        type: String
    },
    children:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Thread"
        }
    ]
})

const Thread = mongoose.models.Thread || mongoose.model<IThreadDocument>("Thread", threadSchema);
export default Thread;