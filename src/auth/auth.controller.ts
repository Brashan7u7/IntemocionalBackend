import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Roles } from './role.decorator'; 
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('loginadmin')
  signInAdmin(@Body() signInDto: SignInDto) {
    return this.authService.signInAdmin(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('loginuser')
  signInUser(@Body() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto.email, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('loginprofessional')
  signInProfessional(@Body() signInDto: SignInDto) {
    return this.authService.signInProfessional(
      signInDto.email,
      signInDto.password,
    );
  }

}
