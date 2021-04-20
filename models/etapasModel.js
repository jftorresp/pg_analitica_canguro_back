import mongoose from "mongoose";

const etapasSchema = mongoose.Schema(
  {
    nombre: String,
  },
  {
    versionKey: false,
  }
);

const etapas = mongoose.model("etapas", etapasSchema, "etapas");

export default etapas;
