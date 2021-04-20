import {
  createEtapa,
  getEtapas,
  deleteEtapaById,
} from "../controllers/etapasController.js";
import express from "express";
const router = express.Router();

// express router method to GET all the data
router.route("/").get(getEtapas);

// express router method to GET variables of the data by stage or topics
router.route("/crearEtapa").post(createEtapa);

// express router method to GET all the available years of the data
router.route("/:id").delete(deleteEtapaById);

export default router;
