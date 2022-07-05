const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BebidaSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        minLength: 2,
        required: true
    },
    precio: {
        type: Number,
        trim: true,
        min: 0,
        required: true
    },
    url: {
        type: String,
        default: "https://i.pinimg.com/originals/8d/2b/6c/8d2b6ce2edb9d2ec42679022bdec8611.png",
        minLength: 10
    },
    descripcion: {
        type: String,
        required: true,
        minLength: 10
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0
    },
    contenido: {
        type: [String]
    },
    tipo: {
        type: String,
        enum: ["cerveza", "vodka", "tequila", "ron", "sodas", "sugar free", "jugos", "tes"]
    }
}, { timestamps: true })

const bebida = mongoose.model("Bebida", BebidaSchema)


//Disponible para otros archivos

module.exports = bebida