import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import redis from 'redis';
import { RedisClientType } from 'redis'
import dotenv from 'dotenv';

dotenv.config();

const redisClient: any = redis.createClient({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
} as redis.RedisClientOptions);

redisClient.connect();
redisClient.on('connect', () => {
    console.log('Redis client connected');
});

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post('/setPlayer', async (req: Request, res: Response) => {
    const { name } = req.body;
    const data = await redisClient.get(name);
    if (!data) {
        redisClient.set(name, 0);
    }
    return res.json({ message: "Player Name Added Successfully" });
})

app.post('/updateScore', (req: Request, res: Response) => {
    const { name } = req.body;
    redisClient.incr(name);
    return res.json({ message: 'Player Score Updated Successfully' });
});

app.get('/leaderboard', async (req: Request, res: Response) => {
    const data = await redisClient.keys('*');
    let result: Record<string, string>[] = [];
    for (let i = 0; i < data.length; ++i) {
        const value = await redisClient.get(data[i])
        let temp: Record<string, string> = {};
        temp[data[i]] = value ?? '';
        result.push(temp);
    }
    return res.json({ result });
});

export default app;
