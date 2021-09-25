import { Divider, Drawer } from '@material-ui/core';
import { CartItemType } from '../App';
import { Wrapper } from './Drawer.styles';
import RecentPurchase from './RecentPurchase';
import { StoredPurchase } from './RecentPurchases';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  data: StoredPurchase[];
}

const RecentPurchasesDrawer = ({ drawerOpen, setDrawerOpen, data }: Props) => {
  const handleClose = () => {
    setDrawerOpen(false);
  };

  const items =
    data.length >= 1 ? (
      data.map((purchase, idx) => (
        <>
          <RecentPurchase purchase={purchase} key={purchase.id} />
          {idx + 1 !== data.length && <Divider />}
        </>
      ))
    ) : (
      <>No purchases to show</>
    );

  return (
    <Drawer anchor='left' open={drawerOpen} onClose={handleClose}>
      <Wrapper data-cy='recent-purchases-drawer'>
        <h2>Recent Purchases</h2>
        {items}
      </Wrapper>
    </Drawer>
  );
};

export default RecentPurchasesDrawer;
