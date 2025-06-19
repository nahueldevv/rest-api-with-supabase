
import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'booksdb'
}
const connectionString = process.env.DATABASE_URL
  .startsWith("postgresql") 
  ? DEFAULT_CONFIG 
  : process.env.DATABASE_URL

const connection = await mysql.createConnection(connectionString)

export class BookModel {
  static async getAll() {
    const [books] = await connection.query(`
      SELECT BIN_TO_UUID(id) id, title, author, year, state FROM books
    `)

    return books
  }

  static async getById({ id }) {
    try {
      const [books] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, author, year, state
          FROM books WHERE id = UUID_TO_BIN(?)`
        , [id]  
      )

      if (books.length === 0) throw new Error("EMPTY_RESULT")

      return books[0]
    } catch (e) {
      if (e.message === "EMPTY_RESULT") throw new Error("Book Not Found")
      else throw new Error("Error searching book")
    }
  }

  static async create({ input }) {
    const {
      title,
      author,
      year,
      state
    } = input

    const [uuidResult] = await connection.query(`SELECT UUID() uuid`)
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`
          INSERT INTO books(id, title, author, year, state) 
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
        `, [uuid, title, author, year, state])
    } catch (e) {
      throw new Error("Error creating book")
    }

    const [newBook] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, author, year, state
        FROM books WHERE id = UUID_TO_BIN(?)`,
      [uuid]
    )
    return newBook[0]
  }

  static async update({ id, input }) {
    try {
      const keys = Object.keys(input)
      if (keys.length === 0) throw new Error("EMPTY_UPDATE")

      const assigments = keys.map((key, index) => `${key} = ?`).join(', ')  
      const values = Object.values(input)

      const query = `UPDATE books 
        SET ${assigments} 
        WHERE id = UUID_TO_BIN(?)
      `
      
      await connection.query(query, [...values, id])
      
      const [books] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, author, year, state
          FROM books WHERE id = UUID_TO_BIN(?)`
        , [id]
      )

      return books[0]
    } catch (e) {
      if (e.message === "EMPTY_UPDATE") {
        throw new Error("There are no fields to update")
      } else {
        throw new Error("Error updating book...")
      }
    }
  }

  static async delete({ id }) {
    try {
      const [result] = await connection.query(
        `DELETE FROM books WHERE id = UUID_TO_BIN(?)`
        , [id]  
      )

      if (result.affectedRows === 0) return false
      return true
    } catch (e) {
      throw new Error("Error removing book")
    }
  }
}