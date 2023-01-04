import { FC } from 'react'
import { useRouter } from 'next/router'
import { Card, Col, Grid, Text } from '@nextui-org/react'
import { Rating } from 'react-simple-star-rating'
import { Product } from '../../models'

interface Props {
  product: Product
}

export const ProductCard: FC<Props> = ({product}) => {
  const {push} = useRouter()
  return (
    <Card
      isHoverable
      isPressable
      onPress={() => push(`/products/${product._id}`)}
    >
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            {product.store.name}
          </Text>
          <Text h3 color='$accents7'>
            {product.title}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body
        css={{p: '0'}}
      >
        <Card.Image
          src={product.image}
          objectFit='cover'
          width="100%"
          height="100%"
          alt="Product Image"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          bgBlur: "#0f111466",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          py: 2
        }}
      >
        <Grid.Container gap={2}>
          <Grid xs={8} direction='column'>
            <Text css={{
              color: "$accents3",
              fontWeight: "$semibold",
              fontSize: "$sm",
            }}>
              {product.store.name}
            </Text>
            <Text css={{
              transformOrigin: "left",
              fontWeight: "$bold",
              fontSize: "$md",
              mt: '-$3'
            }}>
              {product.title}
            </Text>
            {
              product.comparativePrice > product.price && (
                <Rating
                  size={14}
                  readonly
                  allowFraction
                  fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                  initialValue={
                    product.reviews.length === 0 ? 0 :
                    product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
                  }
                />
              )
            }
          </Grid>
          <Grid xs={4} direction='column'>
            {
              product.comparativePrice > product.price ? (
                <div style={{
                  display: 'flex'
                }}>
                  <Text css={{
                    textDecorationLine: "line-through",
                    fontWeight: "$semibold",
                    fontSize: "14px",
                    color: "$accents3",
                  }}>
                    ${product.comparativePrice.toFixed(2)}
                  </Text>
                  <Text css={{
                    ml: "$4",
                    color: "$success",
                    fontSize: "14px",
                    fontWeight: "$semibold",
                  }}>
                    -{((product.comparativePrice-product.price)*100/product.comparativePrice).toFixed(2)}%
                  </Text>
                </div>
              ) : (
                <Rating
                  size={14}
                  readonly
                  allowFraction
                  fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                  initialValue={
                    product.reviews.length === 0 ? 0 :
                    product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
                  }
                />
              )
            }
            <Text css={{
              fontSize: "18px",
              fontWeight: "$bold",
            }}>
              ${product.price.toFixed(2)}
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  )
}