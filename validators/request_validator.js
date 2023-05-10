const ValidationError = require('../core/error/validation_error');

class RequestValidator {
    validateCreateRequest(data) {
      if (!data.user_id || !data.book_id) {
        throw new ValidationError('User ID and book ID are required');
      }
      // additional validation rules here
    }
  
    validateUpdateRequest(id, data) {
      if (!id) {
        throw new ValidationError('Request ID is required');
      }
      if (!data.user_id && !data.book_id && !data.approval_state) {
        throw new ValidationError('At least one field is required to update');
      }
      // additional validation rules here
    }
  }
  
  module.exports = RequestValidator