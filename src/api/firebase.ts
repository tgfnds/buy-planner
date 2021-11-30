import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { BuyItem } from "../types";
import { FirebaseConfig } from "./types";

const firebaseConfig: FirebaseConfig = {
  apikey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messageingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function converter<T>() {
  return {
    toFirestore: (data: WithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  };
}

const colRef = collection(db, "items").withConverter<BuyItem>(
  converter<BuyItem>()
);

export async function fetchItems(): Promise<BuyItem[] | null> {
  try {
    const itemSnapshot = await getDocs(colRef);
    const item = itemSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return item;
  } catch (error) {
    console.log(`[FetchItems]: Couldn't fetch items. ${error}`);
    return null;
  }
}

export async function addItem(newItem: BuyItem): Promise<BuyItem | null> {
  try {
    const docRef = await addDoc(colRef, newItem);
    newItem = {
      ...newItem,
      id: docRef.id,
    };
    return newItem;
  } catch (error) {
    console.log(`[AddItem]: Couldn't add item. ${error}`);
    return null;
  }
}

export async function updateItem(item: BuyItem): Promise<BuyItem | null> {
  try {
    const docRef = doc(colRef, item.id);
    await updateDoc(docRef, item);
    return item;
  } catch (error) {
    console.log(`[UpdateItem]: Couldn't update item. ${error}`);
    return null;
  }
}

export async function deleteItem(id: string): Promise<string | null> {
  try {
    const docRef = doc(colRef, id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.log(`[DeleteItem]: Couldn't delete item. ${error}`);
    return null;
  }
}
