import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class ValidationError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`Erro de validação: ${uniqueField}.`);
  }
}
