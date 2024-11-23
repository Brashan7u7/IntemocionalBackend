import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './dto/reviewDto.dto';
import { Review } from './entity/review.entity';
import { Roles } from 'src/auth/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Roles('professional')
  @Post()
  create(@Body() reviewDto: reviewDto) {
    return this.reviewService.create(reviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.reviewService.delete(id);
    return { message: `Review with id ${id} deleted successfully` };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: reviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }
}
