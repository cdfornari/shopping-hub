import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class ExchangesService {

  constructor(private readonly httpService: HttpService) {}
  
  async getBolivarRate(): Promise<number>{
    try {
      const {data} = await firstValueFrom(
        this.httpService.get<
          {currency: string, exchange: number}[]
        >(
          'https://bcv-api.deno.dev/v1/exchange'
        )
      )
      return data[0].exchange;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

}
