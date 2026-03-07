import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SpecificQuerry } from './dto/specific-querry.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: 'User has been created',
      data: res,
    };
  }

  @Public()
  @Get()
  async findAll() {
    const res = await this.usersService.findAll();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: res,
    };
  }

  @Public()
  @Get()
  async findOne(@Query() querry: SpecificQuerry) {
    const res = await this.usersService.findOne(querry);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: res,
    };
  }

  @Public()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(+id, updateUserDto);
    return {
      success: true,
      message: 'Users has been updated',
      data: res,
    };
  }

  @Public()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      success: true,
      message: 'Users has been deleted',
    };
  }
}
