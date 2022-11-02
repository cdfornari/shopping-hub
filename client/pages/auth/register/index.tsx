import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Input, Link, Loading, Radio, Spacer, Text, useTheme } from '@nextui-org/react'
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { Box } from '../../../components/containers';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { ThemeSwitcher } from '../../../components/navbar/ThemeSwitcher';

const RegisterPage = () => {
    const {isDark} = useTheme()
    const {register} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const [dniType,setDniType] = useState('')
    const {replace} = useRouter()
    const {allowSubmit,parsedFields} = useForm([
      {
        name: 'email',
        validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
        validMessage: 'Email válido',
        errorMessage: 'Email inválido',
        initialValue: '',
      },
      {
        name: 'password',
        validate: (value: string) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        validMessage: 'Contraseña segura',
        errorMessage: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
        initialValue: '',
      },
      {
        name: 'name',
        validate: (value: string) => value.length >= 3,
        validMessage: 'Nombre válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: '',
      },
      {
        name: 'phoneNumber',
        validate: (value: string) => value.match(/^(0414|0424|0412|0416|0426)[0-9]{7}$/),
        validMessage: 'Teléfono válido',
        errorMessage: 'Teléfono inválido',
        initialValue: '',
      },
      {
        name: 'dni',
        validate: (value: string) => value.match(/^[0-9]{4,8}$/),
        validMessage: 'Documento de identidad válido',
        errorMessage: 'Documento de identidad inválido',
        initialValue: '',
      },
    ])
    const [email,password,name,phoneNumber,dni] = parsedFields;
    const handleSubmit = async() => {
        setIsLoading(true)
        Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
        })
        try {
            await register({
              email: email.value,
              password: password.value,
              fullName: name.value,
              dni: dniType + dni.value,
              phoneNumber: phoneNumber.value,
            })
            setTimeout(() => replace('/'),500)
            Notification(isDark).fire({
              title: 'Registro exitoso',
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
    return (
        <AuthLayout
          title='Regístrate'
          description='Registro de usuario'
        >
            <Card
              css={{
                width: 'fit-content',
                py: '$10',
                px: '$7',
              }}
            >
                <Card.Header
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Text h1>Regístrate</Text>
                </Card.Header>
                <Card.Body 
                  css={{
                    gap: '$17',
                    display: 'flex',
                    py: '$12',
                  }}
                >
                  <Input
                    labelPlaceholder='Nombre'
                    type='text'
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                    helperText={name.message}
                    helperColor={name.color}
                    status={name.color}
                    color={name.color}
                    size='lg'
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
                    size='lg'
                    bordered
                    clearable
                  />
                  <Input.Password
                    labelPlaceholder='Contraseña'
                    value={password.value}
                    onChange={(e) => password.setValue(e.target.value)}
                    helperText={password.message}
                    helperColor={password.color}
                    status={password.color}
                    color={password.color}
                    size='lg'
                    bordered
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
                    size='lg'
                    bordered
                    clearable
                  />
                  <Box 
                    css={{
                      mt: '-$8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                        size='lg'
                        bordered
                        clearable
                    />
                  </Box>
                  <Button
                    size='lg'
                    onPress={handleSubmit}
                    disabled={!allowSubmit || dniType === '' || isLoading }
                  >
                    {!isLoading ? 'Registrarse' : <Loading type='points' />}
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <NextLink href='/auth/login'>
                    <Link>
                      Ya tienes una cuenta?
                    </Link>
                  </NextLink>
                  <Spacer x={10.35} />
                  <ThemeSwitcher/>
                </Card.Footer>
            </Card>
        </AuthLayout>
    )
}
export default RegisterPage