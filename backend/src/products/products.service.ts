import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/auth/interfaces/user.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ){}

  async create(createProductDto: CreateProductDto, storeUser: IUser) {
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
    //TODO: buscar store
    try {
      const product = await this.productModel.create({createProductDto});
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find()
      .select('-__v') 
      .lean();
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
    .select('-__v') 
    .lean();
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
