import { Controller, Get, Res, Post, Body, Query, UploadedFile, Injectable, Inject } from '@nestjs/common';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data/dist/decorators';
import { v4 as uuid } from 'uuid';
import { DataSource } from "typeorm";
import { UpdateService } from './service/updata.service';

@Controller()
export class UpdateController {
    private updateService: UpdateService;

    // 回调函数
    public static CreateUpdateService: () => UpdateService;
    constructor() {
        if(UpdateController.CreateUpdateService == null){
            throw new Error("请设置CreateUpdateService");
        }
        this.updateService = UpdateController.CreateUpdateService();
    }



    @Get('checkUpdate')         
    async updateApp(@Query("version") version: string, @Query("userID") id:number): Promise<boolean> {
        if (!version) {
            console.log("版本号为空")
            return
        }

        let isNew =  await this.updateService.CheckUpdate(version,id);
        return isNew
    }

    @Get('download/:apkName')
    // 下载文件接口
    downloadApp(@Query("userID") id: string, @Res() res: Response) {
        res.download
        let taskID = uuid();
        if (!id) {
            console.log("用户ID为空")
            return
        }

        
        this.updateService.start(false, { id, res, taskID });
    }

    @Post('upload/')
    @FormDataRequest()
    uploadApp(@Body("file") file: Buffer, @Body("version") version: string,@Body("userID") id: string) {
        if (!file) {
            console.log("上传文件为空")
            return
        }

        if (!version) {
            console.log("上传版本为空")
            return
        }


        const buffer = Buffer.from(file.buffer);

        this.updateService.upload(buffer, version, { id, taskID: uuid() });

    }

}
