import { listarActividadService, obtenerActividadPorIdService, crearActividadService, actualizarActividadService, eliminarActividadService } from '../services/actividadService.js'

export const listarActividadController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const actividades = await listarActividadService(req.query);
    res.status(200).json(actividades);
}


export const obtenerActividadPorIdController = async (req, res) => {
    const actividad = await obtenerActividadPorIdService(req.params.id);
    if (!actividad) {
        return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.status(200).json(actividad);
}

export const crearActividadController = async (req, res) => {
    const nuevaActividad = await crearActividadService(req.body);
    res.status(201).json(nuevaActividad);
}

export const actualizarActividadController = async (req, res) => {
    const actividadActualizada = await actualizarActividadService(req.params.id, req.body);

    if (!actividadActualizada) {
        return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.status(200).json(actividadActualizada);
}   

export const eliminarActividadController = async (req, res) => {
    const actividadEliminada = await eliminarActividadService(req.params.id);
    if (!actividadEliminada) {
        return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.status(200).json({ message: "Actividad eliminada correctamente" });
}