import prisma from "../../../config/prisma";

export class MonitorRepository {

    async createMonitor(data: any) {
        return prisma.monitor.create({
            data
        });
    }

    async getMonitors(projectId: string) {
        return prisma.monitor.findMany({
            where: {
                projectId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async getMonitorById(
    id: string,
    ownerId: string
) {

    return prisma.monitor.findFirst({

        where: {

            id,

            project: {

                ownerId

            }

        }

    });

}

async updateMonitor(
    id: string,
    ownerId: string,
    data: any
) {

    const monitor =
        await this.getMonitorById(id, ownerId);

    if (!monitor)
        throw new Error("Monitor Not Found");

    return prisma.monitor.update({

        where: {

            id

        },

        data

    });

}

async deleteMonitor(
    id: string,
    ownerId: string
) {

    const monitor =
        await this.getMonitorById(id, ownerId);

    if (!monitor)
        throw new Error("Monitor Not Found");

    return prisma.monitor.delete({

        where: {

            id

        }

    });

}


async updateMonitorStatus(
    id: string,
    data: any
) {

    return prisma.monitor.update({

        where: {
            id
        },

        data

    });

}
}