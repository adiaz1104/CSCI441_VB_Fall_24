//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React, { createContext, useState, useContext, useEffect } from 'react';

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  // Get initial items from localStorage or use empty array
  const getInitialItems = () => {
    const savedItems = localStorage.getItem('shoppingList');
    return savedItems ? JSON.parse(savedItems) : [];
  };

  const [shoppingItems, setShoppingItems] = useState(getInitialItems);

  // Update localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  // Add items to shopping list
  const addToShoppingList = (items) => {
    setShoppingItems(prev => [...prev, ...items]);
  };

  // Remove item from shopping list
  const removeFromShoppingList = (id) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  // Toggle item status
  const toggleItemStatus = (id) => {
    setShoppingItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'pending' ? 'completed' : 'pending'
        };
      }
      return item;
    }));
  };

  // Clear shopping list
  const clearShoppingList = () => {
    setShoppingItems([]);
    localStorage.removeItem('shoppingList');
  };

  return (
    <ShoppingContext.Provider value={{
      shoppingItems,
      addToShoppingList,
      removeFromShoppingList,
      toggleItemStatus,
      clearShoppingList
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};

// Custom hook to use shopping context
export const useShoppingList = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingProvider');
  }
  return context;
};