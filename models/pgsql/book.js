
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL

const sql = postgres(connectionString)

export class BookModel {

  static async getAll() {
    const books = await sql`
      SELECT * FROM books
    `

    return books
  }

  static async getById({ id }) {
    try {
      const [book] = await sql`
        SELECT * FROM books
        WHERE id = ${id}
        `

      return book
    } catch (e) {
      throw new Error("Error searching the book")
    }
  }

  static async create({ input }) {
    const {
      title,
      author,
      year,
      state
    } = input

    const [uuidResult] = await sql`SELECT gen_random_uuid() uuid`
    const { uuid } = uuidResult

    try {
      await sql`
        INSERT INTO books(id, title, author, year, state)
        VALUES (${uuid}, ${title}, ${author}, ${year}, ${state})
      `
    } catch (e) {
      throw new Error("Error creating book")
    }

    const [book] = await sql`
      SELECT * FROM books WHERE id = ${uuid}
    `

    return book
  }

  static async update({ id, input }) {
    try {
      const keys = Object.keys(input)
      if (keys.length === 0) throw new Error("EMPTY_UPDATE")

      const assigments = keys.map((key, index) => `${key} = $${index + 1}`).join(', ')  
      const values = Object.values(input)

      const query = `UPDATE books 
        SET ${assigments} 
        WHERE id = $${keys.length + 1} 
        RETURNING *
      `
      
      const updatedBook = await sql.unsafe(query, [...values, id])
      return updatedBook
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
      await sql`
        DELETE FROM books
        WHERE id = ${id}
      `
      return true
    } catch (e) {
      return false
    }
  }
}