import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import {
  accessToken,
  baseURL,
  colors,
  fonts,
} from 'renderer/components/styled';
import { products } from 'renderer/components/DATA';
import { images } from '../../../../assets/images';
import { useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import { useImageFormat } from 'renderer/hooks/useImageFormat';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const actualProducts = useSelector((state: AppState) => state.data.products);
  const [products, setProducts] = useState<any>();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);

  console.log();

  // First I need to get the entries from the product object and convert them to lowercase
  // Then I check to see if they contain any of the content from search query.

  const handleSearch = (searchQuery: string) =>
    actualProducts?.filter((product: any) =>
      Object.values(product).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    );

  useEffect(() => {
    // Whenever searchQuery changes, update the products state
    const filteredProducts = handleSearch(searchQuery);

    if (searchQuery?.length > 0) {
      setProducts(filteredProducts);
    } else {
      setProducts(actualProducts);
    }
  }, [searchQuery]);

  const handleDeleteProduct = async (productId: string) => {
    if (navigator.onLine) {
      alert('⛔️Are you sure about this?⛔️');

      try {
        const response = await fetch(
          `${baseURL}/api/v1/products/${productId}?userId=${parsedUserId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Token ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
        setLoading(false);
        setShowStatus(true);
        location.reload();
      } catch (error: any) {
        setError(error.message);
        setData(null);
        setLoading(false);
        setShowStatus(true);
        console.log('Error Response Data:', error.message); // Log the error message
      }
    } else {
      alert('You are not online: These changes can only be made when online!');
    }
  };

  useEffect(() => {
    const delayedComponent = setTimeout(() => {
      setShowStatus(false);
    }, 3000);

    return () => clearTimeout(delayedComponent);
  }, [showStatus]);

  return (
    <div
      className={`${styles.dashboard} bg-[#F8F8FA] w-[93.8vw] h-[100vh] py-[48px] px-[49px]`}
    >
      {/* Header */}
      <div className="flex justify-between my-5 flex-col lg:flex-row items-center">
        <h3
          className="mb-4 md:mb-0"
          style={{
            fontSize: 24,
            fontFamily: fonts.family.medium,
          }}
        >
          Product List
        </h3>
        <div className="flex items-center">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Products"
            className="px-3 py-2 rounded-l-md outline-none w-[20rem]"
          />
          <div
            className={`bg-[#E1F5FD] h-[42px] w-10 flex justify-center items-center rounded-r-md hover:cursor-pointer border-[1px] border-solid border-gray-500`}
          >
            <img src={images.search} width={24} alt="" />
          </div>
        </div>
        <Link to={'/create-product'}>
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
            {products?.length ? 'Add Product' : 'Create Product'}
          </button>
        </Link>
      </div>

      {products?.length ? (
        <div className="flex flex-wrap">
          {products?.map((item: Product, _: number) => {
            const imageFormat = useImageFormat(item.imageFormat);

            return (
              <div
                key={_}
                className={`relative border-solid border-[1px] border-slate-200 rounded-lg p-3 hover:shadow-md shadow-sm bg-white flex max-w-[35rem] min-w-[35rem] ${
                  _ % 2 !== 0 ? 'lg:ml-[30px]' : 0
                }`}
                style={{
                  marginTop: 20,
                }}
              >
                {item.image ? (
                  <img
                    src={`${imageFormat}${item.image}`}
                    width={130}
                    className="h-[130px] object-cover"
                    alt=""
                  />
                ) : (
                  <img
                    src={images.imgThumbnail}
                    width={130}
                    className="h-[130px] object-contain"
                    alt=""
                  />
                )}
                <div className="ml-5 mt-6">
                  <h4
                    style={{
                      fontSize: 24,
                      fontFamily: fonts.family.medium,
                    }}
                  >
                    {item.name}
                  </h4>
                  <h4 style={{ fontFamily: fonts.family.regular }}>
                    Price:{' '}
                    <span className="text-green-500 text-xl">
                      ₦{item?.discountPrice}
                    </span>
                  </h4>
                  <h5>Original Price: ₦{item?.price}</h5>
                </div>

                <div className="flex">
                  <button
                    onClick={() => handleDeleteProduct(item?._id as string)}
                    className="absolute right-4 top-4"
                  >
                    <img
                      width={24}
                      height={24}
                      src={images.delete}
                      alt="delete"
                    />
                  </button>
                  <Link
                    to={'/edit-product'}
                    state={{ product: item }}
                    className="absolute right-14 top-4"
                  >
                    <img
                      width={24}
                      height={24}
                      src={images.edit}
                      alt="delete"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty Product Page
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
      {showStatus && (
        <div className="flex justify-center items-center w-full">
          <div
            className={`absolute bottom-5 rounded-md p-2 font-semibold ${
              data && 'bg-green-300'
            } ${error && 'bg-orange-300'}`}
          >
            {error && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {error}
              </p>
            )}
            {data?.status === 200 && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {data.detail}
              </p>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center w-full">
          <div
            className={`absolute bottom-5 rounded-md p-2 font-semibold bg-blue-800`}
          >
            <p
              className="text-black"
              style={{ fontFamily: fonts.family.medium }}
            >
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
