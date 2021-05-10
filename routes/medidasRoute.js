import {
  getData,
  getDataById,
  getAllYears,
  getVarsStageTopic,
  queryData,
  getValuesByVar,
  getDictVar,
  getDiscreteDist,
  getContinuosDist,
  groupByVarYears,
  groupByVarYearsNumbers,
  getValuesByVarYears,
  parallelCoordinatesRCIU,
  parallerCoordinatesVariables,
  RCIUAbsoluteFrequency,
  RCIURelativeFrequency,
  RCIURelativeFrequencyPremature,
  RCIUAbsInitialFrequencyPremature,
  RCIUAFMedidaMadre,
  RCIUAFPromMedidaMadre,
  RCIURFEstudiosMadre,
  RCIUAntEntornoVars,
  RCIURFIngresosMadre,
  RCIUFreqCesarea,
  RCIUFreqGender,
  RCIUFreqEdadGes,
  RCIUFreqEGPremTerm,
  RCIUAFPromMedidaBebeNacer,
  RCIURCEUFreq,
  RCIUAntNacimientoVars,
  GenderBaseData,
} from "../controllers/medidasCrecimientoController.js";
import express from "express";
const router = express.Router();

// express router method to GET all the data
router.route("/datos").get(getData);

// express router method to GET variables of the data by stage or topics
router.route("/vars").get(getVarsStageTopic);

// express router method to GET all the available years of the data
router.route("/anios").get(getAllYears);

// express router method to POST a query by stage, topics or years over the data
router.route("/query").post(queryData);

router.route("/parallel").get(parallelCoordinatesRCIU);

router.route("/parallelVars").get(parallerCoordinatesVariables);

// express router method to GET all posible values for an specific var
router.route("/query/:var").get(getValuesByVar);

// express router method to GET all posible values for an specific var and years
router.route("/queryVars").post(getValuesByVarYears);

// express router method to GET the dictionary of posible values on a var
router.route("/dict/:var").get(getDictVar);

// express router method to GET the distirbution of data of a discrete variable
router.route("/dist").get(getDiscreteDist);

// express router method to GET the distirbution of data of a continuous variable
router.route("/cont").get(getContinuosDist);

router.route("/RCIUaf").get(RCIUAbsoluteFrequency);

router.route("/RCIUrf").get(RCIURelativeFrequency);

router.route("/RCIUInitrfprem").post(RCIURelativeFrequencyPremature);

router.route("/RCIUInitafprem").post(RCIUAbsInitialFrequencyPremature);

router.route("/RCIUAFMedidaMadre").get(RCIUAFMedidaMadre);

router.route("/RCIURFEstudiosMadre").get(RCIURFEstudiosMadre);

router.route("/RCIURFIngresosMadre").get(RCIURFIngresosMadre);

router.route("/RCIUFreqCesarea").get(RCIUFreqCesarea);

router.route("/RCIUFreqGender").get(RCIUFreqGender);

router.route("/RCIUFreqEdadGes").get(RCIUFreqEdadGes);

router.route("/RCIUFreqEGPremTerm").get(RCIUFreqEGPremTerm);

router.route("/RCIURCEUFreq").get(RCIURCEUFreq);

router.route("/RCIUAntNacimientoVars").get(RCIUAntNacimientoVars);

router.route("/GenderBaseData").get(GenderBaseData);

router.route("/RCIUAFPromMedidaBebeNacer").get(RCIUAFPromMedidaBebeNacer);

router.route("/RCIUAFPromMedidaMadre").get(RCIUAFPromMedidaMadre);

router.route("/RCIUAntEntornoVars").get(RCIUAntEntornoVars);

// express router method to POST a query in order to group data by years and a variable
router.route("/group").post(groupByVarYears);

// express router method to POST a query in order to group data by years and a variable (discrete or continuous)
router.route("/groupN").post(groupByVarYearsNumbers);

// express router method to GET a document by id
router.route("/:id").get(getDataById);

export default router;
