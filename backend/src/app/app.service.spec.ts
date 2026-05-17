import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import {
  invalidLoginCredentials,
  validLoginCredentials,
  validUserResponse,
} from '@one-validator-to-rule-them-all/testing';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('login', () => {
    it('should return user data for valid credentials', () => {
      expect(service.login(validLoginCredentials)).toEqual(validUserResponse);
    });

    it('should throw unauthorized for invalid credentials', () => {
      expect(() => service.login(invalidLoginCredentials)).toThrow(
        'Invalid credentials',
      );
    });
  });
});
