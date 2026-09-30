import alumnoRoutes from './routes/alumnoRoutes.js'
import express from 'express'
import connectDB from './db.js'
import { PORT } from './utils/config.js'

const app = express()

await connectDB()
app.use(express.json())

//Agrupadores de rutas
app.use('/api/alumnos', alumnoRoutes)


// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})