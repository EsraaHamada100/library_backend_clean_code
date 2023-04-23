const { Router } = require('express');

function createChaptersRouter(chapterController) {
  const router = Router();

  router.get('/', chapterController.getAllChapters.bind(chapterController));
  router.get('/:id', chapterController.getChapterById.bind(chapterController));
  router.post('/', chapterController.createChapter.bind(chapterController));
  router.put('/:id', chapterController.updateChapter.bind(chapterController));
  router.delete('/:id', chapterController.deleteChapter.bind(chapterController));

  return router;
}

module.exports = createChaptersRouter;