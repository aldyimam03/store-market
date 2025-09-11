const PaymentMethodController = require("../src/controllers/paymentMethodController.js");

jest.mock("../src/models", () => ({
  PaymentMethod: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

const { PaymentMethod } = require("../src/models");

// Mock response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("PaymentMethodController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  describe("createPaymentMethod", () => {
    it("should return 403 if user not admin", async () => {
      const req = { body: { name: "COD" }, user: { role: "user" } };
      const res = mockResponse();

      await PaymentMethodController.createPaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should create payment method if admin", async () => {
      const req = { body: { name: "COD" }, user: { role: "admin" } };
      const res = mockResponse();
      PaymentMethod.create.mockResolvedValue({ id: 1, name: "COD" });

      await PaymentMethodController.createPaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(PaymentMethod.create).toHaveBeenCalledWith({ name: "COD" });
    });
  });

  // GET ALL
  describe("getAllPaymentMethods", () => {
    it("should return payment methods with pagination", async () => {
      const req = { query: { page: "1", limit: "2" } };
      const res = mockResponse();
      PaymentMethod.findAndCountAll.mockResolvedValue({
        count: 3,
        rows: [{ id: 1, name: "COD" }],
      });

      await PaymentMethodController.getAllPaymentMethods(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalPaymentMethods: 3,
            totalPage: 2,
            currentPage: 1,
            paymentMethods: expect.any(Array),
          }),
        })
      );
    });

    it("should return 404 if no payment methods found", async () => {
      const req = { query: { page: "1", limit: "2" } };
      const res = mockResponse();
      PaymentMethod.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await PaymentMethodController.getAllPaymentMethods(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // GET BY ID
  describe("getPaymentMethodById", () => {
    it("should return payment method if found", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      PaymentMethod.findByPk.mockResolvedValue({ id: 1, name: "COD" });

      await PaymentMethodController.getPaymentMethodById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 if not found", async () => {
      const req = { params: { id: 99 } };
      const res = mockResponse();
      PaymentMethod.findByPk.mockResolvedValue(null);

      await PaymentMethodController.getPaymentMethodById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // GET BY NAME
  describe("getPaymentMethodByName", () => {
    it("should return payment methods with pagination if found", async () => {
      const req = { params: { name: "COD" }, query: { page: "1", limit: "2" } };
      const res = mockResponse();
      PaymentMethod.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: [
          { id: 1, name: "COD" },
          { id: 2, name: "COD Express" },
        ],
      });

      await PaymentMethodController.getPaymentMethodByName(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 if no payment method found", async () => {
      const req = {
        params: { name: "Unknown" },
        query: { page: "1", limit: "2" },
      };
      const res = mockResponse();
      PaymentMethod.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await PaymentMethodController.getPaymentMethodByName(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // UPDATE
  describe("updatePaymentMethod", () => {
    it("should return 403 if user not admin", async () => {
      const req = {
        params: { id: 1 },
        body: { name: "Transfer" },
        user: { role: "user" },
      };
      const res = mockResponse();

      await PaymentMethodController.updatePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should return 404 if payment method not found", async () => {
      const req = {
        params: { id: 99 },
        body: { name: "Transfer" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      PaymentMethod.findByPk.mockResolvedValue(null);

      await PaymentMethodController.updatePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should update payment method if valid", async () => {
      const req = {
        params: { id: 1 },
        body: { name: "Transfer" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      const mockPaymentMethod = {
        id: 1,
        name: "COD",
        update: jest.fn().mockResolvedValue({ id: 1, name: "Transfer" }),
      };
      PaymentMethod.findByPk.mockResolvedValue(mockPaymentMethod);

      await PaymentMethodController.updatePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockPaymentMethod.update).toHaveBeenCalledWith({
        name: "Transfer",
      });
    });
  });

  // DELETE
  describe("deletePaymentMethod", () => {
    it("should return 403 if user not admin", async () => {
      const req = { params: { id: 1 }, user: { role: "user" } };
      const res = mockResponse();

      await PaymentMethodController.deletePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should return 404 if payment method not found", async () => {
      const req = { params: { id: 99 }, user: { role: "admin" } };
      const res = mockResponse();
      PaymentMethod.findByPk.mockResolvedValue(null);

      await PaymentMethodController.deletePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should delete payment method if found", async () => {
      const req = { params: { id: 1 }, user: { role: "admin" } };
      const res = mockResponse();
      const mockPaymentMethod = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };
      PaymentMethod.findByPk.mockResolvedValue(mockPaymentMethod);

      await PaymentMethodController.deletePaymentMethod(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockPaymentMethod.destroy).toHaveBeenCalled();
    });
  });
});
