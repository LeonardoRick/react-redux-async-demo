import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notifications';
import { fetchCartData, sendCartData } from './store/cart';
import { notificationActions } from './store/notification';

let isInitial = true;
let success = false;
function App() {
  const showCart = useSelector((state) => state.toggleCart.show);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  if (notification) {
    setTimeout(() => {
      dispatch(notificationActions.hideNotification());
    }, 1000);
  }

  useEffect(() => {
    if (isInitial) {
      success = dispatch(fetchCartData());
      isInitial = false;
      return;
    }
    if (success && cart.isUpdate) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      {notification && Object.keys(notification).length && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
