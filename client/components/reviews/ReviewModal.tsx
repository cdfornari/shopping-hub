import { FC, useMemo, useState } from 'react'
import { Button, Modal, Text, Textarea } from '@nextui-org/react'
import { Rating } from 'react-simple-star-rating';
import { OrderProduct } from '../../models/OrderProduct';

interface Props{
    isVisible: boolean;
    orderProduct?: OrderProduct;
    onClose?: () => void;
    onSubmit: (rating: number,comment: string) => void;
}

export const ReviewModal: FC<Props> = ({isVisible,orderProduct,onClose,onSubmit}) => {
  const [ratingValue, setRatingValue] = useState(0)
  const [comment, setComment] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const showTooltip = useMemo(() => ratingValue > 0 || isHovering, [ratingValue,isHovering])
  const canSend = useMemo(() => ratingValue > 0 && comment.length > 3, [ratingValue,comment])

  return (
      <Modal
        closeButton
        open={isVisible}
        onClose={onClose  || (() => {})}
      >
        <Modal.Header>
            <Text h3>
                Escribe una reseña para {orderProduct?.product.title}
            </Text>
        </Modal.Header>
        <Modal.Body css={{py: '$12'}}>
            {
                !ratingValue && (
                    <Text
                        css={{mb: 0}}
                    >
                        Selecciona una calificación
                    </Text>
                )
            }
            <Rating
                size={32}
                allowFraction
                transition
                showTooltip={showTooltip}
                initialValue={ratingValue}
                onClick={setRatingValue}
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => setIsHovering(false)}
                tooltipArray={['Terrible','Terrible','Malo','Malo','Regular','Regular','Bueno','Bueno','Muy Bueno','Perfecto']}
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}   
            />
            <Textarea
                bordered
                labelPlaceholder='Escribe un comentario'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                color={comment.length > 2 ? 'success' : 'error'}
                helperText={comment.length > 2 ? 'Comentario válido' : 'El comentario debe tener al menos 3 caracteres'}
                helperColor={comment.length > 2 ? 'success' : 'error'}
                css={{mt: '$8'}}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button
                disabled={!canSend}
                color='success'
                onPress={() => onSubmit(ratingValue,comment)}
            >
                Enviar 
            </Button>
        </Modal.Footer>
    </Modal>
  )
}