//import product from '../data';
import ProductCard from '../ProductCard';
import Footer from '../footer';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../apiServices/shopApi.ts';
import Loader from '../components/loader/index.js';
import ErrorPage from '../components/ErrorPage';


const Women = () => {
 
   // Fetch products from API
  const { data: products = [], isLoading, error} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
    
  });


  const womensShoes = products.filter((product) => product.gender === 'Women');
 

 if (isLoading) return <div> <Loader /></div>;
  if (error) return <div><ErrorPage /></div>;

 return (
  <>
        <div className="men-page">
          <h1 className='section-title'>Women's Collection</h1>
          <div className="product-grid">
            {womensShoes.map(product => (
                <ProductCard
                    product={product}
                     />
            ))}
          </div>
        </div>
        <Footer />
        <br />
        </>
      );
      
    }

export default Women;