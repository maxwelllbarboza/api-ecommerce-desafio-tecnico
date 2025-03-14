/* eslint-disable prettier/prettier */
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: 'admin@gmail.com',
    },
  });

  if (existingUser) {
    console.log(
      `O usuário ADMIN com o e-mail ${existingUser.email} já existe.`,
    );
  } else {
    const userAdmin = await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('secret@123', 10),
        role: Role.ADMIN,
      },
    });

    console.log(
      `Foi criado um usuário ADMIN com o email ${userAdmin.email} com sucesso!`,
    );
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
