import medidasRoutes from "./medidasRoute.js";
import etapasRoutes from "./etapasRoute.js";
import temasInteresRoutes from "./temasInteresRoutes.js";
import express from "express";

const router = express.Router();

router.use("/medidas", medidasRoutes);
router.use("/etapas", etapasRoutes);
router.use("/temas", temasInteresRoutes);

export default router;
