import { log } from "console";
import mongoose from "mongoose";

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

const Community = mongoose.models.Community || mongoose.model("Community");

const Community1 = mongoose.models.Community ?mongoose.models.Community : mongoose.model("Community");

log(Community, Community1)
export default Community