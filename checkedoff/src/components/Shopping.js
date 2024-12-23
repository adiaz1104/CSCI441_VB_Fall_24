//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React, { useState } from 'react';
import { useShoppingList } from './ShoppingContext';
import './styles/Shopping.css';

const Shopping = () => {
  // Get shopping list state and functions from context
  const { 
    shoppingItems: items, 
    removeFromShoppingList: removeItem,
    toggleItemStatus,
    addToShoppingList
  } = useShoppingList();

  // Local state
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New item form state
  const [newItem, setNewItem] = useState({
    user: '',
    item: '',
    quantity: 1,
    category: '',
    store: '',
    status: 'pending'
  });

  // Get unique values for filters
  const users = [...new Set(items.map(item => item.user))];
  const stores = [...new Set(items.map(item => item.store))];
  const categories = [...new Set(items.map(item => item.category))];

  // Filter items
  const filteredItems = items.filter(item => {
    const userMatch = !selectedUser || item.user === selectedUser;
    const storeMatch = !selectedStore || item.store === selectedStore;
    const categoryMatch = !selectedCategory || item.category === selectedCategory;
    return userMatch && storeMatch && categoryMatch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) || 1 : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!newItem.user || !newItem.item || !newItem.category || !newItem.store) {
      setError('Please fill in all required fields');
      return;
    }

    // Create new item with unique ID
    const newShoppingItem = {
      ...newItem,
      id: Date.now() + Math.random(),
    };

    // Add item to shopping list
    addToShoppingList([newShoppingItem]);
    
    // Show success message
    setSuccess('Item added successfully!');
    setTimeout(() => setSuccess(''), 3000);

    // Reset form and close modal
    setNewItem({
      user: '',
      item: '',
      quantity: 1,
      category: '',
      store: '',
      status: 'pending'
    });
    setShowAddModal(false);
  };

  return (
    <div className="shopping-container">
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="user-filter">Filter by User:</label>
          <select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="store-filter">Filter by Store:</label>
          <select
            id="store-filter"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button className="add-item-btn" onClick={() => setShowAddModal(true)}>
          Add New Item
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Shopping Item</h2>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="shopping-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="user">User:</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={newItem.user}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="item">Item:</label>
                <input
                  type="text"
                  id="item"
                  name="item"
                  value={newItem.item}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="store">Store:</label>
                <input
                  type="text"
                  id="store"
                  name="store"
                  value={newItem.store}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Shopping List */}
      <div className="shopping-list">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`shopping-item ${item.status === 'completed' ? 'completed' : ''}`}
          >
            <div className="item-checkbox">
              <input
                type="checkbox"
                checked={item.status === 'completed'}
                onChange={() => toggleItemStatus(item.id)}
              />
            </div>
            <div className="item-details">
              <div className="item-header">
                <h3 className="item-name">{item.item}</h3>
                <span className="item-user">{item.user}</span>
              </div>
              <div className="item-meta">
                <span className="meta-item">Quantity: {item.quantity}</span>
                <span className="meta-item">Category: {item.category}</span>
                <span className="meta-item">Store: {item.store}</span>
              </div>
            </div>
            <button 
              className="remove-item"
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="empty-list">
            No items found{selectedUser ? ` for ${selectedUser}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;