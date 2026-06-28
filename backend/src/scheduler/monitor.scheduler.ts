import prisma from "../config/prisma";
import { monitorQueue } from "../queues/monitor.queue";

export function startMonitorScheduler() {

    console.log("🕒 Monitor Scheduler Started");

    setInterval(async () => {

        const monitors = await prisma.monitor.findMany({

            where: {

                isActive: true

            }

        });

        console.log(`[${new Date().toLocaleTimeString()}] Found ${monitors.length} active monitors`);

        for (const monitor of monitors) {

            await monitorQueue.add(
                "health-check",
                {
                    monitorId: monitor.id
                },
                {
                    jobId: monitor.id,
                    removeOnComplete: true,
                    removeOnFail: 100
                }
            );

        }

    }, 10000);

}