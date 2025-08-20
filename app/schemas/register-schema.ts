
import { z } from "zod";

export const registerSchema = z.object({
  nik: z
    .string()
    .min(16, "NIK must be at least 16 characters")
    .max(16, "NIK must be 16 characters"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
