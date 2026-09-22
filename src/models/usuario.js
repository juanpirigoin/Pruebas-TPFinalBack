import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: [true, "El email ya está registrado"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: [["padre", "alumno", "docente", "administrativo"], "El rol es obligatorio"],
    },
    //solo aplica a los padres, para poder filtrar a los alumnos que son hijos de ese padre
    id_alumno: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "El id del alumno es obligatorio"],
        ref: "Alumno"
    },
    //solo aplica a los docentes, para poder filtrar a los cursos que dicta ese docente
    id_curso: {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, "El id del curso es obligatorio"],
        ref: "Curso"
    }
});

export default mongoose.model("Usuario", usuarioSchema);