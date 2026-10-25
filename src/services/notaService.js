import { ErrorApp } from '../utils/ErrorApp.js'
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

//Get all notas
export const listarNotaService = async (usuario, filtros = {}) => {
    const filtroAlcance = await alcanceDeNotas(usuario);
    const filtro = { ...filtros, ...filtroAlcance } 
    
    
    return await Nota.find(filtro) 
 
        .populate("idAlumno", "nombre apellido") //si es alumno o padre
 
        .populate({   //si es docente
 
            path: "idMateria", 
 
            select: "nombre", 
 
            populate: { path: "idCurso", select: "nombre" } //populate anidado para obtener el curso de la materia
 
        }) 
 
        .populate("idActividad", "nombre") //si es actividad
 
        .populate("idEvaluacion", "nombre") //si es evaluacion

}

//Get nota por id
export const obtenerNotaPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeNotas(usuario);
    //aplico filtro para que no se muestre una nota que no este dentro del alcance de un alumno, padre o docente.
    return await Nota.findOne({ _id: id, ...filtroAlcance })
        .populate("idAlumno", "nombre apellido")
        .populate({
            path: "idMateria",
            select: "nombre",
            populate: { path: "idCurso", select: "nombre" }
        })
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre");
}


//Create nota
export const crearNotaService = async (notaData) => {
    try {
        const nuevaNota = await Nota.create(notaData);
        return nuevaNota;
    } catch (error) {
        throw new ErrorApp(`Error al crear la nota: ${error.message}`);
    }
}

//Update nota
export const actualizarNotaService = async (id, notaData) => {
    try {
        return await Nota.findByIdAndUpdate(
            { _id: id },
            notaData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new ErrorApp(`Error al actualizar la nota: ${error.message}`);
    }
}

//Delete nota
export const eliminarNotaService = async (id) => {
    try {
        return await Nota.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar la nota: ${error.message}`);
    }
}
