import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  validLoginCredentials,
  validUserResponse,
} from '@one-validator-to-rule-them-all/testing';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('login', () => {
    it('should return user data for valid credentials', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.login(validLoginCredentials)).toEqual(
        validUserResponse,
      );
    });
  });
});
