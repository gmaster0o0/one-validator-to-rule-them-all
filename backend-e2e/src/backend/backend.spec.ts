import axios from 'axios';
import {
  validLoginCredentials,
  validUserResponse,
} from '@one-validator-to-rule-them-all/testing';

describe('POST /api/login', () => {
  it('should return user data for valid credentials', async () => {
    const res = await axios.post('/api/login', validLoginCredentials);

    expect(res.status).toBe(201);
    expect(res.data).toEqual(validUserResponse);
  });
});
