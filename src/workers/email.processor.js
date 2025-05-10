import { Worker } from "bullmq";
import { sendEmail } from "../utils/sendEmail.js";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    console.log(job.data);
    
    await sendEmail(job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", job =>{
    console.log(`Email job ${job.id} completed`);
})

worker.on("failed", (job,err) => {
    console.log(`Email job ${job.id} failed: ${err.message}`);
})