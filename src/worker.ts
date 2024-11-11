import { Worker } from "bullmq";
import redisConfig from "./config/redis";
import Queue from "./lib/queue";

Queue.queues.forEach(queue => {
  const worker = new Worker(
    queue.name,
    queue.handle,
    {
      connection: redisConfig
    }
  );

  worker.on("completed", (job) => {
    console.log("Job completed", job.name, job.data);
  });

  worker.on("failed", (job, error) => {
    console.log("Job failed", job?.name, job?.data);
    console.log(error);
  });
});