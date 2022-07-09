const router = require("express").Router();
const Sucursal = require("../models/Sucursal.model")

router.get("/", (req, res) => {
    res.render("sucursal/formNuevaSucursal", { layout: false })
})

router.post("/nueva", async (req, res) => {
    const { nombre, direccion, empleados, lat, lng } = req.body
    //Convertirlo a numeros 
    let objetoConvertido = {
        nombre,
        direccion,
        empleados: Number(empleados),
        lat: +lat,
        lng: +lng
    }

    const sucursal = await Sucursal.create(objetoConvertido)
    console.log(sucursal)
    res.redirect(`/sucursal/${sucursal._id}`)
})

router.get("/hola", async (req, res) => {
    const sucursales = await Sucursal.find()
    console.log(sucursales)
    res.render("sucursal/todas", { sucursales })
})

//Param --> id
router.get("/:id", async (req, res) => {
    const sucursal = await Sucursal.findById(req.params.id)
    res.render("sucursal/detalles", sucursal)
})



module.exports = router;
