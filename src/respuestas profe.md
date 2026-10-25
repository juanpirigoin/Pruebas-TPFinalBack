Respuesta a tus consultas · Juan Pablo
Hola Juan Pablo, ¿cómo va? Gracias por lo que me decís, y más todavía por mandar la consulta así de ordenada: con el link al repo y el cuadro de permisos pude mirar el código de verdad y no adivinar.

Te contesto las cinco preguntas y al final te dejo tres cosas que vi en el código que conviene que arregles antes de seguir, porque una de ellas te va a dar dolores de cabeza justo cuando algo falle.

Antes que nada: el cuadro de permisos que armaste es el paso que casi nadie hace, y es exactamente lo que hay que tener antes de escribir un middleware de roles. Arrancaste bien.


1) ¿Agrego el rol "admin"? ¿Y el enum va separado?
Sí a los dos.

Sobre el admin: tenelo claro para qué lo querés. Mirando tu cuadro, el administrativo ya hace casi todo. El admin es el que crea al primer administrativo y el que arregla cosas cuando algo se rompe. Es un rol de mantenimiento, no de uso diario. Con esa idea está perfecto que exista.

Sobre el enum separado: sí, y el motivo es bien concreto, no es por prolijo.

El texto "docente" te va a aparecer en tres lugares: el modelo, cada ruta (permitirRoles("docente")) y los condicionales de los services. Si en algún lado escribís permitirRoles("docnete"), no se rompe nada: simplemente no deja pasar a nadie, y te vas a volver loco buscando el error en el token.

Con una constante, el typo revienta al toque:

// src/utils/constants.js

export const ROLES = Object.freeze({

    PADRE: "padre",

    ALUMNO: "alumno",

    DOCENTE: "docente",

    ADMINISTRATIVO: "administrativo",

    ADMIN: "admin",

})

Y en el modelo:

import { ROLES } from "../utils/constants.js"

rol: {

    type: String,

    required: [true, "El rol es obligatorio"],

    enum: Object.values(ROLES)      // sale de un solo lugar

}

ROLES.DOCNETE es undefined y lo ves enseguida. "docnete" es un string válido que no coincide con nada y falla en silencio.

Aprovechá y armate también el atajo, como el soloStaff que usamos en clase:

export const soloDocente = [verificarToken, permitirRoles(ROLES.DOCENTE, ROLES.ADMIN)]

export const soloAdministrativo = [verificarToken, permitirRoles(ROLES.ADMINISTRATIVO, ROLES.ADMIN)]


2) "padre" y "alumno" tienen los mismos permisos, ¿los unifico?
No los unifiques. Y acá hay una distinción que te va a servir para todo el proyecto:



Qué pregunta
Dónde se resuelve
Permiso
¿podés leer notas?
permitirRoles, en la ruta
Alcance
¿cuáles notas podés leer?
el service


Tu cuadro modela lo primero. Por eso te dan iguales. Pero no son iguales: un alumno ve las suyas, un padre ve las de sus hijos. Mismo permiso, distinto alcance.

Y hay un motivo práctico: unir dos roles más adelante es fácil; separar un rol que ya unificaste es una migración de usuarios. Si mañana el padre tiene que justificar una inasistencia y el alumno entregar una actividad, ya los tenés separados y no tocás nada.

El rol no es la lista de permisos: el rol es quién sos. Los permisos cambian con el tiempo; quién sos, no.


3) Hay muchísimos servicios, ¿dejo algunos como pendientes?
Sí, y es la decisión correcta. Dos consejos para que te rinda:

Cortá en vertical, no en horizontal. En vez de "hago todos los modelos, después todos los services, después todas las rutas", terminá notas de punta a punta: modelo → service → controller → ruta → test → Swagger. Una sola funcionalidad terminada te enseña más que ocho a medias, y te queda un molde para copiar en las otras.

Declarar lo pendiente es profesional; esconderlo, no. Pero escribilo con precisión, en el README:

Asistencias — CRUD funcionando. Pendiente: el filtro por rol (un padre debería ver solo las de sus hijos). Hoy cualquier usuario autenticado ve todas.

Eso vale muchísimo más que entregar algo "completo" que falla. En asistencias yo dejaría el CRUD básico andando (te sale barato) y pendiente solo la regla fina.

Ya tenés un gap.md en el proyecto, que es justo esta idea. Mantenelo.


4) El filtro por rol: ¿condicional adentro del service o dos services? ⭐
Esta es la pregunta más importante de las cinco, así que me extiendo un poco.

Un solo service, que reciba el usuario. Y no es por comodidad: es por seguridad.
El problema que tenés hoy
Tu listarNotaService agarra los filtros de req.query. O sea que si un padre manda:

GET /api/notas?idAlumno=<el id de cualquier otro chico>

le vas a devolver las notas de un alumno que no es su hijo. Es el mismo agujero que vimos en clase con los pedidos ajenos: el cliente no puede elegir su propio alcance.
Cómo se resuelve
El alcance lo impone el servidor, y los filtros que manda el cliente se suman, nunca reemplazan:

// Qué filas puede ver CADA rol. Va en una función aparte para poder testearla sola.

const alcanceDeNotas = async (usuario) => {

    switch (usuario.rol) {

        case ROLES.PADRE:

        case ROLES.ALUMNO:

            // sale del USUARIO, no del query

            return { idAlumno: { $in: usuario.idAlumno } }

        case ROLES.DOCENTE:

            // ojo: esto supone el cambio del punto 5 (idMateria en vez de idCurso).

            // Si todavía tenés idCurso, acá habría que buscar primero las materias

            // de esos cursos, que es una consulta de más. Otra razón para el cambio.

            return { idMateria: { $in: usuario.idMateria } }

        default:

            return {}      // administrativo y admin ven todo

    }

}

export const listarNotasService = async (usuario, filtros = {}) => {

    const obligatorio = await alcanceDeNotas(usuario)

    // ⭐ el alcance va DESPUÉS en el spread: pisa cualquier cosa

    //    que haya mandado el cliente. Ese orden es el candado.

    const filtro = { ...filtros, ...obligatorio }

    return await Nota.find(filtro)

        .populate("idAlumno", "nombre apellido")

        .populate({

            path: "idMateria",

            select: "nombre",

            populate: { path: "idCurso", select: "nombre" }   // el populate anidado que decías

        })

        .populate("idActividad", "nombre")

        .populate("idEvaluacion", "nombre")

}

Y el controller queda igual de corto que ahora:

export const listarNotaController = async (req, res) => {

    const notas = await listarNotasService(req.usuario, req.query)

    res.json(notas)

}
Por qué no dos services
Los dos iban a tener el mismo populate anidado y el mismo armado de respuesta. El día que agregues un campo lo arreglás en uno y te olvidás del otro. Y el switch son cuatro líneas: no es "un condicional gigante que ensucia el service", es una función chiquita al lado, que además podés testear sola — que es justo lo que querías lograr pensando en dos services.
Un detalle que te va a trabar en 10 minutos
Tu verificarToken deja esto:

req.usuario = { id: payload.id, rol: payload.rol }

O sea no tenés idAlumno ni idMateria, que es lo que necesita alcanceDeNotas. Tenés dos caminos:

Meterlos en el token. Más rápido, pero si le asignás una materia nueva a un docente, no la ve hasta que cierre sesión y vuelva a entrar.
Cargar el usuario de la base, en un middleware chiquito después de verificarToken. Una consulta más por request, y los permisos siempre reflejan lo que dice la base.

Yo iría por el segundo. Algo así:

// src/middleware/cargarUsuario.js

export const cargarUsuario = async (req, res, next) => {

    const usuario = await Usuario.findById(req.usuario.id)

    if (!usuario) {

        throw new ErrorApp("El usuario del token ya no existe", 401)

    }

    req.usuario = usuario    // ahora sí tiene rol, idAlumno, idMateria...

    next()

}

Fijate el bonus: si borrás un usuario, su token deja de servir en el acto.


5) El idMateria al crear una unidad
Te contestaste solo, y acertaste en las dos cosas. Te confirmo y agrego la que falta.

Sí, el front manda el id. Un <select> con las materias del docente, y al elegir "Matemática" manda el _id. Es lo normal: el back no adivina, el front elige de una lista que el back le dio antes.

Sí, pasar de idCurso[] a idMateria[] en el docente es mejor, y por una razón de modelo: la relación real es "el docente dicta una materia", no "pertenece a un curso". Y no perdés nada, porque desde la materia llegás al curso (materia.idCurso). Encima te resuelve el caso de dar Matemática en 1°A y 1°B: son dos materias distintas, y tu modelo ya lo soporta porque materia tiene su idCurso.

Lo que falta, y es lo importante: el back tiene que validar que esa materia sea suya. Nunca confíes en un id que viene en el body:

export const crearUnidadService = async (datos, usuario) => {

    const esDocente = usuario.rol === ROLES.DOCENTE

    const esSuya = usuario.idMateria.some(id => id.equals(datos.idMateria))

    if (esDocente && !esSuya) {

        throw new ErrorApp("Esa materia no es tuya", 403)

    }

    return await Unidad.create(datos)

}

Es el mismo chequeo del punto 4, pero del otro lado: allá filtrás lo que lee, acá validás lo que escribe. Si no lo ponés, cualquier docente puede cargarle unidades a la materia de otro.

Y para que el front no tenga que calcular nada, hacete:

GET /api/materias/mias     → las materias del usuario del token


Tres cosas que vi en el código
1 · ErrorApp no está importado en 7 services ⚠️
Esta es la urgente. Lo tenés en notaService, alumnoService, asistenciaService, cursoService, evaluacionService, materiaService y unidadService: lo usás en el catch, pero no lo importás.

Entonces, cuando ese catch se dispara, en vez de tu error controlado tirás ReferenceError: ErrorApp is not defined → 500. O sea: justo cuando algo sale mal, el manejo de errores también falla.

import { ErrorApp } from "../utils/ErrorApp.js"
2 · Esos try/catch están escondiendo el error, no manejándolo
catch (error) {

    throw new ErrorApp(`Error al crear la nota: ${error.message}`);

}

Fijate lo que pierde: si era un ValidationError, tu manejarErrores lo traducía a un 400 con el detalle de qué campo falta. Así queda un 400 genérico. Y si era un duplicado (code: 11000), también se pierde.

Sacá esos try/catch. Express 5 reenvía el error solo y tu middleware ya sabe traducirlo. El try/catch va solo cuando hacés algo con el error: traducirlo a un mensaje mejor, o deshacer algo que quedó a medias. Si no, está de más.
3 · El cast manual de ObjectId te va a dar un 500
filtro.idAlumno = new mongoose.Types.ObjectId(idAlumno.trim());

Si alguien manda ?idAlumno=hola, eso lanza un BSONError → 500. Y no es un error del servidor: el que mandó mal los datos fue el cliente, o sea que va 400.

Mongoose castea solo usando el schema, y si no puede tira un CastError que tu middleware ya traduce bien. Alcanza con:

if (idAlumno) filtro.idAlumno = idAlumno
Y una cosita menor
En alumno.js:

dni: { unique: [true, "El DNI ya está registrado"] }

unique no es un validador, es un índice de MongoDB: ese mensaje se ignora. Va unique: true a secas, y el mensaje lindo lo arma manejarErrores con el code 11000.


En resumen, por dónde seguiría
constants.js con ROLES + el middleware permitirRoles
Los tres arreglos del código de arriba (empezá por el import de ErrorApp)
El middleware cargarUsuario
Notas completo, de punta a punta, con alcanceDeNotas
Pasar el docente de idCurso[] a idMateria[]
El resto de los services copiando el molde de notas

Lo de los tests y Swagger está muy bien que lo quieras hacer, pero dejalos para cuando notas esté terminado: sobre una funcionalidad completa salen solos, sobre una a medias es pelear dos batallas juntas.

Una última: escribiste "voy descubriendo que no estoy tan seguro de lo que espero que haga cada servicio". Eso no es una falla tuya, es el trabajo. Darte cuenta de eso ahora, con los roles, es exactamente lo que tenía que pasar: los roles te obligan a contestar "¿quién hace qué?", y recién ahí se termina de definir qué tiene que hacer cada service. Vas bien.

Cualquier cosa me escribís.

