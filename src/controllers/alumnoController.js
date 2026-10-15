import { listarAlumnoService, obtenerAlumnoPorIdService, crearAlumnoService, actualizarAlumnoService, eliminarAlumnoService } from '../services/alumnoService.js'

export const listarAlumnoController = async (req, res) => {
    console.log("Query recibida:", req.query);
    const alumnos = await listarAlumnoService(req.query);
    res.status(200).json(alumnos);
}


export const obtenerAlumnoPorIdController = async (req, res) => {
    const alumno = await obtenerAlumnoPorIdService(req.params.id);
    if (!alumno) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json(alumno);
}

export const crearAlumnoController = async (req, res) => {
    const nuevoAlumno = await crearAlumnoService(req.body);
    res.status(201).json(nuevoAlumno);
}

export const actualizarAlumnoController = async (req, res) => {
    const alumnoActualizado = await actualizarAlumnoService(req.params.id, req.body);

    if (!alumnoActualizado) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json(alumnoActualizado);
}   

export const eliminarAlumnoController = async (req, res) => {
    const alumnoEliminado = await eliminarAlumnoService(req.params.id);
    if (!alumnoEliminado) {
        return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json({ message: "Alumno eliminado correctamente" });
}