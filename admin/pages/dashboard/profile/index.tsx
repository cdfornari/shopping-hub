import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Grid, Image, Input, Spacer, Text, Badge, Col } from '@nextui-org/react';
import { FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Store } from '../../../models/Store';
import { AuthContext } from '../../../context/auth';
import StoreProfile from '../../../components/profiles/StoreProfile';

const ProfilePage = () => {
    const {user} = useContext(AuthContext)
    return (
      <DashboardLayout 
        title='Perfil'
        description='Pagina administrativa de Tienda'
      >
        {
          user?.role === "STORE" 
          ?  <StoreProfile user={user}>
             </StoreProfile>
          : <></>
        }
      </DashboardLayout>
    )
  }
  
  export default ProfilePage