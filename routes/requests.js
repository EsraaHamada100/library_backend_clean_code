const { Router } = require('express');

function createRequestRouter(requestController) {
  const router = Router();

  router.get("/", requestController.getAllRequests.bind(requestController));
  router.get("/:id", requestController.getRequestById.bind(requestController));
  router.post("/", requestController.createRequest.bind(requestController));
  router.put("/:id", requestController.updateRequest.bind(requestController));
  router.delete("/:id", requestController.deleteRequest.bind(requestController));

  return router;
}

module.exports = createRequestRouter