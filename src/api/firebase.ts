import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  WithFieldValue,
  Timestamp,
} from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { BuyItem } from "../types";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

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
    const q = query(colRef, orderBy("timestamp", "desc"));
    const itemSnapshot = await getDocs(q);
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
    const timestamp = Timestamp.now();
    const docRef = await addDoc(colRef, {
      ...newItem,
      timestamp,
    });
    newItem = {
      ...newItem,
      id: docRef.id,
      timestamp,
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
    await updateDoc(docRef, { ...item, timestamp: Timestamp.now() });
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

export async function signUp(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return credentials.user;
  } catch (error) {
    return handleError(error as FirebaseError);
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user;
  } catch (error) {
    return handleError(error as FirebaseError);
  }
}

export async function signOut() {
  try {
    await signOutFirebase(auth);
    return null;
  } catch (error) {
    return handleError(error as FirebaseError);
  }
}

export function subscribeAuthStateChanged(
  updateUser: (user: User | null) => void
) {
  return onAuthStateChanged(
    auth,
    (user) => {
      console.log("User changed to: ", user);
      updateUser(user);
    },
    (error) => {
      console.log(`[OnAuthStateChanged] ${error.message}`);
    }
  );
}

function handleError(error: FirebaseError) {
  console.log(`[${error.code}] ${error.message}`);
  return null;
}
