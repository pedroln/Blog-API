import { DataSource, DataSourceOptions, } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from "dotenv";
dotenv.config({});

export const typeOrmConfig: TypeOrmModuleOptions & DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
