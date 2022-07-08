const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Mostrar el form
router.get("/registro", (req, res) => {
  res.render("usuario/registro", { layout: false })
})

//Obtener los datos en req.body
router.post("/registro", async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (name.length < 4) {
      res.render("usuario/registro", { layout: false, checkInfo: true, textError: "Verifica tu nombre" })
      return
    } else if (email.length < 4) {
      res.render("usuario/registro", { layout: false, checkInfo: true, textError: "Verifica tu email" })
      return
    } else if (password.length < 4) {
      res.render("usuario/registro", { layout: false, checkInfo: true, textError: "Verifica tu contrasena" })
      return
    }

    //Hash contrasena
    //Si no se envia el #10 en genSalt el defecto es 10
    const salt = await bcrypt.genSalt(10)
    //Generar el hash con password y salt
    const passwordHash = await bcrypt.hash(password, salt)

    let datosUsuario = {
      name,
      email,
      password: passwordHash
    }
    const nuevoUsuario = await User.create(datosUsuario)
    console.log(nuevoUsuario)
    res.send("Usuario registrado")
  } catch (error) {
    console.log(error)
  }
})

//Ruta para mostrar el form de login
router.get("/login", (req, res) => {
  res.render("usuario/login", { layout: false })
})

//Ruta para recibir los datos en req.body
router.post("/login", async (req, res) => {

  const { email, password } = req.body

  const usuario = await User.findOne({ email })
  //Si no existe el usuario con el correo se ejecuta lo sig
  if (usuario === null) {
    res.render("usuario/login", { layout: false, checkInfo: true, textError: "Verifica tus datos" })
    return
  }

  const coinciden = await bcrypt.compare(password, usuario.password)
  if (coinciden) {
    switch (usuario.role) {
      case "user":
        res.redirect("/usuario")
        break;
      case "admin":
        res.redirect("/admin")
        break;
      case "prov":
        res.redirect("/prov")
        break;
    }
  } else {
    res.render("usuario/login", { layout: false, checkInfo: true, textError: "Verifica tus datos" })
  }
})


module.exports = router;
