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
    const store = await this.storeModel.findOne({"user._id" : userToValidate.id})
    .populate('user', '-password -__v')
    .select('-__v')
    .lean();
    if(store) {
      return {
        user: store,
        token: this.authService.renewToken(userToValidate._id)
      }
    }else{
      const user = await this.userModel.findById(userToValidate._id);
      if(!user || !user.isActive || !['ADMIN','SUPER-ADMIN'].includes(user.role))
      throw new UnauthorizedException('usuario no encontrado');
      return {
        user,
        token: this.authService.renewToken(userToValidate._id)
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
