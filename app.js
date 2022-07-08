// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

//Libreria para trabajar con fechas

const moment = require("moment")
const fecha = new Date()
//console.log(moment(fecha).format("DD/MM/YYYY HH:mm"))

//Metodo para registrar un helper 
hbs.registerHelper("formatoFecha", (fecha) => {
    return moment(fecha).format("DD/MM/YYYY HH:mm")
})

hbs.registerHelper("mayusculas", (texto) => {
    return texto.toUpperCase()
})

hbs.registerHelper("verificarStock", (cantidad) => {
    if (cantidad === 0) {
        return "No hay disponibles"
    } else {
        return cantidad
    }
})

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "goshop";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

//Registrar mi sistema de rutas de bebidas

const bebidas = require("./routes/bebidas.routes")

//Utilizar las rutas

app.use("/bebidas", bebidas)

//Registrar mi sistema de rutas de user
const users = require("./routes/user.routes")
app.use("/usuario", users)

//Registrar mi sistema de rutas de provedores
const provs = require("./routes/prov.routes")
app.use("/prov", provs)

//Registrar mi sistema de rutas de admin
const admins = require("./routes/admin.routes")
app.use("/admin", admins)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
