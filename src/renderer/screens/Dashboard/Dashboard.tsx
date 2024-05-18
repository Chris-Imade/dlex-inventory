import React, { useEffect, useState } from 'react';
import { ProductCard, Statistics, Transaction } from 'renderer/components';
import { colors, fonts } from 'renderer/components/styled';
import { images } from '../../../../assets/images';
import { Link } from 'react-router-dom';
import Banner from 'renderer/components/transaction_banner/TransactionBanner';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import { useImageFormat } from 'renderer/hooks/useImageFormat';
import {
  setActiveRoute,
  setCompletedTasks,
  setTotalSales,
  setWorkInProgress,
} from 'renderer/Redux/Splice/appSlice';

const Dashboard = () => {
  const totalSales = useSelector((state: AppState) => state.data.totalSales);
  const workInProgress = useSelector(
    (state: AppState) => state.data.workInProgress
  );
  const completedDeals = useSelector(
    (state: AppState) => state.data.completedDeals
  );
  const products = useSelector((state: AppState) => state.data.products);
  const actualTransactions = useSelector(
    (state: AppState) => state.data.transactions
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [transactions, setTransactions] = useState<any>(actualTransactions);

  const dispatch = useDispatch();
  console.log('Transactions Redux: ', actualTransactions);

  const serviceProvider = localStorage.getItem('serviceProvider');
  const parsedSP = serviceProvider && JSON.parse(serviceProvider);

  // Transactions Map

  const featuredProducts =
    products && products.length > 0 ? products.slice(-4) : [];

  const handleSearch = (searchQuery: string) =>
    actualTransactions?.filter((product: any) =>
      Object.values(product).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    );

  useEffect(() => {
    // Whenever searchQuery changes, update the products state
    const filteredProducts = handleSearch(searchQuery);

    if (searchQuery && searchQuery?.length > 0) {
      setTransactions(filteredProducts);
      console.log('Transactions TERNARY: ', transactions);
    }
  }, [searchQuery]);

  useEffect(() => {
    const currentProjects = actualTransactions?.filter(
      (item: any) => item.status === 'Pending'
    );
    const closedProjects = actualTransactions?.filter(
      (item: any) => item.status === 'Closed'
    );
    dispatch(setTotalSales(actualTransactions?.length));
    dispatch(setWorkInProgress(currentProjects?.length));
    dispatch(setCompletedTasks(closedProjects?.length));
    setTransactions(actualTransactions);
  }, [actualTransactions, actualTransactions?.length]);

  return (
    <div
      className={`${styles.dashboard} bg-[#F8F8FA] w-[93.8vw] h-[100vh] py-[48px] px-[49px]`}
    >
      <div className="flex justify-between md:items-center flex-col md:flex-row items-start">
        <div>
          <h1
            style={{
              fontSize: 24,
              fontFamily: fonts.family.medium,
            }}
          >
            Hello, {parsedSP?.username}
          </h1>
        </div>
        <div className="relative">
          <img
            className="w-[24px] h-[24px] absolute top-2 left-2"
            src={images.search}
            alt=""
          />
          <input
            type="search"
            placeholder="Search Transactions"
            className="pl-[40px] py-[10px] w-[232px] pr-[10px] h-[40px] placeholder:text-[#181819af] rounded-[8px] border-[1px] border-solid border-[#E6E7E9]"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div
        className={
          'mt-[29px] flex lg:flex-row min-w-[20rem] overflow-x-auto featured'
        }
      >
        <div className="mr-4">
          <Statistics type={'Total Sales'} value={totalSales} />
        </div>
        <div className="mr-4">
          <Statistics type={'Work in progress'} value={workInProgress} />
        </div>
        <div className="mr-4">
          <Statistics type={'Completed Deals'} value={completedDeals} />
        </div>
      </div>
      {featuredProducts?.length !== 0 && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center my-6">
            <h1 style={{ fontFamily: fonts.family.medium, fontSize: 24 }}>
              Featured Products
            </h1>
            <Link
              to={'/products'}
              onClick={() => dispatch(setActiveRoute('products'))}
            >
              <button
                className="
                    h-10 px-3
                    rounded-[8px]
                    text-white flex
                    items-center
                    border-[1px]
                    hover:border-solid
                    hover:border-[#3855B3]
                    hover:bg-white
                    hover:text-[#3855B3]
                    bg-[#3855B3]
                    transition-all
                    duration-500
                    ease-in-out
                  "
              >
                <span
                  style={{
                    fontFamily: fonts.family.regular,
                    fontSize: 24,
                    marginRight: 10,
                  }}
                >
                  +
                </span>{' '}
                New Product
              </button>
            </Link>
          </div>
          <div className="flex md:flex-row min-w-[20rem] overflow-x-auto featured">
            {featuredProducts &&
              featuredProducts.map((item, _) => {
                const imageFormat = useImageFormat(item?.imageFormat);

                return (
                  <div key={_} className={_ !== 0 ? 'ml-4' : ''}>
                    <ProductCard
                      _id={item?._id}
                      image={item?.image}
                      name={item?.name}
                      imageFormat={imageFormat}
                      price={item?.price}
                      discountPrice={item?.discountPrice}
                    />
                  </div>
                );
              })}
          </div>
        </>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center my-6">
        <h1 style={{ fontFamily: fonts.family.medium, fontSize: 24 }}>
          Transaction History
        </h1>
        <Link
          to={'/transactions'}
          onClick={() => dispatch(setActiveRoute('transactions'))}
        >
          <button
            className="
            h-10 px-3
            rounded-[8px]
            text-white flex
            items-center
            border-[1px]
            hover:border-solid
            hover:border-[#3855B3]
            hover:bg-white
            hover:text-[#3855B3]
            bg-[#3855B3]
            transition-all
            duration-500
            ease-in-out
          "
          >
            View all
          </button>
        </Link>
      </div>

      {/* Transaction Banner Component */}
      <Banner />
      <div className="pb-24">
        {transactions?.length ? (
          <>
            {transactions.map((item: Transaction, _: number) => (
              <div key={_} className="my-4">
                <Transaction item={item} />
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-full relative mt-[12rem]">
            <div
              className="border-dashed border-[3px] p-12"
              style={{ borderColor: colors.primary }}
            >
              <h4>You don't have any transactions yet, Create Now</h4>
            </div>
            <div
              className={`top-30 left-[18rem] absolute w-32 h-32 rounded-full border-dashed border-[3px] bg-[${colors.white}] animate-bounce`}
              style={{ borderColor: colors.primary }}
            ></div>
            <div
              className={`top-[13.5rem] right-[20rem] delay-75 absolute w-32 h-32 rounded-full border-dashed border-[3px] bg-[${colors.white}] animate-bounce`}
              style={{ borderColor: colors.primary }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
