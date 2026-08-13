"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampSchema = exports.idSchema = void 0;
const zod_1 = require("zod");
exports.idSchema = zod_1.z.string().uuid();
exports.timestampSchema = zod_1.z.date();
