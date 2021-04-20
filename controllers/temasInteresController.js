import TemaInteres from "../models/temasInteresModel.js";
import asyncHandler from "express-async-handler";

//createTema function to create a topic of Interest
export const createTema = asyncHandler(async (req, res) => {
  TemaInteres.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//getTemasInteres function to get all topics
export const getTemasInteres = asyncHandler(async (req, res) => {
  const temas = await TemaInteres.find({});
  res.json(temas);
});

//deleteTemaById function to delete a topic by id
export const deleteTemaById = asyncHandler(async (req, res) => {
  TemaInteres.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
