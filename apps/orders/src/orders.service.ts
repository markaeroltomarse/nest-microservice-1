import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  async getOrder() {
    return {
      id: 1,
      orderId: 'Codas38r3',
    };
  }
}
