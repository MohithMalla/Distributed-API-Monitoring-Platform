import { MonitorRepository } from "../repositories/monitor.repository";
import { ProjectRepository } from "../../projects/repositories/project.repository";
import { AppError } from "../../../utils/AppError";
import { monitorQueue } from "../../../queues/monitor.queue";

export class MonitorService {
    private monitorRepository = new MonitorRepository();
    private projectRepository = new ProjectRepository();

    async createMonitor(
        projectId: string,
        ownerId: string,
        data: any
    ) {
        const project = await this.projectRepository.getProjectById(projectId);

        if (!project) throw new AppError("Project not found", 404);
        if (project.ownerId !== ownerId) throw new AppError("Forbidden", 403);

        // ==========================================
        // 1. PERFORM IMMEDIATE INLINE HEALTH CHECK
        // ==========================================
        let initialStatus = "DOWN"; // Assume down initially
        try {
            // Using native Node fetch with a strict timeout (e.g., 5 seconds)
            // so the frontend doesn't hang forever if the URL is broken.
            const response = await fetch(data.url, {
                method: data.method || "GET",
                signal: AbortSignal.timeout(5000)
            });

            // If the response matches the expected status from the frontend
            if (response.status === Number(data.expectedStatus)) {
                initialStatus = "UP";
            }
        } catch (error) {
            console.log(`Initial ping failed for ${data.url}:`, error);
            initialStatus = "DOWN";
        }

        // ==========================================
        // 2. SAVE TO DATABASE WITH THE REAL STATUS
        // ==========================================
        const monitor = await this.monitorRepository.createMonitor({
            ...data,
            projectId,
            lastStatus: initialStatus // Inject the real status immediately!
        });

        // ==========================================
        // 3. ADD TO BACKGROUND QUEUE FOR FUTURE CHECKS
        // ==========================================
        await monitorQueue.add(
            "health-check",
            {
                monitorId: monitor.id
            },
            {
                // Optional: You can delay the first queue job since we just checked it!
                // delay: data.intervalSeconds * 1000 
            }
        );

        return monitor;
    }


    async getMonitors(
        projectId: string,
        ownerId: string
    ) {

        const project =
            await this.projectRepository.getProjectById(projectId);

        if (!project)
            throw new AppError("Project not found", 404);

        if (project.ownerId !== ownerId)
            throw new AppError("Forbidden", 403);

        return this.monitorRepository.getMonitors(projectId);

    }

    async getMonitorById(
    id: string,
    ownerId: string
) {

    return this.monitorRepository.getMonitorById(
        id,
        ownerId
    );

}

async updateMonitor(
    id: string,
    ownerId: string,
    data: any
) {

    return this.monitorRepository.updateMonitor(
        id,
        ownerId,
        data
    );

}

async deleteMonitor(
    id: string,
    ownerId: string
) {

    return this.monitorRepository.deleteMonitor(
        id,
        ownerId
    );

}

}