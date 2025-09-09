const VariantController = require("../src/controllers/variantController");
const { Variant, Product } = require("../src/models");
const { generateSKU } = require("../src/utils/sku");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
} = require("../src/utils/responses");

jest.mock("../src/models", () => ({
  Variant: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
  },
  Product: {
    findByPk: jest.fn(),
  },
}));

jest.mock("../src/utils/sku", () => ({
  generateSKU: jest.fn(),
}));

jest.mock("../src/utils/responses", () => ({
  successResponse: jest.fn(),
  createdResponse: jest.fn(),
  internalServerErrorResponse: jest.fn(),
  forbiddenResponse: jest.fn(),
  notFoundResponse: jest.fn(),
  conflictResponse: jest.fn(),
}));

const mockRequest = (data = {}) => data;
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("VariantController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE VARIANT
  describe("createVariant", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({ body: {}, user: { role: "user" } });
      const res = mockResponse();
      await VariantController.createVariant(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if product does not exist", async () => {
      Product.findByPk.mockResolvedValue(null);
      const req = mockRequest({
        body: { name: "Red", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.createVariant(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Product with ID 1 not found"
      );
    });

    it("should return conflict if variant already exists", async () => {
      Product.findByPk.mockResolvedValue({ id: 1 });
      Variant.findOne.mockResolvedValue({ id: 99 });
      const req = mockRequest({
        body: { name: "Red", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.createVariant(req, res);
      expect(conflictResponse).toHaveBeenCalledWith(
        res,
        "Variant with this name already exists for this product"
      );
    });

    it("should create variant successfully", async () => {
      Product.findByPk.mockResolvedValue({ id: 1 });
      Variant.findOne.mockResolvedValue(null);
      generateSKU.mockResolvedValue({ sku: "SKU123" });
      Variant.create.mockResolvedValue({ id: 1, name: "Red", sku: "SKU123" });

      const req = mockRequest({
        body: { name: "Red", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.createVariant(req, res);
      expect(createdResponse).toHaveBeenCalledWith(
        res,
        "Variant created successfully",
        { id: 1, name: "Red", sku: "SKU123" }
      );
    });
  });

  // GET ALL VARIANTS
  describe("getAllVariants", () => {
    it("should return variants with pagination", async () => {
      Variant.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{ id: 1, name: "Red" }],
      });
      const req = mockRequest({ query: { page: 1, limit: 10 } });
      const res = mockResponse();
      await VariantController.getAllVariants(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Variants retrieved successfully",
        expect.objectContaining({
          totalItem: 1,
          variants: [{ id: 1, name: "Red" }],
        })
      );
    });
  });

  // GET VARIANT BY ID
  describe("getVariantById", () => {
    it("should return notFound if variant does not exist", async () => {
      Variant.findByPk.mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();
      await VariantController.getVariantById(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Variant with ID 1 not found"
      );
    });

    it("should return variant if found", async () => {
      Variant.findByPk.mockResolvedValue({ id: 1, name: "Red" });
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();
      await VariantController.getVariantById(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Variant retrieved successfully",
        { id: 1, name: "Red" }
      );
    });
  });

  // GET VARIANT BY NAME
  describe("getVariantByName", () => {
    it("should return notFound if no variants match", async () => {
      Variant.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });
      const req = mockRequest({ query: { name: "Unknown" } });
      const res = mockResponse();
      await VariantController.getVariantByName(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Variant with name Unknown not found"
      );
    });

    it("should return variants if found", async () => {
      Variant.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{ id: 1, name: "Red" }],
      });
      const req = mockRequest({ query: { name: "Red" } });
      const res = mockResponse();
      await VariantController.getVariantByName(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Variants retrieved successfully",
        expect.objectContaining({
          totalVariants: 1,
          variants: [{ id: 1, name: "Red" }],
        })
      );
    });
  });

  // UPDATE VARIANT
  describe("updateVariant", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({ params: { id: 1 }, user: { role: "user" } });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if variant does not exist", async () => {
      Variant.findByPk.mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 }, user: { role: "admin" } });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Variant with ID 1 not found"
      );
    });

    it("should return notFound if product does not exist", async () => {
      Variant.findByPk.mockResolvedValue({ id: 1, productId: 99 });
      Product.findByPk.mockResolvedValue(null);
      const req = mockRequest({
        params: { id: 1 },
        body: { productId: 2 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Product with ID 2 not found"
      );
    });

    it("should return conflict if duplicate variant exists", async () => {
      Variant.findByPk.mockResolvedValue({
        id: 1,
        name: "Old",
        productId: 1,
      });
      Variant.findOne.mockResolvedValue({ id: 2 });
      const req = mockRequest({
        params: { id: 1 },
        body: { name: "New", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(conflictResponse).toHaveBeenCalledWith(
        res,
        "Variant with this name already exists for this product"
      );
    });

    it("should handle SKU generation failure", async () => {
      const mockVariant = {
        id: 1,
        name: "Old",
        productId: 1,
        update: jest.fn(),
      };
      Variant.findByPk.mockResolvedValue(mockVariant);
      Variant.findOne.mockResolvedValue(null);
      generateSKU.mockRejectedValue(new Error("SKU error"));

      const req = mockRequest({
        params: { id: 1 },
        body: { name: "New", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(internalServerErrorResponse).toHaveBeenCalledWith(
        res,
        "Failed to generate new SKU",
        "SKU error"
      );
    });

    it("should update variant successfully", async () => {
      const mockVariant = {
        id: 1,
        name: "Old",
        productId: 1,
        update: jest.fn().mockResolvedValue({}),
      };
      Variant.findByPk
        .mockResolvedValueOnce(mockVariant) // first fetch
        .mockResolvedValueOnce({ id: 1, name: "New" }); // after update
      Variant.findOne.mockResolvedValue(null);
      generateSKU.mockResolvedValue({ sku: "SKU456" });

      const req = mockRequest({
        params: { id: 1 },
        body: { name: "New", productId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();
      await VariantController.updateVariant(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Variant updated successfully",
        { id: 1, name: "New" }
      );
    });
  });

  // DELETE VARIANT
  describe("deleteVariant", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({ params: { id: 1 }, user: { role: "user" } });
      const res = mockResponse();
      await VariantController.deleteVariant(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if variant does not exist", async () => {
      Variant.findByPk.mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 }, user: { role: "admin" } });
      const res = mockResponse();
      await VariantController.deleteVariant(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Variant with ID 1 not found"
      );
    });

    it("should delete variant successfully", async () => {
      const mockVariant = { id: 1, destroy: jest.fn() };
      Variant.findByPk.mockResolvedValue(mockVariant);
      const req = mockRequest({ params: { id: 1 }, user: { role: "admin" } });
      const res = mockResponse();
      await VariantController.deleteVariant(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Variant with ID 1 deleted successfully"
      );
    });
  });
});
