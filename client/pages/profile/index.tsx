import { useMemo, useState, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Button, Card, Input, Loading, Modal, Radio, Text, useModal, useTheme } from '@nextui-org/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box } from '../../components/containers';
import { ShopLayout } from '../../layouts/ShopLayout';
import { Client } from '../../models/Client';
import { useForm } from '../../hooks/useForm';
import { Notification } from '../../notification';
import { api } from '../../api/api';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';

interface Props {
  client: Client;
}

export const ProfilePage: NextPage<Props> = ({client}) => {
  const {isDark} = useTheme()
  const { setVisible, bindings } = useModal();
  const {replace} = useRouter()
  const {logout} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const [dniType,setDniType] = useState(client.dni[0])
  const {allowSubmit,parsedFields} = useForm([
    {
      name: 'email',
      validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
      validMessage: 'Email válido',
      errorMessage: 'Email inválido',
      initialValue: client.user.email,
    },
    {
      name: 'name',
      validate: (value: string) => value.length >= 3,
      validMessage: 'Nombre válido',
      errorMessage: 'Mínimo 3 caracteres',
      initialValue: client.fullName,
    },
    {
      name: 'phoneNumber',
      validate: (value: string) => value.match(/^(0414|0424|0412|0416|0426)[0-9]{7}$/),
      validMessage: 'Teléfono válido',
      errorMessage: 'Teléfono inválido',
      initialValue: client.phoneNumber,
    },
    {
      name: 'dni',
      validate: (value: string) => value.match(/^[0-9]{4,8}$/),
      validMessage: 'Documento de identidad válido',
      errorMessage: 'Documento de identidad inválido',
      initialValue: client.dni.slice(1),
    },
    {
      name: 'password',
      validate: (value: string) => 
      value === '' || value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      validMessage: 'Contraseña segura',
      errorMessage: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
      initialValue: '',
    },
  ])
  const [email,name,phoneNumber,dni,password] = parsedFields;
  const infoChanged = useMemo(() => {
    return email.value !== client.user.email ||
      name.value !== client.fullName ||
      phoneNumber.value !== client.phoneNumber ||
      dni.value !== client.dni.slice(1) ||
      dniType !== client.dni[0]
  }, [email.value,name.value,phoneNumber.value,dni.value,dniType])
  const handleSubmit = async() => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await api.patch('/clients/update', 
        {
          email: email.value === client.user.email ? null : email.value,
          fullName: name.value === client.fullName ? null : name.value,
          dni: dniType + dni.value === client.dni ? null : dniType + dni.value,
          phoneNumber: phoneNumber.value === client.phoneNumber ? null : phoneNumber.value,
          password: password.value === '' ? null : password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      Notification(isDark).fire({
        title: 'Perfil actualizado',
        icon: 'success',
        timer: 5000,
      })
      setIsLoading(false)
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
      })
      setIsLoading(false)
    }
  }
  const onDeactivate = async() => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await api.delete(`/clients/${client._id}`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      )
      Notification(isDark).fire({
        title: 'Cuenta desactivada',
        icon: 'success',
        timer: 5000,
      })
      logout();
      setIsLoading(false)
      replace('/')
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
      })
      setIsLoading(false)
    }
  }
  return (
    <ShopLayout
      title="Perfil"
      description="Profile"
    >
      <Modal {...bindings}>
        <Modal.Header>
          {
            <Text id='modal-title'>
              Estas seguro de querer desactivar tu cuenta?
            </Text>
          }
        </Modal.Header>
        <Modal.Footer>
          <Button
            flat
            color='success'
            size='sm'
            onClick={() => setVisible(false)}
          >
            Salir
          </Button>
          <Button
            flat
            color='error'
            size='sm'
            onClick={onDeactivate}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Box
        css={{
          width: '100%',
          mt: '$10',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          variant='bordered'
          css={{
            width: 'fit-content',
            minWidth: '400px',
            py: '$15',
            px: '$10',
          }}
        >
          <Card.Header
            css={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text h1>Mi Perfil</Text>
          </Card.Header>
          <Card.Body
            css={{
              gap: '$17',
              display: 'flex',
              py: '$10',
            }}
          >
            {
              client ? (
                <>
                  <Input
                    labelPlaceholder='Nombre'
                    type='text'
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                    helperText={name.message}
                    helperColor={name.color}
                    status={name.color}
                    color={name.color}
                    bordered
                    clearable
                  />
                  <Input
                    labelPlaceholder='Email'
                    type='email'
                    value={email.value}
                    onChange={(e) => email.setValue(e.target.value)}
                    helperText={email.message}
                    helperColor={email.color}
                    status={email.color}
                    color={email.color}
                    bordered
                    clearable
                  />
                  <Input
                    labelPlaceholder='Número de teléfono'
                    type='tel'
                    maxLength={11}
                    value={phoneNumber.value}
                    onChange={(e) => phoneNumber.setValue(e.target.value)}
                    helperText={phoneNumber.message}
                    helperColor={phoneNumber.color}
                    status={phoneNumber.color}
                    color={phoneNumber.color}
                    bordered
                    clearable
                  />
                  <Box 
                    css={{
                      mt: '-$6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '$10',
                    }}
                  >
                    <Radio.Group 
                      value={dniType}
                      onChange={setDniType}
                      orientation="horizontal"
                      size='xs'
                    >
                      <Radio value="V">V</Radio>
                      <Radio value="J">J</Radio>
                      <Radio value="E">E</Radio>
                      <Radio value="P">P</Radio>
                    </Radio.Group>
                    <Input
                      labelPlaceholder='Documento de identidad'
                      type='text'
                      maxLength={9}
                      value={dni.value}
                      onChange={(e) => dni.setValue(e.target.value)}
                      helperText={dni.message}
                      helperColor={dni.color}
                      status={dni.color}
                      color={dni.color}
                      bordered
                      clearable
                    />
                  </Box>
                  <Input.Password
                    labelPlaceholder='Nueva Contraseña'
                    value={password.value}
                    onChange={(e) => password.setValue(e.target.value)}
                    helperText={password.message}
                    helperColor={password.color}
                    status={password.color}
                    color={password.color}
                    bordered
                  />
                  <Box
                    css={{
                      d: 'flex',
                      fd: 'column',
                      gap: '$10',
                    }}
                  >
                    <Button
                      onPress={handleSubmit}
                      disabled={!allowSubmit || (!infoChanged && password.value === '') || isLoading }
                    >
                      {!isLoading ? 'Actualizar' : <Loading type='points' />}
                    </Button>
                    <Button
                      flat
                      color='error'
                      onPress={() => setVisible(true)}
                      disabled={isLoading }
                    >
                      {!isLoading ? 'Desactivar cuenta' : <Loading type='points' />}
                    </Button>
                  </Box>
                </>
              ) : (
                <Loading/>
              )
            }
          </Card.Body>
        </Card>
      </Box>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  const {data: client} = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/clients/current`,
    {
      headers: { 
        Cookie: `token=${token};`, 
        Authorization: `Bearer ${token}`
      },
    }
  );
  
  if (!client) {
    return{
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      client,
    }
  }
}

export default ProfilePage
