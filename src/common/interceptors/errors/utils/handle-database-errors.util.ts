import { DatabaseError } from '../types/DatabaseError';
import { ForeignKeyConstraintError } from '../types/ForeignKeyConstraintError';
import { NotFoundError } from '../types/NotFoundError';
import { PrismaClientError } from '../types/PrismaClientError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';
import { ValidationError } from '../types/ValidationError';

enum PrismaErrors {
  ValueTooLong = 'P2000',
  UniqueConstraintFail = 'P2002',
  ForeignKeyConstraintFail = 'P2003',
  ConstraintViolation = 'P2004',
  InvalidValueFormat = 'P2005',
  InvalidDataType = 'P2006',
  ValidationFailed = 'P2007',
  NullConstraintViolation = 'P2011',
  MissingRequiredValue = 'P2012',
  MissingArgument = 'P2013',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    case PrismaErrors.ForeignKeyConstraintFail:
      return new ForeignKeyConstraintError(e);

    case PrismaErrors.ValueTooLong:
      return new ValidationError(e);

    case PrismaErrors.ConstraintViolation:
      return new ValidationError(e);

    case PrismaErrors.InvalidValueFormat:
      return new ValidationError(e);

    case PrismaErrors.InvalidDataType:
      return new ValidationError(e);

    case PrismaErrors.ValidationFailed:
      return new ValidationError(e);

    case PrismaErrors.NullConstraintViolation:
      return new ValidationError(e);

    case PrismaErrors.MissingRequiredValue:
      return new ValidationError(e);

    case PrismaErrors.MissingArgument:
      return new ValidationError(e);

    default:
      return new DatabaseError(e.message);
  }
};
