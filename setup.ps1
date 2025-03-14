# Instalar os pacotes
npm install

# Configurar variável de ambiente para o banco de dados
@"
DATABASE_URL="postgresql://pguser:pgpassword@localhost:5435/ecommerce?schema=public"
JWT_SECRET=74YLbq4%c!wU
JWT_EXPIRATION_TIME=2h
JWT_REFRESH_TOKEN_SECRET=7jML9q4-c!s0
JWT_REFRESH_TOKEN_EXPIRATION_TIME=24h
"@ | Out-File -Encoding utf8 .env

# Aplicar migrações no banco de dados
npx prisma migrate dev --name init

# Aplicar push do Prisma
npx prisma db push

# Aplicar generate do Prisma
npx prisma generate 

#Rodar o seed para gerar o user admin
npm run seed

# Rodar o servidor NestJS
npm run start:dev