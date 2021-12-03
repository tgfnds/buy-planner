import { createContext } from "react";
import { IBuyItem } from "../types";

interface IItemContext {
  loading: boolean;
  items: IBuyItem[];
  addItem: (newItem: IBuyItem) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: IBuyItem) => void;
}

export const defaultState = {
  loading: true,
  items: [],
  addItem: () => null,
  deleteItem: () => null,
  updateItem: () => null,
};

const ItemContext = createContext<IItemContext>(defaultState);

export default ItemContext;
