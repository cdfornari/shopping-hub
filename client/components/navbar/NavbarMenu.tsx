import { useContext } from 'react';
import { Avatar, Dropdown, Link } from '@nextui-org/react'
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from '../../context/auth';
import NextLink from 'next/link';

export const NavbarMenu = () => {
  const { user } =useContext(AuthContext);
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
                                Iniciar Sesión
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
                    <Dropdown.Item key="logout" withDivider color="error">
                        Cerrar sesión
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