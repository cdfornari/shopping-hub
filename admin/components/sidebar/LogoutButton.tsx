import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, useTheme } from '@nextui-org/react'
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/auth';
import { Notification } from '../../notification';

export const LogoutButton = () => {
  const { isDark } = useTheme()
  const { logout } = useContext(AuthContext)
  const { replace } = useRouter()
  return (
    <Button
      flat
      onPress={() => {
        Notification(isDark).fire({
          icon: 'info',
          title: 'Sesión cerrada',
        })
        logout()
        replace('/')
      }}
      color='error'
      icon={<FiLogOut/>}
    >
        Salir
    </Button>
  )
}