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
    it('should return user data for valid credentials', async () => {
      await expect(service.login(validLoginCredentials)).resolves.toEqual(
        validUserResponse,
      );
    });

    it('should throw unauthorized for invalid credentials', async () => {
      await expect(service.login(invalidLoginCredentials)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });
});
