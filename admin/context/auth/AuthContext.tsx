import { createContext } from 'react';
import { RegisterDto } from '../../dtos/register.dto';

interface ContextProps {
    isLoggedIn: boolean;
    user?: any;
    login: (email: string, password: string, type: 'admin'|'store') => void;
    registerStore: (dto: RegisterDto) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);