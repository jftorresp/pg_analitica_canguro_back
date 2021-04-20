import mongoose from "mongoose";

const temasInteresSchema = mongoose.Schema(
  {
    nombre: String,
  },
  {
    versionKey: false,
  }
);

const temasInteres = mongoose.model(
  "temasInteres",
  temasInteresSchema,
  "temas_interes"
);

export default temasInteres;
