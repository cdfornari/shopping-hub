import { Client } from './Client';
import { PaymentMethod, Status } from './Order';
import { OrderProduct } from './OrderProduct';

export interface Order {
    _id: string;
    address: string;
    state: string;
    city: string;
    paymentMethod: PaymentMethod;
    status: Status;
    refCode: string;
    total: number;
    products: OrderProduct[];
    client: Client;
}