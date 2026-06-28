import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { MonitoringLogService } from "../services/monitoringLog.service";

const monitoringLogService = new MonitoringLogService();

export class MonitoringLogController {

    getLogsByMonitor = asyncHandler(async (req: Request, res: Response) => {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 20;

        const logs =
            await monitoringLogService.getLogsByMonitor(
                req.params.monitorId,
                page,
                limit
            );

        return res.status(200).json({

            success: true,

            data: logs

        });

    });

    getLatestLogs = asyncHandler(async (req: Request, res: Response) => {

        const limit = Number(req.query.limit) || 50;

        const logs =
            await monitoringLogService.getLatestLogs(limit);

        return res.status(200).json({

            success: true,

            data: logs

        });

    });

    getAverageLatency = asyncHandler(async (req: Request, res: Response) => {

        const latency =
            await monitoringLogService.getAverageLatency(
                req.params.monitorId
            );

        return res.status(200).json({

            success: true,

            data: latency

        });

    });

    getHistory = asyncHandler(async (req: Request, res: Response) => {

    const history =
        await monitoringLogService.getHistory(
            req.params.monitorId
        );

    return res.status(200).json({

        success: true,

        data: history

    });

});

}