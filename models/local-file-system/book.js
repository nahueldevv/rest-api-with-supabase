
import { readJSON } from "../../utils.js"
import { randomUUID } from "node:crypto"

const books = readJSON("./books.json")

export class BookModel {
  static getAll() {
    return books
  }

  static getById({ id }) {
    const book = books.find(book => book.id === id)
    if (!book) throw new Error("Book not found")
    return book
  }

  static create ({ input }) {
    const newBook = {
      id: randomUUID(),
      ...input
    }

    books.push(newBook)
    return newBook
  }

  static delete({ id }) {
    const bookIndex = books.findIndex(book => book.id === id)

    if (bookIndex === -1) return false

    books.splice(bookIndex, 1)
    return true
  }

  static update({ id, input }) {
    const bookIndex = books.findIndex(book => book.id === id)

    if (bookIndex === -1) throw new Error("Book not found")

    books[bookIndex] = {
      ...books[bookIndex],
      ...input
    }

    return books[bookIndex]
  }
}