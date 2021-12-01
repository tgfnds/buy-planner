export interface BuyItem {
  id?: string;
  name: string;
  value: string;
}

export interface IItemState {
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
}

export type FormType = "ADD" | "EDIT";

export interface IFormState {
  type: FormType;
  item: BuyItem;
  setType: (type: FormType) => void;
  setItem: (item: BuyItem) => void;
}

export interface IAppState {
  itemState: IItemState;
  formState: IFormState;
}
