import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Curso from "./models/curso.js";
import Alumno from "./models/alumno.js";
import Usuario from "./models/usuario.js";
import Materia from "./models/materia.js";
import Unidad from "./models/unidad.js";
import Evaluacion from "./models/evaluacion.js";
import Actividad from "./models/actividad.js";
import Asistencia from "./models/asistencia.js";
import Nota from "./models/nota.js";

await connectDB();

await Curso.deleteMany({});
await Alumno.deleteMany({});
await Usuario.deleteMany({});
await Materia.deleteMany({});
await Unidad.deleteMany({});
await Evaluacion.deleteMany({});
await Actividad.deleteMany({});
await Asistencia.deleteMany({});
await Nota.deleteMany({});
console.log("Se han eliminado todos los documentos de las colecciones.");

await Curso.syncIndexes();
await Alumno.syncIndexes();
await Usuario.syncIndexes();
await Materia.syncIndexes();
await Unidad.syncIndexes();
await Evaluacion.syncIndexes();
await Actividad.syncIndexes();
await Asistencia.syncIndexes();
await Nota.syncIndexes();

const [
    curso1, curso2, curso3, curso4, curso5, curso6, curso7, curso8, curso9, curso10, curso11, curso12
] = await Curso.create([
    { nombre: "1°A", nivel: "secundario", turno: "mañana" },
    { nombre: "1°B", nivel: "secundario", turno: "tarde" },
    { nombre: "2°A", nivel: "secundario", turno: "mañana" },
    { nombre: "2°B", nivel: "secundario", turno: "tarde" },
    { nombre: "3°A", nivel: "secundario", turno: "mañana" },
    { nombre: "3°B", nivel: "secundario", turno: "tarde" },
    { nombre: "4°A", nivel: "secundario", turno: "mañana" },
    { nombre: "4°B", nivel: "secundario", turno: "tarde" },
    { nombre: "5°A", nivel: "secundario", turno: "mañana" },
    { nombre: "5°B", nivel: "secundario", turno: "tarde" },
    { nombre: "6°A", nivel: "secundario", turno: "mañana" },
    { nombre: "6°B", nivel: "secundario", turno: "tarde" }
]);

const [ 
    alumno1, alumno2, alumno3, alumno4, alumno5, alumno6, alumno7, alumno8, alumno9,
    alumno10, alumno11, alumno12, alumno13, alumno14, alumno15,
    alumno16, alumno17, alumno18, alumno19, alumno20, alumno21, alumno22, alumno23,
    alumno24, alumno25, alumno26, alumno27, alumno28, alumno29, alumno30, alumno31, alumno32, alumno33,
    alumno34, alumno35, alumno36, alumno37, alumno38, alumno39, alumno40, alumno41, alumno42, alumno43
 ] = await Alumno.create([
    { nombre: "Juan", apellido: "Pérez", dni: "12345678", fechaNacimiento: new Date("2005-01-15"), idCurso: curso1._id },
    { nombre: "María", apellido: "Gómez", dni: "23456789", fechaNacimiento: new Date("2005-02-20"), idCurso: curso2._id },
    { nombre: "Pedro", apellido: "López", dni: "34567890", fechaNacimiento: new Date("2005-03-10"), idCurso: curso3._id },
    { nombre: "Lucía", apellido: "Martínez", dni: "45678901", fechaNacimiento: new Date("2005-04-05"), idCurso: curso3._id },
    { nombre: "Carlos", apellido: "Rodríguez", dni: "56789012", fechaNacimiento: new Date("2005-05-25"), idCurso: curso2._id },
    { nombre: "Ana", apellido: "Fernández", dni: "67890123", fechaNacimiento: new Date("2005-06-15"), idCurso: curso3._id },
    { nombre: "Luis", apellido: "García", dni: "78901234", fechaNacimiento: new Date("2005-07-30"), idCurso: curso1._id },
    { nombre: "Sofía", apellido: "Hernández", dni: "89012345", fechaNacimiento: new Date("2005-08-20"), idCurso: curso2._id },
    { nombre: "Diego", apellido: "Ramírez", dni: "90123456", fechaNacimiento: new Date("2005-09-10"), idCurso: curso3._id },
    { nombre: "Valentina", apellido: "Torres", dni: "01234567", fechaNacimiento: new Date("2005-10-05"), idCurso: curso1._id },
    { nombre: "Martín", apellido: "Vargas", dni: "11223344", fechaNacimiento: new Date("2005-11-15"), idCurso: curso1._id },
    { nombre: "Camila", apellido: "Rojas", dni: "22334455", fechaNacimiento: new Date("2005-12-20"), idCurso: curso2._id },
    { nombre: "Javier", apellido: "Castro", dni: "33445566", fechaNacimiento: new Date("2006-01-10"), idCurso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza", dni: "44556677", fechaNacimiento: new Date("2006-02-05"), idCurso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz", dni: "55667788", fechaNacimiento: new Date("2006-03-25"), idCurso: curso3._id },
    { nombre: "Camila", apellido: "Rojas2", dni: "22334456", fechaNacimiento: new Date("2005-12-20"), idCurso: curso2._id },
    { nombre: "Javier", apellido: "Castro2", dni: "33445567", fechaNacimiento: new Date("2006-01-10"), idCurso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza2", dni: "44556678", fechaNacimiento: new Date("2006-02-05"), idCurso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz2", dni: "55667789", fechaNacimiento: new Date("2006-03-25"), idCurso: curso3._id },
    { nombre: "Camila", apellido: "Rojas3", dni: "22334457", fechaNacimiento: new Date("2005-12-20"), idCurso: curso2._id },
    { nombre: "Javier", apellido: "Castro3", dni: "33445568", fechaNacimiento: new Date("2006-01-10"), idCurso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza3", dni: "44556679", fechaNacimiento: new Date("2006-02-05"), idCurso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz3", dni: "55667790", fechaNacimiento: new Date("2006-03-25"), idCurso: curso3._id },
    { nombre: "Emilia", apellido: "Suárez", dni: "66778899", fechaNacimiento: new Date("2006-04-12"), idCurso: curso1._id },
    { nombre: "Tomás", apellido: "Benítez", dni: "77889900", fechaNacimiento: new Date("2006-05-18"), idCurso: curso2._id },
    { nombre: "Florencia", apellido: "Silva", dni: "88990011", fechaNacimiento: new Date("2006-06-25"), idCurso: curso3._id },
    { nombre: "Mateo", apellido: "Domínguez", dni: "99001122", fechaNacimiento: new Date("2006-07-30"), idCurso: curso1._id },
    { nombre: "Agustina", apellido: "Morales", dni: "10111213", fechaNacimiento: new Date("2006-08-15"), idCurso: curso2._id },
    { nombre: "Benjamín", apellido: "Paz", dni: "11121314", fechaNacimiento: new Date("2006-09-20"), idCurso: curso3._id },
    { nombre: "Catalina", apellido: "Sosa", dni: "12131415", fechaNacimiento: new Date("2006-10-05"), idCurso: curso1._id },
    { nombre: "Franco", apellido: "Aguilar", dni: "13141516", fechaNacimiento: new Date("2006-11-12"), idCurso: curso2._id },
    { nombre: "Julieta", apellido: "Peralta", dni: "14151617", fechaNacimiento: new Date("2006-12-22"), idCurso: curso3._id },
    { nombre: "Nicolás", apellido: "Ortiz", dni: "15161718", fechaNacimiento: new Date("2007-01-08"), idCurso: curso1._id },
    { nombre: "Mía", apellido: "Luna", dni: "16171819", fechaNacimiento: new Date("2007-02-14"), idCurso: curso2._id },
    { nombre: "Thiago", apellido: "Ferreyra", dni: "234323523", fechaNacimiento: new Date("2006-12-22"), idCurso: curso3._id },
    { nombre: "Valeria", apellido: "Acosta", dni: "234232423", fechaNacimiento: new Date("2006-12-22"), idCurso: curso1._id },
    { nombre: "Facundo", apellido: "Molina", dni: "19202122", fechaNacimiento: new Date("2007-05-30"), idCurso: curso2._id },
    { nombre: "Renata", apellido: "Carrizo", dni: "20212223", fechaNacimiento: new Date("2007-06-18"), idCurso: curso3._id },
    { nombre: "Gonzalo", apellido: "Navarro", dni: "21222324", fechaNacimiento: new Date("2007-07-09"), idCurso: curso1._id },
    { nombre: "Martina", apellido: "Quiroga", dni: "22232425", fechaNacimiento: new Date("2007-08-21"), idCurso: curso2._id },
    { nombre: "Lucas", apellido: "Vega", dni: "23242526", fechaNacimiento: new Date("2007-09-13"), idCurso: curso3._id },
    { nombre: "Abril", apellido: "Campos", dni: "24252627", fechaNacimiento: new Date("2007-10-27"), idCurso: curso1._id },
    { nombre: "Juan Cruz", apellido: "Ledesma", dni: "25262728", fechaNacimiento: new Date("2007-11-15"), idCurso: curso2._id }
]);

const [
    materia1, materia2, materia3, materia4, materia5, materia6, materia7, materia8,
    materia9, materia10, materia11, materia12, materia13, materia14, materia15, materia16,
    materia17, materia18, materia19, materia20, materia21, materia22, materia23, materia24
 ] = await Materia.create([
    { nombre: "Matemática", area: "Ciencias Exactas", idCurso: curso1._id },
    { nombre: "Practicas del lenguaje", area: "Ciencias Sociales", idCurso: curso1._id },
    { nombre: "Ciencias Sociales", area: "Ciencias Sociales", idCurso: curso1._id },
    { nombre: "Ciencias Naturales", area: "Ciencias Naturales", idCurso: curso1._id },
    { nombre: "Educación Física", area: "Educación Física", idCurso: curso1._id },
    { nombre: "Ingles", area: "Ciencias Sociales", idCurso: curso1._id },
    { nombre: "Artística", area: "Arte", idCurso: curso1._id },
    { nombre: "Construcción de la ciudadanía", area: "Ciencias Sociales", idCurso: curso1._id },
    { nombre: "Matemática", area: "Ciencias Exactas", idCurso: curso2._id },
    { nombre: "Practicas del lenguaje", area: "Ciencias Sociales", idCurso: curso2._id },
    { nombre: "Ciencias Sociales", area: "Ciencias Sociales", idCurso: curso2._id },
    { nombre: "Ciencias Naturales", area: "Ciencias Naturales", idCurso: curso2._id },
    { nombre: "Educación Física", area: "Educación Física", idCurso: curso2._id },
    { nombre: "Ingles", area: "Ciencias Sociales", idCurso: curso2._id },
    { nombre: "Artística", area: "Arte", idCurso: curso2._id },
    { nombre: "Construcción de la ciudadanía", area: "Ciencias Sociales", idCurso: curso2._id },
    { nombre: "Matemática", area: "Ciencias Exactas", idCurso: curso3._id },
    { nombre: "Practicas del lenguaje", area: "Ciencias Sociales", idCurso: curso3._id },
    { nombre: "Ciencias Sociales", area: "Ciencias Sociales", idCurso: curso3._id },
    { nombre: "Ciencias Naturales", area: "Ciencias Naturales", idCurso: curso3._id },
    { nombre: "Educación Física", area: "Educación Física", idCurso: curso3._id },
    { nombre: "Ingles", area: "Ciencias Sociales", idCurso: curso3._id },
    { nombre: "Artística", area: "Arte", idCurso: curso3._id },
    { nombre: "Construcción de la ciudadanía", area: "Ciencias Sociales", idCurso: curso3._id }
]);

const [
    unidad1, unidad2, unidad3, unidad4, unidad5, unidad6, unidad7, unidad8, unidad9, unidad10, unidad11, unidad12, unidad13, unidad14, unidad15, unidad16, unidad17, unidad18, unidad19, unidad20, unidad21, unidad22, unidad23, unidad24, unidad25, unidad26, unidad27, unidad28, unidad29, unidad30, unidad31, unidad32, unidad33, unidad34, unidad35, unidad36, unidad37, unidad38, unidad39, unidad40, unidad41, unidad42, unidad43, unidad44, unidad45, unidad46, unidad47, unidad48 
] = await Unidad.create([
    
    { nombre: "Unidad 1: Números y Operaciones", descripcion: "Estudio de los números naturales, propiedades y operaciones básicas.", idMateria: materia1._id },
    { nombre: "Unidad 2: Geometría y Medición", descripcion: "Conceptos fundamentales de figuras geométricas, ángulos y perímetros.", idMateria: materia1._id },
    { nombre: "Unidad 3: Introducción al Álgebra", descripcion: "Ecuaciones simples y expresiones algebraicas básicas.", idMateria: materia1._id },

    { nombre: "Unidad 1: Comprensión Lectora y Mitos", descripcion: "Lectura crítica de textos narrativos, mitos y leyendas.", idMateria: materia2._id },
    { nombre: "Unidad 2: Gramática y Ortografía", descripcion: "Reglas de acentuación, clases de palabras y sintaxis sintáctica.", idMateria: materia2._id },
    { nombre: "Unidad 3: Literatura y Producción Escrita", descripcion: "Creación de cuentos breves y análisis de textos literarios.", idMateria: materia2._id },

    { nombre: "Unidad 1: Introducción a la Geografía", descripcion: "Representación del espacio geográfico, mapas y coordenadas.", idMateria: materia3._id },
    { nombre: "Unidad 2: Primeras Civilizaciones", descripcion: "Estudio de las sociedades antiguas y el surgimiento del Estado.", idMateria: materia3._id },

    { nombre: "Unidad 1: La Célula y la Vida", descripcion: "Estructura celular, funciones vitales y niveles de organización.", idMateria: materia4._id },
    { nombre: "Unidad 2: Materia y Energía", descripcion: "Propiedades de la materia, estados de agregación y transformaciones.", idMateria: materia4._id },

    { nombre: "Unidad 1: Capacidades Motoras", descripcion: "Desarrollo de resistencia, fuerza, flexibilidad y velocidad.", idMateria: materia5._id },
    { nombre: "Unidad 2: Deportes Colectivos", descripcion: "Reglas, tácticas y fundamentos de deportes en equipo.", idMateria: materia5._id },

    { nombre: "Unidad 1: Greetings and Introductions", descripcion: "Vocabulario básico para presentarse, saludar y describir objetos.", idMateria: materia6._id },
    { nombre: "Unidad 2: Daily Routines & Present Simple", descripcion: "Uso del presente simple para describir rutinas y hábitos diarios.", idMateria: materia6._id },

    { nombre: "Unidad 1: Lenguaje Visual y Color", descripcion: "Elementos fundamentales de la imagen: punto, línea, plano y teoría del color.", idMateria: materia7._id },
    { nombre: "Unidad 2: Composición Espacial", descripcion: "Técnicas de composición, bidimensión y tridimensión.", idMateria: materia7._id },

    { nombre: "Unidad 1: Derechos Humanos y Ciudadanía", descripcion: "Conceptos de democracia, derechos fundamentales y participación.", idMateria: materia8._id },
    { nombre: "Unidad 2: Identidad y Convivencia", descripcion: "Diversidad cultural, respeto y normas de convivencia escolar.", idMateria: materia8._id },

    { nombre: "Unidad 1: Números y Operaciones", descripcion: "Estudio de los números naturales, propiedades y operaciones básicas.", idMateria: materia9._id },
    { nombre: "Unidad 2: Geometría y Medición", descripcion: "Conceptos fundamentales de figuras geométricas, ángulos y perímetros.", idMateria: materia9._id },

    { nombre: "Unidad 1: Comprensión Lectora y Mitos", descripcion: "Lectura crítica de textos narrativos, mitos y leyendas.", idMateria: materia10._id },
    { nombre: "Unidad 2: Gramática y Ortografía", descripcion: "Reglas de acentuación, clases de palabras y sintaxis sintáctica.", idMateria: materia10._id },

    { nombre: "Unidad 1: Introducción a la Geografía", descripcion: "Representación del espacio geográfico, mapas y coordenadas.", idMateria: materia11._id },
    { nombre: "Unidad 2: Primeras Civilizaciones", descripcion: "Estudio de las sociedades antiguas y el surgimiento del Estado.", idMateria: materia11._id },

    { nombre: "Unidad 1: La Célula y la Vida", descripcion: "Estructura celular, funciones vitales y niveles de organización.", idMateria: materia12._id },
    { nombre: "Unidad 2: Materia y Energía", descripcion: "Propiedades de la materia, estados de agregación y transformaciones.", idMateria: materia12._id },

    { nombre: "Unidad 1: Capacidades Motoras", descripcion: "Desarrollo de resistencia, fuerza, flexibilidad y velocidad.", idMateria: materia13._id },
    { nombre: "Unidad 2: Deportes Colectivos", descripcion: "Reglas, tácticas y fundamentos de deportes en equipo.", idMateria: materia13._id },

    { nombre: "Unidad 1: Greetings and Introductions", descripcion: "Vocabulario básico para presentarse, saludar y describir objetos.", idMateria: materia14._id },
    { nombre: "Unidad 2: Daily Routines & Present Simple", descripcion: "Uso del presente simple para describir rutinas y hábitos diarios.", idMateria: materia14._id },

    { nombre: "Unidad 1: Lenguaje Visual y Color", descripcion: "Elementos fundamentales de la imagen: punto, línea, plano y teoría del color.", idMateria: materia15._id },
    { nombre: "Unidad 2: Composición Espacial", descripcion: "Técnicas de composición, bidimensión y tridimensión.", idMateria: materia15._id },

    { nombre: "Unidad 1: Derechos Humanos y Ciudadanía", descripcion: "Conceptos de democracia, derechos fundamentales y participación.", idMateria: materia16._id },
    { nombre: "Unidad 2: Identidad y Convivencia", descripcion: "Diversidad cultural, respeto y normas de convivencia escolar.", idMateria: materia16._id },

    { nombre: "Unidad 1: Números Enteros y Racionales", descripcion: "Propiedades y operaciones con números enteros y fracciones.", idMateria: materia17._id },
    { nombre: "Unidad 2: Ecuaciones y Funciones", descripcion: "Resolución de ecuaciones algebraicas y conceptos iniciales de función.", idMateria: materia17._id },

    { nombre: "Unidad 1: El Texto Argumentativo", descripcion: "Estructura y análisis de textos opinativos y argumentativos.", idMateria: materia18._id },
    { nombre: "Unidad 2: Análisis Sintáctico y Semántico", descripcion: "Estudio profundo de la oración compuesta y semántica.", idMateria: materia18._id },

    { nombre: "Unidad 1: Edad Media y Feudalismo", descripcion: "Transformaciones sociales, políticas y económicas de la Edad Media.", idMateria: materia19._id },
    { nombre: "Unidad 2: Geografía de América", descripcion: "Características físicas, relieve y climas del continente americano.", idMateria: materia19._id },

    { nombre: "Unidad 1: Fisicoquímica y Reacciones", descripcion: "Estudio de mezclas, soluciones y cambios químicos básicos.", idMateria: materia20._id },
    { nombre: "Unidad 2: Biodiversidad y Ecosistemas", descripcion: "Relaciones tróficas y conservación de los recursos naturales.", idMateria: materia20._id },

    { nombre: "Unidad 1: Aptitud Física y Salud", descripcion: "Acondicionamiento físico y cuidado de la salud corporal.", idMateria: materia21._id },
    { nombre: "Unidad 2: Deportes de Conjunto", descripcion: "Desarrollo técnico y estratégico en deportes de equipo.", idMateria: materia21._id },

    { nombre: "Unidad 1: Past Simple and Continuous", descripcion: "Expresión de eventos pasados y acciones en desarrollo en el pasado.", idMateria: materia22._id },
    { nombre: "Unidad 2: Reading & Vocabulary", descripcion: "Lectura de textos adaptados y expansión del vocabulario general.", idMateria: materia22._id },

    { nombre: "Unidad 1: Grabado y Escultura", descripcion: "Exploración de técnicas tridimensionales y de impresión visual.", idMateria: materia23._id },
    { nombre: "Unidad 2: Historia del Arte", descripcion: "Recorrido por las vanguardias artísticas del siglo XX.", idMateria: materia23._id },
    
    { nombre: "Unidad 1: Estado y Constitución", descripcion: "Organización política del Estado y principios constitucionales.", idMateria: materia24._id },
    { nombre: "Unidad 2: Participación Juvenil", descripcion: "Mecanismos de participación social y proyectos comunitarios.", idMateria: materia24._id }
]); 

const [
    evaluacion1, evaluacion2, evaluacion3, evaluacion4, evaluacion5, evaluacion6, evaluacion7, evaluacion8,
    evaluacion9, evaluacion10, evaluacion11, evaluacion12, evaluacion13, evaluacion14, evaluacion15, evaluacion16, evaluacion17, evaluacion18, evaluacion19, evaluacion20, evaluacion21, evaluacion22, evaluacion23, evaluacion24
] = await Evaluacion.create([
    { nombre: "Evaluación 1", tipo: "escrito", fecha: new Date("2024-05-15"), idUnidad: unidad1._id },
    { nombre: "Evaluación 2", tipo: "escrito", fecha: new Date("2024-05-22"), idUnidad: unidad2._id },
    { nombre: "Evaluación 3", tipo: "escrito", fecha: new Date("2024-05-29"), idUnidad: unidad3._id },
    { nombre: "Evaluación 4", tipo: "escrito", fecha: new Date("2024-06-05"), idUnidad: unidad4._id },
    { nombre: "Evaluación 5", tipo: "escrito", fecha: new Date("2024-06-12"), idUnidad: unidad5._id },
    { nombre: "Evaluación 6", tipo: "escrito", fecha: new Date("2024-06-19"), idUnidad: unidad6._id },
    { nombre: "Evaluación 7", tipo: "escrito", fecha: new Date("2024-06-26"), idUnidad: unidad7._id },
    { nombre: "Evaluación 8", tipo: "escrito", fecha: new Date("2024-07-03"), idUnidad: unidad8._id },
    { nombre: "Evaluación 9", tipo: "escrito", fecha: new Date("2024-07-10"), idUnidad: unidad9._id },
    { nombre: "Evaluación 10", tipo: "escrito", fecha: new Date("2024-07-17"), idUnidad: unidad10._id },
    { nombre: "Evaluación 11", tipo: "escrito", fecha: new Date("2024-07-24"), idUnidad: unidad11._id },
    { nombre: "Evaluación 12", tipo: "escrito", fecha: new Date("2024-07-31"), idUnidad: unidad12._id },
    { nombre: "Evaluación 13", tipo: "escrito", fecha: new Date("2024-08-07"), idUnidad: unidad13._id },
    { nombre: "Evaluación 14", tipo: "escrito", fecha: new Date("2024-08-14"), idUnidad: unidad14._id },
    { nombre: "Evaluación 15", tipo: "escrito", fecha: new Date("2024-08-21"), idUnidad: unidad15._id },
    { nombre: "Evaluación 16", tipo: "escrito", fecha: new Date("2024-08-28"), idUnidad: unidad16._id },
    { nombre: "Evaluación 17", tipo: "escrito", fecha: new Date("2024-09-04"), idUnidad: unidad17._id },
    { nombre: "Evaluación 18", tipo: "escrito", fecha: new Date("2024-09-11"), idUnidad: unidad18._id },
    { nombre: "Evaluación 19", tipo: "escrito", fecha:new Date("2024-09-18"), idUnidad: unidad19._id },
    { nombre: "Evaluación 20", tipo: "escrito", fecha: new Date(" 2024-09-22"), idUnidad: unidad20._id },
    { nombre: "Evaluación 21", tipo: "escrito", fecha: new Date("2024-09-29"), idUnidad: unidad21._id },
    { nombre: "Evaluación 22", tipo: "escrito", fecha: new Date("2024-10-06"), idUnidad: unidad22._id },
    { nombre: "Evaluación 23", tipo: "escrito", fecha: new Date("2024-10-13"), idUnidad: unidad23._id },
    { nombre: "Evaluación 24", tipo: "escrito", fecha: new Date("2024-10-20"), idUnidad: unidad24._id },
    { nombre: "Evaluación 25", tipo: "escrito", fecha: new Date("2024-10-27"), idUnidad: unidad25._id },
    { nombre: "Evaluación 26", tipo: "escrito", fecha: new Date("2024-11-03"), idUnidad: unidad26._id },
    { nombre: "Evaluación 27", tipo: "escrito", fecha: new Date("2024-11-10"), idUnidad: unidad27._id }   
]);

const [
    actividad1, actividad2, actividad3, actividad4, actividad5, actividad6, actividad7, actividad8,
    actividad9, actividad10, actividad11, actividad12, actividad13, actividad14, actividad15, actividad16,
    actividad17, actividad18, actividad19, actividad20, actividad21, actividad22, actividad23, actividad24,
    actividad25, actividad26, actividad27, actividad28, actividad29, actividad30, actividad31, actividad32,
    actividad33, actividad34, actividad35, actividad36, actividad37, actividad38, actividad39, actividad40,
    actividad41, actividad42, actividad43, actividad44, actividad45, actividad46, actividad47, actividad48
] = await Actividad.create([
    { nombre: "Suma y resta de números naturales", tipo:"ejercicio", fecha: new Date("2024-05-16"), idUnidad: unidad1._id },
    { nombre: "Geometría básica y perímetros", tipo:"problema", fecha: new Date("2024-05-23"), idUnidad: unidad2._id },
    { nombre: "Resolución de ecuaciones simples", tipo:"ejercicio", fecha: new Date("2024-05-30"), idUnidad: unidad3._id },
    { nombre: "Análisis de textos narrativos y mitos", tipo:"problema", fecha: new Date("2024-06-06"), idUnidad: unidad4._id },
    { nombre: "Gramática y ortografía", tipo:"ejercicio", fecha: new Date("2024-06-13"), idUnidad: unidad5._id },
    { nombre: "Cuentos breves y análisis literario", tipo:"problema", fecha: new Date("2024-06-20"), idUnidad: unidad6._id },
    { nombre: "Mapas y coordenadas geográficas", tipo:"ejercicio", fecha: new Date("2024-06-27"), idUnidad: unidad7._id },
    { nombre: "Primeras civilizaciones y el Estado", tipo:"problema", fecha: new Date("2024-07-04"), idUnidad: unidad8._id },
    { nombre: "Observación y análisis de la célula", tipo:"ejercicio", fecha: new Date("2024-07-11"), idUnidad: unidad9._id },
    { nombre: "Propiedades de la materia", tipo:"problema", fecha: new Date("2024-07-18"), idUnidad: unidad10._id },
    { nombre: "Capacidades motoras básicas", tipo:"ejercicio", fecha: new Date("2024-07-25"), idUnidad: unidad11._id },
    { nombre: "Deportes colectivos y tácticas", tipo:"problema", fecha: new Date("2024-08-01"), idUnidad: unidad12._id },
    { nombre: "Presentaciones y saludos en inglés", tipo:"ejercicio", fecha: new Date("2024-08-08"), idUnidad: unidad13._id },
    { nombre: "Rutinas diarias y presente simple", tipo:"problema", fecha: new Date("2024-08-15"), idUnidad: unidad14._id },
    { nombre: "Composiciones visuales y color", tipo:"ejercicio", fecha: new Date("2024-08-22"), idUnidad: unidad15._id },
    { nombre: "Obras de arte y composición", tipo:"problema", fecha: new Date("2024-08-29"), idUnidad: unidad16._id },
    { nombre: "Derechos humanos y ciudadanía", tipo:"ejercicio", fecha: new Date("2024-09-05"), idUnidad: unidad17._id },
    { nombre: "Identidad y convivencia escolar", tipo:"problema", fecha: new Date("2024-09-12"), idUnidad: unidad18._id },
    { nombre: "Números enteros y fracciones", tipo:"ejercicio", fecha: new Date("2024-09-19"), idUnidad: unidad19._id },
    { nombre: "Ecuaciones y funciones básicas", tipo:"problema", fecha: new Date("2024-09-26"), idUnidad: unidad20._id },
    { nombre: "Textos argumentativos y opiniones", tipo:"ejercicio", fecha: new Date("2024-10-03"), idUnidad: unidad21._id },
    { nombre: "La Edad Media y el feudalismo", tipo:"problema", fecha: new Date("2024-10-10"), idUnidad: unidad22._id },
    { nombre: "Fisicoquímica y reacciones", tipo:"ejercicio", fecha: new Date("2024-10-17"), idUnidad: unidad23._id },
    { nombre: "Biodiversidad y ecosistemas", tipo:"problema", fecha: new Date("2024-10-24"), idUnidad: unidad24._id },
    { nombre: "Aptitud física y salud corporal", tipo:"ejercicio", fecha: new Date("2024-10-31"), idUnidad: unidad25._id },
    { nombre: "Estrategias en deportes de conjunto", tipo:"problema", fecha: new Date("2024-11-07"), idUnidad: unidad26._id },
    { nombre: "Textos en pasado simple y continuo", tipo:"ejercicio", fecha: new Date("2024-11-14"), idUnidad: unidad27._id },
    { nombre: "Técnicas de grabado y escultura", tipo:"problema", fecha: new Date("2024-11-21"), idUnidad: unidad28._id }
]);

const [nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, nota9, nota10,
    nota11, nota12, nota13, nota14, nota15, nota16, nota17, nota18, nota19, nota20,
    nota21, nota22, nota23, nota24, nota25, nota26, nota27, nota28, nota29, nota30,
    nota31, nota32, nota33, nota34, nota35, nota36, nota37, nota38, nota39, nota40,
    nota41, nota42, nota43, nota44, nota45, nota46, nota47, nota48,
    nota49, nota50, nota51, nota52, nota53, nota54, nota55, nota56, nota57, nota58,
    nota59, nota60, nota61, nota62, nota63, nota64, nota65, nota66, nota67, nota68,
    nota69, nota70, nota71, nota72, nota73, nota74, nota75, nota76, nota77, nota78,
    nota79, nota80, nota81, nota82, nota83, nota84, nota85, nota86, nota87, nota88,
    nota89, nota90, nota91, nota92, nota93, nota94, nota95, nota96
] = await Nota.create([
    // Notas de tipo Actividad (usan idActividad e idAlumno)
    { nombre: "TP1 Ejercicios", tipo: "actividad", valor: 8, fecha: new Date("2024-05-17"), idActividad: actividad1._id, idAlumno: alumno1._id },
    { nombre: "TP1 Ejercicios", tipo: "actividad", valor: 7, fecha: new Date("2024-05-17"), idActividad: actividad1._id, idAlumno: alumno7._id },
    { nombre: "TP1 Ejercicios", tipo: "actividad", valor: 9, fecha: new Date("2024-05-17"), idActividad: actividad1._id, idAlumno: alumno10._id },
    { nombre: "TP Geometría", tipo: "actividad", valor: 6, fecha: new Date("2024-05-24"), idActividad: actividad2._id, idAlumno: alumno2._id },
    { nombre: "TP Geometría", tipo: "actividad", valor: 10, fecha: new Date("2024-05-24"), idActividad: actividad2._id, idAlumno: alumno5._id },
    { nombre: "Ecuaciones Simples", tipo: "actividad", valor: 8, fecha: new Date("2024-05-31"), idActividad: actividad3._id, idAlumno: alumno3._id },
    { nombre: "Ecuaciones Simples", tipo: "actividad", valor: 5, fecha: new Date("2024-05-31"), idActividad: actividad3._id, idAlumno: alumno4._id },
    { nombre: "Análisis Mitos", tipo: "actividad", valor: 9, fecha: new Date("2024-06-07"), idActividad: actividad4._id, idAlumno: alumno1._id },
    { nombre: "Gramática TP", tipo: "actividad", valor: 7, fecha: new Date("2024-06-14"), idActividad: actividad5._id, idAlumno: alumno2._id },
    { nombre: "Cuentos Breves", tipo: "actividad", valor: 8, fecha: new Date("2024-06-21"), idActividad: actividad6._id, idAlumno: alumno3._id },
    { nombre: "Geografía Mapas", tipo: "actividad", valor: 10, fecha: new Date("2024-06-28"), idActividad: actividad7._id, idAlumno: alumno1._id },
    { nombre: "Civilizaciones", tipo: "actividad", valor: 6, fecha: new Date("2024-07-05"), idActividad: actividad8._id, idAlumno: alumno7._id },
    { nombre: "Informe Célula", tipo: "actividad", valor: 8, fecha: new Date("2024-07-12"), idActividad: actividad9._id, idAlumno: alumno10._id },
    { nombre: "Lab Materia", tipo: "actividad", valor: 9, fecha: new Date("2024-07-19"), idActividad: actividad10._id, idAlumno: alumno11._id },
    { nombre: "Circuito Motor", tipo: "actividad", valor: 9, fecha: new Date("2024-07-26"), idActividad: actividad11._id, idAlumno: alumno1._id },
    { nombre: "Deportes TP", tipo: "actividad", valor: 8, fecha: new Date("2024-08-02"), idActividad: actividad12._id, idAlumno: alumno7._id },
    { nombre: "Oral Presentation", tipo: "actividad", valor: 7, fecha: new Date("2024-08-09"), idActividad: actividad13._id, idAlumno: alumno10._id },
    { nombre: "Daily Routines", tipo: "actividad", valor: 8, fecha: new Date("2024-08-16"), idActividad: actividad14._id, idAlumno: alumno11._id },
    { nombre: "Lámina Color", tipo: "actividad", valor: 10, fecha: new Date("2024-08-23"), idActividad: actividad15._id, idAlumno: alumno1._id },
    { nombre: "Análisis Visual", tipo: "actividad", valor: 8, fecha: new Date("2024-08-30"), idActividad: actividad16._id, idAlumno: alumno7._id },
    { nombre: "Debate DDHH", tipo: "actividad", valor: 9, fecha: new Date("2024-09-06"), idActividad: actividad17._id, idAlumno: alumno10._id },
    { nombre: "Convivencia TP", tipo: "actividad", valor: 8, fecha: new Date("2024-09-13"), idActividad: actividad18._id, idAlumno: alumno11._id },
    { nombre: "Guía Enteros", tipo: "actividad", valor: 7, fecha: new Date("2024-09-20"), idActividad: actividad19._id, idAlumno: alumno3._id },
    { nombre: "Funciones TP", tipo: "actividad", valor: 6, fecha: new Date("2024-09-27"), idActividad: actividad20._id, idAlumno: alumno4._id },
    { nombre: "Texto Argumentativo", tipo: "actividad", valor: 8, fecha: new Date("2024-10-04"), idActividad: actividad21._id, idAlumno: alumno6._id },
    { nombre: "Feudalismo Informe", tipo: "actividad", valor: 9, fecha: new Date("2024-10-11"), idActividad: actividad22._id, idAlumno: alumno9._id },
    { nombre: "Lab Fisicoquímica", tipo: "actividad", valor: 7, fecha: new Date("2024-10-18"), idActividad: actividad23._id, idAlumno: alumno13._id },
    { nombre: "Ecosistemas TP", tipo: "actividad", valor: 10, fecha: new Date("2024-10-25"), idActividad: actividad24._id, idAlumno: alumno15._id },
    { nombre: "Aptitud Física", tipo: "actividad", valor: 8, fecha: new Date("2024-11-01"), idActividad: actividad25._id, idAlumno: alumno2._id },
    { nombre: "Táctica Deportiva", tipo: "actividad", valor: 9, fecha: new Date("2024-11-08"), idActividad: actividad26._id, idAlumno: alumno5._id },
    { nombre: "Past Tenses", tipo: "actividad", valor: 7, fecha: new Date("2024-11-15"), idActividad: actividad27._id, idAlumno: alumno8._id },
    { nombre: "Modelado Escultura", tipo: "actividad", valor: 8, fecha: new Date("2024-11-22"), idActividad: actividad28._id, idAlumno: alumno12._id },

    // Notas de tipo Evaluación (usan idEvaluacion e idAlumno)
    { nombre: "Examen 1 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-05-15"), idEvaluacion: evaluacion1._id, idAlumno: alumno1._id },
    { nombre: "Examen 1 Parcial", tipo: "evaluacion", valor: 6, fecha: new Date("2024-05-15"), idEvaluacion: evaluacion1._id, idAlumno: alumno7._id },
    { nombre: "Examen 1 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-05-15"), idEvaluacion: evaluacion1._id, idAlumno: alumno10._id },
    { nombre: "Examen 2 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-05-22"), idEvaluacion: evaluacion2._id, idAlumno: alumno1._id },
    { nombre: "Examen 2 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-05-22"), idEvaluacion: evaluacion2._id, idAlumno: alumno7._id },
    { nombre: "Examen 3 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-05-29"), idEvaluacion: evaluacion3._id, idAlumno: alumno1._id },
    { nombre: "Examen 4 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-06-05"), idEvaluacion: evaluacion4._id, idAlumno: alumno1._id },
    { nombre: "Examen 5 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-06-12"), idEvaluacion: evaluacion5._id, idAlumno: alumno1._id },
    { nombre: "Examen 6 Parcial", tipo: "evaluacion", valor: 10, fecha: new Date("2024-06-19"), idEvaluacion: evaluacion6._id, idAlumno: alumno1._id },
    { nombre: "Examen 7 Parcial", tipo: "evaluacion", valor: 6, fecha: new Date("2024-06-26"), idEvaluacion: evaluacion7._id, idAlumno: alumno1._id },
    { nombre: "Examen 8 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-07-03"), idEvaluacion: evaluacion8._id, idAlumno: alumno1._id },
    { nombre: "Examen 9 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-07-10"), idEvaluacion: evaluacion9._id, idAlumno: alumno1._id },
    { nombre: "Examen 10 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-07-17"), idEvaluacion: evaluacion10._id, idAlumno: alumno1._id },
    { nombre: "Examen 11 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-07-24"), idEvaluacion: evaluacion11._id, idAlumno: alumno1._id },
    { nombre: "Examen 12 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-07-31"), idEvaluacion: evaluacion12._id, idAlumno: alumno1._id },
    { nombre: "Examen 1 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-05-15"), idEvaluacion: evaluacion1._id, idAlumno: alumno11._id },
    { nombre: "Examen 2 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-05-22"), idEvaluacion: evaluacion2._id, idAlumno: alumno2._id },
    { nombre: "Examen 3 Parcial", tipo: "evaluacion", valor: 6, fecha: new Date("2024-05-29"), idEvaluacion: evaluacion3._id, idAlumno: alumno3._id },
    { nombre: "Examen 4 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-06-05"), idEvaluacion: evaluacion4._id, idAlumno: alumno4._id },
    { nombre: "Examen 5 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-06-12"), idEvaluacion: evaluacion5._id, idAlumno: alumno5._id },
    { nombre: "Examen 6 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-06-19"), idEvaluacion: evaluacion6._id, idAlumno: alumno6._id },
    { nombre: "Examen 7 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-06-26"), idEvaluacion: evaluacion7._id, idAlumno: alumno8._id },
    { nombre: "Examen 8 Parcial", tipo: "evaluacion", valor: 6, fecha: new Date("2024-07-03"), idEvaluacion: evaluacion8._id, idAlumno: alumno9._id },
    { nombre: "Examen 9 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-07-10"), idEvaluacion: evaluacion9._id, idAlumno: alumno12._id },
    { nombre: "Examen 10 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-07-17"), idEvaluacion: evaluacion10._id, idAlumno: alumno13._id },
    { nombre: "Examen 11 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-07-24"), idEvaluacion: evaluacion11._id, idAlumno: alumno14._id },
    { nombre: "Examen 12 Parcial", tipo: "evaluacion", valor: 10, fecha: new Date("2024-07-31"), idEvaluacion: evaluacion12._id, idAlumno: alumno15._id },
    { nombre: "Examen 13 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-08-07"), idEvaluacion: evaluacion13._id, idAlumno: alumno2._id },
    { nombre: "Examen 14 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-08-14"), idEvaluacion: evaluacion14._id, idAlumno: alumno5._id },
    { nombre: "Examen 15 Parcial", tipo: "evaluacion", valor: 9, fecha: new Date("2024-08-21"), idEvaluacion: evaluacion15._id, idAlumno: alumno8._id },
    { nombre: "Examen 16 Parcial", tipo: "evaluacion", valor: 7, fecha: new Date("2024-08-28"), idEvaluacion: evaluacion16._id, idAlumno: alumno12._id },
    { nombre: "Examen 17 Parcial", tipo: "evaluacion", valor: 8, fecha: new Date("2024-09-04"), idEvaluacion: evaluacion17._id, idAlumno: alumno3._id },

    // Notas de Cierre / Trimestrales (usan idMateria e idAlumno)
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-05-31"), idMateria: materia1._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 7, fecha: new Date("2024-05-31"), idMateria: materia1._id, idAlumno: alumno7._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-05-31"), idMateria: materia1._id, idAlumno: alumno10._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-05-31"), idMateria: materia2._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-05-31"), idMateria: materia2._id, idAlumno: alumno7._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 7, fecha: new Date("2024-05-31"), idMateria: materia3._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-05-31"), idMateria: materia4._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 10, fecha: new Date("2024-05-31"), idMateria: materia5._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-05-31"), idMateria: materia6._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-05-31"), idMateria: materia7._id, idAlumno: alumno1._id },
    { nombre: "Cierre 1er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-05-31"), idMateria: materia8._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-08-31"), idMateria: materia1._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 7, fecha: new Date("2024-08-31"), idMateria: materia1._id, idAlumno: alumno7._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-08-31"), idMateria: materia1._id, idAlumno: alumno10._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-08-31"), idMateria: materia2._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-08-31"), idMateria: materia3._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-08-31"), idMateria: materia4._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 10, fecha: new Date("2024-08-31"), idMateria: materia5._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 7, fecha: new Date("2024-08-31"), idMateria: materia6._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-08-31"), idMateria: materia7._id, idAlumno: alumno1._id },
    { nombre: "Cierre 2do Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-08-31"), idMateria: materia8._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-11-30"), idMateria: materia1._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-11-30"), idMateria: materia1._id, idAlumno: alumno7._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 10, fecha: new Date("2024-11-30"), idMateria: materia1._id, idAlumno: alumno10._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-11-30"), idMateria: materia2._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-11-30"), idMateria: materia3._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-11-30"), idMateria: materia4._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 10, fecha: new Date("2024-11-30"), idMateria: materia5._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 8, fecha: new Date("2024-11-30"), idMateria: materia6._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-11-30"), idMateria: materia7._id, idAlumno: alumno1._id },
    { nombre: "Cierre 3er Trimestre", tipo: "cierre trimestre", valor: 9, fecha: new Date("2024-11-30"), idMateria: materia8._id, idAlumno: alumno1._id },
    { nombre: "Cierre Anual", tipo: "cierre anual", valor: 9, fecha: new Date("2024-12-05"), idMateria: materia1._id, idAlumno: alumno1._id }
]);

    
await mongoose.connection.close();