# API RESTful de Gestión Escolar — Trabajo Práctico Final
**Curso de Backend Developer — UTN BA (Centro de e-Learning)**

API RESTful modular, robusta y escalable desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)** para la administración académica de una institución educativa. El sistema gestiona **usuarios**, **cursos**, **materias**, **alumnos**, **unidades temáticas**, **actividades**, **evaluaciones**, **notas** y **asistencias**. 

Aplica el patrón de **separación de responsabilidades** (Rutas $\to$ Controladores $\to$ Servicios $\to$ Modelos), autenticación con **JWT**, contraseñas hasheadas con **bcrypt**, y un **sistema de control de alcance y permisos basado en roles**.


---

## Índice

1. [Estructura del Proyecto](#1-estructura-del-proyecto-separación-de-responsabilidades)
2. [Tecnologías Utilizadas](#2-tecnologías-utilizadas)
3. [Esquema de la Base de Datos](#3-esquema-de-la-base-de-datos)
4. [Instrucciones de Instalación y Ejecución](#4-instrucciones-de-instalación-y-ejecución)
5. [Listado Completo de Endpoints](#5-listado-completo-de-endpoints)
6. [Ejemplos de Datos Mock (JSON) para Solicitudes y Respuestas](#6-ejemplos-de-datos-mock-json-para-solicitudes-y-respuestas)
7. [Manejo de Errores y Códigos de Estado](#7-manejo-de-errores-y-códigos-de-estado)
8. [Funcionalidades Implementadas y a Futuro](#8-funcionalidades-implementadas-y-a-futuro)
9. [Configuración de Variables de Entorno (.env)](#9-configuración-de-variables-de-entorno-env)

---

## 1. Estructura del Proyecto (Separación de Responsabilidades)

El proyecto presenta la arquitectura por capas descripta a continuación:

```
Pruebas-TPFinalBack/
├── package.json
├── README.md
├── .env
├── .env.example
├── .gitignore
└── src/
    ├── index.js                  # Punto de entrada de la aplicación Express
    ├── db.js                     # Conexión asíncrona a la base de datos MongoDB
    ├── seed.js                   # Script para poblar la base con datos de prueba
    │
    ├── models/                   # Capa de Datos: Esquemas y reglas de Mongoose
    │   ├── usuarioModel.js
    │   ├── cursoModel.js
    │   ├── materiaModel.js
    │   ├── unidadModel.js
    │   ├── actividadModel.js
    │   ├── evaluacionModel.js
    │   ├── alumnoModel.js
    │   ├── notaModel.js
    │   └── asistenciaModel.js
    │
    ├── controllers/              # Capa de Controladores: Manejan Request / Response
    │   ├── authController.js
    │   ├── usuarioController.js
    │   ├── cursoController.js
    │   ├── materiaController.js
    │   ├── unidadController.js
    │   ├── actividadController.js
    │   ├── evaluacionController.js
    │   ├── alumnoController.js
    │   ├── notaController.js
    │   └── asistenciaController.js
    │
    ├── services/                 # Capa de Servicios: Lógica de negocio y consultas DB
    │   ├── authService.js
    │   ├── usuarioService.js
    │   ├── cursoService.js
    │   ├── materiaService.js
    │   ├── unidadService.js
    │   ├── actividadService.js
    │   ├── evaluacionService.js
    │   ├── alumnoService.js
    │   ├── notaService.js
    │   └── asistenciaService.js
    │
    ├── routes/                   # Capa de Enrutamiento: URLs y middlewares asociados
    │   ├── authRoutes.js
    │   ├── usuarioRoutes.js
    │   ├── cursoRoutes.js
    │   ├── materiaRoutes.js
    │   ├── unidadRoutes.js
    │   ├── actividadRoutes.js
    │   ├── evaluacionRoutes.js
    │   ├── alumnoRoutes.js
    │   ├── notaRoutes.js
    │   └── asistenciaRoutes.js
    │
    ├── middleware/               # Middlewares de seguridad, sesión y errores
    │   ├── verificarToken.js     # Valida firma y vencimiento del JWT
    │   ├── cargarUsuario.js      # Carga el usuario completo desde la base de datos
    │   ├── permitirRoles.js      # Control de acceso basado en roles (RBAC)
    │   └── manejarErrores.js     # Captura y normalización global de excepciones
    │
    └── utils/                    # Configuraciones, constantes y clases auxiliares
        ├── config.js             # Variables de entorno parseadas
        ├── constants.js          # Enums de Roles congelados (Object.freeze)
        └── ErrorApp.js           # Clase de error para reglas de negocio
```

### Roles de cada capa:
* **Routes (`src/routes/`)**: Mapean métodos HTTP y paths hacia controladores. Asignan los middlewares de autenticación y autorización requeridos. No contienen lógica de negocio.
* **Controllers (`src/controllers/`)**: Ligeros. Extraen parámetros (`req.params`, `req.query`, `req.body`, `req.usuario`), delegan la ejecución a los servicios y retornan las respuestas con el código HTTP correspondiente.
* **Services (`src/services/`)**: Contienen toda la lógica de negocio, validaciones de dominio, control de alcance (filtros de pertenencia) y llamadas a Mongoose. No manipulan `req` ni `res`.
* **Models (`src/models/`)**: Definen la estructura de las colecciones, tipos de datos, validaciones intrínsecas (regex, rangos, longitudes), claves únicas y hooks del ciclo de vida (`pre-save`).
* **Middleware (`src/middleware/`)**: Interceptan el ciclo de vida de la petición para autenticar tokens JWT, verificar roles de usuario y capturar cualquier excepción no controlada.

---

## 2. Tecnologías Utilizadas

| Tecnología / Dependencia | Versión | Propósito en el proyecto |
|---|---|---|
| **Node.js** | `>= 20.x` | Entorno de ejecución JavaScript en el servidor (ES Modules) |
| **Express** | `^5.2.1` | Framework backend para diseño de API REST y manejo de middlewares |
| **Mongoose** | `^9.10.1` | Modelado de objetos, esquemas, validaciones y consultas a MongoDB |
| **bcrypt** | `^6.0.0` | Algoritmo de hasheo unidireccional de contraseñas con salt dinámico |
| **jsonwebtoken** | `^9.0.3` | Generación y verificación criptográfica de tokens JWT |
| **dotenv** | `^18.0.4` | Carga de variables de configuración sensibles desde archivo `.env` |
| **cors** | `^2.8.6` | Habilitación de peticiones de origen cruzado para clientes frontend |

---

## 3. Esquema de la Base de Datos

### Estructura de las Colecciones

#### 1. `usuarios`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado por MongoDB |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 caracteres |
| `apellido` | String | Requerido, mín 3 caracteres, máx 50 caracteres |
| `email` | String | Requerido, único, formato email validado por regex |
| `password` | String | Requerido, hasheado con bcrypt en pre-save, `select: false` |
| `rol` | String | Requerido, enum: `["admin", "administrativo", "docente", "alumno", "padre"]` |
| `idAlumno` | [ObjectId] | Opcional, referencia a colección `Alumno` (para roles alumno y padre) |
| `idMateria` | [ObjectId] | Opcional, referencia a colección `Materia` (para rol docente) |

#### 2. `cursos`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido (ej. `"1°A"`) |
| `nivel` | String | Requerido (ej. `"secundario"`) |
| `turno` | String | Requerido (ej. `"mañana"`, `"tarde"`) |

#### 3. `alumnos`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 |
| `apellido` | String | Requerido, mín 3 caracteres, máx 50 |
| `dni` | String | Requerido, único, entre 8 y 10 caracteres |
| `fechaNacimiento` | Date | Requerido |
| `idCurso` | ObjectId | **Referencia a `Curso`**, requerido |

#### 4. `materias`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 |
| `area` | String | Opcional, mín 3 caracteres, máx 50 (ej. `"Exactas"`) |
| `idCurso` | ObjectId | **Referencia a `Curso`**, requerido |

#### 5. `unidades`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 |
| `descripcion` | String | Opcional, mín 3, máx 300 caracteres |
| `idMateria` | ObjectId | **Referencia a `Materia`**, requerido |

#### 6. `actividades`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 |
| `tipo` | String | Requerido, mín 3 caracteres, máx 20 (ej. `"ejercicio"`, `"tp"`) |
| `fecha` | Date | Requerido |
| `idUnidad` | ObjectId | **Referencia a `Unidad`**, requerido |

#### 7. `evaluaciones`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Requerido, mín 3 caracteres, máx 50 |
| `tipo` | String | Requerido, mín 3 caracteres, máx 20 (ej. `"escrito"`, `"oral"`) |
| `fecha` | Date | Requerido |
| `idUnidad` | ObjectId | **Referencia a `Unidad`**, requerido |

#### 8. `notas`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `nombre` | String | Opcional, mín 3, máx 50 |
| `tipo` | String | Requerido, mín 3, máx 20 (ej. `"actividad"`, `"evaluacion"`, `"cierre trimestre"`) |
| `valor` | Number | Requerido, valor numérico entre `0` y `10` |
| `fecha` | Date | Requerido |
| `idMateria` | ObjectId | **Referencia a `Materia`**, requerido |
| `idAlumno` | ObjectId | **Referencia a `Alumno`**, requerido |
| `idActividad` | ObjectId | **Referencia a `Actividad`**, opcional |
| `idEvaluacion` | ObjectId | **Referencia a `Evaluacion`**, opcional |

#### 9. `asistencias`
| Campo | Tipo | Validaciones / Restricciones |
|---|---|---|
| `_id` | ObjectId | Autogenerado |
| `idAlumno` | ObjectId | **Referencia a `Alumno`**, requerido |
| `fecha` | Date | Requerido |
| `estado` | String | Requerido, enum: `["presente", "ausente", "tarde"]` |

---

## 4. Instrucciones de Instalación y Ejecución

### Prerrequisitos
* Node.js v18 o superior instalado.
* MongoDB en ejecución (servicio local en `mongodb://localhost:27017` o cluster de MongoDB Atlas).

### Paso 1: Clonar el repositorio e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd Pruebas-TPFinalBack
npm install
```

### Paso 2: Configurar las variables de entorno

Por motivos de seguridad y buenas prácticas, el archivo `.env` no se incluye en el repositorio. **Las variables de entorno listas para la corrección/evaluación están provistas en el documento de Google Drive adjunto a la entrega.**

1. Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`).
2. Copia y pega dentro del `.env` las variables provistas en el documento de Google Drive.

> Alternativamente, puedes generar el archivo copiando la plantilla de ejemplo y luego editar sus valores:
> - **En Windows (CMD / PowerShell):**
>   ```bash
>   copy .env.example .env
>   ```
> - **En Linux / macOS / Git Bash:**
>   ```bash
>   cp .env.example .env
>   ```
> Para más detalle sobre el propósito de cada variable, consulta la [Sección 9](#9-configuración-de-variables-de-entorno-env).

### Paso 3: Poblar la base de datos (Seed automático)

Ejecuta el script de seed para inicializar el colegio con datos coherentes (cursos, materias, alumnos, actividades, notas y usuarios de prueba):

```bash
npm run seed
```

### Paso 4: Iniciar el servidor

Modo Producción:
```bash
npm start
```

Modo Desarrollo (con reinicio automático ante cambios):
```bash
npm run dev
```

El servidor estará accesible en: `http://localhost:3000`.

---

### Usuarios de Prueba Precargados por el Seed

| Rol | Correo Electrónico | Contraseña | Alcance y Permisos |
|---|---|---|---|
| **Admin** | `admin@email.com` | `admin123` | Control total sobre todas las colecciones y usuarios |
| **Administrativo** | `administrativo1@email.com` | `administrativo123` | Gestión de cursos, materias, alumnos, asistencias y usuarios |
| **Docente** | `docente1@email.com` | `docente123` | Dicta Matemática en 1°A y 1°B. Solo accede a sus materias, unidades, notas y actividades |
| **Alumno** | `alumno1@email.com` | `alumno123` | Alumno Luis García (1°A). Solo consulta sus propias notas y asistencias |
| **Padre** | `padre1@email.com` | `padre123` | Padre de Juan Pérez (1°A). Solo consulta las notas y asistencias de su hijo |

---

## 5. Listado Completo de Endpoints

> 🔒 = Requiere encabezado `Authorization: Bearer <TOKEN>`

### 🔑 Autenticación (`/api/auth`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| POST | `/api/auth/registro` | Público | Registro público de usuarios (restringido a roles `padre` y `alumno`) |
| POST | `/api/auth/login` | Público | Autenticación de credenciales; retorna datos públicos del usuario y token JWT |
| GET | `/api/auth/perfil` | 🔒 Todos | Retorna el perfil completo del usuario autenticado |

### 👥 Usuarios (`/api/usuarios`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/usuarios` | 🔒 Admin / Administrativo | Lista todos los usuarios registrados (contraseñas omitidas) |
| GET | `/api/usuarios/:id` | 🔒 Admin / Administrativo | Obtiene un usuario específico por su ID |
| POST | `/api/usuarios` | 🔒 Admin / Administrativo | Crea un usuario interno (permite asignar roles docentes y administrativos) |
| PATCH | `/api/usuarios/:id` | 🔒 Admin / Administrativo | Actualiza datos de un usuario |
| DELETE | `/api/usuarios/:id` | 🔒 Admin / Administrativo | Elimina un usuario del sistema |

### 🏫 Cursos (`/api/cursos`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/cursos` | 🔒 Todos | Lista todos los cursos del establecimiento |
| GET | `/api/cursos/:id` | 🔒 Todos | Obtiene los detalles de un curso |
| POST | `/api/cursos` | 🔒 Admin / Administrativo | Crea un nuevo curso (ej. 1°A mañana) |
| PATCH | `/api/cursos/:id` | 🔒 Admin / Administrativo | Actualiza información del curso |
| DELETE | `/api/cursos/:id` | 🔒 Admin / Administrativo | Elimina un curso |

### 🎒 Alumnos (`/api/alumnos`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/alumnos` | 🔒 Admin / Administrativo / Docente | Lista alumnos (filtro opcional por curso: `?idCurso=<id>`) |
| GET | `/api/alumnos/:id` | 🔒 Admin / Administrativo / Docente | Obtiene la ficha de datos de un alumno con su curso populado |
| POST | `/api/alumnos` | 🔒 Admin / Administrativo | Matricula un nuevo alumno |
| PATCH | `/api/alumnos/:id` | 🔒 Admin / Administrativo | Modifica datos del alumno |
| DELETE | `/api/alumnos/:id` | 🔒 Admin / Administrativo | Da de baja a un alumno |

### 📚 Materias (`/api/materias`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/materias` | 🔒 Según alcance | Lista materias según alcance (docente: sus materias; alumno/padre: las de su curso) |
| GET | `/api/materias/:id` | 🔒 Según alcance | Obtiene una materia con su curso populado dentro de su alcance |
| POST | `/api/materias` | 🔒 Admin / Administrativo | Crea una materia asociada a un curso |
| PATCH | `/api/materias/:id` | 🔒 Admin / Administrativo | Modifica una materia |
| DELETE | `/api/materias/:id` | 🔒 Admin / Administrativo | Elimina una materia |

### 📖 Unidades (`/api/unidades`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/unidades` | 🔒 Según alcance | Lista unidades (filtro `?idMateria=<id>`). Docentes y alumnos/padres ven solo las de su alcance |
| GET | `/api/unidades/:id` | 🔒 Según alcance | Obtiene la unidad con sus **actividades y evaluaciones** asociadas |
| POST | `/api/unidades` | 🔒 Admin / Adminis. / Docente | Crea una unidad (docente limitado a sus materias) |
| PATCH | `/api/unidades/:id` | 🔒 Admin / Adminis. / Docente | Modifica una unidad dentro de su alcance |
| DELETE | `/api/unidades/:id` | 🔒 Admin / Adminis. / Docente | Elimina una unidad dentro de su alcance |

### 📝 Actividades (`/api/actividades`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/actividades` | 🔒 Según alcance | Lista actividades (filtro `?idUnidad=<id>`). Docente y alumno/padre limitados a su alcance |
| GET | `/api/actividades/:id` | 🔒 Según alcance | Detalle de una actividad dentro de su alcance |
| POST | `/api/actividades` | 🔒 Admin / Adminis. / Docente | Crea una actividad vinculada a una unidad |
| PATCH | `/api/actividades/:id` | 🔒 Admin / Adminis. / Docente | Actualiza una actividad |
| DELETE | `/api/actividades/:id` | 🔒 Admin / Adminis. / Docente | Elimina una actividad |

### 📋 Evaluaciones (`/api/evaluaciones`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/evaluaciones` | 🔒 Según alcance | Lista evaluaciones (filtro `?idUnidad=<id>`). Docente y alumno/padre limitados a su alcance |
| GET | `/api/evaluaciones/:id` | 🔒 Según alcance | Detalle de una evaluación dentro de su alcance |
| POST | `/api/evaluaciones` | 🔒 Admin / Adminis. / Docente | Crea una evaluación vinculada a una unidad |
| PATCH | `/api/evaluaciones/:id` | 🔒 Admin / Adminis. / Docente | Actualiza una evaluación |
| DELETE | `/api/evaluaciones/:id` | 🔒 Admin / Adminis. / Docente | Elimina una evaluación |

### 📊 Notas (`/api/notas`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/notas` | 🔒 Según alcance | Lista notas según alcance (Docente: sus materias; Padre/Alumno: su alumno; Admin: todas) |
| GET | `/api/notas/:id` | 🔒 Según alcance | Obtiene nota con alumno, materia, curso y actividad/evaluación populados |
| POST | `/api/notas` | 🔒 Admin / Adminis. / Docente | Carga una calificación (docente restringido a sus materias) |
| PATCH | `/api/notas/:id` | 🔒 Admin / Adminis. / Docente | Modifica calificación (impide reasignación a materias ajenas) |
| DELETE | `/api/notas/:id` | 🔒 Admin / Adminis. / Docente | Elimina calificación dentro del alcance |

### 📅 Asistencias (`/api/asistencias`)

| Método | Ruta | Acceso | Descripción |
|---|---|:---:|---|
| GET | `/api/asistencias` | 🔒 Según alcance | Lista asistencias (filtro `?idAlumno=<id>`). Padre/Alumno solo ven sus asistencias |
| GET | `/api/asistencias/:id` | 🔒 Según alcance | Detalle de asistencia |
| POST | `/api/asistencias` | 🔒 Admin / Administrativo | Registra asistencia de un alumno (`presente`, `ausente`, `tarde`) |
| PATCH | `/api/asistencias/:id` | 🔒 Admin / Administrativo | Modifica el estado de asistencia |
| DELETE | `/api/asistencias/:id` | 🔒 Admin / Administrativo | Elimina un registro de asistencia |

---

## 6. Ejemplos de Datos Mock (JSON) para Solicitudes y Respuestas

### 6.1. Registro Público (`POST /api/auth/registro`)
**Body Solicitud:**
```json
{
  "nombre": "Carlos",
  "apellido": "Alvarez",
  "email": "carlos.alvarez@email.com",
  "password": "passwordSeguro123",
  "rol": "padre"
}
```
**Respuesta `201 Created`:**
```json
{
  "usuario": {
    "_id": "6725a1b2c3d4e5f6a7b8c9d1",
    "nombre": "Carlos",
    "apellido": "Alvarez",
    "email": "carlos.alvarez@email.com",
    "rol": "padre"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 6.2. Inicio de Sesión (`POST /api/auth/login`)
**Body Solicitud:**
```json
{
  "email": "docente1@email.com",
  "password": "docente123"
}
```
**Respuesta `200 OK`:**
```json
{
  "usuario": {
    "_id": "6725a1b2c3d4e5f6a7b8c9d2",
    "nombre": "Julio_docente",
    "apellido": "Fernandez_apellido_docente",
    "email": "docente1@email.com",
    "rol": "docente"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."
}
```

---

### 6.3. Crear Curso (`POST /api/cursos`) 🔒
**Body Solicitud:**
```json
{
  "nombre": "3°A",
  "nivel": "secundario",
  "turno": "mañana"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c010",
  "nombre": "3°A",
  "nivel": "secundario",
  "turno": "mañana"
}
```

---

### 6.4. Crear Alumno (`POST /api/alumnos`) 🔒
**Body Solicitud:**
```json
{
  "nombre": "Esteban",
  "apellido": "Quito",
  "dni": "45123987",
  "fechaNacimiento": "2008-04-12T00:00:00.000Z",
  "idCurso": "6725a1b2c3d4e5f6a7b8c010"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c020",
  "nombre": "Esteban",
  "apellido": "Quito",
  "dni": "45123987",
  "fechaNacimiento": "2008-04-12T00:00:00.000Z",
  "idCurso": "6725a1b2c3d4e5f6a7b8c010"
}
```

---

### 6.5. Crear Materia (`POST /api/materias`) 🔒
**Body Solicitud:**
```json
{
  "nombre": "Física",
  "area": "Ciencias Naturales",
  "idCurso": "6725a1b2c3d4e5f6a7b8c010"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c030",
  "nombre": "Física",
  "area": "Ciencias Naturales",
  "idCurso": "6725a1b2c3d4e5f6a7b8c010"
}
```

---

### 6.6. Crear Unidad (`POST /api/unidades`) 🔒
**Body Solicitud:**
```json
{
  "nombre": "Unidad 1: Cinemática",
  "descripcion": "Estudio del movimiento rectilíneo y aceleración",
  "idMateria": "6725a1b2c3d4e5f6a7b8c030"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c040",
  "nombre": "Unidad 1: Cinemática",
  "descripcion": "Estudio del movimiento rectilíneo y aceleración",
  "idMateria": "6725a1b2c3d4e5f6a7b8c030"
}
```

---

### 6.7. Detalle de Unidad con Actividades y Evaluaciones (`GET /api/unidades/:id`) 🔒
**Respuesta `200 OK` (Populada en paralelo):**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c040",
  "nombre": "Unidad 1: Cinemática",
  "descripcion": "Estudio del movimiento rectilíneo y aceleración",
  "materia": {
    "_id": "6725a1b2c3d4e5f6a7b8c030",
    "nombre": "Física"
  },
  "actividades": [
    {
      "_id": "6725a1b2c3d4e5f6a7b8c051",
      "nombre": "Guía 1 - MRU y MRUV",
      "tipo": "ejercicio",
      "fecha": "2026-05-10T00:00:00.000Z"
    }
  ],
  "evaluaciones": [
    {
      "_id": "6725a1b2c3d4e5f6a7b8c061",
      "nombre": "Parcial Teórico - Cinemática",
      "tipo": "escrito",
      "fecha": "2026-05-25T00:00:00.000Z"
    }
  ]
}
```

---

### 6.8. Crear Nota (`POST /api/notas`) 🔒
**Body Solicitud:**
```json
{
  "nombre": "Parcial Teórico - Cinemática",
  "tipo": "evaluacion",
  "valor": 9,
  "fecha": "2026-05-25T00:00:00.000Z",
  "idMateria": "6725a1b2c3d4e5f6a7b8c030",
  "idAlumno": "6725a1b2c3d4e5f6a7b8c020",
  "idEvaluacion": "6725a1b2c3d4e5f6a7b8c061"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c070",
  "nombre": "Parcial Teórico - Cinemática",
  "tipo": "evaluacion",
  "valor": 9,
  "fecha": "2026-05-25T00:00:00.000Z",
  "idMateria": "6725a1b2c3d4e5f6a7b8c030",
  "idAlumno": "6725a1b2c3d4e5f6a7b8c020",
  "idEvaluacion": "6725a1b2c3d4e5f6a7b8c061"
}
```

---

### 6.9. Modificar Nota (`PATCH /api/notas/:id`) 🔒
**Body Solicitud:**
```json
{
  "valor": 10
}
```
**Respuesta `200 OK`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c070",
  "nombre": "Parcial Teórico - Cinemática",
  "tipo": "evaluacion",
  "valor": 10,
  "fecha": "2026-05-25T00:00:00.000Z",
  "idMateria": "6725a1b2c3d4e5f6a7b8c030",
  "idAlumno": "6725a1b2c3d4e5f6a7b8c020",
  "idEvaluacion": "6725a1b2c3d4e5f6a7b8c061"
}
```

---

### 6.10. Registrar Asistencia (`POST /api/asistencias`) 🔒
**Body Solicitud:**
```json
{
  "idAlumno": "6725a1b2c3d4e5f6a7b8c020",
  "fecha": "2026-06-01T08:00:00.000Z",
  "estado": "presente"
}
```
**Respuesta `201 Created`:**
```json
{
  "_id": "6725a1b2c3d4e5f6a7b8c080",
  "idAlumno": "6725a1b2c3d4e5f6a7b8c020",
  "fecha": "2026-06-01T08:00:00.000Z",
  "estado": "presente"
}
```

---

## 7. Manejo de Errores y Códigos de Estado

El middleware `src/middleware/manejarErrores.js` estandariza todas las respuestas de error en un objeto JSON predecible:

### Códigos Implementados:
* **`200 OK`**: Petición de lectura o actualización procesada con éxito.
* **`201 Created`**: Recurso creado exitosamente.
* **`400 Bad Request`**: Parámetros inválidos, ID sin formato ObjectId o error de validación de Mongoose.
* **`401 Unauthorized`**: Token JWT ausente, expirado o adulterado.
* **`403 Forbidden`**: El usuario autenticado no posee el rol necesario o intenta acceder/modificar un recurso que está fuera de su alcance.
* **`404 Not Found`**: El recurso con el ID solicitado no existe o la ruta no fue encontrada.
* **`409 Conflict`**: Conflicto de unicidad en la base de datos (clave duplicada `11000`, e.g., DNI o email repetido).
* **`500 Internal Server Error`**: Excepciones no previstas en el servidor.

### Respuestas de Error de Ejemplo:

#### Validación de Modelo Fallida (`400 Bad Request`):
```json
{
  "error": "Los datos no son válidos",
  "detalles": [
    "El valor de la nota no puede exceder 10",
    "El alumno es obligatorio"
  ]
}
```

#### ID con Formato Inválido (`400 Bad Request`):
```json
{
  "error": "Ese id no tiene un formato válido",
  "recibido": "id-invalido-123"
}
```

#### Token Faltante o Inválido (`401 Unauthorized`):
```json
{
  "error": "Falta el token. Mandá el header Authorization: Bearer <token>"
}
```

#### Falta de Alcance por Rol (`403 Forbidden`):
```json
{
  "error": "No tiene permisos para operar sobre esa materia"
}
```

#### Clave Duplicada (`409 Conflict`):
```json
{
  "error": "El DNI: 45123987 ya existe"
}
```

---

## 8. Funcionalidades Implementadas y a Futuro

### Implementadas:
* **CRUD completo**: Gestión integral de todas las colecciones del dominio educativo.
* **Separación de responsabilidades**: Arquitectura en capas desacopladas (Rutas $\to$ Controladores $\to$ Servicios $\to$ Modelos).
* **Seguridad de contraseñas**: Encriptación con `bcrypt` (10 rondas de salt).
* **Autenticación con JWT**: Emisión y validación de tokens con expiración configurable.
* **Control de acceso por roles (RBAC)**: Permisos diferenciados para `admin`, `administrativo`, `docente`, `alumno` y `padre`.
* **Control de alcance de datos**: Restricción de visibilidad y edición según el usuario autenticado (ej. docentes sólo a sus materias; padres e hijos sólo a sus registros).
* **Consultas enriquecidas**: Populaciones con `populate()` y operaciones concurrentes optimizadas con `Promise.all()`.
* **Manejo centralizado de errores**: Middleware global para captura y normalización de excepciones de Mongoose y reglas de negocio.
* **Carga inicial de datos**: Script de Seed para inicializar la base de datos con un conjunto coherente de prueba.

### Próximas Mejoras (Roadmap):

#### Gestión Académica y Funcionalidades:
* **Estadísticas y promedios**: Módulo analítico para calcular promedios por materia/período lectivo y porcentajes de presentismo general y por curso.
* **Asistencia por materia**: Registro de presentismo diferenciado por materia y bloque horario.
* **Integración con recursos pedagógicos**: Incorporación del campo `link` en unidades, actividades y evaluaciones para referenciar material alojado en Google Drive o la nube.
* **Sistema de avisos por correo**: Notificaciones automáticas por email ante límites de inasistencias o bajas calificaciones.
* **Exportación de boletines**: Generación de reportes de calificaciones en formato PDF listos para imprimir o compartir.

#### Calidad Técnica y Arquitectura:
* **Documentación interactiva**: Integración de Swagger / OpenAPI para consultar y probar la API desde una interfaz web.
* **Tests automatizados**: Suite de pruebas unitarias y de integración con Jest y Supertest.

---

## 9. Configuración de Variables de Entorno (.env)

> **Nota para el evaluador / docente:**  
> Por cuestiones de seguridad de credenciales (base de datos y claves criptográficas), el archivo `.env` se mantiene fuera del repositorio (`.gitignore`). **Los valores exactos y operativos para levantar el proyecto se encuentran detallados en el documento de Google Drive de la entrega.**

Las variables requeridas para ejecutar el proyecto se configuran en el archivo `.env` tomando como referencia la plantilla [`.env.example`](./.env.example):

| Variable | Tipo | Descripción |
|---|---|---|
| `PORT` | Número | Puerto TCP en el que escucha el servidor Express |
| `MONGO_URI` | Cadena | URI de conexión a la base de datos MongoDB |
| `JWT_SECRET` | Cadena | Clave secreta para la firma y verificación de tokens JWT |
| `JWT_EXPIRATION` | Cadena | Tiempo de validez del token de autenticación (ej. `30m`, `2h`, `7d`) |

---
*Proyecto presentado para la evaluación del Trabajo Práctico Final del Curso de Backend Developer — UTN BA (Centro de e-Learning).*
