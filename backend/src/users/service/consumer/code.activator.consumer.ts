import { Processor, Process } from "@nestjs/bull";
import { CODE_SEND_EMAIL } from "../../../util/bullMQ/queue";
import { Job } from "bull";

@Processor(CODE_SEND_EMAIL)
export class CodeActivatorConsumer {

  @Process()
  async sendEmail(job: Job<unknown>) {
    console.log(job.data)
  }

}