
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const dataDir = path.join(__dirname, "data");
const uploadsDir = path.join(__dirname, "uploads");

// Ensure folders exist
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Initialize required data files
const initializeDataFiles = () => {
  const requiredFiles = ['cart.json', 'orders.json'];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      console.log(`✅ Created ${file}`);
    }
  });

  // Check if products file exists, if not create empty array (don't override existing data)
  const productsPath = path.join(dataDir, 'product.json');
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, JSON.stringify([], null, 2));
    console.log(`✅ Created empty product.json - please add your products`);
  } else {
    // Check if products file has data
    try {
      const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      console.log(`✅ Found ${products.length} products in product.json`);
    } catch (error) {
      console.log(`⚠️ Error reading products: ${error.message}`);
    }
  }
};

// Initialize files on startup
initializeDataFiles();

// File helpers (generic + cart-specific)
const readData = (file) => {
  try {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      // Create empty file if it doesn't exist
      writeData(file, []);
      return [];
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) {
      // If file is empty, return empty array
      return [];
    }
    const data = JSON.parse(fileContent);
    // Ensure we always return an array and filter out any null/undefined items
    return Array.isArray(data) ? data.filter(item => item !== null && item !== undefined) : [];
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
    // Return empty array on any error and try to create a valid file
    writeData(file, []);
    return [];
  }
};

const writeData = (file, data) => {
  try {
    const filePath = path.join(dataDir, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${file}:`, error);
    throw error;
  }
};

// Cart helpers (always uses cart.json inside /data)
const readCart = () => {
  try {
    return readData("cart.json");
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

const writeCart = (data) => {
  try {
    writeData("cart.json", data);
  } catch (error) {
    console.error("Error writing cart:", error);
    throw error;
  }
};

// Orders helpers
const readOrders = () => {
  try {
    return readData("orders.json");
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
};

const writeOrders = (data) => {
  try {
    writeData("orders.json", data);
  } catch (error) {
    console.error("Error writing orders:", error);
    throw error;
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));


// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/* ====================
   HOME
==================== */
app.get("/", (req, res) => {
  res.json({
    message: "Shoe Store API",
    endpoints: {
      products: "/product",
      cart: "/cart",
      orders: "/orders",
    },
  });
});

/* ====================
   PRODUCTS
==================== */
app.get("/product", (req, res) => {
  try {
    const products = readData("product.json");
    res.json(products);
  } catch (err) {
    console.error("❌ Error reading products:", err);
    res.status(500).json({ error: "Failed to read products" });
  }
});

app.post("/product", upload.single("image"), (req, res) => {
  try {
    const products = readData("product.json");
    const newProduct = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      title: req.body.title,
      price: parseFloat(req.body.price),
      rating: req.body.rating,
      description: req.body.description,
      Tagline: req.body.Tagline,
      size: req.body.size,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      category: req.body.category,
      gender: req.body.gender,
    };

    products.push(newProduct);
    writeData("product.json", products);
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

/* ====================
   CART WITH CALCULATIONS
==================== */
// Helper function to calculate cart totals
const calculateCartTotals = (cart, products) => {
  try {
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return {
        items: [],
        totalItems: 0,
        subtotal: 0,
        total: 0
      };
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return {
        items: [],
        totalItems: 0,
        subtotal: 0,
        total: 0
      };
    }

    // Filter out any null/undefined items first
    const validCartItems = cart.filter(item => 
      item && 
      typeof item === 'object' && 
      item.productId !== null && 
      item.productId !== undefined &&
      item.quantity !== null &&
      item.quantity !== undefined
    );

    console.log('Valid cart items:', validCartItems);

    const cartWithProducts = validCartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      if (!product) {
        console.log(`Product with ID ${cartItem.productId} not found in products`);
        return null;
      }
      
      // Ensure price is a number (your data shows price as number)
      const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
      const itemSubtotal = productPrice * cartItem.quantity;
      
      return {
        ...cartItem,
        product: {
          ...product,
          price: productPrice // Ensure price is always a number
        },
        subtotal: parseFloat(itemSubtotal.toFixed(2))
      };
    }).filter(Boolean); // Remove any null items

    const totalItems = cartWithProducts.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
    const savings =  ((1.05/100 )* subtotal).toFixed(2);
    const afterSavings = (subtotal - savings).toFixed(2);
    const shipping = totalItems * 20; // Assuming 400 per item for shipping
    const orderTotal = ((subtotal - savings) + shipping).toFixed(2);
    

    
    return {
      items: cartWithProducts,
      totalItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      total: parseFloat(subtotal.toFixed(2)),
      savings: parseFloat(savings).toFixed(2),
      afterSavings: parseFloat(afterSavings),
      shipping: parseFloat(shipping),
      orderTotal: parseFloat(orderTotal)
      
    };
  } catch (error) {
    console.error("Error calculating cart totals:", error);
    return {
      items: [],
      totalItems: 0,
      subtotal: 0,
      total: 0
    };
  }
};

// 🛒 GET all cart items with calculations
app.get("/cart", (req, res) => {
  try {
    let cart = readCart();
    const products = readData("product.json");
    
    // Clean the cart of duplicates every time we read it
    const cleanCart = [];
    const seenProducts = new Map();
    
    cart.forEach(item => {
      if (item && item.productId) {
        const productId = parseInt(item.productId);
        if (seenProducts.has(productId)) {
          // Add quantity to existing item
          seenProducts.get(productId).quantity += parseInt(item.quantity) || 1;
        } else {
          // Add new item
          const cleanItem = {
            productId: productId,
            quantity: parseInt(item.quantity) || 1
          };
          seenProducts.set(productId, cleanItem);
          cleanCart.push(cleanItem);
        }
      }
    });
    
    // If we cleaned up duplicates, save the clean cart
    if (cleanCart.length !== cart.length || 
        JSON.stringify(cleanCart) !== JSON.stringify(cart)) {
      console.log('Cleaned up cart duplicates, saving...');
      writeCart(cleanCart);
    }
    
    // If no products exist, return empty cart
    if (!products || products.length === 0) {
      return res.json({ 
        items: [], 
        totalItems: 0, 
        subtotal: 0, 
        total: 0 
      });
    }
    
    const cartData = calculateCartTotals(cleanCart, products);
    res.json(cartData);
  } catch (err) {
    console.error("❌ Error reading cart:", err);
    // Return empty cart structure instead of error
    res.json({ 
      items: [], 
      totalItems: 0, 
      subtotal: 0, 
      total: 0 
    });
  }
});

// 🛒 POST add item
app.post("/cart", (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    console.log('Add to cart request:', { productId, quantity, bodyType: typeof req.body });

    if (!productId) {
      console.log('Missing productId');
      return res.status(400).json({ error: "productId is required" });
    }

    // Verify product exists
    const products = readData("product.json");
    console.log('Products loaded:', products.length);
    
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
      console.log('Product not found:', productId);
      return res.status(404).json({ error: `Product with ID ${productId} not found` });
    }

    let cart = readCart();
    console.log('Current cart before processing:', cart);
    
    // Clean the cart first - remove any duplicates or invalid entries
    const cleanCart = [];
    const seenProducts = new Set();
    
    cart.forEach(item => {
      if (item && item.productId && !seenProducts.has(item.productId)) {
        cleanCart.push({
          productId: parseInt(item.productId),
          quantity: parseInt(item.quantity) || 1
        });
        seenProducts.add(item.productId);
      } else if (item && item.productId && seenProducts.has(item.productId)) {
        // If duplicate found, add quantity to existing item
        const existingItem = cleanCart.find(ci => ci.productId === item.productId);
        if (existingItem) {
          existingItem.quantity += parseInt(item.quantity) || 1;
        }
      }
    });
    
    console.log('Cleaned cart:', cleanCart);
    
    // Now check if the product being added already exists
    const existingItem = cleanCart.find((item) => item.productId === parseInt(productId));

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
      console.log('Updated existing item:', existingItem);
    } else {
      const newItem = { 
        productId: parseInt(productId), 
        quantity: parseInt(quantity) 
      };
      cleanCart.push(newItem);
      console.log('Added new item:', newItem);
    }

    console.log('Final cart to save:', cleanCart);
    writeCart(cleanCart);
    
    const cartData = calculateCartTotals(cleanCart, products);
    console.log('Cart data to return:', cartData);
    
    res.status(201).json({ 
      message: "Item added to cart successfully", 
      cart: cartData 
    });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ 
      error: "Failed to add item to cart", 
      details: err.message 
    });
  }
});

// 🛒 PATCH update quantity
app.patch("/cart/:productId", (req, res) => {
  const { change } = req.body;
  const { productId } = req.params;

  try {
    const cart = readCart();
    const products = readData("product.json");
    const item = cart.find((i) => i.productId === parseInt(productId));

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    item.quantity += parseInt(change);
    
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }

    writeCart(cart);
    const cartData = calculateCartTotals(cart, products);
    res.json({ message: "Cart updated", cart: cartData });
  } catch (err) {
    console.error("❌ Error updating cart:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// 🛒 DELETE one item
app.delete("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  try {
    let cart = readCart();
    const products = readData("product.json");
    const updatedCart = cart.filter((item) => item.productId !== parseInt(productId));

    if (cart.length === updatedCart.length) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    writeCart(updatedCart);
    const cartData = calculateCartTotals(updatedCart, products);
    res.json({ message: "Item removed", cart: cartData });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// 🛒 DELETE all items
app.delete("/cart", (req, res) => {
  try {
    writeCart([]);
    res.json({ 
      message: "Cart cleared", 
      cart: { items: [], totalItems: 0, subtotal: 0, total: 0 } 
    });
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

/* ====================
   ORDERS
==================== */
app.post("/orders", (req, res) => {
  try {
    const { items, total } = req.body;
    const orders = readOrders();
    
    const newOrder = {
      id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    orders.push(newOrder);
    writeOrders(orders);
    
    // Clear cart after successful order
    writeCart([]);
    
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

app.get("/orders", (req, res) => {
  try {
    const orders = readOrders();
    res.json(orders);
  } catch (err) {
    console.error("❌ Error reading orders:", err);
    res.status(500).json({ error: "Failed to read orders" });
  }
});


// Search products endpoint - Fixed for JSON file data
app.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Search query must be at least 2 characters' 
      });
    }

    // Read products from JSON file
    const products = readData("product.json");
    
    if (!products || !Array.isArray(products)) {
      return res.status(500).json({ error: 'Products data not found' });
    }

    // Create search regex for partial matching (case-insensitive)
    const searchRegex = new RegExp(q.trim(), 'i');
    
    // Filter products using JavaScript array methods
    const filteredProducts = products
      .filter(product => {
        // Search in multiple fields
        return (
          (product.title && searchRegex.test(product.title)) ||
          (product.description && searchRegex.test(product.description)) ||
          (product.category && searchRegex.test(product.category)) ||
          (product.Tagline && searchRegex.test(product.Tagline)) ||
          (product.brand && searchRegex.test(product.brand))
        );
      })
      .map(product => {
        // Select only needed fields (similar to MongoDB's .select())
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          Tagline: product.Tagline,
          description: product.description,
          brand: product.brand
        };
      })
      .sort((a, b) => {
        // Sort by createdAt if it exists, otherwise by title
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.title.localeCompare(b.title);
      })
      .slice(0, 20); // Limit to 20 results

    res.json({
      query: q,
      count: filteredProducts.length,
      products: filteredProducts
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

/* ====================
   START SERVER
==================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Mock backend running on http://localhost:${PORT}`);
});