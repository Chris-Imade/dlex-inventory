import React from 'react';
import { fonts } from '../styled';
import { images } from '../../../../assets/images';
import { formatToCurrency } from 'renderer/hooks/formatToCurrency';

const ProductCard: React.FC<productCardProps> = ({
  image,
  name,
  price,
  discountPrice,
  imageFormat,
}) => {
  return (
    <div
      className="
            border-[1px]
            border-solid
            rounded-md
            hover:shadow-lg
            hover:cursor-pointer
            transition-all
            duration-1000
            ease-in-out
            h-200px]
            flex
            items-center,
            bg-white
            w-[400px]
            overflow-hidden
        "
    >
      {image ? (
        <img
          src={`${imageFormat}${image}`}
          width={150}
          className="h-[150px] object-cover"
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

      <div className='p-[10px]'>
        <h3
          style={{
            marginLeft: 10,
            fontFamily: fonts.family.medium,
          }}
          className='text-slate-700 text-lg'
        >
          {name}
        </h3>
        <div>
          <h3
            style={{
              fontSize: 14,
              marginLeft: 10,
              fontFamily: fonts.family.medium,
            }}
            className='text-slate-500 text-sm'
          >
            Discount Price: {formatToCurrency(discountPrice)}
          </h3>
          <h3
            style={{
              fontSize: 14,
              marginLeft: 10,
              fontFamily: fonts.family.medium,
            }}
            className='text-slate-500 text-sm'
          >
            Original Price: {formatToCurrency(price)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
