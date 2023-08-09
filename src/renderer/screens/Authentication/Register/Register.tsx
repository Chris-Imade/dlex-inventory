import React, { useState } from 'react';
import { baseURL, colors, fonts } from '../../../components/styled';
import { images } from '../../../../../assets/images';
import { CustomInputs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'renderer/Redux/store';
import { setEmail, setPassword, setShowPass, setUsername } from 'renderer/Redux/Splice/appSlice';

interface RegisterHookResult {
  data: any | null;
  error: Error | null;
}

const Register: React.FC = () => {
  const username = useSelector((state: AppState) => state.data.username);
  const email = useSelector((state: AppState) => state.data.email);
  const password = useSelector((state: AppState) => state.data.password);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any | null>(null);
  console.log("data: ", data, "error: ", error);

  const navigation = useNavigate();

  const dispatch = useDispatch();

  if(data) {
    const { status } = data;
    console.log(status);
    if(status === 201) {
      navigation('/login');
    }
  }



  const handleSubmit = () => {
    console.log("email: ", email, "password: ", password, "username: ", username);

      const registerUser = async() => {
        try {
          const response = await fetch(`${baseURL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password })
          });

          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          setError(error);
        }
      }

      registerUser();


  }

  return (
    <div
      className="w-[100vw] h-[100vh] justify-center items-center flex overflow-y-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex flex-col items-center">
        <div>
          <img
            src={images.logo}
            width={101}
            height={40}
            style={{ marginBottom: 24 }}
            alt=""
          />
        </div>
        <div className="w-[418px] h-[677px] rounded-[8px] bg-white shadow-lg flex flex-col items-center px-[40px]">
          <h3
            style={{
              fontFamily: 'Roboto Medium',
              color: 'rgba(24, 24, 25, 0.9)',
            }}
            className="text-[24px] text-center mt-[40px] mb-[12px]"
          >
            Register
          </h3>
          <p
            style={{
              fontFamily: 'Roboto Regular',
              color: 'rgba(24, 24, 25, 0.7)',
              fontSize: 14,
            }}
            className="text-center mb-[32px]"
          >
            Already have an account?
            <Link to={'/login'}>
              <span
                style={{ color: colors.primary, fontFamily: 'Roboto Medium' }}
              >
                {' '}
                Login now
              </span>
            </Link>
          </p>
          <div className="w-[336px] h-[48px] rounded-[4px] shadow-sm border-[1px] border-solid flex justify-center items-center">
            <img src={images.googleIcon} width={24} height={24} alt="" />
            <h3
              style={{
                color: colors.darkText,
                fontFamily: fonts.family.medium,
              }}
            >
              Sign up with Google
            </h3>
          </div>
          <div className="flex items-center w-full my-[24px]">
            <div className="bg-slate-200 w-full h-[1px]" />
            <p
              style={{ fontFamily: fonts.family.medium }}
              className="text-[14px] text-slate-400 mx-2"
            >
              OR
            </p>
            <div className="bg-slate-200 w-full h-[1px]" />
          </div>

          <CustomInputs type="Email" />
          <CustomInputs type="Username" />
          <CustomInputs type="Password" />

          <div className="flex w-full p-1 items-center mt-[7px] mb-[24px]">
            <input onClick={() => dispatch(setShowPass())} type="checkbox" className="mr-2 w-[15px] h-[15px]" />
            <p
              style={{
                fontSize: 14,
                fontFamily: fonts.family.regular,
                color: colors.darkText,
              }}
            >
              Show password
            </p>
          </div>

          <button
          onClick={handleSubmit}
            style={{
              backgroundColor: colors.primary,
              fontSize: 16,
              fontFamily: fonts.family.medium,
            }}
            className="w-[337px] h-[48px] rounded-[4px] text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
