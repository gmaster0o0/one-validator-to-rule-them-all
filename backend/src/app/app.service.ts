import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  BaseUserDto,
  LoginCredentialsDto,
} from '@one-validator-to-rule-them-all/shared/schema';

// Basic delay function to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class AppService {
  async login(loginBody: LoginCredentialsDto): Promise<BaseUserDto> {
    await delay(500);

    const testUser = {
      id: 'user_123',
      password: 'test123',
      email: 'admin@example.com',
    };
    if (
      loginBody.email !== testUser.email ||
      loginBody.password !== testUser.password
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: testUser.id, email: testUser.email };
  }
}
