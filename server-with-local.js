
import { createApp } from "./app.js";

import { BookModel } from './models/local-file-system/book.js'

createApp({ bookModel: BookModel })