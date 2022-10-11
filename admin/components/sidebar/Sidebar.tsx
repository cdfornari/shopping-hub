import React, { useState } from 'react';
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

export const SidebarWrapper = () => {
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
         { collapsed && <Sidebar.Overlay onClick={()=>setCollapsed(prev => !prev)}/>}

         <Sidebar collapsed={collapsed}>

            <Flex
               direction='column'
               justify='between'
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Inicio"
                     isActive={router.pathname === '/'}
                     href="/"
                     icon={<AiTwotoneHome/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/products'}
                     title="Productos"
                     href="products"
                     icon={<FaShoppingCart/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/orders'}
                     title="Órdenes"
                     href="orders"
                     icon={<AiTwotoneShopping/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/clients'}
                     title="Clientes"
                     href="clients"
                     icon={<BsFillPeopleFill/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/brands'}
                     title="Marcas"
                     href="brands"
                     icon={<AiTwotoneShop/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/admins'}
                     title="Administradores"
                     href="admins"
                     icon={<RiAdminFill/>}
                  />
                  <SidebarItem
                     isActive={router.pathname === '/profile'}
                     title="Perfil"
                     href="profile"
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
