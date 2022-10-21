import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('/register')
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.storesService.login(loginDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
