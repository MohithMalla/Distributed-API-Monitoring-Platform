import { DashboardRepository } from "../repositories/dashboard.repository";

export class DashboardService {

    private repository = new DashboardRepository();

    async getDashboard(userId: string) {

        return await this.repository.getDashboard(userId);

    }

}