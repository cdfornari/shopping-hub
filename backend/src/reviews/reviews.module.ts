import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ClientsModule } from 'src/clients/clients.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      }
    ]),
    AuthModule,
    ProductsModule,
    OrdersModule,
    ClientsModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
