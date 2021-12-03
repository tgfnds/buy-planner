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
  where,
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
import { IBuyItem } from "../types";
import { nameof } from "../utils";

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

const colRef = collection(db, "items").withConverter<IBuyItem>(
  converter<IBuyItem>()
);

export async function fetchItems(userId: string): Promise<IBuyItem[] | null> {
  try {
    const q = query(
      colRef,
      where(nameof<IBuyItem>("userId"), "==", userId),
      orderBy(nameof<IBuyItem>("createdAt"), "desc")
    );
    const itemSnapshot = await getDocs(q);
    const items = itemSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return items;
  } catch (error) {
    console.log(`[FetchItems]: Couldn't fetch items. ${error}`);
    return null;
  }
}

export async function addItem(newItem: IBuyItem): Promise<IBuyItem | null> {
  try {
    const timestamp = Timestamp.now();
    const docRef = await addDoc(colRef, {
      ...newItem,
      createdAt: timestamp,
    });
    newItem = {
      ...newItem,
      id: docRef.id,
      createdAt: timestamp,
    };
    return newItem;
  } catch (error) {
    console.log(`[AddItem]: Couldn't add item. ${error}`);
    return null;
  }
}

export async function updateItem(item: IBuyItem): Promise<IBuyItem | null> {
  try {
    const docRef = doc(colRef, item.id);
    await updateDoc(docRef, item as Omit<IBuyItem, "id">);
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
