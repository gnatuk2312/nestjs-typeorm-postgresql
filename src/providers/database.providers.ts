import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ...configService.get('db'),
          autoLoadModels: true,
          synchronize: true, // TODO: config generating migrations instead of synchronize entities
        };
      },
    }),
  ],
})
export default class DatabaseProvider {}
