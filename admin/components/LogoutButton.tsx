import { useContext } from 'react';
import { Button } from '@nextui-org/react'
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext)
  const { replace } = useRouter()
  return (
    <Button
      flat
      onPress={() => {
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