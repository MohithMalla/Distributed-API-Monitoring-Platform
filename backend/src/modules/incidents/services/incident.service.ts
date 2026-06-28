import { getIO } from "../../../socket/socket";
import { telegramService } from "../../notifications/services/telegram.service";
import { IncidentRepository } from "../repositories/incident.repository";

export class IncidentService {

    private repository = new IncidentRepository();

    async getIncidents() {

        return this.repository.getIncidents();

    }

    async getIncidentById(id: string) {

        return this.repository.getIncidentById(id);

    }

    async getOpenIncidents() {

        return this.repository.getOpenIncidents();

    }

    async getResolvedIncidents() {

        return this.repository.getResolvedIncidents();

    }

    async handleFailure(
        monitorId: string,
        consecutiveFailures: number
    ) {

        if (consecutiveFailures < 3)
            return;

        const existing =
            await this.repository.getOpenIncident(monitorId);

        if (existing)
            return;

        await this.repository.createIncident({

            monitorId,

            reason: "Monitor failed 3 consecutive health checks"

        });
        getIO().emit("incident-created", {

    monitorId,

    status: "OPEN"

});

        await telegramService.sendMessage(`

🚨 *INCIDENT CREATED*

Monitor ID:
${monitorId}

Reason:
Monitor failed 3 consecutive health checks

Status:
OPEN

`);

    }

    async handleRecovery(
        monitorId: string
    ) {

        const existing =
            await this.repository.getOpenIncident(monitorId);

        if (!existing)
            return;

        await this.repository.resolveIncident(existing.id);

                getIO().emit("incident-resolved", {

            monitorId,

            status: "RESOLVED"

        });

        await telegramService.sendMessage(`

✅ *INCIDENT RESOLVED*

Monitor ID:
${monitorId}

Status:
RESOLVED

`);

    }

}