import { Button } from '@nextui-org/react'
import { FiLogOut } from 'react-icons/fi';

export const LogoutButton = () => {
  return (
    <Button

      color='error'
      flat
      icon={<FiLogOut/>}
    >
        Salir
    </Button>
  )
}