import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  public create(@Body() dto: any) {
    return this.userService.create(dto);
  }

  @Get()
  public findAll() {
    return this.userService.findAll();
  }
}
