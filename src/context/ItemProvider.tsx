import { FC, useContext, useEffect, useState } from "react";
import ItemContext, { defaultState } from "./ItemContext";
import {
  fetchItems as fetchItemsFirebase,
  addItem as addItemFirebase,
  deleteItem as deleteItemFirebase,
} from "../api/firebase";
import { BuyItem } from "../types";

export const useItemContext = () => useContext(ItemContext);

const ItemProvider: FC = ({ children }) => {
  const [items, setItems] = useState<BuyItem[]>(defaultState.items);

  /**
   * Adds a new item to firebase and updates state.
   * @param newItem New item to add.
   */
  async function addItem(newItem: BuyItem) {
    try {
      const item = await addItemFirebase(newItem);
      if (item) setItems([...items, item]);
    } catch (error) {
      console.log("Couldn't add item.", error);
    }
  }

  /**
   * Deletes an item from firebase and updates state.
   * @param id Id of the item to remove.
   */
  async function deleteItem(id: string) {
    try {
      const rId = await deleteItemFirebase(id);
      if (rId) setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.log("Couldn't delete item.", error);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const items = await fetchItemsFirebase();
        if (items) setItems(items);
      } catch (error) {
        console.log("Couldn't load items.", error);
      }
    }
    fetch();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items,
        addItem,
        deleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
