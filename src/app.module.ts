import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigSchemaValidation } from './config.schema';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { HostRequestsModule } from './host_requests/host_requests.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      validationSchema: ConfigSchemaValidation
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: false,
        
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts, .js}'],
      }),
    }),
    MulterModule.register(multerOptions),
    UsersModule,
    AuthModule,
    HostRequestsModule,
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private dataSource: DataSource) {}
}
