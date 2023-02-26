import { Controller, Get, Res, Post, Body, Query, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data/dist/decorators';
import { AppService } from './app.service';
import { v4 as uuid } from 'uuid';
import { DataSource } from "typeorm";
import { UpdateService } from './u-updata/service/updata.service';

@Controller()
export class AppController {
  private updateService: UpdateService;

  constructor(
    private readonly appService: AppService,
  ) {

  }
}
