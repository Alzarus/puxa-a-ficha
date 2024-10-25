import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { HealthModule } from './data/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log('DB Configuration:', {
        //   host: configService.get<string>('DB_HOST'),
        //   port: configService.get<number>('DB_PORT'),
        //   username: configService.get<string>('DB_USERNAME'),
        //   password: configService.get<string>('DB_PASSWORD'),
        //   database: configService.get<string>('DB_DATABASE'),
        // });

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    DataModule,
  ],
})
export class AppModule {}
