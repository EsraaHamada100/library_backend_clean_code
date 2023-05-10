const ServiceError = require('../core/error/service_Error');
class ChapterService {
  constructor(database) {
    this.database = database;
  }

  getAllChapters(bookId) {
    let query = 'SELECT * FROM chapters';

    if (bookId) {
      query += ` WHERE book_id = ${bookId}`;
    }

    return new Promise((resolve, reject) => {
      this.database.query(query, (err, result)=> {
        if(err){
          console.ServiceError(ServiceError);
          reject(new ServiceError('Failed to get all chapters'));
        }
        resolve(result);
      });
    });
  }

  getChapterById(id) {
    const query = 'SELECT * FROM chapters WHERE chapter_id = ?';
    const values = [id];

    return new Promise((resolve, reject) => {
      this.database.query(query, values, (err, result)=>{
        if(err){
          reject(new ServiceError('Failed to get chapter by ID'));
          return;
        }
        if(result[0]){
          resolve(result[0]);

        }else {
          resolve();
        }
      });
    });
  }

  createChapter(data) {


    const query = 'INSERT INTO chapters(book_id, chapter_title, description) VALUES(?, ?, ?)';
    const values = [data.book_id, data.chapter_title, data.description]
    return new Promise((resolve, reject) => {

      this.database.query(query, values, (err, result) => {
        if (err) {
          reject(new ServiceError('Failed to create a new Chapter'));
          return;
        }
        resolve();
      })
    });
  }

  updateChapter(id, data) {
    const query = 'UPDATE chapters SET chapter_title=?, description=? WHERE chapter_id=?';
    const values = [data.chapter_title, data.description, id];

    return new Promise((resolve, reject) => {
      this.database.query(query, values, (err) => {
        if (err) {
          reject(new ServiceError('Failed to update chapter'));
          return;
        }
        resolve();
      })
    });
  }

  deleteChapter(id) {
    const query = 'DELETE FROM chapters WHERE chapter_id=?';
    const values = [id];

    return new Promise((resolve, reject) => {
      this.database.query(query, values, (err)=>{
        if(err){
          reject(new ServiceError('Failed to delete chapter'));
          return;
        }
        resolve();

      });
    });
  }
}

module.exports = ChapterService;