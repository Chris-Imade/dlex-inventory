import React, { useState } from 'react';
import { colors, fonts } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from 'renderer/Redux/Splice/appSlice';
import { setEmail } from 'renderer/Redux/Splice/appSlice';
import { setUsername } from 'renderer/Redux/Splice/appSlice';
import { AppState } from 'renderer/Redux/store';

type CustomProps = {
  type: string;
};

const CustomInputs: React.FC<CustomProps> = ({ type }) => {
  const showPass = useSelector((state: AppState) => state.data.showPass);


  const dispatch = useDispatch();


  return (
    <div>
      <label
        style={{
          fontFamily: fonts.family.regular,
          fontSize: 14,
          color: colors.darkText,
          marginBottom: 8,
        }}
        htmlFor={type}
      >
        {type}
      </label>
      <input
        onChange={(e) => {
          if (type === 'Email') {
            dispatch(setEmail(e.target.value));
          } else if (type === 'Password') {
            dispatch(setPassword(e.target.value));
          } else if (type === 'Username') {
            dispatch(setUsername(e.target.value));
          }
        }}
        style={{
          width: 338,
          height: 48,
          borderRadius: 4,
          marginBottom: type !== 'Password' ? 24 : 0,
        }}
        className="border-solid border-[1px] border-[#E6E7E9] pl-3"
        name={
          type === 'Password'
            ? 'password'
            : type === 'Email'
            ? 'email'
            : type === 'Username'
            ? 'username'
            : ""
        }
        type={type === 'Password' ? showPass ? 'text' : 'password' : 'text'}
      />
    </div>
  );
};

export default CustomInputs;
