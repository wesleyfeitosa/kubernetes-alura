import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, News } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async listNews(params: { skip?: number; take?: number }): Promise<News[]> {
    const { skip, take } = params;

    return this.prisma.news.findMany({
      skip,
      take,
    });
  }

  async createNews(data: Prisma.NewsCreateInput): Promise<News> {
    return this.prisma.news.create({
      data,
    });
  }
}
