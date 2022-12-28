import { FC, useContext, useMemo, useRef, useState } from 'react'
import { Badge, Button, Card, Grid, Input, Loading, Modal, Radio, Row, Spacer, Text, useModal, useTheme } from '@nextui-org/react'
import { useForm } from '../../hooks/useForm'
import { Store } from '../../models/Store'
import { Box } from '../containers'
import { Notification } from '../../notification'
import { api } from '../../api/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth'

interface Props {
  store: Store,
}

export const StoreProfile: FC<Props> = ({store}) => {
  const {isDark} = useTheme()
  const { setVisible, bindings } = useModal();
  const router = useRouter()
  const {logout} = useContext(AuthContext)
  const [file,setFile] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading,setIsLoading] = useState(false)
  const [rifType,setRifType] = useState(store.rif[0])
  const {allowSubmit,parsedFields} = useForm([
    {
      name: 'email',
      validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
      validMessage: 'Email válido',
      errorMessage: 'Email inválido',
      initialValue: store.user.email,
    },
    {
      name: 'password',
      validate: (value: string) => 
      value === '' || value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      validMessage: 'Contraseña segura',
      errorMessage: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
      initialValue: '',
    },
    {
      name: 'name',
      validate: (value: string) => value.length >= 3,
      validMessage: 'Nombre válido',
      errorMessage: 'Mínimo 3 caracteres',
      initialValue: store.name,
    },
    {
      name: 'phoneNumber',
      validate: (value: string) => value.match(/^(0414|0424|0412|0416|0426)[0-9]{7}$/),
      validMessage: 'Teléfono válido',
      errorMessage: 'Teléfono inválido',
      initialValue: store.phoneNumber,
    },
    {
      name: 'rif',
      validate: (value: string) => value.match(/^[0-9]{8}[-][0-9]{1}$/),
      validMessage: 'Rif válido',
      errorMessage: '12345678-9',
      initialValue: store.rif.slice(2),
    },
  ])
  const [email,password,name,phoneNumber,rif] = parsedFields;
  const infoChanged = useMemo(() => {
    return email.value !== store.user.email ||
      name.value !== store.name ||
      phoneNumber.value !== store.phoneNumber ||
      rif.value !== store.rif.slice(2) ||
      rifType !== store.rif[0]
  }, [email.value,name.value,phoneNumber.value,rif.value,rifType,store])
  const handleSubmit = async() => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      if(file){
        const formData = new FormData();
        formData.append('image',file);
        await api.patch('/stores/change-logo',formData,{
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        Notification(isDark).fire({
          title: 'Logo actualizado',
          icon: 'success',
          timer: 5000,
        })
        setFile(null)
      }
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
      })
    }
    try {
      if(infoChanged){
        await api.patch('/stores/update', 
          {
            email: email.value === store.user.email ? null : email.value,
            name: name.value === store.name ? null : name.value,
            rif: rifType + '-' + rif.value === store.rif ? null : rifType + '-' + rif.value,
            phoneNumber: phoneNumber.value === store.phoneNumber ? null : phoneNumber.value,
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
      }
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
      })
    }
    setIsLoading(false)
    router.replace(router.asPath)
  }
  const onDeactivate = async() => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await api.delete(`/stores/${store._id}`, 
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
      router.replace('/')
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.response.data.message,
        icon: 'error',
      })
      setIsLoading(false)
    }
  }
  return (
    <>
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
      <Text h1>Perfil de Tienda</Text>
      <Grid.Container gap={2} justify="center" >
        <Grid 
          alignContent='space-between' 
          alignItems='center'
          direction='column'
          css={{gap: '$8'}}
          xs={12} 
          sm={7}
        >
          <Card isHoverable>
            <Card.Divider />
            <Card.Image 
              src={store.logo}
              objectFit="cover"
              width="absolute"
              height={340}
              alt="Card image background"
            />
          </Card>
          <Row
            css={{
              d: 'flex',
              justifyContent: 'center',
              gap: '$8',
            }}
          >
            <input
              type='file'
              ref={fileInputRef}
              onChange={e => setFile(e.target.files?.[0])}
              accept='image/*'
              style={{
                display: 'none'
              }}
            />
            <Button
              flat
              onPress={() => fileInputRef.current?.click()}
              color={file ? 'success' : 'primary'}
            >
              Cambia la imagen
            </Button>
            <Button
              flat
              disabled={!allowSubmit || (!infoChanged && password.value === '' && !file) || isLoading}
              onClick={handleSubmit}
            >
              {!isLoading ? 'Actualizar' : <Loading type='points' />}
            </Button> 
            <Button
              flat
              color='error'
              onPress={() => setVisible(true)}
              disabled={isLoading}
            >
              {!isLoading ? 'Desactivar cuenta' : <Loading type='points' />}
            </Button>
          </Row>
        </Grid>

        <Grid xs={12} sm={ 5 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            value={name.value}
            onChange={(e) => name.setValue(e.target.value)}
            helperText={name.message}
            helperColor={name.color}
            status={name.color}
            color={name.color}
            fullWidth
            bordered
          />
          <Spacer y={3} />
          
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
              maxLength={10}
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

          <Spacer y={2.5} />

          <Input
            labelPlaceholder='Telefono'
            value={phoneNumber.value}
            onChange={(e) => phoneNumber.setValue(e.target.value)}
            helperText={phoneNumber.message}
            helperColor={phoneNumber.color}
            status={phoneNumber.color}
            color={phoneNumber.color}
            fullWidth
            bordered
          />
          <Spacer y={2.5} />

          <Input
            labelPlaceholder='Correo'
            value={email.value}
            onChange={(e) => email.setValue(e.target.value)}
            helperText={email.message}
            helperColor={email.color}
            status={email.color}
            color={email.color}
            fullWidth
            bordered
            type='email'
          />
          <Spacer y={2.5} />

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
          <Spacer y={2} />

          <Badge 
            color={store.user.isActive ? 'success' : 'error'}
            variant='bordered'
            css={{width: "100%", height: "100%"}}
          >
            {store.user.isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default StoreProfile
