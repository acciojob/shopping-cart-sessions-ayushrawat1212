// This is the boilerplate code given for you
// You can modify this code
// Product data
// --------------------------------
      // 1. PRODUCT DATA
      // --------------------------------

      const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 30 },
        { id: 4, name: "Product 4", price: 40 },
        { id: 5, name: "Product 5", price: 50 },
      ];

      // --------------------------------
      // 2. DOM ELEMENTS
      // --------------------------------

      const productList = document.getElementById("product-list");

      const cartList = document.getElementById("cart-list");

      const clearCartBtn = document.getElementById("clear-cart-btn");

      // --------------------------------
      // 3. CART STATE
      // --------------------------------

      // Get the existing cart from sessionStorage.
      //
      // JSON.parse() converts the stored JSON string
      // back into a JavaScript array.
      //
      // If there is no cart in sessionStorage,
      // start with an empty array.

      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // --------------------------------
      // 4. RENDER PRODUCTS
      // --------------------------------

      function renderProducts() {
        products.forEach((product) => {
          // Create a new <li>
          const li = document.createElement("li");

          // Add product information and button
          li.innerHTML = `
          ${product.name} - $${product.price}
          <button
            class="add-to-cart-btn"
            data-id="${product.id}">
            Add to Cart
          </button>
        `;

          // Add the product <li> to the product list
          productList.appendChild(li);

          // Select the Add to Cart button
          // belonging to this particular product
          const button = li.querySelector(".add-to-cart-btn");

          // Add click event to the button
          button.addEventListener("click", () => {
            // dataset.id gives us a string,
            // so convert it into a number
            const productId = Number(button.dataset.id);

            // Add the selected product to the cart
            addToCart(productId);
          });
        });
      }

      // --------------------------------
      // 5. ADD PRODUCT TO CART
      // --------------------------------

      function addToCart(productId) {
        // Find the product using its ID
        const product = products.find((item) => {
          return item.id === productId;
        });

        // Add the product to the cart array
        cart.push(product);

        // Save the updated cart in sessionStorage
        //
        // sessionStorage can only store strings,
        // so JSON.stringify() converts the array
        // into a JSON string.

        sessionStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart displayed on the page
        renderCart();
      }

      // --------------------------------
      // 6. RENDER CART
      // --------------------------------

      function renderCart() {
        // Clear the existing cart display.
        //
        // This prevents duplicate HTML from being
        // created every time renderCart() runs.

        cartList.innerHTML = "";

        // Loop through every product in the cart
        cart.forEach((product) => {
          // Create a new <li>
          const li = document.createElement("li");

          // Display product name, price,
          // and Remove button

          li.innerHTML = `
          ${product.name} - $${product.price}
          <button class="remove-btn">
            Remove
          </button>
        `;

          // Select the Remove button
          const removeBtn = li.querySelector(".remove-btn");

          // Add click event to Remove button
          removeBtn.addEventListener("click", () => {
            // Remove this product from the cart
            removeFromCart(product.id);
          });

          // Add the cart item to the cart list
          cartList.appendChild(li);
        });
      }

      // --------------------------------
      // 7. REMOVE PRODUCT FROM CART
      // --------------------------------

      function removeFromCart(productId) {
        // Create a new array containing
        // every product EXCEPT the selected product.

        cart = cart.filter((item) => {
          return item.id !== productId;
        });

        // Save the updated cart
        // to sessionStorage

        sessionStorage.setItem("cart", JSON.stringify(cart));

        // Update the displayed cart
        renderCart();
      }

      // --------------------------------
      // 8. CLEAR ENTIRE CART
      // --------------------------------

      function clearCart() {
        // Empty the existing cart array
        cart.length = 0;

        // Update sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cart));

        // Refresh the cart display
        renderCart();
      }

      // --------------------------------
      // 9. CLEAR CART BUTTON
      // --------------------------------

      clearCartBtn.addEventListener("click", clearCart);

      // --------------------------------
      // 10. INITIAL RENDER
      // --------------------------------

      // Display the five products
      renderProducts();

      // Display any products that were
      // previously stored in sessionStorage
      renderCart();
