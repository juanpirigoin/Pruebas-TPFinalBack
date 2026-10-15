import { listarEvaluacionService, obtenerEvaluacionPorIdService, crearEvaluacionService, actualizarEvaluacionService, eliminarEvaluacionService } from '../services/evaluacionService.js'

export const listarEvaluacionController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const evaluaciones = await listarEvaluacionService(req.query);
    res.status(200).json(evaluaciones);
}


export const obtenerEvaluacionPorIdController = async (req, res) => {
    const evaluacion = await obtenerEvaluacionPorIdService(req.params.id);
    if (!evaluacion) {
        return res.status(404).json({ error: "Evaluación no encontrada" });
    }
    res.status(200).json(evaluacion);
}

export const crearEvaluacionController = async (req, res) => {
    const nuevaEvaluacion = await crearEvaluacionService(req.body);
    res.status(201).json(nuevaEvaluacion);
}

export const actualizarEvaluacionController = async (req, res) => {
    const evaluacionActualizada = await actualizarEvaluacionService(req.params.id, req.body);

    if (!evaluacionActualizada) {
        return res.status(404).json({ error: "Evaluación no encontrada" });
    }
    res.status(200).json(evaluacionActualizada);
}   

export const eliminarEvaluacionController = async (req, res) => {
    const evaluacionEliminada = await eliminarEvaluacionService(req.params.id);
    if (!evaluacionEliminada) {
        return res.status(404).json({ error: "Evaluación no encontrada" });
    }
    res.status(200).json({ message: "Evaluación eliminada correctamente" });
}
