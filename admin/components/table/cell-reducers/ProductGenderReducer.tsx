import { Text } from '@nextui-org/react';
import { FC } from 'react';

interface Props{
    statusKey: string;
}

export const ProductGenderReducer: FC<Props> = ({statusKey}) => {
  switch (statusKey) {
    case "men":
      return (
        <Text>
            Hombres
        </Text>
      );
    case "women":
      return (
        <Text>
            Mujeres
        </Text>
      );
    case "kid":
      return (
        <Text>
            Niños
        </Text>
      );
    case "unisex":
      return (
        <Text>
            Unisex
        </Text>
      );
    default:
      return <></>
  }
}