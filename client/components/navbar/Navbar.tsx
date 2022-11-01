import { Dropdown, Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'
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
    >
        <Navbar.Toggle
            showIn='sm'
        /> 
        <Navbar.Brand>
            <Text h1 
                css={{
                    textGradient: "45deg, $purple600 -20%, $pink600 100%",
                }}
                size='$4xl'
            >
                Shopping Hub
            </Text>
        </Navbar.Brand>
        {/* <Navbar.Content
            hideIn='sm'
        >
            <Navbar.Item>
                <SearchBar/>
            </Navbar.Item>
        </Navbar.Content> */}
        <Navbar.Content
            hideIn='sm'
            enableCursorHighlight
        >
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button
                        auto
                        light
                        css={{
                        px: 0,
                        dflex: "center",
                        svg: { pe: "none" },
                        }}
                        ripple={false}
                    >
                        Hombres
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu
                aria-label="ACME features"
                css={{
                    $$dropdownMenuWidth: "340px",
                    $$dropdownItemHeight: "70px",
                    "& .nextui-dropdown-item": {
                    py: "$4",
                    // dropdown item left icon
                    svg: {
                        color: "$secondary",
                        mr: "$4",
                    },
                    // dropdown item title
                    "& .nextui-dropdown-item-content": {
                        w: "100%",
                        fontWeight: "$semibold",
                    },
                    },
                }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        Prendas Superiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        Prendas Inferiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        Ropa Interior
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        Zapatos
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        Accesorios
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button
                        auto
                        light
                        css={{
                        px: 0,
                        dflex: "center",
                        svg: { pe: "none" },
                        }}
                        ripple={false}
                    >
                        Mujeres
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu
                aria-label="ACME features"
                css={{
                    $$dropdownMenuWidth: "340px",
                    $$dropdownItemHeight: "70px",
                    "& .nextui-dropdown-item": {
                    py: "$4",
                    // dropdown item left icon
                    svg: {
                        color: "$secondary",
                        mr: "$4",
                    },
                    // dropdown item title
                    "& .nextui-dropdown-item-content": {
                        w: "100%",
                        fontWeight: "$semibold",
                    },
                    },
                }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        Prendas Superiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        Prendas Inferiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        Ropa Interior
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        Zapatos
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        Accesorios
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown isBordered>
                <Navbar.Item>
                    <Dropdown.Button
                        auto
                        light
                        css={{
                        px: 0,
                        dflex: "center",
                        svg: { pe: "none" },
                        }}
                        ripple={false}
                    >
                        Niños
                    </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu
                aria-label="ACME features"
                css={{
                    $$dropdownMenuWidth: "340px",
                    $$dropdownItemHeight: "70px",
                    "& .nextui-dropdown-item": {
                    py: "$4",
                    // dropdown item left icon
                    svg: {
                        color: "$secondary",
                        mr: "$4",
                    },
                    // dropdown item title
                    "& .nextui-dropdown-item-content": {
                        w: "100%",
                        fontWeight: "$semibold",
                    },
                    },
                }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        Prendas Superiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        Prendas Inferiores
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        Ropa Interior
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        Zapatos
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        Accesorios
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar.Content>
        <Navbar.Content
            hideIn='sm'
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
        <Navbar.Content showIn='sm'>
            <Navbar.Item>
                <CartButton/>
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
            <Navbar.CollapseItem>
                <Link href='/profile'>
                    Perfil
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/orders'>
                    Órdenes
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/orders'>
                    Hombres
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/orders'>
                    Mujeres
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/orders'>
                    Niños
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <ThemeSwitcher/>
            </Navbar.CollapseItem>

        </Navbar.Collapse>
    </Navbar>
  )
}