//Crear mi sistema de rutas

const router = require("express").Router()
const Bebida = require("../models/Bebida.model")

router.get("/", (req, res) => {
    //Obtener los datos de la DB
    Bebida.find().then(todasLasBebidas => {

        const bebidasVerificadas = todasLasBebidas.map((bebida) => {
            if (bebida.cantidad === 0) {
                const cpBebida = { ...bebida._doc }
                cpBebida.disponible = true
                return cpBebida
            }
            return bebida
        })

        console.log(bebidasVerificadas)
        res.render("bebidas", { todasLasBebidas: bebidasVerificadas })
    }).catch(console.log)
})

router.get("/nueva", (req, res) => {
    res.render("formNuevaBebida")
})

//Middleware para crear el contenido de la bebida
function crearContenido(req, res, next) {
    const { agua, alcohol, azucar, cebada } = req.body
    const contenido = []

    if (agua === "") {
        contenido.push("agua")
    }
    if (alcohol === "") {
        contenido.push("alcohol")
    }
    if (azucar === "") {
        contenido.push("azucar")
    }
    if (cebada === "") {
        contenido.push("cebada")
    }
    console.log(contenido)
    console.log(req.body)
    req.body.contenido = contenido

    next()
}

//Crear una nueva bebida
router.post("/nueva", crearContenido, (req, res) => {
    console.log(req.body)
    //Conectarme con Mongo y guardar los datos
    //res.send("Registro creado")
    Bebida.create(req.body)
        .then(nuevaBebida => {
            console.log(nuevaBebida)
            res.redirect("/bebidas")
        })
        .catch(console.log)
})

//Detalle de cada bebida
//           req.params
router.get("/:id", async (req, res) => {
    console.log("id", req.params)
    //Buscar los datos de la bebida por ID
    const detalles = await Bebida.findById(req.params.id)
    console.log(detalles)

    res.render("detalles/bebidas", detalles)
})


//Mostrar por categoria
router.get("/categoria/:categoria", (req, res) => {
    //Filtrar las bebidas por categoria

    const tipo = req.params.categoria
    Bebida.find({ tipo }).then(todasLasBebidas => {
        res.render("bebidas", { todasLasBebidas })
    })
})

//Eliminar bebida
//  /bebidas/eliminar/:id -- req.params
router.get("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Bebida.findByIdAndRemove(id)
        res.redirect("/bebidas")
    } catch { console.log }
})


//Formulario para editar una bebida
//Obtener el id en --> req.params
router.get("/editar/:id", async (req, res) => {
    const detalles = await Bebida.findById(req.params.id)
    //Spread Operator
    //Me ayuda a poder modificar el objeto detalles
    const nd = { ...detalles._doc }
    detalles.contenido.forEach(tipo => {
        nd[tipo] = true
    })
    console.log("detalles", nd)

    res.render("formEditarBebida", nd)
})

//Obtener los datos del form y actualizar la bebida
router.post("/actualizar/:id", (req, res) => {
    Bebida.findByIdAndUpdate(req.params.id, req.body)
        .then(actualizado => {
            console.log(actualizado)
            res.redirect(`/bebidas/${req.params.id}`)
        })
        .catch(console.log)
})


module.exports = router

