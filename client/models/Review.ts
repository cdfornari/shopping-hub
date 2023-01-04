import { Client } from './Client';

export interface Review {
    rating: number;
    comment: string;
    client: Client
}