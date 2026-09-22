import mongoose from "mongoose";
import {conectDB} from "./db.js";
import Curso from "./models/curso.js";
import Alumno from "./models/alumno.js";
import Usuario from "./models/usuario.js";
import Materia from "./models/materia.js";
import Unidad from "./models/unidad.js";
import Evaluacion from "./models/evaluacion.js";    
import Actividad from "./models/actividad.js";
import Asistencia from "./models/asistencia.js"; 

await conectDB();

await Curso.deleteMany({});
await Alumno.deleteMany({});
await Usuario.deleteMany({});
await Materia.deleteMany({});
await Unidad.deleteMany({});
await Evaluacion.deleteMany({});
await Actividad.deleteMany({});
await Asistencia.deleteMany({});

console.log("Se han eliminado todos los documentos de las colecciones Curso, Alumno, Usuario, Materia, Unidad, Evaluacion, Actividad y Asistencia.");

await Curso.SyncIndexes();
await Alumno.SyncIndexes();
await Usuario.SyncIndexes();
await Materia.SyncIndexes();
await Unidad.SyncIndexes();
await Evaluacion.SyncIndexes();
await Actividad.SyncIndexes();
await Asistencia.SyncIndexes();

await Curso.create([
    { nombreCurso: "1°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "1°B",  nivel: "secundario", turno: "tarde" },
    { nombreCurso: "2°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "2°B",  nivel: "secundario", turno: "tarde" },
    { nombreCurso: "3°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "3°B",  nivel: "secundario", turno: "tarde" },
    { nombreCurso: "4°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "4°B",  nivel: "secundario", turno: "tarde" },
    { nombreCurso: "5°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "5°B",  nivel: "secundario", turno: "tarde" },
    { nombreCurso: "6°A",  nivel: "secundario", turno: "mañana" },
    { nombreCurso: "6°B",  nivel: "secundario", turno: "tarde" }
]);