import { listarUnidadService, obtenerUnidadPorIdService, crearUnidadService, actualizarUnidadService, eliminarUnidadService } from '../services/unidadService.js'

export const listarUnidadController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const unidades = await listarUnidadService(req.usuario, req.query);
    res.status(200).json(unidades);
}

export const obtenerUnidadPorIdController = async (req, res) => {
    const unidad = await obtenerUnidadPorIdService(req.params.id, req.usuario);
    if (!unidad) {
        return res.status(404).json({ error: "Unidad no encontrada" });
    }
    res.status(200).json(unidad);
}

export const crearUnidadController = async (req, res) => {
    const nuevaUnidad = await crearUnidadService(req.body, req.usuario);
    res.status(201).json(nuevaUnidad);
}

export const actualizarUnidadController = async (req, res) => {
    const unidadActualizada = await actualizarUnidadService(req.params.id, req.body, req.usuario);

    if (!unidadActualizada) {
        return res.status(404).json({ error: "Unidad no encontrada" });
    }
    res.status(200).json(unidadActualizada);
}   

export const eliminarUnidadController = async (req, res) => {
    const unidadEliminada = await eliminarUnidadService(req.params.id, req.usuario);
    if (!unidadEliminada) {
        return res.status(404).json({ error: "Unidad no encontrada" });
    }
    res.status(200).json({ message: "Unidad eliminada correctamente" });
}
