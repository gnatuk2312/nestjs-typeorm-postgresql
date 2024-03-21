import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('db'),
          autoLoadEntities: true,
          synchronize: true, // TODO: config generating migrations instead of synchronize entities
        };
      },
    }),
  ],
})
export default class DatabaseProvider {}
