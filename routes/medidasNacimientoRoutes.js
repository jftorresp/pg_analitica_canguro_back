import {
  RCIUFreqCesarea,
  RCIUFreqGender,
  RCIUFreqEdadGes,
  RCIUFreqEGPremTerm,
  RCIUAFPromMedidaBebeNacer,
  RCIURCEUFreq,
  RCIUAntNacimientoVars,
} from "../controllers/medidasNacimientoController.js";
import express from "express";
const router = express.Router();

router.route("/RCIUFreqCesarea").post(RCIUFreqCesarea);

router.route("/RCIUFreqGender").post(RCIUFreqGender);

router.route("/RCIUFreqEdadGes").post(RCIUFreqEdadGes);

router.route("/RCIUFreqEGPremTerm").post(RCIUFreqEGPremTerm);

router.route("/RCIURCEUFreq").post(RCIURCEUFreq);

router.route("/RCIUAFPromMedidaBebeNacer").post(RCIUAFPromMedidaBebeNacer);

router.route("/RCIUAntNacimientoVars").get(RCIUAntNacimientoVars);

export default router;
