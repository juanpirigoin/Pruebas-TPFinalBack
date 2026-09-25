import mongoose from "mongoose";
import { conectDB } from "./db.js";
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
    { nombre: "Juan", apellido: "Pérez", dni: "12345678", fechaNacimiento: new Date("2005-01-15"), id_curso: curso1._id },
    { nombre: "María", apellido: "Gómez", dni: "23456789", fechaNacimiento: new Date("2005-02-20"), id_curso: curso2._id },
    { nombre: "Pedro", apellido: "López", dni: "34567890", fechaNacimiento: new Date("2005-03-10"), id_curso: curso3._id },
    { nombre: "Lucía", apellido: "Martínez", dni: "45678901", fechaNacimiento: new Date("2005-04-05"), id_curso: curso3._id },
    { nombre: "Carlos", apellido: "Rodríguez", dni: "56789012", fechaNacimiento: new Date("2005-05-25"), id_curso: curso2._id },
    { nombre: "Ana", apellido: "Fernández", dni: "67890123", fechaNacimiento: new Date("2005-06-15"), id_curso: curso3._id },
    { nombre: "Luis", apellido: "García", dni: "78901234", fechaNacimiento: new Date("2005-07-30"), id_curso: curso1._id },
    { nombre: "Sofía", apellido: "Hernández", dni: "89012345", fechaNacimiento: new Date("2005-08-20"), id_curso: curso2._id },
    { nombre: "Diego", apellido: "Ramírez", dni: "90123456", fechaNacimiento: new Date("2005-09-10"), id_curso: curso3._id },
    { nombre: "Valentina", apellido: "Torres", dni: "01234567", fechaNacimiento: new Date("2005-10-05"), id_curso: curso1._id },
    { nombre: "Martín", apellido: "Vargas", dni: "11223344", fechaNacimiento: new Date("2005-11-15"), id_curso: curso1._id },
    { nombre: "Camila", apellido: "Rojas", dni: "22334455", fechaNacimiento: new Date("2005-12-20"), id_curso: curso2._id },
    { nombre: "Javier", apellido: "Castro", dni: "33445566", fechaNacimiento: new Date("2006-01-10"), id_curso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza", dni: "44556677", fechaNacimiento: new Date("2006-02-05"), id_curso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz", dni: "55667788", fechaNacimiento: new Date("2006-03-25"), id_curso: curso3._id },
    { nombre: "Camila", apellido: "Rojas2", dni: "22334455", fechaNacimiento: new Date("2005-12-20"), id_curso: curso2._id },
    { nombre: "Javier", apellido: "Castro2", dni: "33445566", fechaNacimiento: new Date("2006-01-10"), id_curso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza2", dni: "44556677", fechaNacimiento: new Date("2006-02-05"), id_curso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz2", dni: "55667788", fechaNacimiento: new Date("2006-03-25"), id_curso: curso3._id },
    { nombre: "Camila", apellido: "Rojas3", dni: "22334455", fechaNacimiento: new Date("2005-12-20"), id_curso: curso2._id },
    { nombre: "Javier", apellido: "Castro3", dni: "33445566", fechaNacimiento: new Date("2006-01-10"), id_curso: curso3._id },
    { nombre: "Isabella", apellido: "Mendoza3", dni: "44556677", fechaNacimiento: new Date("2006-02-05"), id_curso: curso2._id },
    { nombre: "Santiago", apellido: "Cruz3", dni: "55667788", fechaNacimiento: new Date("2006-03-25"), id_curso: curso3._id },
    { nombre: "Emilia", apellido: "Suárez", dni: "66778899", fechaNacimiento: new Date("2006-04-12"), id_curso: curso1._id },
    { nombre: "Tomás", apellido: "Benítez", dni: "77889900", fechaNacimiento: new Date("2006-05-18"), id_curso: curso2._id },
    { nombre: "Florencia", apellido: "Silva", dni: "88990011", fechaNacimiento: new Date("2006-06-25"), id_curso: curso3._id },
    { nombre: "Mateo", apellido: "Domínguez", dni: "99001122", fechaNacimiento: new Date("2006-07-30"), id_curso: curso1._id },
    { nombre: "Agustina", apellido: "Morales", dni: "10111213", fechaNacimiento: new Date("2006-08-15"), id_curso: curso2._id },
    { nombre: "Benjamín", apellido: "Paz", dni: "11121314", fechaNacimiento: new Date("2006-09-20"), id_curso: curso3._id },
    { nombre: "Catalina", apellido: "Sosa", dni: "12131415", fechaNacimiento: new Date("2006-10-05"), id_curso: curso1._id },
    { nombre: "Franco", apellido: "Aguilar", dni: "13141516", fechaNacimiento: new Date("2006-11-12"), id_curso: curso2._id },
    { nombre: "Julieta", apellido: "Peralta", dni: "14151617", fechaNacimiento: new Date("2006-12-22"), id_curso: curso3._id },
    { nombre: "Nicolás", apellido: "Ortiz", dni: "15161718", fechaNacimiento: new Date("2007-01-08"), id_curso: curso1._id },
    { nombre: "Mía", apellido: "Luna", dni: "16171819", fechaNacimiento: new Date("2007-02-14"), id_curso: curso2._id },
    { nombre: "Thiago", apellido: "Ferreyra", dni: "17181920", fechaNacimiento: new Date("2007-03-19"), id_curso: curso3._id },
    { nombre: "Valeria", apellido: "Acosta", dni: "18192021", fechaNacimiento: new Date("2007-04-25"), id_curso: curso1._id },
    { nombre: "Facundo", apellido: "Molina", dni: "19202122", fechaNacimiento: new Date("2007-05-30"), id_curso: curso2._id },
    { nombre: "Renata", apellido: "Carrizo", dni: "20212223", fechaNacimiento: new Date("2007-06-18"), id_curso: curso3._id },
    { nombre: "Gonzalo", apellido: "Navarro", dni: "21222324", fechaNacimiento: new Date("2007-07-09"), id_curso: curso1._id },
    { nombre: "Martina", apellido: "Quiroga", dni: "22232425", fechaNacimiento: new Date("2007-08-21"), id_curso: curso2._id },
    { nombre: "Lucas", apellido: "Vega", dni: "23242526", fechaNacimiento: new Date("2007-09-13"), id_curso: curso3._id },
    { nombre: "Abril", apellido: "Campos", dni: "24252627", fechaNacimiento: new Date("2007-10-27"), id_curso: curso1._id },
    { nombre: "Juan Cruz", apellido: "Ledesma", dni: "25262728", fechaNacimiento: new Date("2007-11-15"), id_curso: curso2._id }
]);

const [
    materia1, materia2, materia3, materia4, materia5, materia6, materia7, materia8,
    materia9, materia10, materia11, materia12, materia13, materia14, materia15, materia16,
    materia17, materia18, materia19, materia20, materia21, materia22, materia23, materia24
 ] = await Materia.create([
    { nombreMateria: "Matemática", area: "Ciencias Exactas", id_curso: curso1._id },
    { nombreMateria: "Practicas del lenguaje", area: "Ciencias Sociales", id_curso: curso1._id },
    { nombreMateria: "Ciencias Sociales", area: "Ciencias Sociales", id_curso: curso1._id },
    { nombreMateria: "Ciencias Naturales", area: "Ciencias Naturales", id_curso: curso1._id },
    { nombreMateria: "Educación Física", area: "Educación Física", id_curso: curso1._id },
    { nombreMateria: "Ingles", area: "Ciencias Sociales", id_curso: curso1._id },
    { nombreMateria: "Artística", area: "Arte", id_curso: curso1._id },
    { nombreMateria: "Construcción de la ciudadanía", area: "Ciencias Sociales", id_curso: curso1._id },
    { nombreMateria: "Matemática", area: "Ciencias Exactas", id_curso: curso2._id },
    { nombreMateria: "Practicas del lenguaje", area: "Ciencias Sociales", id_curso: curso2._id },
    { nombreMateria: "Ciencias Sociales", area: "Ciencias Sociales", id_curso: curso2._id },
    { nombreMateria: "Ciencias Naturales", area: "Ciencias Naturales", id_curso: curso2._id },
    { nombreMateria: "Educación Física", area: "Educación Física", id_curso: curso2._id },
    { nombreMateria: "Ingles", area: "Ciencias Sociales", id_curso: curso2._id },
    { nombreMateria: "Artística", area: "Arte", id_curso: curso2._id },
    { nombreMateria: "Construcción de la ciudadanía", area: "Ciencias Sociales", id_curso: curso2._id },
    { nombreMateria: "Matemática", area: "Ciencias Exactas", id_curso: curso3._id },
    { nombreMateria: "Practicas del lenguaje", area: "Ciencias Sociales", id_curso: curso3._id },
    { nombreMateria: "Ciencias Sociales", area: "Ciencias Sociales", id_curso: curso3._id },
    { nombreMateria: "Ciencias Naturales", area: "Ciencias Naturales", id_curso: curso3._id },
    { nombreMateria: "Educación Física", area: "Educación Física", id_curso: curso3._id },
    { nombreMateria: "Ingles", area: "Ciencias Sociales", id_curso: curso3._id },
    { nombreMateria: "Artística", area: "Arte", id_curso: curso3._id },
    { nombreMateria: "Construcción de la ciudadanía", area: "Ciencias Sociales", id_curso: curso3._id },


]);

const [
    unidad1, unidad2, unidad3, unidad4, unidad5, unidad6, unidad7, unidad8, unidad9, unidad10, unidad11, unidad12, unidad13, unidad14, unidad15, unidad16, unidad17, unidad18, unidad19, unidad20, unidad21, unidad22, unidad23, unidad24, unidad25, unidad26, unidad27, unidad28, unidad29, unidad30, unidad31, unidad32, unidad33, unidad34, unidad35, unidad36, unidad37, unidad38, unidad39, unidad40, unidad41, unidad42, unidad43, unidad44, unidad45, unidad46, unidad47, unidad48 
] = await Unidad.create([
    
    { nombreUnidad: "Unidad 1: Números y Operaciones", descripcion: "Estudio de los números naturales, propiedades y operaciones básicas.", id_materia: materia1._id },
    { nombreUnidad: "Unidad 2: Geometría y Medición", descripcion: "Conceptos fundamentales de figuras geométricas, ángulos y perímetros.", id_materia: materia1._id },
    { nombreUnidad: "Unidad 3: Introducción al Álgebra", descripcion: "Ecuaciones simples y expresiones algebraicas básicas.", id_materia: materia1._id },

    { nombreUnidad: "Unidad 1: Comprensión Lectora y Mitos", descripcion: "Lectura crítica de textos narrativos, mitos y leyendas.", id_materia: materia2._id },
    { nombreUnidad: "Unidad 2: Gramática y Ortografía", descripcion: "Reglas de acentuación, clases de palabras y sintaxis sintáctica.", id_materia: materia2._id },
    { nombreUnidad: "Unidad 3: Literatura y Producción Escrita", descripcion: "Creación de cuentos breves y análisis de textos literarios.", id_materia: materia2._id },

    { nombreUnidad: "Unidad 1: Introducción a la Geografía", descripcion: "Representación del espacio geográfico, mapas y coordenadas.", id_materia: materia3._id },
    { nombreUnidad: "Unidad 2: Primeras Civilizaciones", descripcion: "Estudio de las sociedades antiguas y el surgimiento del Estado.", id_materia: materia3._id },

    { nombreUnidad: "Unidad 1: La Célula y la Vida", descripcion: "Estructura celular, funciones vitales y niveles de organización.", id_materia: materia4._id },
    { nombreUnidad: "Unidad 2: Materia y Energía", descripcion: "Propiedades de la materia, estados de agregación y transformaciones.", id_materia: materia4._id },

    { nombreUnidad: "Unidad 1: Capacidades Motoras", descripcion: "Desarrollo de resistencia, fuerza, flexibilidad y velocidad.", id_materia: materia5._id },
    { nombreUnidad: "Unidad 2: Deportes Colectivos", descripcion: "Reglas, tácticas y fundamentos de deportes en equipo.", id_materia: materia5._id },

    { nombreUnidad: "Unidad 1: Greetings and Introductions", descripcion: "Vocabulario básico para presentarse, saludar y describir objetos.", id_materia: materia6._id },
    { nombreUnidad: "Unidad 2: Daily Routines & Present Simple", descripcion: "Uso del presente simple para describir rutinas y hábitos diarios.", id_materia: materia6._id },

    { nombreUnidad: "Unidad 1: Lenguaje Visual y Color", descripcion: "Elementos fundamentales de la imagen: punto, línea, plano y teoría del color.", id_materia: materia7._id },
    { nombreUnidad: "Unidad 2: Composición Espacial", descripcion: "Técnicas de composición, bidimensión y tridimensión.", id_materia: materia7._id },

    { nombreUnidad: "Unidad 1: Derechos Humanos y Ciudadanía", descripcion: "Conceptos de democracia, derechos fundamentales y participación.", id_materia: materia8._id },
    { nombreUnidad: "Unidad 2: Identidad y Convivencia", descripcion: "Diversidad cultural, respeto y normas de convivencia escolar.", id_materia: materia8._id },

    { nombreUnidad: "Unidad 1: Números y Operaciones", descripcion: "Estudio de los números naturales, propiedades y operaciones básicas.", id_materia: materia9._id },
    { nombreUnidad: "Unidad 2: Geometría y Medición", descripcion: "Conceptos fundamentales de figuras geométricas, ángulos y perímetros.", id_materia: materia9._id },

    { nombreUnidad: "Unidad 1: Comprensión Lectora y Mitos", descripcion: "Lectura crítica de textos narrativos, mitos y leyendas.", id_materia: materia10._id },
    { nombreUnidad: "Unidad 2: Gramática y Ortografía", descripcion: "Reglas de acentuación, clases de palabras y sintaxis sintáctica.", id_materia: materia10._id },

    { nombreUnidad: "Unidad 1: Introducción a la Geografía", descripcion: "Representación del espacio geográfico, mapas y coordenadas.", id_materia: materia11._id },
    { nombreUnidad: "Unidad 2: Primeras Civilizaciones", descripcion: "Estudio de las sociedades antiguas y el surgimiento del Estado.", id_materia: materia11._id },

    { nombreUnidad: "Unidad 1: La Célula y la Vida", descripcion: "Estructura celular, funciones vitales y niveles de organización.", id_materia: materia12._id },
    { nombreUnidad: "Unidad 2: Materia y Energía", descripcion: "Propiedades de la materia, estados de agregación y transformaciones.", id_materia: materia12._id },

    { nombreUnidad: "Unidad 1: Capacidades Motoras", descripcion: "Desarrollo de resistencia, fuerza, flexibilidad y velocidad.", id_materia: materia13._id },
    { nombreUnidad: "Unidad 2: Deportes Colectivos", descripcion: "Reglas, tácticas y fundamentos de deportes en equipo.", id_materia: materia13._id },

    { nombreUnidad: "Unidad 1: Greetings and Introductions", descripcion: "Vocabulario básico para presentarse, saludar y describir objetos.", id_materia: materia14._id },
    { nombreUnidad: "Unidad 2: Daily Routines & Present Simple", descripcion: "Uso del presente simple para describir rutinas y hábitos diarios.", id_materia: materia14._id },

    { nombreUnidad: "Unidad 1: Lenguaje Visual y Color", descripcion: "Elementos fundamentales de la imagen: punto, línea, plano y teoría del color.", id_materia: materia15._id },
    { nombreUnidad: "Unidad 2: Composición Espacial", descripcion: "Técnicas de composición, bidimensión y tridimensión.", id_materia: materia15._id },

    { nombreUnidad: "Unidad 1: Derechos Humanos y Ciudadanía", descripcion: "Conceptos de democracia, derechos fundamentales y participación.", id_materia: materia16._id },
    { nombreUnidad: "Unidad 2: Identidad y Convivencia", descripcion: "Diversidad cultural, respeto y normas de convivencia escolar.", id_materia: materia16._id },

    { nombreUnidad: "Unidad 1: Números Enteros y Racionales", descripcion: "Propiedades y operaciones con números enteros y fracciones.", id_materia: materia17._id },
    { nombreUnidad: "Unidad 2: Ecuaciones y Funciones", descripcion: "Resolución de ecuaciones algebraicas y conceptos iniciales de función.", id_materia: materia17._id },

    { nombreUnidad: "Unidad 1: El Texto Argumentativo", descripcion: "Estructura y análisis de textos opinativos y argumentativos.", id_materia: materia18._id },
    { nombreUnidad: "Unidad 2: Análisis Sintáctico y Semántico", descripcion: "Estudio profundo de la oración compuesta y semántica.", id_materia: materia18._id },

    { nombreUnidad: "Unidad 1: Edad Media y Feudalismo", descripcion: "Transformaciones sociales, políticas y económicas de la Edad Media.", id_materia: materia19._id },
    { nombreUnidad: "Unidad 2: Geografía de América", descripcion: "Características físicas, relieve y climas del continente americano.", id_materia: materia19._id },

    { nombreUnidad: "Unidad 1: Fisicoquímica y Reacciones", descripcion: "Estudio de mezclas, soluciones y cambios químicos básicos.", id_materia: materia20._id },
    { nombreUnidad: "Unidad 2: Biodiversidad y Ecosistemas", descripcion: "Relaciones tróficas y conservación de los recursos naturales.", id_materia: materia20._id },

    { nombreUnidad: "Unidad 1: Aptitud Física y Salud", descripcion: "Acondicionamiento físico y cuidado de la salud corporal.", id_materia: materia21._id },
    { nombreUnidad: "Unidad 2: Deportes de Conjunto", descripcion: "Desarrollo técnico y estratégico en deportes de equipo.", id_materia: materia21._id },

    { nombreUnidad: "Unidad 1: Past Simple and Continuous", descripcion: "Expresión de eventos pasados y acciones en desarrollo en el pasado.", id_materia: materia22._id },
    { nombreUnidad: "Unidad 2: Reading & Vocabulary", descripcion: "Lectura de textos adaptados y expansión del vocabulario general.", id_materia: materia22._id },

    { nombreUnidad: "Unidad 1: Grabado y Escultura", descripcion: "Exploración de técnicas tridimensionales y de impresión visual.", id_materia: materia23._id },
    { nombreUnidad: "Unidad 2: Historia del Arte", descripcion: "Recorrido por las vanguardias artísticas del siglo XX.", id_materia: materia23._id },
    
    { nombreUnidad: "Unidad 1: Estado y Constitución", descripcion: "Organización política del Estado y principios constitucionales.", id_materia: materia24._id },
    { nombreUnidad: "Unidad 2: Participación Juvenil", descripcion: "Mecanismos de participación social y proyectos comunitarios.", id_materia: materia24._id }
]);  

