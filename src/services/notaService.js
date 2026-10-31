
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
        .populate("idAlumno", "nombre apellido")
        .populate({
            path: "idMateria",
            select: "nombre",
            populate: { path: "idCurso", select: "nombre" }
        })
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre");
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
