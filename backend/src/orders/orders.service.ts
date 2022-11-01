import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Size } from 'src/products/types/size';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly exchangesService: ExchangesService,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto, user: User
  ) {
    let total = 0;
    let productsDB: {
      product: Product & {_id: Types.ObjectId;}
      quantity: number,
      size?: Size,
      shoeSize?: number
    }[] = [];
    createOrderDto.products.forEach(
      async ({product,quantity,size,shoeSize}) => {
        const productDB = await this.productsService.findOne(product);
        if(productDB.category === 'shoes'){
          if(!shoeSize) throw new BadRequestException('Se necesita talla de zapato');
        }else if(!size) throw new BadRequestException('Se necesita talla');
        total += productDB.price * quantity;
        productsDB.push({
          product: productDB,
          size,
          shoeSize,
          quantity
        });
      }
    )
    if(createOrderDto.paymentMethod === 'pago-movil') 
    total *= await this.exchangesService.getBolivarRate();;
    const client = await this.clientModel.findOne({user: user.id});
    if(!client) throw new BadRequestException('Cliente no encontrado');
    try {
      const order = await this.orderModel.create({
        ...createOrderDto,
        total,
        client: client.id
      })
      return {
        ok: true,
        order
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    } 
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find()
      .populate('client', '-__v')
      .populate('products.product', '-__v')
      .select('-__v')
      .lean();
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id)
    .populate('client', '-__v')
    .populate('products.product', '-__v')
    .select('-__v') 
    if(!order) throw new NotFoundException('orden no encontrada')
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
