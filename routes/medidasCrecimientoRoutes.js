import {
  RCIUFreqDiasH,
  RCIUFreqUCI,
  RCIUFreqEGEntrada,
  parallelCoordsPMC,
  RCIUPromPesoPMC,
  RCIUOxiEntrada,
  RCIULecheMaterna,
  RCIULecheMaternaTime,
  RCIUAbsLecheMaternaTime,
  parallelCoordsLecheMaterna,
  getEtapasCrecimiento,
  getVarsByEtapaCrecimiento,
  RCIUNut4012,
} from "../controllers/medidasCrecimientoController.js";
import express from "express";
const router = express.Router();

router.route("/RCIUFreqDiasH").get(RCIUFreqDiasH);

router.route("/RCIUFreqUCI").get(RCIUFreqUCI);

router.route("/RCIUFreqEGEntrada").get(RCIUFreqEGEntrada);

router.route("/parallelCoordsPMC").get(parallelCoordsPMC);

router.route("/RCIUPromPesoPMC").get(RCIUPromPesoPMC);

router.route("/RCIUOxiEntrada").get(RCIUOxiEntrada);

router.route("/RCIULecheMaterna").get(RCIULecheMaterna);

router.route("/RCIULecheMaternaTime").get(RCIULecheMaternaTime);

router.route("/RCIUAbsLecheMaternaTime").get(RCIUAbsLecheMaternaTime);

router.route("/parallelCoordsLecheMaterna").get(parallelCoordsLecheMaterna);

router.route("/getEtapasCrecimiento").get(getEtapasCrecimiento);

router.route("/getVarsByEtapaCrecimiento").post(getVarsByEtapaCrecimiento);

router.route("/RCIUNut4012").get(RCIUNut4012);

export default router;
