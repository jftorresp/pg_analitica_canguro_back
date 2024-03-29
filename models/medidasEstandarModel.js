import mongoose from "mongoose";

const medidasEstandarSchema = mongoose.Schema({
  tipo_medida: String,
  tipo_array: String,
  sexo: Number,
  sem24: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem25: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem26: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem27: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem28: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem29: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem30: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem31: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem32: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem33: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem34: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem35: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem36: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem37: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem38: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem39: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  sem40: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  mes3: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  mes6: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  mes9: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
  mes12: {
    des_3Neg: Number,
    des_2Neg: Number,
    des_1Neg: Number,
    des_0: Number,
    des_1: Number,
    des_2: Number,
    des_3: Number,
  },
});

const medidasEstandar = mongoose.model(
  "medidasEstandar",
  medidasEstandarSchema,
  "medidas_estandar"
);

export default medidasEstandar;
