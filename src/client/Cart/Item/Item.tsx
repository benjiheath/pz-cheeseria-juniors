import Button from '@material-ui/core/Button';
import { useState } from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import ItemDialog from './ItemDialog';

export type HandleAddToCart = (clickedItem: CartItemType) => void;

type Props = {
  item: CartItemType;
  handleAddToCart: HandleAddToCart;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  const handleItemClick = () => {
    setItemDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setItemDialogOpen(false);
  };

  return (
    <>
      <ItemDialog item={item} open={itemDialogOpen} handleClose={handleCloseDialog} handleAddToCart={handleAddToCart} />
      <Wrapper onClick={() => handleItemClick()}>
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <h3>${item.price}</h3>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(item);
          }}
          data-cy={`add-to-cart-${item.id}`}
        >
          Add to cart
        </Button>
      </Wrapper>
    </>
  );
};

export default Item;
