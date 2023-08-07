import { Module } from '@nestjs/common';
import { BoardSchemaController } from './controller/board-schema.controller';
import { BoardSchemaService } from './service/board-schema.service';

@Module({
  controllers: [BoardSchemaController],
  providers: [BoardSchemaService]
})
export class BoardSchemaModule {}
