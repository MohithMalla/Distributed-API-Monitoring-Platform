import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

const projectController =
    new ProjectController();

router.post(
    "/",
    authenticate,
    projectController.createProject
);

router.get(
    "/",
    authenticate,
    projectController.getProjects
);

router.get(
    "/:id",
    authenticate,
    projectController.getProjectById
);

router.put(
    "/:id",
    authenticate,
    projectController.updateProject
);

router.delete(
    "/:id",
    authenticate,
    projectController.deleteProject
);

export default router;