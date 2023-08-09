import React, { useEffect, useState } from 'react';
import { Transaction } from 'renderer/components';
import Banner from 'renderer/components/transaction_banner/TransactionBanner';
import styles from './styles.module.css';
import { colors, fonts } from 'renderer/components/styled';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import { images } from '../../../../assets/images';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const actualTransactions = useSelector((state: AppState) => state.data.transactions);
  const [transactions, setTransactions] = useState<any>();

  const handleSearch = (searchQuery: string) =>
  actualTransactions?.filter((product: any) =>
    Object.values(product).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery?.toLowerCase())
    )
  );

  useEffect(() => {
    // Whenever searchQuery changes, update the products state
    const filteredProducts = handleSearch(searchQuery);

    if(searchQuery?.length > 0) {
      setTransactions(filteredProducts);
    } else {
      setTransactions(actualTransactions);
    }
  }, [searchQuery]);

  return (
    <div
      className={`${styles.dashboard} bg-[#F8F8FA] w-[93.8vw] h-[100vh] py-[48px] px-[49px]`}
    >
      <div className="flex justify-between my-5 flex-col lg:flex-row items-center">
        <h3 className='mb-4 md:mb-0'
          style={{
            fontSize: 24,
            fontFamily: fonts.family.medium,
          }}
        >
          Transaction History
        </h3>
        <div className="flex items-center">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Transactions"
            className="px-3 py-2 rounded-l-md outline-none w-[20rem]"
          />
          <div
            className={`bg-[#E1F5FD] h-[42px] w-10 flex justify-center items-center rounded-r-md hover:cursor-pointer border-[1px] border-solid border-gray-500`}
          >
            <img src={images.search} width={24} alt="" />
          </div>
        </div>
        <Link to={'/create-transaction'}>
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
              mt-4 md:mb-0
            "
          >
            Add Transaction
          </button>
        </Link>
      </div>

      {/* Transaction Banner Component */}
      <Banner />


      <div className="pb-6">
        {transactions?.length ? transactions?.map((item: Transaction, _:number) => (
          <div className="my-4" key={_}>
            <Transaction item={item} />
          </div>
        )) : (
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

      {transactions && transactions?.length > 7 && (
        <div className="w-full flex justify-center items-center">
        <div className="rounded-lg px-3 bg-white flex hover:shadow-md shadow-sm">
          <button className="p-2 hover:bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center mx-3 my-1">
            1
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center mx-3 my-1">
            2
          </button>
          <div>...</div>
          <button className="p-2 hover:bg-gray-200 rounded-full w-7 h-7 flex justify-center items-center mx-3 my-1">
            10
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Transactions;
