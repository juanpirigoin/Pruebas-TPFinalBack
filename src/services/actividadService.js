import mongoose from 'mongoose'
import Actividad from '../models/actividad.js'
import Unidad from '../models/unidad.js'
import { ErrorApp } from '../utils/ErrorApp.js'
import { ROLES } from '../utils/constants.js'

// Estructuración de actividades
const formatearActividad = actividad => ({
    _id: actividad._id,
    nombre: actividad.nombre,
    tipo: actividad.tipo,
    descripcion: actividad.descripcion,
    fecha: actividad.fecha,

    unidad: actividad.idUnidad
});

const alcanceDeActividades = async (usuario) => {
    switch (usuario.rol) {
        case ROLES.DOCENTE: {
            const unidades = await Unidad.find({ idMateria: { $in: usuario.idMateria } }).select("_id");
            const idsUnidades = unidades.map(u => u._id);
            return { idUnidad: { $in: idsUnidades } };
        }
        default:
            return {};
    }
};

const validarUnidadDocente = async (idUnidad, usuario) => {
    if (usuario.rol !== ROLES.DOCENTE) return;

    if (!idUnidad) {
        throw new ErrorApp("La unidad es obligatoria", 400);
    }

    const unidad = await Unidad.findById(idUnidad);
    if (!unidad) {
        throw new ErrorApp("Unidad no encontrada", 404);
    }

    const esMateriaValida = usuario.idMateria.some(
        m => m.toString() === unidad.idMateria.toString()
    );

    if (!esMateriaValida) {
        throw new ErrorApp("No tiene permisos para operar sobre las actividades de esta materia", 403);
    }
};

// Get todas las actividades por unidad (con filtro de alcance)
export const listarActividadService = async (usuario, filtros = {}) => {
    const { idUnidad, ...otrosFiltros } = filtros;
    const filtroAlcance = await alcanceDeActividades(usuario);
    const filtro = { ...otrosFiltros };

    if (idUnidad) {
        if (usuario.rol === ROLES.DOCENTE) {
            const idsPermitidos = (filtroAlcance.idUnidad?.$in || []).map(id => id.toString());
            if (!idsPermitidos.includes(idUnidad.trim())) {
                return [];
            }
        }
        filtro.idUnidad = new mongoose.Types.ObjectId(idUnidad.trim());
    } else {
        Object.assign(filtro, filtroAlcance);
    }

    const actividades = await Actividad.find(filtro)
        .populate("idUnidad", "nombre")
        .sort({ fecha: 1 })
        .lean();

    return actividades.map(formatearActividad);
};

// Get actividad por id
export const obtenerActividadPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeActividades(usuario);
    const actividad = await Actividad.findOne({ _id: id, ...filtroAlcance })
        .populate("idUnidad", "nombre")
        .lean();

    if (!actividad) {
        return null;
    }

    return formatearActividad(actividad);
};

// Create actividad
export const crearActividadService = async (actividadData, usuario) => {
    await validarUnidadDocente(actividadData.idUnidad, usuario);
    return await Actividad.create(actividadData);
};

// Update actividad
export const actualizarActividadService = async (id, actividadData, usuario) => {
    if (actividadData.idUnidad) {
        await validarUnidadDocente(actividadData.idUnidad, usuario);
    }

    const filtroAlcance = await alcanceDeActividades(usuario);

    return await Actividad.findOneAndUpdate(
        {
            _id: id,
            ...filtroAlcance
        },
        actividadData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
};

// Delete actividad
export const eliminarActividadService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeActividades(usuario);

    return await Actividad.findOneAndDelete({
        _id: id,
        ...filtroAlcance
    });
};
