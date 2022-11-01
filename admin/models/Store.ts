import { UserProps } from './User';

export interface Store {
    _id: string;
    name: string;
    logo: string;
    user: UserProps;
    rif: string;
    phoneNumber: string;
}