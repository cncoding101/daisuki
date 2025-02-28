import { ERROR400, ERROR401, ERROR404, ERROR409, ERROR422, ERROR500 } from '@/utils/constants/status-code';

class AppError extends Error {
  statusCode: number;

  constructor(message?: string, statusCode?: number) {
    super(message || ERROR500.message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || ERROR500.statusCode;
  }
}

class DatabaseError extends AppError {
  constructor(message?: string) {
    super(message || ERROR422.message, ERROR422.statusCode);
    this.name = this.constructor.name;
  }
}

class ValidationError extends AppError {
  constructor(message?: string) {
    super(message || ERROR400.message, ERROR400.statusCode);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message || ERROR404.message, ERROR404.statusCode);
    this.name = this.constructor.name;
  }
}

class NotAuthorizedError extends AppError {
  constructor(message?: string) {
    super(message || ERROR401.message, ERROR401.statusCode);
    this.name = this.constructor.name;
  }
}

class DuplicateFound extends AppError {
  constructor(message?: string) {
    super(message || ERROR409.message, ERROR409.statusCode);
    this.name = this.constructor.name;
  }
}

class NotProcessableContent extends AppError {
  constructor(message?: string) {
    super(message || ERROR422.message, ERROR422.statusCode);
    this.name = this.constructor.name;
  }
}

export {
  AppError,
  DatabaseError,
  ValidationError,
  NotFoundError,
  NotAuthorizedError,
  DuplicateFound,
  NotProcessableContent,
};
