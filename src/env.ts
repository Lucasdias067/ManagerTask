import { z } from 'zod'

const envSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_MODE: z.enum(['development', 'production']),
})

export const env = envSchema.parse(import.meta.env)
