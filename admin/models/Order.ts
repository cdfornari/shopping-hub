import { Client } from './Client';
import { OrderProduct } from './OrderProduct';

export interface Order {
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

export type PaymentMethod = 'pago-movil' | 'zelle';
export const ValidPaymentMethods = ['pago-movil', 'zelle'];
export type Status = 'pending' | 'approved' | 'shipped' | 'canceled' | 'delivered';
export const ValidStatus = ['pending', 'approved', 'shipped', 'canceled', 'delivered'];