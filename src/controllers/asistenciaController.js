import { listarAsistenciaService, obtenerAsistenciaPorIdService, crearAsistenciaService, actualizarAsistenciaService, eliminarAsistenciaService } from '../services/asistenciaService.js'

export const listarAsistenciaController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const asistencias = await listarAsistenciaService(req.usuario, req.query);
    res.status(200).json(asistencias);
}

export const obtenerAsistenciaPorIdController = async (req, res) => {
    const asistencia = await obtenerAsistenciaPorIdService(req.params.id, req.usuario);
    if (!asistencia) {
        return res.status(404).json({ error: "Asistencia no encontrada" });
    }
    res.status(200).json(asistencia);
}

export const crearAsistenciaController = async (req, res) => {
    const nuevaAsistencia = await crearAsistenciaService(req.body);
    res.status(201).json(nuevaAsistencia);
}

export const actualizarAsistenciaController = async (req, res) => {
    const asistenciaActualizada = await actualizarAsistenciaService(req.params.id, req.body);

    if (!asistenciaActualizada) {
        return res.status(404).json({ error: "Asistencia no encontrada" });
    }
    res.status(200).json(asistenciaActualizada);
}   

export const eliminarAsistenciaController = async (req, res) => {
    const asistenciaEliminada = await eliminarAsistenciaService(req.params.id);
    if (!asistenciaEliminada) {
        return res.status(404).json({ error: "Asistencia no encontrada" });
    }
    res.status(200).json({ message: "Asistencia eliminada correctamente" });
}
