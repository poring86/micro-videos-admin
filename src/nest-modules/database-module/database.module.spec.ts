import { Test } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '../config-module/config.module';
import { Sequelize } from 'sequelize-typescript';
import { getConnectionToken } from '@nestjs/sequelize';

describe('Database Unit Tests', () => {
  describe('sqlite connection', () => {
    const connOptions = {
      DB_VENDOR: 'sqlite',
      DB_HOST: ':memory:',
      DB_LOGGING: false,
      DB_AUTO_LOAD_MODELS: true,
    };

    it('should be a sqlite connection', async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();
      const conn = app.get<Sequelize>(getConnectionToken());
      expect(conn).toBeDefined();
      expect(conn.options.dialect).toBe('sqlite');
      expect(conn.options.host).toBe(':memory:');
      await conn.close();
    });
  });

  describe('mysql connection', () => {
    const connOptions = {
      DB_VENDOR: 'mysql',
      DB_HOST: 'db',
      DB_DATABASE: 'micro_videos',
      DB_USERNAME: 'root',
      DB_PASSWORD: 'root',
      DB_PORT: 3306,
      DB_LOGGING: false,
      DB_AUTO_LOAD_MODELS: true,
    };

    it('should be a mysql connection', async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();
      const conn = app.get<Sequelize>(getConnectionToken());
      expect(conn).toBeDefined();
      expect(conn.options.dialect).toBe('mysql');
      expect(conn.options.host).toBe('db');
      await conn.close();
    });
  });
});
