import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fonts } from 'renderer/components/styled';
import { images } from '../../../../assets/images';
import styles from "./styles.module.css";
import { useImageFormat } from 'renderer/hooks/useImageFormat';

const TransactionDetailed = () => {
  const location = useLocation();
  const { data } = location.state || {};

  console.log(data);

  return (
    <div className={`py-[48px] px-[49px] w-[93.8vw] h-[100vh] bg-white ${styles.dashboard}`}>
      <h4 style={{ fontFamily: fonts.family.medium }} className='text-2xl'>Transaction Details</h4>
      <div className='mt-6'>
        <div className='w-full bg-[#3855B3] rounded-t-lg py-2 px-3'>
          <h3 className='text-white' style={{ fontFamily: fonts.family.medium }}>Product Order</h3>
        </div>
        <div className={`w-full overflow-x-auto border-[1px] border-solid border-slate-500 h-[20rem] flex justify-between items-center ${styles.dashboard}`}>
          {data?.products.map((product: TransDetailProd, index: number) => {
            const imageFormat = useImageFormat(product.imageFormat);

            return (
              <div key={index} className={`flex items-center min-w-[40rem] hover:cursor-pointer bg-gray-200 p-3 rounded-lg mr-3 ${(index !== 0) && (index !== data.products.length -1) ? "mx-2" : ""}`}>

                {product.image ? (
                  <img
                    src={`${imageFormat}${product.image}`}
                    className='w-[350px] h-[280px] object-cover'
                    alt=""
                  />
                ) : (
                  <img
                    src={images.imgThumbnail}
                    className='w-[350px] object-cover'
                    alt=""
                  />
                )}

                <div className='ml-3'>
                  <h4 style={{ fontFamily: fonts.family.roboto_bold, fontSize: 24 }} className='mb-2'>{product.name}</h4>
                  <h4 style={{ fontFamily: fonts.family.regular, fontSize: 16 }} className='my-1'>{"Selling Price: " + "₦" + product.discountPrice}</h4>
                  <h4 style={{ fontFamily: fonts.family.regular, fontSize: 16 }} className='my-1'>{"Quantity: " + product.itemCount}</h4>
                  <h4 style={{ fontFamily: fonts.family.regular, fontSize: 16 }} className='my-1'>{product.desc}</h4>
                </div>
              </div>
            )
          })}
        </div>
        {/* Other information about transaction */}
        <div className="flex justify-center">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Field</th>
              <th className="border border-gray-400 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className={'bg-white'}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">Customer's Name</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">{data?.clientName}</td>
            </tr>

            <tr className={'bg-gray-100'}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">Email</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">
                <a className='hover:underline' style={{ color: "blue" }} href={`mailto:${data?.email}`}>{data?.email}</a>
              </td>
            </tr>

            <tr className={'bg-white'}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">{"Cell Line 1"}</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">{"+" + data?.phone}</td>
            </tr>

            {data?.phoneTwo && (
              <tr className={'bg-gray-100'}>
                <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">{"Cell Line 2"}</td>
                <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">{"+" + data?.phoneTwo}</td>
              </tr>
            )}

            <tr className={`${data?.phoneTwo ? 'bg-white' : 'bg-gray-100'}`}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">{"Job Priority"}</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">{data?.priority}</td>
            </tr>

            <tr className={`${data?.phoneTwo ? 'bg-gray-100' : 'bg-white'}`}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2">{"Job Status"}</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">{data?.status}</td>
            </tr>

            <tr className={`${data?.phoneTwo ? 'bg-white' : 'bg-gray-100'}`}>
              <td style={{ fontFamily: fonts.family.medium }} className="uppercase border border-gray-400 px-4 py-2 text-red-500">{"Project Deadline"}</td>
              <td style={{ fontFamily: fonts.family.regular }} className="border border-gray-400 px-4 py-2">
                {data.deadline ? new Date(data.deadline as any).toLocaleDateString() : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <Link to={"/invoices"} state={{ data }}
        className='
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
        '>
          Generate Invoice
        </Link>
      </div>
    </div>
  )
}

export default TransactionDetailed
