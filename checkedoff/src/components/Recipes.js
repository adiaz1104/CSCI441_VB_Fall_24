import React, { useState } from 'react';
import { useShoppingList } from './ShoppingContext';
import './styles/Recipes.css';

const Recipes = () => {
  // Initial recipes data
  const initialRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      user: "Tara",
      prepTime: "20 mins",
      cookTime: "15 mins",
      difficulty: "Medium",
      category: "Italian",
      ingredients: [
        "400g spaghetti",
        "200g pancetta",
        "4 large eggs",
        "100g parmesan cheese",
        "Freshly ground black pepper"
      ],
      instructions: "1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Combine all ingredients",
      servings: 4
    },
    {
      id: 2,
      title: "Classic Burger",
      user: "Adam",
      prepTime: "15 mins",
      cookTime: "10 mins",
      difficulty: "Easy",
      category: "American",
      ingredients: [
        "500g ground beef",
        "4 burger buns",
        "Lettuce",
        "Tomato slices",
        "Cheese slices",
        "Onion"
      ],
      instructions: "1. Form patties\n2. Grill burgers\n3. Assemble with toppings",
      servings: 4
    },
    {
      id: 3,
      title: "Chicken Stir-Fry",
      user: "Jake",
      prepTime: "25 mins",
      cookTime: "15 mins",
      difficulty: "Easy",
      category: "Asian",
      ingredients: [
        "500g chicken breast",
        "Mixed vegetables",
        "Soy sauce",
        "Ginger",
        "Garlic",
        "Rice"
      ],
      instructions: "1. Cut chicken\n2. Prepare vegetables\n3. Stir-fry\n4. Add sauce",
      servings: 4
    }
  ];

  // State management
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // New recipe form state
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    user: '',
    prepTime: '',
    cookTime: '',
    difficulty: '',
    category: '',
    ingredients: [],
    instructions: '',
    servings: ''
  });

  // Get shopping list context
  const { addToShoppingList } = useShoppingList();

  // Get unique values for filters
  const users = [...new Set(recipes.map(recipe => recipe.user))];
  const categories = [...new Set(recipes.map(recipe => recipe.category))];
  const difficulties = [...new Set(recipes.map(recipe => recipe.difficulty))];

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const userMatch = !selectedUser || recipe.user === selectedUser;
    const categoryMatch = !selectedCategory || recipe.category === selectedCategory;
    const difficultyMatch = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    return userMatch && categoryMatch && difficultyMatch;
  });

  // Handle adding ingredients to shopping list
  const handleAddToShoppingList = (ingredients, recipeName) => {
    const shoppingItems = ingredients.map(ingredient => ({
      id: Date.now() + Math.random(),
      user: "From Recipe: " + recipeName,
      item: ingredient,
      quantity: 1,
      category: "Recipe Ingredients",
      store: "Any",
      status: "pending"
    }));
    
    addToShoppingList(shoppingItems);
    setSuccessMessage(`Added ingredients from ${recipeName} to shopping list`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding ingredients to recipe
  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setNewRecipe(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  // Handle removing ingredients from recipe
  const handleRemoveIngredient = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRecipeWithId = {
        ...newRecipe,
        id: recipes.length + 1
      };
      setRecipes(prev => [...prev, newRecipeWithId]);
      setShowAddModal(false);
      // Reset form
      setNewRecipe({
        title: '',
        user: '',
        prepTime: '',
        cookTime: '',
        difficulty: '',
        category: '',
        ingredients: [],
        instructions: '',
        servings: ''
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const required = ['title', 'user', 'prepTime', 'cookTime', 'difficulty', 'category', 'instructions', 'servings'];
    return required.every(field => newRecipe[field]) && newRecipe.ingredients.length > 0;
  };

  return (
    <div className="recipes-container">
      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="user-filter">Filter by Chef:</label>
          <select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Chefs</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Cuisine Type:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Cuisines</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">Difficulty:</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All Levels</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        <button className="add-recipe-btn" onClick={() => setShowAddModal(true)}>
          Add New Recipe
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <h3 className="recipe-title">{recipe.title}</h3>
              <span className="recipe-user">by {recipe.user}</span>
            </div>
            
            <div className="recipe-meta">
              <span className="meta-item">
                <i className="fas fa-clock"></i> Prep: {recipe.prepTime}
              </span>
              <span className="meta-item">
                <i className="fas fa-fire"></i> Cook: {recipe.cookTime}
              </span>
              <span className="meta-item">
                <i className="fas fa-signal"></i> {recipe.difficulty}
              </span>
              <span className="meta-item">
                <i className="fas fa-utensils"></i> Serves {recipe.servings}
              </span>
            </div>

            <div className="recipe-details">
              <div className="ingredients-section">
                <div className="ingredients-header">
                  <h4>Ingredients</h4>
                  <button
                    className="add-ingredients-btn"
                    onClick={() => handleAddToShoppingList(recipe.ingredients, recipe.title)}
                    aria-label="Add to list"
                  >
                    +
                  </button>
                </div>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <h4>Instructions</h4>
                <p>{recipe.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Recipe</h2>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="recipe-form">
              <div className="form-group">
                <label htmlFor="title">Recipe Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newRecipe.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user">Chef Name:</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={newRecipe.user}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prepTime">Prep Time:</label>
                  <input
                    type="text"
                    id="prepTime"
                    name="prepTime"
                    value={newRecipe.prepTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 20 mins"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cookTime">Cook Time:</label>
                  <input
                    type="text"
                    id="cookTime"
                    name="cookTime"
                    value={newRecipe.cookTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 30 mins"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty:</label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={newRecipe.difficulty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Cuisine Type:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newRecipe.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="servings">Servings:</label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={newRecipe.servings}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ingredients:</label>
                <div className="ingredient-input">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Enter an ingredient"
                  />
                  <button type="button" onClick={handleAddIngredient}>Add</button>
                </div>
                <ul className="ingredients-list">
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveIngredient(index)}
                        className="remove-ingredient"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="form-group">
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={newRecipe.instructions}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;