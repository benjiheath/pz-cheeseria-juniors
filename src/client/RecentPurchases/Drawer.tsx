import { Drawer } from '@material-ui/core';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: () => void;
}

const RecentPurchasesDrawer = ({ drawerOpen, setDrawerOpen }) => {
  return (
    <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      test
    </Drawer>
  );
};

export default RecentPurchasesDrawer;
