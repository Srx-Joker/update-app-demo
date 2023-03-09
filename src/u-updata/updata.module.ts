import { DynamicModule, Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormFileStorage } from 'update-app-server';
import { UConfig } from './dao/impl/typeormImpl/entitys/UConfig.entity';
import { ULogs } from './dao/impl/typeormImpl/entitys/ULogs.entity';
import { ULogsType } from './dao/impl/typeormImpl/entitys/ULogsType.entity';
import { USpecialUser } from './dao/impl/typeormImpl/entitys/USpecialUSer.entity';
import { UUploadlUser } from './dao/impl/typeormImpl/entitys/UUploadUser.entity';
import { UpdataController } from './updata.controller';


@Module({
  imports: []
})
export class UpdataModule {
  public static async useTypeorm(DataSourceOptions: DataSourceOptions,packagePath:string,hasController:boolean = true): Promise<DynamicModule> {
    
    // @ts-ignore
    DataSourceOptions.entities = [UConfig, ULogs,ULogsType,USpecialUser,UUploadlUser,...TypeormFileStorage.GetEntitys()];

    let dataSource = new DataSource(DataSourceOptions);

    await dataSource.initialize();

    dataSource.synchronize()

    // 这里总感觉不是这样弄得, 有机会改掉
    // 将dataSource注入到UpdataController中
    UpdataController.dataSource = dataSource;
    UpdataController.packagePath = packagePath;
    

    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        hasController? UpdataController : null,
      ],
    };
  }
}
