import { monitorQueue } from "../queues/monitor.queue";

async function checkQueue() {

    const waiting = await monitorQueue.getWaiting();
    const active = await monitorQueue.getActive();
    const completed = await monitorQueue.getCompleted();
    const failed = await monitorQueue.getFailed();
    const delayed = await monitorQueue.getDelayed();

    console.log("\n========= QUEUE STATUS =========\n");

    console.log("Waiting Jobs :", waiting.length);
    console.log("Active Jobs  :", active.length);
    console.log("Completed    :", completed.length);
    console.log("Failed       :", failed.length);
    console.log("Delayed      :", delayed.length);

    console.log("\n----- Waiting Jobs -----");

    waiting.forEach(job => {
        console.log(job.id, job.data);
    });

    console.log("\n----- Active Jobs -----");

    active.forEach(job => {
        console.log(job.id, job.data);
    });

    console.log("\n----- Failed Jobs -----");

    failed.forEach(job => {
        console.log(job.id, job.data);
    });

    process.exit(0);

}

checkQueue();