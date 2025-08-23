import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  // FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Modal from "./modal";
import { FaTrash } from "react-icons/fa";
import "./modalLayout.css";
import {
  updateCartItem,
  removeFromCart,
  getCart,
} from "./apiServices/shopApi.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "./components/loader/index.js";
import ErrorPage from "./components/ErrorPage/index.js";
import SearchBar from "./components/SearchBar/index.js";

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: cartData = { items: [], totalItems: 0, subtotal: 0, total: 0 },
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const updateQtyMutation = useMutation({
    mutationFn: ({ productId, change }) => updateCartItem(productId, change),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => {
      console.error("Error removing item:", error);
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/men", label: "Men" },
    { path: "/women", label: "Women" },
    { path: "/kids", label: "Kids" },
    { path: "/sale", label: "Sale" },
  ];

  const OpenCart = () => {
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    navigate("/ship");
    setIsModalOpen(false);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <>
      <div className="header">
  <div className="nav-container">
    
    {/* Logo - Left */}
    <div className="logo">
      <span>KicksHub</span>
    </div>

    {/* Navigation Menu - Dropdown on mobile, center on desktop */}
    <nav>
      <ul className={`menu ${isMenuOpen ? "active" : ""}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    {/* Right side - Icons and Hamburger */}
    <div className="nav-right">
      {/* Icons */}
      <ul className="icons">
        <li className="search-container" aria-label="Search">
          <SearchBar />
        </li>
        
        <li className="cart-icon" aria-label="Cart" onClick={OpenCart}>
          <FaShoppingCart style={{ cursor: "pointer" }} />
          {cartData.totalItems > 0 && (
            <span
              className="cart-count"
              style={{ cursor: "pointer" }}
            >
              {cartData.totalItems}
            </span>
          )}
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <div className="cart-items">
              <button
                onClick={() => setIsModalOpen(false)}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
              <h4
                style={{
                  marginTop: "2rem",
                  marginLeft: "1rem",
                  color: "#A9A9A9",
                  fontWeight: "bold",
                }}
              >
                CART ({cartData.totalItems})
              </h4>

              {cartData.items && cartData.items.length > 0 ? (
                <>
                  {cartData.items.map((item, index) => (
                    <div
                      key={`cart-item-${item.productId}-${index}`}
                      className="cart-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "15px",
                        borderBottom: "1px solid #eee",
                        position: "relative",
                        gap: "15px",
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src={`http://localhost:5000${item.product.image}`}
                        alt={item.product.title}
                        className="cart-item-image"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          flexShrink: 0,
                        }}
                      />

                      {/* Product Details */}
                      <div
                        className="cart-item-details"
                        style={{ flex: 1 }}
                      >
                        <h5
                          style={{
                            margin: "0 0 8px 0",
                            fontWeight: "600",
                          }}
                        >
                          {item.product.title}
                        </h5>
                        {item.product.Tagline && (
                          <span
                            style={{
                              color: "#ff6b35",
                              fontSize: "12px",
                              fontWeight: "bold",
                              backgroundColor: "#fff3f0",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              marginBottom: "8px",
                              display: "inline-block",
                            }}
                          >
                            {item.product.Tagline}
                          </span>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          <p
                            style={{
                              color: "black",
                              margin: 0,
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            ${item.product.price}
                          </p>
                          <p
                            style={{
                              color: "#666",
                              margin: 0,
                              fontSize: "14px",
                            }}
                          >
                            Qty: {item.quantity}
                          </p>
                          {item.product.size && (
                            <p
                              style={{
                                color: "#666",
                                margin: 0,
                                fontSize: "12px",
                              }}
                            >
                              Sizes: {item.product.size}
                            </p>
                          )}
                          <p
                            style={{
                              color: "black",
                              margin: 0,
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            Subtotal: ${item.subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                          minWidth: "80px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            padding: "4px",
                          }}
                        >
                          {item.quantity > 1 ? (
                            <button
                              onClick={() =>
                                updateQtyMutation.mutate({
                                  productId: item.productId,
                                  change: -1,
                                })
                              }
                              style={{
                                backgroundColor: "#000000",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                width: "24px",
                                height: "24px",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              disabled={updateQtyMutation.isLoading}
                            >
                              -
                            </button>
                          ) : (
                            <button
                              style={{
                                backgroundColor: "#A9A9A9",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                width: "24px",
                                height: "24px",
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          <span
                            style={{
                              fontWeight: "600",
                              minWidth: "20px",
                              textAlign: "center",
                              fontSize: "16px",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQtyMutation.mutate({
                                productId: item.productId,
                                change: 1,
                              })
                            }
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              width: "24px",
                              height: "24px",
                              fontSize: "16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            disabled={updateQtyMutation.isLoading}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            removeMutation.mutate(item.productId)
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          disabled={removeMutation.isLoading}
                        >
                          <FaTrash style={{ fontSize: "12px" }} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Total Section */}
                  <div className="cart-total">
                    <hr />
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginLeft: "1rem",
                      }}
                    >
                      Subtotal: ${cartData.subtotal.toFixed(2)}
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginLeft: "1rem",
                      }}
                    >
                      Total items: {cartData.totalItems}
                    </p>
                  </div>
                </>
              ) : (
                <p>No items in cart</p>
              )}
            </div>
            {cartData.items && cartData.items.length > 0 && (
              <button
                onClick={handleCheckout}
                className="add-to-cart-btn"
              >
                Checkout (${cartData.total.toFixed(2)})
              </button>
            )}
          </Modal>
        </li>
        
        <li aria-label="User profile">
          <FaUser
            onClick={() => navigate("/create-account")}
            style={{ cursor: "pointer" }}
          />
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  </div>
</div>
    </>
  );
};

export default Header;
