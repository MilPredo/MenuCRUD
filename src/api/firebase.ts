import { initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  push,
  set,
  remove,
} from "firebase/database";
import { ProductData } from "../types";
import {
  extractFilenameAndPath,
  generateRandomString,
} from "../helperFunctions";

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

export const addProductToDatabase = async (
  product: ProductData,
  imageFile?: File
) => {
  let newImage: string | null = null;
  console.log("Uploading Image: ", imageFile);
  if (imageFile) {
    const imageRef = storageRef(
      storage,
      "images/" + generateRandomString(50) + imageFile.name
    );
    const result = await uploadBytes(imageRef, imageFile);
    newImage = await getDownloadURL(result.ref);
  }
  if (product.id) {
    return set(databaseRef(database, `products/${product.id}`), {
      ...product,
      image: newImage ?? product.image,
    });
  } else {
    return push(databaseRef(database, "products"), {
      ...product,
      image: newImage ?? product.image,
    });
  }
};

export function deleteImage(imageURL?: string) {
  if (!imageURL) return;
  const path = extractFilenameAndPath(imageURL);
  const imageRef = storageRef(storage, path);
  let status = false;
  deleteObject(imageRef)
    .then(() => {
      console.log("Product image deleted successfully");
      status = true;
    })
    .catch((error) => {
      console.error("Error deleting product image:", error);
      status = false;
    });
  return status;
}

export function deleteProduct(id: string) {

  const productRef = databaseRef(database, "products/" + id);
  let status = false;
  remove(productRef)
    .then(() => {
      console.log("Product deleted successfully");
      status = true;
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      status = false;
    });
  return status;
}

// export const addData = async (data: { [key: string]: any }, path: string) => {
//   return push(databaseRef(database, path), data);
// };
