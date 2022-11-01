import { CartProduct } from './cart-product';
import { Client } from './Client';

export interface Order {
    address: string;
    state: string;
    city: string;
    paymentMethod: PaymentMethod;
    status: Status;
    refCode: string;
    total: number;
    products: CartProduct[];
    client: Client;
}

export type PaymentMethod = 'pago-movil' | 'zelle';
export const ValidPaymentMethods = ['pago-movil', 'zelle'];
export type Status = 'pending' | 'approved' | 'shipped' | 'canceled' | 'delivered';
export const ValidStatus = ['pending', 'approved', 'shipped', 'canceled', 'delivered'];