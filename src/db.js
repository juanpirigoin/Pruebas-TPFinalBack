import mongoose from "mongoose";
import { MONGO_URI } from "./utils/config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log( `MongoDB conectado . base "${mongoose.connection.name}"`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos:`, error);
        process.exit(1);
    }
}

export default connectDB;