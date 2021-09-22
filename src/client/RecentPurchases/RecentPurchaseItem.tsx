import { CartItemType } from '../App';
import { TitleAndPrice, Wrapper } from './RecentPurchaseItem.styles';

interface Props {
  item: CartItemType;
  setImgLoaded: (boolean) => void;
}

const RecentPurchaseItem = ({ item, setImgLoaded }: Props) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} onLoad={() => setImgLoaded(true)} />
      <TitleAndPrice>
        <h3>{item.title}</h3>
        <span>${item.price}</span>
      </TitleAndPrice>
    </Wrapper>
  );
};

export default RecentPurchaseItem;
