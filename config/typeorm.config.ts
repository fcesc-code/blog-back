import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import API_KEYS from './API_KEYS';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      // host: configService.get('DB_HOST'),
      // port: configService.get('DB_PORT'),
      // username: configService.get('DB_USERNAME'),
      // password: configService.get('DB_PASSWORD'),
      // database: configService.get('DB_NAME'),
      url: API_KEYS.url,
      name: API_KEYS.name,
      entities: API_KEYS.entities,
      synchronize: false,
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
