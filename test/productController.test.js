const ProductController = require("../src/controllers/productController");
const { Product, Category } = require("../src/models");
const {
  successResponse,
  createdResponse,
  internalServerErrorResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
} = require("../src/utils/responses");

jest.mock("../src/models", () => ({
  Product: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
  },
  Category: {
    findByPk: jest.fn(),
  },
}));

jest.mock("../src/utils/responses", () => ({
  successResponse: jest.fn(),
  createdResponse: jest.fn(),
  internalServerErrorResponse: jest.fn(),
  forbiddenResponse: jest.fn(),
  notFoundResponse: jest.fn(),
  conflictResponse: jest.fn(),
}));

// helper req & res mock
const mockRequest = (data = {}) => data;
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ProductController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE PRODUCT
  describe("createProduct", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({ body: {}, user: { role: "user" } });
      const res = mockResponse();

      await ProductController.createProduct(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if category does not exist", async () => {
      Category.findByPk.mockResolvedValue(null);
      const req = mockRequest({
        body: { name: "Laptop", description: "desc", categoryId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.createProduct(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(res, "Category not found");
    });

    it("should return conflict if product already exists", async () => {
      Category.findByPk.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue({ id: 99 });

      const req = mockRequest({
        body: { name: "Laptop", description: "desc", categoryId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.createProduct(req, res);
      expect(conflictResponse).toHaveBeenCalledWith(
        res,
        "Product already exists in this category"
      );
    });

    it("should create product successfully", async () => {
      Category.findByPk.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue(null);
      Product.create.mockResolvedValue({ id: 1, name: "Laptop" });

      const req = mockRequest({
        body: { name: "Laptop", description: "desc", categoryId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.createProduct(req, res);
      expect(createdResponse).toHaveBeenCalledWith(
        res,
        "Product created successfully",
        { id: 1, name: "Laptop" }
      );
    });
  });

  // GET PRODUCTS
  describe("getProducts", () => {
    it("should return paginated products", async () => {
      Product.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{ id: 1, name: "Laptop" }],
      });

      const req = mockRequest({ query: { page: 1, limit: 10 } });
      const res = mockResponse();

      await ProductController.getProducts(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Products retrieved successfully",
        expect.objectContaining({
          totalItem: 1,
          products: [{ id: 1, name: "Laptop" }],
        })
      );
    });
  });

  // GET PRODUCT BY ID
  describe("getProductById", () => {
    it("should return notFound if product does not exist", async () => {
      Product.findByPk.mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      await ProductController.getProductById(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(res, "Product not found");
    });

    it("should return product if found", async () => {
      Product.findByPk.mockResolvedValue({ id: 1, name: "Laptop" });
      const req = mockRequest({ params: { id: 1 } });
      const res = mockResponse();

      await ProductController.getProductById(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Product retrieved successfully",
        { id: 1, name: "Laptop" }
      );
    });
  });

  // GET PRODUCT BY NAME
  describe("getProductsByName", () => {
    it("should return notFound if no products match", async () => {
      Product.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });
      const req = mockRequest({ query: { name: "Unknown" } });
      const res = mockResponse();

      await ProductController.getProductsByName(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(
        res,
        "Products not found with this name Unknown"
      );
    });

    it("should return products if found", async () => {
      Product.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [{ id: 1, name: "Laptop" }],
      });
      const req = mockRequest({ query: { name: "Lap" } });
      const res = mockResponse();

      await ProductController.getProductsByName(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Products retrieved successfully",
        expect.objectContaining({
          totalProducts: 1,
          products: [{ id: 1, name: "Laptop" }],
        })
      );
    });
  });

  // UPDATE PRODUCT
  describe("updateProduct", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({
        params: { id: 1 },
        body: {},
        user: { role: "user" },
      });
      const res = mockResponse();

      await ProductController.updateProduct(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if product not exists", async () => {
      Product.findByPk.mockResolvedValue(null);
      const req = mockRequest({
        params: { id: 1 },
        body: { name: "Laptop" },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.updateProduct(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(res, "Product not found");
    });

    it("should return notFound if category not exists", async () => {
      Product.findByPk.mockResolvedValue({ id: 1, categoryId: 99 });
      Category.findByPk.mockResolvedValue(null);
      const req = mockRequest({
        params: { id: 1 },
        body: { categoryId: 123 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.updateProduct(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(res, "Category not found");
    });

    it("should return conflict if duplicate product exists", async () => {
      Product.findByPk.mockResolvedValue({ id: 1, name: "Old", categoryId: 1 });
      Category.findByPk.mockResolvedValue({ id: 1 });
      Product.findOne.mockResolvedValue({ id: 2 }); // another product same name

      const req = mockRequest({
        params: { id: 1 },
        body: { name: "Laptop", categoryId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.updateProduct(req, res);
      expect(conflictResponse).toHaveBeenCalledWith(
        res,
        "Product with this name already exists in this category"
      );
    });

    it("should update product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Old",
        categoryId: 1,
        update: jest.fn().mockResolvedValue({ id: 1, name: "New" }),
      };
      Product.findByPk.mockResolvedValue(mockProduct);
      Product.findOne.mockResolvedValue(null);

      const req = mockRequest({
        params: { id: 1 },
        body: { name: "New", description: "Updated", categoryId: 1 },
        user: { role: "admin" },
      });
      const res = mockResponse();

      await ProductController.updateProduct(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Product updated successfully",
        { id: 1, name: "New" }
      );
    });
  });

  // DELETE PRODUCT
  describe("deleteProduct", () => {
    it("should forbid non-admin users", async () => {
      const req = mockRequest({ params: { id: 1 }, user: { role: "user" } });
      const res = mockResponse();

      await ProductController.deleteProduct(req, res);
      expect(forbiddenResponse).toHaveBeenCalledWith(res, "Forbidden");
    });

    it("should return notFound if product does not exist", async () => {
      Product.findByPk.mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 }, user: { role: "admin" } });
      const res = mockResponse();

      await ProductController.deleteProduct(req, res);
      expect(notFoundResponse).toHaveBeenCalledWith(res, "Product not found");
    });

    it("should delete product successfully", async () => {
      const mockProduct = { id: 1, destroy: jest.fn() };
      Product.findByPk.mockResolvedValue(mockProduct);

      const req = mockRequest({ params: { id: 1 }, user: { role: "admin" } });
      const res = mockResponse();

      await ProductController.deleteProduct(req, res);
      expect(successResponse).toHaveBeenCalledWith(
        res,
        "Product with ID 1 deleted successfully"
      );
    });
  });
});
