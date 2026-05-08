import { z } from 'zod'

export const companySchema = z.object({
  name: z.string().trim().min(2, "Company name is required"),

  city: z.string().trim().min(2, "City is required"),

  address: z.string().trim().min(2, "Location is required"),

  description: z.string().trim().optional().or(z.literal("")),

  foundedOn: z.string().min(1, "Founded date is required"),

  logo: z.string().trim().optional().or(z.literal(""))
})
