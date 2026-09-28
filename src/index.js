import Alumno from './models/alumno.js'
import express from 'express'
import connectDB from './db.js'
import { PORT } from './utils/config.js'

const app = express()

await connectDB()
app.use(express.json())

//Rutas
app.get("/alumno", async (req, res) => {
  try {
    const alumnos = await Alumno.find(); 
    res.status(200).json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
});


// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})