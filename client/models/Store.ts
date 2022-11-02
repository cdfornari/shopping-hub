import { User } from './User';

export interface Store {
    _id: string;
    name: string;
    logo: string;
    user: User;
    rif: string;
    phoneNumber: string;
}