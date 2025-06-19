
import z from 'zod'

const bookSchema = z.object({
  title: z.string({
    required_error: "title book is required..."
  }),
  author: z.string({
    required_error: "title book is required..."
  }),
  year: z.number().min(1900).max(2025),
  state: z.string({
    required_error: "state book is required"
  })
})

export const validateBook = (input) => {
  return bookSchema.safeParse(input)
}

export const validateBookPartial = (input) => {
  return bookSchema.partial().safeParse(input)
}