import HttpStatus from 'http-status-codes';
import { Response } from 'express';

import {
  DataError,
  NotFoundError,
  ValidationError,
  CheckViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError
} from 'objection';

/**
 * Parse error object and return only db related errors.
 * @reference https://vincit.github.io/objection.js/recipes/error-handling.html
 *
 * @param err
 */
function dbErrorMessageGenerator(err: any) {
  if (err instanceof ValidationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: 'UnknownValidationError'
    }
  } else if (err instanceof NotFoundError) {
    return {
      code: HttpStatus.NOT_FOUND,
      message: 'NotFound'
    }
  } else if (err instanceof UniqueViolationError) {
    return {
      code: HttpStatus.CONFLICT,
      message: 'UniqueViolation'
    }
  } else if (err instanceof NotNullViolationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: 'NotNullViolation'
    }
  } else if (err instanceof ForeignKeyViolationError) {
    return {
      code: HttpStatus.CONFLICT,
      message: 'ForeignKeyViolation'
    }
  } else if (err instanceof CheckViolationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: 'CheckViolation'
    }
  } else if (err instanceof DataError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: 'InvalidData'
    }
  }
  else return null;
}

export default function errorMessageGenerator(err: any, res: Response) {
  const dbError = dbErrorMessageGenerator(err);
  if (!!dbError) {
    res.status(dbError.code).send(dbError);

    return;
  }

  res.status(500).send({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  });
}
