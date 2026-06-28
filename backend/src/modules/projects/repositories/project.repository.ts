import prisma from "../../../config/prisma";

export class ProjectRepository {

    async createProject(data: {
        name: string;
        description?: string;
        ownerId: string;
    }) {

        return prisma.project.create({
            data
        });

    }

    async getProjects(ownerId: string) {

    const projects = await prisma.project.findMany({

        where: {
            ownerId
        },

        include: {

            monitors: true

        },

        orderBy: {

            createdAt: "desc"

        }

    });

    return projects.map((project) => {

        const total = project.monitors.length;

        const healthy = project.monitors.filter(

            (monitor) => monitor.lastStatus === "UP"

        ).length;

        const down = project.monitors.filter(

            (monitor) => monitor.lastStatus === "DOWN"

        ).length;

        const uptime =

            total === 0

                ? 100

                : Number(

                    ((healthy / total) * 100).toFixed(2)

                );

        return {

            id: project.id,

            name: project.name,

            description: project.description,

            createdAt: project.createdAt,

            updatedAt: project.updatedAt,

            total,

            healthy,

            down,

            uptime,

            monitors: project.monitors

        };

    });

}
    async getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id
    }
  });
}

async updateProject(
  id: string,
  data: {
    name?: string;
    description?: string;
  }
) {
  return prisma.project.update({
    where: {
      id
    },
    data
  });
}

async deleteProject(id: string) {
  return prisma.project.delete({
    where: {
      id
    }
  });
}

}