interface ErrorDetail {
  field: string;
  message: string;
}

class ApiError extends Error {
  statusCode: number;
  errors: ErrorDetail[];
  data: any;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: ErrorDetail[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export { ApiError };
