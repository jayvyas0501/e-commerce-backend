import { Worker } from "bullmq";
import { sendEmail } from "../utils/sendEmail.js";
import logger from "../utils/logger.js";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    logger.info(`Processing email job ${job.id}:`, job.data);

    await sendEmail(job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  logger.info(`Email job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  logger.error(`Email job ${job.id} failed: ${err.message}`);
});
