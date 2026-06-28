// import { Router } from "express";
// import { MonitorController } from "../controllers/monitor.controller";
// import { authenticate } from "../../../middleware/auth.middleware";

// const router = Router();

// const controller = new MonitorController();

// router.post(
//     "/projects/:projectId/monitors",
//     authenticate,
//     controller.createMonitor
// );

// router.get(
//     "/projects/:projectId/monitors",
//     authenticate,
//     controller.getMonitors
// );

// router.get(
//     "/monitors/:id",
//     authenticate,
//     controller.getMonitorById
// );

// router.put(
//     "/monitors/:id",
//     authenticate,
//     controller.updateMonitor
// );

// router.delete(
//     "/monitors/:id",
//     authenticate,
//     controller.deleteMonitor
// );

// export default router;


import { Router } from "express";
import { MonitorController } from "../controllers/monitor.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

const controller = new MonitorController();

router.post(
    "/projects/:projectId/monitors",
    authenticate,
    controller.createMonitor
);

router.get(
    "/projects/:projectId/monitors",
    authenticate,
    controller.getMonitors
);

router.get(
    "/monitors/:id",
    authenticate,
    controller.getMonitorById
);

router.put(
    "/monitors/:id",
    authenticate,
    controller.updateMonitor
);

router.delete(
    "/monitors/:id",
    authenticate,
    controller.deleteMonitor
);

export default router;