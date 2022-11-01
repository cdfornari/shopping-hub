import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Input, Link, Loading, Spacer, Text, useTheme } from '@nextui-org/react'
import { AuthLayout } from '../../../layouts/AuthLayout'
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { ThemeSwitcher } from '../../../components/navbar/ThemeSwitcher';

const LoginPage = () => {
    const {isDark} = useTheme()
    const {replace} = useRouter()
    const {login} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
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
    ])
    const [email,password] = parsedFields;
    const handleSubmit = async() => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',

        })
        try {
            await login(email.value,password.value)
            setTimeout(() => replace('/dashboard'),500)
            Notification(isDark).fire({
                title: 'Sesión iniciada',
                icon: 'success',
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
            title='Login'
            description='Login page'
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
                    <Text h1>Iniciar Sesión</Text>
                </Card.Header>
                <Card.Body css={{
                    gap: '$17',
                    display: 'flex',
                    py: '$12',
                }}>
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
                    <Button
                        size='lg'
                        onPress={handleSubmit}
                        css={{
                            mt: '$5',
                        }}
                        disabled={!allowSubmit || isLoading}
                    >
                        {!isLoading ? 'Iniciar Sesión' : <Loading type='points' />}
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <NextLink href='/auth/register'>
                        <Link>
                            No tienes cuenta? Regístrate aquí
                        </Link>
                    </NextLink>
                    <Spacer x={6} />
                    <ThemeSwitcher/>
                </Card.Footer>
            </Card>
        </AuthLayout>
    )
}
export default LoginPage