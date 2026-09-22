function Filters({ searchText, category, categories, onSearchChange, onCategoryChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        id="search-input"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        id="category-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
