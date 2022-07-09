//Definir model y el schema
const { Schema, model } = require("mongoose")

const sucursalSchema = new Schema({
    direccion: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    empleados: {
        type: Number,
        default: 0
    },
    nombre: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = model("Sucursal", sucursalSchema)
