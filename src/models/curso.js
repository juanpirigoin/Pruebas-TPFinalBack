import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del curso es obligatorio"],
        trim: true,
    },
    nivel: {
        type: String,
        required: [true, "El nivel del curso es obligatorio"],
    },
    turno: {
        type: String,
        required: [true, "El turno del curso es obligatorio"],
    }
});

export default mongoose.model("Curso", cursoSchema);