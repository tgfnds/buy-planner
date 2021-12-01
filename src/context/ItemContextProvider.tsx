import { FC, useContext, useEffect, useState } from "react";
import ItemContext, { defaultState } from "./ItemContext";
import {
  fetchItems as fetchItemsFirebase,
  addItem as addItemFirebase,
  deleteItem as deleteItemFirebase,
  updateItem as updateItemFirebase,
} from "../api/firebase";
import { BuyItem } from "../types";

export const useItemContext = () => useContext(ItemContext);

const ItemContextProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(defaultState.loading);
  const [items, setItems] = useState<BuyItem[]>(defaultState.items);

  /**
   * Adds a new item to firebase and updates state.
   * @param newItem New item to add.
   */
  async function addItem(newItem: BuyItem) {
    setLoading(true);
    try {
      const item = await addItemFirebase(newItem);
      if (item) setItems([...items, item]);
    } catch (error) {
      console.log("Couldn't add item.", error);
    }
    setLoading(false);
  }

  /**
   * Deletes an item from firebase and updates state.
   * @param id Id of the item to remove.
   */
  async function deleteItem(id: string) {
    setLoading(true);
    try {
      const rId = await deleteItemFirebase(id);
      if (rId) setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.log("Couldn't delete item.", error);
    }
    setLoading(false);
  }

  /**
   * Updates an item to the database and updates state.
   * @param item Updated item.
   */
  async function updateItem(item: BuyItem) {
    setLoading(true);
    try {
      const updated = await updateItemFirebase(item);
      if (updated) {
        const index = items.findIndex((i) => i.id === updated.id);
        const newItems = [...items];
        newItems[index] = updated;
        setItems(newItems);
      }
    } catch (error) {
      console.log("Couldn't update item.", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetch() {
      try {
        const items = await fetchItemsFirebase();
        if (items) setItems(items);
        setLoading(false);
      } catch (error) {
        console.log("Couldn't load items.", error);
      }
    }
    fetch();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        loading,
        items,
        addItem,
        deleteItem,
        updateItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
