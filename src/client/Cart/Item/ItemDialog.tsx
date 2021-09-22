import { Button, Dialog } from '@material-ui/core';
import { CartItemType } from '../../App';
import { HandleAddToCart } from './Item';
import { CategoriesWrapper, CategoryTag, ItemImg, TitleAndPrice, Wrapper } from './ItemDialog.styles';

interface Props {
  item: CartItemType;
  open: boolean;
  handleClose: () => void;
  handleAddToCart: HandleAddToCart;
}

const ItemDialog = ({ item, open, handleClose, handleAddToCart }: Props) => {
  const categories = item.category.split(/,|and/);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      PaperProps={{
        style: { borderRadius: '20px' },
      }}
    >
      <ItemImg src={item.image} alt={item.title} />
      <Wrapper>
        <TitleAndPrice>
          <h2>{item.title}</h2>
          <h2>${item.price}</h2>
        </TitleAndPrice>

        <CategoriesWrapper>
          {categories.map((category) => (
            <CategoryTag key={category}>{category}</CategoryTag>
          ))}
        </CategoriesWrapper>
        <p>{item.description}.</p>
      </Wrapper>
      <Button
        onClick={() => {
          handleAddToCart(item);
          handleClose();
        }}
      >
        Add to cart
      </Button>
    </Dialog>
  );
};

export default ItemDialog;
