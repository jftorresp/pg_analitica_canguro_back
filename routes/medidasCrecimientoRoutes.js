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
  getGriffiths,
  RCIUInfanibProm,
  RCIUInfanibTime,
  RCIUoftalmologia,
  RCIUoptometria,
  RCIUaudiometria,
  RCIUPromMedidasGrowth,
  RCIUMedidaAnio,
} from "../controllers/medidasCrecimientoController.js";
import express from "express";
const router = express.Router();

router.route("/RCIUFreqDiasH").post(RCIUFreqDiasH);

router.route("/RCIUFreqUCI").post(RCIUFreqUCI);

router.route("/RCIUFreqEGEntrada").post(RCIUFreqEGEntrada);

router.route("/parallelCoordsPMC").post(parallelCoordsPMC);

router.route("/RCIUPromPesoPMC").post(RCIUPromPesoPMC);

router.route("/RCIUOxiEntrada").post(RCIUOxiEntrada);

router.route("/RCIULecheMaterna").post(RCIULecheMaterna);

router.route("/RCIULecheMaternaTime").post(RCIULecheMaternaTime);

router.route("/RCIUAbsLecheMaternaTime").post(RCIUAbsLecheMaternaTime);

router.route("/parallelCoordsLecheMaterna").post(parallelCoordsLecheMaterna);

router.route("/getEtapasCrecimiento").get(getEtapasCrecimiento);

router.route("/getVarsByEtapaCrecimiento").post(getVarsByEtapaCrecimiento);

router.route("/RCIUNut4012").post(RCIUNut4012);

router.route("/getGriffiths").post(getGriffiths);

router.route("/RCIUInfanibProm").post(RCIUInfanibProm);

router.route("/RCIUInfanibTime").post(RCIUInfanibTime);

router.route("/RCIUoftalmologia").post(RCIUoftalmologia);

router.route("/RCIUoptometria").post(RCIUoptometria);

router.route("/RCIUaudiometria").post(RCIUaudiometria);

router.route("/RCIUPromMedidasGrowth").post(RCIUPromMedidasGrowth);

router.route("/RCIUMedidaAnio").post(RCIUMedidaAnio);

export default router;
