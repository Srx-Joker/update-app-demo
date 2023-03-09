import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UpdataModule } from './u-updata/updata.module';

@Module({
  imports: [
    UpdataModule.useTypeorm({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "mysecretpassword",
      database: "DemoUpdateLib",
      schema: "public",
      synchronize: true,
    },
    "./package/packs"
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
