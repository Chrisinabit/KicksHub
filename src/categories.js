//import { getProducts } from "./apiServices/shopApi";

const Categories = ({categories, filterItems, categoryImages}) => {
  
  return (
    <>
    <section className="categories" >
    <div className="categories-container">
      <h2 className="section-title" >Shop by Category</h2>
    <div className="category-grid" >
      {categories.map((category, index)=> {
        const image = categoryImages[category]; // Get the image for this category
        return (
          <div className="category-card" key = {index}  >
          <div className="category-info" >
           {image && <img className="category-img"   src={category === "all" ? image : `https://kickshub-backend.onrender.com${image}`} alt={category} />}
            <h3> {category} </h3>
             </div>
            <div> <button className=" explore-btn" key = {index} onClick={() => filterItems(category)}>
              {category}
              </button> </div>
            </div> 
        )

      })}
    </div>
    </div>
    </section>
    </>
  )
}

export default Categories;