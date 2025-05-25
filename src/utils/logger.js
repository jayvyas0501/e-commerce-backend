import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// For __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), customFormat),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"), 
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
  ],
});

export default logger;
