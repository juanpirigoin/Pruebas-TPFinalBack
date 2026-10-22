import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { ROLES } from "../utils/constants.js"


const VUELTAS = 10

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minLength: [3, "El nombre necesita al menos 3 caracteres"],
        maxLength: [100, "El nombre no puede ser mayor a 100 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        minLength: [3, "El apellido necesita al menos 3 caracteres"],
        maxLength: [100, "El apellido no puede ser mayor a 100 caracteres"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "El email no es válido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        trim: true,
        select: false   //hay que poner esto para que no muestre la contraseña al hacer .find() o .findById() 
        //de esta manera hay que usar select("+password") para que se muestre en los controladores que lo necesiten, como el login
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: Object.values(ROLES)
    },
    //solo aplica a alumnos o los padres, para poder filtrar a los alumnos que son hijos de ese padre
    idAlumno: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Alumno"
    },
    //solo aplica a los docentes, para poder filtrar a las materias que dicta ese docente
    idMateria: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Materia"
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password
            return ret
        }
    }
});


usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) return
        this.password = await bcrypt.hash(this.password, VUELTAS)
})

usuarioSchema.methods.compararPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("Usuario", usuarioSchema);