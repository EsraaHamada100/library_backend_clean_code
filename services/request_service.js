class RequestService {
    constructor(database) {
      this.database = database;
    }
  
    async getAllRequests(queryParams) {
      let conditions = [];
      if (queryParams.approval_state && queryParams.approval_state.trim() != '') {
        conditions.push(`approval_state='${queryParams.approval_state}'`);
      }
      if (queryParams.user_id && queryParams.user_id != '') {
        conditions.push(`user_id='${queryParams.user_id}'`);
      }
      if (queryParams.book_id && queryParams.book_id != '') {
        conditions.push(`requests.book_id='${queryParams.book_id}'`);
      }
  
      let whereClause = '';
  
      if (conditions.length > 0) {
        whereClause = `WHERE ${conditions.join(" AND ")}`;
      }
  
      return new Promise((resolve, reject) => {
        this.database.query(
          `SELECT request_id, user_id, book_name, approval_state, pdf_file
           FROM requests 
           JOIN books ON requests.book_id = books.book_id 
           ${whereClause}`,
          (err, result, fields) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
      });
    }
  
    async getRequestById(id) {
      return new Promise((resolve, reject) => {
        this.database.query("SELECT * FROM requests WHERE ?", { request_id: id }, (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result[0]);
        });
      });
    }
  
    async createRequest(data) {
      return new Promise((resolve, reject) => {
        this.database.query("INSERT INTO requests SET ?", {
          user_id: data.user_id,
          book_id: data.book_id,
          approval_state: data.approval_state ? data.approval_state : "pending",
        }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    }
  
    async updateRequest(id, data) {
      return new Promise((resolve, reject) => {
        this.database.query("UPDATE requests SET ? WHERE request_id = ?", [
          {
            user_id: data.user_id,
            book_id: data.book_id,
            approval_state: data.approval_state,
          },
          id
        ], (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    }
  
  
    async deleteRequest(id) {
      return new Promise((resolve, reject) => {
        this.database.query("DELETE FROM requests WHERE ?", { request_id: id }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    }
  }
  
  module.exports = RequestService;
  