import { FC, useContext, useEffect, useState } from "react";
import ItemContext, { defaultState, ITEM_LIMIT } from "./ItemContext";
import {
  fetchItems as fetchItemsFirebase,
  addItem as addItemFirebase,
  deleteItem as deleteItemFirebase,
  updateItem as updateItemFirebase,
} from "../api/firebase";
import { IBuyItem } from "../types";
import { useAuthContext } from "./AuthContextProvider";
import { useAlertContext } from "./AlertContextProvider";

export const useItemContext = () => useContext(ItemContext);

const ItemContextProvider: FC = ({ children }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(defaultState.loading);
  const [items, setItems] = useState(defaultState.items);
  const { show } = useAlertContext();

  /**
   * Adds a new item to firebase and updates state.
   * @param newItem New item to add.
   */
  async function addItem(newItem: IBuyItem) {
    setLoading(true);
    try {
      if (items.length === ITEM_LIMIT) {
        show(`Item limit of ${ITEM_LIMIT} reached!`, "error");
        return;
      }
      const item = await addItemFirebase(newItem);
      if (item) setItems([item, ...items]);
    } catch (error) {
      console.log("Couldn't add item.", error);
    } finally {
      setLoading(false);
    }
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
    } finally {
      setLoading(false);
    }
  }

  /**
   * Updates an item to the database and updates state.
   * @param item Updated item.
   */
  async function updateItem(item: IBuyItem) {
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const items = await fetchItemsFirebase(user?.uid ?? "");
        if (items) setItems(items);
      } catch (error) {
        console.log("Couldn't load items.", error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [user]);

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
