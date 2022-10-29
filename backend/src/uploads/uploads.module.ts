import { Module } from '@nestjs/common';
import { UploadsProvider } from './uploads.provider';
import { UploadsService } from './uploads.service';

@Module({ 
  providers: [UploadsService,UploadsProvider],
  exports: [UploadsService,UploadsProvider]
})
export class UploadsModule {}
