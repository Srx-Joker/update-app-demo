import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdataModule } from './u-updata/updata.module';

@Module({
  imports: [
    UpdataModule.forRoot(new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "mysecretpassword",
      database: "DemoUpdateLib",
      schema: "public",
    })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
