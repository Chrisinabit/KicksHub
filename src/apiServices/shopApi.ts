
const BASE_URL = "http://localhost:5000";

//Products
export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/product`);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
}

// Updated API call - make sure the URL matches your backend route
export const searchProducts = async (query) => {
  try {
    // If your search endpoint is at the root level:
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    
    // OR if it's under /api/products/:
    // const res = await fetch(`${BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Search products error:', error);
    throw error;
  }
};

    

//Cart
export async function getCart() {
  try {
    const res = await fetch(`${BASE_URL}/cart`);
    if (!res.ok) throw new Error("Failed to load cart");
    return res.json();
  } catch (error) {
    console.error('Get cart error:', error);
    throw error;
  }
}

export async function addToCart(productId, quantity = 1) {
  try {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('ProductId:', productId, 'Type:', typeof productId);
    console.log('Quantity:', quantity, 'Type:', typeof quantity);
    console.log('URL:', `${BASE_URL}/cart`);
    
    // Convert to numbers regardless of input type
    const numericProductId = typeof productId === 'number' ? productId : parseInt(productId);
    const numericQuantity = typeof quantity === 'number' ? quantity : parseInt(quantity);
    
    const payload = { 
      productId: numericProductId, 
      quantity: numericQuantity 
    };
    console.log('Payload:', payload);
    
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${responseText}`);
    }
    
    const data = JSON.parse(responseText);
    console.log('Parsed data:', data);
    return data;
    
  } catch (error) {
    console.error('=== ADD TO CART ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    throw error;
  }
}

export async function updateCartItem(productId, change) {
  try {
    const numericProductId = typeof productId === 'number' ? productId : parseInt(productId);
    const numericChange = typeof change === 'number' ? change : parseInt(change);
    
    const response = await fetch(`${BASE_URL}/cart/${numericProductId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ change: numericChange })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update failed: ${response.status} ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
}

export async function removeFromCart(productId) {
  try {
    const numericProductId = typeof productId === 'number' ? productId : parseInt(productId);
    
    const response = await fetch(`${BASE_URL}/cart/${numericProductId}`, {
      method: "DELETE"
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Remove failed: ${response.status} ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Remove from cart error:', error);
    throw error;
  }
}

export async function clearCart() {
  try {
    const response = await fetch(`${BASE_URL}/cart`, { 
      method: "DELETE" 
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Clear cart failed: ${response.status} ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
}

export async function placeOrder(items, total) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ items, total })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Order failed: ${response.status} ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Place order error:', error);
    throw error;
  }
}