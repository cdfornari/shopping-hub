import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('register')
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
    @Body() createStoreDto: CreateStoreDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp(/(png|jpe?g)/),
      })
      .build()
    ) 
    file: Express.Multer.File
  ) {
    return this.storesService.create(createStoreDto,file.path);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.storesService.login(loginDto);
  }

  @Get('current')
  @Auth('STORE')
  currentStore(
    @ReqUser() user: User
  ) {
    return this.storesService.current(user);
  }

  @Get()
  @Auth('ADMIN','SUPER-ADMIN')
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @Auth('ADMIN','SUPER-ADMIN')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.storesService.findOne(id);
  }

  @Patch('update')
  @Auth('STORE')
  update(
    @Body() updateClientDto: UpdateStoreDto,
    @ReqUser() user: User
  ) {
    return this.storesService.update(user, updateClientDto);
  }

  @Patch('change-logo')
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
  changeLogo(
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp(/(png|jpe?g)/),
      })
      .build()
    ) 
    file: Express.Multer.File,
    @ReqUser() user: User
  ) {
    return this.storesService.changeLogo(user, file.path);
  }

  @Delete(':id')
  @Auth('ADMIN','SUPER-ADMIN','STORE')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.storesService.remove(id);
  }

  @Post('activate/:id')
  @Auth('ADMIN','SUPER-ADMIN')
  activate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.storesService.activate(id);
  }

}
