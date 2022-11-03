import { Controller, Get } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';

@Controller('exchanges')
export class ExchangesController{

    constructor(
        private readonly exchangesService: ExchangesService
    ){}

    @Get('bolivar')
    async getBolivarRate() {
        return await this.exchangesService.getBolivarRate();
    }

}