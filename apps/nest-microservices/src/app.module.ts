import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import {
  RABBITMQ_AUTH_QUEUE,
  RABBITMQ_HOST,
  RABBITMQ_ORDERS_QUEUE,
  RABBITMQ_PASS,
  RABBITMQ_USER,
} from 'libs/shared/common/environment';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`],
            noAck: true,
            queue: RABBITMQ_AUTH_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
    {
      provide: 'ORDERS_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`],
            noAck: true,
            queue: RABBITMQ_ORDERS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class AppModule {}
