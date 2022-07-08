const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 4
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 4
    },
    password: {
      type: String,
      unique: true,
      required: true,
      minLength: 4
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "prov"]
    },
    estaVerificado: {
      type: Boolean,
      default: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
