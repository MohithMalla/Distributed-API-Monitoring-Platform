import { Router } from "express";
import { MonitoringLogController } from "../controllers/monitoringLog.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

const controller = new MonitoringLogController();

router.get(
    "/latest",
    authenticate,
    controller.getLatestLogs
);

router.get(
    "/:monitorId",
    authenticate,
    controller.getLogsByMonitor
);

router.get(
    "/:monitorId/latency",
    authenticate,
    controller.getAverageLatency
);

router.get(
    "/:monitorId/history",
    authenticate,
    controller.getHistory
);

export default router;