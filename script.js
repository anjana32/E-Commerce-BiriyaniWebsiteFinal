const cartItems = [];
const cartList = document.getElementById("cart-items");
const total = document.getElementById("total");
const orderMessage = document.getElementById("order-message");
const addressInput = document.getElementById("address");
const addButtons = document.querySelectorAll(".add-btn");
const cartModal = document.getElementById("cart-modal");
const cartButton = document.getElementById("cart-button");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const placeOrderBtn = document.getElementById("place-order");
const cartCount = document.getElementById("cart-count");

// Add to cart
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    cartItems.push({ name, price });
    updateCart();
    cartModal.style.display = "block";
  });
});

// Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2000);
}

// Modify Add to Cart
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    cartItems.push({ name, price });
    updateCart();
    cartModal.style.display = "block";

    // Show toast
    showToast(`${name} added to cart!`);
  });
});


// Update cart
function updateCart() {
  cartList.innerHTML = "";
  let totalAmount = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    
    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.background="none";
    removeBtn.style.border="none";
    removeBtn.style.color="#ffd60a";
    removeBtn.style.cursor="pointer";
    removeBtn.addEventListener("click", () => {
      cartItems.splice(index,1);
      updateCart();
    });
    li.appendChild(removeBtn);
    cartList.appendChild(li);
    totalAmount += item.price;
  });
  total.textContent = `Total: ₹${totalAmount}`;
  cartCount.textContent = cartItems.length;
}

// Cart modal controls
cartButton.addEventListener("click", ()=>{ cartModal.style.display="block"; });
closeCartBtn.addEventListener("click", ()=>{ cartModal.style.display="none"; });
clearCartBtn.addEventListener("click", ()=>{
  cartItems.length=0;
  updateCart();
});

// Place order
placeOrderBtn.addEventListener("click", ()=>{
  const address = addressInput.value.trim();
  if(cartItems.length===0){ orderMessage.textContent="⚠️ Cart is empty!"; orderMessage.style.color="red"; return;}
  if(address===""){ orderMessage.textContent="⚠️ Enter delivery address!"; orderMessage.style.color="red"; return;}
  
  orderMessage.textContent="✅ Order placed successfully! Delivery in 30 mins.";
  orderMessage.style.color="#4CAF50";
  cartItems.length=0;
  updateCart();
  addressInput.value="";
});
