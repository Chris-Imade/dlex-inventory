import { useEffect, useState } from 'react';
import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Register,
  Login,
  Aside,
  Dashboard,
  Settings,
  Products,
  Transactions,
  Invoices,
} from './screens';
import NewTransaction from './screens/Transactions/NewTransaction';
import NewProduct from './screens/Products/NewProduct';
import useDataFetching from './hooks/useFetch';
import {
  setProducts,
  setServiceProvider,
  setTransactions,
  startSync,
  stopSync,
  setTotalPendingItems,
  incrementItemsSynced,
  setUserId,
} from './Redux/Splice/appSlice';
import TransactionDetailed from './screens/Transactions/TransactionDetailed';
import { accessToken, baseURL } from './components/styled';
import EditProduct from './screens/Products/EditProduct';

export default function App() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);
  console.log(parsedUserId);

  const {
    data: productsData,
    error: productsError,
    refreshData: refreshProductsData,
  } = useDataFetching(`/api/v1/products?userId=${parsedUserId}`);
  const {
    data: transactionsData,
    error: transactionsError,
    refreshData: refreshTransactionsData,
  } = useDataFetching(`/api/v1/transaction?userId=${parsedUserId}`);

  const dispatch = useDispatch();

  const storedProducts = localStorage.getItem('products');
  const storedTransactions = localStorage.getItem('transactions');

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
      localStorage.setItem('products', JSON.stringify(productsData));
      console.log(productsData);
    } else {
      console.log(productsError);
    }

    if (transactionsData) {
      dispatch(setTransactions(transactionsData));
      localStorage.setItem('transactions', JSON.stringify(transactionsData));
      console.log(transactionsData);
    } else {
      console.log(transactionsError);
    }

    if (!productsData && storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      dispatch(setProducts(parsedProducts));
      console.log('parsedProducts:', parsedProducts);
    }
    if (!transactionsData && storedTransactions) {
      const parsedTransaction = JSON.parse(storedTransactions);
      dispatch(setTransactions(parsedTransaction));
      console.log('parsedTransaction:', parsedTransaction);
    }
  }, [productsData, transactionsData, storedProducts, storedTransactions]);

  // GEt user Id
  const getUserId = async () => {
    try {
      const response = await fetch(`${baseURL}${`/api/v1/users/user-id`}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const userIdData = await response.json();
      const userId = userIdData.userId;
      // setUserId(userId);
      return userId;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  };

  const getUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/users/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const user = await response.json();

      // Remove sensitive information
      const { hash, salt, createdAt, updatedAt, __v, _id, ...serviceProvider } =
        user;

      // Store the rest as serviceProvider in localStorage
      localStorage.setItem('serviceProvider', JSON.stringify(serviceProvider));

      // Update Redux state with serviceProvider data
      dispatch(setServiceProvider(serviceProvider));
    } catch (error) {
      // If an error occurs and there is no network connection, use the serviceProvider from localStorage
      const serviceProviderLC = localStorage.getItem('serviceProvider');
      if (serviceProviderLC !== null) {
        const parsedServiceProvider = JSON.parse(serviceProviderLC);
        dispatch(setServiceProvider(parsedServiceProvider));
      } else {
        // Handle the case when serviceProviderLC is null (e.g., provide a default value)
      }

      // Rethrow the error
      throw new Error(`${error}`);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const userId = await getUserId();
      dispatch(setUserId(userId));
      localStorage.setItem('userId', JSON.stringify(userId));
      await getUserDetails(userId);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Call the function to fetch and store user details
  useEffect(() => {
    fetchUserDetails();
  }, []);


  // Function to synchronize pending data when device comes online
  const synchronizePendingData = async () => {
    const pendingProducts = JSON.parse(
      localStorage.getItem('pendingProducts') || '[]'
    );
    const pendingTransactions = JSON.parse(
      localStorage.getItem('pendingTransactions') || '[]'
    );

    // Function to send a pending product to the server and handle the response
    const sendPendingProduct = async (productData: any) => {
     if(parsedUserId) {
      try {
        const response = await fetch(`${baseURL}/api/v1/products?userId=${parsedUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${accessToken}`,
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          const responseData = await response.json();
          const existingData = responseData.existingData;

          // Remove the synchronized product from pending products
          localStorage.setItem(
            'pendingProducts',
            JSON.stringify(
              pendingProducts.filter((product: Product) => {
                return product.uniqueIdentifier !== existingData;
              })
            )
          );
        }
      } catch (error) {
        console.error('Error synchronizing pending Products:', error);
      }
     }
    };

    // Function to send a pending transaction to the server and handle the response
    const sendPendingTransaction = async (transactionData: any) => {
      if(parsedUserId) {
        try {
          const response = await fetch(`${baseURL}/api/v1/transaction?userId=${parsedUserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${accessToken}`,
            },
            body: JSON.stringify(transactionData),
          });

          if (response.ok) {
            const responseData = await response.json();
            const existingData = responseData.existingData;

            // Remove the synchronized transaction from pending transactions
            localStorage.setItem(
              'pendingTransactions',
              JSON.stringify(
                pendingTransactions.filter((transaction: Transaction) => {
                  return transaction.uniqueIdentifier !== existingData;
                })
              )
            );
          }
        } catch (error) {
          console.error('Error synchronizing pending Transactions:', error);
        }
      }
    };

    // Set the total pending items count
    dispatch(
      setTotalPendingItems(pendingProducts.length + pendingTransactions.length)
    );

    // Start syncing
    dispatch(startSync());

    // Synchronize pending products sequentially
    for (const productData of pendingProducts) {
      await sendPendingProduct(productData);
      dispatch(incrementItemsSynced());
    }

    // Synchronize pending transactions sequentially
    for (const transactionData of pendingTransactions) {
      await sendPendingTransaction(transactionData);
      dispatch(incrementItemsSynced());
    }

    // Stop syncing
    dispatch(stopSync());
  };

  // Use a periodic interval to check network status and synchronize pending data
  useEffect(() => {
    // Check network status every 30 seconds
    const interval = setInterval(async () => {
      if (navigator.onLine) {
        // Device is online, synchronize pending data
        await synchronizePendingData();
      }
    }, 1800000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      {token === null ? (
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <div className="flex">
            <div>
              {<Aside />}{' '}
              {/* Render Aside only when the user is authenticated */}
            </div>
            <div>
              <Routes>
                <Route path="*" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<Products />} />
                <Route path="/create-product" element={<NewProduct />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/edit-product" element={<EditProduct />} />
                <Route
                  path="/transaction/detailed"
                  element={<TransactionDetailed />}
                />
                <Route
                  path="/create-transaction"
                  element={<NewTransaction />}
                />
                <Route path="/invoices" element={<Invoices />} />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </div>
  );
}
