import mongoose from 'mongoose'
import Usuario from '../models/usuario.js'
import Alumno from '../models/alumno.js'
import Curso from '../models/curso.js'
import { ErrorApp } from '../utils/ErrorApp.js'

//Get all usuarios
export const listarUsuarioService = async ({ rol } = {}) => {
    const filtro = {};
    if (rol) {
        filtro.rol = rol.trim();
    }
    return await Usuario.find(filtro).populate("idAlumno", "nombre apellido").populate("idCurso", "nombre nivel turno");
}

//Get usuario por id
export const obtenerUsuarioPorIdService = async (id) => {
    return await Usuario.findById(id);
}

//Create usuario
export const crearUsuarioService = async (usuarioData) => {
    
    try {
        const nuevoUsuario = await Usuario.create(usuarioData);
        return nuevoUsuario;
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`El email: ${usuarioData.email} ya existe`);
        } else {
            throw new ErrorApp(`Error al crear el usuario: ${error.message}`);
        }
    }
}

// Verificar existencia del usuario
export const verificarUsuarioService = async (id) => {
   const existe = await Usuario.exists({_id: id})
   if(!existe){
    throw new ErrorApp(`No existe ningun usuario con el id ${id}`, 404)
   }
}


// buscar el usuario por email con password
// busca por email y trae la contraseña
// es el unico lugar donde se pide la contraseña
export const buscarPorEmailConPasswordService = async (email = "") => {
    // .select("+password") mitiga el select:false del modelo de usuario
    return await Usuario.findOne({ email: email.toLowerCase().trim() }).select("+password")
}

//export con datos publicos de usuarios
export const datosPublicosUsuario = (usuario) => ({
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    rol: usuario.rol
})


//Update usuario
export const actualizarUsuarioService = async (id, usuarioData) => {
    try {
        return await Usuario.findByIdAndUpdate(
            { _id: id },
            usuarioData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`El email: ${usuarioData.email} ya existe`);
        } else {
            throw new ErrorApp(`Error al actualizar el usuario: ${error.message}`);
        }
    }
}

//Delete usuario
export const eliminarUsuarioService = async (id) => {
    try {
        return await Usuario.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar el usuario: ${error.message}`);
    }
}
