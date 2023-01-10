import { FC } from 'react';
import NextLink from 'next/link';
import { Col, Row, Tooltip } from '@nextui-org/react'
import { EyeIcon } from './EyeIcon';
import { IconButton } from './IconButton';

interface Props {
    url: string;
}

export const TableActions: FC<Props> = ({url}) => {
  return (
    <Row justify="center" align="center">
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
    </Row>
  )
}