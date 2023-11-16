import * as dotenv from 'dotenv';
dotenv.config();

export const RABBITMQ_DEFAULT_USER = process.env.RABBITMQ_DEFAULT_USER || '';
export const RABBITMQ_DEFAULT_PASS = process.env.RABBITMQ_DEFAULT_PASS || '';
export const RABBITMQ_USER = process.env.RABBITMQ_USER || '';
export const RABBITMQ_PASS = process.env.RABBITMQ_PASS || '';
export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || '';

// QUEUE LIST
export const RABBITMQ_AUTH_QUEUE = process.env.RABBITMQ_AUTH_QUEUE || '';
export const RABBITMQ_ORDERS_QUEUE = process.env.RABBITMQ_ORDERS_QUEUE || '';
