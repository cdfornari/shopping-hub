import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { ParseMongoIdPipe } from '../common/pipes/ParseMongoIdPipe';
import { User } from 'src/auth/entities/user.entity';
import { Gender } from './types/gender';
import { Category } from './types/category';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Post('create')
  @Auth('STORE')
  create(
    @Body() createProductDto: CreateProductDto,
    @ReqUser() user: User, 
  ) {
    return this.productsService.create(createProductDto,user);
  }

  @Get()
  findAll(
    @Query('onlyActive', ParseBoolPipe) onlyActive: boolean,
    @Query('gender') gender: Gender,
    @Query('category') category: Category,
  ) {
    return this.productsService.findAll(onlyActive,gender,category);
  }

  @Get('my-products')
  @Auth('STORE')
  findMyProducts(
    @ReqUser() user: User, 
  ) {
    return this.productsService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch('change-image/:id')
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
  changeImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp(/(png|jpe?g)/),
      })
      .build()
    ) 
    file: Express.Multer.File,
    @Param('id', ParseMongoIdPipe) id: string,
  ) {
    return this.productsService.changeImage(id,file.path);
  }

  @Delete(':id')
  @Auth('ADMIN','SUPER-ADMIN','STORE')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('activate/:id')
  @Auth('ADMIN','SUPER-ADMIN','STORE')
  activate(@Param('id') id: string) {
    return this.productsService.activate(id);
  }
  
}
