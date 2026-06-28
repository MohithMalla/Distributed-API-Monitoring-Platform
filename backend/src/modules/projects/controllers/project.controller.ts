import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import { asyncHandler } from "../../../utils/asyncHandler";

const projectService = new ProjectService();

export class ProjectController {

    createProject = asyncHandler(async (req: Request, res: Response) => {

        const { name, description } = req.body;

        const ownerId = (req as any).user.userId;

        const project =
            await projectService.createProject(

                name,

                description,

                ownerId

            );

        return res.status(201).json({

            success: true,

            message: "Project created successfully",

            data: project

        });

    });

    getProjects = asyncHandler(async (req: Request, res: Response) => {

        const ownerId = (req as any).user.userId;

        const projects =
            await projectService.getProjects(ownerId);

        return res.status(200).json({

            success: true,

            data: projects

        });

    });

    getProjectById=asyncHandler(async(req,res)=>{

    const ownerId=(req as any).user.userId;

    const project=
    await projectService.getProjectById(

        req.params.id,

        ownerId

    );

    res.json({

        success:true,

        data:project

    });

});

updateProject=asyncHandler(async(req,res)=>{

    const ownerId=(req as any).user.userId;

    const {name,description}=req.body;

    const project=
    await projectService.updateProject(

        req.params.id,

        ownerId,

        name,

        description

    );

    res.json({

        success:true,

        message:"Project Updated",

        data:project

    });

});

deleteProject=asyncHandler(async(req,res)=>{

    const ownerId=(req as any).user.userId;

    await projectService.deleteProject(

        req.params.id,

        ownerId

    );

    res.json({

        success:true,

        message:"Project Deleted"

    });

});

}