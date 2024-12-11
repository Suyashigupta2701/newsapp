import React from 'react';

const CategoryNav = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginTop: '20px' }}>
      <div className="container-fluid">
        <ul className="navbar-nav w-100 d-flex justify-content-around">
          {categories.map((category) => (
            <li key={category} className="nav-item">
              <a
                className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                href="#!"
                onClick={() => onCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNav;
