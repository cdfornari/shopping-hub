import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    if(!user) throw new UnauthorizedException('Credenciales inválidas')
    if(!user.isActive) throw new UnauthorizedException(
      user.role === 'STORE' ? 'La tienda no ha sido aprobada' :'Usuario inactivo'
    )
    const match = await bcrypt.compare(password,user.password);
    if(!match) throw new UnauthorizedException('Credenciales inválidas')
    return {
      user,
      token: this.jwtService.sign({id: user._id})
    }
  }

  async createUser({password,...rest}: CreateUserDto){
    if(
      await this.userModel.findOne({email: rest.email})
    ) throw new BadRequestException('email ya registrado')
    try {
      const user = await this.userModel.create({
        ...rest,
        password: await bcrypt.hash(password,10)
      })
      return {
        user,
        token: this.jwtService.sign({id: user._id})
      };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async renewToken(user: User) {
    return {
      user,
      token: this.jwtService.sign({id: user._id})
    }
  }

}
