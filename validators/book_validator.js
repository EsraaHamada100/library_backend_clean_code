class BookValidator {
    validateCreateBook(data) {
      const errors = [];
  
      if (!data.book_name || data.book_name.trim() === '') {
        errors.push('Book name is required');
      }
  
      if (!data.description || data.description.trim() === '') {
        errors.push('Description is required');
      }
  
      if (!data.author || data.author.trim() === '') {
        errors.push('Author is required');
      }
  
      if (!data.field || data.field.trim() === '') {
        errors.push('Field is required');
      }
  
      if (!data.publication_date || data.publication_date.trim() === '') {
        errors.push('Publication date is required');
      }
  
      if (!data.cover_link || data.cover_link.trim() === '') {
        errors.push('Cover link is required');
      }
  
      if (!data.pdf_file || data.pdf_file.trim() === '') {
        errors.push('PDF file is required');
      }
  
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
    }
  
    validateUpdateBook(id, data) {
      const errors = [];
  
      if (Object.entries(data).length === 0 && data.constructor === Object) {
        errors.push('No data provided');
      }
  
      if (data.book_name && data.book_name.trim() === '') {
        errors.push('Book name cannot be empty');
      }
  
      if (data.description && data.description.trim() === '') {
        errors.push('Description cannot be empty');
      }
  
      if (data.author && data.author.trim() === '') {
        errors.push('Author cannot be empty');
      }
  
      if (data.field && data.field.trim() === '') {
        errors.push('Field cannot be empty');
      }
  
      if (data.publication_date && data.publication_date.trim() === '') {
        errors.push('Publication date cannot be empty');
      }
  
      if (data.cover_link && data.cover_link.trim() === '') {
        errors.push('Cover link cannot be empty');
      }
  
      if (data.pdf_file && data.pdf_file.trim() === '') {
        errors.push('PDF file cannot be empty');
      }
  
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
    }
  }
  
  module.exports = BookValidator;