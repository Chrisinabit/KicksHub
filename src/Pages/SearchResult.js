import { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { searchProducts } from "../apiServices/shopApi.ts";
import ProductCard from "../ProductCard.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await searchProducts(searchTerm);
        setResults(res.products || res || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (

    <section className='featured' >
      <div className='featured-container'>
        <h2 className='section-title'>"{searchTerm}"</h2>
         {loading && <p>Loading...</p>}

       {!loading && results.length === 0 && (
         <p>No products found for "{searchTerm}"</p>
       )}
    <div className="product-grid" >
      {results.map((product) => {
    
        return (
          <article  className="product-card">
            <ProductCard product={product} 
            key={product.id}
            />
          </article>
        );
      })}
    </div>
    </div>
    </section>
  );
};

export default SearchResults;
