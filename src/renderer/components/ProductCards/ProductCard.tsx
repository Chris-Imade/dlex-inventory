import React from 'react';
import { fonts } from '../styled';
import { images } from '../../../../assets/images';

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
            p-[20px]
            rounded-t-md
            hover:shadow-lg
            hover:cursor-pointer
            transition-all
            duration-1000
            ease-in-out
            h-200px]
            flex
            items-center,
            bg-white
            w-[350px]
        "
    >
      {image ? (
        <img
          src={`${imageFormat}${image}`}
          width={130}
          className="h-[130px] object-cover"
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

      <div>
        <h3
          style={{
            fontSize: 14,
            marginLeft: 10,
            fontFamily: fonts.family.medium,
          }}
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
          >
            Discount Price: N{discountPrice}
          </h3>
          <h3
            style={{
              fontSize: 14,
              marginLeft: 10,
              fontFamily: fonts.family.medium,
            }}
          >
            Original Price: ₦{price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
