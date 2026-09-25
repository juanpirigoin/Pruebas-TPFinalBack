import mongoose from "mongoose";

const unidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la unidad es obligatorio"],
        trim: true,
        minlength: [3, "El nombre de la unidad  debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre de la unidad no puede exceder los 50 caracteres"]
    },
    descripcion: {
        type: String,
        trim: true,
        minlength: [3, "La descripción de la unidad debe tener al menos 3 caracteres"],
        maxlength: [300, "La descripción de la unidad no puede exceder los 300 caracteres"]
    },
    idMateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
        required: [true, "La materia es obligatoria"]
    }   
});

export default mongoose.model("Unidad", unidadSchema);