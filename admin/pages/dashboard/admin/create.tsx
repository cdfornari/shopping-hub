import React, { useContext, useState } from 'react'
import { Button, Card, Container, Input, Loading, Text, useTheme } from '@nextui-org/react'
import { useForm } from '../../../hooks/useForm'
import { DashboardLayout } from '../../../layouts'
import { Notification } from '../../../notification'
import { AuthContext } from '../../../context/auth'
import { useRouter } from 'next/router'

export const CreateAdminPage = () => {
  
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
                password: password.value
            });
            setTimeout(() => replace('/dashboard/admin'),500)
            Notification(isDark).fire({
                title: 'El administrador se registró correctamente',
                icon: 'success',
                timer: 5000,
            })
            setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.response.data.message,
                icon: 'error',
            })
            console.log('error', error.response.data.message);
            setIsLoading(false)
        }
    }

    return (
        <DashboardLayout 
            title='Administradores'
            description='Pagina administrativa de Administradores'
        >
            <Container css={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <Card
                    css={{
                        py: '$10',
                        px: '$7',
                        mw: '600px'
                    }}
                >
                    <Card.Header
                        css={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Text h1>Registra un administrador</Text>
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
                </Card>
            </Container>
        </DashboardLayout>
    )
}

export default CreateAdminPage
