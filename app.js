
import express from 'express'
import { createBookRouter } from './routes/books.js'
import 'dotenv/config'

export const createApp = ({ bookModel }) => {
  const app = express()

  app.get('/', (req, res) => {
    res.end("hello word!")
  })

  app.use(express.json())

  app.use('/book', createBookRouter({ bookModel }))


  const PORT = process.env.PORT ?? 4000

  app.listen(PORT, () => {
    console.log(`server listening in http://localhost:${PORT}`);
  })
}