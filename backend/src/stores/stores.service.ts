import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
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
    if(await this.storeModel.findOne({dni: createStoreDto.rif})) throw new BadRequestException('rif ya registrado');
    if(await this.storeModel.findOne({phoneNumber: createStoreDto.phoneNumber})) throw new BadRequestException('telefono ya registrado');
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const { user,token } = await this.authService.login({email, password});
    const store = await this.storeModel.findOne({"user._id" : user.id})
    .populate('user', '-password -__v')
    .select('-__v')
    .lean();
    if(!store) throw new NotFoundException('tienda no encontrada')
    return {
      user: store,
      token
    };
  }

  async findAll() {
    try {
      const stores = await this.storeModel.find()
      .populate('user', '-password -__v')
      .select('-__v') 
      .lean();
      return stores;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const store = await this.storeModel.findById(id)
    .populate('user', '-password -__v')
    .select('-__v') 
    .lean();
    if(!store) throw new NotFoundException('tienda no encontrada')
    return store;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
