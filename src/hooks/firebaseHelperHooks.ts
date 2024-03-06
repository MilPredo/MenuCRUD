import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  remove,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { app } from "./firebase"; // Assuming you have initialized the Firebase app
import { KeyValuePair, ProductData, ProductDataFirebase } from "../types";
import { database, storage } from "../api/firebase";

// Custom hook to get the KV list of all products (real-time)
export const useGetProductListKV = () => {
  const [products, setProducts] = useState<KeyValuePair<ProductDataFirebase>>(
    {}
  );

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

  useEffect(() => {
    const productsRef = ref(database, "products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productsArray: ProductData[] = Object.entries(productsData).map(
          ([id, data]) => ({
            id, // Add the Firebase-generated ID to each ProductData object
            ...(data as ProductData),
          })
        );
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe(); // Detach the listener when the component unmounts
    };
  }, []);
  console.log(products)
  return products;
};

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
