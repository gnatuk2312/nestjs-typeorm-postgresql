import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.entity';
import { USER_MAPPER, USER_REPOSITORY, USER_SERVICE } from './user.constants';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_MAPPER,
      useClass: UserMapper,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
