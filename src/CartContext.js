// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// export const ContextFunction = React.createContext();

// export const CartProvider = ({ children }) => {
//   const queryClient = useQueryClient();

//   // 🛒 1. Fetch cart
//   const { data: cartItems = [], isLoading } = useQuery({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:5000/cart");
//       if (!res.ok) throw new Error("Failed to fetch cart");
//       return res.json();
//     },
//   });

//   // 🛒 2. Add item (backend will increment if exists)
//   const addToCart = useMutation({
//     mutationFn: async (product) => {
//       const res = await fetch("http://localhost:5000/cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//         productId: product.id,
//         quantity: 1,
//         product: product,
//         }),
//       });
//       console.log("Response status:", res.status);
//       if (!res.ok) throw new Error("Failed to add to cart");
//       return res.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   // 🛒 3. Remove one quantity
//   const removeOne = useMutation({
//     mutationFn: async (product) => {
//       const res = await fetch("http://localhost:5000/cart", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId: product.id,
//           quantity: 1,
//           product: product,
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to remove from cart");
//       return res.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   // 🛒 4. Remove entire product
//   const removeFromCart = useMutation({
//     mutationFn: async (product) => {
//       const res = await fetch(
//         `http://localhost:5000/cart/${product.id}`, // URL params approach
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           // No body needed with URL params
//         }
//       );
//       if (!res.ok) throw new Error("Failed to delete item");
//       return res.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//     onError: (error) => {
//       console.error("Remove from cart error:", error);
//     },
//   });

//   // 🛒 5. Clear cart
//   const clearCart = useMutation({
//     mutationFn: async () => {
//       const res = await fetch("http://localhost:5000/cart", {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to clear cart");
//       return res.json();
//     },
//     onSuccess: () => queryClient.invalidateQueries(["cart"]),
//   });

//   return (
//     <ContextFunction.Provider
//       value={{
//         QuickAdd: (product) => addToCart.mutate(product),
//         QuickRemove: (product) => removeOne.mutate(product),
//         Remove: (product) => removeFromCart.mutate(product),
//         RemoveAll: () => clearCart.mutate(),
//         cartItems,
//         isLoading,
//       }}
//     >
//       {children}
//     </ContextFunction.Provider>
//   );
// };

// //  `http://localhost:5000/cart/${product.productId}`,
