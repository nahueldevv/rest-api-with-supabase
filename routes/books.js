
import { Router } from "express";
import { BookController } from "../controllers/book.js";

export const createBookRouter = ({ bookModel }) => {
  const bookRouter = Router()

  const bookController = new BookController({ bookModel: bookModel})

  bookRouter.get('/', bookController.getAll)
  bookRouter.get('/:id', bookController.getById)
  bookRouter.post('/', bookController.create)
  bookRouter.patch('/:id', bookController.update)
  bookRouter.delete('/:id', bookController.delete)

  return bookRouter
}