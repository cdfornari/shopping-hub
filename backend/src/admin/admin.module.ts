import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  imports: [
    AuthModule,
    StoresModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
