import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Button, Card, Input, Link, Loading, Radio, Spacer, Text, useTheme } from '@nextui-org/react'
import { AuthLayout } from '../../../layouts'
import { ThemeSwitcher } from '../../../components/ThemeSwitcher';
import { AuthContext } from '../../../context/auth';
import { useForm } from '../../../hooks/useForm';
import { Notification } from '../../../notification';
import { Box } from '../../../components/containers';

const RegisterPage = () => {
    const {isDark} = useTheme()
    const {registerStore} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const [rifType,setRifType] = useState('')
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
            name: 'rif',
            validate: (value: string) => value.match(/^[0-9]{8}[-][0-9]{1}$/),
            validMessage: 'Rif válido',
            errorMessage: '12345678-9',
            initialValue: '',
        },

    ])
    const [email,password,name,phoneNumber,rif] = parsedFields;
    const handleSubmit = async() => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',

        })
        try {
            await registerStore({
                email: email.value,
                password: password.value,
                name: name.value,
                rif: rifType + '-' + rif.value,
                logo: '',
                phoneNumber: '',
            })
            Notification(isDark).fire({
                title: 'Tu tienda se registró correctamente, espera aprobación de los administradores',
                icon: 'success',
            })
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.response.data.message,
                icon: 'error',
            })
        }
        setIsLoading(false)
    }
    return (
        <AuthLayout
            title='Registra tu tienda'
            description='Registro de tienda'
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
                    <Text h1>Registra tu tienda</Text>
                </Card.Header>
                <Card.Body css={{
                    gap: '$17',
                    display: 'flex',
                    py: '$12',
                }}>
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
                            value={rifType}
                            onChange={setRifType}
                            orientation="horizontal"
                            size='xs'
                        >
                            <Radio value="J">J</Radio>
                            <Radio value="G">G</Radio>
                            <Radio value="V">V</Radio>
                            <Radio value="E">E</Radio>
                            <Radio value="P">P</Radio>
                        </Radio.Group>
                        <Input
                            labelPlaceholder='Rif'
                            type='text'
                            value={rif.value}
                            onChange={(e) => rif.setValue(e.target.value)}
                            helperText={rif.message}
                            helperColor={rif.color}
                            status={rif.color}
                            color={rif.color}
                            size='lg'
                            bordered
                            clearable
                        />
                    </Box>
                    <Input
                        type='file'
                        label='Logo'
                        css={{
                            my: '-$12',
                        }}
                    />
                    <Button
                        size='lg'
                        onPress={handleSubmit}
                        css={{
                            mt: '$5',
                        }}
                        disabled={!allowSubmit || rifType === '' || isLoading}
                    >
                        {!isLoading ? 'Registrarse' : <Loading type='points' />}
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <NextLink href='/auth/store/login' passHref prefetch>
                        <Link>
                            Ya tienes una tienda?
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