import { Column, Model, Table } from 'sequelize-typescript';

import { UserInterface } from './interface/user.interface';

@Table({ tableName: 'users' })
export class User extends Model<UserInterface> implements UserInterface {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  password: string;
}
