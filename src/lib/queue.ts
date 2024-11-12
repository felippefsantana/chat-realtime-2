import { Queue } from "bullmq";
import redisConfig from "../config/redis";
import * as jobs from "../jobs";

const queues = Object.values(jobs).map(job => ({
  bullmq: new Queue(job.key, {
    connection: redisConfig
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(queueName: string, jobName: string, data: any) {
    const queue = this.queues.find(queue => queue.name === queueName);
    return queue?.bullmq.add(jobName, data)
  }
};
