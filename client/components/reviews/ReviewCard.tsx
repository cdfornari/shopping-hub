import { FC } from 'react'
import { Card, Text } from '@nextui-org/react'
import { Rating } from 'react-simple-star-rating'
import { Review } from '../../models/Review'

interface Props {
    review: Review
}

export const ReviewCard: FC<Props> = ({review}) => {
  return (
    <Card
        variant='bordered'
    >
        <Card.Header css={{d: 'flex', gap: '$6'}}>
            <Text>
                {review.client.fullName}
            </Text>
            <Rating
                size={14}
                readonly
                allowFraction
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                initialValue={review.rating}
            />
        </Card.Header>
        <Card.Divider/>
        <Card.Body>
            <Text>
                {review.comment}
            </Text>
        </Card.Body>
    </Card>
  )
}