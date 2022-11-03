import { Text } from "@nextui-org/react"
import ClientProfile from "../../../components/profiles/ClientProfile"
import { DashboardLayout } from "../../../layouts"

const ProfilePage = () => {

    return (
      <DashboardLayout 
        title='Perfil'
        description='Pagina administrativa de Tienda'
      >
        <Text h1>Perfil</Text>
            
      </DashboardLayout>
    )
  }
  
  export default ProfilePage