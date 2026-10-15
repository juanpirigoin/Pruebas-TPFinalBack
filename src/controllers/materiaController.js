import { listarMateriaService, obtenerMateriaPorIdService, crearMateriaService, actualizarMateriaService, eliminarMateriaService } from '../services/materiaService.js'

export const listarMateriaController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const materias = await listarMateriaService(req.query);
    res.status(200).json(materias);
}


export const obtenerMateriaPorIdController = async (req, res) => {
    const materia = await obtenerMateriaPorIdService(req.params.id);
    if (!materia) {
        return res.status(404).json({ error: "Materia no encontrada" });
    }
    res.status(200).json(materia);
}

export const crearMateriaController = async (req, res) => {
    const nuevaMateria = await crearMateriaService(req.body);
    res.status(201).json(nuevaMateria);
}

export const actualizarMateriaController = async (req, res) => {
    const materiaActualizada = await actualizarMateriaService(req.params.id, req.body);

    if (!materiaActualizada) {
        return res.status(404).json({ error: "Materia no encontrada" });
    }
    res.status(200).json(materiaActualizada);
}   

export const eliminarMateriaController = async (req, res) => {
    const materiaEliminada = await eliminarMateriaService(req.params.id);
    if (!materiaEliminada) {
        return res.status(404).json({ error: "Materia no encontrada" });
    }
    res.status(200).json({ message: "Materia eliminada correctamente" });
}
