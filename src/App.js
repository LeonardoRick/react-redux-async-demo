import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notifications';
import { notificationActions } from './store/notification';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.toggleCart.show);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        notificationActions.showNotification({
          title: 'Sending...',
          message: 'The list is being updated, wait.',
          status: 'pending',
        })
      );

      const response = await fetch('/cart', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data) {
        dispatch(
          notificationActions.showNotification({
            title: 'Error!',
            message: 'Save cart failed!',
            status: 'error',
          })
        );
      }

      dispatch(
        notificationActions.showNotification({
          title: 'Success!',
          message: 'List updated successfully',
          status: 'success',
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((err) => {
      dispatch(
        notificationActions.showNotification({
          title: 'Error!',
          message: 'Save cart failed!',
          status: 'error',
        })
      );
    });
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
