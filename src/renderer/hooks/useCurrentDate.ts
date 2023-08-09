export const getCurrentFormattedDate = (): string => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: Months are 0-indexed, so we add 1 to get the correct month
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
};
