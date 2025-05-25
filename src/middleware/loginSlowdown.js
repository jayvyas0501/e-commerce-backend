import slowDown from "express-slow-down";
import RedisStore from "rate-limit-redis"
import Redis from "ioredis";


const redisClient = new Redis({
    host:"localhost",
    port:6379
})

//slow down middleware for brute-force login attempts
export const loginSlowDown = slowDown({
    windowMs:15*60*1000,
    delayAfter:3,
    delayMs: ()=>500,
    store:new RedisStore({
        sendCommand:(...args) => redisClient.call(...args)
    })
})