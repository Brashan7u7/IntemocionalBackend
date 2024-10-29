import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { Repository } from 'typeorm';
import { reviewDto } from './dto/reviewDto.dto';
import { User } from 'src/user/entity/user.entity';
import { Professional } from 'src/professional/entity/professional.entity';
import { Admin } from 'src/admin/entity/admin.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(CreateReviewDto: reviewDto): Promise<Review> {
    const userFind = await this.userRepository.findOne({
      where: { id_user: CreateReviewDto.id_user },
    });
    const professionalFind = await this.professionalRepository.findOne({
      where: { id_professional: CreateReviewDto.id_professional },
    });
    const adminFind = await this.adminRepository.findOne({
      where: { id_admin: CreateReviewDto.id_admin },
    });

    if (!userFind) {
      throw new NotFoundException(`User no encontrado`);
    }
    if (!professionalFind) {
      throw new NotFoundException('Professional no encontrado');
    }
    if (!adminFind) {
      throw new NotFoundException('Admin no encontrado');
    }

    const body = this.reviewRepository.create(CreateReviewDto);
    body.user = userFind;
    body.professional = professionalFind;
    body.admin = adminFind;
    return this.reviewRepository.save(body);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async delete(id: number):Promise<void>{
    const result = await this.reviewRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException('Review no encontrada');
    }
  }
}