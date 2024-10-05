import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';  // really it names "config" but config have used in other places so we use "dotenvConfig" for indepedent 
import { DataSource, DataSourceOptions } from "typeorm";

console.log('before',`${process.env.DB_HOST}`)

// load config
dotenvConfig();

console.log('after',`${process.env.DB_HOST}`)

export const dbConfig = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  ssl: `${process.env.DB_SSL}` === 'true',
  autoLoadEntities: `${process.env.DB_AUTO_LOAD_ENTITIES}` === 'true',
  synchronize: `${process.env.DB_SYNCHRONIZE}` === 'true',
  entities: ["dist/**/*.entity.js"], // for check to generate db form entity config
  migrations: ["dist/migrations/*.js"], // for check to generate db form migration config
}

export default registerAs('typeorm', () => (dbConfig))

export const dataSource = new DataSource(dbConfig as DataSourceOptions);