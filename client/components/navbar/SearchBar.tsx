import { useRouter } from 'next/router'
import { Button, Input } from '@nextui-org/react'
import { MdOutlineSearch } from 'react-icons/md'

export const SearchBar = () => {
    const { push } = useRouter()
    return (
        <Input
            aria-label='buscar productos'
            bordered
            placeholder='Busca un producto'
            size='lg'
            width={'480px'}
            contentRight={
                <Button
                    auto
                    light
                    css={{
                        p: 0
                    }}
                    onClick={() => push('/search')}
                >
                    <MdOutlineSearch/>
                </Button>
            }
        />
    )
}