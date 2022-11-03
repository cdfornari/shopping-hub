import { Text } from '@nextui-org/react';
import { FC } from 'react';

interface Props{
    statusKey: string;
}

export const ProductCategoryReducer: FC<Props> = ({statusKey}) => {
  switch (statusKey) {
    case "tops":
      return (
        <Text>
            Prendas superiores
        </Text>
      );
    case "bottoms":
      return (
        <Text>
            Prendas inferiores
        </Text>
      );
    case "shoes":
      return (
        <Text>
            Zapatos
        </Text>
      );
    case "accessories":
      return (
        <Text>
            Accesorios
        </Text>
      );
    case "underwear":
        return (
          <Text>
              Ropa interior
          </Text>
        );
    case "pijamas":
        return (
            <Text>
                Pijamas
            </Text>
        );
    default:
      return <></>
  }
}