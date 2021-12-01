import { Timestamp } from "@firebase/firestore";

export interface BuyItem {
  id?: string;
  name: string;
  value: string;
  timestamp?: Timestamp;
}

export interface IItemState {
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
}

export type FormType = "ADD" | "EDIT";

export interface IFormState {
  type: FormType;
  data: BuyItem;
  setType: (type: FormType) => void;
  setData: (item: BuyItem) => void;
}

export interface IAppState {
  itemState: IItemState;
  formState: IFormState;
}
