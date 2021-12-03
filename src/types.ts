import { Timestamp } from "@firebase/firestore";

export interface IBuyItem {
  id?: string;
  name: string;
  value: string;
  userId?: string;
  createdAt?: Timestamp;
}

export interface IBuyItemFormData {
  name: string;
  value: string;
}

export interface IItemState {
  items: IBuyItem[];
  addItem: (newItem: IBuyItem) => void;
  deleteItem: (id: string) => void;
}

export type IFormType = "ADD" | "EDIT";

export interface IFormState {
  type: IFormType;
  data: IBuyItem;
  setType: (type: IFormType) => void;
  setData: (item: IBuyItemFormData) => void;
}

export interface IAppState {
  itemState: IItemState;
  formState: IFormState;
}
