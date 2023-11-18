
import winston from 

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});