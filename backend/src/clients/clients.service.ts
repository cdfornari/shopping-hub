import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/auth/entities/user.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    private readonly authService: AuthService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    if(await this.clientModel.findOne({dni: createClientDto.dni})) throw new BadRequestException('cedula ya registrada')
    if(await this.clientModel.findOne({phoneNumber: createClientDto.phoneNumber})) throw new BadRequestException('telefono ya registrado')
    try {
      const { email, password, ...clientData } = createClientDto;
      const {user,token} = await this.authService.createUser({
        email,
        password,
        role: 'CLIENT'
      });
      await this.clientModel.create({
        ...clientData,
        user: user.id
      })
      return {
        token
      };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const { user,token } = await this.authService.login({email, password});
    const client = await this.clientModel.findOne({user: user.id})
    .populate('user', '-password')
    if(!client) throw new NotFoundException('cliente no encontrado')
    return {
      client,
      token
    };
  }

  async findAll() {
    try {
      const clients = await this.clientModel.find()
      .populate('user', '-password');
      return clients;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    .populate('user', '-password');
    if(!client) throw new NotFoundException('cliente no encontrado')
    return client;
  }

  async validate(user: User) {
    if(!user.isActive) throw new NotFoundException('cliente inactivo')
    const client = await this.clientModel.findOne({user: user.id})
    .populate('user', '-password');
    return {
      client,
      token: (await this.authService.renewToken(user)).token
    }
  }

  async current(user: User) {
    if(!user.isActive) throw new NotFoundException('cliente inactivo')
    const client = await this.clientModel.findOne({user: user.id})
    .populate('user', '-password');
    return client
  }

  async update(user: User, updateClientDto: UpdateClientDto) {
    const client = await this.clientModel.findOne({user: user.id});
    if(!client) throw new NotFoundException('cliente no encontrado')
    const { email, password, ...clientData } = updateClientDto;
    if(email || password) await this.authService.updateUser(
      client.user as Types.ObjectId, {
        email: email ? email : null,
        password: password ? password : null,
      }
    )
    client.dni = clientData.dni ? clientData.dni : client.dni;
    client.fullName = clientData.fullName ? clientData.fullName : client.fullName;
    client.phoneNumber = clientData.phoneNumber ? clientData.phoneNumber : client.phoneNumber;
    return {
      client: await client.save(),
    };
  }

  async remove(id: string) {
    const client = await this.clientModel.findById(id);
    if(!client) throw new NotFoundException('cliente no encontrado')
    return this.authService.deactivateUser(client.user as Types.ObjectId);
  }

  async activate(id: string) {
    const client = await this.clientModel.findById(id);
    if(!client) throw new NotFoundException('cliente no encontrado')
    return this.authService.activateUser(client.user as Types.ObjectId);
  }

}
