import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        trim: true,
        minlength: [3, "El nombre de la nota debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre de la nota no puede exceder los 50 caracteres"]
    },
    tipo: {
        type: String,
        required: [true, "El tipo de nota es obligatorio"], 
        trim: true,
        minlength: [3, "El tipo de nota debe tener al menos 3 caracteres"],
        maxlength: [20, "El tipo de nota no puede exceder los 50 caracteres"]
    },
    valor: {
        type: Number,
        required: [true, "El valor de la nota es obligatorio"],
        min: [0, "El valor de la nota no puede ser negativo"],
        max: [10, "El valor de la nota no puede exceder 10"]
    },  
    fecha: {
        type: Date,
        required: [true, "La fecha de la nota es obligatoria"]
    },
    idActividad: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Actividad"
    },
    idEvaluacion: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Evaluacion"
    },
    idMateria: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Materia"
    },
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Alumno",
        required: [true, "El alumno es obligatorio"]
    }
});

export default mongoose.model("Nota", notaSchema);
