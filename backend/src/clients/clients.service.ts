import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    private readonly authService: AuthService
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

  async findAll() {
    try {
      const clients = await this.clientModel.find()
      .populate('user', '-password -__v')
      .select('-__v') 
      .lean();
      return clients;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id)
    .populate('user', '-password -__v')
    .select('-__v') 
    .lean();
    if(!client) throw new NotFoundException('cliente no encontrado')
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
