import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { userDto } from './dto/userDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: userDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
