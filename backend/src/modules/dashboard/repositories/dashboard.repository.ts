import prisma from "../../../config/prisma";
import { MonitorStatus, IncidentStatus } from "@prisma/client";

export class DashboardRepository {

    async getDashboard(userId: string) {

        const projects = await prisma.project.findMany({

            where: {
                ownerId: userId
            },

            include: {
                monitors: true
            }

        });

        const projectIds = projects.map(project => project.id);

        const monitorIds = projects.flatMap(
            project => project.monitors.map(monitor => monitor.id)
        );

        const totalProjects = projects.length;

        const totalMonitors = await prisma.monitor.count({

            where: {

                projectId: {

                    in: projectIds

                }

            }

        });

        const healthyMonitors = await prisma.monitor.count({

            where: {

                projectId: {

                    in: projectIds

                },

                lastStatus: MonitorStatus.UP

            }

        });

        const downMonitors = await prisma.monitor.count({

            where: {

                projectId: {

                    in: projectIds

                },

                lastStatus: MonitorStatus.DOWN

            }

        });

        const openIncidents = await prisma.incident.count({

            where: {

                monitorId: {

                    in: monitorIds

                },

                status: IncidentStatus.OPEN

            }

        });

        const recentIncidents = await prisma.incident.findMany({

            where: {

                monitorId: {

                    in: monitorIds

                }

            },

            include: {

                monitor: true

            },

            orderBy: {

                createdAt: "desc"

            },

            take: 5

        });

        const recentLogs = await prisma.monitoringLog.findMany({

            where: {

                monitorId: {

                    in: monitorIds

                }

            },

            include: {

                monitor: true

            },

            orderBy: {

                checkedAt: "desc"

            },

            take: 10

        });

        const avgLatency = await prisma.monitoringLog.aggregate({

    where: {

        monitorId: {

            in: monitorIds

        },

        isHealthy: true

    },

    _avg: {

        responseTime: true

    }

});

const totalLogs = await prisma.monitoringLog.count({

    where: {

        monitorId: {

            in: monitorIds

        }

    }

});

const healthyLogs = await prisma.monitoringLog.count({

    where: {

        monitorId: {

            in: monitorIds

        },

        isHealthy: true

    }

});

const uptimePercentage =
    totalLogs === 0
        ? 100
        : Number(
              ((healthyLogs / totalLogs) * 100).toFixed(2)
          );

const lastUpdated = new Date();

        return {

    totalProjects,

    totalMonitors,

    healthyMonitors,

    downMonitors,

    openIncidents,

    averageLatency: Math.round(
        avgLatency._avg.responseTime ?? 0
    ),

    uptimePercentage,

    lastUpdated,

    recentIncidents: recentIncidents.map((incident) => ({

        id: incident.id,

        status: incident.status,

        reason: incident.reason,

        createdAt: incident.createdAt,

        monitor: {

            id: incident.monitor.id,

            name: incident.monitor.name,

            url: incident.monitor.url,

            lastStatus: incident.monitor.lastStatus

        }

    })),

    recentLogs: recentLogs.map((log) => ({

        id: log.id,

        statusCode: log.statusCode,

        responseTime: log.responseTime,

        isHealthy: log.isHealthy,

        errorMessage: log.errorMessage,

        checkedAt: log.checkedAt,

        monitor: {

            id: log.monitor.id,

            name: log.monitor.name,

            url: log.monitor.url,

            method: log.monitor.method,

            lastStatus: log.monitor.lastStatus

        }

    }))

};

    }

}