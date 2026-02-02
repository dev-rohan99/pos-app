import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ProductsModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
