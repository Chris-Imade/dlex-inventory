import React, { useEffect, useState } from 'react';
import { colors, fonts } from 'renderer/components/styled';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { images } from '../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import { setActiveRoute } from 'renderer/Redux/Splice/appSlice';

const Aside = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showDelayedItems, setShowDelayedItems] = useState(false);
  const activeRoute = useSelector((state: AppState) => state.data.activeRoute);
  // Redux state selectors
  const isSyncing = useSelector((state: AppState) => state.data.isSyncing);
  const totalPendingItems = useSelector(
    (state: AppState) => state.data.totalPendingItems
  );
  const itemsSynced = useSelector((state: AppState) => state.data.itemsSynced);

  const serviceProvider = localStorage.getItem('serviceProvider');
  const parsedSP = serviceProvider && JSON.parse(serviceProvider);

  const dispatch = useDispatch();

  // Add a delay to the transitions
  useEffect(() => {
    let timeoutId: any;

    if (hovered) {
      timeoutId = setTimeout(() => {
        setShowDelayedItems(true);
      }, 400); // Adjust the delay duration as needed
    } else {
      setShowDelayedItems(false);
    }

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount or hover out
  }, [hovered]);

  return (
    <div
      onMouseOut={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
      className={`h-[100vh] cursor-pointer px-[24px] ${
        hovered
          ? styles.aside_container_when_hovered
          : styles.aside_container_not_hovered
      }`}
      style={{ backgroundColor: colors.primary }}
    >
      {hovered ? (
        <div className="flex flex-col justify-between h-full">
          <div>
            <Link to={'/'}>
              <div className="pt-[24px]">
                <img src={images.logo} width={80} height={32} alt="" />
              </div>
            </Link>
            <div className={'h-[0.1px] bg-[#E6E7E9] w-full my-[24px]'} />
            <Link
              onClick={() => dispatch(setActiveRoute('settings'))}
              to={'/settings'}
              className={
                'bg-[#4A4DE6] h-[70px] rounded-[8px] shadow-sm flex justify-around items-center mb-[24px]'
              }
            >
              <div
                className={
                  'w-[32px] h-[32px] rounded-full bg-[#ECD348] flex justify-center items-center'
                }
                style={{ fontFamily: fonts.family.medium, fontSize: 12 }}
              >
                {parsedSP.username.split('')[0].toUpperCase()}
              </div>
              {showDelayedItems && (
                <div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                      color: colors.white,
                    }}
                  >
                    {parsedSP.username}
                  </h3>
                  <h5
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                      color: 'rgba(255, 255, 255,  0.42)',
                    }}
                  >
                    Edit Profile
                  </h5>
                </div>
              )}
              <div>
                <img src={images.selectIcon} width={32} height={32} alt="" />
              </div>
            </Link>

            {/* Nav Items */}
            <Link to={'/'}>
              <div
                onClick={() => dispatch(setActiveRoute('dashboard'))}
                className="flex items-center hover:bg-[#0e0e2634] h-[40px] p-1 rounded-[8px] my-3"
                style={{
                  backgroundColor:
                    activeRoute === 'dashboard' ? '#0e0e2634' : colors.primary,
                }}
              >
                <img src={images.homeIcon} width={24} height={24} alt="" />
                {showDelayedItems && (
                  <h3
                    className="ml-[12px]"
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                    }}
                  >
                    Dashboard
                  </h3>
                )}
              </div>
            </Link>
            {/* Products */}
            <Link to={'/products'}>
              <div
                onClick={() => dispatch(setActiveRoute('products'))}
                className="flex items-center hover:bg-[#0e0e2634] h-[40px] p-1 rounded-[8px] my-3"
                style={{
                  backgroundColor:
                    activeRoute === 'products' ? '#0e0e2634' : colors.primary,
                }}
              >
                <img
                  src={
                    activeRoute === 'products'
                      ? images.product
                      : images.inactiveProduct
                  }
                  width={24}
                  height={24}
                  alt=""
                />
                {showDelayedItems && (
                  <h3
                    className="ml-[12px]"
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                    }}
                  >
                    Products
                  </h3>
                )}
              </div>
            </Link>
            {/* Transactions */}
            <Link to={'/transactions'}>
              <div
                onClick={() => dispatch(setActiveRoute('transactions'))}
                className="flex items-center hover:bg-[#0e0e2634] h-[40px] p-1 rounded-[8px] my-3"
                style={{
                  backgroundColor:
                    activeRoute === 'transactions'
                      ? '#0e0e2634'
                      : colors.primary,
                }}
              >
                <img
                  src={
                    activeRoute === 'transactions'
                      ? images.transactions
                      : images.inactive_transactions
                  }
                  width={24}
                  height={24}
                  alt=""
                />
                {showDelayedItems && (
                  <h3
                    className="ml-[12px]"
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                    }}
                  >
                    Transactions
                  </h3>
                )}
              </div>
            </Link>
          </div>
          {/* Bottom Part of the sidebar */}
          <div>
            {/* Settings */}
            <Link to={'/settings'}>
              <div
                onClick={() => dispatch(setActiveRoute('settings'))}
                className="flex items-center hover:bg-[#0e0e2634] h-[40px] p-1 rounded-[8px] my-3"
                style={{
                  backgroundColor:
                    activeRoute === 'settings' ? '#0e0e2634' : colors.primary,
                }}
              >
                <img
                  src={
                    activeRoute === 'settings'
                      ? images.settings
                      : images.settings_inactive
                  }
                  width={24}
                  height={24}
                  alt=""
                />
                {showDelayedItems && (
                  <h3
                    className="ml-[12px]"
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                    }}
                  >
                    Settings
                  </h3>
                )}
              </div>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                location.reload();
              }}
              style={{
                color: colors.white,
                fontSize: 14,
                fontFamily: fonts.family.medium,
              }}
              className="flex items-center text-white px-3 bg-[#2f2fef2c] h-[40px] p-1 rounded-[8px] my-3 w-full"
            >
              Logout
            </button>
            <div className={'h-[0.1px] bg-[#E6E7E9] w-full my-[24px]'} />
            {/* First target to sync */}
            <div
              className={
                'bg-[#4A4DE6] h-[70px] rounded-[8px] shadow-sm flex justify-around items-center mb-[24px]'
              }
            >
              {isSyncing ? (
                <div className="relative">
                  <div className="relative">
                    <img src={images.cloudLoad} alt="cloud" />
                    <div className="absolute bg-[#4A4DE6] rounded-full w-6 h-6 top-6 left-3 border-solid border-[1px] border-gray-200 flex justify-center items-center">
                      <p className="text-xs text-white font-semibold">
                        {itemsSynced}
                      </p>
                      <p className="text-xs text-white font-semibold">/</p>
                      <p className="text-xs text-white font-semibold">
                        {totalPendingItems}
                      </p>
                    </div>
                  </div>
                  <img
                    className="absolute top-3 animate-spin"
                    src={images.syncLoad}
                    alt="sync load"
                  />
                </div>
              ) : (
                <div
                  className={
                    'w-[32px] h-[32px] rounded-full bg-[#ECD348] flex justify-center items-center'
                  }
                  style={{ fontFamily: fonts.family.medium, fontSize: 12 }}
                >
                  {parsedSP.username.split('')[0].toUpperCase()}
                </div>
              )}
              {showDelayedItems && (
                <div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.family.medium,
                      color: colors.white,
                    }}
                  >
                    {isSyncing ? 'Syncing' : parsedSP.username}
                  </h3>
                </div>
              )}
              <div>
                <img src={images.selectIcon} width={32} height={32} alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div>
            <Link to={'/'}>
              <div className="px-[9px] pt-[24px]">
                <img src={images.logo_single} width={24} height={24} alt="" />
              </div>
            </Link>

            <div className={'h-[0.1px] bg-[#E6E7E9] w-full my-[24px]'} />

            <div
              className={
                'bg-[#4A4DE6] h-[60px] rounded-[8px] shadow-sm flex justify-around items-center mb-[24px]'
              }
            >
              <div
                className={
                  'w-[32px] h-[32px] rounded-full bg-[#ECD348] flex justify-center items-center'
                }
                style={{ fontFamily: fonts.family.medium, fontSize: 12 }}
              >
                {parsedSP.username.split('')[0].toUpperCase()}
              </div>
            </div>

            {/* Home Icon */}
            <div
              style={{
                backgroundColor:
                  activeRoute === 'dashboard' ? '#0e0e2634' : colors.primary,
              }}
              className="flex items-center justify-center h-[40px] rounded-[8px] shadow-sm my-3"
            >
              <img src={images.homeIcon} width={24} height={24} alt="" />
            </div>
            {/* Products Icon */}
            <div
              style={{
                backgroundColor:
                  activeRoute === 'products' ? '#0e0e2634' : colors.primary,
              }}
              className="flex items-center justify-center h-[40px] rounded-[8px] shadow-sm my-3"
            >
              <img
                src={
                  activeRoute === 'products'
                    ? images.product
                    : images.inactiveProduct
                }
                width={24}
                height={24}
                alt=""
              />
            </div>
            {/* Transaction Icon */}
            <div
              style={{
                backgroundColor:
                  activeRoute === 'transactions' ? '#0e0e2634' : colors.primary,
              }}
              className="flex items-center justify-center h-[40px] rounded-[8px] shadow-sm my-3"
            >
              <img
                src={
                  activeRoute === 'transactions'
                    ? images.transactions
                    : images.inactive_transactions
                }
                width={24}
                height={24}
                alt=""
              />
            </div>
          </div>
          <div>
            {/* Settings Icon */}
            <div
              style={{
                backgroundColor:
                  activeRoute === 'settings' ? '#0e0e2634' : colors.primary,
              }}
              className="flex items-center justify-center h-[40px] rounded-[8px] shadow-sm my-3"
            >
              <img
                src={
                  activeRoute === 'settings'
                    ? images.settings
                    : images.settings_inactive
                }
                width={24}
                height={24}
                alt=""
              />
            </div>
            <div className={'h-[0.1px] bg-[#E6E7E9] w-full my-[24px]'} />
            {/* second target to sync */}
            <div
              className={
                'bg-[#4A4DE6] h-[70px] rounded-[8px] shadow-sm flex justify-around items-center mb-[24px]'
              }
            >
              {isSyncing ? (
                <div className="relative">
                  <div className="relative">
                    <img src={images.cloudLoad} alt="cloud" />
                    <div className="absolute bg-[#4A4DE6] rounded-full w-6 h-6 top-5 left-2 border-solid border-[1px] border-gray-200 flex justify-center items-center">
                      <p className="text-xs text-white font-semibold">
                        {itemsSynced}
                      </p>
                      <p className="text-xs text-white font-semibold">/</p>
                      <p className="text-xs text-white font-semibold">
                        {totalPendingItems}
                      </p>
                    </div>
                  </div>
                  <img
                    className="absolute top-3 animate-spin"
                    src={images.syncLoad}
                    alt="sync load"
                  />
                </div>
              ) : (
                <div
                  className={
                    'w-[32px] h-[32px] rounded-full bg-[#ECD348] flex justify-center items-center'
                  }
                  style={{ fontFamily: fonts.family.medium, fontSize: 12 }}
                >
                  {parsedSP.username.split('')[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aside;
