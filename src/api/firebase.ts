import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, push, update } from "firebase/database";
import { ProductData } from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
console.log(app.name);
export let storage = getStorage(app);
export let database = getDatabase(app);

export const uploadImage = async (file: File) => {
  const localStorageRef = storageRef(storage, file.name);
  await uploadBytes(localStorageRef, file);
  return getDownloadURL(localStorageRef);
};

export const addProductToDatabase = async (productData: ProductData, productId?: string) => {
  if (productId) {
    // If productId is provided, it's an update operation
    const updates: Partial<ProductData> = {
      // Partial update with only the provided fields
      name: productData.name,
      // Update other fields as needed
    };
    return update(databaseRef(database, `products/${productId}`), updates);
  } else {
    // If productId is not provided, it's an add operation
    return push(databaseRef(database, "products"), productData);
  }
};

export const addData = async (data: { [key: string]: any }, path: string) => {
  return push(databaseRef(database, path), data);
};
