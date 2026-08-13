"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]).default("development"),
    PORT: zod_1.z.string().default("4000"),
    DATABASE_URL: zod_1.z.string().url().optional(),
    REDIS_URL: zod_1.z.string().url().optional()
});
exports.env = exports.envSchema.parse(process.env);
