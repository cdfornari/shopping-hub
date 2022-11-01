import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UploadsController } from './uploads.controller';
import { UploadsProvider } from './uploads.provider';
import { UploadsService } from './uploads.service';

@Module({ 
  imports: [AuthModule],
  controllers: [UploadsController],
  providers: [UploadsService,UploadsProvider],
  exports: [UploadsService,UploadsProvider]
})
export class UploadsModule {}
