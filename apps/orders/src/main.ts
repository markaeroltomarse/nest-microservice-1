import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_AUTH_QUEUE,
  RABBITMQ_HOST,
  RABBITMQ_ORDERS_QUEUE,
  RABBITMQ_PASS,
  RABBITMQ_USER,
} from 'libs/shared/common/environment';

async function bootstrap() {
  const PORT = process.env.PORT || 4002;
  const app = await NestFactory.create(OrdersModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`],
      noAck: false,
      queue: RABBITMQ_ORDERS_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
  console.log(`User service running on port ${PORT}`);
}
bootstrap();
