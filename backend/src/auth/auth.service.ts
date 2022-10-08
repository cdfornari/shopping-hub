import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  async login({email,password}: LoginDto){
    const user = await this.userModel.findOne({email})
    if(!user || !user.isActive) throw new UnauthorizedException('usuario no encontrado');
    const match = await bcrypt.compare(password,user.password)
    if(!match) throw new UnauthorizedException('credenciales invalidas')
    return {
      token: this.jwtService.sign({id: user.id})
    }
  }

  async createUser({password,...rest}: CreateUserDto){
    try {
      const user = await this.userModel.create({
        ...rest,
        password: await bcrypt.hash(password,10)
      }) 
      await user.save()
      return {
        token: this.jwtService.sign({id: user.id})
      }
    } catch (error) {
      throw new BadRequestException(error.detail)
    }
  }

  async renewToken(user: User) {
    return {
      ...user,
      token: this.jwtService.sign({id: user.id})
    }
  }

}
