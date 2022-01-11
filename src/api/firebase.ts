import {FirebaseOptions, initializeApp} from "firebase/app";
import {
    applyActionCode,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification as sendEmailVerificationFirebase,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
    updateProfile as updateProfileFirebase,
    User,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    QueryDocumentSnapshot,
    serverTimestamp,
    updateDoc,
    where,
    WithFieldValue,
    onSnapshot
} from "firebase/firestore";
import {FirebaseError} from "@firebase/util";
import {BuyItem} from "../types";
import {nameof} from "../utils";

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

const colRef = collection(db, "items").withConverter<BuyItem>(converter<BuyItem>());

function buildQuery(userId: string) {
    return query(colRef, where(nameof<BuyItem>("userId"), "==", userId),
        orderBy(nameof<BuyItem>("createdAt"), "desc")
    );
}

export async function fetchItems(userId: string): Promise<BuyItem[] | null> {
    try {
        const q = buildQuery(userId);
        const itemSnapshot = await getDocs(q);
        return itemSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}

export function subscribeItemOnSnapshot(userId: string, updateItems: (items: BuyItem[]) => void) {
    try {
        const q = buildQuery(userId)
        return onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            updateItems(items);
        });
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}

export async function addItem(newItem: BuyItem): Promise<BuyItem | null> {
    try {
        const docRef = await addDoc(colRef, {...newItem, createdAt: serverTimestamp()});
        return {...newItem, id: docRef.id};
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}

export async function updateItem(item: BuyItem): Promise<BuyItem | null> {
    try {
        const docRef = doc(colRef, item.id);
        await updateDoc(docRef, item as Omit<BuyItem, "id">);
        return item;
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}

export async function deleteItem(id: string): Promise<string | null> {
    try {
        const docRef = doc(colRef, id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}

export async function signUp(email: string, password: string, displayName: string): Promise<void> {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);

        if (credentials.user) {
            await updateProfile(credentials.user, displayName);
        }
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export async function sendEmailVerification(user: User): Promise<void> {
    try {
        await sendEmailVerificationFirebase(user);
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export async function applyEmailVerificationCode(code: string): Promise<void> {
    try {
        await applyActionCode(auth, code);
        await auth.currentUser?.reload();
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export async function signIn(email: string, password: string): Promise<void> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export async function signInWithGoogle(): Promise<void> {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export async function signOut() {
    try {
        await signOutFirebase(auth);
    } catch (error) {
        throw new Error((error as FirebaseError).code);
    }
}

export function subscribeAuthStateChanged(updateUser: (user: User | null) => void) {
    return onAuthStateChanged(auth, (user) => {
            updateUser(user);
        },
        (error) => {
            throw new Error((error as FirebaseError).message);
        }
    );
}

export async function updateProfile(user: User, displayName: string) {
    try {
        await updateProfileFirebase(user, {displayName});
    } catch (error) {
        throw new Error((error as FirebaseError).message);
    }
}
