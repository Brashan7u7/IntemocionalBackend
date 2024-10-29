import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminDto } from './dto/adminDto.dto';
import { Admin } from './entity/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() admindto: adminDto) {
    return this.adminService.create(admindto);
  }
  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.adminService.delete(id);
    return { message: `Admin with id ${id} deleted successfully` };
  }
}
