export interface Client{
    _id: string;
    fullName: string;
    user:{
        _id: string;
        email: string;
        isActive: boolean;
        role: 'CLIENT';
    },
    dni: string;
    phoneNumber: string;
}