// src/schemas/login-schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  nik: z
    .string()
    .min(16, "NIK must be at least 16 characters")
    .max(16, "NIK must be 16 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
