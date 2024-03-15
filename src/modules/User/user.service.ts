import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  public create(dto: any) {
    const { fistName, lastName, isActive } = dto;

    return this.userRepository.create({ fistName, lastName, isActive });
  }

  public findAll() {
    return this.userRepository.findAll();
  }
}
