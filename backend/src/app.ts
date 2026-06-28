import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./modules/auth/routes/auth.routes";
import projectRoutes from "./modules/projects/routes/project.routes";
import monitorRoutes from "./modules/monitors/routes/monitor.routes";
import incidentRoutes from "./modules/incidents/routes/incident.routes";
import dashboardRoutes from "./modules/dashboard/routes/dashboard.routes";
import monitoringLogRoutes from "./modules/monitoringLogs/routes/monitoringLog.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/incidents", incidentRoutes);
app.use("/monitoring-logs", monitoringLogRoutes);

app.use(monitorRoutes);

// app.use(monitoringLogRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Monitoring Platform Running 🚀"
    });
});

app.use(errorHandler);

export default app;