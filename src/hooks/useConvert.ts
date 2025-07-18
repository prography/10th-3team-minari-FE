export const useConvert = () => {
  const useDomainConvert = (domain: string | undefined) => {
    if (domain) {
      if (domain === 'FRONTEND') {
        return '프론트엔드';
      } else if (domain === 'BACKEND') {
        return '백엔드';
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  };

  return {
    useDomainConvert,
  };
};
