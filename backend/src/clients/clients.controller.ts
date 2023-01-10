import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('register')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.clientsService.login(loginDto);
  }

  @Post('renew')
  @Auth('CLIENT')
  validate(
    @ReqUser() user: User
  ) {
    return this.clientsService.validate(user);
  }

  @Get('current')
  @Auth('CLIENT')
  currentClient(
    @ReqUser() user: User
  ) {
    return this.clientsService.current(user);
  }

  @Get()
  @Auth('ADMIN','SUPER-ADMIN')
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @Auth('ADMIN','SUPER-ADMIN')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch('update')
  @Auth('CLIENT')
  update(
    @Body() updateClientDto: UpdateClientDto,
    @ReqUser() user: User
  ) {
    return this.clientsService.update(user, updateClientDto);
  }

  @Delete(':id')
  @Auth('ADMIN','SUPER-ADMIN','CLIENT')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.clientsService.remove(id);
  }

  @Post('activate/:id')
  @Auth('ADMIN','SUPER-ADMIN')
  activate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.clientsService.activate(id);
  }

}
