import { IsIn, IsString } from 'class-validator';
import { Status,ValidStatus } from '../types/status';

export class UpdateOrderDto {

    @IsString()
    @IsIn(ValidStatus)
    status: Status;

}
