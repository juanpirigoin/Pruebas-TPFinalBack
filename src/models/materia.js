import mongoose from "mongoose";

const materiaSchema = new mongoose.Schema({
    nombreMateria: {
        type: String,
        required: [true, "El nombre de la materia es obligatorio"],
        trim: true,
        minlength: [3, "El nombre de la materia debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre de la materia no puede exceder los 50 caracteres"]
    },
    area: {
        type: String,
        required: [true, "El área de la materia es obligatoria"],       
        trim: true,
        minlength: [3, "El área de la materia debe tener al menos 3 caracteres"],
        maxlength: [50, "El área de la materia no puede exceder los 50 caracteres"]
    },
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curso",
        required: [true, "El curso es obligatorio"]
    }   
});

export default mongoose.model("Materia", materiaSchema);