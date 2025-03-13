import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class ForeignKeyConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`Erro de integridade: A chave estrangeira referenciada não existe.`);
  }
}
