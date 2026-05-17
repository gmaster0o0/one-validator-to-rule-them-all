import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  LoginCredentialsSchema,
  BaseUserDto,
  LoginCredentialsDto,
} from '@one-validator-to-rule-them-all/shared/schema';
import { ZodBody } from '../app/core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(
    @ZodBody(LoginCredentialsSchema) loginDto: LoginCredentialsDto,
  ): BaseUserDto {
    return this.appService.login(loginDto);
  }
}
