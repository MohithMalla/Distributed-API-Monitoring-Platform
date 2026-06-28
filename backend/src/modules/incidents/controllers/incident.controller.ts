import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { IncidentService } from "../services/incident.service";

const incidentService = new IncidentService();

export class IncidentController {

    getIncidents = asyncHandler(async (req: Request, res: Response) => {

        const incidents =
            await incidentService.getIncidents();

        return res.json({

            success: true,

            data: incidents

        });

    });

    getIncidentById = asyncHandler(async (req: Request, res: Response) => {

        const incident =
            await incidentService.getIncidentById(
                req.params.id
            );

        return res.json({

            success: true,

            data: incident

        });

    });

    getOpenIncidents = asyncHandler(async (req: Request, res: Response) => {

        const incidents =
            await incidentService.getOpenIncidents();

        return res.json({

            success: true,

            data: incidents

        });

    });

    getResolvedIncidents = asyncHandler(async (req: Request, res: Response) => {

        const incidents =
            await incidentService.getResolvedIncidents();

        return res.json({

            success: true,

            data: incidents

        });

    });

}