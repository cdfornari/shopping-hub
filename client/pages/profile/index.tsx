import { useContext } from 'react'
import { Card, Spacer, Text, Button, Input, Loading } from '@nextui-org/react';
import { Client } from '../../models/Client'
import { Box } from '../../../admin/components/containers/Box';
import { AuthLayout } from '../../layouts/AuthLayout';
import { ThemeSwitcher } from '../../components/navbar/ThemeSwitcher';
import { AuthContext } from '../../context/auth';
import ClientProfile from '../../../admin/components/profiles/ClientProfile';

export const ProfilePage = () => {
  const {user} = useContext(AuthContext)
  return (
    <AuthLayout
      title="Perfil"
      description="Profile"
    >
        <ClientProfile user={user} title={'Mi Perfil'}>
        </ClientProfile>
    </AuthLayout>
  )
}

export default ProfilePage
