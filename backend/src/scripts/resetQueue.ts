import { monitorQueue } from "../queues/monitor.queue";

async function resetQueue() {
    console.log("Clearing BullMQ queue...");

    await monitorQueue.pause();

    await monitorQueue.drain(true);

    await monitorQueue.clean(0, 10000, "completed");
    await monitorQueue.clean(0, 10000, "failed");
    await monitorQueue.clean(0, 10000, "wait");
    await monitorQueue.clean(0, 10000, "delayed");
    await monitorQueue.clean(0, 10000, "active");

    await monitorQueue.resume();

    console.log("✅ Queue cleared successfully.");

    process.exit(0);
}

resetQueue();