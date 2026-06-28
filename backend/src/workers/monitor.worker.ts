import { MonitoringLogRepository } from "../modules/monitoringLogs/repositories/monitoringLog.repository";
import { MonitorRepository } from "../modules/monitors/repositories/monitor.repository";
import { Worker } from "bullmq";
import axios from "axios";
import prisma from "../config/prisma";
import { redisConfig } from "../config/redis";
import { IncidentService } from "../modules/incidents/services/incident.service";
import { getIO } from "../socket/socket";

const logRepository = new MonitoringLogRepository();
const monitorRepository = new MonitorRepository();
const incidentService = new IncidentService();

const worker = new Worker(
    "monitor-queue",

    async (job) => {

        const monitor = await prisma.monitor.findUnique({
            where: {
                id: job.data.monitorId
            }
        });

        if (!monitor) {
            console.log("❌ Monitor Not Found:", job.data.monitorId);
            return;
        }

        console.log("\n==============================");
        console.log("Checking:", monitor.name);
        console.log("URL:", monitor.url);
        console.log("==============================");

        const start = Date.now();

        try {

            const response = await axios({

                url: monitor.url,
                method: monitor.method as any,
                timeout: monitor.timeout,

                headers: {
                    "User-Agent": "API-Monitor",
                    Accept: "application/json",
                    ...(monitor.headers as any)
                },

                data: monitor.body,

                validateStatus: () => true

            });

            const latency = Date.now() - start;

            console.log("HTTP Status:", response.status);

            if (response.status === monitor.expectedStatus) {

                await logRepository.createLog({

                    monitorId: monitor.id,
                    statusCode: response.status,
                    responseTime: latency,
                    isHealthy: true,
                    errorMessage: null

                });

                await monitorRepository.updateMonitorStatus(

                    monitor.id,

                    {

                        lastCheckedAt: new Date(),
                        lastStatus: "UP",
                        averageLatency: latency,
                        consecutiveFailures: 0

                    }

                );

                await incidentService.handleRecovery(monitor.id);

                try {

                    getIO().emit("monitor-status", {

                        monitorId: monitor.id,
                        monitorName: monitor.name,
                        status: "UP",
                        latency,
                        checkedAt: new Date()

                    });

                } catch {}

                console.log("✅ Health Check Saved");

            } else {

                const updatedMonitor =
                    await monitorRepository.updateMonitorStatus(

                        monitor.id,

                        {

                            lastCheckedAt: new Date(),
                            lastStatus: "DOWN",

                            consecutiveFailures: {

                                increment: 1

                            }

                        }

                    );

                await logRepository.createLog({

                    monitorId: monitor.id,
                    statusCode: response.status,
                    responseTime: latency,
                    isHealthy: false,

                    errorMessage:
                        `Expected ${monitor.expectedStatus} but got ${response.status}`

                });

                await incidentService.handleFailure(

                    monitor.id,

                    updatedMonitor.consecutiveFailures

                );

                try {

                    getIO().emit("monitor-status", {

                        monitorId: monitor.id,
                        monitorName: monitor.name,
                        status: "DOWN",
                        latency,
                        checkedAt: new Date(),
                        failures: updatedMonitor.consecutiveFailures

                    });

                } catch {}

                console.log("❌ Unexpected Status:", response.status);

            }

        } catch (error: any) {

            const latency = Date.now() - start;

            console.log("❌ Request Failed");
            console.log("Reason:", error.message);

            if (error.code)
                console.log("Code:", error.code);

            if (error.response)
                console.log("Response Status:", error.response.status);

            await logRepository.createLog({

                monitorId: monitor.id,
                statusCode: error.response?.status ?? null,
                responseTime: latency,
                isHealthy: false,
                errorMessage: error.message

            });

            const updatedMonitor =
                await monitorRepository.updateMonitorStatus(

                    monitor.id,

                    {

                        lastCheckedAt: new Date(),
                        lastStatus: "DOWN",

                        consecutiveFailures: {

                            increment: 1

                        }

                    }

                );

            await incidentService.handleFailure(

                monitor.id,

                updatedMonitor.consecutiveFailures

            );

            try {

                getIO().emit("monitor-status", {

                    monitorId: monitor.id,
                    monitorName: monitor.name,
                    status: "DOWN",
                    latency,
                    checkedAt: new Date(),
                    failures: updatedMonitor.consecutiveFailures,
                    error: error.message

                });

            } catch {}

            console.log("❌ Failure Saved");

        }

    },

    {

        connection: redisConfig

    }

);

console.log("🚀 Monitor Worker Started");