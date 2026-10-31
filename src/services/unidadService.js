import mongoose from 'mongoose'
import Unidad from '../models/unidad.js'
import Materia from '../models/materia.js'
import Actividad from '../models/actividad.js'
import Evaluacion from '../models/evaluacion.js'
import { ErrorApp } from '../utils/ErrorApp.js'
import { ROLES } from '../utils/constants.js'

// Estructuración de unidades
const formatearUnidad = (unidad, actividades = null, evaluaciones = null) => {
    const res = {
        _id: unidad._id,
        nombre: unidad.nombre,
        descripcion: unidad.descripcion,
        materia: unidad.idMateria
    };

    if (actividades !== null) {
        res.actividades = actividades;
    }

    if (evaluaciones !== null) {
        res.evaluaciones = evaluaciones;
    }

    return res;
};

const alcanceDeUnidades = async (usuario) => {
    switch (usuario.rol) {
        case ROLES.DOCENTE:
            return { idMateria: { $in: usuario.idMateria } };
        default:
            return {};
    }
};

const validarMateriaDocente = (idMateria, usuario) => {
    if (usuario.rol !== ROLES.DOCENTE) return;

    if (!idMateria) {
        throw new ErrorApp("La materia es obligatoria", 400);
    }

    const esMateriaValida = usuario.idMateria.some(
        m => m.toString() === idMateria.toString()
    );

    if (!esMateriaValida) {
        throw new ErrorApp("No tiene permisos para operar sobre unidades de esta materia", 403);
    }
};

// Get all unidades por materia (con filtro de alcance)
export const listarUnidadService = async (usuario, filtros = {}) => {
    const { idMateria, ...otrosFiltros } = filtros;
    const filtroAlcance = await alcanceDeUnidades(usuario);
    const filtro = { ...otrosFiltros };

    if (idMateria) {
        if (usuario.rol === ROLES.DOCENTE) {
            const idsPermitidos = (usuario.idMateria || []).map(id => id.toString());
            if (!idsPermitidos.includes(idMateria.trim())) {
                return [];
            }
        }
        filtro.idMateria = new mongoose.Types.ObjectId(idMateria.trim());
    } else {
        Object.assign(filtro, filtroAlcance);
    }

    const unidades = await Unidad.find(filtro)
        .populate("idMateria", "nombre")
        .lean();

    return unidades.map(u => formatearUnidad(u));
};

// Get unidad por id (incluye actividades y evaluaciones de la unidad)
export const obtenerUnidadPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeUnidades(usuario);

    const unidad = await Unidad.findOne({ _id: id, ...filtroAlcance })
        .populate("idMateria", "nombre")
        .lean();

    if (!unidad) {
        return null;
    }

    // Buscamos en paralelo las actividades y evaluaciones de esta unidad
    const [actividades, evaluaciones] = await Promise.all([
        Actividad.find({ idUnidad: id })
            .select("nombre tipo fecha")
            .sort({ fecha: 1 })
            .lean(),
        Evaluacion.find({ idUnidad: id })
            .select("nombre tipo fecha")
            .sort({ fecha: 1 })
            .lean()
    ]);

    return formatearUnidad(unidad, actividades, evaluaciones);
};

// Create unidad
export const crearUnidadService = async (unidadData, usuario) => {
    validarMateriaDocente(unidadData.idMateria, usuario);
    return await Unidad.create(unidadData);
};

// Update unidad
export const actualizarUnidadService = async (id, unidadData, usuario) => {
    if (unidadData.idMateria) {
        validarMateriaDocente(unidadData.idMateria, usuario);
    }

    const filtroAlcance = await alcanceDeUnidades(usuario);

    return await Unidad.findOneAndUpdate(
        {
            _id: id,
            ...filtroAlcance
        },
        unidadData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
};

// Delete unidad
export const eliminarUnidadService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeUnidades(usuario);

    return await Unidad.findOneAndDelete({
        _id: id,
        ...filtroAlcance
    });
};
