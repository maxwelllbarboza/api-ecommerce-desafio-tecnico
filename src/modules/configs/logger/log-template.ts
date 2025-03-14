export const startLog = 'Iniciando processo ';
export const finishLog = 'Finalizando processo ';
export const errorLog = 'Erro encontrado: ';

export const emailNotFound = 'Email not found';
export const invalidPassword = 'Password invalid';
export const invalidToken = 'invalid token.';
export const userNotFound = 'Email not found';

export const validationError = 'validation error.';

export const emailFound = 'Email já cadastrado no sistema';

export const getMessage = (
  message: string,
  method: string,
  additionalMessage?: string,
): string => {
  return additionalMessage
    ? `${message} - ${method} - ${additionalMessage}`
    : `${message} - ${method}`;
};
