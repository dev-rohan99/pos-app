import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });

    if (existing) {
      throw new BadRequestException('SKU already exists');
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        price: dto.price,
        stockQuantity: dto.stockQuantity,
      },
    });
  }
}
