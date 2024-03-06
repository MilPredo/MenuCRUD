import { useState, useEffect } from "react";
import { 
  ref, 
  onValue,
  query,
  orderByChild, 
  startAt,
  endAt,
} from "firebase/database";
//import { app } from "./firebase"; // Assuming you have initialized the Firebase app
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
      unsubscribe(); // Detach the listener when the component unmounts
    };
  }, []);

  return products;
};

export const useGetProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const productsRef = ref(database, "products");
    const queryRef = query(
      productsRef,
      orderByChild("name"),
      startAt(debouncedSearch),
      endAt(debouncedSearch + "\uf8ff")
    );
    const unsubscribe = onValue(searchQuery === "" ? productsRef : queryRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray: ProductData[] = Object.entries(productsData).map(([id, data]) => ({
          id, // Add the Firebase-generated ID to each ProductData object
          ...(data as ProductData),
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe(); // Detach the listener when the component unmounts
    };
  }, [debouncedSearch]);
  console.log(products);
  return { products, setSearchQuery };
};

// export const useGetProductList = () => {
//   const [products, setProducts] = useState<ProductData[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearchQuery = useDebounce(searchQuery, 3000);
//   useEffect(() => {
//     const productsRef = ref(database, "products");
//     let productsQuery: Query | null = null;

//     if (debouncedSearchQuery && debouncedSearchQuery.trim() !== "") {
//       productsQuery = query(productsRef, orderByChild("name"), equalTo(debouncedSearchQuery.trim()));
//     }

//     const unsubscribe = onValue(productsQuery || productsRef, (snapshot) => {
//       const productsData = snapshot.val();
//       if (productsData) {
//         const productsArray: ProductData[] = Object.entries(productsData).map(([id, data]) => ({
//           id,
//           ...(data as ProductData),
//         }));
//         setProducts(productsArray);
//       } else {
//         setProducts([]);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [debouncedSearchQuery]);

//   return { products, setSearchQuery };
// };

// // Custom hook to search for products by name (partial search)
// export const useSearchProduct = (
//   productDataList: ProductData,
//   productName: string
// ) => {
//   useEffect(() => {
//     const productsRef = ref(database, "products");
//     const productQuery = query(productsRef, orderByChild("name"));
//     const unsubscribe = onValue(productQuery, (snapshot) => {
//       const productsData = snapshot.val();
//       if (productsData) {
//         const filteredProducts = Object.values(productsData).filter(
//           (product: unknown) =>
//             (product as ProductData).name
//               .toLowerCase()
//               .includes(productName.toLowerCase())
//         );
//         setProducts(filteredProducts);
//       } else {
//         setProducts([]);
//       }
//     });

//     return () => {
//       unsubscribe(); // Detach the listener when the component unmounts
//     };
//   }, [productName]);

//   return products;
// };

// // Custom hook to add a product
// export const useAddProduct = () => {
//   const addProduct = async (productData: ProductData) => {
//     try {
//       await push(ref(database, "products"), productData);
//       console.log("Product added successfully");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return addProduct;
// };

// // Custom hook to edit a product by ID
// export const useEditProduct = (productId: string) => {
//   const editProduct = async (productData: Partial<ProductData>) => {
//     try {
//       await set(ref(database, `products/${productId}`), productData);
//       console.log("Product edited successfully");
//     } catch (error) {
//       console.error("Error editing product:", error);
//     }
//   };

//   return editProduct;
// };

// // Custom hook to delete a product by ID
// export const useDeleteProduct = (productId: string) => {
//   const deleteProduct = async () => {
//     try {
//       await remove(ref(database, `products/${productId}`));
//       console.log('Product deleted successfully');
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return deleteProduct;
// };
