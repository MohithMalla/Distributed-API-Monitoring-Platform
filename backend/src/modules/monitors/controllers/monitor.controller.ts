import { Request, Response } from "express";
import { MonitorService } from "../services/monitor.service";
import { asyncHandler } from "../../../utils/asyncHandler";

const monitorService = new MonitorService();

export class MonitorController {

    createMonitor = asyncHandler(async (req: Request, res: Response) => {

        const ownerId = (req as any).user.userId;

        const monitor = await monitorService.createMonitor(

            req.params.projectId,

            ownerId,

            req.body

        );

        return res.status(201).json({

            success: true,

            message: "Monitor Created Successfully",

            data: monitor

        });

    });

    getMonitors = asyncHandler(async (req: Request, res: Response) => {

        const ownerId = (req as any).user.userId;

        const monitors = await monitorService.getMonitors(

            req.params.projectId,

            ownerId

        );

        return res.json({

            success: true,

            data: monitors

        });

    });

    getMonitorById = asyncHandler(async (req: Request, res: Response) => {

    const ownerId = (req as any).user.userId;

    const monitor =
        await monitorService.getMonitorById(
            req.params.id,
            ownerId
        );

    return res.json({

        success: true,

        data: monitor

    });

});

updateMonitor = asyncHandler(async (req: Request, res: Response) => {

    const ownerId = (req as any).user.userId;

    const monitor =
        await monitorService.updateMonitor(
            req.params.id,
            ownerId,
            req.body
        );

    return res.json({

        success: true,

        message: "Monitor Updated Successfully",

        data: monitor

    });

});

deleteMonitor = asyncHandler(async (req: Request, res: Response) => {

    const ownerId = (req as any).user.userId;

    await monitorService.deleteMonitor(
        req.params.id,
        ownerId
    );

    return res.json({

        success: true,

        message: "Monitor Deleted Successfully"

    });

});

}