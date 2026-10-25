import Usuario from "../models/usuario.js"
import { ErrorApp } from "../utils/ErrorApp.js"

export const cargarUsuario = async (req, res, next) => {
    // 1. Buscamos al usuario en la base de datos usando el id que dejó verificarToken
    const usuario = await Usuario.findById(req.usuario.id)
    // 2. Si el usuario fue eliminado de la base de datos, rechazamos la petición
    if (!usuario) {
        throw new ErrorApp("El usuario del token ya no existe", 401)
    }
    // 3. Sobrescribimos req.usuario con el usuario completo (con idAlumno, idMateria, etc.)
    req.usuario = usuario
    next()
}