import { Dropdown } from '@nextui-org/react'
import { FC } from 'react'


interface Props {
    aria_label: string,
    options: string[],
    selected: string,
    onSelect: (e: any) => void,
}

export const DropdownInfo: FC<Props> = ({aria_label, options, selected, onSelect}) => {

    return (
    <Dropdown>
        <Dropdown.Button flat color="secondary" css={{width:'100%'}}>{selected}</Dropdown.Button>
        <Dropdown.Menu 
            aria-label={`Select ${aria_label}`}
            color="secondary" 
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={onSelect}
            css={{width:'100%'}}
            >
            {
                options.map((opt) => <Dropdown.Item key={opt}>
                    {opt}
                </Dropdown.Item>)
            }
        </Dropdown.Menu>
    </Dropdown>
  )
}
