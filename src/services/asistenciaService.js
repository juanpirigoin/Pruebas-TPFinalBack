import mongoose from 'mongoose'
import Asistencia from '../models/asistencia.js'
import { ROLES } from '../utils/constants.js'

const alcanceDeAsistencias = async (usuario) => {
    switch (usuario.rol) {
        case ROLES.PADRE:
        case ROLES.ALUMNO:
            return { idAlumno: { $in: usuario.idAlumno } };
        default:
            return {};
    }
};

// Get all asistencias (con filtro de alcance)
export const listarAsistenciaService = async (usuario, filtros = {}) => {
    const { idAlumno, ...otrosFiltros } = filtros;
    const filtroAlcance = await alcanceDeAsistencias(usuario);
    const filtro = { ...otrosFiltros };

    if (idAlumno) {
        if (usuario.rol === ROLES.PADRE || usuario.rol === ROLES.ALUMNO) {
            const idsPermitidos = (usuario.idAlumno || []).map(id => id.toString());
            if (!idsPermitidos.includes(idAlumno.trim())) {
                return [];
            }
        }
        filtro.idAlumno = new mongoose.Types.ObjectId(idAlumno.trim());
    } else {
        Object.assign(filtro, filtroAlcance);
    }

    return await Asistencia.find(filtro)
        .populate("idAlumno", "nombre apellido")
        .sort({ fecha: -1 });
};

// Get asistencia por id
export const obtenerAsistenciaPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeAsistencias(usuario);
    return await Asistencia.findOne({ _id: id, ...filtroAlcance })
        .populate("idAlumno", "nombre apellido");
};

// Create asistencia 
export const crearAsistenciaService = async (asistenciaData) => {
    return await Asistencia.create(asistenciaData);
};

// Update asistencia
export const actualizarAsistenciaService = async (id, asistenciaData) => {
    return await Asistencia.findByIdAndUpdate(
        id,
        asistenciaData,
        { returnDocument: "after", runValidators: true }
    );
};

// Delete asistencia
export const eliminarAsistenciaService = async (id) => {
    return await Asistencia.findByIdAndDelete(id);
};
