import { Processor, Process } from "@nestjs/bull";
import { CODE_SEND_EMAIL } from "../../../util/bullMQ/queue";
import { Job } from "bull";
import { Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as process from "process";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CodeEntity } from "../../model/domain/code.entity";

const crypto = require('crypto');

@Processor(CODE_SEND_EMAIL)
export class CodeActivatorConsumer {

  private readonly logger = new Logger(CodeActivatorConsumer.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(CodeEntity)
    private readonly codeRepository: Repository<CodeEntity>
  ) {}

  @Process()
  async sendEmail(job: Job<any>) {
    const code: string = this.generateCode(job.data.email)
    this.mailerService.sendMail({
      to: job.data.email,
      from: process.env.SMTP_FROM,
      subject: 'Code Activator',
      text: `Activation code: ${code}`,
    }).then(() => {
      this.logger.log('Activation email sent to: ' + job.data.email);
    }).catch((error) => {
      this.logger.error(error);
    });
    await this.codeRepository.save(new CodeEntity(code, job.data.email, new Date().toISOString()));
  }

  private generateCode(email: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(email);
    return hash.digest('hex');
  }

}