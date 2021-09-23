import { CartItemType } from '../App';
import { TitleAndPrice, Wrapper } from './RecentPurchaseItem.styles';

interface Props {
  item: CartItemType;
}

const RecentPurchaseItem = ({ item }: Props) => {
  return (
    <Wrapper data-cy={`recently-purchased-${item.id}`}>
      <img src={item.image} alt={item.title} />
      <TitleAndPrice>
        <h3>
          {item.title}
          &nbsp;
          <span>{`(${item.amount})`}</span>
        </h3>
        <span>${item.price * item.amount}</span>
      </TitleAndPrice>
    </Wrapper>
  );
};

export default RecentPurchaseItem;
