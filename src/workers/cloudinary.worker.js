//for running this file you have to be in root first and than give path to worker and run because worker will find env in src folder so avoid going in folder and running perticular worker
//jay@jay-Inspiron-3593:~/Desktop/Practice/e-commerce$ node src/workers/cloudinary.worker.js 

import dotenv from "dotenv";
dotenv.config(); // 👈 This line loads .env variables

import { Worker } from "bullmq"
import IORedis from "ioredis"
import cloudinary from "../config/cloudinaryConfig.js"




const connection = new IORedis({
    host:"localhost",
    port:6379,
    maxRetriesPerRequest:null
})

const cloudinaryWorker = new Worker(
    "cloudinaryQueue",
    async(job) => {
    const {public_ids} = job.data

    for(const id of public_ids){
        try {
            await cloudinary.uploader.destroy(id);
            console.log(`✅ Deleted image: ${id}`);
        } catch (err) {
            console.error(`❌ Failed to delete image ${id}:`, err);
        }
    }
    },{connection}
)


cloudinaryWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

cloudinaryWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});