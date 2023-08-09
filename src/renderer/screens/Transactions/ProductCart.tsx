import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { colors, fonts } from 'renderer/components/styled';
import { images } from '../../../../assets/images';
import { setPageIndex } from 'renderer/Redux/Splice/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductsCartCard from 'renderer/components/ProductCards/ProductsCartCard';
import { AppState } from 'renderer/Redux/store';

const ProductCart = () => {
  const transactionProducts = useSelector((state: AppState) => state.data.transactionProducts);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const actualProducts = useSelector((state: AppState) => state.data.products);
  const [products, setProducts] = useState<any>();

  const dispatch = useDispatch();



  // First I need to get the entries from the product object and convert them to lowercase
  // Then I check to see if they contain any of the content from search query.

  const handleSearch = (searchQuery: string) =>
  actualProducts?.filter((product: any) =>
    Object.values(product).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery?.toLowerCase())
    )
  );

  useEffect(() => {
    // Whenever searchQuery changes, update the products state
    const filteredProducts = handleSearch(searchQuery);

    if(searchQuery?.length > 0) {
      setProducts(filteredProducts);
    } else {
      setProducts(actualProducts);
    }
  }, [searchQuery]);

  return (
    <div
      className={`${styles.dashboard} bg-[#F8F8FA] w-[93.8vw] h-[100vh] py-[48px] px-[49px]`}
    >
      {/* Header */}
      <div className="flex justify-between my-5 flex-col md:flex-row item-center ">
        <h3 className='text-center md:text-left'
          style={{
            fontSize: 24,
            fontFamily: fonts.family.medium,
          }}
        >
          Add Products
        </h3>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Products"
            className="px-3 py-2 rounded-l-md outline-none w-[20rem]"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className={`bg-[#E1F5FD] h-[42px] border-[1px] border-solid border-gray-500 w-10 flex justify-center items-center rounded-r-md hover:cursor-pointer`}
          >
            <img src={images.search} width={24} alt="" />
          </div>
        </div>
        <button
          onClick={() => dispatch(setPageIndex(1))}
          className="
                h-10 px-3
              "
        >
          Next
          <span>&rarr;</span>
        </button>
      </div>

      {products?.length ? (
        <div className="flex flex-wrap">
          {products?.map((item: Product, _:number) => (
            <ProductsCartCard item={item} index={_} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full relative">
          <div
            className="border-dashed border-[3px] p-12"
            style={{ borderColor: colors.primary }}
          >
            <h4>You don't have any products yet, Create Now</h4>
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

      {transactionProducts && transactionProducts?.length > 0 ? (
        <div className='flex items-center justify-center bg-white absolute bottom-10 right-10 rounded-full w-20 h-20 shadow-md'>
          <img src={images.cart} alt="cart image" />
          <p className='text-xl' style={{ fontFamily: fonts.family.regular}}>{transactionProducts.length}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCart;
