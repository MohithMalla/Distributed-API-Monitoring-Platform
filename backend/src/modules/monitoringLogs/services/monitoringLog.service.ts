import { MonitoringLogRepository } from "../repositories/monitoringLog.repository";

export class MonitoringLogService {

    private repository = new MonitoringLogRepository();

    async createLog(data: any) {

        return this.repository.createLog(data);

    }

    async getLogsByMonitor(

        monitorId: string,

        page = 1,

        limit = 20

    ) {

        return this.repository.getLogsByMonitor(

            monitorId,

            page,

            limit

        );

    }

    async getLatestLogs(limit = 50) {

        return this.repository.getLatestLogs(limit);

    }

    async getAverageLatency(

        monitorId: string

    ) {

        return this.repository.getAverageLatency(

            monitorId

        );

    }

    async getHistory(
    monitorId: string
) {

    return this.repository.getHistory(
        monitorId
    );

}

}