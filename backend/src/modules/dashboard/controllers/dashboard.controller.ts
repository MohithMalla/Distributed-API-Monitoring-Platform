import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { asyncHandler } from "../../../utils/asyncHandler";

const dashboardService = new DashboardService();

export class DashboardController {

    getDashboard = asyncHandler(
        async (req: Request, res: Response) => {

            const userId = (req as any).user.userId;

            const dashboard =
                await dashboardService.getDashboard(userId);

            return res.status(200).json({

                success: true,

                message: "Dashboard Data Retrieved Successfully",

                data: dashboard

            });

        }
    );

}