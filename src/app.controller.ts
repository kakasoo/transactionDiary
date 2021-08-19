import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('intro')
  root() {
    // return { message: 'hi' };
  }

  @Get('main')
  @Render('main')
  main() {
    // return {message : 'hi' };
  }

  @Get('home')
  @Render('myPage')
  myPage() {
    // return {message : 'hi' };
  }
}
