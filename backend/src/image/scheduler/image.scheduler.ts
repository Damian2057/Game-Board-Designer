import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ImageScheduler {

  private readonly logger = new Logger(ImageScheduler.name)

  @Cron(CronExpression.EVERY_WEEK)
  deleteUnusedImages() {
    this.logger.debug('delete unused images');
    //TODO: implement this
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  isDbConsistentWithDirectory() {
    this.logger.debug('synchronization');
    //TODO: implement this
  }
}
