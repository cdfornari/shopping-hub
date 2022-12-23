import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { User } from 'src/auth/entities/user.entity';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @Auth('SUPER-ADMIN')
  create(@Body() createAdminDto: LoginDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Post('renew')
  @Auth('ADMIN','STORE','SUPER-ADMIN')
  validate(
    @ReqUser() user: User
  ) {
    return this.adminService.validate(user);
  }

  @Get()
  @Auth('SUPER-ADMIN')
  findAll() {
    return this.adminService.findAll();
  }

  @Patch(':id')
  @Auth('SUPER-ADMIN','ADMIN')
  update(
    @Param('id', ParseMongoIdPipe) id: string, 
    @Body() updateAdminDto: UpdateUserDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Auth('SUPER-ADMIN')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.remove(id);
  }

  @Post('activate/:id')
  @Auth('SUPER-ADMIN')
  activate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.activate(id);
  }

}
