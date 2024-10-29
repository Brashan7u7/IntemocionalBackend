import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import { adminDto } from './dto/adminDto.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: adminDto): Promise<Admin> {
    return this.adminRepository.save(createAdminDto);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async delete(id: number): Promise<void> {
    const result = await this.adminRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
  }
}
