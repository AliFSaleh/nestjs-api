// import * as dotenv from 'dotenv';
require('dotenv').config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: +process.env.POSTGRES_PORT as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: false,
  
  entities: ['dist/**/entity/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
});