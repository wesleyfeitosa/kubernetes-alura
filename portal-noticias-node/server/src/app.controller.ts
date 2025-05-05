import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('news')
  createtNews(@Body() params: Prisma.NewsCreateInput) {
    return this.appService.createNews(params);
  }

  @Get('news')
  listNews(@Query() params: { skip?: number; take?: number }) {
    return this.appService.listNews(params);
  }
}
