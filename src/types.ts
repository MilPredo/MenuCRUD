export type KeyValuePair<T> = {
  [key: number | string]: T;
};
//ProductCard Types
export type Option = {
  optionItemName: string;
  costModifier: number;
  priceModifier: number;
  // minQuantity?: number;
  // maxQuantity?: number;
  // defaultOption?: boolean;
};

export type OptionSet = {
  optionSetName: string;
  // minOptions?: number;
  // maxOptions?: number;
  options: Array<Option>;
  // options: KeyValuePair<Option>;
};

export type OptionSetFirebase = {
  optionSetName: string;
  // minOptions?: number;
  // maxOptions?: number;
  // options: Array[Option];
  options: KeyValuePair<Option>;
};

export type ProductDataFirebase = {
  name: string;
  image?: string;
  // imageAlt?: string;
  category: string;
  optionSets?: KeyValuePair<OptionSetFirebase>;
  baseCost: number;
  basePrice: number;
  stock: number;
};

export type ProductData = {
  id?: string; //firebase id
  name: string;
  image?: string;
  category: string;
  optionSets?: Array<OptionSet>;
  baseCost: number;
  basePrice: number;
  stock: number;
};

export type ProductList = KeyValuePair<ProductDataFirebase>;

export interface ProductCardProps {
  productData: ProductData;
}

export type FormikProductData = Omit<ProductData, "baseCost" | "basePrice" | "stock"> & {
  baseCost: string | number;
  basePrice: string | number;
  stock: string | number;
};
