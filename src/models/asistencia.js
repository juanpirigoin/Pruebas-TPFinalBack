import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumno",
        required: [true, "El alumno es obligatorio"]
    },
    fecha: {
        type: Date,
        required: [true, "La fecha de la asistencia es obligatoria"]
    },
    estado: {
        type: String,
        required: [true, "El estado de la asistencia es obligatorio"],
        trim: true,
        
        
        enum: {
            values: ["presente", "ausente", "tarde"],
            message: "El estado de la asistencia debe ser 'presente', 'ausente' o 'tarde'"
        }
    }
});

export default mongoose.model("Asistencia", asistenciaSchema);