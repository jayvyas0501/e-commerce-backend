import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "localhost", // or "host.docker.internal" on Docker for Windows/Mac
  port: 6379,
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue("emailQueue", { connection });

export const cloudinaryQueue = new Queue("cloudinaryQueue", { connection })