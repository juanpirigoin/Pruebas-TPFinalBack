export const manejarErrores = (error, req, res, next) => {

    // nuestras reglas de negocio
    if (error.name === "ErrorApp") {
        return res.status(error.status).json({ error: error.message })
    }

    // el body no es un JSON válido (una coma de más en Postman)
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ error: "El body no es un JSON válido" })
    }

    // el id no tiene forma de ObjectId 
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Ese id no tiene un formato válido", recibido: error.value })
    }

    // se rompió una regla del modelo
    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: "Los datos no son válidos",
            detalles: Object.values(error.errors).map(e => e.message)
        })
    }

    // un unique repetido que nadie tradujo antes
    if (error.code === 11000) {
        return res.status(409).json({ error: "Ya existe un registro con ese dato", campo: Object.keys(error.keyPattern)[0] })
    }

    // lo demás es culpa nuestra: el detalle al log, al cliente solo el mensaje
    console.error(error)
    res.status(500).json({ error: "Error interno del servidor" })
}