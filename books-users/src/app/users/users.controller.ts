import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateEmailDto, UsersDto } from './dtos';
import { Serialize } from '../../interceptors';

@Controller('users')
@Serialize(UsersDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  findById(@Param('userId') userId: string) {
    return this.usersService.findById(userId);
  }

  @Put(':userId/update-email')
  updateEmail(
    @Param('userId') userId: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.usersService.updateEmail(userId, updateEmailDto);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}
