import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../styled';
import { generateRandomNumber } from 'renderer/hooks/useRandomId';
import { getCurrentFormattedDate } from 'renderer/hooks/useCurrentDate';
import { formatToCurrency, formatToCurrencySubTotal } from 'renderer/hooks/formatCurrency';
import { useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';

interface StandardInvoiceProp  {
  data: any;
}

const StandardInvoice: React.FC<StandardInvoiceProp> = ({ data }) => {
    const serviceProviderRX = useSelector((state: AppState) => state.data.serviceProvider);
    const [serviceProvider, setServiceProvider] = useState<any>();
    const localServiceProvider = localStorage.getItem('serviceProvider');

    useEffect(() => {
      if(serviceProviderRX == null) {
        localServiceProvider && setServiceProvider(JSON.parse(localServiceProvider));
      } else {
        setServiceProvider(serviceProviderRX);
      }
    }, []);


  const totalPrice = data.products.reduce((total: number, product: any) => {
    const productPrice = product.price * product.itemCount;
    return total + productPrice;
  }, 0);

  return (
    <div className="bg-[#ffffff] lg:min-w-[50rem] w-[30rem] mt-20 py-20 mb-6">
      <h3 className="text-4xl text-slate-800 font-semi mx-[5rem]" style={{ fontFamily: fonts.family.roboto_bold }}>{serviceProvider?.companyName}</h3>
      <span className="text-sm text-slate-500 font-light mx-[5rem]" style={{ fontFamily: fonts.family.roboto_bold }}>Changing narrative with a touch of our ink.</span>
      {/* Long Horizontal Line */}
      <div className="flex items-center justify-between">
        <div className={`bg-[${colors.primary}] w-full h-10`}></div>
        <div style={{ fontFamily: fonts.family.roboto_bold }} className="text-[3.2rem] mx-6">INVOICE</div>
        <div className={`bg-[${colors.primary}] w-[16rem] h-10`}></div>
      </div>

      <div className="flex justify-between mx-[5rem]">
        <div className="max-w-[12rem]">
          <h3 className="text-slate-800 text-3xl" style={{ fontFamily: fonts.family.roboto_bold, fontSize: 20 }}>Invoice to:</h3>
          <h3 className="text-slate-800 text-xl" style={{ fontFamily: fonts.family.roboto_bold, fontSize: 14 }}>{data.clientName}</h3>
          <span className={`text-slate-500 font-semibold`} style={{ fontFamily: fonts.family.roboto_bold, fontSize: 12 }}>{serviceProvider?.address}</span>
        </div>

        <div className="flex items-start flex-col w-[19rem] ml-[-12rem]">
          <div className="flex items-center justify-between w-full">
            <h4 className="text-slate-800 text-[1.2rem] mr-20" style={{ fontFamily: fonts.family.roboto_bold }}>Invoice#</h4>
            <h4 style={{ fontFamily: fonts.family.roboto_bold }}>{generateRandomNumber(5)}</h4>
          </div>

          <div className="flex items-center justify-between w-full">
            <h4 className="text-slate-800 text-xl mr-20" style={{ fontFamily: fonts.family.roboto_bold, fontSize: 20 }}>Date</h4>
            <h4 style={{ fontFamily: fonts.family.roboto_bold }}>{getCurrentFormattedDate()}</h4>
          </div>
        </div>
      </div>

      <div className="lg:max-w-[70rem] mt-12 w-full flex justify-center items-center">
        <table className="w-full border-[1px] border-solid border-slate-600 mx-[5rem]">
            <thead style={{ fontFamily: fonts.family.roboto_bold }} className="text-white bg-slate-800">
              <tr className="w-full">
                <td style={{ fontSize: 14 }} className="py-3 px-5">S/N.</td>
                <td style={{ fontSize: 14 }} className="py-3 px-5">Item Description</td>
                <td style={{ fontSize: 14 }} className="py-3 px-5">Price</td>
                <td style={{ fontSize: 14 }} className="py-3 px-5">Qty.</td>
                <td style={{ fontSize: 14 }} className="py-3 px-5">Total</td>
              </tr>
            </thead>
            <tbody className="">
              {data.products.map((item: ProductWithCount, _:number) => {
                return (
                  <tr key={_+"generatedInvoice"} style={{ backgroundColor: _ % 2 !== 0 ? "#eeeeee" : colors.white }} className="w-full">
                    <td style={{ fontFamily: fonts.family.regular, fontSize: 12 }} className="py-3 px-5 text-slate-800">{_ + 1}</td>
                    <td style={{ fontFamily: fonts.family.regular, fontSize: 12 }} className="py-3 px-5 text-slate-800">{item.name}</td>
                    <td style={{ fontFamily: fonts.family.regular, fontSize: 12 }} className="py-3 px-5 text-slate-800">{formatToCurrency(item.price)}</td>
                    <td style={{ fontFamily: fonts.family.regular, fontSize: 12 }} className="py-3 px-5 text-slate-800">{item.itemCount}</td>
                    <td style={{ fontFamily: fonts.family.regular, fontSize: 12 }} className="py-3 px-5 text-slate-800">{formatToCurrencySubTotal(item.price, item.itemCount)}</td>
                  </tr>
                )
              })}
              <div className={'h-32'}></div>
            </tbody>
          </table>

        </div>
        <div className="h-5 mt-6 ml-[5rem] flex justify-between items-start mb-20">
          <div className="max-w-[20rem]">
            <h3 style={{ fontFamily: fonts.family.roboto_bold, color: colors.darkText, fontSize: 14 }}>Thank you for your patronage 🎉</h3>
            <h2 style={{ fontFamily: fonts.family.roboto_bold, color: colors.darkText, fontSize: 14 }}>Terms & Conditions⚠️</h2>
            <p style={{ fontFamily: fonts.family.regular, color: colors.lightText, fontSize: 12 }}>{serviceProvider?.termsAndCondition}</p>
          </div>
          <div>
            <div className="flex mb-3 items-center mr-[5rem] justify-between">
              <h4 className="ml-6" style={{ fontFamily: fonts.family.medium, color: colors.darkText, fontSize: 14 }}>Sub Total:</h4>
              <h4 style={{ fontFamily: fonts.family.medium, color: colors.darkText, fontSize: 14 }}>{formatToCurrency(totalPrice)}</h4>
            </div>
            <div className="flex mb-3 items-center mr-[5rem] justify-between">
              <h4 className="ml-6" style={{ fontFamily: fonts.family.medium, color: colors.darkText, fontSize: 14 }}>Tax:</h4>
              <h4 style={{ fontFamily: fonts.family.medium, color: colors.darkText, fontSize: 14 }}>{"0.00%"}</h4>
            </div>
            <div className="flex justify-between items-center pr-[5rem] px-6 py-2" style={{ backgroundColor: colors.primary }}>
              <h1 className="mr-20" style={{ fontFamily: fonts.family.medium, color: colors.white, fontSize: 16}}>Total:</h1>
              <h1 style={{ fontFamily: fonts.family.medium, color: colors.white, fontSize: 16}}>{formatToCurrency(totalPrice)}</h1>
            </div>
          </div>
        </div>
        <div className="mt-6 ml-[5rem]">
          <h2 style={{ fontFamily: fonts.family.roboto_bold, color: colors.darkText, fontSize: 14 }}>Payment Info:</h2>
          <table>
            <tr style={{ fontFamily: fonts.family.regular, color: colors.lightText, fontSize: 12 }}>
              <td>Account #:</td>
              <td>{serviceProvider?.paymentInfo[0]?.accountNumber}</td>
            </tr>
            <tr style={{ fontFamily: fonts.family.regular, color: colors.lightText, fontSize: 12 }}>
              <td>A/C Name:</td>
              <td>{serviceProvider?.paymentInfo[0]?.accountName}</td>
            </tr>
            <tr style={{ fontFamily: fonts.family.regular, color: colors.lightText, fontSize: 12 }}>
              <td>Bank Details:</td>
              <td>{serviceProvider?.paymentInfo[0]?.bankName}</td>
            </tr>
          </table>
        </div>

        {/* Long Horizontal Line */}
      <div className="flex items-center justify-between">
        <div className={`bg-[${colors.primary}] w-full h-1`}></div>
        <div className="flex flex-col justify-start items-center mb-[-20px] mx-5">
          <div className={`bg-[${colors.primary}] w-[9rem] h-[0.7px]`}></div>
          <p className="w-[9rem] flex justify-center mt-1" style={{ fontFamily: fonts.family.regular }}>Authorized Sign</p>
        </div>
        <div className={`bg-[${colors.primary}] w-[16rem] h-1`}></div>
      </div>
    </div>
  )
}

export default StandardInvoice
