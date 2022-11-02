import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangesService } from './exchanges.service';

@Module({
  imports: [HttpModule],
  providers: [ExchangesService],
  exports: [ExchangesService]
})
export class ExchangesModule {}
