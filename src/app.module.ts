import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './database/ormConfig';
import { ApiModule } from './api.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
