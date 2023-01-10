import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReqUser } from 'src/auth/decorators/req-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ParseMongoIdPipe } from 'src/common/pipes/ParseMongoIdPipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @Auth('CLIENT')
  create(
    @Body() createOrderDto: CreateOrderDto,
    @ReqUser() user: User
  ) {
    return this.ordersService.create(
      createOrderDto,user
    );
  }

  @Get('my-orders')
  @Auth('CLIENT')
  findMyOrders(
    @ReqUser() user: User, 
  ) {
    return this.ordersService.findByUser(user);
  }

  @Get()
  @Auth('SUPER-ADMIN','ADMIN')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Auth('SUPER-ADMIN','ADMIN','CLIENT')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @Auth('SUPER-ADMIN','ADMIN')
  nextStep(@Param('id', ParseMongoIdPipe) id: string) {
    return this.ordersService.nextStep(id);
  }

  @Patch('cancel/:id')
  @Auth('SUPER-ADMIN','ADMIN')
  cancel(@Param('id', ParseMongoIdPipe) id: string) {
    return this.ordersService.cancel(id);
  }

}
