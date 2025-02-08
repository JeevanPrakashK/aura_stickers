let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

// Add item to cart
function addToCart(name, size, price) {
  let item = { name, size, price };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems();
}

// Calculate total with "Buy 1 Get 2 Free" offer
function calculateTotal(cartItems) {
  // Count how many sets of 3 items are in the cart
  const paidItems = Math.ceil(cartItems.length / 3);
  return paidItems * 149; // Only charge 149 for every third item
}

// Display cart items in modal
function displayCartItems() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.innerHTML = "";
    document.getElementById("checkout-button").style.display = "none";
    return;
  }

  // Add offer message
  const offerMessage = document.createElement("div");
  offerMessage.className = "offer-message";
  offerMessage.innerHTML =
    "<p style='color: green; margin-bottom: 15px;'><strong>Special Offer:</strong> Buy 1 Get 2 Free! 🎉</p>";
  cartItems.appendChild(offerMessage);

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    // Calculate if this item is free
    const isFree = (index + 1) % 3 !== 1;
    itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>${item.size} - ${
      isFree ? '<span style="color: green">FREE</span>' : "₹149"
    }</small>
            </div>
            <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItems.appendChild(itemDiv);
  });

  const total = calculateTotal(cart);
  cartTotal.innerHTML = `
        <div style="margin-top: 10px;">
            <p>Items in cart: ${cart.length}</p>
            <p>Paid items: ${Math.ceil(cart.length / 3)}</p>
            <p>Free items: ${cart.length - Math.ceil(cart.length / 3)}</p>
            <strong>Total: ₹${total}</strong>
        </div>
    `;
  document.getElementById("checkout-button").style.display = "block";
}

// Open cart modal
function openCartModal() {
  document.getElementById("cart-modal").style.display = "block";
  displayCartItems();
}

// Close cart modal
function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}

// Checkout via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello, I want to order:\n\n";

  cart.forEach((item, index) => {
    const isFree = (index + 1) % 3 !== 1;
    message += `- ${item.name} (${item.size}) - ${isFree ? "FREE" : "₹149"}\n`;
  });

  const total = calculateTotal(cart);
  message += `\nTotal Items: ${cart.length}`;
  message += `\nPaid Items: ${Math.ceil(cart.length / 3)}`;
  message += `\nFree Items: ${cart.length - Math.ceil(cart.length / 3)}`;
  message += `\nTotal Amount: ₹${total}`;
  message += "\n\n(Buy 1 Get 2 Free Offer Applied)";

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/6383064859?text=${encodedMessage}`, "_blank");

  // Clear cart after checkout
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  closeCartModal();
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("cart-modal");
  if (event.target == modal) {
    closeCartModal();
  }
};

// Initialize cart count on page load
updateCartCount();

// Function to toggle the sub-menu
function toggleSubMenu() {
  var subMenu = document.getElementById("sub-menu");
  subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
}

function sendWhatsAppMessage(imageName) {
  var phoneNumber = "6383064859"; // Replace with your WhatsApp number
  var message = encodeURIComponent(
    "Hello, I'm interested in the poster: " + imageName
  );
  var whatsappURL = "https://wa.me/" + phoneNumber + "?text=" + message;
  window.location.href = whatsappURL;
}

// Close the dropdown when clicking outside
window.onclick = function (event) {
  var menu = document.querySelector(".menu");
  var dropdown = document.querySelector(".dropdown-content");
  if (!menu.contains(event.target)) {
    dropdown.style.display = "none";
  }
};
// Function to toggle the main menu
function toggleMenu() {
  const dropdownContent = document.getElementById("dropdown-content");
  const subMenu = document.getElementById("sub-menu");

  // Toggle main dropdown
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    // Also hide submenu when closing main menu
    subMenu.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

// Function to toggle the sub-menu
function toggleSubMenu(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  event.stopPropagation(); // Prevent the click from closing the main menu

  const subMenu = document.getElementById("sub-menu");
  subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
}

// Close menus when clicking outside
document.addEventListener("click", function (event) {
  const menu = document.querySelector(".menu");
  const dropdownContent = document.getElementById("dropdown-content");
  const subMenu = document.getElementById("sub-menu");

  // If click is outside the menu
  if (!menu.contains(event.target)) {
    dropdownContent.style.display = "none";
    subMenu.style.display = "none";
  }
});

// Initialize the cart count on page load
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});
