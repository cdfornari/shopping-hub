import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/auth/entities/user.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: LoginDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('renew')
  @Auth()
  validate(
    @ReqUser() user: User
  ) {
    return this.adminService.validate(user);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: LoginDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
