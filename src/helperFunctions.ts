import {
  KeyValuePair,
  Option,
  OptionSet,
  OptionSetFirebase,
  ProductData,
  ProductDataFirebase,
} from "./types";

export const arrayToKeyValuePairs = <T>(arr: T[]): KeyValuePair<T> => {
  const result: KeyValuePair<T> = {};
  arr.forEach((value, index) => {
    result[index] = value;
  });
  return result;
};

export const keyValuePairsToArray = <T>(
  keyValuePairs: KeyValuePair<T>
): T[] => {
  const result: T[] = [];
  Object.keys(keyValuePairs).forEach((key) => {
    const index = parseInt(key, 10);
    result[index] = keyValuePairs[index];
  });
  return result;
};

//Converts key-value pairs from firebase into arrays.
export const productDataFirebaseConvertKVToArrays = (
  productData: KeyValuePair<ProductDataFirebase>
): ProductData[] => {
  let newProducts: ProductData[] = [];
  for (let product of [...keyValuePairsToArray(productData)]) {
    let newOptionSets: OptionSet[] = [];
    for (let optionSet of [...keyValuePairsToArray(product.optionSets ?? {})]) {
      let newOptions: Option[] = [];
      for (let option of [...keyValuePairsToArray(optionSet.options ?? {})]) {
        newOptions.push({ ...option });
      }
      newOptionSets.push({ ...optionSet, options: newOptions });
    }
    newProducts.push({ ...product, optionSets: newOptionSets });
  }
  console.log(newProducts);
  return newProducts;
};

//vice versa, but only for one product.
export const productDataConvertArraysToKV = (
  product: ProductData
): ProductDataFirebase => {
  let newOptionSetsArray: OptionSetFirebase[] = [];
  for (let optionSet of product.optionSets ?? []) {
    let newOptions: KeyValuePair<Option> = arrayToKeyValuePairs(
      optionSet.options
    );
    let newOptionSet: OptionSetFirebase = { ...optionSet, options: newOptions };
    newOptionSetsArray.push(newOptionSet);
  }
  let newOptionSetsKV: KeyValuePair<OptionSetFirebase> =
    arrayToKeyValuePairs(newOptionSetsArray);
  let newProduct: ProductDataFirebase = {
    ...product,
    optionSets: newOptionSetsKV,
  };
  return newProduct;
};

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
