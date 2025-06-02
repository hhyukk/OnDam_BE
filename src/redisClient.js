// redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('✅ Redis 연결 성공');
  } catch (err) {
    console.error('❌ Redis 연결 실패:', err);
  }
};

// 모듈 초기화 시 연결
connectRedis();

export default redisClient;
