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
  items: [] as IBuyItem[],
  addItem: () => null,
  deleteItem: () => null,
  updateItem: () => null,
};

export const ITEM_LIMIT = !isNaN(Number(process.env.REACT_APP_ITEM_LIMIT))
  ? Number(process.env.REACT_APP_ITEM_LIMIT)
  : 100;

const ItemContext = createContext<IItemContext>(defaultState);

export default ItemContext;
