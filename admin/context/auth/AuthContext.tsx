import { createContext } from 'react';
import { RegisterDto } from '../../dtos/register.dto';
import { User } from '../../models/User';

interface ContextProps {
    isLoggedIn: boolean;
    user?: User;
    login: (email: string, password: string, type: 'admin'|'stores') => void;
    registerStore: (dto: RegisterDto) => void;
    registerAdmin: (dto: RegisterDto) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);