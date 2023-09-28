export const formatToCurrency = (value) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(value);
};
