import { listarNotasService, obtenerNotaPorIdService, crearNotaService, actualizarNotaService, eliminarNotaService } from '../services/notaService.js'

export const listarNotasController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const notas = await listarNotasService(req.query);
    res.status(200).json(notas);
}


export const obtenerNotaPorIdController = async (req, res) => {
    const nota = await obtenerNotaPorIdService(req.params.id);
    if (!nota) {
        return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.status(200).json(nota);
}

export const crearNotaController = async (req, res) => {
    const nuevaNota = await crearNotaService(req.body);
    res.status(201).json(nuevaNota);
}

export const actualizarNotaController = async (req, res) => {
    const notaActualizada = await actualizarNotaService(req.params.id, req.body);

    if (!notaActualizada) {
        return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.status(200).json(notaActualizada);
}   

export const eliminarNotaController = async (req, res) => {
    const notaEliminada = await eliminarNotaService(req.params.id);
    if (!notaEliminada) {
        return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.status(200).json({ message: "Nota eliminada correctamente" });
}
