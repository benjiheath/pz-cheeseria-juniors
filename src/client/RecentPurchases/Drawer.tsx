import { Button, Divider, Drawer } from '@material-ui/core';
import { Wrapper } from './Drawer.styles';
import RecentPurchase from './RecentPurchase';
import { StoredPurchase } from './RecentPurchases';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  data: StoredPurchase[];
  setRecentPurchasesState: (value: StoredPurchase[]) => void;
}

const RecentPurchasesDrawer = ({ drawerOpen, setDrawerOpen, data, setRecentPurchasesState }: Props) => {
  const dataExists = data.length >= 1;

  const clearRecentPurchases = async (): Promise<void> => {
    await fetch(`api/purchases`, {
      method: 'DELETE',
    });
    setRecentPurchasesState([]);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const items = dataExists ? (
    data.map((purchase, idx) => (
      <>
        <RecentPurchase purchase={purchase} key={purchase.id} />
        {idx + 1 !== data.length && <Divider />}
      </>
    ))
  ) : (
    <>No purchases to show</>
  );

  const ClearButton = () =>
    dataExists ? (
      <Button
        variant='contained'
        onClick={clearRecentPurchases}
        disabled={data.length < 1}
        style={{ width: '50%', alignSelf: 'center', marginTop: '30px' }}
      >
        Clear All
      </Button>
    ) : null;

  return (
    <Drawer anchor='left' open={drawerOpen} onClose={handleClose}>
      <Wrapper data-cy='recent-purchases-drawer'>
        <h2>Recent Purchases</h2>
        {items}
        <ClearButton />
      </Wrapper>
    </Drawer>
  );
};

export default RecentPurchasesDrawer;
