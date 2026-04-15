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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SpecificQuerry } from './dto/specific-querry.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(201)
  @Post('createUser')
  @ApiOperation({ summary: 'Buat akun user baru' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User berhasil dibuat.',
    schema: {
      example: {
        success: true,
        message: 'User has been created',
        data: {
          id: 1,
          name: 'Budi',
          email: 'budi@mail.com',
          role: 'SOCIETY',
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Ambil semua user' })
  @ApiOkResponse({ description: 'Daftar user berhasil diambil.' })
  async findAll() {
    const res = await this.usersService.findAll();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: res,
    };
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Cari user spesifik berdasarkan query' })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiOkResponse({ description: 'Data user berhasil ditemukan.' })
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
  @ApiOperation({ summary: 'Perbarui data user berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User berhasil diperbarui.' })
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
  @ApiOperation({ summary: 'Hapus user berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID user' })
  @ApiNoContentResponse({ description: 'User berhasil dihapus.' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      success: true,
      message: 'Users has been deleted',
    };
  }
}
