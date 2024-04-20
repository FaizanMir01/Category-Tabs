// Fetch the data from the specified URL
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
  .then(response => response.json()) // Convert the response to JSON
  .then(data => {
    // Get the product container element and tab links
    const productContainer = document.getElementById('product-container');
    const tabLinks = document.querySelectorAll('.tab-link');

    // Function to render product cards
    function renderProductCards(category) {
      // Find the category data based on the provided category name
      const categoryData = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());

      // If the category is not found, log an error and return
      if (!categoryData) {
        console.error('Category not found:', category);
        return;
      }

      // Get the products for the category
      const products = categoryData.category_products;

      // Clear the product container
      productContainer.innerHTML = '';

      // Loop through each product and create a card for it
      products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Create and append the product image
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        card.appendChild(image);

        // Create and append the badge (if any)
        const badgeText = product.badge_text ? product.badge_text : '';
        const badge = document.createElement('span');
        badge.textContent = badgeText;
        badge.classList.add('badge');
        card.appendChild(badge);

        // Create and append the title and vendor
        const titleVendorDiv = document.createElement('div');
        titleVendorDiv.classList.add('titleVendor');
        const title = document.createElement('h3');
        title.textContent = product.title;
        titleVendorDiv.appendChild(title);
        const vendor = document.createElement('p');
        vendor.textContent = `${product.vendor}`;
        titleVendorDiv.appendChild(vendor);
        card.appendChild(titleVendorDiv);

        // Create and append the price and discount information
        const PriceDiv = document.createElement('div');
        PriceDiv.classList.add('titleVendor');
        const price = document.createElement('p');
        price.classList.add('currPrice');
        price.textContent = `Rs ${product.price}`;
        PriceDiv.appendChild(price);
        const compareAtPrice = document.createElement('p');
        compareAtPrice.classList.add('originalPrice');
        compareAtPrice.textContent = `${product.compare_at_price}`; // Added semicolon here
        PriceDiv.appendChild(compareAtPrice);
        const discountPercentage = Math.round(100 - (product.price / product.compare_at_price) * 100);
        const discount = document.createElement('p');
        discount.classList.add('discount');
        discount.textContent = `${discountPercentage}% off`;
        PriceDiv.appendChild(discount);
        card.appendChild(PriceDiv);

        // Create and append the "Add to Cart" button
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-to-cart');
        card.appendChild(addToCartButton);

        // Append the card to the product container
        productContainer.appendChild(card);
      });
    }

    // Event listener for tab switching
    tabLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault(); // Prevent the default link behavior
        const category = e.target.dataset.tab; // Get the category from the data-tab attribute
        tabLinks.forEach(link => link.classList.remove('active')); // Remove the "active" class from all tab links
        e.target.classList.add('active'); // Add the "active" class to the clicked tab link
        renderProductCards(category); // Render the product cards for the selected category
      });
    });

    // Render the initial product cards for the "Men" category
    renderProductCards('Men');
  })
  .catch(error => console.error('Error fetching product data:', error)); // Log any errors that occurred during the fetch