import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig,JoiValidationSchema } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiValidationSchema
    }),
    MongooseModule.forRoot(process.env.MONGODB_CNN),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}