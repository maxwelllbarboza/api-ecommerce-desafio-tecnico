export interface IJwtServicePayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload, isRefreshToken?: boolean): string;
}
