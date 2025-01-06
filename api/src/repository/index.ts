import { isProductionEnv } from '@api/utils';
import { resolve } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { logger } from '../libs';

const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: './database.sqlite',
  synchronize: true,
  logging: true,
  entities: [resolve(__dirname, `../model/*${isProductionEnv ? '.js' : '.ts'}`)],
  migrations: [],
  subscribers: [],
});

dataSource
  .initialize()
  .then(() => {
    logger.info('数据库初始化成功');
  })
  .catch((error) => {
    logger.error('数据库初始化失败');
    logger.error(error);
    process.exit(1);
  });

export { dataSource };
