import { Navbar, Spacer } from '@nextui-org/react'
import { CartButton } from './CartButton'
import { NavbarMenu } from './NavbarMenu'
import { SearchBar } from './SearchBar'
import { ThemeSwitcher } from './ThemeSwitcher'

export const NavbarWrapper = () => {
  return (
    <Navbar
        variant='sticky'
        maxWidth='fluid'
        //shouldHideOnScroll
        isBordered
        css={{
            overflow: 'hidden'
        }}
    >
        <Navbar.Toggle
            showIn='xs'
        /> 
        <Navbar.Brand>
            
        </Navbar.Brand>
        <Navbar.Content
            hideIn='xs'
        >
            <Spacer x={7.5}/>
            <Navbar.Item>
                <SearchBar/>
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Content
            hideIn='xs'
            gap={30}
        >
            <Navbar.Item>
                <ThemeSwitcher/>
            </Navbar.Item>
            <Navbar.Item>
                <CartButton/>
            </Navbar.Item>
            <Navbar.Item>
                <NavbarMenu/>
            </Navbar.Item>
        </Navbar.Content>
    </Navbar>
  )
}