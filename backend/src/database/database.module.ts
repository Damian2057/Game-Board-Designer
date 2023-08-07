import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRESQL_HOST,
        port: parseInt(process.env.POSTGRES_LOCAL_PORT),
        username: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASS,
        database: process.env.POSTGRESQL_DB,
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    })
  ],
})
export class DatabaseModule {}
