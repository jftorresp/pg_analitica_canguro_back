import {
  RCIUAbsoluteFrequency,
  RCIURelativeFrequency,
  RCIURelativeFrequencyPremature,
  RCIUAbsInitialFrequencyPremature,
  RCIUAFMedidaMadre,
  RCIUAFPromMedidaMadre,
  RCIURFEstudiosMadre,
  RCIUAntEntornoVars,
  RCIURFIngresosMadre,
} from "../controllers/medidasEntornoController.js";
import express from "express";
const router = express.Router();

router.route("/RCIUaf").get(RCIUAbsoluteFrequency);

router.route("/RCIUrf").get(RCIURelativeFrequency);

router.route("/RCIUInitrfprem").post(RCIURelativeFrequencyPremature);

router.route("/RCIUInitafprem").post(RCIUAbsInitialFrequencyPremature);

router.route("/RCIUAFMedidaMadre").get(RCIUAFMedidaMadre);

router.route("/RCIUAFPromMedidaMadre").get(RCIUAFPromMedidaMadre);

router.route("/RCIURFEstudiosMadre").get(RCIURFEstudiosMadre);

router.route("/RCIURFIngresosMadre").get(RCIURFIngresosMadre);

router.route("/RCIUAntEntornoVars").get(RCIUAntEntornoVars);

export default router;
