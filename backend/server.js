"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = __importDefault(require("redis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = redis_1.createClient({
    host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
});
redisClient.connect();
redisClient.on('connect', () => {
    console.log('Redis client connected');
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/setPlayer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const data = yield redisClient.get(name);
    if (!data) {
        redisClient.set(name, 0);
    }
    return res.json({ message: "Player Name Added Successfully" });
}));
app.post('/updateScore', (req, res) => {
    const { name } = req.body;
    redisClient.incr(name);
    return res.json({ message: 'Player Score Updated Successfully' });
});
app.get('/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield redisClient.keys('*');
    let result = [];
    for (let i = 0; i < data.length; ++i) {
        const value = yield redisClient.get(data[i]);
        let temp = {};
        temp[data[i]] = value !== null && value !== void 0 ? value : '';
        result.push(temp);
    }
    return res.json({ result });
}));
exports.default = app;
