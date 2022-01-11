import { createContext } from "react";
import { BuyItem } from "../types";

interface ItemContextType {
  loading: boolean;
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: BuyItem) => void;
}

export const defaultState = {
  loading: true,
  items: [] as BuyItem[],
  addItem: () => null,
  deleteItem: () => null,
  updateItem: () => null,
};

export const ITEM_LIMIT = !isNaN(Number(process.env.REACT_APP_ITEM_LIMIT))
  ? Number(process.env.REACT_APP_ITEM_LIMIT)
  : 100;

const ItemContext = createContext<ItemContextType>(defaultState);

export default ItemContext;
