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