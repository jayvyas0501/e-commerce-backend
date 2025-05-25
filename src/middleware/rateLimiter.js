import rateLimiter from "express-rate-limit"

// Global rate limiter (e.g., 100 reqs per 15 mins per IP)
export const globalLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders:true,
    legacyHeaders:false
})

// Specific limiter for login (e.g., 5 attempts per 10 mins)
export const loginLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Try again later."
})