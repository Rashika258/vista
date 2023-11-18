import { log } from 'console';
import mongoose from 'mongoose';

export async function connectToDataBase() {

    try {
        const res = await mongoose.connect("mongodb://localhost:27017");
        console.log(res);
        
    }
    catch(e) {
log(e);

    }
}




