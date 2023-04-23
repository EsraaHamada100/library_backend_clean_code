const database = require("../database/connection.js");

const booksRouterFactory = require('../routes/books.js');

//!import classes for books
const BookValidator = require('../validators/book_validator.js');
const BookService = require('../services/book_service.js');
const BookController = require('../controllers/book_controller.js');

//! dependency injection for books
const bookService = createBookService(database);
const bookValidator = createBookValidator();
const bookController = createBookController(bookService, bookValidator);
const booksRouter = booksRouterFactory(bookController);


//! create the books classes
function createBookValidator(){
    return new BookValidator();
}
function createBookService(database) {
    return new BookService(database);
}

function createBookController(bookService, bookValidator) {
    return new BookController(bookService, bookValidator);
}

module.exports = booksRouter;