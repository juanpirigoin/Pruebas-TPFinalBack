import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre no puede exceder los 50 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        minlength: [3, "El apellido debe tener al menos 3 caracteres"],
        maxlength: [50, "El apellido no puede exceder los 50 caracteres"]
    },
    dni: {
        type: String,
        required: [true, "El DNI es obligatorio"],
        unique: [true, "El DNI ya está registrado"],
        trim: true,
        minlength: [8, "El DNI debe tener al menos 8 caracteres"],
        maxlength: [10, "El DNI no puede exceder los 10 caracteres"]
    },

    //este campo no esta definido en el diagrama de la base de datos, pero lo agrego para poder filtrar por edad
    
   fechaNacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"],     
    },

    //ver este campo si se pone asi

    idCurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curso",
        required: [true, "El curso es obligatorio"]
    }
});

export default mongoose.model("Alumno", alumnoSchema);