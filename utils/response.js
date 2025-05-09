class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "notFoundError";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "badRequestError";
  }
}

function success(res, message, data, code = 200) {
  res.status(code).json({
    status: true,
    message,
    data,
  });
}

function failure(res, error) {
  if (error.name === "NotFoundError") {
    res.status(404).json({
      status: false,
      message: "Data not exist",
      errors: [error.message],
    });
  }

  if (error.name === "badRequestError") {
    res.status(400).json({
      status: false,
      message: "Bad request",
      errors: [error.message],
    });
  }

  res.status(500).json({
    status: false,
    message: "server error",
    errors: [error.message],
  });
}

export default { NotFoundError, BadRequestError, success, failure };
