import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { userDto } from './dto/userDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: userDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };
    return this.userRepository.save(newUser);
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
