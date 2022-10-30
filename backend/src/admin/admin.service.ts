import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Store } from 'src/stores/entities/store.entity';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Store.name) 
    private readonly storeModel: Model<Store>,
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private readonly authService: AuthService
  ){}

  async create(createAdminDto: LoginDto) {
    try {
      const user = await this.userModel.create({
        ...createAdminDto,
        role: 'ADMIN',
        isActive: true
      })
      delete user.password;
      return {
        user
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const { user,token } = await this.authService.login({email, password});
    if(!['ADMIN','SUPER-ADMIN'].includes(user.role))
    throw new UnauthorizedException('admin no encontrado');
    return {
      user,
      token
    };
  }

  async validate(userToValidate: User) {
    if(userToValidate.role === 'STORE') {
      const stores = await this.storeModel.find();
      const store = stores.find(store => store.user == userToValidate._id);
      if(!store) throw new UnauthorizedException('tienda no encontrada');
      return {
        user: {
          name: store.name, 
          logo: store.logo,
          phoneNumber: store.phoneNumber,
          rif: store.rif,
          products: store.products,
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
    .select('-password -__v')
    .lean();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: LoginDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
