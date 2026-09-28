import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["padre", "alumno", "docente", "administrativo"]
    },
    //solo aplica a los padres, para poder filtrar a los alumnos que son hijos de ese padre
    idAlumno: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Alumno"
    },
    //solo aplica a los docentes, para poder filtrar a los cursos que dicta ese docente
    idCurso: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Curso"
    }
});

export default mongoose.model("Usuario", usuarioSchema);