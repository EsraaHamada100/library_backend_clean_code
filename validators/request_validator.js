class RequestValidator {
    validateCreateRequest(data) {
      if (!data.user_id || !data.book_id) {
        throw new Error('User ID and book ID are required');
      }
      // additional validation rules here
    }
  
    validateUpdateRequest(id, data) {
      if (!id) {
        throw new Error('Request ID is required');
      }
      if (!data.user_id && !data.book_id && !data.approval_state) {
        throw new Error('At least one field is required to update');
      }
      // additional validation rules here
    }
  }
  
  module.exports = RequestValidator