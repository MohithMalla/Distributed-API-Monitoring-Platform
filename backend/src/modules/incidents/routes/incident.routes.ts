import { Router } from "express";
import { IncidentController } from "../controllers/incident.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

const controller = new IncidentController();

router.get(
    "/",
    authenticate,
    controller.getIncidents
);

router.get(
    "/open",
    authenticate,
    controller.getOpenIncidents
);

router.get(
    "/resolved",
    authenticate,
    controller.getResolvedIncidents
);

router.get(
    "/:id",
    authenticate,
    controller.getIncidentById
);

export default router;