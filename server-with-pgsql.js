
import { createApp } from "./app.js";

import { BookModel } from './models/pgsql/book.js'

createApp({ bookModel: BookModel })