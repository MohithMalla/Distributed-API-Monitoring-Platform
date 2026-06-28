import { monitorQueue } from "../queues/monitor.queue";

async function clear() {

    console.log("Clearing Queue...");

    await monitorQueue.drain(true);

    await monitorQueue.clean(0, 1000, "completed");
    await monitorQueue.clean(0, 1000, "failed");
    await monitorQueue.clean(0, 1000, "wait");
    await monitorQueue.clean(0, 1000, "delayed");

    console.log("Queue Cleared");

    process.exit(0);

}

clear();