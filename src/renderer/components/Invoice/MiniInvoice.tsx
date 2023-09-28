import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../styled';
import { generateRandomNumber } from 'renderer/hooks/useRandomId';
import { getCurrentFormattedDate } from 'renderer/hooks/useCurrentDate';
import {
  formatToCurrency,
  formatToCurrencySubTotal,
} from 'renderer/hooks/formatCurrency';
import { useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';

interface StandardInvoiceProp {
  data: any;
}

const MiniInvoice: React.FC<StandardInvoiceProp> = ({ data }) => {
  const serviceProviderRX = useSelector(
    (state: AppState) => state.data.serviceProvider
  );
  const [serviceProvider, setServiceProvider] = useState<any>();
  const localServiceProvider = localStorage.getItem('serviceProvider');

  useEffect(() => {
    if (serviceProviderRX == null) {
      localServiceProvider &&
        setServiceProvider(JSON.parse(localServiceProvider));
    } else {
      setServiceProvider(serviceProviderRX);
    }
  }, []);

  const totalPrice = data.products.reduce((total: number, product: any) => {
    const productPrice = product.price * product.itemCount;
    return total + productPrice;
  }, 0);

  return (
    <div className="mt-24 p-20">
      <div className="w-[20rem] h-full bg-white shadow-lg py-5 px-3">
        <h4
          style={{ fontFamily: fonts.family.medium }}
          className="text-center font-semibold"
        >
          {serviceProvider?.companyName}
        </h4>
        <div className="flex items-center justify-between">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            Invoice ID: {generateRandomNumber(5)}
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {getCurrentFormattedDate()}
          </p>
        </div>
        {/* Main Contents */}
        <div className="flex items-center justify-between">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            Customer Name:
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {data.clientName}
          </p>
        </div>
        <table className="mt-3 border-b-[1px] border-solid border-slate-800">
          <thead
            style={{ fontFamily: fonts.family.roboto_bold }}
            className="text-white bg-slate-800"
          >
            <tr className="w-full">
              <td
                style={{ fontSize: 13, fontFamily: fonts.family.medium }}
                className="px-1"
              >
                S/N.
              </td>
              <td
                style={{ fontSize: 13, fontFamily: fonts.family.medium }}
                className="px-1"
              >
                Item
              </td>
              <td
                style={{ fontSize: 13, fontFamily: fonts.family.medium }}
                className="px-1"
              >
                Price
              </td>
              <td
                style={{ fontSize: 13, fontFamily: fonts.family.medium }}
                className="px-1"
              >
                Qty.
              </td>
              <td
                style={{ fontSize: 13, fontFamily: fonts.family.medium }}
                className="px-1"
              >
                Total
              </td>
            </tr>
          </thead>
          <tbody className="">
            {data.products.map((item: ProductWithCount, _: number) => {
              return (
                <tr
                  key={_ + 'generatedInvoice'}
                  style={{
                    backgroundColor: _ % 2 !== 0 ? '#eeeeee' : colors.white,
                  }}
                  className="w-full"
                >
                  <td
                    style={{ fontFamily: fonts.family.regular, fontSize: 12 }}
                    className="px-1 text-slate-800"
                  >
                    {_ + 1}
                  </td>
                  <td
                    style={{ fontFamily: fonts.family.regular, fontSize: 12 }}
                    className="px-1 text-slate-800"
                  >
                    {item.name}
                  </td>
                  <td
                    style={{ fontFamily: fonts.family.regular, fontSize: 12 }}
                    className="px-1 text-slate-800"
                  >
                    {formatToCurrency(item.price)}
                  </td>
                  <td
                    style={{ fontFamily: fonts.family.regular, fontSize: 12 }}
                    className="px-1 text-slate-800"
                  >
                    {item.itemCount}
                  </td>
                  <td
                    style={{ fontFamily: fonts.family.regular, fontSize: 12 }}
                    className="px-1 text-slate-800"
                  >
                    {formatToCurrencySubTotal(item.price, item.itemCount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between my-2">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            Total Price:
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {formatToCurrency(totalPrice)}
          </p>
        </div>
        {/* Payment Information */}

        <h2
          style={{
            fontFamily: fonts.family.roboto_bold,
            color: colors.darkText,
            fontSize: 14,
          }}
        >
          Payment Info:
        </h2>
        <div className="flex items-center justify-between mt-2">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            Account #:
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {serviceProvider?.paymentInfo[0]?.accountNumber}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            A/C Name:
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {serviceProvider?.paymentInfo[0]?.accountName}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h1 style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            Bank Details:
          </h1>
          <p style={{ fontFamily: fonts.family.regular, fontSize: 12 }}>
            {serviceProvider?.paymentInfo[0]?.bankName}
          </p>
        </div>
        <span
          className={`text-slate-500 font-semibold`}
          style={{ fontFamily: fonts.family.roboto_bold, fontSize: 12 }}
        >
          Our Location: {serviceProvider?.address}
        </span>
        <div className="mt-3">
          <h3
            style={{
              fontFamily: fonts.family.roboto_bold,
              color: colors.darkText,
              fontSize: 14,
            }}
            className="text-center mb-2"
          >
            Thank you for your patronage🎉
          </h3>
          <h2
            style={{
              fontFamily: fonts.family.roboto_bold,
              color: colors.darkText,
              fontSize: 14,
            }}
          >
            Terms & Conditions⚠️
          </h2>
          <p
            style={{
              fontFamily: fonts.family.regular,
              color: colors.lightText,
              fontSize: 12,
            }}
          >
            {serviceProvider?.termsAndCondition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniInvoice;
