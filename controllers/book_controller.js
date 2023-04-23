
class BookController {
    
    constructor(bookService, validator) {
        this.bookService = bookService;
        this.validator = validator;
    }

    async getAuthors(req, res) {
        try {
            const authors = await this.bookService.getDistinctAuthors();
            res.send({ authors });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to get authors' });
        }
    }

    async getFields(req, res) {
        try {
            const fields = await this.bookService.getDistinctFields();
            res.send({ fields });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to get fields' });
        }
    }

    async searchBooks(req, res) {
        const author = req.query.author;
        const field = req.query.field;
        const bookName = req.query.book_name;

        try {
            const books = await this.bookService.searchBooks(author, field, bookName);
            res.send({ books });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to search books' });
        }
    }

    async getBookById(req, res) {
        const id = req.params.id;

        try {
            console.log('book service');
            console.log(this.bookService)

            const book = await this.bookService.getBookById(id);
            if(book){
                res.send(book);
            }else {
                res.status(404).send({ message: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to get book' });
        }
    }

    async createBook(req, res) {
        const data = req.body;

        try {
            this.validator.validateCreateBook(data);
            await this.bookService.createBook(data);
            res.send({ message: 'Book created successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    }

    async updateBook(req, res) {
        const id = req.params.id;
        const data = req.body;

        try {
            this.validator.validateUpdateBook(id, data);
            await this.bookService.updateBook(id, data);
            res.send({ message: 'Book updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    }

    async deleteBook(req, res) {
        const id = req.params.id;

        try {
            await this.bookService.deleteBook(id);
            res.send({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to delete book' });
        }
    }
}

module.exports = BookController;