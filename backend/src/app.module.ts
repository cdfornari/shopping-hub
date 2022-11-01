import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig,JoiValidationSchema } from './config';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { AdminModule } from './admin/admin.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiValidationSchema
    }),
    MongooseModule.forRoot(process.env.MONGODB_CNN),
    AuthModule,
    ClientsModule,
    CommonModule,
    ProductsModule,
    StoresModule,
    AdminModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}