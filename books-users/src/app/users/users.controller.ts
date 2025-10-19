import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UsersDto } from './dtos';
import { Serialize } from '../../interceptors/serialize.interceptor';

@Controller('users')
@Serialize(UsersDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  findById(@Param('userId') userId: string) {
    return this.usersService.findById(userId);
  }
}
