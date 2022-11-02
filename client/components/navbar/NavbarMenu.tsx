import { useContext } from 'react';
import { Avatar, Button, Dropdown, Link, useTheme } from '@nextui-org/react'
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from '../../context/auth';
import NextLink from 'next/link';
import { Notification } from '../../notification';

export const NavbarMenu = () => {
  const { user, logout } =useContext(AuthContext);
  const { isDark } = useTheme()
  const onLogout = () =>{
    logout()
    Notification(isDark).fire({
        icon: 'info',
        background: 'error',
        title: 'Cerrando sesión'
    })
  }
  return (
    <Dropdown placement="bottom-right">
        <Dropdown.Trigger>
            <Avatar
                bordered
                as="button"
                color="gradient"
                size="md"
                icon={<AiOutlineUser style={{color: 'white'}} />}
            />
        </Dropdown.Trigger>
        {
            user ? (
                <Dropdown.Menu
                    aria-label="User menu actions"
                >
                    <Dropdown.Item key="profile">
                        <NextLink href='/profile'>
                            <Link>
                                Mi Perfil
                            </Link>
                        </NextLink>  
                    </Dropdown.Item>
                    <Dropdown.Item key="orders">
                        <NextLink href='/orders'>
                            <Link>
                                Mis Órdenes
                            </Link>
                        </NextLink> 
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" withDivider color="error" >
                        <Button 
                            onPress={ onLogout }
                            color={"error"}
                            light
                        >
                            Cerrar sesión
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            ) : (
                <Dropdown.Menu
                    aria-label="User menu actions"
                >
                    <Dropdown.Item key="login">
                        <NextLink href='/auth/login'>
                            <Link>
                                Iniciar Sesión
                            </Link>
                        </NextLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
            )
        }
    </Dropdown>
  )
}