import { FC } from 'react';
import NextLink from 'next/link';
import { Col, Row, Tooltip } from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon';
import { EyeIcon } from './EyeIcon';
import { IconButton } from './IconButton';

interface Props {
    url: string;
    onDelete: () => void;
}

export const TableActions: FC<Props> = ({url,onDelete}) => {
  return (
    <Row justify="center" align="center">
        <Col css={{ d: "flex" }}>
            <Tooltip content="Detalles">
            <NextLink href={url} passHref > 
                <IconButton>
                    <EyeIcon height={20} width={20} size={20} fill="#979797" />
                </IconButton>
            </NextLink>
            </Tooltip>
        </Col>
        <Col css={{ d: "flex" }}>
            <Tooltip
                content="Eliminar"
                color="error" 
                onClick={onDelete}
            >
            <IconButton>
                <DeleteIcon height={20} width={20} size={20} fill="#FF0080" />
            </IconButton>
            </Tooltip>
        </Col>
    </Row>
  )
}