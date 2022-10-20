import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig,JoiValidationSchema } from './config';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}