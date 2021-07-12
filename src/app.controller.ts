import { Controller, Get, Render } from '@nestjs/common';
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
}
