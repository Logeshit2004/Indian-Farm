<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Indian Farm Market</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"/>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <style>
    .navbar-nav { margin-left: auto; }
    .navbar-brand {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
      font-weight: bold;
    }
    .product-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .form-section {
      display: none;
      margin-top: 20px;
    }
    .form-section input, .form-section select {
      margin-bottom: 15px;
    }
    .alert-success {
      margin-top: 20px;
    }
    .modal {
      display: none;
      position: fixed;
      z-index: 999;
      left: 0; top: 0;
      width: 100%; height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
      background-color: #fff;
      margin: 10% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 300px;
      border-radius: 5px;
    }
    .close {
      float: right;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-success p-3">
    <div class="container-fluid">
      <div class="mx-auto">
        <a class="navbar-brand fw-bold text-white" href="#"><i class="fas fa-tractor"></i> Indian Farm Market</a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link text-white" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="products.html">Products</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="services.html">Services</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Search and Filter -->
  <div class="container my-4">
    <div class="row mb-3">
      <div class="col-md-8">
        <input type="text" id="searchInput" class="form-control" placeholder="Search products..." onkeyup="filterProducts()">
      </div>
      <div class="col-md-4">
        <select id="categoryFilter" class="form-select" onchange="filterProducts()">
          <option value="All">All Categories</option>
          <option value="Grains">Grains</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Beverages">Beverages</option>
          <option value="Nuts">Nuts</option>
          <option value="Spices">Spices</option>
          <option value="Oils">Oils</option>
        </select>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4" id="productList"></div>
  </div>

  <!-- Cart Section -->
  <div class="container my-4 cart-container">
    <h2>Purchase Cart</h2>
    <ul id="cartList" class="list-group mb-3"></ul>
    <h4>Total: ₹<span id="cartTotal">0</span></h4>
    <button id="proceed-btn" class="btn btn-primary">Proceed to Payment</button>
    <button class="btn btn-danger" onclick="clearCart()">Clear Cart</button>

    <!-- Payment Form -->
    <div id="payment-form" class="form-section">
      <h4 class="mt-4">Payment Details</h4>
      <form id="checkout-form">
        <input type="text" class="form-control" id="customer-name" placeholder="Customer Name" required>
        <input type="text" class="form-control" id="address" placeholder="Address" required>
        <input type="tel" class="form-control" id="phone" placeholder="Phone Number" required>
        <input type="text" class="form-control" id="cost" readonly>
        <select class="form-control" id="payment-method" required>
          <option value="">Select Payment Method</option>
          <option>Debit Card</option>
          <option>Credit Card</option>
          <option>UPI</option>
        </select>
        <button type="submit" class="btn btn-success mt-3">Submit Payment</button>
      </form>
      <div id="success-message" class="alert alert-success d-none">✅ Successfully purchased the products!</div>
    </div>
  </div>

  <script src="script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>