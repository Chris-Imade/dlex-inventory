import React, { useState } from 'react';
import { images } from '../../../../assets/images';
import { Link } from 'react-router-dom';

interface DropdownProp {
  item: Object;
  showDropDown: boolean;
  handleDropdown: () => void;
}

const CustomDropdown: React.FC<DropdownProp> = ({
  item,
  showDropDown,
  handleDropdown,
}) => {
  return (
    <div className="">
      <div
        onClick={handleDropdown}
        className="w-fit p-2 hover:bg-gray-200 rounded-full hover:shadow-sm transition-all duration-200 ease-in-out"
      >
        <img src={images.threeDots} alt="three dots" width={24} height={24} />
      </div>
      {showDropDown && (
        <div className={`animated-dropdown`}>
          <ul className="bg-white rounded-md p-3 ml-[-10rem] w-56 shadow-lg border-gray-500 border-[1px] border-solid">
            <button
              className="w-full"
              onClick={() => {
                alert(
                  'You are not allowed to edit transaction to prevent fraud within the company, Create a new transaction instead'
                );
              }}
            >
              <li className="m-[1px] hover:bg-slate-100 px-2 rounded-md py-1 flex items-center">
                <img
                  className="mr-1"
                  width={24}
                  height={24}
                  src={images.edit}
                  alt="Transaction preview"
                />
                Edit
              </li>
            </button>
            <Link to={'/transaction/detailed'} state={{ data: item }}>
              <li className="m-[1px] hover:bg-slate-100 px-2 rounded-md py-1 flex items-center">
                <img
                  className="mr-1"
                  width={24}
                  height={24}
                  src={images.preview}
                  alt="Transaction preview"
                />
                View Details
              </li>
            </Link>
            <Link to={'/invoices'} state={{ data: item }}>
              <li className="m-[1px] hover:bg-slate-100 px-2 rounded-md py-1 flex items-center">
                <img
                  className="mr-1"
                  width={24}
                  height={24}
                  src={images.printInvoice}
                  alt=""
                />
                Generate Invoice
              </li>
            </Link>
            <button
              className="w-full"
              onClick={() => {
                alert(
                  'Made a mistake? Change the transaction status to canceled'
                );
              }}
            >
              <li className="m-[1px] hover:bg-slate-100 px-2 rounded-md py-1 flex items-center">
                <img
                  className="mr-1"
                  width={24}
                  height={24}
                  src={images.delete}
                  alt=""
                />
                Delete
              </li>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
