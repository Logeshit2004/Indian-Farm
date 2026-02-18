const products = [
    { id: 1, name: "Basmati Rice", price: 150, category: "Grains", image: "basmati_rice.jpg" },
    { id: 2, name: "Alphonso Mango", price: 300, category: "Fruits", image: "alphonso_mango.jpg" },
    { id: 3, name: "Desi Ghee", price: 500, category: "Dairy", image: "desi_ghee.jpg" },
    { id: 4, name: "Tea Leaves", price: 200, category: "Beverages", image: "tea_leaves.jpg" },
    { id: 5, name: "Cashew Nuts", price: 400, category: "Nuts", image: "cashew_nuts.jpg" },
    { id: 6, name: "Turmeric", price: 250, category: "Spices", image: "turmeric.jpg" },
    { id: 7, name: "Coconut", price: 100, category: "Fruits", image: "coconut.jpg" },
    { id: 8, name: "Mustard Oil", price: 180, category: "Oils", image: "mustard_oil.jpg" }
  ];
  
  let cart = [];
  
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts(products);
  
    const proceedBtn = document.getElementById("proceed-btn");
    const paymentForm = document.getElementById("payment-form");
    const costInput = document.getElementById("cost");
    const form = document.getElementById("checkout-form");
    const successMessage = document.getElementById("success-message");
  
    proceedBtn.addEventListener("click", () => {
      const totalAmount = document.getElementById("cartTotal").textContent;
      if (parseInt(totalAmount) === 0) {
        alert("🛒 Your cart is empty.");
        return;
      }
      costInput.value = `₹${totalAmount}`;
      paymentForm.style.display = "block";
      successMessage.classList.add("d-none");
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const payload = {
        name: document.getElementById("customer-name").value.trim(),
        address: document.getElementById("address").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        paymentMethod: document.getElementById("payment-method").value,
        total: document.getElementById("cartTotal").textContent
      };
  
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
  
        const result = await res.json();
        if (res.ok) {
          successMessage.classList.remove("d-none");
          form.reset();
          clearCart();
          document.getElementById("cartTotal").textContent = "0";
          costInput.value = "";
          proceedBtn.disabled = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          alert(result.error || "Failed to store payment.");
        }
      } catch (err) {
        console.error("Payment error:", err);
        alert("Server error. Try again later.");
      }
    });
  });
  
  function loadProducts(data) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    data.forEach(product => {
      const div = document.createElement("div");
      div.className = "col";
      div.innerHTML = `
        <div class="card h-100 p-2">
          <img src="./images/${product.image}" class="product-image" onerror="this.src='./images/default.jpg';">
          <div class="card-body">
            <h5>${product.name}</h5>
            <p>Price: ₹${product.price}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>`;
      productList.appendChild(div);
    });
  }
  
  function filterProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const filtered = products.filter(p =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(keyword)
    );
    loadProducts(filtered);
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCartUI();
  }
  
  function updateCartUI() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.name} - ₹${item.price} x ${item.quantity}
          <button class="btn btn-sm btn-danger" onclick="removeOneFromCart(${item.id})">-</button>
        </li>`;
    });
    document.getElementById("cartTotal").textContent = total;
  }
  
  function removeOneFromCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) cart = cart.filter(i => i.id !== id);
      updateCartUI();
    }
  }
  
  function clearCart() {
    cart = [];
    updateCartUI();
  }
  