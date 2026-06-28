import { Queue } from "bullmq";
import { redisConfig } from "../config/redis";

export const monitorQueue = new Queue("monitor-queue", {
  connection: redisConfig,
});