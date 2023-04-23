class RequestController {
  constructor(requestService, validator) {
    this.requestService = requestService;
    this.validator = validator;
  }

  
  async getAllRequests(req, res) {
    try {
      const requests = await this.requestService.getAllRequests(req.query);
      res.send(requests);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to get requests' });
    }
  }

  async getRequestById(req, res) {
    const id = req.params.id;
    try {
      const request = await this.requestService.getRequestById(id);
      if (!request) {
        res.status(404).send({ message: 'Request not found' });
        return;
      }
      res.send(request);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to get request' });
    }
  }

  async createRequest(req, res) {
    const data = req.body;
    try {
      this.validator.validateCreateRequest(data);
      const result = await this.requestService.createRequest(data);
      res.send({
        message: "Request added successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  }

  async updateRequest(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
      this.validator.validateUpdateRequest(id, data);
      await this.requestService.updateRequest(id, data);
      res.send({ message: 'Request updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: error.message });
    }
  }

  async deleteRequest(req, res) {
    const id = req.params.id;
    try {
      await this.requestService.deleteRequest(id);
      res.send({ message: 'Request deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to delete request' });
    }
  }
}

module.exports = RequestController;

