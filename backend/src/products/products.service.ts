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
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
    private readonly uploadsService: UploadsService
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

  async findAll(onlyActive: boolean = true, gender?: Gender, category?: Category) {
    try {
      const products = await this.productModel.find(
        {
          $and: [
            { isActive: onlyActive ? true : {'$in': [true, false]} },
            { gender: gender ?
              (gender === 'kids' ? 'kids' : { '$in': ['unisex',gender] })
              : {'$in': ValidGenders}
            },
            { category: category ? category : {'$in': ValidCategories} }
          ]
        }
      )
      return products;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if(!product) throw new NotFoundException('Producto no encontrado');
    if(updateProductDto.category){
      if(updateProductDto.category === 'shoes'){
        product.sizes = [];
        if(!updateProductDto.shoeSizes || updateProductDto.shoeSizes.length === 0){
          if(product.shoeSizes.length === 0) throw new BadRequestException('Las tallas de zapatos son obligatorias');
        }
        product.shoeSizes = (updateProductDto.shoeSizes && updateProductDto.shoeSizes.length > 0) 
        ? updateProductDto.shoeSizes : product.shoeSizes;
      }else{
        product.shoeSizes = [];
        if(!updateProductDto.sizes || updateProductDto.sizes.length === 0){
          if(product.sizes.length === 0) throw new BadRequestException('Las tallas son requeridas');
        }
        if(product.sizes.length > 1){
          if(product.sizes.some((size) => size === 'UNI'))         
          throw new BadRequestException('Las tallas UNI no pueden ir con otras tallas')
        }
        product.sizes = (updateProductDto.sizes && updateProductDto.sizes.length > 0) 
        ? updateProductDto.sizes : product.sizes;
      }
    }else{
      if(product.category === 'shoes'){
        product.shoeSizes = (updateProductDto.shoeSizes && updateProductDto.shoeSizes.length > 0)
        ? updateProductDto.shoeSizes : product.shoeSizes;
      }else{
        product.sizes = (updateProductDto.sizes && updateProductDto.sizes.length > 0)
        ? updateProductDto.sizes : product.sizes;
      }
    }
    if(updateProductDto.price){
      if(updateProductDto.comparativePrice){
        if(updateProductDto.price > updateProductDto.comparativePrice){
          throw new BadRequestException('El precio no puede ser mayor al precio comparativo')
        }
      }else{
        if(updateProductDto.price > product.comparativePrice){
          throw new BadRequestException('El precio no puede ser mayor al precio comparativo')
        }
      }
    }else if(updateProductDto.comparativePrice){
      if(product.price > updateProductDto.comparativePrice){
        throw new BadRequestException('El precio no puede ser mayor al precio comparativo')
      }
    }
    product.title = updateProductDto.title ? updateProductDto.title : product.title;
    product.description = updateProductDto.description ? updateProductDto.description : product.description;
    product.price = updateProductDto.price ? updateProductDto.price : product.price;
    product.comparativePrice = updateProductDto.comparativePrice ? updateProductDto.comparativePrice : product.comparativePrice;
    product.category = updateProductDto.category ? updateProductDto.category : product.category;
    product.image = updateProductDto.image ? updateProductDto.image : product.image;
    product.gender = updateProductDto.gender ? updateProductDto.gender : product.gender;
    return product.save();
  }

  async changeImage(productId: string, imagePath: string) {
    const product = await this.productModel.findById(productId);
    if(!product) throw new NotFoundException('tienda no encontrada');
    const imgUrl = await this.uploadsService.uploadImage(imagePath);
    product.image = imgUrl;
    return await product.save()
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id);
    if(!product) throw new NotFoundException('Producto no encontrado');
    if(!product.isActive) throw new BadRequestException('El producto ya está inactivo');
    product.isActive = false;
    return product.save();
  }

  async activate(id: string) {
    const product = await this.productModel.findById(id);
    if(!product) throw new NotFoundException('Producto no encontrado');
    if(product.isActive) throw new BadRequestException('El producto ya está activo');
    product.isActive = true;
    return product.save();
  }

}
