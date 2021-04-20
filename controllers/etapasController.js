import Etapa from "../models/etapasModel.js";
import asyncHandler from "express-async-handler";

export const createEtapa = asyncHandler(async (req, res) => {
  Etapa.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//getEtapas function to get all stages
export const getEtapas = asyncHandler(async (req, res) => {
  const etapas = await Etapa.find({});
  res.json(etapas);
});

export const deleteEtapaById = asyncHandler(async (req, res) => {
  Etapa.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
