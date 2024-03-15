import { UserInterface } from './user.interface';
import { CreateUserDTO } from '../dto/create-user.dto';

export interface UserRepositoryInterface {
  create(dto: CreateUserDTO): Promise<UserInterface>;
  findAll(): Promise<UserInterface[]>;
  findById(id: string): Promise<UserInterface>;
  findByEmail(email: string): Promise<UserInterface>;
}
