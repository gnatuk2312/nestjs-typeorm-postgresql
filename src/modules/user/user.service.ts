import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserServiceInterface } from './interface/user-service.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserInterface } from './interface/user.interface';
import { USER_REPOSITORY } from './user.constants';
import { UserRepositoryInterface } from './interface/user-repository.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  private readonly hashSalt = 5;

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async create(dto: CreateUserDTO): Promise<UserInterface> {
    const isAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (isAlreadyExists) {
      throw new BadRequestException('This email is already used');
    }

    dto.password = await hash(dto.password, this.hashSalt);

    const user = await this.userRepository.create(dto);

    console.log('UserService >> create() >> user >>', JSON.stringify(user));
    return user;
  }

  public async findAll(): Promise<UserInterface[]> {
    const users = await this.userRepository.findAll();

    console.log('UserService >> findAll() >> users >>', JSON.stringify(users));
    return users;
  }

  public async findById(id: string): Promise<UserInterface> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  public async findByEmail(email: string): Promise<UserInterface> {
    return await this.userRepository.findByEmail(email);
  }
}
