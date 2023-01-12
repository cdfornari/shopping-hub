import { Container, Text } from '@nextui-org/react'
import { DashboardLayout } from '../../layouts'

const DashboardPage = () => {
  return (
    <DashboardLayout
      title='Dashboard'
      description='Pagina administrativa'
    >
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '50px'}}>
        <Text h1>Bienvenido al Dashboard</Text>
      </div>
    </DashboardLayout>
  )
}
export default DashboardPage