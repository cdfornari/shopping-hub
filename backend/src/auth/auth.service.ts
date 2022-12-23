import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
      user.role === 'STORE' ? 'La tienda no ha sido aprobada' : 'Usuario inactivo'
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
      await this.userModel.findOne({email: rest.email, isActive: true})
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

  async updateUser(id: string | Types.ObjectId, updateUserDto: UpdateUserDto){
    if(!updateUserDto.password && !updateUserDto.email) return;
    const user = await this.userModel.findById(id).select('-password');
    if(!user) throw new NotFoundException('usuario no encontrado');
    if(updateUserDto.email && updateUserDto.email !== user.email)
      if(await this.userModel.findOne({email: updateUserDto.email, isActive: true}))
        throw new BadRequestException('email ya registrado');
      else user.email = updateUserDto.email;
    if(updateUserDto.password)
      user.password = await bcrypt.hash(updateUserDto.password,10);
    return {
      user: await user.save()
    }
  }

  async deactivateUser(id: string | Types.ObjectId){
    const user = await this.userModel.findById(id).select('-password');
    if(!user) throw new NotFoundException('usuario no encontrado');
    if(!user.isActive) throw new BadRequestException('usuario ya inactivo');
    if(user.role === 'SUPER-ADMIN') throw new BadRequestException('No se puede desactivar al super admin');
    user.isActive = false;
    return {
      user: await user.save()
    }
  }

  async activateUser(id: string | Types.ObjectId){
    const user = await this.userModel.findById(id).select('-password');
    if(!user) throw new NotFoundException('usuario no encontrado');
    if(user.isActive) throw new BadRequestException('usuario ya activo');
    if(await this.userModel.findOne({email: user.email, isActive: true}))
      throw new BadRequestException('email ya usado por otro usuario');
    user.isActive = true;
    return {
      user: await user.save()
    }
  }

  async renewToken(user: User) {
    return {
      user,
      token: this.jwtService.sign({id: user._id})
    }
  }

}
