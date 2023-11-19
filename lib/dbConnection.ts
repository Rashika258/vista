import mongoose, { ConnectOptions } from 'mongoose';
import { log } from 'console';

let isConnectedToDB = false;

export async function connectToDataBase() {
    if (isConnectedToDB) {
        log("Mongo DB Connection already established");
        return;
    }

    try {
        await mongoose.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        } as ConnectOptions);

        // Listen for the connected event
        mongoose.connection.once('connected', () => {
            isConnectedToDB = true;
            log("Mongo DB Connected");
        });

        // Listen for the error event
        mongoose.connection.on('error', (err) => {
            log(`Mongo DB Connection Error: ${err}`);
            // Optionally, you might want to throw an error here if it's a critical connection error
        });

        // Listen for the disconnected event
        mongoose.connection.on('disconnected', () => {
            isConnectedToDB = false;
            log("Mongo DB Disconnected");
        });

        // Listen for the SIGINT event (Ctrl+C in the console)
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    } catch (error) {
        log(`Error connecting to MongoDB: ${error}`);
        
        if (error instanceof mongoose.Error) {
            // Mongoose-specific errors
            if (error.name === 'ValidationError') {
                log('Mongoose Validation Error:', error.message);
                // Handle validation errors, possibly log or throw them
            }
        }

        throw error; // Propagate the error to the caller
    }
}
