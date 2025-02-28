import { Express } from 'express';
import request from 'supertest';
import buildServer from '@/server';

describe('App routes', () => {
  let app: Express;

  beforeAll(() => {
    app = buildServer();
  });

  describe('Health rotues', () => {
    test('Should return 200 for is live', async () => {
      const response = await request(app).get('/v1/health/live');
      expect(response.statusCode).toBe(200);
    });
  });
});
