import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, orderSchema } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ExchangesModule } from '../exchanges/exchanges.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: Order.name, 
        useFactory: () => {
          const schema = orderSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        }, 
      },
    ]),
    ProductsModule,
    AuthModule,
    ClientsModule,
    ExchangesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
