import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExchangesController],
  providers: [ExchangesService],
  exports: [ExchangesService]
})
export class ExchangesModule {}
