import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/auth/entities/user.entity';
import { Gender, ValidGenders } from './types/gender';
import { Category, ValidCategories } from './types/category';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>
  ){}

  async create(createProductDto: CreateProductDto, user: User) {
    if(createProductDto.category === 'shoes'){
      delete createProductDto.sizes;
      if(!createProductDto.shoeSizes || createProductDto.shoeSizes.length === 0) 
      throw new BadRequestException('Las tallas de zapatos son obligatorias');
    }else{
      delete createProductDto.shoeSizes;
      if(!createProductDto.sizes || createProductDto.sizes.length === 0) 
      throw new BadRequestException('Las tallas son requeridas')
      if(createProductDto.sizes.length > 1){
        if(createProductDto.sizes.some((size) => size === 'UNI'))         
        throw new BadRequestException('Las tallas UNI no pueden ir con otras tallas')
      }
    }
    const store = await this.storeModel.findOne({user: user.id});
    if(!store) throw new NotFoundException('Tienda no encontrada');
    try {
      const product = await this.productModel.create({
        ...createProductDto,
        store: store._id
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  async findByUser(user: User) {
    const store = await this.storeModel.findOne({user: user.id});
    if(!store) throw new NotFoundException('Tienda no encontrada');
    try {
      const products = await this.productModel.find({store: store._id});
      return products;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find()
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
    return product;
  }

  async filter(gender: Gender, category: Category){
    if(!ValidGenders.includes(gender)) throw new BadRequestException('Género no válido');
    if(!ValidCategories.includes(category)) throw new BadRequestException('Categoría no válida')
    const products = gender === 'kid' ? (
      await this.productModel.find({
        gender: gender,
        category: category
      })
    ):(
      await this.productModel.find({
        $or: [
          {
            gender: gender
          },
          {
            gender: 'unisex'
          }
        ],
        $and: [
          {
            category: category
          }
        ]
      })
    )
    return products;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
