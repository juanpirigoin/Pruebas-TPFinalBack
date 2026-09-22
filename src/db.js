import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/escuela";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log( `MongoDB conectado . base "${mongoose.connection.name}"`);
    } catch (error) {
        console.error(`Error al conectar a la base de datos:`, error);
        process.exit(1);
    }
}
