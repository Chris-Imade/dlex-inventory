export const formatToCurrency = (value: number | bigint): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(value);
};

export const formatToCurrencySubTotal = (
  value: number | bigint,
  power: number
): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  const valueToFormat = Number(value) * power;
  return formatter.format(valueToFormat);
};
