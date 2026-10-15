import { listarUsuarioService, obtenerUsuarioPorIdService, crearUsuarioService, actualizarUsuarioService, eliminarUsuarioService } from '../services/usuarioService.js'

export const listarUsuarioController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const usuarios = await listarUsuarioService(req.query);
    res.status(200).json(usuarios);
}


export const obtenerUsuarioPorIdController = async (req, res) => {
    const usuario = await obtenerUsuarioPorIdService(req.params.id);
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
}

export const crearUsuarioController = async (req, res) => {
    const nuevoUsuario = await crearUsuarioService(req.body);
    res.status(201).json(nuevoUsuario);
}

export const actualizarUsuarioController = async (req, res) => {
    const usuarioActualizado = await actualizarUsuarioService(req.params.id, req.body);

    if (!usuarioActualizado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuarioActualizado);
}   

export const eliminarUsuarioController = async (req, res) => {
    const usuarioEliminado = await eliminarUsuarioService(req.params.id);
    if (!usuarioEliminado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
}
