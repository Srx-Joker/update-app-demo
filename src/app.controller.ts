import { Controller, Get, Res,Post, Body, Query ,UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data/dist/decorators';
import { AppService } from './app.service';
import { UpdateService } from './update.service';
import { v4 as uuid } from 'uuid';

@Controller()
export class AppController {
  private updateService: UpdateService;

  constructor(
    private readonly appService: AppService
    
  ) {
    this.updateService = new UpdateService();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('checkUpdate')
  updateApp(@Query("version")version:string): string {
    if(!version){
      console.log("版本号为空")
      return
    }

    console.log("当前版本：",version)
    return this.updateService.CheckUpdate(version).toString();
  }
  
  @Get('download/:apkName')
  // 下载文件接口
  downloadApp(@Query("userID") id:string,@Res() res: Response) {
    res.download
    let taskID = uuid();
    console.log("下载文件：",taskID,"用户ID：",id)
    if(!id){
      console.log("用户ID为空")
      return
    }
    this.updateService.start(false,{id,res,taskID});
  }

  @Post('upload/')
  @FormDataRequest()
  uploadApp(@Body("file") file:Buffer,@Body("version")version:string) {
    
    if(!file){
      console.log("上传文件为空")
      return
    }

    if(!version){
      console.log("上传版本为空")
      return
    }


    const buffer = Buffer.from(file.buffer);

    this.updateService.upload(buffer,version);
    
  }

}
