import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    NestjsFormDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
