import { CreateUserDTO } from '../dto/create-user.dto';
import { UserInterface } from './user.interface';

export interface UserServiceInterface {
  create(dto: CreateUserDTO): Promise<UserInterface>;
  findAll(): Promise<UserInterface[]>;
  findById(id: string): Promise<UserInterface>;
  findByEmail(email: string): Promise<UserInterface>;
}
