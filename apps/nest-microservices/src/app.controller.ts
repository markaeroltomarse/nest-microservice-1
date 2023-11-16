import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
  ) {
    this.authService.connect();
    this.ordersService.connect();
  }

  @Get()
  async getUser() {
    return this.authService.send('get-user', {
      id: 1,
    });
  }

  @Get('/order')
  async getOrder() {
    return this.ordersService.send('get-order', {
      id: 1,
    });
  }
}
