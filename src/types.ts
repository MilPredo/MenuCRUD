//ProductCard Types

export type Option = {
  optionItemName: string;
  costModifier: number;
  priceModifier: number;
  minQuantity?: number;
  maxQuantity?: number;
  defaultOption?: boolean;
};

export type OptionSet = {
  optionSetName: string;
  minOptions?: number;
  maxOptions?: number;
  options: Array<Option>;
};

export type FormikProductData = Omit<
  ProductData,
  "baseCost" | "basePrice" | "stock"
> & {
  baseCost: string | number;
  basePrice: string | number;
  stock: string | number;
};

export type ProductData = {
  name: string;
  image?: string;
  imageAlt?: string;
  category: string;
  optionSets?: Array<OptionSet>;
  baseCost: number;
  basePrice: number;
  stock: number;
};

export interface ProductCardProps {
  productData: ProductData;
}
