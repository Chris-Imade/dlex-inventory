import React from 'react';
import { images } from '../../../../assets/images';
import { colors, fonts } from '../styled';

type StatsProp = {
  type: string;
  value: number | undefined;
};

const Statistics: React.FC<StatsProp> = ({ type, value }) => {
  return (
    <div
      className="
        border-[1px]
        shadow-sm flex
        justify-between
        items-start
        w-[406px]
        h-[134px]
        rounded-[8px]
        p-[20px]
        bg-white
        hover:cursor-pointer
        hover:shadow-md
    "
    >
      <div>
        <div>
          <h5
            style={{
              fontFamily: fonts.family.medium,
              fontSize: 20,
            }}
          >
            {type}
          </h5>
        </div>
        <div>
          <h3
            style={{
              fontFamily: fonts.family.regular,
              fontSize: 14,
              color: colors.lightText,
            }}
          >
            {value}
          </h3>
        </div>
      </div>
      <div>
        {type === 'Total Sales' ? (
          <img src={images.total_sales} width={100} alt="" />
        ) : type === 'Work in progress' ? (
          <img src={images.progress} width={100} alt="" />
        ) : type === 'Completed Deals' ? (
          <img src={images.completed} width={100} alt="" />
        ) : null}
      </div>
    </div>
  );
};

export default Statistics;
