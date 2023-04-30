class BookService {
    constructor(database) {
        this.database = database;
    }

    getDistinctAuthors() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT DISTINCT author FROM books';

            this.database.query(query, (err, result, fields) => {
                if (err) {
                    reject(err);
                    return
                }

                const authors = result.map((authorMap) => authorMap.author);
                resolve(authors);
            });
        });
    }

    getDistinctFields() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT DISTINCT field FROM books';

            this.database.query(query, (err, result, _) => {
                if (err) {
                    reject(err);
                    return;
                }

                const fields = result.map((fieldMap) => fieldMap.field);
                resolve(fields);
            });
        });
    }

    searchBooks(author, field, bookName) {
        return new Promise((resolve, reject) => {
            let conditions = [];

            if (author && author.trim() !== '') {
                conditions.push(`author='${author}'`);
            }
            if (field && field.trim() !== '') {
                conditions.push(`field='${field}'`);
            }
            if (bookName && bookName.trim() !== '') {
                conditions.push(`book_name LIKE '%${bookName}%'`);
            }

            let whereClause = '';

            if (conditions.length > 0) {
                whereClause = `WHERE ${conditions.join(' AND ')}`;
            }

            const query = `SELECT books.*, CONCAT('[', GROUP_CONCAT(
            CONCAT('{ "title": "', REPLACE(chapters.chapter_title, '"', '\\"'), '", "description": "', REPLACE(chapters.description, '"', '\\"'), '" }')
          ), ']') AS chapters FROM books LEFT JOIN chapters ON books.book_id = chapters.book_id ${whereClause} GROUP BY books.book_id`;

            this.database.query(query, (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const books = result.map((book) => ({
                    ...book,
                    chapters: JSON.parse(book.chapters),
                }));

                resolve(books);
            });
        });
    }

    getBookById(id) {

        return new Promise((resolve, reject) => {
            const query = `select books.*,  CONCAT('[', GROUP_CONCAT(
        CONCAT('{ "title": "', REPLACE(chapters.chapter_title, '"', '\\"'), 
               '", "description": "', REPLACE(chapters.description, '"', '\\"'), '" }')), ']'
    ) AS chapters
    FROM books
    LEFT JOIN chapters ON books.book_id = chapters.book_id  WHERE books.book_id=?`;

            this.database.query(query, id, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (result[0] && result[0].book_id != null) {
                    const book = {
                        ...result[0],
                        chapters: JSON.parse(result[0].chapters),
                    };

                    resolve(book);
                } else {
                    resolve(null);
                }
            });
        });
    }

    createBook(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO books SET ?';

            this.database.query(
                query,
                {
                    book_name: data.book_name,
                    description: data.description,
                    author: data.author,
                    field: data.field,
                    publication_date: data.publication_date,
                    cover_link: data.cover_link,
                    pdf_file: data.pdf_file,
                },
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                }
            );
        });
    }

    updateBook(id, data) {
        return new Promise((resolve, reject) => {
            
            let columns = [];
            for (const [key, value] of Object.entries(data)) {
              // replace single quote with \\' and double quotes with \\"
              const escapedValue = value.replace(/'/g, "\\'").replace(/"/g, '\\"');
              const string = `${key} = '${escapedValue}'`;
              columns.push(string);
            }
            console.log(columns);
            const query = `UPDATE books SET ${columns.join(', ')} WHERE book_id = ${id}`;

            this.database.query(query,  (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    deleteBook(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM books WHERE ?';

            this.database.query(query, { book_id: id }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }
}

module.exports = BookService;