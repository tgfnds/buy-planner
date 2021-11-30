import { createContext } from "react";
import { BuyItem } from "../types";

interface IItemContext {
  items: BuyItem[];
  addItem: (newItem: BuyItem) => void;
  deleteItem: (id: string) => void;
}

export const defaultState = {
  items: [],
  addItem: () => null,
  deleteItem: () => null,
};

const ItemContext = createContext<IItemContext>(defaultState);

export default ItemContext;
