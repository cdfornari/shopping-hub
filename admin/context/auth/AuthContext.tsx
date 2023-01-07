import { createContext } from 'react';
import { RegisterDto, RegisterAdmin } from '../../models/register.dto';
import { User } from '../../models/User';

interface ContextProps {
    isLoggedIn: boolean;
    user?: User;
    login: (email: string, password: string, type: 'admin'|'stores') => void;
    registerStore: (dto: RegisterDto) => void;
    registerAdmin: (dto: RegisterAdmin) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);