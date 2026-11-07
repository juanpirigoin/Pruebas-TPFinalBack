import mongoose from 'mongoose'
import Actividad from '../models/actividadModel.js'
import Unidad from '../models/unidadModel.js'
import { obtenerFiltroAlcanceUnidad, validarUnidadDocente } from '../utils/alcanceHelper.js'

// Estructuración de actividades
const formatearActividad = actividad => ({
    _id: actividad._id,
    nombre: actividad.nombre,
    tipo: actividad.tipo,
    descripcion: actividad.descripcion,
    fecha: actividad.fecha,

    unidad: actividad.idUnidad
});

// Get todas las actividades por unidad (con filtro de alcance)
export const listarActividadService = async (usuario, filtros = {}) => {
    const { idUnidad, ...otrosFiltros } = filtros;
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);
    const filtro = { ...otrosFiltros };

    if (idUnidad) {
        if (filtroAlcance.idUnidad?.$in) {
            const idsPermitidos = filtroAlcance.idUnidad.$in.map(id => id.toString());
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
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);
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
    await validarUnidadDocente(actividadData.idUnidad, usuario, "las actividades");
    return await Actividad.create(actividadData);
};

// Update actividad
export const actualizarActividadService = async (id, actividadData, usuario) => {
    if (actividadData.idUnidad) {
        await validarUnidadDocente(actividadData.idUnidad, usuario, "las actividades");
    }

    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);

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
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);

    return await Actividad.findOneAndDelete({
        _id: id,
        ...filtroAlcance
    });
};
