import { createContext } from 'react';
import { RegisterDto } from '../../models/register.dto';
import { Client } from '../../models/Client';

interface ContextProps {
    isLoggedIn: boolean;
    user?: Client;
    login: (email: string, password: string) => void;
    register: (dto: RegisterDto) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);