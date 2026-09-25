import mongoose from "mongoose";

const actividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la actividad es obligatorio"],  
        trim: true,
        minlength: [3, "El nombre de la actividad debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre de la actividad no puede exceder los 50 caracteres"]
    },
    tipo: {
        type: String,
        required: [true, "El tipo de actividad es obligatorio"],
        trim: true,
        minlength: [3, "El tipo de actividad debe tener al menos 3 caracteres"],
        maxlength: [20, "El tipo de actividad no puede exceder los 50 caracteres"]
    },
    fecha: {
        type: Date,
        required: [true, "La fecha de la actividad es obligatoria"]
    },
    idUnidad: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Unidad",
        required: [true, "La unidad es obligatoria"]
    }   
});

export default mongoose.model("Actividad", actividadSchema);