import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
  ],
  providers: [],
})
export class ModulesModule {}
