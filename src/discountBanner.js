import { FaArrowRight } from "react-icons/fa";

const DiscountBanner = ({discount = '30%', category = 'Running'}) => {
  return (
       <section className="discount-banner">
      <div className="container">
        <div className="banner-content">
          <h2>Limited Time Offer! <span className="highlight">{discount} Off</span> All {category} Shoes</h2>
          <button className="claim-btn">
            Shop Now <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default DiscountBanner;