import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { IUser } from 'src/auth/interfaces/user.interface';
import { ParseMongoIdPipe } from '../common/pipes/ParseMongoIdPipe';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Post('create')
  @Auth('STORE')
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
  create(
    @Body() createProductDto: CreateProductDto,
    @ReqUser() user: IUser,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp(/(png|jpe?g)/),
      })
      .build()
    ) 
    file: Express.Multer.File
  ) {
    return this.productsService.create(createProductDto,user,file.path);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
  
}
