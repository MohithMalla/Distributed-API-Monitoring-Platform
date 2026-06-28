import { monitorQueue } from "./queues/monitor.queue";

async function main(){

    await monitorQueue.add(

        "health-check",

        {

            url:"https://jsonplaceholder.typicode.com/posts"

        }

    );

    console.log("Job Added");

}

main();