import mongoose from "mongoose";

const evaluacionSchema = new mongoose.Schema({
    nombreEvaluacion: {
        type: String,
        required: [true, "El nombre de la evaluación es obligatorio"],  
        trim: true,
        minlength: [3, "El nombre de la evaluación debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre de la evaluación no puede exceder los 50 caracteres"]
    },
    tipo: {
        type: String,
        required: [true, "El tipo de evaluación es obligatorio"],
        trim: true,
        minlength: [3, "El tipo de evaluación debe tener al menos 3 caracteres"],
        maxlength: [20, "El tipo de evaluación no puede exceder los 50 caracteres"]
    },
    fechaEvaluacion: {
        type: Date,
        required: [true, "La fecha de la evaluación es obligatoria"]
    },
    id_unidad: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Unidad",
        required: [true, "La unidad es obligatoria"]
    }   
});

export default mongoose.model("Evaluacion", evaluacionSchema);