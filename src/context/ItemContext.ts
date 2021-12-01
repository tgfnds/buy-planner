import { createContext } from "react";
import { BuyItem } from "../types";

interface IItemContext {
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: BuyItem) => void;
}

export const defaultState = {
  items: [],
  addItem: () => null,
  deleteItem: () => null,
  updateItem: () => null,
};

const ItemContext = createContext<IItemContext>(defaultState);

export default ItemContext;
