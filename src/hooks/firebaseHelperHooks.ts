import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild, startAt, endAt } from "firebase/database";
import { KeyValuePair, ProductData, ProductDataFirebase } from "../types";
import { database } from "../api/firebase";
import useDebounce from "./useDebounce";

// Custom hook to get the KV list of all products (real-time)
export const useGetProductListKV = () => {
  const [products, setProducts] = useState<KeyValuePair<ProductDataFirebase>>({});

  useEffect(() => {
    const productsRef = ref(database, "products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray: KeyValuePair<ProductDataFirebase> = productsData;
        setProducts(productsArray);
      } else {
        setProducts({});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return products;
};

export const useGetProductList = () => {
  const [products, setProducts] = useState<ProductData[] | KeyValuePair<ProductDataFirebase>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch: string = useDebounce(searchQuery, 300);

  useEffect(() => {
    const productsRef = ref(database, "products");
    const queryRef = query(
      productsRef,
      orderByChild("name"),
      startAt(("" + debouncedSearch).toLowerCase()),
      endAt(("" + debouncedSearch).toLowerCase() + "\uf8ff")
    );
    const unsubscribe = onValue(searchQuery === "" ? productsRef : queryRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray: ProductData[] = Object.entries(productsData).map(([id, data]) => ({
          id,
          ...(data as ProductData),
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [debouncedSearch]);
  console.log(products);
  return { products, setSearchQuery };
};
