import { Processor, Process } from "@nestjs/bull";
import { CODE_SEND_EMAIL } from "../../../util/bullMQ/queue";
import { Job } from "bull";
import { Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as process from "process";

const crypto = require('crypto');

@Processor(CODE_SEND_EMAIL)
export class CodeActivatorConsumer {

  private readonly logger = new Logger(CodeActivatorConsumer.name);

  constructor(
    private readonly mailerService: MailerService,
  ) {}

  @Process()
  async sendEmail(job: Job<any>) {
    console.log(job.data)
    this.mailerService.sendMail({
      to: job.data.email,
      from: process.env.SMTP_FROM,
      subject: 'Code Activator',
      text: 'Activation code: ' + this.generateCode(job.data.email),
    }).then(() => {
      this.logger.log('Email sent to: ' + job.data.email);
    }).catch((error) => {
      this.logger.error(error);
    });
  }

  private generateCode(email: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(email);
    return hash.digest('hex');
  }

}