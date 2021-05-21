import medidasRoutes from "./medidasRoute.js";
import crecimientoRoutes from "./medidasCrecimientoRoutes.js";
import entornoRoutes from "./medidasEntornoRoutes.js";
import nacimientoRoutes from "./medidasNacimientoRoutes.js";
import etapasRoutes from "./etapasRoute.js";
import temasInteresRoutes from "./temasInteresRoutes.js";
import express from "express";

const router = express.Router();

router.use("/medidas", medidasRoutes);
router.use("/crecimiento", crecimientoRoutes);
router.use("/entorno", entornoRoutes);
router.use("/nacimiento", nacimientoRoutes);
router.use("/etapas", etapasRoutes);
router.use("/temas", temasInteresRoutes);

export default router;
