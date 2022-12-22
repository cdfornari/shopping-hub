import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ExchangesService } from 'src/exchanges/exchanges.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    private readonly exchangesService: ExchangesService,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto, user: User
  ) {
    const productsDB = await this.productModel.find(
      {
        _id: {
          '$in': createOrderDto.products.map(({product}) => product)
        }
      }
    )
    const products = createOrderDto.products.map((product) => {
      const productDB = productsDB.find(({_id}) => _id.toString() === product.product.toString());
      if(productDB.category === 'shoes'){
        if(!product.shoeSize) throw new BadRequestException('Talla de zapato requerida');
        if(!productDB.shoeSizes.includes(product.shoeSize)) throw new BadRequestException('Talla de zapato no disponible');
      }else{
        if(!product.size) throw new BadRequestException('Talla requerida');
        if(!productDB.sizes.includes(product.size)) throw new BadRequestException('Talla no disponible');
      }
      return {
        product: productDB,
        quantity: product.quantity,
        size: product.size,
        shoeSize: product.shoeSize
      }
    });
    let total = products.reduce((acc, {product,quantity}) => {
      return acc + product.price * quantity
    },0);
    if(createOrderDto.paymentMethod === 'pago-movil') 
    total *= await this.exchangesService.getBolivarRate();
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

  async findByUser(user: User) {
    const client = await this.clientModel.findOne({user: user.id});
    if(!client) throw new NotFoundException('Cliente no encontrado');
    try {
      const orders = await this.orderModel.find({client: client.id});
      return orders;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find();
      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id)
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
