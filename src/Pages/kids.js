

import ProductCard from '../ProductCard';
import Footer from '../footer';
import { getProducts } from '../apiServices/shopApi.ts';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/loader/index.js';
import ErrorPage from '../components/ErrorPage/index.js';

function Kids() {
  

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  
  });
  

    const kidsShoes = products.filter((product) => product.gender === 'Kids');


     if (isLoading) return <div> <Loader /></div>;
  if (error) return <div><ErrorPage /></div>;

  return (
    <>
      <div className="men-page">
        <h1 className='section-title'>Kiddies Collection</h1>
        <div className="product-grid">
          {kidsShoes.map(product => (
               <ProductCard
                product={product}
                 />
          ))}
        </div>
      </div>
      <Footer />
      <br />
      </>
      
  )
}

export default Kids;