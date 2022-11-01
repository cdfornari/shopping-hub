import { FC, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '../../api/api';
import { authReducer,AuthContext } from './';
import { User } from '../../models/User';
import { RegisterDto } from '../../dtos/register.dto';

export interface AuthState {
    isLoggedIn: boolean;
    user?: User;
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
            const { data } = await api.post<{user: User, token: string}>(
                '/admin/renew',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }
            )
            const { token,user } = data;
            Cookies.set('token', token, { expires: 7 });
            dispatch({
                type: '[AUTH] Login',
                payload: user
            });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    const login = async(email: string, password: string, type: 'stores'|'admin') => {
        const { data } = await api.post<{user: User, token: string}>(
            `/${type}/login`, {email, password}
        );
        const { token,user } = data;
        Cookies.set('token', token, { expires: 7 });
        dispatch({
            type: '[AUTH] Login',
            payload: user
        });
    }
    const registerStore = async(
        {email,logo,name,password,phoneNumber,rif}: RegisterDto
    ) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('image', logo);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('phoneNumber', phoneNumber);
        formData.append('rif', rif);
        await api.post<void>(
            '/stores/register',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    const registerAdmin = async(
        {email,password}: RegisterDto
    ) => {
        await api.post<void>(
            '/admin/create',
            {email: email, password: password},
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        );
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
        <AuthContext.Provider value={{...state,login,registerStore, registerAdmin, logout}}>
            {children}
        </AuthContext.Provider>
    )
};