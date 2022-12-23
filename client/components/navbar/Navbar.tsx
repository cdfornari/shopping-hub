import { Dropdown, Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Category, Gender } from '../../models'
import { CartButton } from './CartButton'
import { NavbarMenu } from './NavbarMenu'
import { ThemeSwitcher } from './ThemeSwitcher'

export const NavbarWrapper = () => {
  const router = useRouter()
  const onFilter = (gender?: Gender, category?: Category) => {
    router.query.gender = gender;
    router.query.category = category;
    router.push(router);
  }
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
                <Link href='/'>
                    Shopping Hub
                </Link>
            </Text>
        </Navbar.Brand>
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
                            h: "100%",
                            d: "flex",
                            alignItems: "center",
                            fontWeight: "$semibold",
                        },
                        },
                    }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        <span 
                            onClick={() => onFilter('men', 'tops')} 
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Superiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        <span 
                            onClick={() => onFilter('men','bottoms')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Inferiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        <span 
                            onClick={() => onFilter('men','underwear')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Ropa Interior
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        <span 
                            onClick={() => onFilter('men','shoes')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Zapatos
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        <span 
                            onClick={() => onFilter('men','accessories')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Accesorios
                        </span>
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
                            h: "100%",
                            d: "flex",
                            alignItems: "center",
                            fontWeight: "$semibold",
                        },
                        },
                    }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        <span 
                            onClick={() => onFilter('women', 'tops')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Superiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        <span 
                            onClick={() => onFilter('women','bottoms')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Inferiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        <span 
                            onClick={() => onFilter('women','underwear')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Ropa Interior
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        <span 
                            onClick={() => onFilter('women','shoes')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Zapatos
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        <span 
                            onClick={() => onFilter('women','accessories')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Accesorios
                        </span>
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
                            h: "100%",
                            d: "flex",
                            alignItems: "center",
                            fontWeight: "$semibold",
                        },
                        },
                    }}
                >
                    <Dropdown.Item
                        key="prendas-superiores"
                    >
                        <span 
                            onClick={() => onFilter('kids', 'tops')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Superiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="prendas-inferiores"
                    >
                        <span 
                            onClick={() => onFilter('kids','bottoms')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Prendas Inferiores
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="ropa-interior"
                    >
                        <span 
                            onClick={() => onFilter('kids','underwear')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Ropa Interior
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="zapatos"
                    >
                        <span 
                            onClick={() => onFilter('kids','shoes')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Zapatos
                        </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        key="accesorios"
                    >
                        <span 
                            onClick={() => onFilter('kids','accessories')}
                            style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}
                        >
                            Accesorios
                        </span>
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
                <Link href='/?gender=men'>
                    Hombres
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/?gender=women'>
                    Mujeres
                </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
                <Link href='/?gender=kids'>
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