import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ImageScheduler {

  private readonly logger = new Logger(ImageScheduler.name)

  //TODO: implement this
  @Cron(CronExpression.EVERY_30_SECONDS)
  deleteUnusedImages() {
    this.logger.debug('delete unused images');
  }
}
