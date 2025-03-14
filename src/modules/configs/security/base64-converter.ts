import { LoginDto } from '../../useCases/auth/dto/login.dto';

export const authorizationToLoginPayload = (
  authorization: string | undefined,
): LoginDto | undefined => {
  if (!authorization) {
    return undefined;
  }

  const authorizationSplited = authorization.split('.');

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  try {
    const decodedPayload = Buffer.from(
      authorizationSplited[1],
      'base64',
    ).toString('ascii');
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Erro ao decodificar o payload do token:', error);
    return undefined;
  }
};
