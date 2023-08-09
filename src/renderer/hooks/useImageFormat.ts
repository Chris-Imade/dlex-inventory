export const useImageFormat = (imageFormat: string | undefined) => {
  switch (imageFormat) {
    case 'jpeg':
      return 'data:image/jpeg;base64,';
    case 'png':
      return 'data:image/png;base64,';
    case 'gif':
      return 'data:image/gif;base64,';
    case 'bmp':
      return 'data:image/bmp;base64,';
    default:
      return '';
  }
};
