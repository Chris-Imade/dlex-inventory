import React, { useEffect, useId, useState } from 'react';
import styles from './styles.module.css';
import { accessToken, baseURL, fonts } from 'renderer/components/styled';
import { ColorRing } from 'react-loader-spinner';
import { setPassword } from 'renderer/Redux/Splice/appSlice';

const Settings: React.FC = () => {
  const userIdStringified = localStorage.getItem('userId');
  const parsedUserId = userIdStringified && JSON.parse(userIdStringified);
  const [userId, setUserId] = useState<string | null>(parsedUserId);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [loadingPaymentInfo, setLoadingPaymentInfo] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [termsAndCondition, setTermsAndCondition] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState<boolean>(false);
  // Profile
  const [profileData, setProfileData] = useState<any | null>(null);
  const [profileError, setProfileError] = useState<any | null>(null);
  // Payment
  const [paymentData, setPaymentData] = useState<any | null>(null);
  const [paymentError, setPaymentError] = useState<any | null>(null);

  console.log('UserId: ', userId);

  const handleUpdateProfile = async (event: any) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const profileUpdate = {
        email,
        username,
        password,
        address,
        termsAndCondition,
      };

      if (navigator.onLine) {
        setLoadingProfile(true);
        // Get userId
        try {
          console.log('UserId inside next function: ', userId);
          // do some realtime updating here when we have the userId
          if (userId !== null) {
            const response = await fetch(
              `${baseURL}${`/api/v1/users/user/${userId}`}`,
              {
                method: 'PUT',
                headers: {
                  Authorization: `Token ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileUpdate),
              }
            );
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setProfileData(result);
            setProfileError(null);
            setLoadingProfile(false);
            setShowStatus(true);
            location.reload();
          }
        } catch (error: any) {
          setProfileError(error.message);
          setProfileData(null);
          setLoadingProfile(false);
          setShowStatus(true);
          console.log('Error Response Data:', error.message); // Log the error message
        }
      } else {
        alert(
          'You are not online: These changes can only be made when online!'
        );
      }
    } else {
      alert('Password does not match⛔️');
    }
  };

  const handleUpdatePaymentInfo = async (event: any) => {
    event.preventDefault();
    const paymentUpdate = {
      bankName,
      accountName,
      accountNumber,
    };
    event.preventDefault();
    if (navigator.onLine) {
      setLoadingPaymentInfo(true);
      // Update Bank Information here
      // make sure we have the user's Id
      try {
        const response = await fetch(
          `${baseURL}${`/api/v1/users/user/${userId}`}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Token ${accessToken}`,
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
            body: JSON.stringify({ paymentInfo: paymentUpdate }),
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setPaymentData(result);
        setPaymentError(null);
        setLoadingPaymentInfo(false);
        setShowStatus(true);
        location.reload();
      } catch (error: any) {
        setPaymentError(error.message);
        setPaymentData(null);
        setLoadingPaymentInfo(false);
        setShowStatus(true);
        console.log(error);
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
  }, [showStatus, showPaymentStatus]);

  return (
    <div
      className={`${styles.dashboard} py-[48px] px-[49px] w-[93.8vw] h-[100vh] `}
    >
      <form onSubmit={handleUpdateProfile}>
        <h4 style={{ fontFamily: fonts.family.roboto_bold, fontSize: 24 }}>
          Update Account
        </h4>
        {/* ROW */}
        <div className="flex flex-col md:flex-row">
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] lg:w-[500px]`}
            />
          </div>
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] md:w-[500px]`}
            />
          </div>
        </div>
        {/* ROW */}
        <div className="flex flex-col md:flex-row">
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="confirm-password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] lg:w-[500px]`}
            />
          </div>
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="username"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirm-password"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] md:w-[500px]`}
            />
          </div>
        </div>
        {/* ROW */}
        <div className="flex flex-col md:flex-row">
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="address"
            >
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              id="address"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] lg:w-[500px]`}
            />
          </div>
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="termsAndCondition"
            >
              Terms & Condition
            </label>
            <input
              onChange={(e) => setTermsAndCondition(e.target.value)}
              type="text"
              id="termsAndCondition"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] md:w-[500px]`}
            />
          </div>
        </div>
        <button
          type="submit"
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
                lg:max-w-[70rem]
              "
          style={{ padding: 30, fontFamily: fonts.family.medium, fontSize: 20 }}
        >
          {loadingProfile ? (
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
            'Update Account'
          )}
        </button>
      </form>

      {/* PAYMENT INFOR */}
      <form onSubmit={handleUpdatePaymentInfo}>
        <h4
          style={{
            fontFamily: fonts.family.roboto_bold,
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Update Payment Information
        </h4>
        {/* ROW */}
        <div className="flex flex-col md:flex-row">
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="bankName"
            >
              Bank Name
            </label>
            <input
              onChange={(e) => setBankName(e.target.value)}
              type="text"
              id="bankName"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] lg:w-[500px]`}
            />
          </div>
          <div className="mt-6 flex flex-col md:w-1/2">
            <label
              style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
              htmlFor="accountName"
            >
              Account Name
            </label>
            <input
              onChange={(e) => setAccountName(e.target.value)}
              required
              type="text"
              id="accountName"
              className={`${styles.input} w-full lg:max-w-[500px] sm:max-w-[300px] md:w-[500px]`}
            />
          </div>
        </div>
        {/* ROW */}
        <div className="mt-6 flex flex-col w-full">
          <label
            style={{ fontFamily: fonts.family.regular, fontSize: 16 }}
            htmlFor="accountNumber"
          >
            Account Number
          </label>
          <input
            onChange={(e) => setAccountNumber(e.target.value)}
            type="text"
            id="accountNumber"
            className={`${styles.input} lg:max-w-[70rem]`}
          />
        </div>

        <button
          type="submit"
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
                  lg:max-w-[70rem]
                "
          style={{ padding: 30, fontFamily: fonts.family.medium, fontSize: 20 }}
        >
          {loadingPaymentInfo ? (
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
            'Update Payment Information'
          )}
        </button>
      </form>
      {showStatus && (
        <div className="flex justify-center items-center w-full">
          <div
            className={`absolute bottom-5 rounded-md p-2 font-semibold ${
              profileData && 'bg-green-300'
            } ${profileError && 'bg-orange-300'}`}
          >
            {profileError && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {profileError}
              </p>
            )}
            {profileData?.status === 200 && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {profileData.detail}
              </p>
            )}
          </div>
        </div>
      )}
      {showPaymentStatus && (
        <div className="flex justify-center items-center w-full">
          <div
            className={`absolute bottom-5 rounded-md p-2 font-semibold ${
              paymentData && 'bg-green-300'
            } ${paymentError && 'bg-orange-300'}`}
          >
            {paymentError && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {paymentError.message}
              </p>
            )}
            {paymentData?.status === 200 && (
              <p
                className="text-black"
                style={{ fontFamily: fonts.family.medium }}
              >
                {paymentData.detail}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
