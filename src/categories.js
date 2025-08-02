

const Categories = ({categories, filterItems, categoryImages}) => {
  
  return (
    <>
    <div className="category-grid" >
      {categories.map((category, index)=> {
        const image = categoryImages[category]; // Get the image for this category
        return (
          <div className="category-card" key = {index} onClick={() => filterItems(category)}>
          <div className="category-info" >
           {image && <img className="category-img" src={image} alt={category} />}
            <h3> {category} </h3>
             </div>
            <div> <button className=" explore-btn" key = {index} onClick={() => filterItems(category)}>
              {category}
              </button> </div>
            </div> 
        )

      })}
    </div>
    </>
  )
}

export default Categories;