import { InjectModel } from '@nestjs/sequelize';

import { UserRepositoryInterface } from './interface/user-repository.interface';
import { User } from './user.entity';
import { UserInterface } from './interface/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  public async create(dto: CreateUserDTO): Promise<UserInterface> {
    const { firstName, lastName, email, phoneNumber } = dto;

    return await this.userRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  }

  public async findAll(): Promise<UserInterface[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: string): Promise<UserInterface> {
    return await this.userRepository.findByPk(id);
  }
}
