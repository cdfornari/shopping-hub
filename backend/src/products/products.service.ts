import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/auth/interfaces/user.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { StoresService } from '../stores/stores.service';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly storesService: StoresService,
    private readonly uploadsService: UploadsService
  ){}

  async create(createProductDto: CreateProductDto, storeUser: IUser, imagePath: string) {
    if(createProductDto.category === 'shoes'){
      if(!createProductDto.shoeSizes) throw new BadRequestException('Las tallas de zapatos son obligatorias');
      delete createProductDto.sizes;
    }else{
      delete createProductDto.shoeSizes;
      if(!createProductDto.sizes || createProductDto.sizes.length === 0) 
      throw new BadRequestException('Las tallas son requeridas')
      if(createProductDto.sizes.length > 1){
        if(createProductDto.sizes.some(({size}) => size === 'UNI'))         
        throw new BadRequestException('Las tallas UNI no pueden ir con otras tallas')
      }
    }
    const store = await this.storesService.findOne(storeUser._id);
    if(!store) throw new NotFoundException('Tienda no encontrada');
    const imgUrl = await this.uploadsService.uploadImage(imagePath);
    try {
      const product = await this.productModel.create({
        ...createProductDto,
        store: store._id,
        image: imgUrl
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find()
      .populate('store')
      .select('-__v') 
      .lean();
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
    .populate('store')
    .select('-__v') 
    if(!product) throw new NotFoundException('producto no encontrado')
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
