import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { Box, Flex } from '../containers';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { AiTwotoneHome,AiTwotoneShop,AiTwotoneShopping } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillPeopleFill,BsFillPersonFill } from 'react-icons/bs';
import { RiAdminFill } from 'react-icons/ri';
import { LogoutButton } from '../LogoutButton';
import { AuthContext } from '../../context/auth';

export const SidebarWrapper = () => {
   const {user} = useContext(AuthContext);
   const router = useRouter();
   const [collapsed,setCollapsed] = useState(false)

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 1000,
            position: 'sticky',
            top: '0',
            boxSizing: 'border-box'
         }}
      >
         {collapsed && <Sidebar.Overlay onClick={()=>setCollapsed(prev => !prev)}/>}

         <Sidebar collapsed={collapsed}>
            <Flex
               direction='column'
               justify='between'
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Inicio"
                     isActive={router.pathname === '/dashboard'}
                     href="/dashboard"
                     icon={<AiTwotoneHome/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/dashboard/products'}
                     title="Productos"
                     href="/dashboard/products"
                     icon={<FaShoppingCart/>}
                  />
                  {
                     user?.role === 'ADMIN' || user?.role === 'SUPER-ADMIN' && (
                        <>
                           <SidebarItem
                              isActive={router.pathname === '/dashboard/orders'}
                              title="Órdenes"
                              href="/dashboard/orders"
                              icon={<AiTwotoneShopping/>}
                           />
                           <SidebarItem
                              isActive={router.pathname === '/dashboard/clients'}
                              title="Clientes"
                              href="/dashboard/clients"
                              icon={<BsFillPeopleFill/>}
                           />
                           <SidebarItem
                              isActive={router.pathname === '/dashboard/stores'}
                              title="Tiendas"
                              href="/dashboard/stores"
                              icon={<AiTwotoneShop/>}
                           />
                        </>
                     )
                  } 
                  {
                     user?.role === 'SUPER-ADMIN' && (
                        <SidebarItem
                           isActive={router.pathname === '/dashboard/admin'}
                           title="Administradores"
                           href="/dashboard/admin"
                           icon={<RiAdminFill/>}
                        />
                     )
                  }
                  <SidebarItem
                     isActive={router.pathname === '/dashboard/profile'}
                     title="Perfil"
                     href="/dashboard/profile"
                     icon={<BsFillPersonFill/>}
                  />
               </Sidebar.Body>
               <Sidebar.Footer>
                  <ThemeSwitcher/>
                  <LogoutButton/>
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
