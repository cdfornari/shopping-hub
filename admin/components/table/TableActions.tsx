import { FC, useState } from 'react';
import NextLink from 'next/link';
import { Col, Row, Text, Tooltip } from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon';
import { EyeIcon } from './EyeIcon';
import { IconButton } from './IconButton';

interface Props {
    url: string;
    onAction?: (type: 'activate' | 'delete') => void;
    showDelete?: boolean;
    edit?: boolean;
    type?: 'activate' | 'delete'
}

export const TableActions: FC<Props> = ({url,onAction,edit=true,type: initialType,showDelete=true}) => {
  const [type, setType] = useState(initialType)
  return (
    <Row justify="center" align="center">
        {
            edit && (
                <Col css={{ d: "flex" }}>
                    <Tooltip 
                        content="Detalles"
                        color='primary'
                    >
                        <NextLink href={url} passHref > 
                            <IconButton>
                                <EyeIcon height={20} width={20} size={20} fill="#979797" />
                            </IconButton>
                        </NextLink>
                    </Tooltip>
                </Col>
            )
        }
        {
            showDelete && onAction && (
                <Col css={{ d: "flex" }}>
                    <Tooltip
                        content={type === 'activate' ? 'Activar' : 'Eliminar'}
                        color={type === 'activate' ? 'success' : 'error'}
                    >
                        {
                            type === 'activate' ? (
                                <IconButton onClick={() => {
                                    onAction('activate')
                                    setType('delete')
                                }}>
                                    <Text color='success' size='$2xl'>
                                        {'  +'}
                                    </Text>
                                </IconButton>
                            ) : (
                                <IconButton 
                                    onClick={() => {
                                        onAction('delete')
                                        setType('activate')
                                    }}
                                    css={{ my: 10 }}
                                >
                                    <DeleteIcon height={20} width={20} size={20} fill="#FF0080" />
                                </IconButton>
                            )
                        }
                    </Tooltip>
                </Col>
            )
        }
    </Row>
  )
}