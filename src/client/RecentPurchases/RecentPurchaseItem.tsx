import { CartItemType } from '../App';
import { TitleAndPrice, Wrapper } from './RecentPurchaseItem.styles';

interface Props {
  item: CartItemType;
}

const RecentPurchaseItem = ({ item }: Props) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <TitleAndPrice>
        <h3>{item.title}</h3>
        <span>${item.price}</span>
      </TitleAndPrice>
    </Wrapper>
  );
};

export default RecentPurchaseItem;
