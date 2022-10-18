import { Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import { Rating } from 'react-simple-star-rating'

export const ProductCard = () => {
  return (
    <Card
      isHoverable
      isPressable
    >
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
            Stranger Things
          </Text>
          <Text h3 color='$accents4'>
            Hellfire Club x Metallica Raglan Shirt
          </Text>
        </Col>
      </Card.Header>
      <Card.Body
        css={{p: '0'}}
      >
        <Card.Image
          src="https://netflix-shop.imgix.net/products/HFC-MET-RAG-1_1032x.jpg"
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
        }}
      >
        <Grid.Container gap={2}>
          <Grid xs={8} direction='column'>
            <Text css={{
              color: "$accents3",
              fontWeight: "$semibold",
              fontSize: "$sm",
            }}>
              Stranger Things
            </Text>
            <Text css={{
              transformOrigin: "left",
              fontWeight: "$bold",
              fontSize: "$md",
            }}>
              Hellfire Club x Metallica Raglan Shirt
            </Text>
          </Grid>
          <Grid xs={4} direction='column'>
            <div style={{
              display: 'flex'
            }}>
              <Text css={{
                textDecorationLine: "line-through",
                fontWeight: "$semibold",
                fontSize: "14px",
                color: "$accents3",
              }}>
                $35.00
              </Text>
              <Text css={{
                ml: "$4",
                color: "$success",
                fontSize: "14px",
                fontWeight: "$semibold",
              }}>
                -20%
              </Text>
            </div>
            <Text css={{
              fontSize: "18px",
              fontWeight: "$bold",
            }}>
              $28.00
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  )
}