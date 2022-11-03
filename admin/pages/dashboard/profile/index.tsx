import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Store } from '../../../models/Store';
import StoreProfile from '../../../components/profiles/StoreProfile';

interface Props {
  store: Store;
}

const ProfilePage: NextPage<Props> = ({store}) => {
    return (
      <DashboardLayout 
        title='Perfil'
        description='Pagina administrativa de Tienda'
      >
        {
          store.user.role === "STORE" 
          ?  <StoreProfile store={store}/>
          : <></>
        }
      </DashboardLayout>
    )
}

  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.req.cookies;

    try {
      const {data: store} = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stores/current`,
        {
          headers: { 
            Cookie: `token=${token};`, 
            Authorization: `Bearer ${token}`
          },
        }
      );
      return {
        props: {
          store,
        }
      }
    } catch (error) {
      return{
        redirect: {
          destination: '/auth/store/login',
          permanent: false
        }
      }
    }

  }
  
  export default ProfilePage