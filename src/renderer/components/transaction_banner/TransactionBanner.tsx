import React, { useEffect, useState } from 'react';
import { images } from '../../../../assets/images';
import { accessToken, baseURL, fonts } from '../styled';
import { ColorRing } from 'react-loader-spinner';

const Banner = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);

  const requestTransactionReport = async (event: any) => {
    if (navigator.onLine) {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseURL}/api/v1/reports/sendTransaction?userId=${parsedUserId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setLoading(false);
        setShowStatus(true);
        setData(result);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error);
        setData(null);
        setShowStatus(true);
      }
    } else {
      alert('You can only request reports when online!');
      setLoading(false);
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
      className="
        bg-[#3855B3]
        p-4
        flex
        items-center
        justify-between
        text-white
        text-sm
        relative
      "
    >
      <div className="flex items-center ml-10">
        <span
          className="
            capitalize
            font-regular
          "
        >
          {'Customer'}
        </span>
      </div>
      <div className="flex flex-grow ml-12 md:ml-44">
        <div className="w-1/2">
          <h3
            className="capitalize"
            style={{
              fontFamily: fonts.family.regular,
              fontSize: 14,
            }}
          >
            {'Status'}
          </h3>
        </div>
        <div className="w-1/2">
          <h3
            className="capitalize"
            style={{
              fontFamily: fonts.family.regular,
              fontSize: 14,
            }}
          >
            {'Priority'}
          </h3>
        </div>
        <div className="absolute right-10 top-[0.50rem]">
          <button
            onClick={requestTransactionReport}
            className="
              h-10 px-3
              rounded-[8px]
              text-[#3855B3] flex
              items-center
              hover:border-solid
              hover:border-[#ffffff]
              border-[1px]
              border-solid
              hover:bg-[#3855B3]
              hover:text-[#ffffff]
              bg-[#ffffff]
              transition-all
              duration-500
              ease-in-out
            "
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#ECD348', '#ECD348', '#ECD348', '#ECD348', '#ECD348']}
              />
            ) : (
              'Request Report'
            )}
          </button>
        </div>
      </div>
      {showStatus && (
        <div className="flex justify-center items-center w-full">
          <div
            className={`absolute top-[0.50rem] right-44 rounded-md p-2 font-semibold ${
              data && 'bg-green-300'
            } ${error && 'bg-orange-300'}`}
          >
            {error && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {error.message}
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
    </div>
  );
};

export default Banner;
