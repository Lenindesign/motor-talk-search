import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100),
  name: z.string().trim().min(1, { message: "Name is required" }).max(100).optional(),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
});

export const commentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, { message: "Comment cannot be empty" })
    .max(1000, { message: "Comment must be less than 1000 characters" }),
});

export const testDriveSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number" }).max(20),
  preferredDate: z.string().min(1, { message: "Date is required" }),
  preferredTime: z.string().min(1, { message: "Time is required" }),
  message: z.string().max(500).optional(),
});