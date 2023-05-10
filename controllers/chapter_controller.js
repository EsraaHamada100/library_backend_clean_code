const {NOT_FOUND, SERVER_ERROR, CREATED} = require('../core/constants/response_code');

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
      res.status(error.statusCode).send({ message: error.message });
    }
  }

  async getChapterById(req, res) {
    const { id } = req.params;

    try {
      const chapter = await this.chapterService.getChapterById(id);

      if (chapter) {
        res.send(chapter);
      } else {
        res.statusCode = NOT_FOUND;
        res.json({
          "message": "Chapter not found"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(SERVER_ERROR).send({ message: 'Failed to get chapter' });
    }
  }

  async createChapter(req, res) {
    const data = req.body;
    try {
      this.chapterValidator.validateCreateChapter(data);
      await this.chapterService.createChapter(data);
      res.status(CREATED).json({
        message: "Chapter created!"
      });
    } catch (error) {
      res.status(error.statusCode).send({
        message: error.message
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
      res.status(error.statusCode).send({
        message: error.message
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
      res.status(error.statusCode).json({
        message: error.message,
      });
    }
  }
}

module.exports = ChapterController;