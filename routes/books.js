const { Router } = require('express');

function createBookRouter(bookController) {
  const router = Router();

  router.get('/authors', bookController.getAuthors.bind(bookController));
  router.get('/fields', bookController.getFields.bind(bookController));
  router.get('/', bookController.searchBooks.bind(bookController));
  router.get('/:id', bookController.getBookById.bind(bookController));
  router.post('/', bookController.createBook.bind(bookController));
  router.put('/:id', bookController.updateBook.bind(bookController));
  router.delete('/:id', bookController.deleteBook.bind(bookController));

  return router;
}

module.exports = createBookRouter;