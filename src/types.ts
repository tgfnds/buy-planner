import { Timestamp } from "@firebase/firestore";

export interface BuyItem {
  id?: string;
  name: string;
  value: string;
  userId?: string;
  createdAt?: Timestamp;
}

export interface BuyItemFormData {
  name: string;
  value: string;
}

export interface ItemState {
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
}

export interface FormState {
  editItem: BuyItem | null;
  setEditItem: (item: BuyItem | null) => void;
}
