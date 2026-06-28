import prisma from "../../../config/prisma";

export class IncidentRepository {

    async createIncident(data: any) {

        return prisma.incident.create({
            data,
            include: {
                monitor: {
                    include: {
                        project: true
                    }
                }
            }
        });

    }

    async getOpenIncident(monitorId: string) {

        const incident = await prisma.incident.findFirst({

            where: {

                monitorId,

                status: "OPEN"

            },

            include: {

                monitor: {

                    include: {

                        project: true

                    }

                }

            }

        });

        console.log("Searching Incident For:", monitorId);
        console.log("Found:", incident);

        return incident;

    }

    async resolveIncident(id: string) {

        return prisma.incident.update({

            where: {

                id

            },

            data: {

                status: "RESOLVED",

                resolvedAt: new Date()

            },

            include: {

                monitor: {

                    include: {

                        project: true

                    }

                }

            }

        });

    }

    async getIncidents() {

    return prisma.incident.findMany({

        include: {

            monitor: {

                select: {

                    id: true,
                    name: true,
                    url: true,
                    lastStatus: true

                }

            }

        },

        orderBy: {

            createdAt: "desc"

        }

    });

}

async getIncidentById(id: string) {

    return prisma.incident.findUnique({

        where: {

            id

        },

        include: {

            monitor: true

        }

    });

}

async getOpenIncidents() {

    return prisma.incident.findMany({

        where: {

            status: "OPEN"

        },

        include: {

            monitor: true

        },

        orderBy: {

            createdAt: "desc"

        }

    });

}

async getResolvedIncidents() {

    return prisma.incident.findMany({

        where: {

            status: "RESOLVED"

        },

        include: {

            monitor: true

        },

        orderBy: {

            resolvedAt: "desc"

        }

    });

}

}