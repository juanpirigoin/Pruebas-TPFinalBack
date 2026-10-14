import alumnoRoutes from './routes/alumnoRoutes.js'
import express from 'express'
import connectDB from './db.js'
import { PORT } from './utils/config.js'
import { manejarErrores } from './middleware/manejarErrores.js'

const app = express()

await connectDB()
app.use(express.json())

//Agrupadores de rutas
app.use('/api/alumnos', alumnoRoutes)
app.use('/api/asistencias', asistenciaRoutes)
app.use('/api/materias', materiaRoutes)
app.use('/api/actividades', actividadRoutes)
app.use('/api/evaluaciones', evaluacionRoutes)
app.use('/api/notas', notaRoutes)
app.use('/api/usuarios', usuarioRoutes)

// Middleware para manejar rutas no encontradas - caso 404
app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})

// Middleware para manejar errores a nivel aplicacion (global)
app.use(manejarErrores)



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})