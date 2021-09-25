import { StoredPurchase } from './RecentPurchases';
import {
  TotalWrapper,
  Wrapper,
  Amount,
  IndividualItemWrapper,
  ItemPrice,
  TotalPrice,
} from './RecentPurchase.styles';

interface RecentPurchaseProps {
  purchase: StoredPurchase;
}

interface TotalProps {
  value: number;
  mt?: string; // optional margin-top
}

interface PriceProps {
  price: number;
}

const RecentPurchase = ({ purchase }: RecentPurchaseProps) => {
  const isMoreThanOneItem = purchase.items.length > 1;

  const Total = ({ value, mt }: TotalProps) => (
    <TotalWrapper mt={mt}>
      <h3>Total:</h3>
      <TotalPrice>${value.toFixed(2)}</TotalPrice>
    </TotalWrapper>
  );

  // If purchase only consists of one type of cheese, only display the price via the <Total/> component
  const Price = ({ price }: PriceProps) =>
    isMoreThanOneItem ? <ItemPrice>${price.toFixed(2)}</ItemPrice> : <Total value={price} />;

  return (
    <Wrapper data-cy={`recently-purchased-${purchase.id}`}>
      {purchase.items.map(({ image, title, amount, id, price }) => (
        <IndividualItemWrapper>
          <img src={image} alt={title} />
          <Amount>{amount}</Amount>
          <h3>{id === 2 ? title.substring(0, 14) : title}</h3>
          <Price price={price * amount} />
        </IndividualItemWrapper>
      ))}
      {isMoreThanOneItem && (
        <Total
          value={purchase.items.reduce((ack: number, item) => ack + item.amount * item.price, 0)}
          mt='10px'
        />
      )}
    </Wrapper>
  );
};

export default RecentPurchase;
