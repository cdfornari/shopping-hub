import { useContext } from 'react';
import { Avatar, Dropdown } from '@nextui-org/react'
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from '../../context/auth';

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
                    color="secondary"
                >
                    <Dropdown.Item key="profile">
                        Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item key="orders">
                        Mis Órdenes
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" withDivider color="error">
                        Cerrar sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            ) : (
                <Dropdown.Menu
                    aria-label="User menu actions"
                    color="secondary"
                >
                    <Dropdown.Item key="login">
                        Iniciar Sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            )
        }
    </Dropdown>
  )
}