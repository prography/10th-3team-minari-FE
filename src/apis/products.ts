import {fetch} from './instance';

interface ProductsSellType {
  quantity: number;
  realPrice: number;
  fakePrice: number;
  message: string;
  dicount: number;
  productId: number;
}

export const getProductsSell = async () => {
  const response = await fetch.get<ProductsSellType[]>('/products/sell');
  return response;
};

interface ProductsHistoryType {
  date: string;
  quantity: number;
  category: 'EVENT' | 'BUY';
  status: 'DONE' | 'HOLDING';
  refund: boolean;
}

export const getProductsHistory = async () => {
  const response = await fetch.get<ProductsHistoryType[]>('/products/history');
  return response;
};
