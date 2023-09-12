import { Injectable, Logger } from "@nestjs/common";
import { CodeEntity } from "../model/domain/code.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class CodeScheduler {

  private readonly logger = new Logger(CodeScheduler.name);

  constructor(
    @InjectRepository(CodeEntity)
    private readonly codeRepository: Repository<CodeEntity>,
  ) {}


  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async deleteExpiredCodes() {
    const codes = await this.getCodesToDelete();
    this.logger.debug(`Found ${codes.length} codes to delete`);
    for (const code of codes) {
      await this.codeRepository.delete(code.id);
      this.logger.debug(`Deleted code with id: ${code.id}`);
    }
  }

  private async getCodesToDelete() {
    const codes: CodeEntity[] = await this.codeRepository.find();
    const currentTime = new Date();

    return codes.filter((code) => {
      const codeDate = new Date(code.createdAt);
      const timeDifference = currentTime.getTime() - codeDate.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      return hoursDifference > 2;
    });
  }

}