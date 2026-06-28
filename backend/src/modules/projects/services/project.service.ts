import { ProjectRepository } from "../repositories/project.repository";
import { AppError} from "../../../utils/AppError";
export class ProjectService {

    private projectRepository = new ProjectRepository();

    async createProject(
        name: string,
        description: string | undefined,
        ownerId: string
    ) {

        const project =
            await this.projectRepository.createProject({

                name,

                description,

                ownerId

            });

        return project;

    }

    async getProjects(ownerId: string) {

        return this.projectRepository.getProjects(ownerId);

    }
    async getProjectById(
    id: string,
    ownerId: string
) {

    const project =
        await this.projectRepository.getProjectById(id);

    if (!project)
        throw new AppError("Project not found",404);

    if(project.ownerId!==ownerId)
        throw new AppError("Forbidden",403);

    return project;

}

async updateProject(
    id:string,
    ownerId:string,
    name:string,
    description?:string
){
    const project=
    await this.getProjectById(id,ownerId);

    return this.projectRepository.updateProject(
        project.id,
        {
            name,
            description
        }
    );
}

async deleteProject(
    id:string,
    ownerId:string
){

    const project=
    await this.getProjectById(id,ownerId);

    return this.projectRepository.deleteProject(
        project.id
    );

}

}