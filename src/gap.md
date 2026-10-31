* en el get de perfil no hay que poner un id ya que lo obtenes desde el middleware VerificarToken
* en login recibo mucha informacion de usuario??????


* Cualquiera puede crear un usuario admin --> deberia controlar eso para que solo lo haga un admin
* En mi caso es el que esta en el seed



* agregar returnDocument: "after" en los servicios de update ---- COMPLETADO EN TODOS LOS SERVICIOS




GAP Pensando en vertical

nota:
modelo → service → controller → ruta ---- TODO CORREGIDO CON FILTROS DE ALCANCE 
→ test → Swagger ----- COMPLETAR

actividad:
modelo → service → controller → ruta ---- TODO CORREGIDO CON FILTROS DE ALCANCE
→ test → Swagger ----- COMPLETAR

evaluacion:
modelo → service → controller → ruta ---- TODO CORREGIDO CON FILTROS DE ALCANCE
→ test → Swagger ----- COMPLETAR

unidad:
modelo → service → controller → ruta ---- TODO CORREGIDO CON FILTROS DE ALCANCE
→ test → Swagger ----- COMPLETAR

asistencia:
modelo → service → controller → ruta ---- TODO CORREGIDO CON FILTROS DE ALCANCE
→ test → Swagger ----- COMPLETAR

alumno:
modelo → service → controller → ruta ---- PROTEGIDO POR ROLES (SOLO GESTION ESCOLAR)
→ test → Swagger ----- COMPLETAR

curso:
modelo → service → controller → ruta ---- PROTEGIDO POR ROLES (MODIFICACION ADMIN/ADMINISTRATIVO)
→ test → Swagger ----- COMPLETAR

materia:
modelo → service → controller → ruta ---- PROTEGIDO POR ROLES (MODIFICACION ADMIN/ADMINISTRATIVO)
→ test → Swagger ----- COMPLETAR
