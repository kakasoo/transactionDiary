/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

// @UseInterceptors(MorganInterceptor('dev'))
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('intro')
  root() {}

  @Get('main')
  @Render('main')
  main() {}

  @Get('home')
  @Render('myPage')
  myPage() {}
}
