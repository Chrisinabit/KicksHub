//import { Form} from 'formik';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../apiServices/shopApi.ts";
import { FaTimes } from "react-icons/fa";
import "./index.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchTerm.trim().length > 2) {
        setIsSearching(true);
        try {
          const results = await searchProducts(searchTerm);
          setSearchResults(results.products || results || []);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  //Close results when clicking outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchTerm("");
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      // Navigate to search results page or filter products page
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <>
      <div className="search-bar-container" ref={searchRef}>
        <form onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <input
              type="text"
              className="search-field"
              name="query"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 2 && setShowResults(true)}
              placeholder="Search products..."
            />
            <button    onClick={() =>
                  navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
                }>
              <svg
                style={{ cursor: "pointer" }}
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-search-btn"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </form>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="search-results">
            {isSearching ? (
              <div className="search-loading">Searching...</div>
            ) : searchResults.length > 0 ? (
              <>
                {searchResults.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="search-result-image"
                    />
                    <div className="search-result-details">
                      <h4>{product.title}</h4>
                      <p>${product.price}</p>
                      {product.Tagline && (
                        <span className="search-result-tag">
                          {product.Tagline}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {searchResults.length > 6 && (
                  <div
                    className="search-see-all"
                    onClick={() =>
                      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
                    }
                  >
                    See all {searchResults.length} results
                  </div>
                )}
              </>
            ) : (
              <div className="search-no-results">
                No products found for "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
