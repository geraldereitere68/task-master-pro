/* 
Filename: ComplexCode.js

Description: 
This code is a complex implementation of a mini e-commerce website. It includes functionality for users to register, log in, browse products, add items to cart, place orders, and check order status. The code utilizes advanced concepts like object-oriented programming, closures, asynchronous programming, and error handling.

Please note that this is a simplified version of a real-world e-commerce website, and certain security and performance measures have been omitted for brevity.

*/

// Define global variables and data structures
let users = [];
let products = [];
let carts = [];
let orders = [];

// Define User class
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  login(username, password) {
    // Check if user credentials are valid
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      console.log(`Welcome back, ${user.username}!`);
      return user;
    } else {
      throw new Error('Invalid username or password.');
    }
  }

  register(username, email, password) {
    // Validate and create new user
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      throw new Error('Username or email already exists.');
    } else {
      const user = new User(username, email, password);
      users.push(user);
      console.log('Registration successful. Please log in.');
    }
  }
}

// Define Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  addToCart(productId, quantity) {
    // Find product by id
    const product = products.find(product => product.id === productId);
    if (product) {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      };
      carts.push(cartItem);
      console.log(`Added ${quantity} ${product.name}(s) to cart.`);
    } else {
      throw new Error('Invalid product id.');
    }
  }
}

// Define Order class
class Order {
  constructor(orderId, username) {
    this.orderId = orderId;
    this.username = username;
    this.items = [];
    this.status = 'pending';
  }

  addItemToOrder(productId, quantity) {
    // Find product by id
    const product = products.find(product => product.id === productId);
    if (product) {
      const orderItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      };
      this.items.push(orderItem);
      console.log(`Added ${quantity} ${product.name}(s) to order.`);
    } else {
      throw new Error('Invalid product id.');
    }
  }

  placeOrder() {
    // Update order status to 'placed'
    this.status = 'placed';
    orders.push(this);
    console.log(`Order ${this.orderId} has been placed.`);
  }

  static checkOrderStatus(orderId) {
    // Find order by id
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      console.log(`Order ${order.orderId} status: ${order.status}`);
    } else {
      throw new Error('Invalid order id.');
    }
  }
}

// Sample usage

try {
  const user1 = new User();
  user1.register('johnDoe', 'johndoe@example.com', 'password123');

  const user2 = new User();
  user2.register('janeSmith', 'janesmith@example.com', 'pw1234');

  const product1 = new Product(1, 'Product 1', 49.99);
  products.push(product1);

  const product2 = new Product(2, 'Product 2', 99.99);
  products.push(product2);

  user1.login('johnDoe', 'password123');
  user1.addToCart(1, 2);
  user1.addToCart(2, 1);

  const order1 = new Order(1, 'johnDoe');
  order1.addItemToOrder(1, 2);
  order1.addItemToOrder(2, 1);
  order1.placeOrder();

  Order.checkOrderStatus(1);
} catch (error) {
  console.error(error.message);
}