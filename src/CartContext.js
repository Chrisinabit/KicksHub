import React from 'react';

export const ContextFunction = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState([]);


  const QuickAdd = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find((item)=> item.id === product.id)

      if(itemExists){
        return prevItems.map((item)=> item.id===product.id
        ?{...item, quantity:item.quantity + 1}
        : item
      );
      } else {
        return[...prevItems, {...product, quantity:1}];
      }
    });
  };

  const QuickRemove = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find((item)=> item.id === product.id)

      if(itemExists){
        return prevItems.map((item)=> item.id===product.id
        ?{...item, quantity:item.quantity - 1}
        : item
      );
      } else {
        return[...prevItems, {...product, quantity:1}];
      }
    });
  };
   const Remove = (product) => {
    setCartItems(currentItems => {
     const itemExists = currentItems.filter((item)=> item.id !== product.id)
      return itemExists;

      })
    }
      const RemoveAll = () => {
    setCartItems([]);
    }
    


  return (
    <ContextFunction.Provider value={{ QuickAdd, QuickRemove, Remove, RemoveAll, cartItems,setCartItems }}>
      {children}
    </ContextFunction.Provider>
  );
};


  //    const itemExists = prevItems.find(item => item.id === product.id);
  //     if (itemExists) {
  //       return prevItems.map(item =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     }
  //     return [...prevItems, { ...product, quantity: 1 }]
  // })}