import { ValidRoles } from '../types/valid-roles.type';

export interface IUser {
    _id: string;
    email: string;
    password: string;
    role: ValidRoles;
    isActive: boolean
}
