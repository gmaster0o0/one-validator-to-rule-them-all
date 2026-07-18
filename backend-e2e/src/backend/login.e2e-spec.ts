import axios, { AxiosError } from 'axios';
import {
  invalidLoginCredentials,
  invalidLoginCredentialsMissingEmail,
  validLoginCredentials,
  validUserResponse,
} from '@one-validator-to-rule-them-all/testing';

describe('POST /api/login', () => {
  it('should login successfully with valid credentials', async () => {
    const res = await axios.post('/api/login', validLoginCredentials);

    expect(res.status).toBe(201);
    expect(res.data).toEqual(validUserResponse);
  });

  it('should return 400 for invalid request body', async () => {
    try {
      await axios.post('/api/login', invalidLoginCredentialsMissingEmail);
      throw new Error('Expected request to fail with 400');
    } catch (error) {
      const { response } = error as AxiosError;
      expect(response?.status).toBe(400);
      expect(response?.data).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
    }
  });

  it('should return 401 for wrong credentials', async () => {
    try {
      await axios.post('/api/login', invalidLoginCredentials);
      throw new Error('Expected request to fail with 401');
    } catch (error) {
      const { response } = error as AxiosError;
      expect(response?.status).toBe(401);
      expect(response?.data).toMatchObject({
        statusCode: 401,
        error: 'Unauthorized',
      });
    }
  });
});
