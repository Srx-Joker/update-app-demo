import { DynamicModule, Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DataSource } from 'typeorm';
import { UpdataController } from './updata.controller';


@Module({
  imports: []
})
export class UpdataModule {
  public static async forRoot(dataSource: DataSource): Promise<DynamicModule> {
    await dataSource.initialize();

    // 这里总感觉不是这样弄得, 有机会改掉
    // 将dataSource注入到UpdataController中
    UpdataController.dataSource = dataSource;
    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        UpdataController,
      ],
    };
  }
}
