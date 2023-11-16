import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_AUTH_QUEUE,
  RABBITMQ_HOST,
  RABBITMQ_PASS,
  RABBITMQ_USER,
} from 'libs/shared/common/environment';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`],
      noAck: false,
      queue: RABBITMQ_AUTH_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4001);
  console.log(`User service running on port ${4001}`);
}
bootstrap();
