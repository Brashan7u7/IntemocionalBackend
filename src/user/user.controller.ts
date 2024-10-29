import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { UserService } from './user.service';
import { userDto } from './dto/userDto.dto';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userdto: userDto) {
    return this.userService.create(userdto);
  }
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
    return { message: `User with id ${id} deleted successfully` };
  }
}
