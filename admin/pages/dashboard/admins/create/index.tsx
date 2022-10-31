import { Button, Card, Container, Input, Link, Loading, Spacer, Text, useTheme } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import { Box } from '../../../../components/containers'
import { useForm } from '../../../../hooks/useForm'
import { DashboardLayout } from '../../../../layouts'
import { AuthLayout } from '../../../../layouts/AuthLayout';
import { Notification } from '../../../../notification'
import NextLink from 'next/link'
import { ThemeSwitcher } from '../../../../components/ThemeSwitcher'
import { AuthContext } from '../../../../context/auth'
import { useRouter } from 'next/router'

export const AdminCreatePage = () => {
  
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
    ]);

    const {isDark} = useTheme();
    const [email,password] = parsedFields;
    const [isLoading,setIsLoading] = useState(false)
    const {registerAdmin} = useContext(AuthContext);
    const {replace} = useRouter();

    const handleSubmit = async() => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',

        })
        try {
            await registerAdmin({
                email: email.value,
                password: password.value,
            })
            setTimeout(() => replace('/'),500)
            Notification(isDark).fire({
                title: 'Tu tienda se registró correctamente, espera aprobación de los administradores',
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
    <DashboardLayout 
    title='Tiendas'
    description='Pagina administrativa de Tienda'
>
    <Text h1>Órdenes</Text>
        <Container css={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <Card
                css={{
                    py: '$10',
                    px: '$7',
                    mw: '500px'
                }}
            >
                <Card.Header
                    css={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Text h2>Registra un administrador</Text>
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
                        disabled={!allowSubmit}
                    >
                        {!isLoading ? 'Registrarse' : <Loading type='points' />}
                    </Button>
                </Card.Body>
                <Card.Footer css={{display: 'flex', jc: 'center', ai: 'center'}}>
                    <ThemeSwitcher/>
                </Card.Footer>
            </Card>
        </Container>
</DashboardLayout>
  )
}

export default AdminCreatePage
