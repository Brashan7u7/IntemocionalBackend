import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import { adminDto } from './dto/adminDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: adminDto): Promise<Admin> {
    const hashedPassword = bcrypt.hashSync(createAdminDto.password, 10);
    const newAdmin = { ...createAdminDto, password: hashedPassword };
    return this.adminRepository.save(newAdmin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOneEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }

    return admin;
  }

  async delete(id: number): Promise<void> {
    const result = await this.adminRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
  }
}
