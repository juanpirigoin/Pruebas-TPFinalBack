# Registro de Ajustes de Seguridad y Control de Alcance (RBAC)

- [x] **Usuarios (`/api/usuarios`)**: Restringido en `usuarioRoutes.js` exclusivamente a roles `admin` y `administrativo`. Los alumnos y padres no pueden listar ni consultar usuarios ajenos (su perfil propio lo consultan vía `/api/auth/perfil`).
- [x] **Alumnos (`/api/alumnos`)**: Restringido a roles `admin`, `administrativo` y `docente`. Alumnos y padres no tienen acceso al padrón general.
- [x] **Materias (`/api/materias`)**: Implementado `alcanceDeMaterias` con `obtenerMateriasPermitidasPorUsuario`. Un alumno o padre solo ve las materias del curso al que pertenece. Docentes solo ven sus materias asignadas.
- [x] **Unidades (`/api/unidades`)**: Control de alcance por rol. Alumnos y padres solo ven unidades de las materias de su curso.
- [x] **Actividades (`/api/actividades`)**: Control de alcance por rol. Alumnos y padres solo ven actividades de las unidades de su curso.
- [x] **Evaluaciones (`/api/evaluaciones`)**: Control de alcance por rol. Alumnos y padres solo ven fechas y temas de evaluaciones de su curso.
- [x] **Notas (`/api/notas`)**: Filtrado estricto por `idAlumno`. Alumnos y padres solo ven las notas de su propio estudiante.
- [x] **Asistencias (`/api/asistencias`)**: Filtrado estricto por `idAlumno`. Alumnos y padres solo ven sus asistencias y faltas.
