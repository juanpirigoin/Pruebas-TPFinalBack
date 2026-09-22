import express from 'express'
const app = express()

app.use(express.json())

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})