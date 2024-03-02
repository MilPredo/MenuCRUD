//ProductCard Types

export type Option = {
  optionItemName: string;
  costModifier: number;
  priceModifier: number;
  minQuantity?: number;
  maxQuantity?: number;
  defaultOption?: boolean
};

export type OptionSet = {
  optionSetName: string;
  minOptions?: number;
  maxOptions?: number;
  options: Array<Option>;
};

export type ProductData = {
  name: string;
  image?: string;
  imageAlt?: string;
  category: string;
  optionSets?: Partial<Array<OptionSet>> | undefined;
  baseCost: number;
  basePrice: number;
  stock: number;
};

export interface ProductCardProps {
  productData: ProductData;
}

// export declare function useFormik<Values extends FormikValues = FormikValues>({ validateOnChange, validateOnBlur, validateOnMount, isInitialValid, enableReinitialize, onSubmit, ...rest }: FormikConfig<Values>): 


