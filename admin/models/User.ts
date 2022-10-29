export interface User {
    user: UserProps;
}

export interface UserProps {
    _id: string;
    email: string;
    role: string;
    isActive: boolean;
}