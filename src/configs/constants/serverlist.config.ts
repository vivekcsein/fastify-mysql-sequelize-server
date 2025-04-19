import { envConfig } from "./env.config";

export const whitelistedServer = [
  "https://www.google.com",
  "http:localhost:5500",
  "http:127.0.0.1:5000",
  "http://localhost:7164/",
  "http://127.0.0.1:7164/",
];

export const blacklistedIPs = [];

export const allowedOrigins = [`http://localhost:${envConfig.SERVER_PORT}`, `http://upstash.io`, 'https://yourdomain.com'];