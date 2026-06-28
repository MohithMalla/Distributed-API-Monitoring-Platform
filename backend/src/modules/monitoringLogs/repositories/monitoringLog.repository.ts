import prisma from "../../../config/prisma";

export class MonitoringLogRepository {

    async createLog(data: any) {

        return prisma.monitoringLog.create({
            data
        });

    }

    async getLogsByMonitor(
        monitorId: string,
        page = 1,
        limit = 20
    ) {

        return prisma.monitoringLog.findMany({

            where: {

                monitorId

            },

            orderBy: {

                checkedAt: "desc"

            },

            skip: (page - 1) * limit,

            take: limit

        });

    }

    async getLatestLogs(limit = 50) {

        return prisma.monitoringLog.findMany({

            include: {

                monitor: true

            },

            orderBy: {

                checkedAt: "desc"

            },

            take: limit

        });

    }

    async getAverageLatency(
        monitorId: string
    ) {

        return prisma.monitoringLog.aggregate({

            where: {

                monitorId

            },

            _avg: {

                responseTime: true

            }

        });

    }

    async getHistory(
    monitorId: string
) {

    return prisma.monitoringLog.findMany({

        where: {

            monitorId

        },

        select: {

            checkedAt: true,
            responseTime: true,
            isHealthy: true,
            statusCode: true

        },

        orderBy: {

            checkedAt: "asc"

        },

        take: 100

    });

}

}