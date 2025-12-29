import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/common/decorators/public.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
   // return this.appService.getHello();
    return {
      status: 'ok',
      service: 'Hire-Foody API',
      timestamp: new Date(),
    };
  }

  @Public()
  @Get('ping')
  ping() {
    return { ok: true, };
  }
}
