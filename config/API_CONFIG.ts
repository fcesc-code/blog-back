import API_URL from './API_SECRET_KEYS';

interface apiConfig {
  type:
    | 'mysql'
    | 'mariadb'
    | 'postgres'
    | 'sqlite'
    | 'mssql'
    | 'sap'
    | 'oracle'
    | 'cordova'
    | 'nativescript'
    | 'sqljs'
    | 'react-native'
    | 'mongodb'
    | 'expo'
    | 'capacitor'
    | 'aurora-data-api'
    | 'aurora-data-api-pg'
    | 'better-sqlite3';
  url: string;
  name: string;
  entities?: string[];
  migrations?: string[];
  logging: boolean;
  synchronize?: boolean;
  migrationsRun?: boolean;
  cli?: Object;
}

const API_CONFIG: apiConfig = {
  type: 'postgres',
  url: API_URL,
  name: 'default',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
};

export { API_CONFIG };
