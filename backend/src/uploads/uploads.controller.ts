import { Controller, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService
  ) {}

  @Post()
  @Auth()
  @UseInterceptors(
    FileInterceptor('image',{
      limits: {
        files: 1,
      },
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const fileExtension = file.mimetype.split('/')[1];
          const fileName = `${uuid()}.${fileExtension}`;
          cb(null,fileName)
        }
      })
    })
  )
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp(/(png|jpe?g)/),
      })
      .build()
    ) 
    file: Express.Multer.File
  ) {
    return this.uploadsService.uploadImage(file.path);
  }
  
}
