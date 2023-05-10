const database = require("../database/connection.js");

const chaptersRouterFactory = require('../routes/chapters.js');

//! import classes for chapters
const ChapterValidator = require('../validators/chapter_validator.js');
const ChapterService = require('../services/chapter_service.js');
const ChapterController = require('../controllers/chapter_controller.js');

//! dependency injection for chapters
const chapterService = new ChapterService(database);
const chapterValidator = new ChapterValidator();
const chapterController = new ChapterController(chapterService, chapterValidator);
const chaptersRouter = chaptersRouterFactory(chapterController);

// //! create chapters classes
// function createChapterValidator() {
//     return new ChapterValidator();
// }
// function createChapterService(database) {
//     return new ChapterService(database);
// }

// function createChapterController(chapterService, chapterValidator) {
//     return new ChapterController(chapterService,chapterValidator );
// }

module.exports = chaptersRouter;