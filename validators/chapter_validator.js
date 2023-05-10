 const ValidationError = require('../core/error/validation_error');
class ChapterValidator {
  validateCreateChapter(data) {
    const { book_id, chapter_title, description } = data;

    if (!book_id || !chapter_title || !description) {
      throw new ValidationError('Book ID, chapter title, and description are required');
    }

    if (typeof chapter_title !== 'string' || typeof description !== 'string') {
      throw new ValidationError('Chapter title and description must be strings');
    }

    if (isNaN(Number(book_id))) {
      throw new ValidationError('Book ID must be a number');
    }
  }

  validateUpdateChapter(id, data) {
    const { chapter_title, description } = data;

    if (chapter_title && typeof chapter_title !== 'string') {
      throw new ValidationError('Chapter title must be a string');
    }

    if (description && typeof description !== 'string') {
      throw new ValidationError('Description must be a string');
    }

    if (id && isNaN(Number(id))) {
      throw new ValidationError('Chapter ID must be a number');
    }
  }
}

module.exports = ChapterValidator;