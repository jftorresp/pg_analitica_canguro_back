import {
  getData,
  getDataById,
  getAllYears,
  getVarsStageTopic,
  queryData,
  getValuesByVar,
  getDictVar,
  getDiscreteDist,
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

// express router method to POST a query by stage, topics or years over the data
router.route("/query/:var").get(getValuesByVar);

// express router method to POST a query by stage, topics or years over the data
router.route("/dict/:var").get(getDictVar);

// express router method to POST a query by stage, topics or years over the data
router.route("/dist").get(getDiscreteDist);

// express router method to GET a document by id
router.route("/:id").get(getDataById);

export default router;
