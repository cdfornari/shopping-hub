import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store, StoreSchema } from './entities/store.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema
      }
    ]),
    AuthModule,
    UploadsModule
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService,MongooseModule]
})
export class StoresModule {}
