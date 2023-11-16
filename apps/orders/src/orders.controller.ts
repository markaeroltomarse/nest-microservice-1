import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('get-order')
  async getOrder(@Ctx() ctx: RmqContext) {
    const message = ctx.getMessage();
    const data = JSON.parse(message.content.toString()).data;

    console.log(data);
    return this.ordersService.getOrder();
  }
}
