import { Injectable } from '@nestjs/common';
import {
  BaseUserDto,
  LoginCredentialsDto,
} from '@one-validator-to-rule-them-all/shared/schema';

@Injectable()
export class AppService {
  login(loginBody: LoginCredentialsDto): BaseUserDto {
    const testUser = {
      id: 'user_123',
      password: 'test123',
      email: 'admin@example.com',
    };
    if (
      loginBody.email !== testUser.email ||
      loginBody.password !== testUser.password
    ) {
      throw new Error('Invalid credentials');
    }

    return { id: testUser.id, email: testUser.email };
  }
}
