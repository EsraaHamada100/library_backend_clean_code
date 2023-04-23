// class ChaptersController {
//     constructor(chaptersService, validator) {
//         this.chaptersService = chaptersService;
//         this.validator = validator;
//     }

//     async getAllChapters(req, res, next) {
//         try {
//             const { book_id } = req.query;
//             const chapters = await this.chaptersService.getAllChapters(book_id);
//             res.status(200).send(chapters);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async getChapterById(req, res, next) {
//         try {
//             const { id } = req.params;
//             const chapter = await this.chaptersService.getChapterById(id);
//             if (!chapter) {
//                 return res.status(404).json({
//                     message: "Chapter not found"
//                 });
//             }
//             res.status(200).send(chapter);
//         } catch (error) {
//             next(error);
//         }
//     }

//     async createChapter(req, res, next) {
//         try {
//             const data = req.body;
//             await this.chaptersService.createChapter(data);
//             res.status(201).json({
//                 message: "Chapter created!"
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async updateChapter(req, res, next) {
//         try {
//             const { id } = req.params;
//             const data = req.body;
//             await this.chaptersService.updateChapter(id, data);
//             res.status(200).json({
//                 message: "Chapter updated successfully"
//             });
//         } catch (error) {
//             next(error);
//         }
//     }

//     async deleteChapter(req, res, next) {
//         try {
//             const { id } = req.params;
//             await this.chaptersService.deleteChapter(id);
//             res.status(200).json({
//                 message: "Chapter deleted successfully"
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// }

class ChapterController {
    constructor(chapterService, chapterValidator) {
      this.chapterService = chapterService;
      this.chapterValidator = chapterValidator;
    }
  
    async getAllChapters(req, res) {
      try {
        const { book_id } = req.query;
      
        const chapters = await this.chapterService.getAllChapters(book_id);
  
        res.send(chapters);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to get chapters' });
      }
    }
  
    async getChapterById(req, res) {
      const { id } = req.params;
  
      try {
        const chapter = await this.chapterService.getChapterById(id);
        
        if (chapter) {
          res.send(chapter);
        } else {
          res.statusCode = 404;
          res.json({
            "message": "Chapter not found"
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to get chapter' });
      }
    }
  
    async createChapter(req, res) {
      const data = req.body;
  
      try {
        this.chapterValidator.validateCreateChapter(data);
        
        await this.chapterService.createChapter(data);
  
        res.json({
          message: "Chapter created!"
        });
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.send({
          message: "Failed to create the chapter"
        })
      }
    }
  
    async updateChapter(req, res) {
      const { id } = req.params;
      const data = req.body;
  
      try {
        this.chapterValidator.validateUpdateChapter(id, data);
        
        await this.chapterService.updateChapter(id, data);
  
        res.json({
          message: "Chapter updated successfully"
        });
      } catch (error) {
        console.error(error);
        res.statusCode = 505;
        res.json({
          message: "Failed to update chapter data"
        });
      }
    }
  
    async deleteChapter(req, res) {
      const { id } = req.params;
  
      try {
        await this.chapterService.deleteChapter(id);
  
        res.json({
          message: "Chapter deleted successfully"
        });
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.json({
          message: "Failed to delete the chapter",
        });
      }
    }
  }
  
  module.exports = ChapterController;