import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { ClientsService } from 'src/clients/clients.service';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly clientsService: ClientsService,
    private readonly ordersService: OrdersService,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User) {
    const order = await this.ordersService.findOne(createReviewDto.orderId)
    if(!order) throw new BadRequestException('orden no encontrada')
    if(order.client.user !== user.id) throw new BadRequestException('no puedes calificar esta orden')
    if(order.status !== 'delivered') throw new BadRequestException('no puedes calificar este producto')
    const product = await this.productsService.findOne(createReviewDto.productId)
    if(!product) throw new BadRequestException('producto no encontrado')
    const client = await this.clientsService.findByUser(user)
    if(!client) throw new BadRequestException('cliente no encontrado')
    const review = await this.reviewModel.create({
      ...createReviewDto,
      client: client.id,
    })
    product.reviews.push(review.id)
    order.products = order.products.map(p => {
      if(p.product.id === product.id) 
        p.isReviewed = true;
      return p;
    })
    await Promise.all([order.save(), product.save()])
    return review;
  } 

}
