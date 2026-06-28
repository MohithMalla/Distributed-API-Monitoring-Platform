import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import prisma from "./config/prisma";
import { startMonitorScheduler } from "./scheduler/monitor.scheduler";
import { initializeSocket } from "./socket/socket";

const PORT = process.env.PORT || 5000;

async function startServer() {

    try {

        await prisma.$connect();

        console.log("✅ Database Connected");

        const server = http.createServer(app);

        initializeSocket(server);

        startMonitorScheduler();

        server.listen(PORT, () => {

            console.log(`🚀 Server Running on Port ${PORT}`);

        });

    } catch (error) {

        console.error(error);

    }

}

startServer();