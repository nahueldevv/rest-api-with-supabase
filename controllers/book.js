
import { validateBook, validateBookPartial } from '../schemas/book.js'

export class BookController {
  constructor({ bookModel }) {
    this.bookModel = bookModel
  }

  getAll = async (req, res) => {
    const books = await this.bookModel.getAll()
    if (books.length === 0) res.status(400).json({ error: "Books not found"})
    res.json(books)
  }

  getById = async (req, res) => {
    const { id } = req.params

    try {
      const book = await this.bookModel.getById({ id })
      res.json(book) 
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  create = async (req, res) => {
    const result = validateBook(req.body)

    if (!result.success) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const newBook = await this.bookModel.create({ input: result.data })
      res.status(201).json(newBook)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  update = async (req, res) => {
    const result = validateBookPartial(req.body)

    if (!result.success) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    try {
      const bookUpdated = await this.bookModel.update({ id, input: result.data})
      res.json(bookUpdated)
    } catch (error) {
      res.status(400).json({ error: error.message})
    }
  }

  delete = async (req, res) => {
    const { id } = req.params

    try {
      const result = await this.bookModel.delete({ id })
  
      if (result === false) {
        res.status(400).json({ message: "Book not found"})
      }
  
      res.json({ message: "Book deleted" })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}