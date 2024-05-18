import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageIndex } from 'renderer/Redux/Splice/appSlice';
import { AppState } from 'renderer/Redux/store';
import { accessToken, baseURL, fonts } from 'renderer/components/styled';
import styles from './styles.module.css';
import ProductCart from './ProductCart';
import { Audio, ColorRing } from 'react-loader-spinner';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const NewTransaction = () => {
  const pageIndex = useSelector((state: AppState) => state.data.pageIndex);
  const transactionProducts = useSelector(
    (state: AppState) => state.data.transactionProducts
  );

  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const [email, setEmail] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [phoneTwo, setPhoneTwo] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>('Pending');
  const [priority, setPriority] = useState<string | null>('High');
  const [deadline, setDeadline] = useState<string>();
  const [desc, setDesc] = useState<string | null>(null);
  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);

  const dispatch = useDispatch();
  const uniqueId = uuidv4();

  // Function to save pending transaction to local storage
  const savePendingTransaction = (transactionData: any) => {

    // create an object to append uniqueIdentifier to
    const transactionWithUUID = {
      ...transactionData,
      uniqueIdentifier: uniqueId,
    };

    // Create a seprate storage bucket for the pending data
    const pendingTransactions = JSON.parse(
      localStorage.getItem('pendingTransactions') || '[]'
    );
    pendingTransactions.push(transactionWithUUID);
    localStorage.setItem(
      'pendingTransactions',
      JSON.stringify(pendingTransactions)
    );
    // Add the transaction to the transactions on LS so that the app works just normal
    const transactions = JSON.parse(
      localStorage.getItem('transactions') || '[]'
    );
    transactions.push(transactionWithUUID);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const handleCreateTransaction = async (event: any) => {
    event.preventDefault();
    const hereToDB = {
      products: transactionProducts,
      email,
      phone,
      phoneTwo,
      clientName: fullname,
      status,
      priority,
      deadline,
      desc,
      uniqueIdentifier: uniqueId
    };

    if (
      hereToDB.email !== null &&
      hereToDB.phone !== null &&
      hereToDB.products !== null &&
      hereToDB.clientName !== null
    ) {
      setLoading(true);

      try {
        const response = await fetch(`${baseURL}/api/v1/transaction?userId=${parsedUserId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${accessToken}`,
          },
          body: JSON.stringify(hereToDB),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setLoading(false);
        setShowStatus(true);
        setData(result);
        setError(null);
        location.reload();
      } catch (error) {
        setLoading(false);
        setError(error);
        setData(null);
        setShowStatus(true);
        // Network fail safe
        if (error && !navigator.onLine) {
          savePendingTransaction(hereToDB);
          setData({
            message: 'Successful',
            status: 201,
            detail: 'Transaction created successfully',
          });
          setError(null);
          location.reload();
        }
      }
    } else {
      alert('All fields are required!!');
    }
  };

  useEffect(() => {
    const delayedComponent = setTimeout(() => {
      setShowStatus(false);
    }, 3000);

    return () => clearTimeout(delayedComponent);
  }, [showStatus]);

  return (
    <div>
      {pageIndex === 0 ? (
        <ProductCart />
      ) : pageIndex === 1 ? (
        <div
          className={`${styles.dashboard} py-[48px] px-[49px] w-[93.8vw] h-[100vh]`}
        >
          <button
            onClick={() => dispatch(setPageIndex(0))}
            className="mb-[49px]"
            style={{
              fontFamily: fonts.family.medium,
              fontSize: 24,
            }}
          >
            <span>&larr;</span>
            Provide Details
          </button>
          <form>
            <div className="flex flex-grow-0 justify-between flex-col md:flex-row">
              <div className="flex flex-col w-1/2">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="name"
                >
                  Full name
                </label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="username"
                  required
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder=""
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="flex flex-grow-0 justify-between flex-col md:flex-row mt-5">
              <div className="flex flex-col w-1/2">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=""
                  name="phone"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="phone_number"
                >
                  Phone Number 2 (Optional)
                </label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=""
                  name="number"
                  onChange={(e) => setPhoneTwo(e.target.value)}
                />
              </div>
            </div>
            {/* Third Row */}
            <div className="flex flex-grow-0 justify-between flex-col md:flex-row mt-5 w-full">
              <div className="flex flex-col mt-5 w-full">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="details"
                >
                  Job Details
                </label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="p-4 mt-4 w-full h-36 border-[1px] border-solid border-[#eeeeee]"
                  placeholder="Describe the job here..."
                ></textarea>
              </div>
            </div>
            {/* Fourth Row */}
            <div className="flex flex-grow-0 justify-between items-center flex-col md:flex-row mt-5 ml-[-19rem] md:ml-0">
              <div className="flex flex-col w-[10rem]">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  onChange={(e) => setPriority(e.target.value)}
                  className={styles.input}
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Uncertain">Uncertain</option>
                </select>
              </div>
              <div className="flex flex-col w-[10rem]">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className={styles.input}
                >
                  <option value="Pending">Pending</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex flex-col w-[10rem]">
                <label
                  style={{
                    fontFamily: fonts.family.medium,
                    fontSize: 20,
                  }}
                  htmlFor="deadline"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleCreateTransaction}
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
                justify-center
                  ease-in-out
                  w-full
                  mt-11
                  max-w-[70rem]"
              style={{
                padding: 30,
                fontFamily: fonts.family.medium,
                fontSize: 20,
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
                'Add Transaction'
              )}
            </button>
          </form>
        </div>
      ) : null}

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
            {data?.status === 201 && (
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

export default NewTransaction;
