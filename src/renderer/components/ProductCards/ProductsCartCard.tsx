import React, { useState } from 'react';
import { images } from '../../../../assets/images';
import { fonts } from '../styled';
import { count } from 'console';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import {
  setRemoveTransactionProduct,
  setTransactionProducts,
} from 'renderer/Redux/Splice/appSlice';
import { useImageFormat } from 'renderer/hooks/useImageFormat';

const ProductsCartCard: React.FC<ProductCartCardProp> = ({ item, index }) => {
  const [itemCount, setItemCount] = useState<number>(1);
  const transactionProduct = useSelector(
    (state: AppState) => state.data.transactionProducts
  );
  console.log(transactionProduct);

  const dispatch = useDispatch();

  const imageFormat = useImageFormat(item.imageFormat);

  return (
    <div
      className="border-solid border-[1px] border-slate-200 rounded-lg p-3 hover:shadow-md shadow-sm bg-white flex max-w-[35rem] md:min-w-[35rem]"
      style={{
        marginTop: 20,
        marginLeft: index % 2 == 0 || index !== 0 ? 30 : 0,
      }}
    >
      {item.image ? (
        <img
          src={`${imageFormat}${item.image}`}
          width={130}
          className="h-[130px] object-cover rounded-md"
          alt=""
        />
      ) : (
        <img
          src={images.imgThumbnail}
          width={130}
          className="h-[130px] object-contain rounded-md"
          alt=""
        />
      )}
      <div className="ml-5 flex flex-col">
        <h4
          style={{
            fontSize: 24,
            fontFamily: fonts.family.medium,
          }}
        >
          {item?.name}
        </h4>
        <div className="flex items-start flex-col md:flex-row">
          <div>
            <h4 style={{ fontFamily: fonts.family.regular }}>
              Price:{' '}
              <span className="text-green-500 text-xl">
                ₦{item?.discountPrice}
              </span>
            </h4>
            <h5>
              Original Price:{' '}
              <div style={{ textDecoration: 'line-through' }}>
                ₦{item?.price}
              </div>
            </h5>
          </div>
          <div className="flex mt-4 md:mt-0 md:flex-col items-center ml-[-8rem] md:ml-12">
            <div className="flex mt-3 mr-4 md:mr-0">
              <button
                disabled={itemCount <= 0}
                className={`p-2 ${
                  itemCount <= 0 ? 'bg-gray-500' : 'bg-blue-500'
                } w-7 h-7 flex justify-center items-center rounded-full text-white`}
                onClick={() => setItemCount(itemCount - 1)}
              >
                -
              </button>
              <span className="text-2xl mx-2">{itemCount}</span>
              <button
                className="p-2 bg-blue-500 w-7 h-7 flex justify-center items-center rounded-full text-white"
                onClick={() => setItemCount(itemCount + 1)}
              >
                +
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={() => {
                  console.log(item);
                  const proToAdd = {
                    ...item,
                    itemCount,
                  };
                  dispatch(setTransactionProducts([proToAdd]));
                  // alert("Product Added to the database")
                }}
                className="bg-blue-500 rounded-md text-white px-3 py-1"
              >
                Add
              </button>
              <button
                onClick={() => {
                  alert(
                    'This product would be deleted from the current transaction: PROCEED?'
                  );
                  dispatch(setRemoveTransactionProduct(item?.name));
                }}
                className="bg-red-500 ml-3 rounded-md text-white px-3 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCartCard;
