import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StoresModule } from 'src/stores/stores.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        }, 
      }
    ]),
    AuthModule,
    StoresModule,
    UploadsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [MongooseModule,ProductsService]
})
export class ProductsModule {}
