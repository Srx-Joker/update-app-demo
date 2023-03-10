import { DynamicModule, Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormFileStorage } from 'update-app-server';
import { UConfig } from './dao/impl/typeormImpl/entitys/UConfig.entity';
import { ULogs } from './dao/impl/typeormImpl/entitys/ULogs.entity';
import { ULogsType } from './dao/impl/typeormImpl/entitys/ULogsType.entity';
import { USpecialUser } from './dao/impl/typeormImpl/entitys/USpecialUSer.entity';
import { UUploadlUser } from './dao/impl/typeormImpl/entitys/UUploadUser.entity';
import { UpdateService } from './service/updata.service';
import { UpdateController } from './update.controller';

interface controllers {
  updateController: boolean,

}

@Module({
  imports: []
})
export class UpdataModule {
  public static async useTypeorm(DataSourceOptions: DataSourceOptions, packagePath: string, hasController: boolean = true): Promise<DynamicModule> {

    // @ts-ignore
    DataSourceOptions.entities = [UConfig, ULogs, ULogsType, USpecialUser, UUploadlUser, ...TypeormFileStorage.GetEntitys()];

    // 创建数据源
    let dataSource = new DataSource(DataSourceOptions);

    // 初始化数据库
    await dataSource.initialize();

    // 创建表
    dataSource.synchronize()

    // 创建更新服务
    UpdateController.CreateUpdateService = () => {
      return new UpdateService(dataSource, packagePath);
    }

    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        hasController ? UpdateController : null,
      ],
    };
  }

  // 使用JSON作为存储
  public static async useJSON(jsonPath: string, packagePath: string, hasController: boolean = true): Promise<DynamicModule> {
    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        hasController ? UpdateController : null,
      ],
    };
  }

  // 使用Dameng作为存储
  public static async useDameng(jsonPath: string, packagePath: string, hasController: boolean = true): Promise<DynamicModule> {
    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        hasController ? UpdateController : null,
      ],
    };
  }

  // 使用Mongo作为存储
  public static async useMongo(jsonPath: string, packagePath: string, hasController: boolean = true): Promise<DynamicModule> {

    return {
      imports: [NestjsFormDataModule],
      module: UpdataModule,
      controllers: [
        hasController ? UpdateController : null,
      ],
    };
  }


}
