import React, { useState } from "react";
import { colors, fonts } from "../styled";
import { useLocation } from "react-router-dom";
import { formatToCurrency, formatToCurrencySubTotal } from "renderer/hooks/formatCurrency";
import { getCurrentFormattedDate } from "renderer/hooks/useCurrentDate";
import { generateRandomNumber } from "renderer/hooks/useRandomId";
import StandardInvoice from "./StandardInvoice";
import MiniInvoice from "./MiniInvoice";

interface InvoiceTemplateProps {
  switchView:boolean;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ switchView }) => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <>
      {switchView ? (
          <MiniInvoice data={data} />
          ) : (
          <StandardInvoice data={data} />
        )}
    </>
  )
}
