import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
  ) {
    this.ordersService.connect();
  }

  async getUser() {
    console.log('test');
    const order = await firstValueFrom(
      this.ordersService.send('get-order', {
        userId: 1,
        message: 'hello from auth',
      }),
    );

    console.log('order', order);
    return {
      id: 1,
      email: 'authservice@gmail.com',
    };
  }
}
