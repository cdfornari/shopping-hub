import { FC, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Client } from '../../models/Client';
import { api } from '../../api/api';
import { authReducer,AuthContext } from './';
import { RegisterDto } from '../../dtos/register.dto';

export interface AuthState {
    isLoggedIn: boolean;
    user?: Client;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
    const [state,dispatch] = useReducer(authReducer, initialState);
    const validateToken = async () => {
        if(!Cookies.get('token')) return;
        try {
            const { data } = await api.post<{client: Client, token: string}>(
                '/clients/renew',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }
            )
            const { token,client } = data;
            Cookies.set('token', token, { expires: 7 })
            dispatch({
                type: '[AUTH] Login',
                payload: client
            });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    const login = async(email: string, password: string) => {
        try {
            const { data } = await api.post<{client: Client, token: string}>(
                '/clients/login', {email, password}
            );
            const { token,client } = data;
            Cookies.set('token', token, { expires: 7 });
            dispatch({
                type: '[AUTH] Login',
                payload: client
            });
        } catch (error) {
            console.log(error);
        }
    }
    const register = async(
        {fullName, email, password,dni,phoneNumber}: RegisterDto
    ) => {
        try {
            const { data } = await api.post<{token: string}>(
                '/clients/register', 
                {fullName, email, password, dni, phoneNumber}
            );
            const { token } = data;
            Cookies.set('token', token, { expires: 7 });
         } catch (error) {
            console.log(error)
        }
    }
    const logout = () => {
        Cookies.remove('token');
        dispatch({
            type: '[AUTH] Logout'
        });
    }
    useEffect(() => {
        validateToken();
    }, [])
    return (
        <AuthContext.Provider value={{...state,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
};