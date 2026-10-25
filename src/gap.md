* manejar filtros en listarActividadService

* agregar retunDocument: "after" en los servicios de update

* en usuarioServices controlar el get segun roles

* chequear verificacion de usuarios y buscar por email con password


GAP Pensando en vertical

nota:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR 
→ test → Swagger ----- COMPLETAR

actividad:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

evaluacion:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

alumno:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

curso:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

unidad:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

materia:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR

asitencia:
modelo → service → controller → ruta ---- ARMADOS, FALTA PROBAR
→ test → Swagger ----- COMPLETAR




*** en el obtenerUsuarioPorIdService corregir los datos obtenidos---> creo que quedo bien

---

## Pendientes marcados por el profe (respuestas profe.md)

### Errores y ajustes inmediatos en código:
* [URGENTE] Arreglar error de sintaxis en `notaService.js` (la función `alcanceNotas` quedó cortada sin cerrar llaves) y terminar su integración con `listarNotaService` y `notaController.js`.
* Limpiar imports duplicados de modelos en `asistenciaService.js`, `evaluacionService.js` y `unidadService.js`.

### Manejo de errores y queries en services:
* Sacar los `try/catch` redundantes en los services que atrapan el error y tiran `ErrorApp` genérico (dejar que Express 5 y `manejarErrores` capturen `ValidationError` o duplicados `11000`).
* Eliminar el casteo manual `new mongoose.Types.ObjectId(...)` en los filtros de los services para que un id mal formado devuelva 400 (`CastError`) y no 500 (`BSONError`).

### Middlewares y Roles:
* Crear middleware `permitirRoles` y atajos de conveniencia (`soloDocente`, `soloAdministrativo`).
* Crear middleware `cargarUsuario` para buscar el usuario en la BD tras `verificarToken` y tener `idAlumno`/`idMateria` disponibles en `req.usuario`.

### Lógica de Docentes y Materias:
* En `crearUnidadService`, validar que la materia pertenezca al docente autenticado (`esSuya`).
* Crear la ruta y controller `GET /api/materias/mias` para que el docente autenticado obtenga solo sus materias asignadas.