import React, { useRef, useState } from 'react';
import { InvoiceTemplate } from 'renderer/components/Invoice/InvoiceTemplate';
import styles from './styles.module.css';
import { useReactToPrint } from 'react-to-print';

const Invoices = () => {
  const [switchView, setSwitchView] = useState<boolean>(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={`flex flex-col items-center justify-between w-[93.8vw] h-[100vh] bg-[#dddddd] pb-6 ${styles.dashboard}`}>
      <div ref={componentRef}>
        <InvoiceTemplate switchView={switchView} />
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <div className='flex items-center'>
          <button
            onClick={() => setSwitchView(false)}
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
              ease-in-out
              w-[12rem]
              justify-center
          '>Standard</button>
          <button
            onClick={() => setSwitchView(true)}
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
              ease-in-out
              w-[12rem]
              justify-center
          '>Mini</button>
        </div>
        <button onClick={handlePrint} className='
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
              ease-in-out
              w-[12rem]
              justify-center
            ' >Print</button>
      </div>
    </div>
  )
};

export default Invoices;
