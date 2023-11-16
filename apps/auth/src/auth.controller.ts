import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get-user')
  async getUserMQ(@Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    const data = JSON.parse(message.content.toString()).data;
    channel.ack(message);

    return this.authService.getUser();
  }

  @Get('')
  async getUser() {
    return this.authService.getUser();
  }
}
