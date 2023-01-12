import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
    private readonly storesService: StoresService,
  ){}

  async create(createAdminDto: LoginDto) {
    const user = await this.authService.createUser({
      ...createAdminDto,
      role: 'ADMIN',
      isActive: true
    })
    return {
      user
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const { user,token } = await this.authService.login({email, password});
    if(
      !['ADMIN','SUPER-ADMIN'].includes(user.role) ||
      !user.isActive
    ) throw new UnauthorizedException('admin no encontrado');
    return {
      user,
      token
    };
  }

  async validate(userToValidate: User) {
    if(userToValidate.role === 'STORE') {
      const store = await this.storesService.findByUser(userToValidate);
      if(!store || !(store.user as User).isActive) throw new UnauthorizedException('tienda no encontrada');
      return {
        user: {
          name: store.name, 
          logo: store.logo,
          phoneNumber: store.phoneNumber,
          rif: store.rif,
          email: userToValidate.email,
          role: userToValidate.role,
          isActive: userToValidate.isActive,
        },
        token: (await this.authService.renewToken(userToValidate)).token
      }
    }else{
      const user = await this.userModel.findById(userToValidate._id);
      if(!user || !user.isActive || !['ADMIN','SUPER-ADMIN'].includes(user.role))
      throw new UnauthorizedException('usuario no encontrado');
      return {
        user,
        token: (await this.authService.renewToken(userToValidate)).token
      }
    }
  }

  findAll() {
    const users = this.userModel.find({role: 'ADMIN'})
    .select('-password');
    return users;
  }

  remove(id: string) {
    return this.authService.deactivateUser(id);
  }

  activate(id: string) {
    return this.authService.activateUser(id);
  }

}
