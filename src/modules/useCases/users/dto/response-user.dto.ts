import { $Enums } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: string;
  email: string;
  role: $Enums.Role;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}
