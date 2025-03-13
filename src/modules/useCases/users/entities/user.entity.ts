import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  role: $Enums.Role;
  hashRefreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
