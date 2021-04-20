import {
  createTema,
  getTemasInteres,
  deleteTemaById,
} from "../controllers/temasInteresController.js";
import express from "express";
const router = express.Router();

// express router method to GET all the data
router.route("/").get(getTemasInteres);

// express router method to GET variables of the data by stage or topics
router.route("/crearTema").post(createTema);

// express router method to GET all the available years of the data
router.route("/:id").delete(deleteTemaById);

export default router;
