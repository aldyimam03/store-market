const createResponse = (success, message, data = null, errors = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (errors !== null) {
    response.errors = errors;
  }

  return response;
};

const successResponse = (res, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json(createResponse(true, message, data));
};

const errorResponse = (res, message, errors = null, statusCode = 500) => {
  return res
    .status(statusCode)
    .json(createResponse(false, message, null, errors));
};

const createdResponse = (res, message, data = null) => {
  return successResponse(res, message, data, 201);
};

const badRequestResponse = (res, message, errors = null) => {
  return errorResponse(res, message, errors, 400);
};

const unauthorizedResponse = (res, message = "Unauthorized", errors = null) => {
  return errorResponse(res, message, errors, 401);
};

const forbiddenResponse = (res, message = "Forbidden", errors = null) => {
  return errorResponse(res, message, errors, 403);
};

const notFoundResponse = (res, message = "Not Found", errors = null) => {
  return errorResponse(res, message, errors, 404);
};

const conflictResponse = (res, message = "Conflict", errors = null) => {
  return errorResponse(res, message, errors, 409);
};

const internalServerErrorResponse = (
  res,
  message = "Internal Server Error",
  errors = null
) => {
  return errorResponse(res, message, errors, 500);
};

const validationErrorResponse = (res, errors) => {
  return badRequestResponse(res, "Validation Error", errors);
};

module.exports = {
  successResponse,
  errorResponse,
  createdResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  conflictResponse,
  internalServerErrorResponse,
  validationErrorResponse,
};
