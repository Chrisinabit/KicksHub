//import { useQueryClient, useMutation } from '@tanstack/react-query';
import ProductCard from '../ProductCard'; 
import Footer from '../footer';
import { getProducts } from '../apiServices/shopApi.ts';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/loader';
import ErrorPage from '../components/ErrorPage';


const Men = () => {

  const { data: products = [], isLoading, error} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
    
  });



  const mensShoes = products.filter((product) => product.gender === 'Men');
 
   if (isLoading) return <div> <Loader /></div>;
  if (error) return <div><ErrorPage /></div>;

 return (
  <>
        <div className="men-page">
          <h1 className='section-title'>Men's Collection</h1>
          <div className="product-grid">
            {mensShoes.map(product => (
              <ProductCard
                product={product} />
            ))}
          </div>
        </div>
        <Footer />
        <br />
        </>
      );
      
    }

export default Men;