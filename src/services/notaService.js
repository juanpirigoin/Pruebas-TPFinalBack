
import Nota from '../models/nota.js'
import { ROLES } from "../utils/constants.js"

const alcanceDeNotas = async usuario => {
    switch (usuario.rol) {
        case ROLES.PADRE:
            return { idAlumno: { $in: usuario.idAlumno } };
        case ROLES.ALUMNO:
            return { idAlumno: { $in: usuario.idAlumno } };
        case ROLES.DOCENTE:
            return { idMateria: { $in: usuario.idMateria } };
        default:
            return {};
    }
}

// Estructuracion de notas
const formatearNota = nota => ({
    _id: nota._id,
    calificacion: nota.calificacion,
    fecha: nota.fecha,

    alumno: nota.idAlumno,

    materia: {
        _id: nota.idMateria?._id,
        nombre: nota.idMateria?.nombre
    },

    curso: {
        _id: nota.idMateria?.idCurso?._id,
        nombre: nota.idMateria?.idCurso?.nombre
    },

    actividad: nota.idActividad,
    evaluacion: nota.idEvaluacion
});

//Get all notas
export const listarNotaService = async (usuario, filtros = {}) => {
    const filtroAlcance = await alcanceDeNotas(usuario);
    const filtro = { ...filtros, ...filtroAlcance }

    const notas = await Nota.find(filtro)
        .populate("idAlumno", "nombre apellido")
        .populate({
            path: "idMateria",
            select: "nombre",
            populate: { path: "idCurso", select: "nombre" }
        })
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre")
        .lean(); 

    return notas.map(formatearNota);
}

//Get nota por id
export const obtenerNotaPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeNotas(usuario);
    //aplico filtro para que no se muestre una nota que no este dentro del alcance de un alumno, padre o docente.
    const nota = await Nota.findOne({ _id: id, ...filtroAlcance })
        .populate("idAlumno", "nombre apellido")
        .populate({
            path: "idMateria",
            select: "nombre",
            populate: { path: "idCurso", select: "nombre" }
        })
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre");

    if (!nota) {
        return null;
    }

    return formatearNota(nota);
}


//Create nota
export const crearNotaService = async (notaData) => {
    return await Nota.create(notaData);
}

//Update nota
export const actualizarNotaService = async (id, notaData) => {
    return await Nota.findByIdAndUpdate(
        id,
        notaData,
        { returnDocument: "after", runValidators: true }
    );
}

//Delete nota
export const eliminarNotaService = async (id) => {
    return await Nota.findByIdAndDelete(id);
}
