export interface User extends UserProps {
    name?: string;
    logo?: string;
    rif?: string;
    phoneNumber?: string;
}

export interface UserProps {
    _id: string;
    email: string;
    role: ValidRoles;
    isActive: boolean;
}

export type ValidRoles = 'ADMIN' | 'STORE' | 'SUPER-ADMIN';