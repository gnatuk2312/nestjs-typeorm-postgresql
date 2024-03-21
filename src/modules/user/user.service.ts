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
import { User } from './entities/user.entity';
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

    const user = new User();

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.phoneNumber = dto.phoneNumber;
    user.password = dto.password;

    return await this.userRepository.create(user);
  }

  public async findAll(): Promise<UserInterface[]> {
    return await this.userRepository.findAll();
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
