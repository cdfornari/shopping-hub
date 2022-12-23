import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/auth/entities/user.entity';
import { UploadsService } from 'src/uploads/uploads.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {

  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    private readonly authService: AuthService,
    private readonly uploadsService: UploadsService
  ) {}

  async create(createStoreDto: CreateStoreDto, imagePath: string) {
    if(await this.storeModel.findOne({rif: createStoreDto.rif})) throw new BadRequestException('rif ya registrado');
    if(await this.storeModel.findOne({phoneNumber: createStoreDto.phoneNumber})) throw new BadRequestException('telefono ya registrado');
    const { email, password, ...storeData } = createStoreDto;
    const {user} = await this.authService.createUser({
      email,
      password,
      role: 'STORE',
      isActive: false
    });
    const imgUrl = await this.uploadsService.uploadImage(imagePath);
    await this.storeModel.create({
      ...storeData,
      user: user.id,
      logo: imgUrl
    })
    return {ok : true};
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const { user,token } = await this.authService.login({email, password});
    const store = await this.storeModel.findOne({user: user.id})
    .populate('user', '-password')
    if(!store) throw new NotFoundException('tienda no encontrada')
    delete store.user;
    return {
      user: {
        name: store.name, 
        logo: store.logo,
        phoneNumber: store.phoneNumber,
        rif: store.rif,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      token
    };
  }

  async current(user: User) {
    const client = await this.storeModel.findOne({user: user.id})
    .populate('user', '-password')
    return client
  }

  async findAll() {
    try {
      const stores = await this.storeModel.find()
      .populate('user', '-password')
      return stores;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const store = await this.storeModel.findById(id)
    .populate('user', '-password')
    return store;
  }

  async update(user: User, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeModel.findOne({user: user.id});
    if(!store) throw new NotFoundException('cliente no encontrado')
    const { email, password, ...storeData } = updateStoreDto;
    if(email || password) await this.authService.updateUser(
      store.user as Types.ObjectId, {
        email: email ? email : null,
        password: password ? password : null,
      }
    )
    store.rif = storeData.rif ? storeData.rif : store.rif;
    store.logo = storeData.logo ? storeData.logo : store.logo;
    store.name = storeData.name ? storeData.name : store.name;
    store.phoneNumber = storeData.phoneNumber ? storeData.phoneNumber : store.phoneNumber;
    return (await store.save()).populate('user', '-password')
  }

  async remove(id: string) {
    const store = await this.storeModel.findById(id);
    if(!store) throw new NotFoundException('tienda no encontrada')
    return this.authService.deactivateUser(store.user as Types.ObjectId);
  }

  async activate(id: string) {
    const store = await this.storeModel.findById(id);
    if(!store) throw new NotFoundException('tienda no encontrada')
    return this.authService.activateUser(store.user as Types.ObjectId);
  }

}
