import express from 'express'
const app = express()

app.get("/", (req, res) => {
    res.send("Servidor funcionando!!")
})

app.get("/algo/:unalgo", (req, res) => {
    res.json({
        mensaje: "Me pediste un algo",
        unalgo: req.params.unalgo,
        tipo: typeof req.params.unalgo
    });})

app.get("/usuarios/:id", (req, res) => {
    res.json({
        mensaje: "Me pediste un usuario",
        id: req.params.id,
        tipo: typeof req.params.id
    });
});

app.get("/buscar", (req, res) => {
    res.json({
        recibi: req.query
    })
})

app.get("/materias/:materia/alumnos/:legajo", (req, res) => {
    res.json({
        materia: req.params.materia,
        legajo: req.params.legajo
    })
})

app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})