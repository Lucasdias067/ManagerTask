import { z } from 'zod'

const envSchema = z.object({
  BASE_URL: z.string(),
  MODE: z.enum(['development', 'production']),
})

export const env = envSchema.parse(import.meta.env)
