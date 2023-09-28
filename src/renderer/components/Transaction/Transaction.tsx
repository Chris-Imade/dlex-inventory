import React, { useState, memo, useEffect } from 'react';
import { images } from '../../../../assets/images';
import { accessToken, baseURL, colors, fonts } from '../styled';
import CustomDropdown from './CustomDropdown';
import { ColorRing } from 'react-loader-spinner';

const Transaction: React.FC<TransactionListProps> = ({ item }) => {
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // State to hold the selected status
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);

  console.log(data);

  const handleDropdown = () => {
    setShowDropDown((previous) => !previous);
  };

  const handleSaveStatus = async (status: string, id: string | undefined) => {
    setLoading(true);
    if (navigator.onLine) {
      // do some realtime updating here

      try {
        const response = await fetch(
          `${baseURL}/api/v1/transaction/${id}?userId=${parsedUserId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Token ${accessToken}`,
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
            body: JSON.stringify({ status }),
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
      }
    } else {
      alert('You are not online: These changes can only be made when online!');
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
    <>
      <div
        className="
            w-full
            border-[1px]
            border-solid
            rounded-lg
            h-16
            flex
            items-center
            p-[20px]
            bg-white
            hover:shadow-sm
            transition-all
            duration-500
            ease-in-out
            relative
          "
      >
        <div className="flex items-center">
          <div className="w-[32px] h-[32px] rounded-full bg-[#F2E7FC] flex justify-center items-center">
            <img width={20} height={20} src={images.profile} alt="" />
          </div>
          <h3
            style={{
              fontFamily: fonts.family.regular,
              fontSize: 14,
              marginLeft: 12,
            }}
          >
            {item?.clientName}
          </h3>
        </div>
        <div className="flex justify-between items-center flex-grow ml-12 md:ml-36">
          <div className="w-1/2">
            <h3
              onClick={() => setShowStatusModal(!showStatusModal)}
              className="hover:cursor-pointer hover:opacity-70 uppercase w-fit rounded-[100px] px-3 py-1"
              style={{
                fontFamily: fonts.family.regular,
                fontSize: 14,
                backgroundColor:
                  item?.status === 'waiting'
                    ? '#F2E7FC'
                    : item?.status === 'pending'
                    ? '#E1F5FD'
                    : item?.status === 'closed'
                    ? '#E8F5E9'
                    : item?.status === 'canceled'
                    ? '#E8F5E9'
                    : 'rgba(86,87,88,0.12)',
                color:
                  item?.status === 'pending'
                    ? colors.primary
                    : item?.status === 'waiting'
                    ? '#8C18E2'
                    : item?.status === 'closed'
                    ? '#4CAF50'
                    : item?.status === 'canceled'
                    ? 'red'
                    : '',
              }}
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#ECD348',
                    '#ECD348',
                    '#ECD348',
                    '#ECD348',
                    '#ECD348',
                  ]}
                />
              ) : (
                item?.status
              )}
              ↕
            </h3>
            {showStatusModal && (
              <div className={`animated-modal p-2 pt-4 w-44`}>
                <ul>
                  <li className="flex items-center mb-3">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={selectedStatus === 'Waiting'} // Check if 'Waiting' is selected
                      onChange={() => setSelectedStatus('Waiting')} // Update selected status on change
                    />
                    <h4>Waiting</h4>
                  </li>
                  <li className="flex items-center mb-3">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={selectedStatus === 'Pending'} // Check if 'Pending' is selected
                      onChange={() => setSelectedStatus('Pending')} // Update selected status on change
                    />
                    <h4>Pending</h4>
                  </li>
                  <li className="flex items-center mb-3">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={selectedStatus === 'Closed'} // Check if 'Closed' is selected
                      onChange={() => setSelectedStatus('Closed')} // Update selected status on change
                    />
                    <h4>Closed</h4>
                  </li>
                  <li className="flex items-center mb-3">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={selectedStatus === 'Canceled'} // Check if 'Canceled' is selected
                      onChange={() => setSelectedStatus('Canceled')} // Update selected status on change
                    />
                    <h4>Canceled</h4>
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <button
                    className="px-2 py-1 text-white rounded-md"
                    onClick={() => setShowStatusModal(false)}
                  >
                    <img
                      src={images.close}
                      className=""
                      width={20}
                      alt="close"
                    />
                  </button>
                  <button
                    className="px-2 py-1 text-white rounded-md"
                    onClick={() => {
                      // You can access the selected status here with the state variable selectedStatus
                      setShowStatusModal(false);
                      console.log(
                        'Selected Status:',
                        selectedStatus,
                        'Item ID:',
                        item._id
                      );
                      handleSaveStatus(selectedStatus, item._id);
                    }}
                  >
                    <img src={images.tick} className="" width={28} alt="tick" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-1/2">
            <h3
              className="hover:cursor-pointer hover:opacity-70 uppercase rounded-[100px] w-fit px-3 py-1"
              style={{
                fontFamily: fonts.family.regular,
                fontSize: 14,
                backgroundColor: 'rgba(86,87,88,0.12)',
              }}
            >
              {item?.priority}↕
            </h3>
          </div>
          <CustomDropdown
            item={item}
            handleDropdown={handleDropdown}
            showDropDown={showDropDown}
          />
        </div>
      </div>
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
    </>
  );
};

export default memo(Transaction);
