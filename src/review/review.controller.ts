import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './dto/reviewDto.dto';
import { Review } from './entity/review.entity';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() reviewdto: reviewDto) {
    return this.reviewService.create(reviewdto);
  }
  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.reviewService.delete(id);
    return { message: `Review with id ${id} delete successfully` };
  }
}
