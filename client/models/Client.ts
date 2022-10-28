import { Role } from '../types/Role';

export interface Client{
    _id: string;
    fullName: string;
    user:{
        _id: string;
        email: string;
        isActive: boolean;
        role: Role;
    },
    dni: string;
    phoneNumber: string;
}