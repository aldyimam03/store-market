const CategoryController = require("../src/controllers/categoryController.js");

jest.mock("../src/models", () => ({
  Category: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

const { Category } = require("../src/models");

// Mock response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("CategoryController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  describe("createCategory", () => {
    it("should return 403 if user not admin", async () => {
      const req = { body: { name: "Books" }, user: { role: "user" } };
      const res = mockResponse();

      await CategoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should return 409 if category already exists", async () => {
      const req = { body: { name: "Books" }, user: { role: "admin" } };
      const res = mockResponse();
      Category.findOne.mockResolvedValue({ id: 1, name: "Books" });

      await CategoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
    });

    it("should create category if not exists", async () => {
      const req = {
        body: { name: "Books", description: "desc" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      Category.findOne.mockResolvedValue(null);
      Category.create.mockResolvedValue({
        id: 1,
        name: "Books",
        description: "desc",
      });

      await CategoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // GET ALL
  describe("getAllCategories", () => {
    it("should return categories with pagination", async () => {
      const req = { query: { page: "1", limit: "2" } };
      const res = mockResponse();
      Category.findAndCountAll.mockResolvedValue({
        count: 3,
        rows: [{ id: 1, name: "Books" }],
      });

      await CategoryController.getAllCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalItem: 3,
            totalPage: 2,
            currentPage: 1,
            categories: expect.any(Array),
          }),
        })
      );
    });
  });

  // GET BY ID
  describe("getCategoryById", () => {
    it("should return category if found", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      Category.findByPk.mockResolvedValue({ id: 1, name: "Books" });

      await CategoryController.getCategoryById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return 404 if not found", async () => {
      const req = { params: { id: 99 } };
      const res = mockResponse();
      Category.findByPk.mockResolvedValue(null);

      await CategoryController.getCategoryById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // GET BY NAME
  describe("getCategoryByName", () => {
    it("should return categories with pagination if found", async () => {
      const req = { query: { name: "Books", page: "1", limit: "2" } };
      const res = mockResponse();
      Category.findAndCountAll.mockResolvedValue({
        count: 3,
        rows: [
          { id: 1, name: "Books" },
          { id: 2, name: "New Books" },
        ],
      });

      await CategoryController.getCategoryByName(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "Categories retrieved successfully",
          data: expect.objectContaining({
            totalCategories: 3,
            totalPage: 2,
            currentPage: 1,
            categories: expect.any(Array),
          }),
        })
      );
    });

    it("should return 404 if no categories found", async () => {
      const req = { query: { name: "Unknown", page: "1", limit: "10" } };
      const res = mockResponse();
      Category.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

      await CategoryController.getCategoryByName(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Category not found with name Unknown",
        })
      );
    });
  });

  // UPDATE
  describe("updateCategory", () => {
    it("should return 403 if user not admin", async () => {
      const req = {
        params: { id: 1 },
        body: { name: "Books" },
        user: { role: "user" },
      };
      const res = mockResponse();

      await CategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should return 404 if category not found", async () => {
      const req = {
        params: { id: 99 },
        body: { name: "Books" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      Category.findByPk.mockResolvedValue(null);

      await CategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should update category if valid", async () => {
      const req = {
        params: { id: 1 },
        body: { name: "Books", description: "desc" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      const mockCategory = {
        id: 1,
        name: "Old",
        update: jest.fn().mockResolvedValue({ id: 1, name: "Books" }),
      };
      Category.findByPk.mockResolvedValue(mockCategory);
      Category.findOne.mockResolvedValue(null);

      await CategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockCategory.update).toHaveBeenCalledWith({
        name: "Books",
        description: "desc",
      });
    });

    it("should return 409 if category name already exists", async () => {
      const req = {
        params: { id: 1 },
        body: { name: "Books" },
        user: { role: "admin" },
      };
      const res = mockResponse();
      const mockCategory = { id: 1, name: "Old", update: jest.fn() };
      Category.findByPk.mockResolvedValue(mockCategory);
      Category.findOne.mockResolvedValue({ id: 2, name: "Books" });

      await CategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
    });
  });

  // DELETE
  describe("deleteCategory", () => {
    it("should return 403 if user not admin", async () => {
      const req = { params: { id: 1 }, user: { role: "user" } };
      const res = mockResponse();

      await CategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should return 404 if category not found", async () => {
      const req = { params: { id: 99 }, user: { role: "admin" } };
      const res = mockResponse();
      Category.findByPk.mockResolvedValue(null);

      await CategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should delete category if found", async () => {
      const req = { params: { id: 1 }, user: { role: "admin" } };
      const res = mockResponse();
      const mockCategory = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };
      Category.findByPk.mockResolvedValue(mockCategory);

      await CategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockCategory.destroy).toHaveBeenCalled();
    });
  });
});
