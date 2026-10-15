import { listarCursoService, obtenerCursoPorIdService, crearCursoService, actualizarCursoService, eliminarCursoService } from '../services/cursoService.js'

export const listarCursoController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const cursos = await listarCursoService(req.query);
    res.status(200).json(cursos);
}


export const obtenerCursoPorIdController = async (req, res) => {
    const curso = await obtenerCursoPorIdService(req.params.id);
    if (!curso) {
        return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.status(200).json(curso);
}

export const crearCursoController = async (req, res) => {
    const nuevoCurso = await crearCursoService(req.body);
    res.status(201).json(nuevoCurso);
}

export const actualizarCursoController = async (req, res) => {
    const cursoActualizado = await actualizarCursoService(req.params.id, req.body);

    if (!cursoActualizado) {
        return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.status(200).json(cursoActualizado);
}   

export const eliminarCursoController = async (req, res) => {
    const cursoEliminado = await eliminarCursoService(req.params.id);
    if (!cursoEliminado) {
        return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.status(200).json({ message: "Curso eliminado correctamente" });
}