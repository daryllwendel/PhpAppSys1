function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
  const nav = document.querySelector(".nav");
  nav.classList.toggle("expanded");
}




function loadloading() {
  fetch('/loading')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const loading = doc.querySelector('.loader-wrapper')
      if (loading) {
        const content = document.getElementById('change-container')
        content.innerHTML = ''
        content.appendChild(loading)
      } else {
        console.log('error loading')
      }
    }).catch((err) => console.error("Failed to load dashboard content:", err))
}
function clearLoading() {
  const body = document.getElementById('change-container');
  const loader = body.querySelector('.loader-wrapper');
  if (loader) {
    loader.remove();
  }
}
function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburger');

  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  try {
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
      button.classList.remove('active');

      button.addEventListener('click', function () {
        navButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });
  } catch (error) {
    console.error('Navigation error:', error);
  }
});

window.addEventListener('resize', function () {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburger');

  if (window.innerWidth > 768) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
document.addEventListener('click', function (event) {
  const nav = document.querySelector('.nav');
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburger');

  if (!nav.contains(event.target) && menu.classList.contains('active')) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    console.log('Menu closed due to outside click');
  }
});
function profileset() {
  const profile = document.getElementById("customerProfile");
  const password = document.getElementById("customerPassword");
  const location = document.getElementById("customerLocation")

  const profcus = document.querySelector(".profcus");
  const profileInfo = document.querySelector(".profileInfo");
  const changepass = document.querySelector(".changepass");
  const locationSection = document.querySelector(".location");
  const profaddress = document.querySelector(".profaddress")

  function hideAllSections() {
    profcus.style.display = "none";
    changepass.style.display = "none";
    locationSection.style.display = "none";
    profileInfo.style.display = "none"
    profaddress.style.display = "none"
  }

  profile.addEventListener("click", function () {
    hideAllSections();
    profcus.style.display = "grid";
    profileInfo.style.display = "grid";
    profaddress.style.display = "grid"

  });

  password.addEventListener("click", function () {
    hideAllSections();
    changepass.style.display = "grid";
  });

  location.addEventListener("click", function () {
    hideAllSections();
    locationSection.style.display = "grid";
  });

  hideAllSections();
  profcus.style.display = "grid";
  profaddress.style.display = "grid"
  profileInfo.style.display = "grid"
}



function sortOrders() {
  const column = document.getElementById('sortOptions').value;
  const lists = ['pendingList', 'shipList', 'completeList', 'cancelList'];
  const visibleListId = lists.find(id => {
    const list = document.getElementById(id);
    return list && list.style.display !== 'none';
  });

  if (!visibleListId) return;

  const container = document.getElementById(visibleListId);
  const rows = Array.from(container.getElementsByClassName('order-row'));

  rows.sort((a, b) => {
    const aCell = a.querySelector(`.cell[data-column="${column}"]`);
    const bCell = b.querySelector(`.cell[data-column="${column}"]`);
    if (!aCell || !bCell) return 0;

    const aText = aCell.textContent.trim().replace('₱', '').replace(/,/g, '');
    const bText = bCell.textContent.trim().replace('₱', '').replace(/,/g, '');
    const isNumeric = !isNaN(Number(aText)) && !isNaN(Number(bText));

    return isNumeric ? Number(aText) - Number(bText) : aText.localeCompare(bText);
  });

  rows.forEach(row => container.appendChild(row));
}

function toggleOrderList() {
  const value = document.getElementById('statusFilter').value;
  const lists = {
    pending: 'pendingList',
    shipped: 'shipList',
    delivered: 'completeList',
    cancelled: 'cancelList'
  };

  for (const key in lists) {
    const listEl = document.getElementById(lists[key]);
    listEl.style.display = (key === value) ? 'block' : 'none';
  }

  document.getElementById('section-title').textContent =
    value.charAt(0).toUpperCase() + value.slice(1) + ' Orders';

  sortOrders(); // Re-sort after changing list
}

function swipe(){
  console.log('Initializing Swiper for customer dashboard...');
    // Get all card wrappers (for both hot designs and new designs)
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    let i = 1;
    cardWrappers.forEach(wrapper => {
        i++;
        console.log(`Processing wrapper ${i}...`);
        // Count the actual number of slides in this specific wrapper
        const slideCount = wrapper.querySelectorAll('.swiper-slide').length;
        
        // If 3 or fewer items, disable Swiper and show all items
        if (slideCount <= 3) {
          console.log(`Disabling Swiper for wrapper ${i} with ${slideCount} items...`);
            // First, destroy any existing Swiper instance
            if (wrapper.swiper) {
                wrapper.swiper.destroy(true, true);
            }
            
            // Remove swiper container class to prevent automatic initialization
            const swiperContainer = wrapper.closest('.swiper');
            if (swiperContainer) {
              console.log(`Removing Swiper class from wrapper ${i}...`);
                swiperContainer.classList.remove('swiper');
                swiperContainer.classList.add('grid-container'); // Add custom class for styling
            }
            
            // Remove swiper classes and apply grid layout
            const cardList = wrapper.querySelector('.card-list');
            cardList.classList.remove('swiper-wrapper');
            cardList.style.display = 'flex';
            cardList.style.flexWrap = 'wrap';
            cardList.style.justifyContent = 'center';
            cardList.style.gap = '20px';
            cardList.style.width = '100%';
            
            // Remove swiper-slide class from individual items and reset styles
            const cardItems = wrapper.querySelectorAll('.card-item');
            cardItems.forEach(item => {
                item.classList.remove('swiper-slide');
                item.style.flex = '0 1 300px'; // Flexible width with max 300px
                item.style.minWidth = '280px';
                item.style.transform = 'none'; // Reset any transform applied by Swiper
                item.style.opacity = '1'; // Ensure visibility
            });
            
            // Hide navigation and pagination
            const pagination = wrapper.querySelector('.swiper-pagination');
            const nextBtn = wrapper.querySelector('.swiper-button-next');
            const prevBtn = wrapper.querySelector('.swiper-button-prev');
            
            if (pagination) pagination.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (prevBtn) prevBtn.style.display = 'none';
            
        } else {
            // 4 or more items - initialize Swiper normally
            const swiperContainer = wrapper.closest('.swiper');
            if (swiperContainer && !swiperContainer.classList.contains('swiper')) {
                swiperContainer.classList.add('swiper');
                swiperContainer.classList.remove('grid-container');
            }
            
            // Ensure swiper classes are present
            const cardList = wrapper.querySelector('.card-list');
            if (!cardList.classList.contains('swiper-wrapper')) {
                cardList.classList.add('swiper-wrapper');
            }
            
            const cardItems = wrapper.querySelectorAll('.card-item');
            cardItems.forEach(item => {
                if (!item.classList.contains('swiper-slide')) {
                    item.classList.add('swiper-slide');
                }
                // Reset inline styles that might interfere
                item.style.flex = '';
                item.style.minWidth = '';
                item.style.transform = '';
                item.style.opacity = '';
            });
            
            // Show navigation and pagination
            const pagination = wrapper.querySelector('.swiper-pagination');
            const nextBtn = wrapper.querySelector('.swiper-button-next');
            const prevBtn = wrapper.querySelector('.swiper-button-prev');
            
            if (pagination) pagination.style.display = '';
            if (nextBtn) nextBtn.style.display = '';
            if (prevBtn) prevBtn.style.display = '';
            
            // Initialize Swiper
            new Swiper(swiperContainer, {
                loop: true,
                spaceBetween: 30,
                
                pagination: {
                    el: wrapper.querySelector('.swiper-pagination'),
                    clickable: true,
                    dynamicBullets: true,
                },
                
                navigation: {
                    nextEl: wrapper.querySelector('.swiper-button-next'),
                    prevEl: wrapper.querySelector('.swiper-button-prev'),
                },
                
                breakpoints: {
                    0: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    }
                }
            });
        }
    });
}

function initProductOverlay4() {
  const buyButtons = document.querySelectorAll(".buy-button");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("close-btn");
  const mainContainer = document.querySelector(".customerNewOrder-container");

  if (!overlay || !modal || !closeBtn || !mainContainer) {
    console.log(overlay)
    console.log(modal)
    console.log(closeBtn)
    console.log(mainContainer)
    console.error("Required elements for product modal not found in DOM");
    return; // Exit function if any required element is missing
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute('data-id4');
      const productName = button.getAttribute('data-name4');
      const productPrice = button.getAttribute('data-price4');
      const productType = button.getAttribute('data-type4');
      const productPrintType = button.getAttribute('data-printtype4');
      const productImg = button.getAttribute('data-img4');
      const productStatus = button.getAttribute('data-status4');

      // Update modal content
      document.querySelector(".modal-header").textContent = productName;
      document.getElementById("product-image4").src = productImg;
      document.getElementById("price4").textContent = `₱${productPrice}`;
      document.getElementById('productId').value = productId;
      document.getElementById('productPrice4').value = `₱${productPrice}`;

      // Show modal and overlay
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
}
function initProductOverlay3() {
  const buyButtons = document.querySelectorAll(".buy-button1");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("close-btn");
  const mainContainer = document.querySelector(".customerhot-container1");

  if (!overlay || !modal || !closeBtn || !mainContainer) {
    console.log(overlay)
    console.log(modal)
    console.log(closeBtn)
    console.log(mainContainer)
    console.error("Required elements for product modal not found in DOM");
    return; // Exit function if any required element is missing
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute('data-id2');
      const productName = button.getAttribute('data-name2');
      const productPrice = button.getAttribute('data-price2');
      const productType = button.getAttribute('data-type2');
      const productPrintType = button.getAttribute('data-printtype2');
      const productImg = button.getAttribute('data-img2');
      const productStatus = button.getAttribute('data-status2');

      // Update modal content
      document.querySelector(".modal-header").textContent = productName;
      document.getElementById("product-image2").src = productImg;
      document.getElementById("price2").textContent = `₱${productPrice}`;
      document.getElementById('productId').value = productId;
      document.getElementById('productPrice2').value = `₱${productPrice}`;

      // Show modal and overlay
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

function initProductOverlay2() {
  const buyButtons = document.querySelectorAll(".buy-button");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("close-btn");
  const mainContainer = document.querySelector(".customerhot-container");

  if (!overlay || !modal || !closeBtn || !mainContainer) {
    console.log(overlay)
    console.log(modal)
    console.log(closeBtn)
    console.log(mainContainer)
    console.error("Required elements for product modal not found in DOM");
    return; // Exit function if any required element is missing
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute('data-id1');
      const productName = button.getAttribute('data-name1');
      const productPrice = button.getAttribute('data-price1');
      const productType = button.getAttribute('data-type1');
      const productPrintType = button.getAttribute('data-printtype1');
      const productImg = button.getAttribute('data-img1');
      const productStatus = button.getAttribute('data-status1');

      // Update modal content
      document.querySelector(".modal-header").textContent = productName;
      document.getElementById("product-image1").src = productImg;
      document.getElementById("price1").textContent = `₱${productPrice}`;
      document.getElementById('productId').value = productId;
      document.getElementById('productPrice1').value = `₱${productPrice}`;

      // Show modal and overlay
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
}
function initProductOverlay() {
  const buyButtons = document.querySelectorAll(".buy-button");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("close-btn");
  const mainContainer = document.querySelector(".main-container");

  // Check if necessary elements exist
  if (!overlay || !modal || !closeBtn || !mainContainer) {
    console.log(overlay)
    console.log(modal)
    console.log(closeBtn)
    console.log(mainContainer)
    console.error("Required elements for product modal not found in DOM");
    return; // Exit function if any required element is missing
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productId = button.getAttribute('data-id');
      const productName = button.getAttribute('data-name');
      const productPrice = button.getAttribute('data-price');
      const productType = button.getAttribute('data-type');
      const productPrintType = button.getAttribute('data-printtype');
      const productImg = button.getAttribute('data-img');
      const productStatus = button.getAttribute('data-status');

      // Update modal content
      document.querySelector(".modal-header1").textContent = productName;
      document.querySelector(".product-image").src = productImg;
      document.querySelector(".price").textContent = "P" + productPrice;
      document.getElementById('productId').value = productId;
      document.getElementById('productPrice').value = productPrice;

      // Show modal and overlay
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
}
function initCartListeners() {
  document.addEventListener("click", function (e) {
    const cart = document.getElementById("addtocart");
    const overlay = document.getElementById("overlay");

    if (e.target.id === "cartbutton") {
      if (cart && overlay) {
        cart.style.display = "grid";
      }
    }

    if (e.target.closest(".confirm")) {
      if (cart && overlay) {
        cart.style.display = "none"
        overlay.style.display = "grid"
      }
    }

    if (e.target.id == "reject") {
      if (cart && overlay) {
        cart.style.display = "none";
        overlay.style.display = "none";
      }
    }

    if (e.target.closest(".accept")) {
      if (cart && overlay) {
        cart.style.display = "none";
        overlay.style.display = "none";
      }
    }

    if (e.target.closest(".view button")) {
      if (cart && overlay) {
        overlay.style.display = "none"
      }
    }
  });

  document.querySelectorAll(".addtocart").forEach(form => {
    form.addEventListener("submit", function (e) {
      loadloading()
      e.preventDefault();

      const formData = new FormData(form);
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

      fetch("/addtocart", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      })
        .then(res => {
          if (res.ok) {
            document.body.style.overflow = "auto";
            loadcustomerdashboard();
          } else {
            alert("Failed to accept order.");
          }
        })
        .catch(err => {
          clearLoading()
          console.error("Error:", err);
        });
    });
  });
}

function loadcustomerdashboard() {
  loadloading()
  fetch('/CustomerHome')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const dashboardContent = doc.querySelector(".customerdashboard");
      const overlay = doc.querySelector(".overlay")

      if (dashboardContent) {
        console.log('Loading customer dashboard...');
        document.getElementById("title").innerHTML = `<div>Home</div>`;

        const content = document.getElementById("change-container");
        content.innerHTML = "";
        content.appendChild(dashboardContent);
        content.appendChild(overlay)

        const explore = document.getElementById('explore')
        const add_design_button = document.getElementById('add-design-button')
        if (explore) {
          explore.addEventListener('click', loaddesigns)
        }
        if (add_design_button) {
          add_design_button.addEventListener('click', adddesign)
        }
        swipe();
        initCartListeners();
        initProductOverlay()
        clearLoading()
      } else {
        console.log('Failed to find dashboard content in response.');
      }
    })
    .catch((err) => {
      console.error("Failed to load customer:", err);
      clearLoading();
    });
}



function confirmDelete() {
  return confirm("Are you sure you want to delete?");
}

function loadaddtocart() {
  fetch('/CustomerAddtoCart')
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const addtocartdisplay = doc.querySelector(".shopping-cart-container");
      const checkoutdisplay = doc.querySelector('.checkout-form');
      const content = document.getElementById("change-container");
      const container = doc.querySelector('.confirmation-container')

      document.getElementById("title").innerHTML = `<div>Cart</div>`;
      content.innerHTML = "";
      content.appendChild(addtocartdisplay);
      content.appendChild(checkoutdisplay)
      content.appendChild(container)
      const paymentSelect = document.getElementById('payment');
      const chargeTotal = document.getElementById('charge-total');
      const grandTotalInput = document.getElementById('grand-total');
      const cartSubtotalDisplay = document.getElementById('cart-total1');
      const seeorder = document.querySelector('.btn-primary')
      const seehome = document.querySelector('.btn-secondary')
      if (seeorder) {
        seeorder.addEventListener('click', loadorders)
      }
      if (seehome) {
        seehome.addEventListener('click', loadcustomerdashboard)
      }
      function parsePeso(pesoString) {
        return parseFloat(pesoString.replace(/[^\d.]/g, '')) || 0;
      }
      if (paymentSelect) {
        paymentSelect.addEventListener('change', function () {
          const selectedOption = paymentSelect.options[paymentSelect.selectedIndex];
          const paymentName = selectedOption.textContent.trim().toLowerCase();
          const number = selectedOption.dataset.number || '';
          const bankName = selectedOption.dataset.bankname || '';
          const name = selectedOption.dataset.name || '';

          const gcashSection = document.getElementById('gcash-details');
          const bankSection = document.getElementById('bank-details');

          gcashSection.style.display = 'none';
          bankSection.style.display = 'none';

          if (paymentName.includes('gcash')) {
            document.getElementById('gcash-number').value = number;
            document.getElementById('gcash-name').value = name;
            gcashSection.style.display = 'block';
          } else if (paymentName.includes('bank')) {
            document.getElementById('name').value = name;
            document.getElementById('bank-name').value = bankName;
            document.getElementById('number').value = number;
            bankSection.style.display = 'block';
          }
        });
      }


      function updateGrandTotal() {
        if (!paymentSelect || !paymentSelect.selectedOptions.length) return;
        const charge = parseFloat(paymentSelect.selectedOptions[0].dataset.charge) || 0;
        const subtotal = parsePeso(cartSubtotalDisplay.textContent);
        const grandTotal = subtotal + charge;
        chargeTotal.textContent = `₱${charge.toFixed(2)}`;
        grandTotalInput.value = `₱${grandTotal.toFixed(2)}`;
      }

      function updateCheckoutQuantities() {
        const quantityInputs = document.querySelectorAll('.shopping-cart-quantity-input');
        const summaryContainer = document.getElementById('checkout-items-container');

        // Clear previous displays
        summaryContainer.querySelectorAll('.order-item').forEach(item => {
          item.querySelectorAll('.quantity-size').forEach(q => q.textContent = '');
          item.querySelectorAll('.total-price').forEach(tp => tp.textContent = '');
        });

        const productTotals = {}; // Store totals to place at the end per product

        quantityInputs.forEach(input => {
          const qty = parseInt(input.value) || 0;
          const sizeLabel = input.closest('.shopping-cart-size-row').querySelector('.shopping-cart-size-label');
          const size = sizeLabel ? sizeLabel.textContent.trim() : 'default';
          const productId = input.closest('.shopping-cart-item').dataset.productid;
          const price = parseFloat(input.dataset.price) || 0;

          const qtySelector = `.order-item[data-productid="${productId}"] .quantity-size[data-size="${size}"]`;
          const qtyElement = summaryContainer.querySelector(qtySelector);

          if (qty > 0 && qtyElement) {
            qtyElement.textContent = `x${qty}`;
          }

          if (!productTotals[productId]) {
            productTotals[productId] = 0;
          }
          productTotals[productId] += qty * price;
        });

        // Add grand total to last matching .total-price element of each product
        for (const productId in productTotals) {
          const totalPriceElements = summaryContainer.querySelectorAll(`.order-item[data-productid="${productId}"] .total-price`);
          const lastTotal = totalPriceElements[totalPriceElements.length - 1];
          if (lastTotal) {
            lastTotal.textContent = `₱${productTotals[productId].toFixed(2)}`;
          }
        }
      }
      function updateTotal() {
        let total = 0;
        const quantityInputs = document.querySelectorAll('.shopping-cart-quantity-input');

        quantityInputs.forEach(input => {
          const qty = parseInt(input.value) || 0;
          const price = parseFloat(input.dataset.price) || 0;
          total += qty * price;

          const productId = input.closest('.shopping-cart-item').dataset.productId;
          const size = input.closest('.shopping-cart-size-row').querySelector('.shopping-cart-size-label')?.textContent.trim() || 'default';
          const storageKey = `cart_item_user${currentCustomerId}_${productId}_${size}`;
          localStorage.setItem(storageKey, qty.toString());
        });

        const cart_total = document.getElementById('cart-total');
        if (cart_total) {
          cart_total.textContent = `₱${total.toFixed(2)}`
        }
        document.getElementById('cart-total1').textContent = `₱${total.toFixed(2)}`;
        document.getElementById('checkout-subtotal').textContent = total.toFixed(2);
        localStorage.setItem('cart_total', total.toFixed(2));

        updateGrandTotal();
        updateCheckoutQuantities();
      }

      const validKeys = new Set();
      document.querySelectorAll('.shopping-cart-quantity-control').forEach(control => {
        const input = control.querySelector('.shopping-cart-quantity-input');
        const minus = control.querySelector('.minus');
        const plus = control.querySelector('.plus');

        const productId = input.closest('.shopping-cart-item').dataset.productId;
        const size = input.closest('.shopping-cart-size-row').querySelector('.shopping-cart-size-label')?.textContent.trim() || 'default';
        const storageKey = `cart_item_user${currentCustomerId}_${productId}_${size}`;
        validKeys.add(storageKey);

        const saved = localStorage.getItem(storageKey);
        input.value = saved !== null ? saved : "0";

        minus.addEventListener('click', e => {
          e.preventDefault();
          input.value = Math.max(0, parseInt(input.value || "0") - 1);
          updateTotal();
        });

        plus.addEventListener('click', e => {
          e.preventDefault();
          input.value = parseInt(input.value || "0") + 1;
          updateTotal();
        });

        input.addEventListener('change', updateTotal);
        input.addEventListener('input', updateTotal);
      });

      // Clean up localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`cart_item_user${currentCustomerId}_`) && !validKeys.has(key)) {
          localStorage.removeItem(key);
        }
      });

      updateTotal();
      const checkoutForm = document.querySelector('.checkout-container-layout form#checkout-form');

      if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
          // Prepare order_items JSON
          const orderItemsArray = [];
          document.querySelectorAll('.shopping-cart-item').forEach(itemDiv => {
            const productId = itemDiv.dataset.productid;
            itemDiv.querySelectorAll('.shopping-cart-quantity-input').forEach(qtyInput => {
              const qty = parseInt(qtyInput.value) || 0;
              if (qty > 0) {
                const size = qtyInput.closest('.shopping-cart-size-row').querySelector('.shopping-cart-size-label').textContent.trim();
                const price = parseFloat(qtyInput.dataset.price) || 0;

                orderItemsArray.push({
                  product_id: productId,
                  size: size,
                  quantity: qty,
                  price: price
                });
              }
            });
          });

          if (orderItemsArray.length === 0) {
            e.preventDefault();
            alert('Your cart is empty. Please add items before checking out.');
            return false;
          }

          // Set hidden input
          const orderItemsInput = document.getElementById('order-items-data');
          orderItemsInput.value = JSON.stringify(orderItemsArray);

          // Set grand total input value as number (remove peso sign)
          const grandTotalInput = document.getElementById('grand-total');
          if (grandTotalInput) {
            grandTotalInput.value = grandTotalInput.value.replace(/[^\d.]/g, '');
          }
        });
      }

      const checkoutBtn = document.getElementById('checkout-btn');
      const backcheckout = document.getElementById('cancel-btn')
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          checkoutdisplay.style.display = 'grid';
          addtocartdisplay.style.display = 'none';
          updateCheckoutQuantities();
        });
      }
      if (backcheckout) {
        backcheckout.addEventListener('click', () => {
          checkoutdisplay.style.display = 'none'
          addtocartdisplay.style.display = 'grid'
        })
      }
      if (paymentSelect) {
        paymentSelect.addEventListener('change', updateGrandTotal);
      }
      console.log('hahaha')

      const back = document.getElementById('back1')
      const back2 = document.getElementById('back')

      if (back) {
        back.addEventListener('click', loadcustomerdashboard)
      }
      if (back2) {
        back2.addEventListener('click', loadcustomerdashboard)
      }

      document.querySelectorAll(".deletecart").forEach(form => {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          loadloading
          const formData = new FormData(form);
          const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

          fetch("/deletecart", {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": csrfToken,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: formData,
          })
            .then(res => {
              if (res.ok) {
                document.body.style.overflow = "auto";
                loadaddtocart();
              } else {
                alert("Failed to accept order.");
              }
            })
            .catch(err => {

              clearLoading()
              console.error("Error:", err);
            });
        });
      });
      //
      document.querySelectorAll(".checkout").forEach(form => {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const formData = new FormData(form);
          const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

          fetch("/checkout", {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": csrfToken,
              "X-Requested-With": "XMLHttpRequest",
            },
            body: formData,
          })
            .then(res => {
              if (res.ok) {
                confirmcontainer()
              } else {
                alert("Failed to accept order.");
              }
            })
            .catch(err => {
              confirmcontainer()
              console.error("Error:", err);
            });
        });
      });
    });

}
function confirmcontainer() {
  document.body.style.overflow = "auto";
  const checkoutForm = document.querySelector('.checkout-form');
  checkoutForm.style.opacity = '0.3'; // Faded look
  checkoutForm.style.pointerEvents = 'none'; // Disables all clicks, form submission, etc.
  checkoutForm.style.userSelect = 'none'; // Optional: Prevent text selection
  checkoutForm.style.overflow = 'hidden'; // Optional: Disable scroll if form has scrollable content
  document.querySelector('.confirmation-container').style.display = 'block'
}

function sortorders() {
  const sort = document.getElementById('statusFilter').value;

  const sectionTitle = document.getElementById('section-title');
  const pendingList = document.getElementById('pendingList');
  const shipList = document.getElementById('shipList');
  const completeList = document.getElementById('completeList');

  if (sort === 'pending') {
    sectionTitle.textContent = 'Pending Orders';
    pendingList.style.display = 'block';
    shipList.style.display = 'none';
    completeList.style.display = 'none';
  } else if (sort === 'shipped') {
    sectionTitle.textContent = 'Shipped Orders';
    pendingList.style.display = 'none';
    shipList.style.display = 'block';
    completeList.style.display = 'none';
  } else if (sort === 'delivered') {
    sectionTitle.textContent = 'Delivered Orders';
    pendingList.style.display = 'none';
    shipList.style.display = 'none';
    completeList.style.display = 'block';
  }
}


function addresscheck() {
  const province = document.getElementById('province')?.value;
  const city = document.getElementById('city')?.value;
  const barangay = document.getElementById('barangay')?.value
  const purok = document.getElementById('purok')
  if (!province || province.trim() === '') {
    alert('Please fill up the Location first in Profile');
    loadprofile()
    return false;
  }
  if (!city || city.trim() === '') {
    alert('Please fill up the Location first in Profile');
    loadprofile()
    return false;
  }
  if (!barangay || barangay.trim() === '') {
    alert('Please fill up the Location first in Profile');
    loadprofile()
    return false;
  }
  if (!purok || purok.trim() === '') {
    alert('Please fill up the Location first in Profile');
    loadprofile()
    return false;
  }
  return true
}
function hotdesign() {
  fetch('/CustomerHotOrder-display')
    .then(res => res.text())
    .then((html) => {
      const parser3 = new DOMParser()
      const doc3 = parser3.parseFromString(html, "text/html")

      const designdisplay3 = doc3.querySelector(".customerhot-container1")
      const overlay = doc3.querySelector('.overlay')
      if (designdisplay3) {
        console.log('haxasdadaha')
        document.getElementById("subTitle1").innerHTML = `
                <div style="font-weight:bold">Hot Designs</div>
                <img src="{{ asset('images/sampleimg.png')}}" alt="">`
        const content3 = document.getElementById("subTitle2");
        content3.innerHTML = "";
        content3.appendChild(designdisplay3)
        content3.appendChild(overlay)
        initProductOverlay3()

        document.querySelectorAll(".hotdesigncart").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            loadloading()
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/addtocart", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  document.body.style.overflow = "auto";
                  clearLoading();
                  loaddesigns()
                } else {
                  alert("Failed to accept order.");
                }
              })
              .catch(err => {
                console.error("Error:", err);
              });
          });
        });
      } else {
        console.log('okay')
      }
    })
}

function newdesign() {
  fetch('/CustomerNewOrder-display')
    .then(res => res.text())
    .then((html) => {
      const parser1 = new DOMParser()
      const doc1 = parser1.parseFromString(html, "text/html")

      const designdisplay1 = doc1.querySelector(".customerNewOrder-container")
      const overlay = doc1.querySelector('.overlay')
      if (designdisplay1) {
        console.log('newenwenw')
        document.getElementById("subTitle1").innerHTML = `
                <div>New Design</div>
                <img src="{{ asset('images/sampleimg.png')}}" alt="">`
        const content1 = document.getElementById("subTitle2");
        content1.innerHTML = "";
        content1.appendChild(designdisplay1)
        content1.appendChild(overlay)
        initProductOverlay4()

        document.querySelectorAll(".newdesigncart").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            loadloading()
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/addtocart", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  document.body.style.overflow = "auto";
                  clearLoading();
                  loaddesigns()
                } else {
                  alert("Failed to accept order.");
                }
              })
              .catch(err => {
                console.error("Error:", err);
              });
          });
        });

      } else {
        console.log('okay')
      }
    })
}
function mydesign() {
  fetch('/CustomerMyDesignOrder-display')
    .then(res => res.text())
    .then((html) => {
      const parser2 = new DOMParser()
      const doc2 = parser2.parseFromString(html, "text/html")

      const designdisplay2 = doc2.querySelector(".customerhot-container")
      const overlay = doc2.querySelector('.overlay')
      if (designdisplay2) {
        console.log('my design daw')
        document.getElementById("subTitle1").innerHTML = `
                <div>My Design</div>
                <img src="{{ asset('images/sampleimg.png')}}" alt="">`
        const content2 = document.getElementById("subTitle2");
        content2.innerHTML = "";
        content2.appendChild(designdisplay2)
        content2.appendChild(overlay)
        initProductOverlay2()

        document.querySelectorAll(".mydesigncart").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            loadloading()
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/addtocart", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  document.body.style.overflow = "auto";
                  clearLoading();
                  loaddesigns()
                } else {
                  alert("Failed to accept order.");
                }
              })
              .catch(err => {
                console.error("Error:", err);
              });
          });
        });
      } else {
        console.log('okay')
      }
    })
}
function loaddesigns() {
  loadloading();

  fetch('/CustomerNewDesigns')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const designdisplay = doc.querySelector(".main-container");

      if (designdisplay) {
        console.log('design daw');
        document.getElementById("title").innerHTML = `<div>Designs</div>`;

        const content = document.getElementById("change-container");
        content.innerHTML = "";
        content.appendChild(designdisplay);

        // ✅ Only add listeners without immediately calling the functions
        document.getElementById("hot").addEventListener('click', hotdesign());
        document.getElementById("hot").addEventListener('click', hotdesign);
        document.getElementById("new").addEventListener('click', newdesign);
        document.getElementById("my").addEventListener('click', mydesign);
      } else {
        console.log('no design found');
      }

      clearLoading();
    })
    .catch((err) => {
      console.error("Failed to load designs:", err);
      clearLoading(); // Make sure to remove loader even on failure
    });
}

function handleButtonClick(category) {
  console.log('Button clicked:', category);

  // Remove active class from all buttons
  document.querySelectorAll('.category-container button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to clicked button
  document.getElementById(category).classList.add('active');

  document.getElementById("hot").addEventListener('click', hotdesign)
  document.getElementById("new").addEventListener('click', newdesign)
  document.getElementById("my").addEventListener('click', mydesign)

}
function loadprofile() {
  loadloading()
  fetch('/CustomerProfile')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")

      const profledisplay = doc.querySelector(".profilecontainer")
      if (profledisplay) {
        console.log('haxaha')
        document.getElementById("title").innerHTML = `
            <div>Profile</div>`
        const content = document.getElementById("change-container");
        content.innerHTML = "";
        content.appendChild(profledisplay)

        document.querySelectorAll(".location").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/location", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  alert('Update successfully!')
                  loadprofile()
                } else {
                  alert("Failed to accept order.");
                }
              })
              .catch(err => {
                console.error("Error:", err);
              });
          });
        });
        //
        document.querySelectorAll(".profileimgage").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            loadloading()
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/upload-profile", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  alert("Update Successfully!");
                  const img = document.querySelector(".profile-picture");
                  loadprofile();
                } else {
                  alert("Failed to accept order.");
                }
              })
              .catch(err => {
                clearLoading()
                console.error("Error:", err);
              });
          });
        });
        profileset()
        profilepic()
        address();
        clearLoading()
      } else {
        console.log('okay')
      }
    }).catch((err) => {
      console.error("Failed to load profile:", err);
      clearLoading(); // Make sure to remove loader even on failure
    });
}
function attachOverlayEvents() {
  const orderElements = document.querySelectorAll(".order-row");
  const overlayElements = document.querySelectorAll(".checkout-form2");

  orderElements.forEach((orderEl, index) => {
    const overlayEl = overlayElements[index];

    if (overlayEl) {
      orderEl.addEventListener("click", function () {
        overlayEl.style.display = "grid";
        orderEl.classList.add("blurred");
        orderElements.style.overflow = 'hidden'
      });

      const rejectBtn = overlayEl.querySelector(".cancel-btn2");
      if (rejectBtn) {
        rejectBtn.addEventListener("click", function () {
          overlayEl.style.display = "none";
          orderEl.classList.remove("blurred"); cancel - btn2
        });
      }
    }
  });

  document.querySelectorAll(".cancelorder").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

      fetch("/cancelorder", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
      })
        .then(res => {
          if (res.ok) {
            loadorders()
          } else {
            alert("Failed to accept order.");
          }
        })
        .catch(err => {
          confirmcontainer()
          console.error("Error:", err);
        });
    });
  });

}

function loadorders() {
  loadloading()
  fetch('/CustomerOrder-display')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const orderdisplay = doc.querySelector(".orderscont");
      if (orderdisplay) {
        console.log('haxaha');
        document.getElementById("title").innerHTML = `<div>Orders</div>`;
        const content = document.getElementById("change-container");
        content.innerHTML = "";
        content.appendChild(orderdisplay);
        document.getElementById('statusFilter').addEventListener('change', toggleOrderList);
        document.getElementById('sortOptions').addEventListener('change', sortOrders);
        attachOverlayEvents()
        clearLoading()
      } else {
        console.log('Failed to load .orderscont');
        console.log(orderdisplay);
      }
    })
    .catch((err) => {
      console.error("Failed to load orders:", err);
      clearLoading(); // Make sure to remove loader even on failure
    });
}

function profile3() {
  const inputFile = document.getElementById("input-file");
  const profilePic = document.getElementById("design-preview");

  inputFile.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}
function adddesign() {
  loadloading()
  fetch('/CustomerAddADesign-display')
    .then(res => res.text())
    .then((html) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")

      const addadesign = doc.querySelector(".completed-container")
      if (addadesign) {
        console.log('haxaha')
        document.getElementById("title").innerHTML = `
            <div>Add A Design </div>`
        const content = document.getElementById("change-container");
        content.innerHTML = "";
        content.appendChild(addadesign)
        profile3()
        clearLoading()
        document.getElementById('cancel').addEventListener('click', loadcustomerdashboard)

        document.querySelectorAll(".addadesign").forEach(form => {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            loadloading()
            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/addadesign", {
              method: "POST",
              headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
              },
              body: formData,
            })
              .then(res => {
                if (res.ok) {
                  document.body.style.overflow = "auto";
                  loaddesigns();
                } else {
                  alert("Failed to add a design.");
                }
              })
              .catch(err => {
                clearLoading()
                alert('eorrs')
                console.error("Error:", err);
              });
          });
        });
      } else {
        console.log('okay')
      }
    }).catch((err) => {
      console.error("Failed to load add a design:", err);
      clearLoading(); // Make sure to remove loader even on failure
    });
}

function profilepic() {
  const inputFile = document.getElementById("input-file");
  const profilePic = document.getElementById("profile-pic");
  const userpic = document.querySelector('.profile-picture')

  inputFile.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;
        userpic.src = e.target.result
      };
      reader.readAsDataURL(file);
    }
  });
}











document.addEventListener("DOMContentLoaded", () => {
  loadcustomerdashboard();
  document.getElementById("home").addEventListener("click", loadcustomerdashboard)
})

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("design").addEventListener("click", loaddesigns)
})

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("profile").addEventListener("click", loadprofile)
})
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cartbutton").addEventListener("click", loadaddtocart)
})
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("order").addEventListener("click", loadorders)
})
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("add").addEventListener("click", adddesign)
})
















function address() {
  const provinceSelect = document.getElementById("provinceSelect");
  const citySelect = document.getElementById("citySelect");
  const barangaySelect = document.getElementById("baranggaySelect");
  const zipcodeInput = document.getElementById("zipcode");
  const purokInput = document.getElementById("purokInput");

  const locationData = {
    "Abra": {
      cities: {
        "Bangued": ["Agtangao", "Angad", "Bangbangar", "Bañacao", "Cabuloan", "Calaba", "Cosili East",
          "Cosili West", "Dangdangla", "Lingtan", "Lipcan", "Lubong", "Macarcarmay", "Macray", "Malita",
          "Maoay", "Palao", "Patucannay", "Sagap", "San Antonio", "Santa Rosa", "Sao-atan", "Sappaac",
          "Tablac", "Zone 1 Poblacion", "Zone 2 Poblacion", "Zone 3 Poblacion", "Zone 4 Poblacion",
          "Zone 5 Poblacion", "Zone 6 Poblacion", "Zone 7 Poblacion"],

        "Boliney": ["", "Amti", "Bao-yan", "Danac East", "Danac West", "Dao-angan", "Damugas",
          "Kilong-Olao", "Poblacion"],

        "Bucay": ["Abang", "Bangbangcag", "Bangcagan", "Banglolao", "Bugbog", "Calao",
          "Dugong", "Labon", "Layugan", "Madalipay", "North Poblacion", "Pagala", "Pakiling",
          "Palaquio", "Patoc", "Quimloong", "Salnec", "San Miguel", "Siblong", "South Poblacion",
          "Tabiog"],

        "Bucloc": ["Dicligan", "Labaan", "Lamao", "Lingay"],

        "Daguioman": ["Ableg", "Cabaruyan", "Pikek", "Tui"],

        "Danglas": ["Abaquid", "Cabaruan", "Caupasan", "Danglas", "Nagaparan", "Padangitan", "Pangal"],

        "Dolores": ["Bayaan", "Cabaroan", "Calumbaya", "Cardona", "Isit", "Kimmalaba", "Libtec",
          "Lub-lubba", "Mudiit", "Namit-ingan", "Pacac", "Poblacion", "Salucag", "Talogtog",
          "Taping"],

        "La Paz": ["Benben", "Bulbulala", "Buli", "Canan", "Liguis", "Malabbaga",
          "Mudeng", "Pidipid", "Poblacion", "San Gregorio", "Toon", "Udangan"],

        "Lacub": ["Bacag", "Buneg", "Guinguinabang", "Lan-ag", "Pococ", "Poblacion"],

        "Lagangilang": ["Aguet", "Bacooc", "Balais", "Cayapa", "Dalaguisen", "Laang",
          "Lagben", "Laguiben", "Nagtipulan", "Nagtupacan", "Paganao", "Pawa", "Poblacion",
          "Presentar", "San Isidro", "Tagodtod", "Taping"],

        "Lagayan": ["Ba-i", "Collago", "Pang-ot", "Poblacion", "Pulot"],

        "Langiden": ["Baac", "Dalayap", "Mabungot", "Malapaao", "Poblacion", "Quillat",],

        "Licuan-Baay": ["Bonglo", "Bulbulala", "Cawayan", "Domenglay", "Lenneng",
          "Mapisla", "Mogao", "Nalbuan", "Poblacion", "Subagan", "Tumalip"],

        "Luba": ["Ampalioc", "Barit", "Gayaman", "Lul-luno", "Luzong", "Nagbukel-Tuquipa",
          "Poblacion", "Sabnangan"],

        "Malibcong": ["Bayabas", "Binasaran", "Buanao", "Dulao", "Duldulao", "Gacab", "Lat-ey",
          "Malibcong", "Mataragan", "Pacgued", "Taripan", "Umnap"],

        "Manabo": ["Ayyeng", "Catacdegan Nuevo", "Catacdegan Viejo", "Luzong", "San Jose Norte",
          "San Jose Sur", "San Juan Norte", "San Juan Sur", "San Ramon East", "San Ramon West",
          "Santo Tomas"],

        "Peñarrubia": ["Dumayco", "Lusuac", "Malamsit", "Namarabar", "Patiao", "Poblacion",
          "Riang", "Santa Rosa", "Tattawa"],

        "Pidigan": ["Alinaya", "Arab", "Garreta", "Immuli", "Laskig", "Monggoc", "Naguirayan",
          "Pamutic", "Pangtud", "Poblacion East", "Poblacion West", "San Diego", "Sulbec",
          "Suyo", "Yuyeng"],

        "Pilar": ["Bolbolo", "Brookside", "Dalit", "Dintan", "Gapang", "Kinabiti", "Maliplipit",
          "Nagcanasan", "Nanangduan", "Narnara", "Ocup", "Pang-ot", "Patad", "Poblacion",
          "San Juan East", "San Juan West", "South Balioag", "Tikitik", "Villavieja"],

        "Sallapadan": ["Bazar", "Bilabila", "Gangal", "Maguyepyep", "Naguilian", "Saccaang",
          "Sallapadan", "Subusob", "Ud-udiao"],

        "San Isidro": ["Dalimag", "Langbaban", "Manayday", "Pantoc", "Poblacion", "Sabtan-olo",
          "San Marcial", "Tangbao"],

        "San Juan": ["Abualan", "Ba-ug", "Badas", "Cabcaborao", "Colabaoan", "Culiong", "Daoidao",
          "Guimba", "Lam-ag", "Lumobang", "Nangobongan", "Pattaoig", "Poblacion North",
          "Poblacion South", "Quidaoen", "Sabangan"],

        "San Quintin": ["Silet", "Supi-il", "Tagaytay", "Labaan", "Palang", "Pantoc",
          "Poblacion", "Tangadan", "Villa Mercedes"],

        "Tayum": ["Bagalay", "Basbasa", "Budac", "Bumagcat", "Cabaroan", "Deet", "Gaddani",
          "Patucannay", "Pias", "Poblacion", "Velasco"],

        "Tineg": ["Velasco", "Alaoa", "Anayan", "Apao", "Belaat", "Caganayan", "Cogon", "Lanec", "Lapat-Balantay", "Naglibacan", "Poblacion"],

        "Tubo": ["Alaoa", "Anayan", "Apao", "Belaat", "Caganayan", "Cogon", "Lanec", "Lapat-Balantay", "Naglibacan", "Poblacion", "Alangtin", "Amtuagan", "Dilong", "Kili", "Poblacion", "Supo", "Tabacda", "Tiempo", "Tubtuba"],

        "Villaviciosa": ["Wayangan", "Ap-apaya", "Bol-lilising", "Cal-lao", "Lap-lapog", "Lumaba", "Poblacion", "Tamac", "Tuquib"]
      },

    },
    "Agusan del Norte": {
      cities: {
        "Buenavista": ["Abilan", "Agong ong", "Alubijid", "Guinabsan", "Lower Olave", "Macalang", "Malapong", "Malpoc", "Manapa", "Matabao",
          "Poblacion 1", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", "Poblacion 6", "Poblacion 7",
          "Poblacion 8", "Poblacion 9", "Poblacion 10", "Rizal", "Sacol", "Sangay", "Simbalan", "Talo ao"],
        "Butuan": [
          "Agao Pob. (Bgy. 3)",
          "Agusan Pequeño",
          "Ambago",
          "Amparo",
          "Ampayon",
          "Anticala",
          "Antongalon",
          "Aupagan",
          "Baan KM 3",
          "Babag",
          "Bading Pob. (Bgy. 22)",
          "Bancasi",
          "Banza",
          "Baobaoan",
          "Basag",
          "Bayanihan Pob. (Bgy. 27)",
          "Bilay",
          "Bit-os",
          "Bitan-agan",
          "Bobon",
          "Bonbon",
          "Bugabus",
          "Buhangin Pob. (Bgy. 19)",
          "Cabcabon",
          "Camayahan",
          "Baan Riverside Pob. (Bgy. 20)",
          "Datu Silongan",
          "Dankias",
          "Imadejas Pob. (Bgy. 24)",
          "Diego Silang Pob. (Bgy. 6)",
          "Doongan",
          "Dumalagan",
          "Golden Ribbon Pob. (Bgy. 2)",
          "Dagohoy Pob. (Bgy. 7)",
          "Jose Rizal Pob. (Bgy. 25)",
          "Holy Redeemer Pob. (Bgy. 23)",
          "Humabon Pob. (Bgy. 11)",
          "Kinamlutan",
          "Lapu-lapu Pob. (Bgy. 8)",
          "Lemon",
          "Leon Kilat Pob. (Bgy. 13)",
          "Libertad",
          "Limaha Pob. (Bgy. 14)",
          "Los Angeles",
          "Lumbocan",
          "Maguinda",
          "Mahay",
          "Mahogany Pob. (Bgy. 21)",
          "Maibu",
          "Mandamo",
          "Manila de Bugabus",
          "Maon Pob. (Bgy. 1)",
          "Masao",
          "Maug",
          "Port Poyohon Pob. (Bgy. 17)",
          "New Society Village Pob.",
          "Ong Yiu Pob. (Bgy. 16)",
          "Pianing",
          "Pinamanculan",
          "Rajah Soliman Pob. (Bgy. 4)",
          "San Ignacio Pob. (Bgy. 15)",
          "San Mateo",
          "San Vicente",
          "Sikatuna Pob. (Bgy. 10)",
          "Silongan Pob. (Bgy. 5)",
          "Sumilihon",
          "Tagabaca",
          "Taguibo",
          "Taligaman",
          "Tandang Sora Pob. (Bgy. 12)",
          "Tiniwisan",
          "Tungao",
          "Urduja Pob. (Bgy. 9)",
          "Villa Kananga",
          "Obrero Pob. (Bgy. 18)",
          "Bugsukan",
          "De Oro",
          "Dulag",
          "Florida",
          "Nong-nong",
          "Pagatpatan",
          "Pangabugan",
          "Salvacion",
          "Santo Niño",
          "Sumile",
          "Don Francisco",
          "Pigdaulan"
        ],
        "Cabadbaran": ["Antonio Luna", "Bay ang", "Bayabas", "Caasinan", "Cabinet", "Calamba", "Calibunan", "Comagascas", "Concepcion",
          "Del Pilar", "Katugasan", "Kauswagan", "La Union", "Mabini", "Mahaba",
          "Poblacion 1", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5",
          "Poblacion 6", "Poblacion 7", "Poblacion 8", "Poblacion 9", "Poblacion 10",
          "Poblacion 11", "Poblacion 12", "Puting Bato", "Sanghan", "Soriano", "Tolosa"
        ],
        "Carmen": ["Cahayagan", "Gosoon", "Manoligao", "Poblacion", "Rojales", "San Agustin", "Tagcatong", "Vinapor"
        ],
        "Jabonga": ["A. Beltran", "Baleguian", "Bangonay", "Bunga", "Colorado", "Cuyago", "Libas", "Magdagooc",
          "Magsaysay", "Maraiging", "Poblacion", "San Jose", "San Pablo", "San Vicente", "Santo Niño"
        ],
        "Kitcharao": ["Bangayan", "Canaway", "Crossing", "Hinimbangan", "Jaliobong", "Mahayahay", "Poblacion",
          "San Isidro", "San Roque", "Sangay", "Songkay"
        ],
        "Las Nieves": ["Ambacon", "Balungagan", "Bonifacio", "Casiklan", "Consorcia", "Durlan", "Eduardo G. Montilla",
          "Ibuan", "Katipunan", "Lingayao", "Malicato", "Maningalao", "Marcos Calo", "Mat-i", "Pinana-an",
          "Poblacion", "Rosario", "San Isidro", "San Roque", "Tinucoran"
        ],
        "Magallanes": ["Buhang", "Caloc-an", "Guiasan", "Marcos", "Poblacion", "Santo Niño", "Santo Rosario", "Taod-oy"
        ],
        "Nasipit": ["Aclan", "Amontay", "Ata-atahon", "Barangay 1", "Barangay 2", "Barangay 3",
          "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Camagong",
          "Cubi-cubi", "Culit", "Jaguimitan", "Kinabjangan", "Punta", "Santa Ana",
          "Talisay", "Triangulo"
        ],
        "Remedios T. Romualdez": ["Balangbalang", "Basilisa", "Humilog", "Panaytayon", "Poblacion",
          "Poblacion II", "San Antonio", "Tagbongabong"
        ],
        "Santiago": ["Curva", "Estanislao Morgado", "Jagupit", "La Paz", "Pangaylan IP",
          "Poblacion I", "Poblacion III", "San Isidro", "Tagbuyacan"
        ],
        "Tubay": ["Binuangan", "Cabayawa", "Dona Rosario", "Doña Telestora", "La Fraternidad",
          "Lawigan", "Poblacion 1", "Poblacion 2", "Santa Ana", "Tagmamarkay",
          "Tagpangahoy", "Tinigbasan", "Victory"
        ]
      },

    },
    "Agusan del Sur": {
      cities: {
        "Bayugan": ["Berseba", "Bucac", "Cagbas", "Calaitan", "Canayugan", "Charito",
          "Claro Cortez", "Fili", "Gamao", "Getsomane", "Grace Estate",
          "Hamogaway", "Katipunan", "Mabuhay", "Magkiangkang", "Mahayag",
          "Marcelina", "Maygatasan", "Montivesta", "Mt. Ararat", "Mt. Carmel",
          "Mt. Oliva", "New Salem", "Noli", "Osmeña", "Panaytay", "Pinagalaan",
          "Poblacion", "Sagmone", "Saguma", "Salvacion", "San Agustin",
          "San Isidro", "San Juan", "Santa Irene", "Santa Teresita", "Santo Niño",
          "Taglatawan", "Taglibas", "Tagubay", "Verdu", "Villa Undayon", "Wawa"
        ],
        "Bunawan": ["Bunawan Brook", "Consuelo", "Imelda", "Libertad", "Mambalili",
          "Nueva Era", "Poblacion", "San Andres", "San Marcos", "San Teodoro"
        ],
        "Esperanza": ["Agsabu", "Aguinaldo", "Anolingan", "Bakingking", "Balubo", "Agsabu", "Aguinaldo", "Anolingan", "Bakingking", "Balubo",
          "Bentahon", "Bunaguit", "Catmonon", "Cebulan", "Concordia",
          "Crossing Luna", "Cubo", "Dakutan", "Duangan", "Guadalupe",
          "Guibonon", "Hawilian", "Kalabuan", "Kinamaybay", "Labao",
          "Langag", "Maasin", "Mac Arthur", "Mahagcot", "Maliwanag",
          "Milagros", "Nato", "New Gingoog", "Odiong", "Oro", "Piglawigan",
          "Poblacion", "Remedios", "Salug", "San Iidro", "San Jose",
          "San Toribio", "San Vicente", "Santa Fe", "Segunda", "Sinakungan",
          "Tagabase", "Taganahaw", "Tagbalili", "Tahina", "Tandang Sora",
          "Valentina"
        ],
        "La Paz": ["Angeles", "Bataan", "Comota", "Halapitan", "Kasapa II", "Langasian", "Lydia", "Osmeñla Sr", "Panagangan", "Poblacion",
          "Sabang Adgawan", "Sagunto", "San Patricio", "Valentina", "Villa Paz"
        ],
        "Loreto": ["Binucayan", "Johnson", "Kasapa", "Katipunan", "Kauswagan", "Magaud",
          "Nueva Gracia", "Poblacion", "Sabud", "San Isidro", "San Marlano",
          "San Vicente", "Santa Teresa", "Santo Nifo", "Santo Tomas", "Violanta", "Waloe"
        ],
        "Prosperidad": ["Aurora", "Awa", "Azpetia", "La Caridad", "La Perian", "La Purisima",
          "La Suerte", "La Union", "Las Navas", "Libertad", "Los Arcos", "Lucena",
          "Mabuhay", "Magsaysay", "Mapaga", "Napo", "New Maug", "Patin ay",
          "Poblacion", "Salimbogaon", "Salvacion", "San Joaquin", "San Jose",
          "San Lorenzo", "San Martin", "San Pedro", "San Ratael", "San Roque",
          "San Salvador", "San Vicente", "Santa Irene", "Santa Maria"
        ],
        "Rosario": ["Bayugan 3", "Cabantao", "Cabawan", "Libuac", "Maligaya", "Marfil", "Novele",
          "Poblacion", "Santa Cruz", "Tagbayagan", "Wasi an"
        ],
        "San Francisco": ["Alegria", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4",
          "Barangay 5", "Bayugan 2", "Bitan agan", "Borbon", "Buenasuerte",
          "Caimpugan", "Das agan", "Ebro", "Hubang", "Karaus", "Ladgadan",
          "Lapinigan", "Lucac", "Mate", "New Visayas", "Oraca", "Pasta",
          "Pisa an", "Rizal", "San Isidro", "Santa Ana", "Tagapua"
        ],
        "San Luis": ["Anislagan", "Balit", "Baylo", "Binicalan", "Cecilia",
          "Coalicion", "Culi", "Dimasalang", "Don Alejandro", "Don Pedro", "Dona Flavia", "Doña Maxima",
          "Mahagsay", "Mahapag", "Mahayahay", "Muritula", "Nuevo Trabajo",
          "Poblacion", "Policarpo", "San Isidro", "San Pedro", "Santa Ines",
          "Santa Rita", "Santiago", "Wegguam"
        ],
        "Santa Josefa": ["Angas", "Auroa", "Awao", "Concepcion", "Pag asa", "Patrocinio",
          "Poblacion", "San Jose", "Santa Isabel", "Sayon", "Tapaz"
        ],
        "Sibagat": ["Atga", "Anahawan", "Banagbanag", "Del Rosario", "El Rio", "lihan",
          "Kauswagan", "Kioya", "Kolambugan", "Magkalape", "Magsaysay",
          "Mahayahay", "New Tubigon", "Padliay", "Perez", "Poblacion",
          "San Isidro", "San Vicente", "Santa Cruz", "Santa Maria", "Sinal",
          "Tabon tabon", "Tag uyango", "Villangit"
        ],
        "Talacogon": ["Batucan", "BuenaGracia", "Causwagan", "Culi", "Del Monte",
          "Desamparados", "La Flora", "Labnig", "Maharlika", "Marbon", "Sabang Gibung", "San Agustin", "San Isidro", "San Nicolas",
          "Zamora", "Zillovia"
        ],
        "Trento": ["Basa", "Cebolin", "Cuevas", "Kapatungan", "Langkila an", "Manat",
          "New Visayas", "Pangyan", "Poblacion", "Pulang lupa", "Salvacion",
          "San Ignacio", "San Isidro", "San Roque", "Santa Maria", "Tudela"
        ],
        "Veruela": ["Anitap", "Bacay II", "Binongan", "Caigangan", "Candiis", "Del Monte",
          "Don Mateo", "Katipunan", "La Fortuna", "Limot", "Magsaysay", "Masayan",
          "Poblacion", "Sampaguita", "San Gabriel", "Santa Cruz", "Santa Emelia",
          "Sawagan", "Sinobong", "Sisimon"
        ]
      },

    },
    "Aklan": {
      cities: {
        "Altavas": ["Cabangila", "Cabugao", "Catmon", "Dalipdip", "Ginictan", "Linayasan", "Lumaynay",
          "Lupo", "Man up", "Odiong", "Poblacion", "Quinasay an", "Talon", "Tibiao"
        ],
        "Balete": ["Aranas", "Arcangel", "Calizo", "Cortes", "Feliciano", "Fullgencio", "Guanko",
          "Morales", "Oquendo", "Poblacion"
        ],
        "Banga": ["Agbanawan", "Bacan", "Badiangan", "Cerudo", "Cupang", "Daguitan", "Daja Norte",
          "Daja Sur", "Dingle", "Jumarap", "Lapnag", "Libas", "Linabuan Sur", "Mambog",
          "Mangan", "Muguing", "Pagsanghan", "Palale", "Poblacion", "Pola", "Polocate",
          "San Isidro", "Sibalow", "Sigcay", "Taba ao", "Tabayon", "Tinapuay", "Torralba",
          "Ugsod", "Venturanza"
        ],
        "Batan": ["Ambolong", "Angas", "Bay ang", "Cabugao", "Calyang", "Camaligan", "Camanci",
          "Ipil", "Lalab", "Lupit", "Magpag ong", "Magubahay", "Mambuqulao", "Man up",
          "Mandong", "Napti", "Pallay", "Poblacion", "Songcolan", "Tabon"
        ],
        "Buruanga": ["Alagria", "Bagongbayan", "Balusbos", "Bel is", "Cabugan", "E Progreso",
          "Habana", "Katipunan", "Mayapay", "Nazaroth", "Panilongan", "Poblacion",
          "Santander", "Tag osip", "Tigum"
        ],
        "Ibajay": ["Aghago", "Agdugayan", "Antipolo", "Aparicio", "Aquino", "Aslum", "Bagacay",
          "Batuan", "Buenavista", "Bugtongbato", "Cabugao", "Capilijan", "Colongcolong",
          "Laguinbanua", "Mabusao", "Malindog", "Maloco", "Mina a", "Monlaque", "Nails",
          "Naisud", "Naligusan", "Ondoy", "Poblacion", "Polo", "Ragador", "Rivera",
          "Rizal", "San Isidro", "San Jose", "Santa Cruz", "Tagbaya", "Tul ang", "Unat",
          "Yawan"
        ],
        "Kalibo": ["Andagaw", "Bachaw Norte", "Bachaw Sur", "Briones", "Buswang New", "Buswang Old",
          "Caano", "Estancia", "Linabuan Norte", "Mabilo", "Mobo", "Nalook", "Poblacion",
          "Pook", "Tigayon", "Tinigaw"
        ],
        "Lezo": ["Agcawilan", "Bagto", "Bugasongan", "Carugdog", "Cogon", "Ibao", "Mina",
          "Poblacion", "Santa Cruz", "Santa Cruz Bigaa", "Silakat Nonok", "Tayhhawan"
        ],
        "Libacao": ["Agmailig", "Alfonso XII", "Batobato", "Bonza", "Calacablan", "Calamcan",
          "Can awan", "Casit an", "Dalagsa an", "Guadalupe", "Janlud", "Julita",
          "Luctoga", "Magugba", "Manika", "Ogsip", "Ortega", "Oyang", "Pampango",
          "Pinonoy", "Poblacion", "Rivera", "Rosal", "Sibalew"
        ],
        "Madalag": ["Alaminos", "Alas as", "Bacyang", "Balactasan", "Cabangahan", "Cabilawan",
          "Catabana", "Dit ana", "Galicia", "Guinatu an", "Logohon", "Mamba",
          "Maria Cristina", "Medina", "Mercedes", "Napnot", "Pang itan", "Paningayan",
          "Panipiason", "Poblacion", "San Jose", "Singay", "Talangban", "Talimagao",
          "Tigbawan"
        ],
        "Makato": ["Agbalogo", "Aglucay", "Alibagon", "Bagong Barrio", "Baybay", "Cabatanga",
          "Cajilo", "Callangcang", "Calimbajan", "Castillo", "Cayangwan", "Dumga",
          "Libang", "Mantiguib", "Poblacion", "Tiblawan", "Tina", "Tugas"],
        "Malay": ["Argao", "Balabag", "Balusbus", "Cabulihan", "Caticlan", "Cogon", "Cubay Norte",
          "Cubay Sur", "Dumlog", "Manoc Manoc", "Motag", "Naasug", "Nabaoy", "Napaan",
          "Poblacion", "San Viray", "Yapak"
        ],
        "Malinao": ["Banaybanay", "Biga a", "Bulabud", "Cabayugan", "Capataga", "Cogon", "Dangcalan",
          "Kinalangay Nuevo", "Kinalangay Visjo", "Lilo an", "Malandayon", "Manhanip", "Navitas",
          "Osman", "Poblacion", "Rosario", "San Dimas", "San Ramon", "San Roque", "Sipac",
          "Sugnod", "Tambuan", "Tigpalas"
        ],
        "Nabas": ["Alimbo Baybay", "Buenatortuna", "Buenasuerte", "Buenavista", "Gibon", "Habana",
          "Lasera", "Libertad", "Magallanes", "Matabana", "Nagustan", "Pawa", "Pinatuad",
          "Poblacion", "Rizal", "Solido", "Tagororoc", "Toledo", "Unidos", "Union"
        ],
        "New Washington": ["Candelaria", "Cawayan", "Dumaguit", "Fatima", "Guinbaliwan", "Jalas", "Jugas",
          "Lawa an", "Mabilo", "Mataphao", "Ochando", "Pinamuk an", "Poblacion", "Polo",
          "Puis"
        ],
        "Numancia": ["Albasan", "Aliputos", "Badio", "Bubog", "Bulwang", "Camanci Norte", "Camanci Sur",
          "Dongon East", "Dongon West", "Joyao joyao", "Laguinbanua East", "Laguinbanua West",
          "Marianos", "Navitas", "Poblacion", "Pusiw"
        ],
        "Tangalan": ["Atga", "Baybay", "Dapdap", "Dumatad", "Jawili", "Lanipga", "Napatag", "Panayakan",
          "Poblacion", "Pudiot", "Tagas", "Tamalagon", "Tamokoe"
        ]
      },

    },
    "Albay": {
      cities: {
        "Bacacay": ["Baclayon", "Banao", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5",
          "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10", "Barangay 11",
          "Barangay 12", "Barangay 13", "Barangay 14", "Barw", "Basud", "Bayandong", "Bonga", "Buang",
          "Busdac", "Cabasan", "Cagbulacao", "Cagraray", "Cajogutan", "Cawayan", "Damacan", "Gubat llawod",
          "Gubat Iraya", "Hindi", "Igang", "Langaton", "Manaot", "Mapulang Daga", "Mataas", "Misibis",
          "Nahapunan", "Namanday", "Namantao", "Napao", "Panarayon", "Pigcobohan", "Pili llawod",
          "Pili Iraya", "Pongco", "San Pablo", "San Pedro", "Sogod", "Sula", "Tambilagao", "Tambongon",
          "Tanagan", "Uson", "Vinisitahan Basud", "Vinisitahan Napao"
        ],
        "Camalig": ["Anoling", "Baligang", "Bantonan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4",
          "Barangay 5", "Barangay 6", "Barangay 7", "Banw", "Binanderahan", "Binitayan", "Bongabong",
          "Cabaghan", "Cabraran Pequeno", "Caguiba", "Calabidongan", "Comun", "Cotmon", "Del Rosario",
          "Gapo", "Gotob", "Ilawod", "Iluluan", "Libod", "Ligban", "Mabunga", "Magogon", "Manawan",
          "Maninila", "Mina", "Miti", "Palanog", "Panoypoy", "Parlaan", "Quinartilan", "Quirangay",
          "Quitinday", "Salugan", "Solong", "Sua", "Sumlang", "Tagaytay", "Tagoytoy", "Talladong",
          "Taloto", "Taplacon", "Tinago", "Tumpa"
        ],
        "Daraga": ["Alcala", "Alobo", "Anislag", "Bagumbayan", "Balinad", "Bascaran", "Banadero", "Bañag",
          "Bigao", "Binitayan", "Bongalon", "Budiao", "Burgos", "Busay", "Canarom", "Cullat", "Dela Paz",
          "Dinoronan", "Gabawan", "Gapo", "Ibaugan", "Ilawod Area Poblacion", "Inarado", "Kidaco",
          "Kilicao", "Kimantong", "Kinawitan", "Kiwalo", "Lacag", "Mabini", "Malabog", "Malobaga", "Maopi",
          "Market Area Poblacion", "Maroroy", "Matnog", "Mayon", "Mi isi", "Nabasan", "Namantao", "Pandan",
          "Ponatrancia", "Sagpon", "Salvacion", "San Ratael", "San Ramon", "San Roque", "San Vicente Grande",
          "San Vicente Pequeno", "Sipi", "Tabon tabon", "Tagas", "Tallahib", "Villahermosa"
        ],
        "Guinobatan": ["Agpay", "Balite", "Banao", "Batbat", "Binogsacan Lower", "Binogsacan Upper", "Bololo", "Bubulusan",
          "Calzada", "Catomag", "Dona Mercedes", "Doia Tomasa", "Ilawod", "Inamnan Grande", "Inamnan Pequeno",
          "Inascan", "Iraya", "Lomacao", "Maguiron", "Maipon", "Malabnig", "Malipo", "Malobago", "Maninila",
          "Mapaco", "Marcial O. Ranola", "Masarawag", "Mauraro", "Minto", "Morera", "Muladbucad Grande",
          "Muladbucad Pequeño", "Ongo", "Palanas", "Poblacion", "Pood", "Quibongbongan", "Quitago", "San Francisco",
          "San Jose", "San Ratael", "Sinungtan", "Tandarora", "Travesia"
        ],
        "Jovellar": ["Aurora Poblacion", "Bagacay", "Bautista", "Cabraran", "Calzada Poblacion", "Del Rosario", "Estrella",
          "Florista", "Mabini Poblacion", "Magsaysay Poblacion", "Mamlad", "Maogog", "Mercado Poblacion",
          "Plaza Poblacion", "Quitinday Poblacion", "Rizal Poblacion", "Salvacion", "San Iidro", "San Roque",
          "San Vicente", "Sinagaran", "Villa Paz", "White Deer Poblacion"
        ],
        "Legazpi": ["Barangay 1-Em's Barrio", "Barangay 10-Cabugao", "Barangay 11-Maoyod Poblacion",
          "Barangay 12-Tula tula", "Barangay 13-Ilawod West Poblacion", "Barangay 14-Ilawod Poblacion",
          "Barangay 15-Ilawod East Poblacion", "Barangay 16 Kawit East Washington Drive",
          "Barangay 17-Rizal Street, Ilawod", "Barangay 18-Cabaghan West", "Barangay 19 Cabaghan",
          "Barangay 2-Em's Barrio South", "Barangay 20 Cabaghan East", "Barangay 21-Binanuahan West", "Barangay 22-Binanuahan East", "Barangay 23-Imperial Court Subd.", "Barangay 24-Rizal Street", "Barangay 25-Lapu-lapu", "Barangay 26-Dinagaan", "Barangay 27-Victory Village South", "Barangay 28-Victory Village North", "Barangay 29-Sabang", "Barangay 3-Em's Barrio East", "Barangay 30-Pigcale", "Barangay 31-Centro-Baybay", "Barangay 32-San Roque", "Barangay 33-PNR-Peñaranda St.-Iraya", "Barangay 34-Oro Site-Magallanes St.", "Barangay 35-Tinago", "Barangay 36-Kapantawan", "Barangay 37-Bitano", "Barangay 38-Gogon", "Barangay 39-Bonot", "Barangay 4-Sagpon Poblacion", "Barangay 40-Cruzada", "Barangay 41-Bogtong", "Barangay 42-Rawis", "Barangay 43-Tamaoyan", "Barangay 44-Pawa", "Barangay 45-Dita", "Barangay 46-San Joaquin", "Barangay 47-Arimbay", "Barangay 48-Bagong Abre", "Barangay 49-Bigaa", "Barangay 5-Sagmin Poblacion", "Barangay 50-Padang", "Barangay 51-Buyuan", "Barangay 52-Matanag", "Barangay 53-Bonga", "Barangay 54-Mabinit", "Barangay 55-Estanza", "Barangay 56-Taysan", "Barangay 57-Dap-dap", "Barangay 58-Buragwis", "Barangay 59-Puro", "Barangay 6-Bañadero Poblacion", "Barangay 60-Lamba", "Barangay 61-Maslog", "Barangay 62-Homapon", "Barangay 63-Mariawa", "Barangay 64-Bagacay", "Barangay 65-Imalnod", "Barangay 66-Banquerohan", "Barangay 67-Bariis", "Barangay 68-San Francisco", "Barangay 69-Buenavista", "Barangay 7-Baño", "Barangay 70-Cagbacong", "Barangay 8-Bagumbayan", "Barangay 9-Pinaric"

        ],
        "Libon": ["Alongong", "Apud", "Bacolod", "Bariw", "Bonbon", "Buga", "Bulusan", "Burabod", "Caguscos", "East Carisac", "Harigue", "Libtong", "Linao", "Mabayawas", "Macabugos", "Magallang", "Malabiga", "Marayag", "Matara", "Molosbolos", "Natasan", "Niño Jesus", "Nogpo", "Pantao", "Rawis", "Sagrada Familia", "Salvacion", "Sampongan", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Pascual", "San Ramon", "San Vicente", "Santa Cruz", "Talin-talin", "Tambo", "Villa Petrona", "West Carisac", "Zone I", "Zone II", "Zone III", "Zone IV", "Zone V", "Zone VI", "Zone VII"
        ],
        "Ligao": ["Abella", "Allang", "Amtic", "Bacong", "Bagumbayan", "Balanac", "Baligang", "Barayong", "Basag", "Batang", "Bay", "Binanowan", "Binatagan", "Bobonsuran", "Bonga", "Busac", "Busay", "Cabarian", "Calzada", "Catburawan", "Cavasi", "Culliat", "Dunao", "Francia", "Guilid", "Herrera", "Layon", "Macalidong", "Mahaba", "Malama", "Maonon", "Nabonton", "Nasisi", "Oma-oma", "Palapas", "Pandan", "Paulba", "Paulog", "Pinamaniquian", "Pinit", "Ranao-ranao", "San Vicente", "Santa Cruz", "Tagpo", "Tambo", "Tandarura", "Tastas", "Tinago", "Tinampo", "Tiongson", "Tomolin", "Tuburan", "Tula-tula Grande", "Tula-tula Pequeño", "Tupas"
        ],
        "Malilipot": ["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Binitayan", "Calbayog", "Canaway", "Salvacion", "San Antonio Santicon", "San Antonio Sulong", "San Francisco", "San Isidro Ilawod", "San Isidro Iraya", "San Jose", "San Roque", "Santa Cruz", "Santa Teresa"
        ],
        "Malinao": ["Awang", "Bagatangki", "Bagumbayan", "Balading", "Balza", "Bariw", "Baybay", "Bulang", "Burabod", "Cabunturan", "Comun", "Diaro", "Estancia", "Jonop", "Labnig", "Libod", "Malolos", "Matalipni", "Ogob", "Pawa", "Payahan", "Poblacion", "Quinarabasahan", "Santa Elena", "Soa", "Sugcad", "Tagoytoy", "Tanawan", "Tuliw"
        ],
        "Manito": ["Balabagon", "Balasbas", "Bamban", "Buyo", "Cabacongan", "Cabit", "Cawayan", "Cawit", "Holugan", "It-ba", "Malobago", "Manumbalay", "Nagotgot", "Pawa", "Tinapian"
        ],
        "Oas": ["Badbad", "Badian", "Bagsa", "Bagumbayan", "Balogo", "Banao", "Bangiawon", "Bogtong", "Bongoran", "Busac", "Cadawag", "Cagmanaba", "Calaguimit", "Calpi", "Calzada", "Camagong", "Casinagan", "Centro Poblacion", "Coliat"
        ],
        "Pio Duran": ["Del Rosario", "Gumabao", "Ilaor Norte", "Ilaor Sur", "Iraya Norte", "Iraya Sur", "Manga", "Maporong", "Maramba", "Matambo", "Mayag", "Mayao", "Moroponros", "Nagas", "Obaliw-Rinas", "Pistola", "Ramay", "Rizal", "Saban", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Miguel", "San Pascual", "San Ramon", "San Vicente", "Tablon", "Talisay", "Talongog", "Tapel", "Tobgon", "Tobog"
        ],
        "Polangui": ["Agol", "Alabangpuro", "Banawan", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Basicao Coastal", "Basicao Interior", "Binodegahan", "Buenavista", "Buyo", "Caratagan", "Cuyaoyao", "Flores", "La Medalla", "Lawinon", "Macasitas", "Malapay", "Malidong", "Mamlad", "Marigondon", "Matanglad", "Nablangbulod", "Oringon", "Palapas", "Panganiran", "Rawis", "Salvacion", "Santo Cristo", "Sukip", "Tibabo"
        ],
        "Rapu-Rapu": ["Bagaobawan", "Batan", "Bilbao", "Binosawan", "Bogtong", "Buenavista", "Buhatan", "Calanaga", "Caracaran", "Carogcog", "Dap-dap", "Gaba", "Galicia", "Guadalupe", "Hamorawon", "Lagundi", "Liguan", "Linao", "Malobago", "Mananao", "Mancao", "Manila", "Masaga", "Morocborocan", "Nagcalsot", "Pagcolbon", "Poblacion", "Sagrada", "San Ramon", "Santa Barbara", "Tinocawan", "Tinopan", "Viga", "Villahermosa"
        ],
        "Santo Domingo": ["Alimsog", "Bagong San Roque", "Buhatan", "Calayucay", "Del Rosario Poblacion", "Fidel Surtida", "Lidong", "Market Site Poblacion", "Nagsiya Poblacion", "Pandayan Poblacion", "Salvacion", "San Andres", "San Fernando", "San Francisco Poblacion", "San Isidro", "San Juan Poblacion", "San Pedro Poblacion", "San Rafael Poblacion", "San Roque", "San Vicente Poblacion", "Santa Misericordia", "Santo Domingo Poblacion", "Santo Niño"
        ],
        "Tabaco": ["Agnas", "Bacolod", "Bangkiligan", "Bantayan", "Baranghawon", "Basagan", "Basud", "Bogñabong", "Bombon", "Bonot", "Buang", "Buhian", "Cabagñan", "Cobo", "Comon", "Cormidal", "Divino Rostro", "Fatima", "Guinobat", "Hacienda", "Magapo", "Mariroc", "Matagbac", "Oras", "Oson", "Panal", "Pawa", "Pinagbobong", "Quinale Cabasan", "Quinastillojan", "Rawis", "Sagurong", "Salvacion", "San Antonio", "San Carlos", "San Isidro", "San Juan", "San Lorenzo", "San Ramon", "San Roque", "San Vicente", "Santo Cristo", "Sua-Igot", "Tabiguian", "Tagas", "Tayhi", "Visita"
        ],
        "Tiwi": ["Bagumbayan", "Bariis", "Baybay", "Belen", "Biyong", "Bolo", "Cale", "Cararayan", "Coro-coro", "Dap-dap", "Gajo", "Joroan", "Libjo", "Libtong", "Matalibong", "Maynonong", "Mayong", "Misibis", "Naga", "Nagas", "Oyama", "Putsan", "San Bernardo", "Sogod", "Tigbi"]
      },

    },
    "Antique": {
      cities: {
        "Anini-y": ["Bayo Grande", "Bayo Pequeño", "Butuan", "Casay", "Casay Viejo", "Iba", "Igbarabatuan", "Igpalge", "Igtumarom", "Lisub A", "Lisub B", "Mabuyong", "Magdalena", "Nasuli C", "Nato", "Poblacion", "Sagua", "Salvacion", "San Francisco", "San Ramon", "San Roque", "Tagaytay", "Talisayan"],
        "Barbaza": ["Baghari", "Bahuyan", "Beri", "Biga-a", "Binangbang", "Binangbang Centro", "Binanu-an", "Cadiao", "Calapadan", "Capoyuan", "Cubay", "Embrangga-an", "Esparar", "Gua", "Idao", "Igpalge", "Igtunarum", "Integasan", "Ipil", "Jinalinan", "Lanas", "Langcaon", "Lisub", "Lombuyan", "Mablad", "Magtulis", "Marigne", "Mayabay", "Mayos", "Nalusdan", "Narirong", "Palma", "Poblacion", "San Antonio", "San Ramon", "Soligao", "Tabongtabong", "Tig-alaran", "Yapo"],
        "Belison": ["Borocboroc", "Buenavista", "Concepcion", "Delima", "Ipil", "Maradiona", "Mojon", "Poblacion", "Rombang", "Salvacion", "Sinaja"],
        "Bugasong": ["Anilawan", "Arangote", "Bagtason", "Camangahan", "Centro Ilawod", "Centro Ilaya", "Centro Pojo", "Cubay North", "Cubay South", "Guija", "Igbalangao", "Igsoro", "Ilaures", "Jinalinan", "Lacayon", "Maray", "Paliwan", "Pangalcagan", "Sabang East", "Sabang West", "Tagudtud North", "Tagudtud South", "Talisay", "Tica", "Tono-an", "Yapu", "Zaragoza"],
        "Caluya": ["Alegria", "Bacong", "Banago", "Bonbon", "Dawis", "Dionela", "Harigue", "Hininga-an", "Imba", "Masanag", "Poblacion", "Sabang", "Salamento", "Semirara", "Sibato", "Sibay", "Sibolo", "Tinogboc"],
        "Culasi": ["Alojipan", "Bagacay", "Balac-balac", "Batbatan Island", "Batonan Norte", "Batonan Sur", "Bita", "Bitadton Norte", "Bitadton Sur", "Buenavista", "Buhi", "Camancijan", "Caridad", "Carit-an", "Centro Norte", "Centro Poblacion", "Centro Sur", "Condes", "Esperanza", "Fe", "Flores", "Jalandoni", "Janlagasi", "Lamputong", "Lipata", "Magsaysay", "Malacañang", "Malalison Island", "Maniguin", "Naba", "Osorio", "Paningayan", "Salde", "San Antonio", "San Gregorio", "San Juan", "San Luis", "San Pascual", "San Vicente", "Simbola", "Tigbobolo", "Tinabusan", "Tomao", "Valderama"],
        "Hamtic": ["Apdo", "Asluman", "Banawon", "Bia-an", "Bongbongan I-II", "Bongbongan III", "Botbot", "Budbudan", "Buhang", "Calacja I", "Calacja II", "Calala", "Cantulan", "Caridad", "Caromangay", "Casalngan", "Dangcalan", "Del Pilar"

        ],
        "Laua-an": ["Bagongbayan", "Banban", "Bongbongan", "Cabariwan", "Cadajug", "Canituan", "Capnayan", "Casit-an", "Guiamon", "Guinbanga-an", "Guisijan", "Igtadiao", "Intao", "Jaguikican", "Jinalinan", "Lactudan", "Latazon", "Laua-an", "Liberato", "Lindero", "Liya-liya", "Loon", "Lugta", "Lupa-an", "Magyapo", "Maria", "Mauno", "Maybunga", "Necesito", "Oloc", "Omlot", "Pandanan", "Paningayan", "Pascuala", "Poblacion", "San Ramon", "Santiago", "Tibacan", "Tigunhao", "Virginia"

        ],
        "Libertad": ["Barusbus", "Bulanao", "Centro Este", "Centro Weste", "Codiong", "Cubay", "Igcagay", "Inyawan", "Lindero", "Maramig", "Pajo", "Panangkilon", "Paz", "Pucio", "San Roque", "Taboc", "Tinigbas", "Tinindugan", "Union"],
        "Pandan": ["Aracay", "Badiangan", "Bagumbayan", "Baybay", "Botbot", "Buang", "Cabugao", "Candari", "Carmen", "Centro Norte", "Centro Sur", "Dionela", "Dumrog", "Duyong", "Fragante", "Guia", "Idiacacan", "Jinalinan", "Luhod-Bayang", "Maadios", "Mag-aba", "Napuid", "Nauring", "Patria", "Perfecta", "San Andres", "San Joaquin", "Santa Ana", "Santa Cruz", "Santa Fe", "Santo Rosario", "Talisay", "Tingib", "Zaldivar"],
        "Patnongon": ["Alvañiz", "Amparo", "Apgahan", "Aureliana", "Badiangan", "Bernaldo A. Julagting", "Carit-an", "Cuyapiao", "Gella", "Igbarawan", "Igbobon", "Igburi", "La Rioja", "Mabasa", "Macarina", "Magarang", "Magsaysay", "Padang", "Pandanan", "Patlabawon", "Poblacion", "Quezon", "Salaguiawan", "Samalague", "San Rafael", "Tamayoc", "Tigbalogo", "Tobias Fornier", "Villa Crespo", "Villa Cruz", "Villa Elio", "Villa Flores", "Villa Laua-an", "Villa Sal", "Villa Salomon", "Vista Alegre"],
        "San Jose de Buenavista": ["Atabay", "Badiang", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bariri", "Bugarot", "Cansadan", "Durog", "Funda-Dalipe", "Igbonglo", "Inabasan", "Madrangca", "Magcalon", "Malaiba", "Maybato Norte", "Maybato Sur", "Mojon", "Pantao", "San Angel", "San Fernando", "San Pedro", "Supa"],
        "San Remigio": ["Agricula", "Alegria", "Aningalan", "Atabay", "Bagumbayan", "Baladjay", "Banbanan", "Barangbang", "Bawang", "Bugo", "Bulan-bulan", "Cabiawan", "Cabunga-an", "Cadolonan", "Carawisan I", "Carawisan II", "Carmelo I", "Carmelo II", "General Fullon", "General Luna", "Iguirindon", "Insubuan", "La Union", "Lapak", "Lumpatan", "Magdalena", "Maragubdub", "Nagbangi I", "Nagbangi II", "Nasuli", "Orquia", "Osorio I", "Osorio II", "Panpanan I", "Panpanan II", "Poblacion", "Ramon Magsaysay", "Rizal", "San Rafael", "Sinundolan", "Sumaray", "Trinidad", "Tubudan", "Vilvar", "Walker"],
        "Sebaste": ["Abiera", "Aguila", "Alegre", "Aras-asan", "Bacalan", "Callan", "Idio", "Nauhon", "P. Javier", "Poblacion"],
        "Sibalom": ["Alangan", "Bari", "Biga-a", "Bongbongan I", "Bongbongan II", "Bongsod", "Bontol", "Bugnay", "Bulalacao", "Cabanbanan", "Cabariuan", "Cabladan", "Cadoldolan", "Calo-oy", "Calog", "Catmon", "Catungan I", "Catungan II", "Catungan III", "Catungan IV", "Cubay-Napultan", "Cubay-Sermon", "District I", "District II", "District III", "District IV", "Egaña", "Esperanza I", "Esperanza II", "Esperanza III", "Igcococ", "Igdagmay", "Igdalaquit", "Iglanot", "Igpanolong", "Igparas", "Igsuming", "Ilabas", "Imparayan", "Inabasan", "Indag-an", "Initan", "Insarayan", "Lacaron", "Lagdo", "Lambayagan", "Luna", "Luyang", "Maasin", "Mabini", "Millamena", "Mojon", "Nagdayao", "Nazareth", "Odiong", "Olaga", "Pangpang", "Panlagangan", "Pantao", "Pasong", "Pis-anan", "Rombang", "Salvacion", "San Juan", "Sido", "Solong", "Tabongtabong", "Tig-ohot", "Tigbalua I", "Tigbalua II", "Tordesillas", "Tulatula", "Valentin Grasparil", "Villafont", "Villahermosa", "Villar"],
        "Tibiao": ["Alegre", "Amar", "Bandoja", "Castillo", "Esparagoza", "Importante", "La Paz", "Malabor", "Martinez", "Natividad", "Pitac", "Poblacion", "Salazar", "San Francisco Norte", "San Francisco Sur", "San Isidro", "Santa Ana", "Santa Justa", "Santo Rosario", "Tigbaboy", "Tuno"],
        "Tobias Fornier": ["Abaca", "Aras-asan", "Arobo", "Atabay", "Atiotes", "Bagumbayan", "Balloscas", "Balud", "Barasanan A", "Barasanan B", "Barasanan C", "Bariri", "Camandagan", "Cato-ogan", "Danawan", "Diclum", "Fatima", "Gamad", "Igbalogo", "Igbangcal-A", "Igbangcal-B", "Igbangcal-C", "Igcabuad", "Igcadac", "Igcado", "Igcalawagan", "Igcapuyas", "Igcasicad", "Igdalaguit", "Igdanlog", "Igdurarog", "Igtugas", "Lawigan", "Lindero", "Manaling", "Masayo", "Nagsubuan", "Nasuli-A", "Opsan", "Paciencia", "Poblacion Norte", "Poblacion Sur", "Portillo", "Quezon", "Salamague", "Santo Tomas", "Tacbuyan", "Tene", "Villaflor", "Ysulat"],
        "Valderrama": ["Alon", "Bakiang", "Binanogan", "Borocboroc", "Bugnay", "Buluangan I", "Buluangan II", "Bunsod", "Busog", "Cananghan", "Canipayan", "Cansilayan", "Culyat", "Iglinab", "Igmasandig", "Lublub", "Manlacbo", "Pandanan", "San Agustin", "Takas", "Tigmamale", "Ubos"]
      },

    },
    "Apayao": {
      cities: {
        "Calanasan": ["Butao", "Cadaclan", "Don Roque Ablan Sr.", "Eleazar", "Eva Puzon", "Kabugawan", "Langnao", "Lubong", "Macalino", "Naguilian", "Namaltugan", "Poblacion", "Sabangan", "Santa Elena", "Santa Filomena", "Tanglagan", "Tubang", "Tubongan"],
        "Conner": ["Allangigan", "Banban", "Buluan", "Caglayan", "Calafug", "Cupis", "Daga", "Guinaang", "Guinamgaman", "Ili", "Karikitan", "Katablangan", "Malama", "Manag", "Mawegui", "Nabuangan", "Paddaoan", "Puguin", "Ripang", "Sacpil", "Talifugo"],
        "Flora": ["Allig", "Anninipan", "Atok", "Bagutong", "Balasi", "Balluyan", "Malayugan", "Mallig", "Malubibit Norte", "Malubibit Sur", "Poblacion East", "Poblacion West", "San Jose", "Santa Maria", "Tamalunog", "Upper Atok"],
        "Kabugao": ["Badduat", "Baliwanan", "Bulu", "Cabetayan", "Dagara", "Dibagat", "Karagawan", "Kumao", "Laco", "Lenneng", "Lucab", "Luttuacan", "Madatag", "Madduang", "Magabta", "Maragat", "Musimut", "Nagbabalayan", "Poblacion", "Tuyangan", "Waga"],
        "Luna": ["Bacsay", "Cagandungan", "Calabigan", "Cangisitan", "Capagaypayan", "Dagupan", "Lappa", "Luyon", "Marag", "Poblacion", "Quirino", "Salvacion", "San Francisco", "San Gregorio", "San Isidro Norte", "San Isidro Sur", "San Sebastian", "Santa Lina", "Shalom", "Tumog", "Turod", "Zumigui"],
        "Pudtol": ["Aga", "Alem", "Amado", "Aurora", "Cabatacan", "Cacalaggan", "Capannikian", "Doña Loreta", "Emilia", "Imelda", "Lower Maton", "Lt. Balag", "Lydia", "Malibang", "Mataguisi", "Poblacion", "San Antonio", "San Jose", "San Luis", "San Mariano", "Swan", "Upper Maton"],
        "Santa Marcela": ["Barocboc", "Consuelo", "Emiliana", "Imelda", "Malekkeg", "Marcela", "Nueva", "Panay", "San Antonio", "San Carlos", "San Juan", "San Mariano", "Sipa Proper"]
      },

    },
    "Aurora": {
      cities: {
        "Baler": ["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Buhangin", "Calabuanan", "Obligacion", "Pingit", "Reserva", "Sabang", "Suclayin", "Zabali"],
        "Casiguran": ["Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bianuan", "Calabgan", "Calangcuasan", "Calantas", "Cozo", "Culat", "Dibacong", "Dibet", "Ditinagyan", "Esperanza", "Esteves", "Lual", "Marikit", "San Ildefonso", "Tabas", "Tinib"],
        "Dilasag": ["Diagyan", "Dicabasan", "Dilaguidi", "Dimaseset", "Diniog", "Esperanza", "Lawang", "Maligaya", "Manggitahan", "Masagana", "Ura"],
        "Dinalungan": ["Abuleg", "Dibaraybay", "Ditawini", "Mapalad", "Nipoo", "Paleg", "Simbahan", "Zone I", "Zone II"],
        "Dingalan": ["Aplaya", "Butas na Bato", "Cabog", "Caragsacan", "Davildavilan", "Dikapanikian", "Ibona", "Paltic", "Poblacion", "Tanawan", "Umiray"],
        "Dipaculao": ["Bayabas", "Borlongan", "Buenavista", "Calaocan", "Diamanen", "Dianed", "Diarabasin", "Dibutunan", "Dimabuno", "Dinadiawan", "Ditale", "Gupa", "Ipil", "Laboy", "Lipit", "Lobbot", "Maligaya", "Mijares", "Mucdol", "North Poblacion", "Puangi", "Salay", "Sapangkawayan", "South Poblacion", "Toytoyan"],
        "Maria Aurora": ["Alcala", "Bagtu", "Bangco", "Bannawag", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Baubo", "Bayanihan", "Bazal", "Cabituculan East", "Cabituculan West", "Cadayacan", "Debucao", "Decoliat", "Detailen", "Diaat", "Dialatman", "Diaman", "Dianawan", "Dikildit", "Dimanpudso", "Diome", "Estonilo", "Florida", "Galintuja", "Malasin", "Ponglo", "Quirino", "Ramada", "San Joaquin", "San Jose", "San Juan", "San Leonardo", "Santa Lucia", "Santo Tomas", "Suguit", "Villa Aurora", "Wenceslao"],
        "San Luis": ["Bacong", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Dibalo", "Dibayabay", "Dibut", "Dikapinisan", "Dimanayat", "Diteki", "Ditumabo", "L. Pimentel", "Nonong Senior", "Real", "San Isidro", "San Jose", "Zarah"]
      },

    },
    "Basilan": {
      cities: {
        "Akbar": ["Caddayan", "Linongan", "Lower Bato-bato", "Mangalut", "Manguso", "Paguengan", "Semut", "Upper Bato-bato", "Upper Sinangkapan"],
        "Al-Barka": ["Apil-apil", "Bato-bato", "Bohe-Piang", "Bucalao", "Cambug", "Danapah", "Guinanta", "Kailih", "Kinukutan", "Kuhon", "Kuhon Lennuh", "Linuan", "Lookbisaya", "Macalang", "Magcawa", "Sangkahan"],
        "Hadji Mohammad Ajul": ["Basakan", "Buton", "Candiis", "Langil", "Langong", "Languyan", "Pintasan", "Seronggon", "Sibago", "Sulutan Matangal", "Tuburan Proper"],
        "Hadji Muhtamad": ["Baluk-baluk", "Dasalan", "Lubukan", "Luukbongsod", "Mananggal", "Palahangan", "Panducan", "Sangbay Big", "Sangbay Small", "Tausan"],
        "Isabela": ["Aguada", "Balatanay", "Baluno", "Begang", "Binuangan", "Busay", "Cabunbata", "Calvario", "Carbon", "Diki", "Doña Ramona T. Alano", "Isabela Eastside", "Isabela Proper", "Kapatagan Grande", "Kapayawan", "Kaumpurnah Zone I", "Kaumpurnah Zone II", "Kaumpurnah Zone III", "Kumalarang", "La Piedad", "Lampinigan", "Lanote", "Lukbuton", "Lumbang", "Makiri", "Maligue", "Marang-marang", "Marketsite", "Masula", "Menzi", "Panigayan", "Panunsulan", "Port Area", "Riverside", "San Rafael", "Santa Barbara", "Santa Cruz", "Seaside", "Small Kapatagan", "Sumagdang", "Sunrise Village", "Tabiawan", "Tabuk", "Tampalan", "Timpul"],
        "Lamitan": ["Arco", "Ba-as", "Baimbing", "Balagtasan", "Balas", "Balobo", "Bato", "Baungos", "Bohebessey", "Boheibu", "Bohenange", "Bohesapa", "Boheyakan", "Boheyawas", "Buahan", "Bulanting", "Bulingan", "Cabobo", "Calugusan", "Campo Uno", "Colonia", "Danit-Puntocan", "Kulay Bato", "Lebbuh", "Limo-ok", "Lo-ok", "Luksumbang", "Lumuton", "Maganda", "Malakas", "Maligaya", "Malinis", "Malo-ong Canal", "Malo-ong San Jose", "Matatag", "Matibay", "Parangbasak", "Sabong", "Santa Clara", "Sengal", "Simbangon", "Tandong Ahas", "Tumakid", "Ubit", "Ulame"],
        "Maluso": ["Abong-Abong", "Batungal", "Calang Canas", "Fuente Maluso", "Guanan North", "Guanan South", "Limbubong", "Mahayahay Lower", "Mahayahay Upper", "Muslim Area", "Port Holland Zone I Poblacion", "Port Holland Zone II Poblacion", "Port Holland Zone III Poblacion", "Port Holland Zone IV", "Port Holland Zone V", "Taberlongan", "Tamuk", "Townsite", "Tubigan", "Upper Garlayan"],
        "Sumisip": ["Bacung", "Baiwas", "Basak", "Benembengan Lower", "Benembengan Upper", "Bohe-languyan", "Buli-buli", "Cabcaban", "Cabengbeng Lower", "Cabengbeng Upper", "Ettub-ettub", "Guiong", "Kaum-Air", "Kaumpamatsakem", "Libug", "Limbocandis", "Lukketon", "Luuk-Bait", "Mahatalang", "Manaul", "Mangal", "Marang", "Mebak", "Sahaya Bohe Bato", "Sapah Bulak", "Sumisip Central", "Tikus", "Tongsengal", "Tumahubong"],
        "Tabuan-Lasa": ["Babag", "Balanting", "Boloh-boloh", "Bukut-Umus", "Kaumpurnah", "Lanawan", "Pisak-pisak", "Saluping", "Suligan", "Sulloh", "Tambulig Buton", "Tong-Umus"],
        "Tipo-Tipo": ["Badja", "Baguindan", "Banah", "Bangcuang", "Bohe-Tambak", "Bohebaca", "Bohelebung", "Lagayas", "Limbo-Upas", "Silangkum", "Tipo-tipo Proper"],
        "Tuburan": ["Bohetambis", "Calut", "Duga-a", "Katipunan", "Lahi-lahi", "Lower Sinangkapan", "Lower Tablas", "Mahawid", "Sinulatan", "Tablas Usew"],
        "Ungkaya Pukan": ["Amaloy", "Bohe-Pahuh", "Bohe-Suyak", "Cabangalan", "Danit", "Kamamburingan", "Matata", "Materling", "Pipil", "Sungkayut", "Tongbato", "Ulitan"]
      },

    },
    "Bataan": {
      cities: {
        "Abucay": ["Bangkal", "Calaylayan", "Capitangan", "Gabon", "Laon", "Mabatang", "Omboy", "Salian", "Wawa"],
        "Bagac": ["Atilano L. Ricardo", "Bagumbayan", "Banawang", "Binuangan", "Binukawan", "Ibaba", "Ibis", "Pag-asa", "Parang", "Paysawan", "Quinawan", "San Antonio", "Saysain", "Tabing-Ilog"],
        "Balanga": ["Bagong Silang", "Bagumbayan", "Cabog-Cabog", "Camacho", "Cataning", "Central", "Cupang North", "Cupang Proper", "Cupang West", "Dangcol", "Doña Francisca", "Ibayo", "Lote", "Malabia", "Munting Batangas", "Poblacion", "Pto. Rivas Ibaba", "Pto. Rivas Itaas", "San Jose", "Sibacan", "Talisay", "Tanato", "Tenejero", "Tortugas", "Tuyo"],
        "Dinalupihan": ["Aquino", "Bangal", "Bayan-bayanan", "Bonifacio", "Burgos", "Colo", "Daang Bago", "Dalao", "Del Pilar", "Gen. Luna", "Gomez", "Happy Valley", "Jose C. Payumo, Jr.", "Kataasan", "Layac", "Luacan", "Mabini Ext.", "Mabini Proper", "Magsaysay", "Maligaya", "Naparing", "New San Jose", "Old San Jose", "Padre Dandan", "Pag-asa", "Pagalanggang", "Payangan", "Pentor", "Pinulot", "Pita", "Rizal", "Roosevelt", "Roxas", "Saguing", "San Benito", "San Isidro", "San Pablo", "San Ramon", "San Simon", "Santa Isabel", "Santo Niño", "Sapang Balas", "Torres Bugauen", "Tubo-tubo", "Tucop", "Zamora"],
        "Hermosa": ["A. Rivera", "Almacen", "Bacong", "Balsic", "Bamban", "Burgos-Soliman", "Cataning", "Culis", "Daungan", "Judge Roman Cruz Sr.", "Mabiga", "Mabuco", "Maite", "Mambog-Mandama", "Palihan", "Pandatung", "Pulo", "Saba", "Sacrifice Valley", "San Pedro", "Santo Cristo", "Sumalo", "Tipo"],
        "Limay": ["Alangan", "Duale", "Kitang 2 & Luz", "Kitang I", "Lamao", "Landing", "Poblacion", "Reformista", "Saint Francis II", "San Francisco de Asis", "Townsite", "Wawa"],
        "Mariveles": ["Alas-asin", "Alion", "Balon-Anito", "Baseco Country", "Batangas II", "Biaan", "Cabcaben", "Camaya", "Ipag", "Lucanin", "Malaya", "Maligaya", "Mt. View", "Poblacion", "San Carlos", "San Isidro", "Sisiman", "Townsite"],
        "Morong": ["Binaritan", "Mabayo", "Nagbalayong", "Poblacion", "Sabang"],
        "Orani": ["Apollo", "Bagong Paraiso", "Balut", "Bayan", "Calero", "Centro I", "Centro II", "Dona", "Kabalutan", "Kaparangan", "Maria Fe", "Masantol", "Mulawin", "Pag-asa", "Paking-Carbonero", "Palihan", "Pantalan Bago", "Pantalan Luma", "Parang Parang", "Puksuan", "Sibul", "Silahis", "Tagumpay", "Tala", "Talimundoc", "Tapulao", "Tenejero", "Tugatog", "Wawa"],
        "Orion": ["Arellano", "Bagumbayan", "Balagtas", "Balut", "Bantan", "Bilolo", "Calungusan", "Camachile", "Daang Bago", "Daang Bilolo", "Daang Pare", "General Lim", "Kapunitan", "Lati", "Lusungan", "Puting Buhangin", "Sabatan", "San Vicente", "Santa Elena", "Santo Domingo", "Villa Angeles", "Wakas", "Wawa"],
        "Pilar": ["Ala-uli", "Bagumbayan", "Balut I", "Balut II", "Bantan Munti", "Burgos", "Del Rosario", "Diwa", "Landing", "Liyang", "Nagwaling", "Panilao", "Pantingan", "Poblacion", "Rizal", "Santa Rosa", "Wakas North", "Wakas South", "Wawa"],
        "Samal": ["East Calaguiman", "East Daang Bago", "Gugo", "Ibaba", "Imelda", "Lalawigan", "Palili", "San Juan", "San Roque", "Santa Lucia", "Sapa", "Tabing Ilog", "West Calaguiman", "West Daang Bago"]
      },

    },
    "Batanes": {
      cities: {
        "Basco": ["Chanarian", "Ihubok I", "Ihubok II", "Kayhuvokan", "San Antonio", "San Joaquin"],
        "Ivana": ["Raele", "San Rafael", "Santa Lucia", "Santa Maria", "Santa Rosa"],
        "Mahatao": ["Radiwan", "Salagao", "San Vicente", "Tuhel"],
        "Sabtang": ["Hañib", "Kaumbakan", "Panatayan", "Uvoy"],
        "Uyugan": ["Chavayan", "Malakdang", "Nakanmuan", "Savidug", "Sinakan", "Sumnanga"]
      },

    },
    "Batangas": {
      cities: {
        "Agoncillo": ["Adia", "Bagong Sikat", "Balangon", "Bangin", "Banyaga", "Barigon", "Bilibinwang", "Coral na Munti", "Guitna", "Mabini", "Pamiga", "Panhulan", "Pansipit", "Poblacion", "Pook", "San Jacinto", "San Teodoro", "Santa Cruz", "Santo Tomas", "Subic Ibaba", "Subic Ilaya"],
        "Alitagtag": ["Balagbag", "Concepcion", "Concordia", "Dalipit East", "Dalipit West", "Dominador East", "Dominador West", "Munlawin Norte", "Munlawin Sur", "Muzon Primero", "Muzon Segundo", "Pinagkurusan", "Ping-as", "Poblacion East", "Poblacion West", "San Jose", "San Juan", "Santa Cruz", "Tadlac"],
        "Balayan": ["Baclaran", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Calan", "Caloocan", "Calzada", "Canda", "Carenahan", "Caybunga", "Cayponce", "Dalig", "Dao", "Dilao", "Duhatan", "Durungao", "Gimalas", "Gumamela", "Lagnas", "Lanatan", "Langgangan", "Lucban Pook", "Lucban Putol", "Magabe", "Malalay", "Munting Tubig", "Navotas", "Palikpikan", "Patugo", "Pooc", "Sambat", "Sampaga", "San Juan", "San Piro", "Santol", "Sukol", "Tactac", "Taludtud", "Tanggoy"],
        "Balete": ["Alangilan", "Calawit", "Looc", "Magapi", "Makina", "Malabanan", "Paligawan", "Palsara", "Poblacion", "Sala", "Sampalocan", "San Sebastian", "Solis"],
        "Batangas City": ["Alangilan", "Balagtas", "Balete", "Banaba Center", "Banaba Ibaba", "Banaba Kanluran", "Banaba Silangan", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14", "Barangay 15", "Barangay 16", "Barangay 17", "Barangay 18", "Barangay 19", "Barangay 2", "Barangay 20", "Barangay 21", "Barangay 22", "Barangay 23", "Barangay 24", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Bilogo", "Bolbok", "Bukal", "Calicanto", "Catandala", "Concepcion", "Conde Itaas", "Conde Labak", "Cuta", "Dalig", "Dela Paz", "Dela Paz Pulot Aplaya", "Dela Paz Pulot Itaas", "Domoclay", "Dumantay", "Gulod Itaas", "Gulod Labak", "Haligue Kanluran", "Haligue Silangan", "Ilihan", "Kumba", "Kumintang Ibaba", "Kumintang Ilaya", "Libjo", "Liponpon", "Maapas", "Mabacong", "Mahabang Dahilig", "Mahabang Parang", "Mahacot Kanluran", "Mahacot Silangan", "Malalim", "Malibayo", "Malitam", "Maruclap", "Pagkilatan", "Paharang Kanluran", "Paharang Silangan", "Pallocan Kanluran", "Pallocan Silangan", "Pinamucan", "Pinamucan Ibaba", "Pinamucan Silangan", "Sampaga", "San Agapito", "San Agustin Kanluran", "San Agustin Silangan", "San Andres", "San Antonio", "San Isidro", "San Jose Sico", "San Miguel", "San Pedro", "Santa Clara", "Santa Rita Aplaya", "Santa Rita Karsada", "Santo Domingo", "Santo Niño", "Simlong", "Sirang Lupa", "Sorosoro Ibaba", "Sorosoro Ilaya", "Sorosoro Karsada", "Tabangao Ambulong", "Tabangao Aplaya", "Tabangao Dao", "Talahib Pandayan", "Talahib Payapa", "Talumpok Kanluran", "Talumpok Silangan", "Tinga Itaas", "Tinga Labak", "Tulo", "Wawa"],
        "Bauan": ["Alagao", "Aplaya", "As-is", "Bagong Silang", "Baguilawa", "Balayong", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Bolo", "Colvo", "Cupang", "Durungao", "Gulibay", "Inicbulan", "Locloc", "Magalang-Galang", "Malindig", "Manalupong", "Manghinao Proper", "Manghinao Uno", "New Danglayan", "Orense", "Pitugo", "Rizal", "Sampaguita", "San Agustin", "San Andres Proper", "San Andres Uno", "San Diego", "San Miguel", "San Pablo", "San Pedro", "San Roque", "San Teodoro", "San Vicente", "Santa Maria", "Santo Domingo", "Sinala"
        ],
        "Calaca": ["Baclas", "Bagong Tubig", "Balimbing", "Bambang", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Bisaya", "Cahil", "Calantas", "Caluangan", "Camastilisan", "Coral ni Bacal", "Coral ni Lopez", "Dacanlao", "Dila", "Loma", "Lumbang Calzada", "Lumbang na Bata", "Lumbang na Matanda", "Madalunot", "Makina", "Matipok", "Munting Coral", "Niyugan", "Pantay", "Puting Bato East", "Puting Bato West", "Puting Kahoy", "Quisumbing", "Salong", "San Rafael", "Sinisian", "Taklang Anak", "Talisay", "Tamayo", "Timbain"
        ],
        "Calatagan": ["Bagong Silang", "Baha", "Balibago", "Balitoc", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Biga", "Bucal", "Carlosa", "Carretunan", "Encarnacion", "Gulod", "Hukay", "Lucsuhin", "Luya", "Paraiso", "Quilitisan", "Real", "Sambungan", "Santa Ana", "Talibayog", "Talisay", "Tanagan"
        ],
        "Cuenca": ["Balagbag", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Bungahan", "Calumayin", "Dalipit East", "Dalipit West", "Dita", "Don Juan", "Emmanuel", "Ibabao", "Labac", "Pinagkaisahan", "San Felipe", "San Isidro"
        ],
        "Ibaan": ["Bago", "Balanga", "Bungahan", "Calamias", "Catandala", "Coliat", "Dayapan", "Lapu-lapu", "Lucsuhin", "Mabalor", "Malainin", "Matala", "Munting-Tubig", "Palindan", "Pangao", "Panghayaan", "Poblacion", "Quilo", "Sabang", "Salaban I", "Salaban II", "San Agustin", "Sandalan", "Santo Niño", "Talaibon", "Tulay na Patpat"
        ],
        "Laurel": ["As-is", "Balakilong", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Berinayan", "Bugaan East", "Bugaan West", "Buso-buso", "Dayap Itaas", "Gulod", "J. Leviste", "Molinete", "Niyugan", "Paliparan", "San Gabriel", "San Gregorio", "Santa Maria", "Ticub"
        ],
        "Lemery": ["Anak-Dagat", "Arumahan", "Ayao-iyao", "Bagong Pook", "Bagong Sikat", "Balanga", "Bukal", "Cahilan I", "Cahilan II", "Dayapan", "District I", "District II", "District III", "District IV", "Dita", "Gulod", "Lucky", "Maguihan", "Mahabang Dahilig", "Mahayahay", "Maigsing Dahilig", "Maligaya", "Malinis", "Masalisi", "Mataas na Bayan", "Matingain I", "Matingain II", "Mayasang", "Niugan", "Nonong Casto", "Palanas", "Payapa Ibaba", "Payapa Ilaya", "Rizal", "Sambal Ibaba", "Sambal Ilaya", "San Isidro Ibaba", "San Isidro Itaas", "Sangalang", "Sinisian East", "Sinisian West", "Talaga", "Tubigan", "Tubuan", "Wawa Ibaba", "Wawa Ilaya"
        ],
        "Lian": ["Bagong Pook", "Balibago", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Binubusan", "Bungahan", "Cumba", "Humayingan", "Kapito", "Lumaniag", "Luyahan", "Malaruhatan", "Matabungkay", "Prenza", "Puting-Kahoy", "San Diego"
        ],
        "Lipa": ["Adya", "Anilao", "Anilao-Labac", "Antipolo del Norte", "Antipolo del Sur", "Bagong Pook", "Balintawak", "Banaybanay", "Barangay 12", "Bolbok", "Bugtong na Pulo", "Bulacnin", "Bulaklakan", "Calamias", "Cumba", "Dagatan", "Duhatan", "Halang", "Inosloban", "Kayumanggi", "Latag", "Lodlod", "Lumbang", "Mabini", "Malagonlong", "Malitlit", "Marauoy", "Mataas na Lupa", "Munting Pulo", "Pagolingin Bata", "Pagolingin East", "Pagolingin West", "Pangao", "Pinagkawitan", "Pinagtongulan", "Plaridel", "Poblacion Barangay 1", "Poblacion Barangay 10", "Poblacion Barangay 11", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8", "Poblacion Barangay 9", "Poblacion Barangay 9-A", "Pusil", "Quezon", "Rizal", "Sabang", "Sampaguita", "San Benito", "San Carlos", "San Celestino", "San Francisco", "San Guillermo", "San Jose", "San Lucas", "San Salvador", "San Sebastian", "Santo Niño", "Santo Toribio", "Sapac", "Sico", "Talisay", "Tambo", "Tangob", "Tanguay", "Tibig", "Tipacan"
        ],
        "Lobo": ["Apar", "Balatbat", "Balibago", "Banalo", "Biga", "Bignay", "Calo", "Calumpit", "Fabrica", "Jaybanga", "Lagadlarin", "Mabilog na Bundok", "Malabrigo", "Malalim na Sanog", "Malapad na Parang", "Masaguitsit", "Nagtalongtong", "Nagtoctoc", "Olo-olo", "Pinaghawanan", "Poblacion", "San Miguel", "San Nicolas", "Sawang", "Soloc", "Tayuman"
        ],
        "Mabini": ["Anilao East", "Anilao Proper", "Bagalangit", "Bulacan", "Calamias", "Estrella", "Gasang", "Laurel", "Ligaya", "Mainaga", "Mainit", "Majuben", "Malimatoc I", "Malimatoc II", "Nag-iba", "Pilahan", "Poblacion", "Pulang Lupa", "Pulong Anahao", "Pulong Balibaguhan", "Pulong Niogan", "Saguing", "Sampaguita", "San Francisco", "San Jose", "San Juan", "San Teodoro", "Santa Ana", "Santa Mesa", "Santo Niño", "Santo Tomas", "Solo", "Talaga East", "Talaga Proper"
        ],
        "Malvar": ["Bagong Pook", "Bilucao", "Bulihan", "Luta del Norte", "Luta del Sur", "Poblacion", "San Andres", "San Fernando", "San Gregorio", "San Isidro East", "San Juan", "San Pedro I", "San Pedro II", "San Pioquinto", "Santiago"
        ],
        "Mataasnakahoy": ["Barangay II-A", "Bayorbor", "Bubuyan", "Calingatan", "District I", "District II", "District III", "District IV", "Kinalaglagan", "Loob", "Lumang Lipa", "Manggahan", "Nangkaan", "San Sebastian", "Santol", "Upa"
        ],
        "Nasugbu": ["Aga", "Balaytigui", "Banilad", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Bilaran", "Bucana", "Bulihan", "Bunducan", "Butucan", "Calayo", "Catandaan", "Cogunan", "Dayap", "Kaylaway", "Kayrilaw", "Latag", "Looc", "Lumbangan", "Malapad na Bato", "Mataas na Pulo", "Maugat", "Munting Indan", "Natipuan", "Pantalan", "Papaya", "Putat", "Reparo", "Talangan", "Tumalim", "Utod", "Wawa"
        ],
        "Padre Garcia": ["Banaba", "Banaybanay", "Bawi", "Bukal", "Castillo", "Cawongan", "Manggas", "Maugat East", "Maugat West", "Pansol", "Payapa", "Poblacion", "Quilo-quilo North", "Quilo-quilo South", "San Felipe", "San Miguel", "Tamak", "Tangob"
        ],
        "Rosario": ["Alupay", "Antipolo", "Bagong Pook", "Balibago", "Barangay A", "Barangay B", "Barangay C", "Barangay D", "Barangay E", "Bayawang", "Baybayin", "Bulihan", "Cahigam", "Calantas", "Colongan", "Itlugan", "Leviste", "Lumbangan", "Maalas-as", "Mabato", "Mabunga", "Macalamcam A", "Macalamcam B", "Malaya", "Maligaya", "Marilag", "Masaya", "Matamis", "Mavalor", "Mayuro", "Namuco", "Namunga", "Nasi", "Natu", "Palakpak", "Pinagsibaan", "Putingkahoy", "Quilib", "Salao", "San Carlos", "San Ignacio", "San Isidro", "San Jose", "San Roque", "Santa Cruz", "Timbugan", "Tiquiwan", "Tulos"
        ],
        "San Jose": ["Balagtasin I", "Banaybanay I", "Banaybanay II", "Bigain I", "Bigain II", "Bigain South", "Calansayan", "Dagatan", "Don Luis", "Galamay-Amo", "Lalayat", "Lapolapo I", "Lapolapo II", "Lepute", "Lumil", "Mojon-Tampoy", "Natunuan", "Palanca", "Pinagtung-ulan", "Poblacion Barangay I", "Poblacion Barangay II", "Poblacion Barangay III", "Poblacion Barangay IV", "Sabang", "Salaban", "Santo Cristo", "Taysan", "Tugtug"
        ],
        "San Juan": ["Abung", "Balagbag", "Barualte", "Bataan", "Buhay na Sapa", "Bulsa", "Calicanto", "Calitcalit", "Calubcub I", "Calubcub II", "Catmon", "Coloconto", "Escribano", "Hugom", "Imelda", "Janaojanao", "Laiya-Aplaya", "Laiya-Ibabao", "Libato", "Lipahan", "Mabalanoy", "Maraykit", "Muzon", "Nagsaulay", "Palahanan I", "Palahanan II", "Palingowak", "Pinagbayanan", "Poblacion", "Poctol", "Pulangbato", "Putingbuhangin", "Quipot", "Sampiro", "Sapangan", "Sico I", "Sico II", "Subukin", "Talahiban I", "Talahiban II", "Ticalan", "Tipaz"
        ],
        "San Luis": ["Abiacao", "Bagong Tubig", "Balagtasin", "Balite", "Banoyo", "Boboy", "Bonliw", "Calumpang East", "Calumpang West", "Dulangan", "Durungao", "Locloc", "Luya", "Mahabang Parang", "Manggahan", "Muzon", "Poblacion", "San Antonio", "San Isidro", "San Jose", "San Martin", "Santa Monica", "Taliba", "Talon", "Tejero", "Tungal"
        ],
        "San Nicolas": ["Abelo", "Alas-as", "Balete", "Baluk-baluk", "Bancoro", "Bangin", "Calangay", "Hipit", "Maabud North", "Maabud South", "Munlawin", "Pansipit", "Poblacion", "Pulang-Bato", "Santo Niño", "Sinturisan", "Tagudtod", "Talang"
        ],
        "San Pascual": ["Alalum", "Antipolo", "Balimbing", "Banaba", "Bayanan", "Danglayan", "Del Pilar", "Gelerang Kawayan", "Ilat North", "Ilat South", "Kaingin", "Laurel", "Malaking Pook", "Mataas na Lupa", "Natunuan North", "Natunuan South", "Padre Castillo", "Palsahingin", "Pila", "Poblacion", "Pook ni Banal", "Pook ni Kapitan", "Resplandor", "Sambat", "San Antonio", "San Mariano", "San Mateo", "Santa Elena", "Santo Niño"
        ],
        "Santo Teresita": ["Antipolo", "Bihis", "Burol", "Calayaan", "Calumala", "Cuta East", "Cutang Cawayan", "Irukan", "Pacifico", "Poblacion I", "Poblacion II", "Poblacion III", "Saimsim", "Sampa", "Sinipian", "Tambo Ibaba", "Tambo Ilaya"
        ],
        "Santo Tomas": ["Barangay I", "Barangay II", "Barangay III", "Barangay IV", "San Agustin", "San Antonio", "San Bartolome", "San Felix", "San Fernando", "San Francisco", "San Isidro Norte", "San Isidro Sur", "San Joaquin", "San Jose", "San Juan", "San Luis", "San Miguel", "San Pablo", "San Pedro", "San Rafael", "San Roque", "San Vicente", "Santa Ana", "Santa Anastacia", "Santa Clara", "Santa Cruz", "Santa Elena", "Santa Maria", "Santa Teresita", "Santiago"
        ],
        "Taal": ["Apacay", "Balisong", "Bihis", "Bolbok", "Buli", "Butong", "Carasuche", "Cawit", "Caysasay", "Cubamba", "Cultihan", "Gahol", "Halang", "Iba", "Ilog", "Imamawo", "Ipil", "Laguile", "Latag", "Luntal", "Mahabang Lodlod", "Niogan", "Pansol", "Poblacion 1", "Poblacion 10", "Poblacion 11", "Poblacion 12", "Poblacion 13", "Poblacion 14", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", "Poblacion 6", "Poblacion 7", "Poblacion 8", "Poblacion 9", "Pook", "Seiran", "Tatlong Maria", "Tierra Alta", "Tulo"
        ],
        "Talisay": ["Aya", "Balas", "Banga", "Buco", "Caloocan", "Leynes", "Miranda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8", "Quiling", "Sampaloc", "San Guillermo", "Santa Maria", "Tranca", "Tumaway"
        ],
        "Tanauan": ["Altura Bata", "Altura Matanda", "Altura-South", "Ambulong", "Bagbag", "Bagumbayan", "Balele", "Banadero", "Banjo East", "Banjo Laurel", "Bilog-bilog", "Boot", "Cale", "Darasa", "Gonzales", "Hidalgo", "Janopol", "Janopol Oriental", "Laurel", "Luyos", "Mabini", "Malaking Pulo", "Maria Paz", "Maugat", "Montaña", "Natatas", "Pagaspas", "Pantay Bata", "Pantay Matanda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Sala", "Sambat", "San Jose", "Santol", "Santor", "Sulpoc", "Suplang", "Talaga", "Tinurik", "Trapiche", "Ulango", "Wawa"
        ],
        "Taysan": ["Bacao", "Bilogo", "Bukal", "Dagatan", "Guinhawa", "Laurel", "Mabayabas", "Mahanadiong", "Mapulo", "Mataas na Lupa", "Pag-asa", "Panghayaan", "Pinagbayanan", "Piña", "Poblacion East", "Poblacion West", "San Isidro", "San Marcelino", "Santo Niño", "Tilambo"
        ],
        "Tingloy": ["Barangay 13", "Barangay 14", "Barangay 15", "Corona", "Gamao", "Makawayan", "Marikaban", "Papaya", "Pisa", "San Isidro", "San Jose", "San Juan", "San Pedro", "Santo Tomas", "Talahib"
        ],
        "Tuy": ["Acle", "Bayudbud", "Bolboc", "Burgos", "Dalima", "Dao", "Guinhawa", "Lumbangan", "Luna", "Luntal", "Magahis", "Malibu", "Mataywanac", "Palincaro", "Putol", "Rillo", "Rizal", "Sabang", "San Jose", "Talon", "Toong", "Tuyon-tuyon"
        ]
      },

    }, "Benguet": {
      cities: {
        "Atok": ["Abiang", "Caliking", "Cattubo", "Naguey", "Paoay", "Pasdong", "Poblacion", "Topdac"
        ],
        "Bakun": ["Ampusongan", "Bagu", "Dalipey", "Gambang", "Kayapa", "Poblacion", "Sinacbat"
        ],
        "Bokod": ["Ambuclao", "Bila", "Bobok-Bisal", "Daclan", "Ekip", "Karao", "Nawal", "Pito", "Poblacion", "Tikey"
        ],
        "Buguias": ["Abatan", "Amgaleyguey", "Amlimay", "Baculongan Norte", "Baculongan Sur", "Bangao", "Buyacaoan", "Calamagan", "Catlubong", "Lengaoan", "Loo", "Natubleng", "Poblacion", "Sebang"
        ],
        "Itogon": ["Ampucao", "Dalupirip", "Gumatdang", "Loacan", "Poblacion", "Tinongdan", "Tuding", "Ucab", "Virac"
        ],
        "Kabayan": ["Adaoay", "Anchukey", "Ballay", "Bashoy", "Batan", "Duacan", "Eddet", "Gusaran", "Kabayan Barrio", "Lusod", "Pacso", "Poblacion", "Tawangan"
        ],
        "Kapangan": ["Balakbak", "Beleng-Belis", "Boklaoan", "Cayapes", "Cuba", "Datakan", "Gadang", "Gasweling", "Labueg", "Paykek", "Poblacion Central", "Pongayan", "Pudong", "Sagubo", "Taba-ao"
        ],
        "Kibungan": ["Badeo", "Lubo", "Madaymen", "Palina", "Poblacion", "Sagpat", "Tacadang"
        ],
        "La Trinidad": ["Alapang", "Alno", "Ambiong", "Bahong", "Balili", "Beckel", "Betag", "Bineng", "Cruz", "Lubas", "Pico", "Poblacion", "Puguis", "Shilan", "Tawang", "Wangal"
        ],
        "Mankayan": ["Balili", "Bedbed", "Bulalacao", "Cabiten", "Colalo", "Guinaoang", "Paco", "Palasaan", "Poblacion", "Sapid", "Tabio", "Taneg"
        ],
        "Sablan": ["Bagong", "Balluay", "Banangan", "Banengbeng", "Bayabas", "Kamog", "Pappa", "Poblacion"
        ],
        "Tuba": ["Ansagan", "Camp 3", "Camp 4", "Camp One", "Nangalisan", "Poblacion", "San Pascual", "Tabaan Norte", "Tabaan Sur", "Tadiangan", "Taloy Norte", "Taloy Sur", "Twin Peaks"
        ],
        "Tublay": ["Ambassador", "Ambongdolan", "Ba-ayan", "Basil", "Caponga", "Daclan", "Tublay Central", "Tuel"
        ]
      },

    },
    "Biliran": {
      cities: {
        "Almeria": ["Caucab", "Iyosan", "Jamorawon", "Lo-ok", "Matanga", "Pili", "Poblacion", "Pulang Bato", "Salangi", "Sampao", "Tabunan", "Talahid", "Tamarindo"
        ],
        "Biliran": ["Bato", "Burabod", "Busali", "Canila", "Hugpa", "Julita", "Pinangumhan", "San Isidro", "San Roque", "Sanggalang", "Villa Enage"
        ],
        "Caibiran": ["Balaquid", "Baso", "Bunga", "Caanibongan", "Casiawan", "Esperanza", "Langgao", "Libertad", "Looc", "Magbangon", "Pawikan", "Salawad", "Talibong"
        ],
        "Culaba": ["Acaban", "Bacolod", "Binongtoan", "Bool Central", "Bool East", "Bool West", "Calipayan", "Culaba Central", "Guindapunan", "Habuhab", "Looc", "Marvel", "Patag", "Pinamihagan", "Salvacion", "San Roque", "Virginia"
        ],
        "Kawayan": ["Baganito", "Balacson", "Balite", "Bilwang", "Bulalacao", "Burabod", "Buyo", "Inasuyan", "Kansanok", "Mada-o", "Mapuyo", "Masagaosao", "Masagongsong", "Poblacion", "San Lorenzo", "Tabunan North", "Tubig Guinoo", "Tucdao", "Ungale", "Villa Cornejo"
        ],
        "Maripipi": ["Agutay", "Banlas", "Bato", "Binalayan East", "Binalayan West", "Binongto-an", "Burabod", "Calbani", "Canduhao", "Casibang", "Danao", "Ermita", "Ol-og", "Trabugan", "Viga"
        ],
        "Naval": ["Agpangi", "Anislagan", "Atipolo", "Borac", "Cabungaan", "Calumpang", "Capiñahan", "Caraycaray", "Catmon", "Haguikhikan", "Imelda", "Larrazabal", "Libertad", "Libtong", "Lico", "Lucsoon", "Mabini", "Padre Inocentes Garcia", "Padre Sergio Eamiguel", "Sabang", "San Pablo", "Santissimo Rosario Poblacion", "Santo Niño", "Talustusan", "Villa Caneja", "Villa Consuelo"
        ]
      },

    },
    "Bohol": {
      cities: {

        "Alburquerque": ["Bahi", "Basacdacu", "Cantiguib", "Dangay", "East Poblacion", "Ponong", "San Agustin", "Santa Filomena", "Tagbuane", "Toril", "West Poblacion"
        ],
        "Alicia": ["Cabatang", "Cagongcagong", "Cambaol", "Cayacay", "Del Monte", "Katipunan", "La Hacienda", "Mahayag", "Napo", "Pagahat", "Poblacion", "Progreso", "Putlongcam", "Sudlon", "Untaga"
        ],
        "Anda": ["Almaria", "Bacong", "Badiang", "Buenasuerte", "Candabong", "Casica", "Katipunan", "Linawan", "Lundag", "Poblacion", "Santa Cruz", "Suba", "Talisay", "Tanod", "Tawid", "Virgen"
        ],
        "Antequera": ["Angilan", "Bantolinao", "Bicahan", "Bitaugan", "Bungahan", "Can-omay", "Canlaas", "Cansibuan", "Celing", "Danao", "Danicop", "Mag-aso", "Poblacion", "Quinapon-an", "Santo Rosario", "Tabuan", "Tagubaas", "Tupas", "Ubojan", "Viga", "Villa Aurora"
        ],
        "Baclayon": ["Buenaventura", "Cambanac", "Dasitam", "Guiwanon", "Landican", "Laya", "Libertad", "Montana", "Pamilacan", "Payahan", "Poblacion", "San Isidro", "San Roque", "San Vicente", "Santa Cruz", "Taguihon", "Tanday"
        ],
        "Balilihan": ["Baucan Norte", "Baucan Sur", "Boctol", "Boyog Norte", "Boyog Proper", "Boyog Sur", "Cabad", "Candasig", "Cantalid", "Cantomimbo", "Cogon", "Datag Norte", "Datag Sur", "Del Carmen Este", "Del Carmen Norte", "Del Carmen Sur", "Del Carmen Weste", "Del Rosario", "Dorol", "Haguilanan Grande", "Hanopol Este", "Hanopol Norte", "Hanopol Weste", "Magsija", "Maslog", "Sagasa", "Sal-ing", "San Isidro", "San Roque", "Santo Niño", "Tagustusan"
        ],
        "Batuan": ["Aloja", "Behind The Clouds", "Cabacnitan", "Cambacay", "Cantigdas", "Garcia", "Janlud", "Poblacion Norte", "Poblacion Sur", "Poblacion Vieja", "Quezon", "Quirino", "Rizal", "Rosariohan", "Santa Cruz", "Bilangbilangan Dako", "Bilangbilangan Diot"
        ],
        "Bien Unido": ["Hingotanan East", "Hingotanan West", "Liberty", "Malingin", "Mandawa", "Maomawan", "Nueva Esperanza", "Nueva Estrella", "Pinamgo", "Poblacion", "Puerto San Pedro", "Sagasa", "Tuboran"
        ],
        "Bilar": ["Bonifacio", "Bugang Norte", "Bugang Sur", "Cabacnitan", "Cambigsi", "Campagao", "Cansumbol", "Dagohoy", "Owac", "Poblacion", "Quezon", "Riverside", "Rizal", "Roxas", "Subayon", "Villa Aurora", "Villa Suerte", "Yanaya", "Zamora"
        ],
        "Buenavista": ["Anonang", "Asinan", "Bago", "Baluarte", "Bantuan", "Bato", "Bonotbonot", "Bugaong", "Cambuhat", "Cambus-oc", "Cangawa", "Cantomugcad", "Cantores", "Cantuba", "Catigbian", "Cawag", "Cruz", "Dait", "Eastern Cabul-an", "Hunan", "Lapacan Norte", "Lapacan Sur", "Lubang", "Lusong", "Magkaya", "Merryland", "Nueva Granada", "Nueva Montana", "Overland", "Panghagban", "Poblacion", "Puting Bato", "Rufo Hill", "Sweetland", "Western Cabul-an"
        ],
        "Calape": ["Abucayan Norte", "Abucayan Sur", "Banlasan", "Bentig", "Binogawan", "Bonbon", "Cabayugan", "Cabudburan", "Calunasan", "Camias", "Canguha", "Catmonan", "Desamparados", "Kahayag", "Kinabag-an", "Labuon", "Lawis", "Liboron", "Lo-oc", "Lomboy", "Lucob", "Madangog", "Magtongtong", "Mandaug", "Mantatao", "Sampoangon", "San Isidro", "Santa Cruz", "Sojoton", "Talisay", "Tinibgan", "Tultugan", "Ulbujan"
        ],
        "Candijay": ["Abihilan", "Anoling", "Boyo-an", "Cadapdapan", "Cambane", "Can-olin", "Canawa", "Cogtong", "La Union", "Luan", "Lungsoda-an", "Mahangin", "Pagahat", "Panadtaran", "Panas", "Poblacion", "San Isidro", "Tambongan", "Tawid", "Tubod", "Tugas"
        ],
        "Catigbian": ["Alegria", "Ambuan", "Baang", "Bagtic", "Bongbong", "Cambailan", "Candumayao", "Causwagan Norte", "Hagbuaya", "Haguilanan", "Kang-iras", "Libertad Sur", "Liboron", "Mahayag Norte", "Mahayag Sur", "Maitum", "Mantasida", "Poblacion", "Poblacion Weste", "Rizal", "Sinakayanan", "Triple Union"
        ],
        "Carmen": ["Alegria", "Bicao", "Buenavista", "Buenos Aires", "Calatrava", "El Progreso", "El Salvador", "Guadalupe", "Katipunan", "La Libertad", "La Paz", "La Salvacion", "La Victoria", "Matin-ao", "Montehermoso", "Montesuerte", "Montesunting", "Montevideo", "Nueva Fuerza", "Nueva Vida Este", "Nueva Vida Norte", "Nueva Vida Sur", "Poblacion Norte", "Poblacion Sur", "Tambo-an", "Vallehermoso", "Villaflor", "Villafuerte", "Villarcayo"
        ],
        "Clarin": ["Bacani", "Bogtongbod", "Bonbon", "Bontud", "Buacao", "Buangan", "Cabog", "Caboy", "Caluwasan", "Candajec", "Cantoyoc", "Comaang", "Danahao", "Katipunan", "Lajog", "Mataub", "Nahawan", "Poblacion Centro", "Poblacion Norte", "Poblacion Sur", "Tangaran", "Tontunan", "Tubod", "Villaflor"
        ],
        "Corella": ["Anislag", "Canangca-an", "Canapnapan", "Cancatac", "Pandol", "Poblacion", "Sambog", "Tanday"
        ],
        "Cortes": ["De la Paz", "Fatima", "Loreto", "Lourdes", "Malayo Norte", "Malayo Sur", "Monserrat", "New Lourdes", "Patrocinio", "Poblacion", "Rosario", "Salvador", "San Roque", "Upper de la Paz"
        ],
        "Dagohoy": ["Babag", "Cagawasan", "Cagawitan", "Caluasan", "Can-oling", "Candelaria", "Estaca", "La Esperanza", "Mahayag", "Malitbog", "Poblacion", "San Miguel", "San Vicente", "Santa Cruz", "Villa Aurora"
        ],
        "Danao": ["Cabatuan", "Cantubod", "Carbon", "Concepcion", "Dagohoy", "Hibale", "Magtangtang", "Nahud", "Poblacion", "Remedios", "San Carlos", "San Miguel", "Santa Fe", "Santo Niño", "Tabok", "Taming", "Villa Anunciado"
        ],
        "Dauis": ["Biking", "Bingag", "Catarman", "Dao", "Mariveles", "Mayacabac", "Poblacion", "San Isidro", "Songculan", "Tabalong", "Tinago", "Totolan"],
        "Dimiao": ["Abihid, Alemania, Baguhan, Bakilid, Balbalan, Banban, Bauhugan, Bilisan, Cabagakian, Cabanbanan, Cadap-agan, Cambacol, Cambayaon, Canhayupon, Canlambong, Casingan, Catugasan, Datag, Guindaguitan, Guingoyuran, Ile, Lapsaon, Limokon Ilaod, Limokon Ilaya, Luyo, Malijao, Oac, Pagsa, Pangihawan, Puangyuta, Sawang, Tangohay, Taongon Cabatuan, Taongon Can-andam, Tawid Bitaog"],
        "Duero": ["Alejawan", "Angilan", "Anibongan", "Bangwalog", "Cansuhay", "Danao", "Duay", "Guinsularan", "Imelda", "Itum", "Langkis", "Lobogon", "Madua Norte", "Madua Sur", "Mambool", "Mawi", "Payao", "San Antonio", "San Isidro", "San Pedro", "Taytay"],
        "Garcia Hernandez": ["Abijilan", "Antipolo", "Basiao", "Cagwang", "Calma", "Cambuyo", "Canayaon East", "Canayaon West", "Candanas", "Candulao", "Catmon", "Cayam", "Cupa", "Datag", "Estaca", "Libertad", "Lungsodaan East", "Lungsodaan West", "Malinao", "Manaba", "Pasong", "Poblacion East", "Poblacion West", "Sacaon", "Sampong", "Tabuan", "Togbongon", "Ulbujan East", "Ulbujan West", "Victoria"],
        "Getafe": ["Alumar", "Banacon", "Buyog", "Cabasakan", "Campao Occidental", "Campao Oriental", "Cangmundo", "Carlos P. Garcia", "Corte Baud", "Handumon", "Jagoliao", "Jandayan Norte", "Jandayan Sur", "Mahanay", "Nasingin", "Pandanon", "Poblacion", "Saguise", "Salog", "San Jose", "Santo Niño", "Taytay", "Tugas", "Tulang"],
        "Guindulman": ["Basdio", "Bato", "Bayong", "Biabas", "Bulawan", "Cabantian", "Canhaway", "Cansiwang", "Casbu", "Catungawan Norte", "Catungawan Sur", "Guinacot", "Guio-ang", "Lombog", "Mayuga", "Sawang", "Tabajan", "Tabunok", "Trinidad"],
        "Inabanga": ["Anonang", "Badiang", "Baguhan", "Bahan", "Banahao", "Baogo", "Bugang", "Cagawasan", "Cagayan", "Cambitoon", "Canlinte", "Cawayan", "Cogon", "Cuaming", "Dagnawan", "Dagohoy", "Dait Sur", "Datag", "Fatima", "Hambongan", "Ilaud", "Ilaya", "Ilihan", "Lapacan Norte", "Lapacan Sur", "Lawis", "Liloan Norte", "Liloan Sur", "Lomboy", "Lonoy Cainsican", "Lonoy Roma", "Lutao", "Luyo", "Mabuhay", "Maria Rosario", "Nabuad", "Napo", "Ondol", "Poblacion", "Riverside", "Saa", "San Isidro", "San Jose", "Santo Niño", "Santo Rosario", "Sua", "Tambook", "Tungod", "U-og", "Ubujan"],
        "Jagna": ["Alejawan", "Balili", "Boctol", "Bunga Ilaya", "Bunga Mar", "Buyog", "Cabunga-an", "Calabacita", "Cambugason", "Can-ipol", "Can-uba", "Can-upao", "Canjulao", "Cantagay", "Cantuyoc", "Faraon", "Ipil", "Kinagbaan", "Laca", "Larapan", "Lonoy", "Looc", "Malbog", "Mayana", "Naatang", "Nausok", "Odiong", "Pagina", "Pangdan", "Poblacion", "Tejero", "Tubod Mar", "Tubod Monte"],
        "Lila": ["Banban", "Bonkokan Ilaya", "Bonkokan Ubos", "Calvario", "Candulang", "Catugasan", "Cayupo", "Cogon", "Jambawan", "La Fortuna", "Lomanoy", "Macalingan", "Malinao East", "Malinao West", "Nagsulay", "Poblacion", "Taug", "Tiguis"],
        "Loay": ["Agape", "Alegria Norte", "Alegria Sur", "Bonbon", "Botoc Occidental", "Botoc Oriental", "Calvario", "Concepcion", "Hinawanan", "Las Salinas Norte", "Las Salinas Sur", "Palo", "Poblacion Ibabao", "Poblacion Ubos", "Sagnap", "Tambangan", "Tangcasan Norte", "Tangcasan Sur", "Tayong Occidental", "Tayong Oriental", "Tocdog Dacu", "Tocdog Ilaya", "Villalimpia", "Yanangan"],
        "Loboc": ["Agape", "Alegria", "Bagumbayan", "Bahian", "Bonbon Lower", "Bonbon Upper", "Buenavista", "Bugho", "Cabadiangan", "Calunasan Norte", "Calunasan Sur", "Camayaan", "Cambance", "Candabong", "Candasag", "Canlasid", "Gon-ob", "Gotozon", "Jimilian", "Oy", "Poblacion Ondol", "Poblacion Sawang", "Quinoguitan", "Taytay", "Tigbao", "Ugpong", "Valladolid", "Villaflor"],
        "Loon": ["Agsoso", "Badbad Occidental", "Badbad Oriental", "Bagacay Katipunan", "Bagacay Kawayan", "Bagacay Saong", "Bahi", "Basac", "Basdacu", "Basdio", "Biasong", "Bongco", "Bugho", "Cabacongan", "Cabadug", "Cabug", "Calayugan Norte", "Calayugan Sur", "Cambaquiz", "Campatud", "Candaigan", "Canhangdon Occidental", "Canhangdon Oriental", "Canigaan", "Canmaag", "Canmanoc", "Cansuagwit", "Cansubayon", "Cantam-is Bago", "Cantam-is Baslay", "Cantaongon", "Cantumocad", "Catagbacan Handig", "Catagbacan Norte", "Catagbacan Sur", "Cogon Norte", "Cogon Sur", "Cuasi", "Genomoan", "Lintuan", "Looc", "Mocpoc Norte", "Mocpoc Sur", "Moto Norte", "Moto Sur", "Nagtuang", "Napo", "Nueva Vida", "Panangquilon", "Pantudlan", "Pig-ot", "Pondol", "Quinobcoban", "Sondol", "Song-on", "Talisay", "Tan-awan", "Tangnan", "Taytay", "Ticugan", "Tiwi", "Tontonan", "Tubodacu", "Tubodio", "Tubuan", "Ubayon", "Ubojan"
        ],
        "Mabini": ["Abaca", "Abad Santos", "Aguipo", "Baybayon", "Bulawan", "Cabidian", "Cawayanan", "Concepcion", "Del Mar", "Lungsoda-an", "Marcelo", "Minol", "Paraiso", "Poblacion I", "Poblacion II", "San Isidro", "San Jose", "San Rafael", "San Roque", "Tambo", "Tangkigan", "Valaga"
        ],
        "Maribojoc": ["Agahay", "Aliguay", "Anislag", "Bayacabac", "Bood", "Busao", "Cabawan", "Candavid", "Dipatlong", "Guiwanon", "Jandig", "Lagtangon", "Lincod", "Pagnitoan", "Poblacion", "Punsod", "Punta Cruz", "San Isidro", "San Roque", "San Vicente", "Tinibgan", "Toril"
        ],
        "Panglao": ["Bil-isan", "Bolod", "Danao", "Doljo", "Libaong", "Looc", "Lourdes", "Poblacion", "Tangnan", "Tawala"
        ],
        "Pilar": ["Aurora", "Bagacay", "Bagumbayan", "Bayong", "Buenasuerte", "Cagawasan", "Cansungay", "Catagda-an", "Del Pilar", "Estaca", "Ilaud", "Inaghuban", "La Suerte", "Lumbay", "Lundag", "Pamacsalan", "Poblacion", "Rizal", "San Carlos", "San Isidro", "San Vicente"
        ],
        "President Carlos P. Garcia": ["Aguining", "Basiao", "Baud", "Bayog", "Bogo", "Bonbonon", "Butan", "Campamanog", "Canmangao", "Gaus", "Kabangkalan", "Lapinig", "Lipata", "Poblacion", "Popoo", "Saguise", "San Jose", "San Vicente", "Santo Rosario", "Tilmobo", "Tugas", "Tugnao", "Villa Milagrosa"
        ],
        "Sagbayan": ["Calangahan", "Canmano", "Canmaya Centro", "Canmaya Diot", "Dagnawan", "Kabasacan", "Kagawasan", "Katipunan", "Langtad", "Libertad Norte", "Libertad Sur", "Mantalongon", "Poblacion", "Sagbayan Sur", "San Agustin", "San Antonio", "San Isidro", "San Ramon", "San Roque", "San Vicente Norte", "San Vicente Sur", "Santa Catalina", "Santa Cruz", "Ubojan"
        ],
        "San Isidro": ["Abehilan", "Baryong Daan", "Baunos", "Cabanugan", "Caimbang", "Cambansag", "Candungao", "Cansague Norte", "Cansague Sur", "Causwagan Sur", "Masonoy", "Poblacion"
        ],
        "San Miguel": ["Bayongan", "Bugang", "Cabangahan", "Caluasan", "Camanaga", "Cambangay Norte", "Capayas", "Corazon", "Garcia", "Hagbuyo", "Kagawasan", "Mahayag", "Poblacion", "San Isidro", "San Jose", "San Vicente", "Santo Niño", "Tomoc"
        ],
        "Sevilla": ["Bayawahan", "Cabancalan", "Calinga-an", "Calinginan Norte", "Calinginan Sur", "Cambagui", "Ewon", "Guinob-an", "Lagtangan", "Licolico", "Lobgob", "Magsaysay", "Poblacion"
        ],
        "Sierra Bullones": ["Abachanan", "Anibongan", "Bugsoc", "Cahayag", "Canlangit", "Canta-ub", "Casilay", "Danicop", "Dusita", "La Union", "Lataban", "Magsaysay", "Man-od", "Matin-ao", "Poblacion", "Salvador", "San Agustin", "San Isidro", "San Jose", "San Juan", "Santa Cruz", "Villa Garcia"
        ],
        "Sikatuna": ["Abucay Norte", "Abucay Sur", "Badiang", "Bahaybahay", "Cambuac Norte", "Cambuac Sur", "Canagong", "Libjo", "Poblacion I", "Poblacion II"
        ],
        "Tagbilaran": ["Bool", "Booy", "Cabawan", "Cogon", "Dampas", "Dao", "Manga", "Mansasa", "Poblacion I", "Poblacion II", "Poblacion III", "San Isidro", "Taloto", "Tiptip", "Ubujan"
        ],
        "Talibon": ["Bagacay", "Balintawak", "Burgos", "Busalian", "Calituban", "Cataban", "Guindacpan", "Magsaysay", "Mahanay", "Nocnocan", "Poblacion", "Rizal", "Sag", "San Agustin", "San Carlos", "San Francisco", "San Isidro", "San Jose", "San Pedro", "San Roque", "Santo Niño", "Sikatuna", "Suba", "Tanghaligue", "Zamora"
        ],
        "Trinidad": ["Banlasan", "Bongbong", "Catoogan", "Guinobatan", "Hinlayagan Ilaud", "Hinlayagan Ilaya", "Kauswagan", "Kinan-oan", "La Union", "La Victoria", "Mabuhay Cabigohan", "Mahagbu", "Manuel M. Roxas", "Poblacion", "San Isidro", "San Vicente", "Santo Tomas", "Soom", "Tagum Norte", "Tagum Sur"
        ],
        "Tubigon": ["Bagongbanwa", "Banlasan", "Batasan", "Bilangbilangan", "Bosongon", "Buenos Aires", "Bunacan", "Cabulihan", "Cahayag", "Cawayanan", "Centro", "Genonocan", "Guiwanon", "Ilihan Norte", "Ilihan Sur", "Libertad", "Macaas", "Matabao", "Mocaboc Island", "Panadtaran", "Panaytayon", "Pandan", "Pangapasan", "Pinayagan Norte", "Pinayagan Sur", "Pooc Occidental", "Pooc Oriental", "Potohan", "Talenceras", "Tan-awan", "Tinangnan", "Ubay Island", "Ubojan", "Villanueva"
        ],
        "Ubay": ["Achila", "Bay-ang", "Benliw", "Biabas", "Bongbong", "Bood", "Buenavista", "Bulilis", "Cagting", "Calanggaman", "California", "Camali-an", "Camambugan", "Casate", "Cuya", "Fatima", "Gabi", "Governor Boyles", "Guintabo-an", "Hambabauran", "Humayhumay", "Ilihan", "Imelda", "Juagdan", "Katarungan", "Lomangog", "Los Angeles", "Pag-asa", "Pangpang", "Poblacion", "San Francisco", "San Isidro", "San Pascual", "San Vicente", "Sentinila", "Sinandigan", "Tapal", "Tapon", "Tintinan", "Tipolo", "Tubog", "Tuboran", "Union", "Villa Teresita"
        ],
        "Valencia": ["Adlawan", "Anas", "Anonang", "Anoyon", "Balingasao", "Banderahan", "Botong", "Buyog", "Canduao Occidental", "Canduao Oriental", "Canlusong", "Canmanico", "Cansibao", "Catug-a", "Cutcutan", "Danao", "Genoveva", "Ginopolan", "La Victoria", "Lantang", "Limocon", "Loctob", "Magsaysay", "Marawis", "Maubo", "Nailo", "Omjon", "Pangi-an", "Poblacion Occidental", "Poblacion Oriental", "Simang", "Taug", "Tausion", "Taytay", "Ticum"
        ]
      },

    }, "Bukidnon": {
      cities: {
        "Balingoan": [],
        "Baungon": ["Balintad",
          "Buenavista",
          "Danatag",
          "Imbatug",
          "Kalilangan",
          "Lacolac",
          "Langaon",
          "Liboran",
          "Lingating",
          "Mabuhay",
          "Mabunga",
          "Nicdao",
          "Pualas",
          "Salimbalan",
          "San Miguel",
          "San Vicente",
        ],
        "Cabanglasan": ["Anlogan",
          "Cabulohan",
          "Canangaan",
          "Capinonan",
          "Dalacutan",
          "Freedom",
          "Iba",
          "Imbatug",
          "Jasaan",
          "Lambangan",
          "Mandahikan",
          "Mandaing",
          "Mauswagon",
          "Paradise",
          "Poblacion",
        ],
        "Damulog": ["Aludas",
          "Angga-an",
          "Kinapat",
          "Kiraon",
          "Kitingting",
          "Lagandang",
          "Macapari",
          "Maican",
          "Migcawayan",
          "New Compostela",
          "Old Damulog",
          "Omonay",
          "Poblacion",
          "Pocopoco",
          "Sampagar",
          "San Isidro",
          "Tangkulan",
        ],
        "Dangcagan": ["Barongcot",
          "Bugwak",
          "Dolorosa",
          "Kapalaran",
          "Kianggat",
          "Lourdes",
          "Macarthur",
          "Miaray",
          "Migcuya",
          "New Visayas",
          "Osmeña",
          "Poblacion",
          "Sagbayan",
          "San Vicente",
        ],
        "Don Carlos": ["Bismartz",
          "Bocboc",
          "Buyot",
          "Cabadiangan",
          "Calaocalao",
          "Don Carlos Norte",
          "Don Carlos Sur",
          "Embayao",
          "Kalubihon",
          "Kasigkot",
          "Kawilihan",
          "Kiara",
          "Kibatang",
          "Mahayahay",
          "Manlamonay",
          "Maraymaray",
          "Mauswagon",
          "Minsalagan",
          "New Nongnongan",
          "New Visayas",
          "Old Nongnongan",
          "Pinamaloy",
          "Pualas",
          "San Antonio East",
          "San Antonio West",
          "San Francisco",
          "San Nicolas",
          "San Roque",
          "Sinangguyan",
        ],
        "Impasug-ong": ["Bontongon",
          "Bulonay",
          "Capitan Bayong",
          "Cawayan",
          "Dumalaguing",
          "Guihean",
          "Hagpa",
          "Impalutao",
          "Kalabugao",
          "Kibenton",
          "La Fortuna",
          "Poblacion",
          "Sayawan",
        ],
        "Kadingilan": ["Bagongbayan",
          "Bagor",
          "Balaoro",
          "Baroy",
          "Cabadiangan",
          "Husayan",
          "Kibalagon",
          "Kibogtok",
          "Mabuhay",
          "Malinao",
          "Matampay",
          "Pay-as",
          "Pinamanguhan",
          "Poblacion",
          "Salvacion",
          "San Andres",
          "Sibonga",
        ],
        "Kalilangan": ["Baborawon",
          "Bangbang",
          "Canituan",
          "Kibaning",
          "Kinura",
          "Lampanusan",
          "Maca-opao",
          "Malinao",
          "Ninoy Aquino",
          "Pamotolon",
          "Poblacion",
          "Public",
          "San Vicente Ferrer",
          "West Poblacion",
        ],
        "Kibawe": ["Balintawak",
          "Bukang Liwayway",
          "Cagawasan",
          "East Kibawe",
          "Gutapol",
          "Kiorao",
          "Kisawa",
          "Labuagon",
          "Magsaysay",
          "Marapangi",
          "Mascariñas",
          "Natulongan",
          "New Kidapawan",
          "Old Kibawe",
          "Palma",
          "Pinamula",
          "Romagooc",
          "Sampaguita",
          "Sanipon",
          "Spring",
          "Talahiron",
          "Tumaras",
          "West Kibawe",
        ],
        "Kitaotao": ["Balangigay",
          "Balukbukan",
          "Bershiba",
          "Binoongan",
          "Bobong",
          "Bolocaon",
          "Cabalantian",
          "Calapaton",
          "Digongan",
          "East Dalurong",
          "Kahusayan",
          "Kalumihan",
          "Kauyonan",
          "Kimolong",
          "Kipilas",
          "Kitaihon",
          "Kitobo",
          "Kiulom",
          "Magsaysay",
          "Malobalo",
          "Metebagao",
          "Napalico",
          "Pagan",
          "Panganan",
          "Poblacion",
          "Sagundanon",
          "San Isidro",
          "San Lorenzo",
          "Santo Rosario",
          "Sinaysayan",
          "Sinuda",
          "Tandong",
          "Tawas",
          "West Dalurong",
          "White Kulaman",
        ],
        "Lantapan": ["Alanib",
          "Baclayon",
          "Balila",
          "Bantuanon",
          "Basak",
          "Bugcaon",
          "Capitan Juan",
          "Cawayan",
          "Ka-atoan",
          "Kibangay",
          "Kulasihan",
          "Poblacion",
          "Songco",
          "Victory",
        ],
        "Libona": ["Capihan",
          "Crossing",
          "Gango",
          "Kiliog",
          "Kinawe",
          "Laturan",
          "Maambong",
          "Nangka",
          "Palabucan",
          "Poblacion",
          "Pongol",
          "San Jose",
          "Santa Fe",
          "Sil-ipon",
        ],
        "Malaybalay": ["Aglayan",
          "Apo Macote",
          "Bangcud",
          "Barangay 1",
          "Barangay 10",
          "Barangay 11",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Barangay 7",
          "Barangay 8",
          "Barangay 9",
          "Busdi",
          "Cabangahan",
          "Caburacanan",
          "Canayan",
          "Capitan Angel",
          "Casisang",
          "Dalwangan",
          "Imbayao",
          "Indalaza",
          "Kabalabag",
          "Kalasungay",
          "Kulaman",
          "Laguitas",
          "Linabo",
          "Magsaysay",
          "Maligaya",
          "Managok",
          "Manalog",
          "Mapayag",
          "Mapulo",
          "Miglamin",
          "Patpat",
          "Saint Peter",
          "San Jose",
          "San Martin",
          "Santo Niño",
          "Silae",
          "Simaya",
          "Sinanglanan",
          "Sumpong",
          "Violeta",
          "Zamboanguita",
        ],
        "Malitbog": ["Kalingking",
          "Kiabo",
          "Mindagat",
          "Omagling",
          "Patpat",
          "Poblacion",
          "Sampiano",
          "San Luis",
          "Santa Ines",
          "Silo-o",
          "Sumalsag",
        ],
        "Manolo Fortich": ["Agusan Canyon",
          "Alae",
          "Dahilayan",
          "Dalirig",
          "Damilag",
          "Diclum",
          "Guilang-guilang",
          "Kalugmanan",
          "Lindaban",
          "Lingion",
          "Lunocan",
          "Maluko",
          "Mambatangan",
          "Mampayag",
          "Mantibugao",
          "Minsuro",
          "San Miguel",
          "Sankanan",
          "Santiago",
          "Santo Niño",
          "Tankulan",
          "Ticala",
        ],
        "Maramag": ["Anahawon",
          "Bagongsilang",
          "Base Camp",
          "Bayabason",
          "Camp I",
          "Colambugan",
          "Dagumba-an",
          "Danggawan",
          "Dologon",
          "Kiharong",
          "Kisanday",
          "Kuya",
          "La Roxas",
          "North Poblacion",
          "Panadtalan",
          "Panalsalan",
          "San Miguel",
          "San Roque",
          "South Poblacion",
          "Tubigon",
        ],
        "Pangantucan": ["Adtuyon",
          "Bacusanon",
          "Bangahan",
          "Barandias",
          "Concepcion",
          "Gandingan",
          "Kimanait",
          "Kipadukan",
          "Langcataon",
          "Lantay",
          "Madaya",
          "Malipayon",
          "Mendis",
          "Nabaliwa",
          "New Eden",
          "Payad",
          "Pigtauranan",
          "Poblacion",
          "Portulin",
        ],
        "Quezon": ["Butong",
          "C-Handumanan",
          "Cawayan",
          "Cebole",
          "Delapa",
          "Dumalama",
          "Kiburiao",
          "Kipaypayon",
          "Libertad",
          "Linabo",
          "Lipa",
          "Lumintao",
          "Magsaysay",
          "Mahayag",
          "Manuto",
          "Merangerang",
          "Mibantang",
          "Minongan",
          "Minsalirak",
          "Minsamongan",
          "Paitan",
          "Palacapao",
          "Pinilayan",
          "Poblacion",
          "Puntian",
          "Salawagan",
          "San Isidro",
          "San Jose",
          "San Roque",
          "Santa Cruz",
          "Santa Filomena",
        ],
        "San Fernando": ["Bonacao",
          "Bulalang",
          "Cabuling",
          "Candelaria",
          "Cayaga",
          "Dao",
          "Durian",
          "Halapitan",
          "Iglugsad",
          "Kalagangan",
          "Kawayan",
          "Kibongcog",
          "Little Baguio",
          "Mabuhay",
          "Magkalungay",
          "Malayanan",
          "Matupe",
          "Nacabuklad",
          "Namnam",
          "Palacpacan",
          "Sacramento Valley",
          "San Jose",
          "Santo Domingo",
          "Tugop",
        ],
        "Sumilao": ["Culasi",
          "Kisolon",
          "Licoan",
          "Lupiagan",
          "Ocasion",
          "Poblacion",
          "Puntian",
          "San Roque",
          "San Vicente",
          "Vista Villa",
        ],
        "Talakag": ["Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Basak",
          "Baylanan",
          "Cacaon",
          "Colawingon",
          "Cosina",
          "Dagumbaan",
          "Dagundalahon",
          "Dominorog",
          "Indulang",
          "Lantud",
          "Lapok",
          "Liguron",
          "Lingi-on",
          "Lirongan",
          "Miarayon",
          "Sagaran",
          "Salucot",
          "San Antonio",
          "San Isidro",
          "San Miguel",
          "San Rafael",
          "Santo Niño",
          "Tagbak",
          "Tikalaan",
        ],
        "Valencia": ["Bagontaas",
          "Banlag",
          "Barobo",
          "Batangan",
          "Catumbalon",
          "Colonia",
          "Concepcion",
          "Dagat-Kidavao",
          "Guinoyuran",
          "Kahapunan",
          "Laligan",
          "Lilingayon",
          "Lourdes",
          "Lumbayao",
          "Lumbo",
          "Lurogan",
          "Maapag",
          "Mabuhay",
          "Mailag",
          "Mt. Nebo",
          "Nabago",
          "Pinatilan",
          "Poblacion",
          "San Carlos",
          "San Isidro",
          "Sinabuagan",
          "Sinayawan",
          "Sugod",
          "Tongantongan",
          "Tugaya",
          "Vintar",
        ]
      },
      barangays: []
    },
    "Bulacan": {
      cities: {
        "Angat": ["Banaban", "Baybay", "Binagbag", "Donacion", "Encanto", "Laog", "Marungko", "Niugan", "Paltok", "Pulong Yantok", "San Roque", "Santa Cruz", "Santa Lucia", "Santo Cristo", "Sulucan", "Taboc"
        ],
        "Balagtas": ["Borol 1st", "Borol 2nd", "Dalig", "Longos", "Panginay", "Pulong Gubat", "San Juan", "Santol", "Wawa"
        ],
        "Baliuag": ["Bagong Nayon", "Barangca", "Calantipay", "Catulinan", "Concepcion", "Hinukay", "Makinabang", "Matangtubig", "Pagala", "Paitan", "Piel", "Pinagbarilan", "Poblacion", "Sabang", "San Jose", "San Roque", "Santa Barbara", "Santo Cristo", "Santo Niño", "Subic", "Sulivan", "Tangos", "Tarcan", "Tiaong", "Tibag", "Tilapayong", "Virgen delas Flores"
        ],
        "Bocaue": ["Antipona", "Bagumbayan", "Bambang", "Batia", "Biñang 1st", "Biñang 2nd", "Bolacan", "Bundukan", "Bunlo", "Caingin", "Duhat", "Igulot", "Lolomboy", "Poblacion", "Sulucan", "Taal", "Tambobong", "Turo", "Wakas"
        ],
        "Bulakan": ["Bagumbayan", "Balubad", "Bambang", "Matungao", "Maysantol", "Perez", "Pitpitan", "San Francisco", "San Jose", "San Nicolas", "Santa Ana", "Santa Ines", "Taliptip", "Tibig"
        ],
        "Bustos": ["Bonga Mayor", "Bonga Menor", "Buisan", "Camachilihan", "Cambaog", "Catacte", "Liciada", "Malamig", "Malawak", "Poblacion", "San Pedro", "Talampas", "Tanawan", "Tibagan"
        ],
        "Calumpit": ["Balite", "Balungao", "Buguion", "Bulusan", "Calizon", "Calumpang", "Caniogan", "Corazon", "Frances", "Gatbuca", "Gugo", "Iba Este", "Iba O'Este", "Longos", "Meysulao", "Meyto", "Palimbang", "Panducot", "Pio Cruzcosa", "Poblacion", "Pungo", "San Jose", "San Marcos", "San Miguel", "Santa Lucia", "Santo Niño", "Sapang Bayan", "Sergio Bayan", "Sucol"
        ],
        "Doña Remedios Trinidad": ["Bayabas", "Camachile", "Camachin", "Kabayunan", "Kalawakan", "Pulong Sampalok", "Sapang Bulak", "Talbak"
        ],
        "Guiguinto": ["Cutcut", "Daungan", "Ilang-Ilang", "Malis", "Panginay", "Poblacion", "Pritil", "Pulong Gubat", "Santa Cruz", "Santa Rita", "Tabang", "Tabe", "Tiaong", "Tuktukan"
        ],
        "Hagonoy": ["Abulalas", "Carillo", "Iba", "Iba-Ibayo", "Mercado", "Palapat", "Pugad", "Sagrada Familia", "San Agustin", "San Isidro", "San Jose", "San Juan", "San Miguel", "San Nicolas", "San Pablo", "San Pascual", "San Pedro", "San Roque", "San Sebastian", "Santa Cruz", "Santa Elena", "Santa Monica", "Santo Niño", "Santo Rosario", "Tampok", "Tibaguin"
        ],
        "Malolos": ["Anilao", "Atlag", "Babatnin", "Bagna", "Bagong Bayan", "Balayong", "Balite", "Bangkal", "Barihan", "Bulihan", "Bungahan", "Caingin", "Calero", "Caliligawan", "Canalate", "Caniogan", "Catmon", "Cofradia", "Dakila", "Guinhawa", "Ligas", "Liyang", "Longos", "Look 1st", "Look 2nd", "Lugam", "Mabolo", "Mambog", "Masile", "Matimbo", "Mojon", "Namayan", "Niugan", "Pamarawan", "Panasahan", "Pinagbakahan", "San Agustin", "San Gabriel", "San Juan", "San Pablo", "San Vicente", "Santiago", "Santisima Trinidad", "Santo Cristo", "Santo Niño", "Santo Rosario", "Santol", "Sumapang Bata", "Sumapang Matanda", "Taal", "Tikay"
        ],
        "Marilao": ["Abangan Norte", "Abangan Sur", "Ibayo", "Lambakin", "Lias", "Loma de Gato", "Nagbalon", "Patubig", "Poblacion I", "Poblacion II", "Prenza I", "Prenza II", "Santa Rosa I", "Santa Rosa II", "Saog", "Tabing Ilog"
        ],
        "Meycauayan": ["Bagbaguin", "Bahay Pare", "Bancal", "Banga", "Bayugo", "Caingin", "Calvario", "Camalig", "Hulo", "Iba", "Langka", "Lawa", "Libtong", "Liputan", "Longos", "Malhacan", "Pajo", "Pandayan", "Pantoc", "Perez", "Poblacion", "Saint Francis", "Saluysoy", "Tugatog", "Ubihan", "Zamora"
        ],
        "Norzagaray": ["Bangkal", "Baraka", "Bigte", "Bitungol", "Friendship Village Resources", "Matictic", "Minuyan", "Partida", "Pinagtulayan", "Poblacion", "San Lorenzo", "San Mateo", "Tigbe"
        ],
        "Obando": ["Binuangan", "Catanghalan", "Hulo", "Lawa", "Paco", "Pag-asa", "Paliwas", "Panghulo", "Salambao", "San Pascual", "Tawiran"
        ],
        "Pandi": ["Bagbaguin", "Bagong Barrio", "Baka-bakahan", "Bunsuran I", "Bunsuran II", "Bunsuran III", "Cacarong Bata", "Cacarong Matanda", "Cupang", "Malibong Bata", "Malibong Matanda", "Manatal", "Mapulang Lupa", "Masagana", "Masuso", "Pinagkuartelan", "Poblacion", "Real de Cacarong", "San Roque", "Santo Niño", "Siling Bata", "Siling Matanda"
        ],
        "Paombong": ["Binakod", "Kapitangan", "Malumot", "Masukol", "Pinalagdan", "Poblacion", "San Isidro I", "San Isidro II", "San Jose", "San Roque", "San Vicente", "Santa Cruz", "Santo Niño", "Santo Rosario"
        ],
        "Plaridel": ["Agnaya", "Bagong Silang", "Banga I", "Banga II", "Bintog", "Bulihan", "Culianin", "Dampol", "Lagundi", "Lalangan", "Lumang Bayan", "Parulan", "Poblacion", "Rueda", "San Jose", "Santa Ines", "Santo Niño", "Sipat", "Tabang"
        ],
        "Pulilan": ["Balatong A", "Balatong B", "Cutcot", "Dampol I", "Dampol II-A", "Dampol II-B", "Dulong Malabon", "Inaon", "Longos", "Lumbac", "Paltao", "Penabatan", "Poblacion", "Santa Peregrina", "Santo Cristo", "Taal", "Tabon", "Tibag", "Tinejero"
        ],
        "San Ildefonso": ["Akle", "Alagao", "Anyatam", "Bagong Barrio", "Basuit", "Bubulong Malaki", "Bubulong Munti", "Buhol na Mangga", "Bulusukan", "Calasag", "Calawitan", "Casalat", "Gabihan"
          , "Garlang", "Lapnit", "Maasim", "Makapilapil", "Malipampang", "Mataas na Parang", "Matimbubong", "Nabaong Garlang", "Palapala", "Pasong Bangkal", "Pinaod", "Poblacion", "Pulong Tamo", "San Juan", "Santa Catalina Bata", "Santa Catalina Matanda", "Sapang Dayap", "Sapang Putik", "Sapang Putol", "Sumandig", "Telepatio", "Umpucan", "Upig"
        ],
        "San Jose del Monte": ["Assumption", "Bagong Buhay", "Bagong Buhay II", "Bagong Buhay III", "Citrus", "Ciudad Real", "Dulong Bayan", "Fatima", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "Francisco Homes-Guijo", "Francisco Homes-Mulawin", "Francisco Homes-Narra", "Francisco Homes-Yakal", "Gaya-gaya", "Graceville", "Gumaoc Central", "Gumaoc East", "Gumaoc West", "Kaybanban", "Kaypian", "Lawang Pari", "Maharlika", "Minuyan", "Minuyan II", "Minuyan III", "Minuyan IV", "Minuyan Proper", "Minuyan V", "Muzon", "Paradise III", "Poblacion", "Poblacion I", "Saint Martin de Porres", "San Isidro", "San Manuel", "San Martin", "San Martin II", "San Martin III", "San Martin IV", "San Pedro", "San Rafael", "San Rafael I", "San Rafael III", "San Rafael IV", "San Rafael V", "San Roque", "Santa Cruz", "Santa Cruz II", "Santa Cruz III", "Santa Cruz IV", "Santa Cruz V", "Santo Cristo", "Santo Niño", "Santo Niño II", "Sapang Palay", "Tungkong Mangga"
        ],
        "San Miguel": ["Bagong Pag-asa", "Bagong Silang", "Balaong", "Balite", "Bantog", "Bardias", "Baritan", "Batasan Bata", "Batasan Matanda", "Biak-na-Bato", "Biclat", "Buga", "Buliran", "Bulualto", "Calumpang", "Cambio", "Camias", "Ilog-Bulo", "King Kabayo", "Labne", "Lambakin", "Magmarale", "Malibay", "Maligaya", "Mandile", "Masalipit", "Pacalag", "Paliwasan", "Partida", "Pinambaran", "Poblacion", "Pulong Bayabas", "Pulong Duhat", "Sacdalan", "Salacot", "Salangan", "San Agustin", "San Jose", "San Juan", "San Vicente", "Santa Ines", "Santa Lucia", "Santa Rita Bata", "Santa Rita Matanda", "Sapang", "Sibul", "Tartaro", "Tibagan", "Tigpalas"
        ],
        "San Rafael": ["BMA-Balagtas", "Banca-banca", "Caingin", "Capihan", "Coral na Bato", "Cruz na Daan", "Dagat-dagatan", "Diliman I", "Diliman II", "Libis", "Lico", "Maasim", "Mabalas-balas", "Maguinao", "Maronguillo", "Paco", "Pansumaloc", "Pantubig", "Pasong Bangkal", "Pasong Callos", "Pasong Intsik", "Pinacpinacan", "Poblacion", "Pulo", "Pulong Bayabas", "Salapungan", "Sampaloc", "San Agustin", "San Roque", "Sapang Pahalang", "Talacsan", "Tambubong", "Tukod", "Ulingao"
        ],
        "Santa Maria": ["Bagbaguin", "Balasing", "Buenavista", "Bulac", "Camangyanan", "Catmon", "Cay Pombo", "Caysio", "Guyong", "Lalakhan", "Mag-asawang Sapa", "Mahabang Parang", "Manggahan", "Parada", "Poblacion", "Pulong Buhangin", "San Gabriel", "San Jose Patag", "San Vicente", "Santa Clara", "Santa Cruz", "Silangan", "Tabing Bakod", "Tumana"
        ]
      },

    },
    "Cagayan": {
      cities: {
        "Abulug": ["Alinunu",
          "Bagu",
          "Banguian",
          "Calog Norte",
          "Calog Sur",
          "Canayun",
          "Centro",
          "Dana-Ili",
          "Guiddam",
          "Libertad",
          "Lucban",
          "Pinili",
          "San Agustin",
          "San Julian",
          "Santa Filomena",
          "Santa Rosa",
          "Santo Tomas",
          "Siguiran",
          "Simayung",
          "Sirit"],
        "Alcala": ["Abbeg", "Afusing Bato", "Afusing Daga", "Agani", "Baculod", "Baybayog", "Cabuluan", "Calantac", "Carallangan", "Centro Norte", "Centro Sur", "Dalaoig", "Damurog", "Jurisdiction", "Malalatan", "Maraburab", "Masin", "Pagbangkeruan", "Pared", "Piggatan", "Pinopoc", "Pussian", "San Esteban", "Tamban", "Tupang"
        ],
        "Allacapan": [
          "Aguinaldo", "Alimannao", "Apayao", "Bangued", "Balingcaguing", "Bolog", "Bucal Norte", "Bucal Sur", "Cabitan", "Canos", "Centro", "Danag", "Dicoloc", "Luna", "Malasin", "Paatan", "San Antonio", "San Felipe", "San Juan", "San Jose", "San Pedro", "Santiago", "Santa Cruz", "Santo Niño", "Santo Tomas", "Sison", "Talacag", "Timpuyog", "Tuguegarao", "Villacampa"
        ],
        "Apayao": [
          "Abog", "Bagumbayan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10"
        ],
        "Baggao": [
          "Alangigan", "Bagu", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10"
        ],
        "Ballesteros": [
          "Balat", "Balsat", "Bato", "Buarong", "Bagumbayan", "Balinag", "Cabatacan", "Dagat", "Luna", "Mabini", "Pangilin", "Santo Niño", "Tabig", "Tupang"
        ],
        "Basilisa": [
          "Bayombong", "Casili", "Gamut", "Guibang", "Masin", "Nagparang", "San Antonio", "San Pedro", "Santo Niño"
        ],
        "Buguey": [
          "Apod", "Banban", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10"
        ],
        "Cagayan": [
          "Abulug", "Alcala", "Angadanan", "Baggao", "Ballesteros", "Basilisa", "Buguey", "Cabaruan", "Cagayan", "Claveria", "Gonzaga", "Lasam", "Luna", "Piat", "San Vicente", "Solana", "Tuguegarao"
        ],
        "Calayan": [
          "Bagumbayan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8"
        ],
        "Camalaniugan": [
          "Alambatin", "Bagumbayan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8"
        ],
        "Cana": [
          "Baru", "Bongabon", "Cauayan", "Dulangan", "Isla", "Lungsod", "Magsaysay", "Pio Duran"
        ],
        "Claveria": [
          "Balong", "Banban", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10"
        ],
        "Enrile": ["Alibago",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay III-A",
          "Barangay IV",
          "Batu",
          "Divisoria",
          "Inga",
          "Lanna",
          "Lemu Norte",
          "Lemu Sur",
          "Liwan Norte",
          "Liwan Sur",
          "Maddarulug Norte",
          "Maddarulug Sur",
          "Magalalag East",
          "Magalalag West",
          "Maracuru",
          "Roma Norte",
          "Roma Sur",
          "San Antonio",
        ],
        "Gattaran": [
          "Abra",
          "Aguiguican",
          "Bangatan Ngagan",
          "Baracaoit",
          "Baraoidan",
          "Barbarit",
          "Basao",
          "Bolos Point",
          "Cabayu",
          "Calaoagan Bassit",
          "Calaoagan Dackel",
          "Capiddigan",
          "Capissayan Norte",
          "Capissayan Sur",
          "Casicallan Norte",
          "Casicallan Sur",
          "Centro Norte",
          "Centro Sur",
          "Cullit",
          "Cumao",
          "Cunig",
          "Dummun",
          "Fugu",
          "Ganzano",
          "Guising",
          "L. Adviento",
          "Langgan",
          "Lapogan",
          "Mabuno",
          "Nabaccayan",
          "Naddungan",
          "Nagatutuan",
          "Nassiping",
          "Newagac",
          "Palagao Norte",
          "Palagao Sur",
          "Piña Este",
          "Piña Weste",
          "San Carlos",
          "San Vicente",
          "Santa Ana",
          "Santa Maria",
          "Sidem",
          "T. Elizaga",
          "Tagumay",
          "Takiki",
          "Taligan",
          "Tanglagan",
          "Tubungan Este",
          "Tubungan Weste",],
        "Gonzaga": ["Amunitan",
          "Batangan",
          "Baua",
          "Cabanbanan Norte",
          "Cabanbanan Sur",
          "Cabiraoan",
          "Calayan",
          "Callao",
          "Caroan",
          "Casitan",
          "Flourishing",
          "Ipil",
          "Isca",
          "Magrafil",
          "Minanga",
          "Paradise",
          "Pateng",
          "Progressive",
          "Rebecca",
          "San Jose",
          "Santa Clara",
          "Santa Cruz",
          "Santa Maria",
          "Smart",
          "Tapel",],
        "Iguig": ["Ajat",
          "Atulu",
          "Baculud",
          "Bayo",
          "Campo",
          "Dumpao",
          "Gammad",
          "Garab",
          "Malabbac",
          "Manaoag",
          "Minanga Norte",
          "Minanga Sur",
          "Nattanzan",
          "Redondo",
          "Salamague",
          "San Esteban",
          "San Isidro",
          "San Lorenzo",
          "San Vicente",
          "Santa Barbara",
          "Santa Rosa",
          "Santa Teresa",
          "Santiago",],
        "Lal-lo": ["Abagao",
          "Alaguia",
          "Bagumbayan",
          "Bangag",
          "Bical",
          "Bicud",
          "Binag",
          "Cabayabasan",
          "Cagoran",
          "Cambong",
          "Catayauan",
          "Catugan",
          "Centro",
          "Cullit",
          "Dagupan",
          "Dalaya",
          "Fabrica",
          "Fusina",
          "Jurisdiction",
          "Lalafugan",
          "Logac",
          "Magallungon",
          "Magapit",
          "Malanao",
          "Maxingal",
          "Naguilian",
          "Paranum",
          "Rosario",
          "San Antonio",
          "San Jose",
          "San Juan",
          "San Lorenzo",
          "San Mariano",
          "Santa Maria",
          "Tucalana",],
        "Lasam": ["Aggunetan",
          "Alannay",
          "Battalan",
          "Cabatacan East",
          "Cabatacan West",
          "Calapangan Norte",
          "Calapangan Sur",
          "Callao Norte",
          "Callao Sur",
          "Cataliganan",
          "Centro I",
          "Centro II",
          "Centro III",
          "Finugo Norte",
          "Gabun",
          "Ignacio Jurado",
          "Magsaysay",
          "Malinta",
          "Minanga Norte",
          "Minanga Sur",
          "Nabannagan East",
          "Nabannagan West",
          "New Orlins",
          "Nicolas Agatep",
          "Peru",
          "San Pedro",
          "Sicalao",
          "Tagao",
          "Tucalan Passing",
          "Viga",],
        "Pamplona": ["Abanqueruan",
          "Allasitan",
          "Bagu",
          "Balingit",
          "Bidduang",
          "Cabaggan",
          "Capalalian",
          "Casitan",
          "Centro",
          "Curva",
          "Gattu",
          "Masi",
          "Nagattatan",
          "Nagtupacan",
          "San Juan",
          "Santa Cruz",
          "Tabba",
          "Tupanna",],
        "Peñablanca": ["Aggugaddan",
          "Alimanao",
          "Baliuag",
          "Bical",
          "Bugatay",
          "Buyun",
          "Cabbo",
          "Callao",
          "Camasi",
          "Centro",
          "Dodan",
          "Lapi",
          "Malibabag",
          "Manga",
          "Minanga",
          "Nabbabalayan",
          "Nanguilattan",
          "Nannarian",
          "Parabba",
          "Patagueleg",
          "Quibal",
          "San Roque",
          "Sisim",],
        "Piat": ["Apayao",
          "Aquib",
          "Baung",
          "Calaoagan",
          "Catarauan",
          "Dugayung",
          "Gumarueng",
          "Macapil",
          "Maguilling",
          "Minanga",
          "Poblacion I",
          "Poblacion II",
          "Santa Barbara",
          "Santo Domingo",
          "Sicatna",
          "Villa Rey",
          "Villa Reyno",
          "Warat",],
        "Rizal": ["Anagguan",
          "Anungu",
          "Anurturu",
          "Balungcanag",
          "Battut",
          "Batu",
          "Bural",
          "Cambabangan",
          "Capacuan",
          "Dunggan",
          "Duyun",
          "Gaddangao",
          "Gaggabutan East",
          "Gaggabutan West",
          "Illuru Norte",
          "Illuru Sur",
          "Lattut",
          "Linno",
          "Liwan",
          "Mabbang",
          "Masi",
          "Mauanan",
          "Minanga",
          "Nanauatan",
          "Nanungaran",
          "Pasingan",
          "Poblacion",
          "San Juan",
          "Sinicking",
        ],
        "Sanchez-Mira": ["Bangan",
          "Callungan",
          "Centro I",
          "Centro II",
          "Dacal",
          "Dagueray",
          "Dammang",
          "Kittag",
          "Langagan",
          "Magacan",
          "Marzan",
          "Masisit",
          "Nagrangtayan",
          "Namuac",
          "San Andres",
          "Santiago",
          "Santor",
          "Tokitok",],
        "Santa Ana": ["Batu-Parada",
          "Casagan",
          "Casambalangan",
          "Centro",
          "Diora-Zinungan",
          "Dungeg",
          "Kapanikian",
          "Marede",
          "Palawig",
          "Patunungan",
          "Rapuli",
          "San Vicente",
          "Santa Clara",
          "Santa Cruz",
          "Tangatan",
          "Visitacion",
        ],
        "Santa Praxedes": ["Cadongdongan",
          "Capacuan",
          "Centro I",
          "Centro II",
          "Macatel",
          "Portabaga",
          "Salungsong",
          "San Juan",
          "San Miguel",
          "Sicul",],
        "Santa Teresita": ["Alucao",
          "Aridawen",
          "Buyun",
          "Caniugan",
          "Centro East",
          "Centro West",
          "Dungeg",
          "Luga",
          "Masi",
          "Mission",
          "Simbaluca",
          "Simpatuyo",
          "Villa",],
        "Santo Niño": ["Abariongan Ruar",
          "Abariongan Uneg",
          "Balagan",
          "Balanni",
          "Cabayo",
          "Calapangan",
          "Calassitan",
          "Campo",
          "Centro Norte",
          "Centro Sur",
          "Dungao",
          "Lattac",
          "Lipatan",
          "Lubo",
          "Mabitbitnong",
          "Mapitac",
          "Masical",
          "Matalao",
          "Nag-uma",
          "Namuccayan",
          "Niug Norte",
          "Niug Sur",
          "Palusao",
          "San Manuel",
          "San Roque",
          "Santa Felicitas",
          "Santa Maria",
          "Sidiran",
          "Tabang",
          "Tamucco",
          "Virginia",],
        "Solana": ["Andarayan North",
          "Andarayan South",
          "Bangag",
          "Bantay",
          "Basi East",
          "Basi West",
          "Bauan East",
          "Bauan West",
          "Cadaanan",
          "Calamagui",
          "Calillauan",
          "Carilucud",
          "Cattaran",
          "Centro Northeast",
          "Centro Northwest",
          "Centro Southeast",
          "Centro Southwest",
          "Dassun",
          "Furagui",
          "Gadu",
          "Gen. Eulogio Balao",
          "Iraga",
          "Lanna",
          "Lannig",
          "Lingu",
          "Maddarulug",
          "Maligligay",
          "Matungkaw",
          "Naglatore",
          "San Miguel",
          "Saripwagan",
          "Sinangap",
          "Sipuc",
          "Tugunan"],
        "Tuao": ["Agbagao",
          "Alabug",
          "Anao",
          "Balungao",
          "Banag",
          "Bangar",
          "Baño",
          "Cabigat",
          "Calayab",
          "Canupao",
          "Casili",
          "Centro",
          "Dulong",
          "Ilaga",
          "Jusig",
          "Lamut",
          "Laya",
          "Lucban",
          "Minabanga",
          "Naguilian",
          "San Antonio",
          "San Isidro",
          "San Juan",
          "San Vicente",
          "Santa Lucia",
          "Santa Maria",
          "Santa Teresita",
          "Tabugon"]
      },

    }, "Camarines Norte": {
      cities: {
        "Basud": ["Angas",
          "Basud",
          "Bactas",
          "Binatagan",
          "Caayunan",
          "Guinatungan",
          "Hinampacan",
          "Langa",
          "Laniton",
          "Lidong",
          "Mampili",
          "Mandazo",
          "Mangcamagong",
          "Manmuntay",
          "Mantugawe",
          "Matnog",
          "Mocong",
          "Oliva",
          "Pagsangahan",
          "Pinagwarasan",
          "Plaridel",
          "Poblacion 1",
          "Poblacion 2",
          "San Felipe",
          "San Jose",
          "San Pascual",
          "Taba-taba",
          "Tacad",
          "Taisan",
          "Tuaca",],
        "Capalonga": ["Alayao",
          "Binawangan",
          "Calabaca",
          "Camagsaan",
          "Catabaguangan",
          "Catioan",
          "Del Pilar",
          "Itok",
          "Lucbanan",
          "Mabini",
          "Mactang",
          "Magsaysay",
          "Mataque",
          "Old Camp",
          "Poblacion",
          "San Antonio",
          "San Isidro",
          "San Roque",
          "Tanawan",
          "Ubang",
          "Villa Aurora",
          "Villa Belen",],
        "Daet": ["Alawihao",
          "Awitan",
          "Bagasbas",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Barangay VI",
          "Barangay VII",
          "Barangay VIII",
          "Bibirao",
          "Borabod",
          "Calasgasan",
          "Camambugan",
          "Cobangbang",
          "Dogongan",
          "Gahonon",
          "Gubat",
          "Lag-on",
          "Magang",
          "Mambalite",
          "Mancruz",
          "Pamorangon",
          "San Isidro",],
        "Jose Panganiban": ["Bagong Bayan",
          "Calero",
          "Dahican",
          "Dayhagan",
          "Larap",
          "Luklukan Norte",
          "Luklukan Sur",
          "Motherlode",
          "Nakalaya",
          "North Poblacion",
          "Osmeña",
          "Pag-asa",
          "Parang",
          "Plaridel",
          "Salvacion",
          "San Isidro",
          "San Jose",
          "San Martin",
          "San Pedro",
          "San Rafael",
          "Santa Cruz",
          "Santa Elena",
          "Santa Milagrosa",
          "Santa Rosa Norte",
          "Santa Rosa Sur",
          "South Poblacion",
          "Tamisan",],
        "Labo": ["Anahaw",
          "Anameam",
          "Awitan",
          "Baay",
          "Bagacay",
          "Bagong Silang I",
          "Bagong Silang II",
          "Bagong Silang III",
          "Bakiad",
          "Bautista",
          "Bayabas",
          "Bayan-bayan",
          "Benit",
          "Bulhao",
          "Cabatuhan",
          "Cabusay",
          "Calabasa",
          "Canapawan",
          "Daguit",
          "Dalas",
          "Dumagmang",
          "Exciban",
          "Fundado",
          "Guinacutan",
          "Guisican",
          "Gumamela",
          "Iberica",
          "Kalamunding",
          "Lugui",
          "Mabilo I",
          "Mabilo II",
          "Macogon",
          "Mahawan-hawan",
          "Malangcao-Basud",
          "Malasugui",
          "Malatap",
          "Malaya",
          "Malibago",
          "Maot",
          "Masalong",
          "Matanlang",
          "Napaod",
          "Pag-asa",
          "Pangpang",
          "Pinya",
          "San Antonio",
          "San Francisco",
          "Santa Cruz",
          "Submakin",
          "Talobatib",
          "Tigbinan",
          "Tulay na Lupa",
        ], "Mercedes": ["Apuao",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Barangay VI",
          "Barangay VII",
          "Caringo",
          "Catandunganon",
          "Cayucyucan",
          "Colasi",
          "Del Rosario",
          "Gaboc",
          "Hamoraon",
          "Hinipaan",
          "Lalawigan",
          "Lanot",
          "Mambungalon",
          "Manguisoc",
          "Masalongsalong",
          "Matoogtoog",
          "Pambuhan",
          "Quinapaguian",
          "San Roque",
          "Tarum",
        ],
        "Paracale": ["Awitan",
          "Bagumbayan",
          "Bakal",
          "Batobalani",
          "Calaburnay",
          "Capacuan",
          "Casalugan",
          "Dagang",
          "Dalnac",
          "Dancalan",
          "Gumaus",
          "Labnig",
          "Macolabo Island",
          "Malacbang",
          "Malaguit",
          "Mampungo",
          "Mangkasay",
          "Maybato",
          "Palanas",
          "Pinagbirayan Malaki",
          "Pinagbirayan Munti",
          "Poblacion Norte",
          "Poblacion Sur",
          "Tabas",
          "Talusan",
          "Tawig",
          "Tugos",],
        "San Lorenzo Ruiz": ["Daculang Bolo",
          "Dagotdotan",
          "Langga",
          "Laniton",
          "Maisog",
          "Mampurog",
          "Manlimonsito",
          "Matacong",
          "Salvacion",
          "San Antonio",
          "San Isidro",
          "San Ramon",],
        "San Vicente": ["Asdum",
          "Cabanbanan",
          "Calabagas",
          "Fabrica",
          "Iraya Sur",
          "Man-ogob",
          "Poblacion District I",
          "Poblacion District II",
          "San Jose",],
        "Santa Elena": ["Basiad",
          "Bulala",
          "Don Tomas",
          "Guitol",
          "Kabuluan",
          "Kagtalaba",
          "Maulawin",
          "Patag Ibaba",
          "Patag Iraya",
          "Plaridel",
          "Polungguitguit",
          "Rizal",
          "Salvacion",
          "San Lorenzo",
          "San Pedro",
          "San Vicente",
          "Santa Elena",
          "Tabugon",
          "Villa San Isidro",],
        "Talisay": ["Binanuaan",
          "Caawigan",
          "Cahabaan",
          "Calintaan",
          "Del Carmen",
          "Gabon",
          "Itomang",
          "Poblacion",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Nicolas",
          "Santa Cruz",
          "Santa Elena",
          "Santo Niño",],
        "Vinzons": ["Aguit-it",
          "Banocboc",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Cagbalogo",
          "Calangcawan Norte",
          "Calangcawan Sur",
          "Guinacutan",
          "Mangcawayan",
          "Mangcayo",
          "Manlucugan",
          "Matango",
          "Napilihan",
          "Pinagtigasan",
          "Sabang",
          "Santo Domingo",
          "Singi",
          "Sula"]
      },

    },
    "Camarines Sur": {
      cities: {
        "Baao": ["Agdangan Poblacion", "Antipolo", "Bagumbayan", "Buluang", "Caranday", "Cristo Rey", "Del Pilar", "Del Rosario", "Iyagan", "La Medalla", "Lourdes", "Nababarera", "Pugay", "Sagrada", "Salvacion", "San Francisco", "San Isidro", "San Jose", "San Juan", "San Nicolas", "San Rafael", "San Ramon", "San Roque", "San Vicente", "Santa Cruz", "Santa Eulalia", "Santa Isabel", "Santa Teresa", "Santa Teresita", "Tapol"
        ],
        "Balatan": ["Cabanbanan", "Cabungan", "Camangahan", "Cayogcog", "Coguit", "Duran", "Laganac", "Luluasan", "Montenegro", "Pararao", "Pulang Daga", "Sagrada Nacacale", "San Francisco", "Santiago Nacacale", "Siramag", "Tapayas", "Tomatarayo"
        ],
        "Bato": ["Agos", "Bacolod", "Buluang", "Caricot", "Cawacagan", "Cotmon", "Cristo Rey", "Del Rosario", "Divina Pastora", "Goyudan", "Lobong", "Lubigan", "Mainit", "Manga", "Masoli", "Neighborhood", "Niño Jesus", "Pagatpatan", "Palo", "Payak", "Sagrada", "Salvacion", "San Isidro", "San Juan", "San Miguel", "San Rafael", "San Roque", "San Vicente", "Santa Cruz", "Santiago", "Sooc", "Tagpolo", "Tres Reyes"
        ],
        "Bombon": ["Pagao", "San Antonio", "San Francisco", "San Isidro", "San Jose", "San Roque", "Santo Domingo", "Siembre"
        ],
        "Buhi": ["Amlongan", "Antipolo", "Burocbusoc", "Cabatuan", "Cagmaslog", "De La Fe", "Delos Angeles", "Divino Rostro", "Gabas", "Ibayugan", "Igbac", "Ipil", "Iraya", "Labawon", "Lourdes", "Macaangay", "Monte Calvario", "Namurabod", "Sagrada Familia", "Salvacion", "San Antonio", "San Buenaventura", "San Francisco", "San Isidro", "San Jose Baybayon", "San Jose Salay", "San Pascual", "San Pedro", "San Rafael", "San Ramon", "San Roque", "San Vicente", "Santa Clara", "Santa Cruz", "Santa Elena", "Santa Isabel", "Santa Justina", "Tambo"
        ],
        "Bula": ["Bagoladio", "Bagumbayan", "Balaogan", "Caorasan", "Casugad", "Causip", "Fabrica", "Inoyonan", "Itangon", "Kinalabasahan", "La Purisima", "La Victoria", "Lanipga", "Lubgan", "Ombao Heights", "Ombao Polpog", "Palsong", "Panoypoyan", "Pawili", "Sagrada", "Salvacion", "San Agustin", "San Francisco", "San Isidro", "San Jose", "San Miguel", "San Ramon", "San Roque", "San Roque Heights", "Santa Elena", "Santo Domingo", "Santo Niño", "Taisan"
        ],
        "Cabusao": ["Barcelonita", "Biong", "Camagong", "Castillo", "New Poblacion", "Pandan", "San Pedro", "Santa Cruz", "Santa Lutgarda"
        ],
        "Calabanga": ["Balatasan", "Balombon", "Balongay", "Belen", "Bigaas", "Binaliw", "Binanuaanan Grande", "Binanuaanan Pequeño", "Bonot-Santa Rosa", "Burabod", "Cabanbanan", "Cagsao", "Camuning", "Comaguingking", "Del Carmen", "Dominorog", "Fabrica", "Harobay", "La Purisima", "Lugsad", "Manguiring", "Pagatpat", "Paolbo", "Pinada", "Punta Tarawal", "Quinale", "Sabang", "Salvacion-Baybay", "San Antonio", "San Antonio Poblacion", "San Bernardino", "San Francisco", "San Isidro", "San Lucas", "San Miguel", "San Pablo", "San Roque", "San Vicente", "Santa Cruz Poblacion", "Santa Cruz Ratay", "Santa Isabel", "Santa Salud", "Santo Domingo", "Santo Niño", "Siba-o", "Sibobo", "Sogod", "Tomagodtod"
        ],
        "Camaligan": ["Dugcal", "Marupit", "San Francisco", "San Jose-San Pablo", "San Juan-San Ramon", "San Lucas", "San Marcos", "San Mateo", "San Roque", "Santo Domingo", "Santo Tomas", "Sua", "Tarosanan"
        ],
        "Canaman": ["Baras", "Del Rosario", "Dinaga", "Fundado", "Haring", "Iquin", "Linaga", "Mangayawan", "Palo", "Pangpang", "Poro", "San Agustin", "San Francisco", "San Jose East", "San Jose West", "San Juan", "San Nicolas", "San Roque", "San Vicente", "Santa Cruz", "Santa Teresita", "Sua", "Talidtid", "Tibgao"
        ],
        "Caramoan": ["Agaas", "Antolon", "Bacgong", "Bahay", "Bikal", "Binanuahan", "Cabacongan", "Cadong", "Canatuan", "Caputatan", "Colongcogong", "Daraga", "Gata", "Gibgos", "Gogon", "Guijalo", "Hanopol", "Hanoy", "Haponan", "Ilawod", "Ili-Centro", "Lidong", "Lubas", "Malabog", "Maligaya", "Mampirao", "Mandiclum", "Maqueda", "Minalaba", "Oring", "Oroc-Osoc", "Pagolinan", "Pandanan", "Paniman", "Patag-Belen", "Pili-Centro", "Pili-Tabiguian", "Poloan", "Salvacion", "San Roque", "San Vicente", "Santa Cruz", "Solnopan", "Tabgon", "Tabiguian", "Tabog", "Tawog", "Terogo", "Toboan"
        ],
        "Del Gallego": ["Bagong Silang", "Bucal", "Cabasag", "Comadaycaday", "Comadogcadog", "Domagondong", "Kinalangan", "Mabini", "Magais I", "Magais II", "Mansalaya", "Nagkalit", "Palaspas", "Pamplona", "Pasay", "Pinagdapian", "Pinugusan", "Poblacion Zone III", "Sabang", "Salvacion", "San Juan", "San Pablo", "Santa Rita I", "Santa Rita II", "Sinagawsawan", "Sinuknipan I", "Sinuknipan II", "Sugsugin", "Tabion", "Tomagoktok", "Zone I Fatima", "Zone II San Antonio"
        ],
        "Gainza": ["Cagbunga", "Dahilig", "District I", "District II", "Loob", "Malbong", "Namuat", "Sampaloc"
        ],
        "Garchitorena": ["Ason", "Bahi", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Binagasbasan", "Burabod", "Cagamutan", "Cagnipa", "Canlong", "Dangla", "Del Pilar", "Denrica", "Harrison", "Mansangat", "Pambuhan", "Sagrada", "Salvacion", "San Vicente", "Sumaoy", "Tamiawon", "Toytoy"],
        "Goa": ["Abucayan", "Bagumbayan Grande", "Bagumbayan Pequeño", "Balaynan", "Belen", "Buyo", "Cagaycay", "Catagbacan", "Digdigon", "Gimaga", "Halawig-Gogon", "Hiwacloy", "La Purisima", "Lamon", "Matacla", "Maymatan", "Maysalay", "Napawon", "Panday", "Payatan", "Pinaglabanan", "Salog", "San Benito", "San Isidro", "San Isidro West", "San Jose", "San Juan Bautista", "San Juan Evangelista", "San Pedro", "Scout Fuentebella", "Tabgon", "Tagongtong", "Tamban", "Taytay"],
        "Iriga": ["Antipolo", "Cristo Rey", "Del Rosario", "Francia", "La Anunciacion", "La Medalla", "La Purisima", "La Trinidad", "Niño Jesus", "Perpetual Help", "Sagrada", "Salvacion", "San Agustin", "San Andres", "San Antonio", "San Francisco", "San Isidro", "San Jose", "San Juan", "San Miguel", "San Nicolas", "San Pedro", "San Rafael", "San Ramon", "San Roque", "San Vicente Norte", "San Vicente Sur", "Santa Cruz Norte", "Santa Cruz Sur", "Santa Elena", "Santa Isabel", "Santa Maria", "Santa Teresita", "Santiago", "Santo Domingo", "Santo Niño"],

        "Lagonoy": ["Agosais", "Agpo-Camagong-Tabog", "Amoguis", "Balaton", "Binanuahan", "Bocogan", "Burabod", "Cabotonan", "Dahat", "Del Carmen", "Gimagtocon", "Ginorangan", "Gubat", "Guibahoy", "Himanag", "Kinahologan", "Loho", "Manamoc", "Mangogon", "Mapid", "Olas", "Omalo", "Panagan", "Panicuan", "Pinamihagan", "San Francisco", "San Isidro", "San Isidro Norte", "San Isidro Sur", "San Rafael", "San Ramon", "San Roque", "San Sebastian", "San Vicente", "Santa Cruz", "Santa Maria", "Saripongpong", "Sipaco"],
        "Libmanan": ["Aslong", "Awayan", "Bagacay", "Bagadion", "Bagamelon", "Bagumbayan", "Bahao", "Bahay", "Begajo Norte", "Begajo Sur", "Beguito Nuevo", "Beguito Viejo", "Bikal", "Busak", "Caima", "Calabnigan", "Camambugan", "Cambalidio", "Candami", "Candato", "Cawayan", "Concepcion", "Cuyapi", "Danawan", "Duang Niog", "Handong", "Ibid", "Inalahan", "Labao", "Libod I", "Libod II", "Loba-loba", "Mabini", "Malansad Nuevo", "Malansad Viejo", "Malbogon", "Malinao", "Mambalite", "Mambayawas", "Mambulo Nuevo", "Mambulo Viejo", "Mancawayan", "Mandacanan", "Mantalisay", "Padlos", "Pag-oring Nuevo", "Pag-oring Viejo", "Palangon", "Palong", "Patag", "Planza", "Poblacion", "Potot", "Puro-Batia", "Rongos", "Salvacion", "San Isidro", "San Juan", "San Pablo", "San Vicente", "Sibujo", "Sigamot", "Station-Church Site", "Taban-Fundado"],
        "Lupi": ["Alleomar", "Bagangan Sr.", "Bagong Sikat", "Bangon", "Barrera Jr.", "Barrera Sr.", "Bel-Cruz", "Belwang", "Buenasuerte", "Bulawan Jr.", "Bulawan Sr.", "Cabutagan", "Casay", "Colacling", "Cristo Rey", "Del Carmen", "Haguimit", "Haluban", "Kaibigan", "La Purisima", "Lourdes", "Mangcawayan", "Napolidan", "Poblacion", "Polantuna", "Sagrada", "Salvacion", "San Isidro", "San Jose", "San Pedro", "San Rafael Norte", "San Rafael Sur", "San Ramon", "San Vicente", "Sooc", "Tanawan", "Tapi", "Tible"],
        "Magarao": ["Barobaybay", "Bell", "Carangcang", "Carigsa", "Casuray", "Monserrat", "Ponong", "San Francisco", "San Isidro", "San Juan", "San Miguel", "San Pantaleon", "Santa Lucia", "Santa Rosa", "Santo Tomas"],
        "Milaor": ["Alimbuyog", "Amparado", "Balagbag", "Borongborongan", "Cabugao", "Capucnasan", "Dalipay", "Del Rosario", "Flordeliz", "Lipot", "Mayaopayawan", "Maycatmon", "Maydaso", "San Antonio", "San Jose", "San Miguel", "San Roque", "San Vicente", "Santo Domingo", "Tarusanan"],
        "Minalabac": ["Antipolo", "Bagolatao", "Bagongbong", "Baliuag Nuevo", "Baliuag Viejo", "Catanusan", "Del Carmen-Del Rosario", "Del Socorro", "Hamoraon", "Hobo", "Irayang Solong", "Magadap", "Malitbog", "Manapao", "Mataoroc", "Sagrada", "Salingogon", "San Antonio", "San Felipe-Santiago", "San Francisco", "San Jose", "San Juan-San Lorenzo", "Taban", "Tariric", "Timbang"],
        "Nabua": ["Angustia", "Antipolo Old", "Antipolo Young", "Aro-aldao", "Bustrac", "Dolorosa", "Duran", "Inapatan", "La Opinion", "La Purisima", "Lourdes Old", "Lourdes Young", "Malawag", "Paloyon Oriental", "Paloyon Proper", "Salvacion Que Gatos", "San Antonio", "San Antonio Ogbon", "San Esteban", "San Francisco", "San Isidro", "San Isidro Inapatan", "San Jose", "San Juan", "San Luis", "San Miguel", "San Nicolas", "San Roque", "San Roque Madawon", "San Roque Sagumay", "San Vicente Gorong-Gorong", "San Vicente Ogbon", "Santa Barbara", "Santa Cruz", "Santa Elena Baras", "Santa Lucia Baras", "Santiago Old", "Santiago Young", "Santo Domingo", "Tandaay", "Topas Proper", "Topas Sogod"],
        "Naga": ["Abella", "Bagumbayan Norte", "Bagumbayan Sur", "Balatas", "Calauag", "Cararayan", "Carolina", "Concepcion Grande", "Concepcion Pequeña", "Dayangdang", "Del Rosario", "Dinaga", "Igualdad Interior", "Lerma", "Liboton", "Mabolo", "Pacol", "Panicuason", "Peñafrancia", "Sabang", "San Felipe", "San Francisco", "San Isidro", "Santa Cruz", "Tabuco", "Tinago", "Triangulo"],
        "Ocampo": ["Ayugan", "Cabariwan", "Cagmanaba", "Del Rosario", "Gatbo", "Guinaban", "Hanawan", "Hibago", "La Purisima Nuevo", "May-ogob", "New Moriones", "Old Moriones", "Pinit", "Poblacion Central", "Poblacion East", "Poblacion West", "Salvacion", "San Antonio", "San Francisco", "San Jose Oras", "San Roque Commonal", "San Vicente", "Santa Cruz", "Santo Niño", "Villaflorida"],
        "Pamplona": ["Batang", "Burabod", "Cagbibi", "Cagbunga", "Calawat", "Del Rosario", "Patong", "Poblacion", "Salvacion", "San Gabriel", "San Isidro", "San Rafael", "San Ramon", "San Vicente", "Tambo", "Tampadong", "Veneracion"],
        "Pasacao": ["Antipolo", "Bagong Silang", "Bahay", "Balogo", "Caranan", "Cuco", "Dalupaon", "Hubo", "Itulan", "Macad", "Odicon", "Quitang", "Salvacion", "San Antonio", "San Cirilo", "Santa Rosa del Norte", "Santa Rosa del Sur", "Tilnac", "Tinalmud"],
        "Pili": ["Anayan", "Bagong Sirang", "Binanwaanan", "Binobong", "Cadlan", "Caroyroyan", "Curry", "Del Rosario", "Himaao", "La Purisima", "New San Roque", "Old San Roque", "Palestina", "Pawili", "Sagrada", "Sagurong", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Vicente", "Santiago", "Santo Niño", "Tagbong", "Tinangis"],
        "Presentacion": ["Ayugao", "Bagong Sirang", "Baliguian", "Bantugan", "Bicalen", "Bitaogan", "Buenavista", "Bulalacao", "Cagnipa", "Lagha", "Lidong", "Liwacsa", "Maangas", "Pagsangahan", "Patrocinio", "Pili", "Santa Maria", "Tanawan"],
        "Ragay": ["Agao-ao", "Agrupacion", "Amomokpok", "Apad", "Apale", "Banga Caves", "Baya", "Binahan Proper", "Binahan Upper", "Buenasuerte", "Cabadisan", "Cabinitan", "Cabugao", "Caditaan", "Cale", "Catabangan Proper", "F. Simeon", "Godofredo Reyes Sr.", "Inandawa", "Laguio", "Lanipga-Cawayan", "Liboro", "Lohong", "Lower Omon", "Lower Santa Cruz", "Panaytayan", "Panaytayan Nuevo", "Patalunan", "Poblacion Ilaod", "Poblacion Iraya", "Port Junction Norte", "Port Junction Sur", "Salvacion", "Samay", "San Rafael", "Tagbac", "Upper Omon", "Upper Santa Cruz"],
        "Sagñay": ["Aniog", "Atulayan", "Bongalon", "Buracan", "Catalotoan", "Del Carmen", "Kilantaao", "Kilomaon", "Mabca", "Minadongjol", "Nato", "Patitinan", "San Antonio", "San Isidro", "San Roque", "Santo Niño", "Sibaguan", "Tinorongan", "Turague"],
        "San Fernando": ["Alianza", "Beberon", "Bical", "Bocal", "Bonifacio", "Buenavista", "Calascagas", "Cotmo", "Daculang Tubig", "Del Pilar", "Grijalvo", "Gñaran", "Lupi", "Maragñi", "Pamukid", "Pinamasagan", "Pipian", "Planza", "Rizal", "San Joaquin", "Santa Cruz", "Tagpocol"],
        "San Jose": ["Adiangao", "Bagacay", "Bahay", "Boclod", "Calalahan", "Calawit", "Camagong", "Catalotoan", "Danlog", "Del Carmen", "Dolo", "Kinalansan", "Mampirao", "Manzana", "Minoro", "Palale", "Ponglon", "Pugay", "Sabang", "Salogon", "San Antonio", "San Juan", "San Vicente", "Santa Cruz", "Soledad", "Tagas", "Tambangan", "Telegrafo", "Tominawog"],
        "Sipocot": ["Aldezar", "Alteza", "Anib", "Awayan", "Azucena", "Bagong Sirang", "Binahian", "Bolo Norte", "Bolo Sur", "Bulan", "Bulawan", "Cabuyao", "Caima", "Calagbangan", "Calampinay", "Carayrayan", "Cotmo", "Gabi", "Gaongan", "Impig", "Lipilip", "Lubigan Jr.", "Lubigan Sr.", "Malaguico", "Malubago", "Manangle", "Mangapo", "Mangga", "Manlubang", "Mantila", "North Centro", "North Villazar", "Sagrada Familia", "Salanda", "Salvacion", "San Isidro", "San Vicente", "Serranzana", "South Centro", "South Villazar", "Taisan", "Tara", "Tible", "Tula-tula", "Vigaan", "Yabo"],
        "Siruma": ["Bagong Sirang", "Bahao", "Boboan", "Butawanan", "Cabugao", "Fundado", "Homestead", "La Purisima", "Mabuhay", "Malaconini", "Matandang Siruma", "Nalayahan", "Pamintan-Bantilan", "Pinitan", "Poblacion", "Salvacion", "San Andres", "San Ramon", "Sulpa", "Tandoc", "Tongo-Bantigue", "Vito"],
        "Tigaon": ["Abo", "Cabalinadan", "Caraycayon", "Casuna", "Consocep", "Coyaoyao", "Gaao", "Gingaroy", "Gubat", "Huyonhuyon", "Libod", "Mabalodbalod", "May-anao", "Panagan", "Poblacion", "Salvacion", "San Antonio", "San Francisco", "San Miguel", "San Rafael", "Talojongon", "Tinawagan", "Vinagre"],
        "Tinambac": ["Agay-ayan", "Antipolo", "Bagacay", "Banga", "Bani", "Bataan", "Binalay", "Bolaobalite", "Buenavista", "Buyo", "Cagliliog", "Caloco", "Camagong", "Canayonan", "Cawaynan", "Daligan", "Filarca", "La Medalla", "La Purisima", "Lupi", "Magsaysay", "Magtang", "Mananao", "New Caaluan", "Olag Grande", "Olag Pequeño", "Old Caaluan", "Pag-asa", "Pantat", "Sagrada", "Salvacion", "Salvacion Poblacion", "San Antonio", "San Isidro", "San Jose", "San Pascual", "San Ramon", "San Roque", "San Vicente", "Santa Cruz", "Sogod", "Tambang", "Tierra Nevada", "Union"]
      },

    },
    "Camiguin": {
      cities: {
        "Catarman": ["Alga", "Bonbon", "Bura", "Catibac", "Compol", "Lawigan", "Liloan", "Looc", "Mainit", "Manduao", "Panghiawan", "Poblacion", "Santo Niño", "Tangaro"],
        "Guinsiliban": ["Butay", "Cabuan", "Cantaan", "Liong", "Maac", "North Poblacion", "South Poblacion"],
        "Mahinog": ["Benoni", "Binatubo", "Catohugan", "Hubangon", "Owakan", "Poblacion", "Puntod", "San Isidro", "San Jose", "San Miguel", "San Roque", "Tubod", "Tupsan Pequeño"],
        "Mambajao": ["Agoho", "Anito", "Balbagon", "Baylao", "Benhaan", "Bug-ong", "Kuguita", "Magting", "Naasag", "Pandan", "Poblacion", "Soro-soro", "Tagdo", "Tupsan", "Yumbing"],
        "Sagay": ["Alangilan", "Bacnit", "Balite", "Bonbon", "Bugang", "Cuna", "Manuyog", "Mayana", "Poblacion"]
      },

    }, "Capiz": {
      cities: {
        "Cuartero": ["Agcabugao", "Agdahon", "Agnaga", "Angub", "Balingasag", "Bito-on Ilawod", "Bito-on Ilaya", "Bun-od", "Carataya", "Lunayan", "Mahabang Sapa", "Mahunodhunod", "Maindang", "Mainit", "Malagab-i", "Nagba", "Poblacion Ilawod", "Poblacion Ilaya", "Poblacion Takas", "Puti-an", "San Antonio", "Sinabsaban"],
        "Dao": ["Aganan", "Agtambi", "Agtanguay", "Balucuan", "Bita", "Centro", "Dao", "Daplas", "Duyoc", "Ilas Sur", "Lacaron", "Malonoy", "Manhoy", "Mapulang Bato", "Matagnop", "Nasunogan", "Poblacion Ilawod", "Poblacion Ilaya", "Quinabcaban", "Quinayuya", "San Agustin"],
        "Dumalag": ["Concepcion", "Consolacion", "Dolores", "Duran", "Poblacion", "San Agustin", "San Jose", "San Martin", "San Miguel", "San Rafael", "San Roque", "Santa Carmen", "Santa Cruz", "Santa Monica", "Santa Rita", "Santa Teresa", "Santo Angel", "Santo Niño", "Santo Rosario"],
        "Dumarao": ["Agbatuan", "Aglalana", "Aglanot", "Agsirab", "Alipasiawan", "Astorga", "Bayog", "Bungsuan", "Calapawan", "Codingle", "Cubi", "Dacuton", "Dangula", "Gibato", "Guinotos", "Jambad", "Janguslob", "Lawaan", "Malonoy", "Nagsulang", "Ongol Ilawod", "Ongol Ilaya", "Poblacion Ilawod", "Poblacion Ilaya", "Sagrada Familia", "Salcedo", "San Juan", "Sibariwan", "Tamulalod", "Taslan", "Tina", "Tinaytayan", "Traciano"],
        "Ivisan": ["Agmalobo", "Agustin Navarra", "Balaring", "Basiao", "Cabugao", "Cudian", "Ilaya-Ivisan", "Malocloc Norte", "Malocloc Sur", "Matnog", "Mianay", "Ondoy", "Poblacion Norte", "Poblacion Sur", "Santa Cruz", "Agbanog", "Agdalipe", "Ameligan", "Bailan", "Banate", "Bantigue", "Binuntucan", "Cabugao", "Gabuc", "Guba", "Hipona", "Ilawod", "Ilaya", "Intungcan", "Jolongajog", "Lantangan", "Linampongan", "Malag-it", "Manapao", "Rizal", "San Pedro", "Solo", "Sublangon", "Tabuc", "Tacas", "Yatingan"],
        "President Roxas": ["Aranguel", "Badiangon", "Bayuyan", "Cabugcabug", "Carmencita", "Cubay", "Culilang", "Goce", "Hanglid", "Ibaca", "Madulano", "Manoling", "Marita", "Pandan", "Pantalan Cabugcabug", "Pinamihagan", "Poblacion", "Pondol", "Quiajo", "Sangkal", "Santo Niño", "Vizcaya"],
        "Roxas City": ["Adlawan", "Bago", "Balijuagan", "Banica", "Barra", "Bato", "Baybay", "Bolo", "Cabugao", "Cagay", "Cogon", "Culajao", "Culasi", "Dayao", "Dinginan", "Dumolog", "Gabu-an", "Inzo Arnaldo Village", "Jumaguicjic", "Lanot", "Lawa-an", "Libas", "Liong", "Loctugan", "Lonoy", "Milibili", "Mongpong", "Olotayan", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion IX", "Poblacion V", "Poblacion VI", "Poblacion VII", "Poblacion VIII", "Poblacion X", "Poblacion XI", "Punta Cogon", "Punta Tabuc", "San Jose", "Sibaguan", "Talon", "Tanque", "Tanza", "Tiza"],
        "Sapian": ["Agsilab", "Agtatacay Norte", "Agtatacay Sur", "Bilao", "Damayan", "Dapdapan", "Lonoy", "Majanlud", "Maninang", "Poblacion"],
        "Sigma": ["Acbo", "Amaga", "Balucuan", "Bangonbangon", "Capuyhan", "Cogon", "Dayhagon", "Guintas", "Malapad Cogon", "Mangoso", "Mansacul", "Matangcong", "Matinabus", "Mianay", "Oyong", "Pagbunitan", "Parian", "Pinamalatican", "Poblacion Norte", "Poblacion Sur", "Tawog"],
        "Tapaz": ["Abangay", "Acuña", "Agcococ", "Aglinab", "Aglupacan", "Agpalali", "Apero", "Artuz", "Bag-ong Barrio", "Bato-bato", "Buri", "Camburanan", "Candelaria", "Carida", "Cristina", "Da-an Banwa", "Da-an Norte", "Da-an Sur", "Garcia", "Gebio-an", "Hilwan", "Initan", "Katipunan", "Lagdungan", "Lahug", "Libertad", "Mabini", "Maliao", "Malitbog", "Minan", "Nayawan", "Poblacion", "Rizal Norte", "Rizal Sur", "Roosevelt", "Roxas", "Salong", "San Antonio", "San Francisco", "San Jose", "San Julian", "San Miguel Ilawod", "San Miguel Ilaya", "San Nicolas", "San Pedro", "San Roque", "San Vicente", "Santa Ana", "Santa Petronila", "Senonod", "Siya", "Switch", "Tabon", "Tacayan", "Taft", "Taganghin", "Taslan", "Wright"]
      },

    },
    "Catanduanes": {
      cities: {
        "Bagamanoc": ["Antipolo", "Bacak", "Bagatabao", "Bugao", "Cahan", "Hinipaan", "Magsaysay", "Poblacion", "Quezon", "Quigaray", "Sagrada", "Salvacion", "San Isidro", "San Rafael", "San Vicente", "Santa Mesa", "Santa Teresa", "Suchan"],
        "Baras": ["Abihao", "Agban", "Bagong Sirang", "Batolinao", "Benticayan", "Buenavista", "Caragumihan", "Danao", "Eastern Poblacion", "Ginitligan", "Guinsaanan", "J. M. Alberto", "Macutal", "Moning", "Nagbarorong", "Osmeña", "P. Teston", "Paniquihan", "Puraran", "Putsan", "Quezon", "Rizal", "Sagrada", "Salvacion", "San Lorenzo", "San Miguel", "Santa Maria", "Tilod", "Western Poblacion"],
        "Bato": ["Aroyao Pequeño", "Bagumbayan", "Banawang", "Batalay", "Binanuahan", "Bote", "Buenavista", "Cabugao", "Cagraray", "Carorian", "Guinobatan", "Ilawod", "Libjo", "Libod Poblacion", "Marinawa", "Mintay", "Oguis", "Pananaogan", "San Andres", "San Pedro", "San Roque", "Santa Isabel", "Sibacungan", "Sipi", "Talisay", "Tamburan", "Tilis"],
        "Caramoran": ["Baybay", "Bocon", "Bothoan", "Buenavista", "Bulalacao", "Camburo", "Dariao", "Datag East", "Datag West", "Guiamlong", "Hitoma", "Icanbato", "Inalmasinan", "Iyao", "Mabini", "Maui", "Maysuran", "Milaviga", "Obi", "Panique", "Sabangan", "Sabloyon", "Salvacion", "Supang", "Toytoy", "Tubli", "Tucao"],
        "Gigmoto": ["Biong", "Dororian", "Poblacion District I", "Poblacion District II", "Poblacion District III", "San Pedro", "San Vicente", "Sicmil", "Sioron"],
        "Pandan": ["Bagawang", "Balagñonan", "Baldoc", "Canlubi", "Catamban", "Cobo", "Hiyop", "Libod", "Lourdes", "Lumabao", "Marambong", "Napo", "Oga", "Pandan del Norte", "Pandan del Sur", "Panuto", "Porot", "Salvacion", "San Andres", "San Isidro", "San Rafael", "San Roque", "Santa Cruz", "Tabugoc", "Tokio", "Wagdas"],
        "Panganiban": ["Alinawan", "Babaguan", "Bagong Bayan", "Burabod", "Cabuyoan", "Cagdarao", "Mabini", "Maculiw", "Panay", "Salvacion", "San Antonio", "San Joaquin", "San Jose", "San Juan", "San Miguel", "San Nicolas", "San Pedro", "San Vicente", "Santa Ana", "Santa Maria", "Santo Santiago", "Taopon", "Tibo"],
        "San Andres": ["Agojo", "Alibuag", "Asgad", "Bagong Sirang", "Barihay", "Batong Paloway", "Belmonte", "Bislig", "Bon-ot", "Cabcab", "Cabungahan", "Carangag", "Catagbacan", "Codon", "Comagaycay", "Datag", "Divino Rostro", "Esperanza", "Hilawan", "Lictin", "Lubas", "Manambrag", "Mayngaway", "Palawig", "Puting Baybay", "Rizal", "Salvacion", "San Isidro", "San Jose", "San Roque", "San Vicente", "Santa Cruz", "Sapang Palay", "Tibang", "Timbaan", "Tominawog", "Wagdas", "Yocti"],
        "San Miguel": ["Atsan", "Balatohan", "Boton", "Buhi", "Dayawa", "J. M. Alberto", "Katipunan", "Kilikilihan", "Mabato", "Obo", "Pacogon", "Pagsangahan", "Pangilao", "Paraiso", "Poblacion District II", "Poblacion District III", "Progreso", "Salvacion", "San Juan", "San Marcos", "Santa Elena", "Siay", "Solong", "Tobrehon"],
        "Viga": ["Almojuela", "Ananong", "Asuncion", "Batohonan", "Begonia", "Botinagan", "Buenavista", "Burgos", "Del Pilar", "Mabini", "Magsaysay", "Ogbong", "Osmeña", "Pedro Vera", "Peñafrancia", "Quezon", "Quirino", "Rizal", "Roxas", "Sagrada", "San Isidro", "San Jose Oco", "San Jose Poblacion", "San Pedro", "San Roque", "San Vicente", "Santa Rosa", "Soboc", "Tambongon", "Tinago", "Villa Aurora"],
        "Virac": ["Antipolo del Norte", "Antipolo del Sur", "Balite", "Batag", "Bigaa", "Buenavista", "Buyo", "Cabihian", "Calabnigan", "Calampong", "Calatagan Proper", "Calatagan Tibang", "Capilihan", "Casoocan", "Cavinitan", "Concepcion", "Constantino", "Danicop", "Dugui San Isidro", "Dugui San Vicente", "Dugui Too", "F. Tacorda Village", "Francia", "Gogon Centro", "Gogon Sirangan", "Hawan Grande", "Hawan Ilaya", "Hicming", "Ibong Sapa", "Igang", "Juan M. Alberto", "Lanao", "Magnesia del Norte", "Magnesia del Sur", "Marcelo Alberto", "Marilima", "Pajo Baguio", "Pajo San Isidro", "Palnab del Norte", "Palnab del Sur", "Palta Big", "Palta Salvacion", "Palta Small", "Rawis", "Salvacion", "San Isidro Village", "San Jose", "San Juan", "San Pablo", "San Pedro", "San Roque", "San Vicente", "Santa Cruz", "Santa Elena", "Santo Cristo", "Santo Domingo", "Santo Niño", "Simamla", "Sogod-Simamla", "Sogod-Tibgao", "Talisoy", "Tubaon", "Valencia"]
      },

    },
    "Cavite": {
      cities: {
        "Alfonso": ["Amuyong", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Bilog", "Buck Estate", "Esperanza Ibaba", "Esperanza Ilaya", "Kaysuyo", "Kaytitinga I", "Kaytitinga II", "Kaytitinga III", "Luksuhin", "Luksuhin Ilaya", "Mangas I", "Mangas II", "Marahan I", "Marahan II", "Matagbak I", "Matagbak II", "Pajo", "Palumlum", "Santa Teresa", "Sikat", "Sinaliw Malaki", "Sinaliw na Munti", "Sulsugin", "Taywanak Ibaba", "Taywanak Ilaya", "Upli"
        ],
        "Amadeo": ["Banaybanay", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay IX", "Barangay V", "Barangay VI", "Barangay VII", "Barangay VIII", "Barangay X", "Barangay XI", "Barangay XII", "Bucal", "Buho", "Dagatan", "Halang", "Loma", "Maitim I", "Maymangga", "Minantok Kanluran", "Minantok Silangan", "Pangil", "Salaban", "Talon", "Tamacan"
        ],
        "Carmona": ["Adlas", "Bancal", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Barangay VII", "Barangay VIII", "Barangay IX", "Barangay X", "Barangay XI", "Barangay XII", "Barangay XIII", "Barangay XIV", "Cabilang Baybay", "Lantic", "Mabuhay", "Maduya", "Milagrosa"
        ],
        "Dasmariñas": ["Burol", "Burol II", "Burol III", "Datu Esmael", "Emilio Aguinaldo", "Fatima I", "Fatima II", "Fatima III", "Fatima IV", "Fatima V", "H-2", "Langkaan I", "Langkaan II", "Luzviminda I", "Luzviminda II", "Paliparan I", "Paliparan II", "Paliparan III", "Salitran I", "Salitran II", "Salitran III", "Salitran IV", "Salawag", "San Agustin I", "San Agustin II", "San Agustin III", "San Agustin IV", "San Antonio de Padua", "San Jose", "San Manuel", "San Marino City", "San Mateo", "San Miguel", "San Nicolas I", "San Nicolas II", "San Nicolas III", "San Roque", "Santa Cristina I", "Santa Cristina II", "Santo Cristo", "Santo Niño", "Victoria Reyes", "Zone I", "Zone II", "Zone III", "Zone IV"
        ],
        "Gen. Emilio Aguinaldo": ["Dalanghita", "Kaypaaba", "Lumipa", "Nabulnay", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion V", "Poblacion VI", "Poblacion VII", "Poblacion VIII", "Poblacion IX", "Poblacion X", "Poblacion XI", "Poblacion XII"
        ],
        "General Mariano Alvarez (GMA)": ["F. Reyes", "Francisco de Castro", "Gavino Maderan", "J. P. Rizal", "Macaria Asuncion", "Marcelino Memije", "Nicolasa Virata", "Pantaleon Granados", "Ramon Cruz", "San Gabriel", "San Jose", "San Juan", "San Pedro", "San Rafael", "San Vicente", "Tiniente Tiago"
        ],
        "Imus": ["Alapan I-A", "Alapan I-B", "Alapan I-C", "Alapan II-A", "Alapan II-B", "Alapan II-C", "Anabu I-A", "Anabu I-B", "Anabu II-A", "Anabu II-B", "Anabu II-C", "Anabu II-D", "Anabu II-E", "Anabu II-F", "Anabu II-G", "Anabu II-H", "Bayan Luma I", "Bayan Luma II", "Bayan Luma III", "Bayan Luma IV", "Bayan Luma V", "Bayan Luma VI", "Bayan Luma VII", "Bayan Luma VIII", "Bayan Luma IX", "Bucandala I", "Bucandala II", "Bucandala III", "Bucandala IV", "Bucandala V", "Carsadang Bago I", "Carsadang Bago II", "Magdalo", "Malagasang I-A", "Malagasang I-B", "Malagasang I-C", "Malagasang I-D", "Malagasang I-E", "Malagasang II-A", "Malagasang II-B", "Malagasang II-C", "Malagasang II-D", "Pag-asa I", "Pag-asa II", "Pag-asa III", "Pag-asa IV", "Pasong Buaya I", "Pasong Buaya II", "Pinagbuklod", "Tanzang Luma I", "Tanzang Luma II", "Tanzang Luma III", "Tanzang Luma IV", "Tanzang Luma V", "Toclong I-A", "Toclong I-B", "Toclong II-A", "Toclong II-B"
        ],
        "Indang": ["Alulod", "Bancod", "Batas", "Bungahan", "Calumpang Cerca", "Calumpang Lejos", "Carasuchi", "Kayquit I", "Kayquit II", "Kayquit III", "Limbon-Limbonan", "Lucsuhin", "Mahabang Kahoy Cerca", "Mahabang Kahoy Lejos", "Mataas na Lupa", "Tambo Balagbag", "Tambo Ilaya", "Tambo Kulit", "Tukay"
        ],
        "Kawit": ["Batong Dalig", "Binakayan", "Congbalay Lay Sub-Colony", "Kaingen", "Magdalo", "Marulas", "Panamitan", "Pulvorista", "Samala-Marquez", "San Sebastian", "Santa Isabel", "Tabon I", "Tabon II", "Tabon III"
        ],
        "Magallanes": ["Bendita I", "Bendita II", "Cabuco", "Dalig", "Pacheco", "Ramirez", "San Agustin", "San Francisco", "San Ildefonso", "San Jose", "San Miguel", "San Pablo", "Tua"
        ],
        "Maragondon": ["Bucal", "Caingin", "Garita A", "Garita B", "Layong Mabilog", "Mabato", "Pantihan I", "Pantihan II", "Pantihan III", "Pantihan IV", "Pinagsanhan A", "Pinagsanhan B", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Talipusngo"
        ],
        "Mendez": ["Anuling Lejos I", "Anuling Lejos II", "Anuling Lejos III", "Anuling Cerca I", "Anuling Cerca II", "Asis I", "Asis II", "Asis III", "Banaybanay", "Kaybagal", "Palocpoc I", "Palocpoc II", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion V", "Poblacion VI", "Poblacion VII"
        ],
        "Naic": ["Bagong Kalsada", "Balsahan", "Bucana Malaki I", "Bucana Malaki II", "Bucana Sasahan", "Calangay", "Halang", "Hibaybay", "Ibayo Estacion", "Ibayo Silangan", "Kanluran", "Labac", "Malainen Bago", "Malainen Luma", "Munting Mapino", "Munting Mapino II", "Perez", "San Antonio I", "San Antonio II", "San Roque", "Santa Ana", "Santo Domingo", "Soro-Soro", "Tabon", "Timalan Balsahan", "Timalan Concepcion"
        ],
        "Noveleta": ["Magdiwang", "Poblacion", "Salcedo I", "Salcedo II", "San Antonio I", "San Antonio II", "San Jose I", "San Jose II", "San Juan I", "San Juan II", "San Rafael I", "San Rafael II", "Santa Rosa I", "Santa Rosa II"
        ],
        "Rosario": ["Baclaran", "Bagbag I", "Bagbag II", "Bagbaguin", "Kanluran", "Ligtong I", "Ligtong II", "Ligtong III", "Ligtong IV", "Poblacion", "Sapa I", "Sapa II", "Sapa III", "Sapa IV", "Tejeros Convention"
        ],
        "Silang": ["Adlas", "Balite I", "Balite II", "Banaba Cerca", "Banaba Lejos", "Bucal", "Carmen", "Hoyo", "Iba", "Inchican", "Kalubkob", "Kaong", "Lalaan I", "Lalaan II", "Lumil", "Maguyam", "Malabag", "Mangas I", "Mangas II", "Mataas na Burol", "Pooc I", "Pooc II", "Pulong Bunga", "Puting Kahoy", "Sabutan", "San Miguel I", "San Miguel II", "Santol", "Sungay", "Tartaria", "Tubuan I", "Tubuan II", "Tungkong Mangga"
        ],
        "Tagaytay": ["Asisan", "Bagong Tubig", "Calabuso", "Dapdap East", "Dapdap West", "Guinhawa North", "Guinhawa South", "Iruhin Central", "Iruhin East", "Iruhin South", "Iruhin West", "Kaybagal Central", "Kaybagal East", "Kaybagal South", "Maharlika East", "Maharlika West", "Maitim 2nd Central", "Maitim 2nd East", "Maitim 2nd West", "Mendez Crossing East", "Mendez Crossing West", "Neogan", "Patutong Malaki North", "Patutong Malaki South", "San Jose", "Silang Junction North", "Silang Junction South", "Tolentino East", "Tolentino West", "Zambal"
        ],
        "Tanza": ["Amaya I", "Amaya II", "Amaya III", "Amaya IV", "Amaya V", "Amaya VI", "Amaya VII", "Bagtas", "Biga", "Bucal", "Calibuyo", "Capipisa", "Daang Amaya I", "Daang Amaya II", "Daang Amaya III", "Halayhay", "Julugan I", "Julugan II", "Julugan III", "Julugan IV", "Lambingan", "Luma", "Punta Uno", "Sanja Mayor", "Santo Domingo", "Sapang I", "Sapang II", "Tres Cruses"
        ],
        "Ternate": ["Asinan", "Bucana", "Carabao Island", "Halayhay", "Pob. Barangay I", "Pob. Barangay II", "Pob. Barangay III", "Pob. Barangay IV", "Punta Baja", "Sapang", "Sapangan", "San Juan I", "San Juan II"
        ]
      },

    }, "Cebu": {
      cities: {
        "Alcantara": ["Cabadiangan", "Cabil-isan", "Candabong", "Lawaan", "Manga", "Palanas", "Poblacion", "Polo", "Salagmaya"
        ],
        "Alcoy": ["Atabay", "Daan-Lungsod", "Guiwang", "Nug-as", "Pasol", "Poblacion", "Pugalo", "San Agustin"
        ],
        "Alegria": ["Compostela", "Guadalupe", "Legaspi", "Lepanto", "Madridejos", "Montpeller", "Poblacion", "Santa Filomena", "Valencia"
        ],
        "Aloguinsan": ["Angilan", "Bojo", "Bonbon", "Esperanza", "Kandingan", "Kantabogon", "Kawasan", "Olango", "Poblacion", "Punay", "Rosario", "Saksak", "Tampa-an", "Toyokon", "Zaragosa"
        ],
        "Argao": ["Alambijud", "Anajao", "Apo", "Balaas", "Balisong", "Binlod", "Bogo", "Bug-ot", "Bulasa", "Butong", "Calagasan", "Canbantug", "Canbanua", "Cansuje", "Capio-an", "Casay", "Catang", "Colawin", "Conalum", "Guiwanon", "Gutlang", "Jampang", "Jomgao", "Lamacan", "Langtad", "Langub", "Lapay", "Lengigon", "Linut-od", "Mabasa", "Mandilikit", "Mompeller", "Panadtaran", "Poblacion", "Sua", "Sumaguan", "Tabayag", "Talaga", "Talaytay", "Talo-ot", "Tiguib", "Tulang", "Tulic", "Ubaub", "Usmad"
        ],
        "Asturias": ["Agbanga", "Agtugop", "Bago", "Bairan", "Banban", "Baye", "Bog-o", "Kaluangan", "Lanao", "Langub", "Looc Norte", "Lunas", "Magcalape", "Manguiao", "New Bago", "Owak", "Poblacion", "Saksak", "San Isidro", "San Roque", "Santa Lucia", "Santa Rita", "Tag-amakan", "Tagbubonga", "Tubigagmanok", "Tubod", "Ubogon"
        ],
        "Badian": ["Alawijao", "Balhaan", "Banhigan", "Basak", "Basiao", "Bato", "Bugas", "Calangcang", "Candiis", "Dagatan", "Dobdob", "Ginablan", "Lambug", "Malabago", "Malhiao", "Manduyong", "Matutinao", "Patong", "Poblacion", "Sanlagan", "Santicon", "Sohoton", "Sulsugan", "Talayong", "Taytay", "Tigbao", "Tiguib", "Tubod", "Zaragosa"
        ],
        "Balamban": ["Abucayan", "Aliwanay", "Arpili", "Baliwagan", "Bayong", "Biasong", "Buanoy", "Cabagdalan", "Cabasiangan", "Cambuhawe", "Cansomoroy", "Cantibas", "Cantuod", "Duangan", "Gaas", "Ginatilan", "Hingatmonan", "Lamesa", "Liki", "Luca", "Matun-og", "Nangka", "Pondol", "Prenza", "Santa Cruz-Santo Niño", "Singsing", "Sunog", "Vito"
        ],
        "Bantayan": ["Atop-atop", "Baigad", "Bantigue", "Baod", "Binaobao", "Botigues", "Doong", "Guiwanon", "Hilotongan", "Kabac", "Kabangbang", "Kampingganon", "Kangkaibe", "Lipayran", "Luyongbaybay", "Mojon", "Obo-ob", "Patao", "Putian", "Sillon", "Suba", "Sulangan", "Sungko", "Tamiao", "Ticad"
        ],
        "Barili": ["Azucena", "Bagakay", "Balao", "Bolocboloc", "Budbud", "Bugtong Kawayan", "Cabcaban", "Cagay", "Campangga", "Candugay", "Dakit", "Giloctog", "Giwanon", "Guibuangan", "Gunting", "Hilasgasan", "Japitan", "Kalubihan", "Kangdampas", "Luhod", "Lupo", "Luyo", "Maghanoy", "Maigang", "Malolos", "Mantalongon", "Mantayupan", "Mayana", "Minolos", "Nabunturan", "Nasipit", "Pancil", "Pangpang", "Paril", "Patupat", "Poblacion", "San Rafael", "Santa Ana", "Sayaw", "Tal-ot", "Tubod", "Vito"
        ],
        "Bogo": ["Anonang Norte", "Anonang Sur", "Banban", "Binabag", "Bungtod", "Carbon", "Cayang", "Cogon", "Dakit", "Don Pedro Rodriguez", "Gairan", "Guadalupe", "La Paz", "La Purisima Concepcion", "Libertad", "Lourdes", "Malingin", "Marangog", "Nailon", "Odlot", "Pandan", "Polambato", "Sambag", "San Vicente", "Santo Niño", "Santo Rosario", "Siocon", "Sudlonon", "Taytayan"
        ],
        "Boljoon": ["Arbor", "Baclayan", "El Pardo", "Granada", "Lower Becerril", "Lunop", "Nangka", "Poblacion", "San Antonio", "South Granada", "Upper Becerril"
        ],
        "Carcar": ["Bolinawan", "Buenavista", "Calidngan", "Can-asujan", "Guadalupe", "Liburon", "Napo", "Ocana", "Perrelos", "Poblacion I", "Poblacion II", "Poblacion III", "Tuyom", "Valencia", "Valladolid"
        ],
        "Carmen": ["Baring", "Cantipay", "Cantukong", "Cantumog", "Caurasan", "Cogon East", "Cogon West", "Corte", "Dawis Norte", "Dawis Sur", "Hagnaya", "Ipil", "Lanipga", "Liboron", "Lower Natimao-an", "Luyang", "Poblacion", "Puente", "Sac-on", "Triumfo", "Upper Natimao-an"
        ],
        "Catmon": ["Agsuwao", "Amancion", "Anapog", "Bactas", "Basak", "Binongkalan", "Bongyas", "Cabungaan", "Cambangkaya", "Can-ibuang", "Catmondaan", "Corazon", "Duyan", "Flores", "Ginabucan", "Macaas", "Panalipan", "San Jose Poblacion", "Tabili", "Tinabyonan"
        ],
        "Compostella": ["Bagalnga", "Basak", "Buluang", "Cabadiangan", "Cambayog", "Canamucan", "Cogon", "Dapdap", "Estaca", "Lupa", "Magay", "Mulao", "Panangban", "Poblacion", "Tag-ube", "Tamiao", "Tubigan"],

        "Consolacion": ["Cabangahan", "Cansaga", "Casili", "Danglag", "Garing", "Jugan", "Lamac", "Lanipga", "Nangka", "Panas", "Panoypoy", "Pitogo", "Poblacion Occidental", "Poblacion Oriental", "Polog", "Pulpogan", "Sacsac", "Tayud", "Tilhaong", "Tolotolo", "Tugbongan"],
        "Cordova": ["Alegria", "Bangbang", "Buagsong", "Catarman", "Cogon", "Dapitan", "Day-as", "Gabi", "Gilutongan", "Ibabao", "Pilipog", "Poblacion", "San Miguel"],
        "Daanbantayan": ["Aguho", "Bagay", "Bakhawan", "Bateria", "Bitoon", "Calape", "Carnaza", "Dalingding", "Lanao", "Logon", "Malbago", "Malingin", "Maya", "Pajo", "Paypay", "Poblacion", "Talisay", "Tapilon", "Tinubdan", "Tominjao"],
        "Dalaguete": ["Ablayan", "Babayongan", "Balud", "Banhigan", "Bulak", "Caleriohan", "Caliongan", "Casay", "Catolohan", "Cawayan", "Consolacion", "Coro", "Dugyan", "Dumalan", "Jolomaynon", "Lanao", "Langkas", "Lumbang", "Malones", "Maloray", "Mananggal", "Manlapay", "Mantalongon", "Nalhub", "Obo", "Obong", "Panas", "Poblacion", "Sacsac", "Salug", "Tabon", "Tapun", "Tuba"],
        "Danao": ["Baliang", "Bayabas", "Binaliw", "Cabungahan", "Cagat-Lamac", "Cahumayan", "Cambanay", "Cambubho", "Cogon-Cruz", "Danasan", "Dungga", "Dunggoan", "Guinacot", "Guinsay", "Ibo", "Langosig", "Lawaan", "Licos", "Looc", "Magtagobtob", "Malapoc", "Manlayag", "Mantija", "Masaba", "Maslog", "Nangka", "Oguis", "Pili", "Poblacion", "Quisol", "Sabang", "Sacsac", "Sandayong Norte", "Sandayong Sur", "Santa Rosa", "Santican", "Sibacan", "Suba", "Taboc", "Taytay", "Togonon", "Tuburan Sur"],
        "Dumanjug": ["Balaygtiki", "Bitoon", "Bulak", "Bullogan", "Calaboon", "Camboang", "Candabong", "Cogon", "Cotcoton", "Doldol", "Ilaya", "Kabalaasnan", "Kabatbatan", "Kambanog", "Kang-actol", "Kanghalo", "Kanghumaod", "Kanguha", "Kantangkas", "Kanyuko", "Kolabtingon", "Lamak", "Lawaan", "Liong", "Manlapay", "Masa", "Matalao", "Paculob", "Panlaan", "Pawa", "Poblacion Central", "Poblacion Looc", "Poblacion Sima", "Tangil", "Tapon", "Tubod-Bitoon", "Tubod-Dugoan"],
        "Ginatilan": ["Anao", "Cagsing", "Calabawan", "Cambagte", "Campisong", "Canorong", "Guiwanon", "Looc", "Malatbo", "Mangaco", "Palanas", "Poblacion", "Salamanca", "San Roque"],
        "Liloan": ["Cabadiangan", "Calero", "Catarman", "Cotcot", "Jubay", "Lataban", "Mulao", "Poblacion", "San Roque", "San Vicente", "Santa Cruz", "Tabla", "Tayud", "Yati"],
        "Madridejos": ["Bunakan", "Kangwayan", "Kaongkod", "Kodia", "Maalat", "Malbago", "Mancilang", "Pili", "Poblacion", "San Agustin", "Tabagak", "Talangnan", "Tarong", "Tugas"],
        "Malabuyoc": ["Armeña", "Barangay I", "Barangay II", "Cerdeña", "Labrador", "Lombo", "Looc", "Mahanlud", "Mindanao", "Montañeza", "Salmeron", "Santo Niño", "Sorsogon", "Tolosa"],
        "Mandaue": [],
        "Medellin": ["Antipolo", "Canhabagat", "Caputatan Norte", "Caputatan Sur", "Curva", "Daanlungsod", "Dalingding Sur", "Dayhagon", "Don Virgilio Gonzales", "Gibitngil", "Kawit", "Lamintak Norte", "Lamintak Sur", "Luy-a", "Maharuhay", "Mahawak", "Panugnawan", "Poblacion", "Tindog"],
        "Minglanilla": ["Cadulawan", "Calajo-an", "Camp 7", "Camp 8", "Cuanos", "Guindaruhan", "Linao", "Manduang", "Pakigne", "Poblacion Ward I", "Poblacion Ward II", "Poblacion Ward III", "Poblacion Ward IV", "Tubod", "Tulay", "Tunghaan", "Tungkil", "Tungkop", "Vito"],
        "Moalboal": ["Agbalanga", "Bala", "Balabagon", "Basdiot", "Batadbatad", "Bugho", "Buguil", "Busay", "Lanao", "Poblacion East", "Poblacion West", "Saavedra", "Tomonoy", "Tuble", "Tunga"],
        "Naga": [
          "Aloguinsan", "Balirong", "Cabungahan", "Cantao-an", "Central Poblacion", "East Poblacion", "Inayagan", "Inoburan", "Jagobiao", "Langtad", "Lanas", "Lutac", "Mainit", "Naalad", "Pangdan", "Patag", "Poblacion", "Sawang", "South Poblacion", "Tuyan", "West Poblacion"],
        "Oslob": ["Alo", "Bangcogon", "Bonbon", "Calumpang", "Cañang", "Cuancua-ay", "Daanlungsod", "Gawi", "Hagdan", "Lagunde", "Luka", "Mainit", "Poblacion", "Tan-awan", "Tumalog"],
        "Pilar": ["Biasong", "Buenavista", "Cawit", "Cawit San Roque", "Lanao", "Lower Poblacion", "Moabog", "Montserrat", "Poblacion", "San Isidro", "Upper Poblacion"],
        "Pinamungahan": ["Anislag", "Binabag", "Buagsong", "Busay", "Butong", "Camugao", "Capiñahan", "Doldol", "Don Gregorio Antigua", "Don Pedro Rodriguez", "Duangan", "Escondido", "Garing", "Guimbawian", "Lamac", "Lusaran", "Malatbo", "Manatad", "Mangoto", "Opao", "Poblacion", "Punta", "Sacsac", "Sibago", "Tajao", "Tangub", "Tanibag", "Tapilon", "Tubod"],
        "Poro": ["Adela", "Altavista", "Cansabusab", "Cantu-od", "Esperanza", "Jubang", "Lam-an", "Libertad", "Mabini", "Maya", "Pagsa", "Patupat", "Poblacion", "San Jose", "Santa Rosa", "Santo Niño", "Tudela"],
        "Ronda": ["Butong", "Can-abuhon", "Canduling", "Cansalonoy", "Ilaya", "Langin", "Libo", "Lom-an", "Malalay", "Palanas", "Poblacion", "Saksak", "Sampong", "Santa Cruz", "Tupas"],
        "Samboan": ["Basak", "Bonbon", "Calatagan", "Camagayan", "Canang", "Canlumacad", "Colase", "Japon", "Monteverde", "Poblacion", "San Sebastian", "Suba"],
        "San Fernando": ["Balungag", "Basak", "Bugho", "Cabatbatan", "Greenhills", "Ilaya", "Lunocan", "Magsico", "North Poblacion", "Panadtaran", "Pitalo", "Poblacion", "San Isidro", "Sangat", "South Poblacion", "Tabunan", "Tananas", "Tindog", "Tinubdan", "Tonggo"],
        "San Francisco": ["Cabayugan", "Esperanza", "Hilotongan", "Himensulan", "Northern Poblacion", "San Isidro", "San Miguel", "Santa Cruz", "Santiago", "Southern Poblacion", "Tongo", "Union"],
        "San Remigio": ["Argawanon", "Bagtik", "Banban", "Busogon", "Calambua", "Canagahan", "Can-asujan", "Dapdap", "Gawaygaway", "Hagnaya", "Kawit", "Lambusan", "Lawis", "Looc", "Luyang", "Manatad", "Poblacion", "Sab-a", "San Miguel", "Tambongon", "Taytay", "To-ong"],
        "Santa Fe": ["Balidbid", "Hilantagaan", "Langub", "Maricaban", "Okoy", "Poblacion", "Pooc", "Suba", "Talisay"],
        "Santader": ["Bunlan", "Canlumacad", "Lip-tong", "Looc", "Luca", "Pasil", "Poblacion", "San Jose", "Talisay", "Taytay"],
        "Sibonga": ["Abugon", "Bagacay", "Bagalnga", "Banlot", "Basak", "Basak-San Vicente", "Batadbatad", "Bolokbolok", "Cagay", "Cadandanan", "Calape", "Can-aban", "Candaguit", "Cangdungon", "Cotcot", "Gawi", "Guinbonlan", "Langtad", "Lindogon", "Manatad", "Mangyan", "Mompeller", "Papan", "Poblacion", "Sabang", "San Isidro", "Simala", "Tag-lorong", "Togonon"],
        "Sogod": ["Ampongan", "Bagatayam", "Bagatayam Norte", "Bagatayam Sur", "Bawo", "Cabangahan", "Calumboyan", "Damolog", "Ibabao", "Junyao", "Liki", "Libertad", "Lunocan", "Mohon", "Nahus-an", "Poblacion", "Tabunok", "Tindog", "Tugas"],
        "Tabogon": ["Caduawan", "Camoboan", "Canlambong", "Gibitngil", "Libaong", "Libjo", "Mabunao", "Managase", "Maslog", "Olot", "Pance", "Poblacion", "Salag", "Salvacion", "San Isidro", "San Vicente", "Tabok", "Taytayan"],
        "Tabuelan": ["Agsungot", "Bitoon", "Bongon", "Calambua", "Dalid", "Kanluhangon", "Lamac", "Maravilla", "Mohon", "Olivo", "Poblacion", "Tabunok", "Taytay", "Tugatug"],
        "Talisay": ["Biasong", "Camp 1", "Camp 2", "Cansojong", "Dumlog", "Jaclupan", "Lawaan I", "Lawaan II", "Lawaan III", "Linao", "Maghaway", "Manipis", "Poblacion", "Pooc", "San Isidro", "San Roque", "Tabunok", "Tangke"],
        "Toledo": ["Awihao", "Biga", "Bungtod", "Bunga", "Bulongan", "Cabitoonan", "Cambang-ug", "Canlumampao", "Cantabaco", "Capitan Claudio", "Daanglungsod", "Don Andres Soriano", "Dumlog", "General Climaco", "Ibo", "Lamesa", "Loay", "Magdugo", "Media Once", "Pangamihan", "Poblacion", "Poog", "Putingbato", "Sagay", "Sangi", "Subayon", "Talavera", "Tubod", "Tuburan", "Ubog"],
        "Tuburan": ["Albano", "Bagasawe", "Bagatayam", "Bangbang", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Barangay VII", "Barangay VIII", "Buanoy", "Bulwang", "Camboang", "Cangmating", "Carmen", "Colonia", "Daanlungsod", "Kalangahan", "Kan-an", "Kansi", "Lanas", "Lantawan", "Lupiagan", "Mag-atubang", "Molobolo", "Montealegre", "San Juan", "Sandayong", "Santo Niño", "Sumon"],
        "Tudela": ["Buenavista", "Calambua", "Calangcang", "Casili", "Central", "Daantabogon", "General Luna", "McArthur", "Northern Poblacion", "Poblacion", "Puertobello", "Salag", "San Isidro", "San Pedro", "Santo Niño", "Southern Poblacion", "Villahermosa"]
      },

    },
    "Cotabato": {
      cities: {
        "Alamada": ["Bao",
          "Barangiran",
          "Camansi",
          "Dado",
          "Guiling",
          "Kitacubong",
          "Lower Dado",
          "Macabasa",
          "Malitubog",
          "Mapurok",
          "Mirasol",
          "Pacao",
          "Paruayan",
          "Pigcawaran",
          "Polayagan",
          "Rangayen",
          "Raradangan"],
        "Aleosan": ["Bagolibas", "Cawilihan", "Dualing", "Dunguan", "Katalicanan", "Lawili", "LowerMingading", "Luanan", "Malapang", "NewLeon", "NewPanay", "Pagangan", "Palacat", "Pentil", "SanMateo", "SantaCruz", "Tapodoc", "Tomado", "UpperMingading"],
        "Antipas": ["B.Cadungon", "Camutan", "Canaan", "DatuAgod", "Dolores", "Kiyaab", "Luhong", "Magsaysay", "Malangag", "Malatad", "Malire", "NewPontevedra", "Poblacion"],
        "Arakan": ["Allab", "Anapolon", "Badiangon", "Binoongan", "Dallag", "DatuLadayon", "DatuMatangkil", "Doroluman", "Gambodes", "Ganatan", "Greenfield", "Kabalantian", "Katipunan", "Kinawayan", "KulamanValley", "LanaoKuran", "Libertad", "Makalangot", "Malibatuan", "MariaCaridad", "Meocan", "Naje", "Napalico", "Salasang", "SanMiguel", "SantoNiño", "Sumalili", "Tumanding"],
        "Banisilan": ["BanisilanPoblacion", "Busaon", "Capayangan", "Carugmanan", "Gastay", "Kalawaig", "Kiaring", "Malagap", "Malinao", "MiguelMacasarte", "Pantar", "Paradise", "Pinamulaan", "PoblacionII", "Puting-bato", "Solama", "Thailand", "Tinimbacan", "Tumbao-Camalig", "Wadya"],
        "Carmen": ["Aroman", "Bentangan", "Cadiis", "GeneralLuna", "Katanayanan", "Kib-ayao", "Kibenes", "Kibugtongan", "Kilala", "Kimadzil", "Kitulaan", "Langogan", "Lanoon", "Liliongan", "Macabenban", "Malapag", "Manarapan", "Manili", "Nasapian", "Palanggalan", "Pebpoloan", "Poblacion", "Ranzo", "Tacupan", "Tambad", "Tonganon", "Tupig", "Ugalingan"],
        "Kabacan": ["Aringay", "Bangilan", "Bannawag", "Buluan", "Cuyapon", "Dagupan", "Katidtuan", "Kayaga", "Kilagasan", "Magatos", "Malamote", "Malanduague", "Nanga-an", "Osias", "PaatanLower", "PaatanUpper", "Pedtad", "Pisan", "Poblacion", "Salapungan", "Sanggadong", "Simbuhay", "Simone", "Tamped"],
        "Kidapawan": ["Amas", "Amazion", "Balabag", "Balindog", "Benoligan", "Berada", "Gayola", "Ginatilan", "Ilomavis", "Indangan", "Junction", "Kalaisan", "Kalasuyan", "Katipunan", "Lanao", "Linangcob", "Luvimin", "Macabolig", "Magsaysay", "Malinan", "Manongol", "Marbel", "Mateo", "Meochao", "Mua-an", "NewBohol", "Nuangan", "Onica", "Paco", "Patadon", "Perez", "Poblacion", "SanIsidro", "SanRoque", "SantoNiño", "Sibawan", "Sikitan", "Singao", "Sudapin", "Sumbao"],
        "Libungan": ["Abaga", "Baguer", "Barongis", "Batiocan", "Cabaruyan", "Cabpangi", "Demapaco", "Grebona", "Gumaga", "Kapayawi", "Kiloyao", "Kitubod", "Malengen", "Montay", "Nica-an", "Palao", "Poblacion", "Sinapangan", "Sinawingan", "Ulamian"],
        "M'lang": ["Bagontapay", "Bialong", "Buayan", "Calunasan", "Dagong", "Dalipe", "Dungo-an", "Gaunan", "Inas", "Katipunan", "LaFortuna", "LaSuerte", "Langkong", "Lepaga", "Liboo", "Lika", "LuzVillage", "Magallon", "Malayan", "NewAntique", "NewBarbaza", "NewConsolacion", "NewEsperanza", "NewJaniuay", "NewKalibo", "NewLawa-an", "NewRizal", "NuevaVida", "Pag-asa", "Palma-Perez", "Poblacion", "PoblacionB", "Pulang-lupa", "Sangat", "Tawantawan", "Tibao", "Ugpay"],
        "Magpet": ["Alibayon", "Amabel", "Bagumbayan", "Balete", "Bangkal", "Bantac", "Basak", "Binay", "Bongolanon", "DatuCelo", "DelPilar", "Doles", "DonPanaca", "Gubatan", "Ilian", "Imamaling", "Inac", "Kamada", "Kauswagan", "Kinarum", "Kisandal", "Magcaalam", "Mahongcog", "Manobisa", "Manobo", "Noa", "Owas", "Pangao-an", "Poblacion", "Sallab", "Tagbac", "Temporan"],
        "Makilala": ["Batasan", "Bato", "Biangan", "BuenaVida", "Buhay", "Bulakanon", "Cabilao", "Concepcion", "Dagupan", "Garsika", "Guangan", "Indangan", "JoseRizal", "KatipunanII", "Kawayanon", "Kisante", "Leboce", "Libertad", "Luayon", "LunaNorte", "LunaSur", "Malabuan", "Malasila", "Malungon", "NewBaguio", "NewBulatukan", "NewCebu", "NewIsrael", "OldBulatukan", "Poblacion", "Rodero", "Saguing", "SanVicente", "SantaFelomina", "SantoNiño", "Sinkatulan", "Taluntalunan", "Villaflores"],
        "Matalam": ["Arakan", "Bangbang", "Bato", "CentralMalamote", "Dalapitan", "Estado", "Ilian", "Kabulacan", "Kibia", "Kibudoc", "Kidama", "Kilada", "Lampayan", "Latagan", "Linao", "LowerMalamote", "Manubuan", "Manupal", "Marbel", "Minamaing", "Natutungan", "NewAbra", "NewAlimodian", "NewBugasong", "NewPandan", "PatadonWest", "Pinamaton", "Poblacion", "Salvacion", "SantaMaria", "Sarayan", "Taculen", "Taguranao", "Tamped"],
        "Midsayap": ["Agriculture", "Anonang", "Arizona", "Bagumba", "Baliki", "BarangayPoblacion1", "BarangayPoblacion2", "BarangayPoblacion3", "BarangayPoblacion4", "BarangayPoblacion5", "BarangayPoblacion6", "BarangayPoblacion7", "BarangayPoblacion8", "Bitoka", "BualNorte", "BualSur", "BulananUpper", "CentralBulanan", "CentralGlad", "CentralKatingawan", "CentralLabas", "Damatulan", "Ilbocean", "Kadigasan", "Kadingilan", "Kapinpilan", "Kimagango", "Kiwanan", "Kudarangan", "Lagumbingan", "Lomopog", "LowerGlad", "LowerKatingawan", "Macasendeg", "Malamote", "Malingao", "Milaya", "Mudseng", "Nabalawag", "Nalin", "Nes", "Olandang", "Palongoguen", "Patindeguen", "Rangaban", "Sadaan", "Salunayan", "Sambulawan", "SanIsidro", "SanPedro", "SantaCruz", "Tugal", "Tumbras", "UpperGladI", "UpperGladII", "UpperLabas", "Villarica"],
        "Pikit": ["Bagoaingud", "Balabak", "Balatican", "Balong", "Balungis", "Barungis", "Batulawan", "Bualan", "Buliok", "Bulod", "Bulol", "Calawag", "Dalingaoen", "Damalasak", "FortPikit", "Ginatilan", "Gligli", "Gokoton", "Inug-ug", "Kabasalan", "Kalacacan", "Katilacan", "Kolambog", "Ladtingan", "Lagunde", "Langayen", "Macabual", "Macasendeg", "Manaulanan", "Nabundas", "Nalapaan", "Nunguan", "PaiduPulangi", "Pamalian", "Panicupan", "Poblacion", "Punol", "RajahMuda", "Silik", "Takipan", "Talitay", "Tinutulan"],
        "Pigcawayan": ["Anick", "Balacayon", "Balogo", "Banucagon", "Buluan", "Bulucaon", "Buricain", "Cabpangi", "Capayuran", "CentralPanatan", "DatuBinasing", "DatuMantil", "Kadingilan", "Kimarayang", "LibunganTorreta", "LowerBaguer", "LowerPangangkalan", "Malagakit", "Maluao", "Matilac", "MidpapanI", "MidpapanII", "Mulok", "NewCulasi", "NewIgbaras", "NewPanay", "NorthManuangan", "Patot", "Payong-payong", "PoblacionI", "PoblacionII", "PoblacionIII", "Presbitero", "Renibon", "Simsiman", "SouthManuangan", "Tigbawan", "Tubon", "UpperBaguer", "UpperPangangkalan"],
        "President Roxas": ["Alegria", "Bato-bato", "Cabangbangan", "Camasi", "DatuIndang", "DatuSandongan", "DelCarmen", "F.Cajelo", "Greenhill", "Idaoman", "Ilustre", "Kamarahan", "Kimaruhing", "Kisupaan", "LaEsperanza", "Labu-o", "Lamalama", "Lomonay", "Mabuhay", "NewCebu", "Poblacion", "Sagcungan", "Salat", "Sarayan", "Tuael"],
        "Tulunan": ["Bacung", "Tulunan", "Bagumbayan", "Tulunan", "Banayal", "Tulunan", "Bituan", "Tulunan", "Dungos", "Tulunan", "Daig", "Tulunan", "Kanebong", "Tulunan", "Lampagang", "Tulunan", "Mangga", "Tulunan", "Minapan", "Tulunan", "Nabundasan", "Tulunan", "Palian", "Tulunan", "Paraiso", "Tulunan", "Popoyon", "Tulunan", "Poblacion", "Tulunan", "Sibsib", "Tulunan", "Tambac", "Tulunan", "Tuluan", "Tulunan", "Villegas", "Tulunan"
        ]
      },

    },
    "Davao de Oro": {
      cities: {
        "Compostela": [
          "Aurora", "Bagongon", "Gabi", "Lagab", "Mangayon", "Mapaca", "Maparat",
          "New Alegria", "Ngan", "Osmeña", "Panansalan", "Poblacion", "San Jose",
          "San Miguel", "Siocon", "Tamia"
        ],
        "Laak": [
          "Aguinaldo", "Amor Cruz", "Ampawid", "Andap", "Anitap", "Bagong Silang",
          "Banbanon", "Belmonte", "Binasbas", "Bullucan", "Cebulida", "Concepcion",
          "Datu Ampunan", "Datu Davao", "Doña Josefa", "El Katipunan", "Il Papa",
          "Imelda", "Inacayan", "Kaligutan", "Kapatagan", "Kidawa", "Kilagding",
          "Kiokmay", "Laac", "Langtud", "Longanapan", "Mabuhay", "Macopa", "Malinao",
          "Mangloy", "Melale", "Naga", "New Bethlehem", "Panamoren", "Sabud",
          "San Antonio", "Santa Emilia", "Santo Niño", "Sisimon"
        ],
        "Mabini": [
          "Anitapan", "Cabuyuan", "Cadunan", "Cuambog", "Del Pilar", "Golden Valley",
          "Libodon", "Pangibiran", "Pindasan", "San Antonio", "Tagnanan"
        ],
        "Maco": [
          "Anibongan", "Anislagan", "Binuangan", "Bucana", "Calabcab", "Concepcion",
          "Dumlan", "Elizalde", "Gubatan", "Hijo", "Kinuban", "Langgam", "Lapu-lapu",
          "Libay-libay", "Limbo", "Lumatab", "Magangit", "Mainit", "Malamodao",
          "Manipongol", "Mapaang", "Masara", "New Asturias", "New Barili", "New Leyte",
          "New Visayas", "Panangan", "Pangi", "Panibasan", "Panoraon", "Poblacion",
          "San Juan", "San Roque", "Sangab", "Tagbaros", "Taglawig", "Teresa"
        ],
        "Maragusan": [
          "Bagong Silang", "Bahi", "Cambagang", "Coronobe", "Katipunan", "Lahi",
          "Langgawisan", "Mabugnao", "Magcagong", "Mahayahay", "Mapawa", "Maragusan",
          "Mauswagon", "New Albay", "New Katipunan", "New Manay", "New Panay",
          "Paloc", "Pamintaran", "Parasanon", "Talian", "Tandik", "Tigbao", "Tupas"
        ],
        "Mawab": [
          "Andili", "Bawani", "Concepcion", "Malinawon", "Nueva Visayas",
          "Nuevo Iloco", "Poblacion", "Salvacion", "Saosao", "Sawangan", "Tuboran"
        ],
        "Monkayo": [
          "Awao", "Babag", "Banlag", "Baylo", "Casoon", "Haguimitan", "Inambatan",
          "Macopa", "Mamunga", "Mount Diwata", "Naboc", "Olaycon", "Pasian",
          "Poblacion", "Rizal", "Salvacion", "San Isidro", "San Jose", "Tubo-tubo",
          "Union", "Upper Ulip"
        ],
        "Montevista": [
          "Banagbanag", "Banglasan", "Bankerohan Norte", "Bankerohan Sur", "Camansi",
          "Camantangan", "Canidkid", "Concepcion", "Dauman", "Lebanon", "Linoan",
          "Mayaon", "New Calape", "New Cebulan", "New Dalaguete", "New Visayas",
          "Prosperidad", "San Jose", "San Vicente", "Tapia"
        ],
        "Nabunturan": [
          "Anislagan", "Antequera", "Basak", "Bayabas", "Bukal", "Cabacungan",
          "Cabidianan", "Katipunan", "Libasan", "Linda", "Magading", "Magsaysay",
          "Mainit", "Manat", "Matilo", "Mipangi", "New Dauis", "New Sibonga", "Ogao",
          "Pangutosan", "Poblacion", "San Isidro", "San Roque", "San Vicente",
          "Santa Maria", "Santo Niño", "Sasa", "Tagnocon"
        ],
        "New Bataan": [
          "Andap", "Bantacan", "Batinao", "Cabinuangan", "Camanlangan", "Cogonon",
          "Fatima", "Kahayag", "Katipunan", "Magangit", "Magsaysay", "Manurigao",
          "Pagsabangan", "Panag", "San Roque", "Tandawan"
        ],
        "Pantukan": [
          "Araibo", "Bongabong", "Bongbong", "Kingking", "Las Arenas", "Magnaga",
          "Matiao", "Napnapan", "P. Fuentes", "Tag-ugpo", "Tagdangua", "Tambongon",
          "Tibagon"
        ]
      },

    }, "Davao del Norte": {
      cities: {
        "Asuncion": [
          "Binancian", "Buan", "Buclad", "Cabaywa", "Camansa", "Cambanogoy", "Camoning", "Canatan", "Concepcion",
          "Doña Andrea", "Magatos", "Napungas", "New Bantayan", "New Loon", "New Santiago", "Pamacaun", "Sagayen",
          "San Vicente", "Santa Filomena", "Sonlon"
        ],
        "Braulio E. Dujali": [
          "Cabayangan", "Dujali", "Magupising", "New Casay", "Tanglaw"
        ],
        "Carmen": [
          "Alejal", "Anibongan", "Asuncion", "Cebulano", "Guadalupe", "Ising", "La Paz", "Mabaus", "Mabuhay",
          "Magsaysay", "Mangalcal", "Minda", "New Camiling", "Salvacion", "San Isidro", "Santo Niño", "Taba",
          "Tibulao", "Tubod", "Tuganay"
        ],
        "Kapalong": [
          "Capungagan", "Florida", "Gabuyan", "Gupitan", "Katipunan", "Luna", "Mabantao", "Mamacao", "Maniki",
          "Pag-asa", "Sampao", "Semong", "Sua-on", "Tiburcia"
        ],
        "New Corella": [
          "Cabidianan", "Carcor", "Del Monte", "Del Pilar", "El Salvador", "Limba-an", "Macgum", "Mambing",
          "Mesaoy", "New Bohol", "New Cortez", "New Sambog", "Patrocenio", "Poblacion", "San Jose", "San Roque",
          "Santa Cruz", "Santa Fe", "Santo Niño", "Suawon"
        ],
        "Panabo": [
          "A. O. Floirendo", "Buenavista", "Cacao", "Cagangohan", "Consolacion", "Dapco", "Datu Abdul Dadia",
          "Gredu", "J. P. Laurel", "Kasilak", "Katipunan", "Katualan", "Kauswagan", "Kiotoy", "Little Panay",
          "Lower Panaga", "Mabunao", "Maduao", "Malativas", "Manay", "Nanyo", "New Malaga", "New Malitbog",
          "New Pandan", "New Visayas", "Quezon", "Salvacion", "San Francisco", "San Nicolas", "San Pedro",
          "San Roque", "San Vicente", "Santa Cruz", "Santo Niño", "Sindaton", "Southern Davao", "Tagpore",
          "Tibungol", "Upper Licanan", "Waterfall"
        ],
        "Samal": [
          "Adecor", "Anonang", "Aumbay", "Aundanao", "Balet", "Bandera", "Caliclic", "Camudmud", "Catagman",
          "Cawag", "Cogon", "Cogon (Talicod)", "Dadatan", "Del Monte", "Guilon", "Kanaan", "Kinawitnon", "Libertad",
          "Libuak", "Licup", "Limao", "Linosutan", "Mambago-A", "Mambago-B", "Miranda", "Moncado", "Pangubatan",
          "Peñaplata", "Poblacion", "San Agustin", "San Antonio", "San Isidro (Babak)", "San Isidro (Kaputian)",
          "San Jose", "San Miguel", "San Remigio", "Santa Cruz", "Santo Niño", "Sion", "Tagbaobo", "Tagbay",
          "Tagbitan-ag", "Tagdaliao", "Tagpopongan", "Tambo", "Toril"
        ],
        "San Isidro": [
          "Dacudao", "Datu Balong", "Igangon", "Kipalili", "Libuton", "Linao", "Mamangan", "Monte Dujali",
          "Pinamuno", "Sabangan", "San Miguel", "Santo Niño", "Sawata"
        ],
        "Santo Tomas": [
          "Balagunan", "Bobongon", "Casig-ang", "Esperanza", "Kimamon", "Kinamayan", "La Libertad", "Lungaog",
          "Magwawa", "New Katipunan", "New Visayas", "Pantaron", "Salvacion", "San Jose", "San Miguel",
          "San Vicente", "Talomo", "Tibal-og", "Tulalian"
        ],
        "Tagum": [
          "Apokon", "Bincungan", "Busaon", "Canocotan", "Cuambogan", "La Filipina", "Liboganon", "Madaum", "Magdum",
          "Magugpo East", "Magugpo North", "Magugpo Poblacion", "Magugpo South", "Magugpo West", "Mankilam",
          "New Balamban", "Nueva Fuerza", "Pagsabangan", "Pandapan", "San Agustin", "San Isidro", "San Miguel",
          "Visayan Village"
        ],
        "Talaingod": [
          "Dagohoy", "Palma Gil", "Santo Niño"
        ]
      },

    },
    "Davao del Sur": {
      cities: {
        "Bansalan": [
          "Alegre", "Alta Vista", "Anonang", "Bitaug", "Bonifacio", "Buenavista", "Darapuay", "Dolo", "Eman",
          "Kinuskusan", "Libertad", "Linawan", "Mabuhay", "Mabunga", "Managa", "Marber", "New Clarin",
          "Poblacion", "Poblacion Dos", "Rizal", "Santo Niño", "Sibayan", "Tinongtongan", "Tubod", "Union"
        ],
        "Digos": [
          "Aplaya", "Balabag", "Binaton", "Cogon", "Colorado", "Dawis", "Dulangan", "Goma", "Igpit", "Kapatagan",
          "Kiagot", "Lungag", "Mahayahay", "Matti", "Ruparan", "San Agustin", "San Jose", "San Miguel", "San Roque",
          "Sinawilan", "Soong", "Tiguman", "Tres de Mayo", "Zone 1", "Zone 2", "Zone 3"
        ],
        "Hagonoy": [
          "Balutakay", "Clib", "Guihing", "Guihing Aplaya", "Hagonoy Crossing", "Kibuaya", "La Union", "Lanuro",
          "Lapulabao", "Leling", "Mahayahay", "Malabang Damsite", "Maliit Digos", "New Quezon", "Paligue",
          "Poblacion", "Sacub", "San Guillermo", "San Isidro", "Sinayawan", "Tologan"
        ],
        "Kiblawan": [
          "Abnate", "Bagong Negros", "Bagong Silang", "Bagumbayan", "Balasiao", "Bonifacio", "Bulol-Salo", "Bunot",
          "Cogon-Bacaca", "Dapok", "Ihan", "Kibongbong", "Kimlawis", "Kisulan", "Lati-an", "Manual", "Maraga-a",
          "Molopolo", "New Sibonga", "Panaglib", "Pasig", "Poblacion", "Pocaleel", "San Isidro", "San Jose",
          "San Pedro", "Santo Niño", "Tacub", "Tacul", "Waterfall"
        ],
        "Magsaysay": [
          "Bacungan", "Balnate", "Barayong", "Blocon", "Dalawinon", "Dalumay", "Glamang", "Kanapulo", "Kasuga",
          "Lower Bala", "Mabini", "Maibo", "Malawanit", "Malongon", "New Ilocos", "New Opon", "Poblacion",
          "San Isidro", "San Miguel", "Tacul", "Tagaytay", "Upper Bala"
        ],
        "Malalag": [
          "Bagumbayan", "Baybay", "Bolton", "Bulacan", "Caputian", "Ibo", "Kiblagon", "Lapu-Lapu", "Mabini",
          "New Baclayon", "Pitu", "Poblacion", "Rizal", "San Isidro", "Tagansule"
        ],
        "Matanao": [
          "Asbang", "Asinan", "Bagumbayan", "Bangkal", "Buas", "Buri", "Cabligan", "Camanchiles", "Ceboza",
          "Colonsabak", "Dongan-Pekong", "Kabasagan", "Kapok", "Kauswagan", "Kibao", "La Suerte", "Langa-an",
          "Lower Marber", "Manga", "New Katipunan", "New Murcia", "New Visayas", "Poblacion", "Saboy", "San Jose",
          "San Miguel", "San Vicente", "Saub", "Sinaragan", "Sinawilan", "Tamlangon", "Tibongbong", "Towak"
        ],
        "Padada": [
          "Almendras", "Don Sergio Osmeña, Sr.", "Harada Butai", "Lower Katipunan", "Lower Limonzo",
          "Lower Malinao", "N C Ordaneza District", "Northern Paligue", "Palili", "Piape", "Punta Piape",
          "Quirino District", "San Isidro", "Southern Paligue", "Tulogan", "Upper Limonzo", "Upper Malinao"
        ],
        "Santa Cruz": [
          "Astorga", "Bato", "Coronon", "Darong", "Inawayan", "Jose Rizal", "Matutungan", "Melilia", "Saliducon",
          "Sibulan", "Sinoron", "Tagabuli", "Tibolo", "Tuban", "Zone I", "Zone II", "Zone III", "Zone IV"
        ],
        "Sulop": [
          "Balasinon", "Buguis", "Carre", "Clib", "Harada Butai", "Katipunan", "Kiblagon", "Labon", "Laperas",
          "Lapla", "Litos", "Luparan", "Mckinley", "New Cebu", "Osmeña", "Palili", "Parame", "Poblacion",
          "Roxas", "Solongvale", "Tagolilong", "Tala-o", "Talas", "Tanwalang", "Waterfall"
        ]
      },

    },
    "Davao Occidental": {
      cities: {
        "Don Marcelino": [
          "Baluntaya", "Calian", "Dalupan", "Kinanga", "Kiobog", "Lanao", "Lapuan", "Lawa", "Linadasan",
          "Mabuhay", "North Lamidan", "Nueva Villa", "South Lamidan", "Talagutong", "West Lamidan"
        ],
        "Jose Abad Santos": [
          "Balangonan", "Buguis", "Bukid", "Butuan", "Butulan", "Caburan Big", "Caburan Small", "Camalian",
          "Carahayan", "Cayaponga", "Culaman", "Kalbay", "Kitayo", "Magulibas", "Malalan", "Mangile", "Marabutuan",
          "Meybio", "Molmol", "Nuing", "Patulang", "Quiapo", "San Isidro", "Sugal", "Tabayon", "Tanuman"
        ],
        "Malita": [
          "Bito", "Bolila", "Buhangin", "Culaman", "Datu Danwata", "Demoloc", "Felis", "Fishing Village",
          "Kibalatong", "Kidalapong", "Kilalag", "Kinangan", "Lacaron", "Lagumit", "Lais", "Little Baguio",
          "Macol", "Mana", "Manuel Peralta", "New Argao", "Pangaleon", "Pangian", "Pinalpalan", "Poblacion",
          "Sangay", "Talogoy", "Tical", "Ticulon", "Tingolo", "Tubalan"
        ],
        "Santa Maria": [
          "Basiawan", "Buca", "Cadaatan", "Datu Daligasao", "Datu Intan", "Kidadan", "Kinilidan", "Kisulad",
          "Malalag Tubig", "Mamacao", "Ogpao", "Poblacion", "Pongpong", "San Agustin", "San Antonio", "San Isidro",
          "San Juan", "San Pedro", "San Roque", "Santo Niño", "Santo Rosario", "Tanglad"
        ],
        "Sarangani": [
          "Batuganding", "Camahual", "Camalig", "Gomtago", "Konel", "Laker", "Lipol", "Mabila",
          "Patuco", "Tagen", "Tinina", "Tucal"
        ]
      },

    }, "Davao Oriental": {
      cities: {
        "Baganga": [
          "Baculin", "Banao", "Batawan", "Batiano", "Binondo", "Bobonao", "Campawan", "Central", "Dapnan",
          "Kinablangan", "Lambajon", "Lucod", "Mahanub", "Mikit", "Salingcomot", "San Isidro", "San Victor", "Saoquegue"
        ],
        "Banaybanay": [
          "Cabangcalan", "Caganganan", "Calubihan", "Causwagan", "Mahayag", "Maputi", "Mogbongcogon",
          "Panikian", "Pintatagan", "Piso Proper", "Poblacion", "Punta Linao", "Rang-ay", "San Vicente"
        ],
        "Boston": [
          "Caatihan", "Cabasagan", "Carmen", "Cawayanan", "Poblacion", "San Jose", "Sibajay", "Simulao"
        ],
        "Caraga": [
          "Alvar", "Caningag", "Don Leon Balante", "Lamiawan", "Manorigao", "Mercedes", "Palma Gil", "Pichon",
          "Poblacion", "San Antonio", "San Jose", "San Luis", "San Miguel", "San Pedro", "Santa Fe",
          "Santiago", "Sobrecarey"
        ],
        "Cateel": [
          "Abijod", "Alegria", "Aliwagwag", "Aragon", "Baybay", "Maglahus", "Mainit", "Malibago",
          "Poblacion", "San Alfonso", "San Antonio", "San Miguel", "San Rafael", "San Vicente",
          "Santa Filomena", "Taytayan"
        ],
        "Governor Generoso": [
          "Anitap", "Crispin Dela Cruz", "Don Aurelio Chicote", "Lavigan", "Luzon", "Magdug",
          "Manuel Roxas", "Monserrat", "Nangan", "Oregon", "Poblacion", "Pundaguitan",
          "Sergio Osmeña", "Surop", "Tagabebe", "Tamban", "Tandang Sora", "Tibanban",
          "Tiblawan", "Upper Tibanban"
        ],
        "Lupon": [
          "Bagumbayan", "Cabadiangan", "Calapagan", "Cocornon", "Corporacion", "Don Mariano Marcos",
          "Ilangay", "Langka", "Lantawan", "Limbahan", "Macangao", "Magsaysay", "Mahayahay",
          "Maragatas", "Marayag", "New Visayas", "Poblacion", "San Isidro", "San Jose",
          "Tagboa", "Tagugpo"
        ],
        "Manay": [
          "Capasnan", "Cayawan", "Central", "Concepcion", "Del Pilar", "Guza", "Holy Cross", "Lambog",
          "Mabini", "Manreza", "New Taokanga", "Old Macopa", "Rizal", "San Fermin",
          "San Ignacio", "San Isidro", "Zaragosa"
        ],
        "Mati": [
          "Badas", "Bobon", "Buso", "Cabuaya", "Central", "Culian", "Dahican", "Danao",
          "Dawan", "Don Enrique Lopez", "Don Martin Marundan", "Don Salvador Lopez, Sr.", "Langka",
          "Lawigan", "Libudon", "Luban", "Macambol", "Mamali", "Matiao", "Mayo", "Sainz",
          "Sanghay", "Tagabakid", "Tagbinonga", "Taguibo", "Tamisan"
        ],
        "San Isidro": [
          "Baon", "Batobato", "Bitaogan", "Cambaleon", "Dugmanon", "Iba", "La Union", "Lapu-lapu",
          "Maag", "Manikling", "Maputi", "San Miguel", "San Roque", "Santo Rosario", "Sudlon", "Talisay"
        ],
        "Tarragona": [
          "Cabagayan", "Central", "Dadong", "Jovellar", "Limot", "Lucatan", "Maganda", "Ompao",
          "Tomoaong", "Tubaon"
        ]
      },

    },
    "Dinagat Islands": {
      cities: {
        "Basilisa": [
          "Benglen", "Catadman", "Columbus", "Coring", "Cortes", "Diegas", "Doña Helene", "Edera",
          "Ferdinand", "Geotina", "Imee", "Melgar", "Montag", "Navarro", "New Nazareth", "Poblacion",
          "Puerto Princesa", "Rita Glenda", "Roma", "Roxas", "Santa Monica", "Santo Niño", "Sering",
          "Sombrado", "Tag-abaca", "Villa Ecleo", "Villa Pantinople"
        ],
        "Cagdianao": [
          "Boa", "Cabunga-an", "Del Pilar", "Laguna", "Legaspi", "Ma-atas", "Mabini", "Nueva Estrella",
          "Poblacion", "R. Ecleo, Sr.", "San Jose", "Santa Rita", "Tigbao", "Valencia"
        ],
        "Dinagat": [
          "Bagumbayan", "Cab-ilan", "Cabayawan", "Cayetano", "Escolta", "Gomez", "Justiniana Edera",
          "Magsaysay", "Mauswagon", "New Mabuhay", "Wadas", "White Beach"
        ],
        "Libjo": [
          "Albor", "Arellano", "Bayanihan", "Doña Helen", "Garcia", "General Aguinaldo", "Kanihaan",
          "Llamera", "Magsaysay", "Osmeña", "Plaridel", "Quezon", "Rosita", "San Antonio", "San Jose",
          "Santo Niño"
        ],
        "Loreto": [
          "Carmen", "Esperanza", "Ferdinand", "Helene", "Liberty", "Magsaysay", "Panamaon",
          "San Juan", "Santa Cruz", "Santiago"
        ],
        "San Jose": [
          "Aurelio", "Cuarinta", "Don Ruben Ecleo", "Jacquez", "Justiniana Edera", "Luna", "Mahayahay",
          "Matingbe", "San Jose", "San Juan", "Santa Cruz", "Wilson"
        ],
        "Tubajon": [
          "Diaz", "Imelda", "Mabini", "Malinao", "Navarro", "Roxas", "San Roque", "San Vicente", "Santa Cruz"
        ]
      },

    },
    "Eastern Samar": {
      cities: {
        "Arteche": [
          "Aguinaldo", "Balud", "Bato", "Beri", "Bigo", "Buenavista", "Cagsalay", "Campacion", "Carapdapan", "Casidman",
          "Catumsan", "Central", "Concepcion", "Garden", "Inayawan", "Macarthur", "Rawis", "Tangbo", "Tawagan", "Tebalawon"
        ],
        "Balangiga": [
          "Bacjao", "Barangay Poblacion I", "Barangay Poblacion II", "Barangay Poblacion III", "Barangay Poblacion IV",
          "Barangay Poblacion V", "Barangay Poblacion VI", "Cag-olango", "Cansumangcay", "Guinmaayohan", "Maybunga",
          "San Miguel", "Santa Rosa"
        ],
        "Balangkayan": [
          "Balogo", "Bangon", "Cabay", "Caisawan", "Cantubi", "General Malvar", "Guinpoliran", "Julag", "Magsaysay", "Maramag",
          "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion V"
        ],
        "Borongan": [
          "Alang-alang", "Amantacop", "Ando", "Balacdas", "Balud", "Banuyo", "Baras", "Bato", "Bayobay", "Benowangan", "Bugas",
          "Cabalagnan", "Cabong", "Cagbonga", "Calico-an", "Calingatngan", "Camada", "Campesao", "Can-abong", "Can-aga",
          "Canjaway", "Canlaray", "Canyopay", "Divinubo", "Hebacong", "Hindang", "Lalawigan", "Libuton", "Locso-on",
          "Maybacong", "Maypangdan", "Pepelitan", "Pinanag-an", "Punta Maria", "Purok A", "Purok B", "Purok C", "Purok D1",
          "Purok D2", "Purok E", "Purok F", "Purok G", "Purok H", "Sabang North", "Sabang South", "San Andres", "San Gabriel",
          "San Gregorio", "San Jose", "San Mateo", "San Pablo", "San Saturnino", "Santa Fe", "Siha", "Sohutan", "Songco",
          "Suribao", "Surok", "Taboc", "Tabunan", "Tamoso"
        ],
        "Can-avid": [
          "Balagon", "Barangay 1 Poblacion", "Barangay 10 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion",
          "Barangay 4 Poblacion", "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion",
          "Barangay 9 Poblacion", "Baruk", "Boco", "Caghalong", "Camantang", "Can-ilay", "Cansangaya", "Canteros", "Carolina",
          "Guibuangan", "Jepaco", "Mabuhay", "Malogo", "Obong", "Pandol", "Rawis", "Salvacion", "Solong"
        ],
        "Dolores": [
          "Aroganga", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14", "Barangay 15",
          "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9",
          "Bonghon", "Buenavista", "Cabago-an", "Caglao-an", "Cagtabon", "Dampigan", "Dapdap", "Del Pilar", "Denigpian",
          "Gap-ang", "Hilabaan", "Hinolaso", "Japitan", "Jicontol", "Libertad", "Magongbong", "Magsaysay", "Malaintos",
          "Malobago", "Osmeña", "Rizal", "San Isidro", "San Pascual", "San Roque", "San Vicente", "Santa Cruz", "Santo Niño",
          "Tanauan", "Tikling", "Villahermosa"
        ],
        "General MacArthur": [
          "Aguinaldo", "Alang-alang", "Binalay", "Calutan", "Camcuevas", "Domrog", "Laurel", "Limbujan", "Macapagal",
          "Magsaysay", "Osmeña", "Pingan", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3",
          "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8",
          "Quezon", "Quirino", "Roxas", "San Isidro", "San Roque", "Santa Cruz", "Santa Fe", "Tandang Sora", "Tugop", "Vigan"
        ],
        "Giporlos": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Biga", "Culasi",
          "Luna", "Parina", "San Isidro", "San Miguel", "Santa Cruz", "Victory"
        ],
        "Guiuan": [
          "Alingarog", "Baras", "Barobaybay", "Benowangan", "Bugho", "Bulawan", "Burgos", "Cagdara-o", "Camparang", "Cawayan",
          "Cogon", "Guiuan Pob. (Barangay 1)", "Guiuan Pob. (Barangay 2)", "Guiuan Pob. (Barangay 3)", "Guiuan Pob. (Barangay 4)",
          "Guiuan Pob. (Barangay 5)", "Guiuan Pob. (Barangay 6)", "Guiuan Pob. (Barangay 7)", "Guiuan Pob. (Barangay 8)",
          "Guiuan Pob. (Barangay 9)", "Guiuan Pob. (Barangay 10)", "Guiuan Pob. (Barangay 11)", "Guiuan Pob. (Barangay 12)",
          "Guiuan Pob. (Barangay 13)", "Guiuan Pob. (Barangay 14)", "Guiuan Pob. (Barangay 15)", "Guiuan Pob. (Barangay 16)",
          "Guiuan Pob. (Barangay 17)", "Guiuan Pob. (Barangay 18)", "Guiuan Pob. (Barangay 19)", "Guiuan Pob. (Barangay 20)",
          "Hernani", "Lawa-an", "Libertad", "Maypangdan", "Ngolos", "Pagnamitan", "Suluan", "Sulangan", "Tinaan", "Trinidad"
        ],
        "Hernani": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Campidhan", "Canciledes", "Coticot", "Padang", "San Isidro",
          "San Miguel", "Santa Cruz"
        ],
        "Jipapad": [
          "Agsaman", "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion",
          "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion",
          "Cagmanaba", "Cagtabon", "Dorillo", "Magsaysay", "Recarey", "Rizal", "Roxas", "San Roque", "Tagbacan"
        ],
        "Lawaan": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Barangay 13 Poblacion", "Barangay 14 Poblacion", "Barangay 15 Poblacion"
        ],
        "Llorente": [
          "Antipolo", "Barobo", "Cagang", "Cagnipa", "Cangmalalag", "Cansoso", "Cantahay", "Carmen", "Del Pilar", "Guinob-an",
          "Magsaysay", "Malbog", "Magasang", "Pagbabangnan", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3",
          "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "San Miguel", "Tagbacan", "Wangag"
        ],
        "Maslog": [
          "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8",
          "Barangay 9", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14"
        ],
        "Maydolong": [
          "Balogo", "Campakerit", "Campiyak", "Caraye", "Malobago", "Maybocog", "Maytigbao", "Pambujan", "Patag", "Poblacion",
          "San Isidro", "Tagaslian", "Taguite", "Tandaya", "Tawagan"
        ],
        "Mercedes": [
          "Banuyo", "Buscada", "Cagtabon", "Calipayan", "Lunas", "Malbang", "Poblacion", "Salvacion", "Sung-an", "Tigbao", "Tula"
        ],
        "Oras": [
          "Agsam", "Bagacay", "Barangay 1 Poblacion", "Barangay 10 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion",
          "Barangay 4 Poblacion", "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion",
          "Barangay 9 Poblacion", "Baruc", "Bato", "Biga", "Campakirit", "Can-avid", "Canbañez", "Cansangaya", "Casidman",
          "Dayhagan", "Gamut", "Guinmalud", "Hinugayan", "Manaybanay", "Pagbabangnan", "Pawican", "Sabang", "Sohoton", "Tibig", "Tula"
        ],
        "Quinapondan": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Cagolongan", "Dagami", "Dalayap", "Gap-ang", "Guituan", "Iba", "Lauang", "Magsaysay", "Magsungay", "Masilug",
          "Maratudo", "Pag-alad", "Pangpang", "San Juan", "San Jose", "San Pedro", "San Vicente", "Santa Fe", "Santa Maria", "Santa Rita"
        ],
        "Samar": [
          "Alang-alang", "Alangiluan", "Antipolo", "Balete", "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion",
          "Barangay 4 Poblacion", "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion",
          "Barangay 9 Poblacion", "Barangay 10 Poblacion", "Bariquit", "Binagbag", "Bugtong", "Burgos", "Calangay", "Candelaria",
          "Canayon", "Caro", "Catmon", "Dawis", "Ganao", "Hibag", "Labay", "Lico", "Magsaysay", "Malangga", "Maslog", "Maybanay",
          "Olo", "Pabalon", "Panugol", "San Fernando", "San Isidro", "San Jose", "San Pedro", "San Vicente", "Santo Niño", "Siuton"
        ],
        "San Isidro": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Bansud", "Dalisay", "Dulag", "Jubal", "Maynila", "Monicayo", "Pag-asa",
          "San Antonio", "San Jose", "San Vicente", "Santo Niño", "Santo Tomas", "Silang", "Tabok", "Tamsi", "Tanghulan"
        ],
        "San Jose de Buan": [
          "Banga", "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion",
          "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion",
          "Bangon", "Bihongan", "Damsa", "Dampigan", "Limbongan", "Mayagoy", "Pangpang", "San Agustin", "San Jose",
          "San Isidro", "San Vicente", "Santo Niño", "Suguib"
        ],
        "San Policarpo": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Bagumbayan", "Biga", "Magsaysay", "Pangpang", "San Juan",
          "San Isidro", "San Jose", "San Vicente"
        ],
        "San Vicente": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Bagumbayan", "Dagat", "Malungon", "Pangpang", "San Antonio", "San Jose",
          "San Vicente", "Santo Niño"
        ],
        "Santo Niño": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Baguio", "Bagumbayan", "Balingasag", "Biga", "Catmon", "Cucul", "Poblacion"
        ],
        "Sariaya": [
          "Bagumbayan", "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion",
          "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion",
          "Barangay 10 Poblacion", "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Barangay 13 Poblacion", "Buhangin",
          "Hagbay", "Lumbang", "Mayapo", "Mababang", "Malabanan", "Manapla", "Mataba", "Matanguihan", "Parian", "Pinagbungkalan"
        ],
        "Santiago": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Barangay 13 Poblacion", "Bucal", "Central", "Dulay", "Isidro", "Juanico",
          "Magsaysay", "Maramag", "San Benito", "San Carlos", "San Isidro"
        ],
        "Tanauan": [
          "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion", "Barangay 10 Poblacion",
          "Barangay 11 Poblacion", "Barangay 12 Poblacion", "Barangay 13 Poblacion", "Barangay 14 Poblacion", "Barangay 15 Poblacion",
          "Bagumbayan", "Buhangin", "Pagsanghan", "Pangpang", "San Vicente", "Santo Niño", "Tanawan", "Tindog"
        ]
      }
      ,

    }, "Guimaras": {
      cities: {
        "Buenavista": [
          "Agsanayan", "Avila", "Bacjao", "Banban", "Cansilayan", "Dagsa-an", "Daragan",
          "East Valencia", "Getulio", "Mabini", "Magsaysay", "Mclain", "Montpiller", "Navalas",
          "Nazaret", "New Poblacion", "Old Poblacion", "Piña", "Rizal", "Salvacion", "San Fernando",
          "San Isidro", "San Miguel", "San Nicolas", "San Pedro", "San Roque", "Santo Rosario",
          "Sawang", "Supang", "Tacay", "Taminla", "Tanag", "Tastasan", "Tinadtaran", "Umilig", "Zaldivar"
        ],
        "Jordan": [
          "Alaguisoc", "Balcon Maravilla", "Balcon Melliza", "Bugnay", "Buluangan", "Espinosa",
          "Hoskyn", "Lawi", "Morobuan", "Poblacion", "Rizal", "San Miguel", "Santa Teresa",
          "Sinapsapan"
        ],
        "Nueva Valencia": [
          "Cabalagnan", "Calaya", "Canhawan", "Concordia Sur", "Dolores", "Guiwanon", "Igang",
          "Igdarapdap", "La Paz", "Lanipe", "Lucmayan", "Magamay", "Napandong", "Oracon Sur",
          "Pandaraonan", "Panobolon", "Poblacion", "Salvacion", "San Antonio", "San Roque",
          "Santo Domingo", "Tando"
        ],
        "San Lorenzo": [
          "Aguilar", "Cabano", "Cabungahan", "Constancia", "Gaban", "Igcawayan", "M. Chavez",
          "San Enrique", "Sapal", "Sebario", "Suclaran", "Tamborong"
        ],
        "Sibunag": [
          "Alegria", "Ayangan", "Bubog", "Concordia Norte", "Dasal", "Inampologan", "Maabay",
          "Millan", "Oracon Norte", "Ravina", "Sabang", "San Isidro", "Sebaste", "Tanglad"
        ]
      },

    },
    "Ifugao": {
      cities: {
        "Aguinaldo": [
          "Awayan", "Bunhian", "Butac", "Buwag", "Chalalo", "Damag", "Galonogon", "Halag", "Itab",
          "Jacmal", "Majlong", "Mongayang", "Posnaan", "Ta-ang", "Talite", "Ubao"
        ],
        "Alfonso Lista": [
          "Bangar", "Busilac", "Calimag", "Calupaan", "Caragasan", "Dolowog", "Kiling", "Laya",
          "Little Tadian", "Namillangan", "Namnama", "Ngileb", "Pinto", "Poblacion", "San Jose",
          "San Juan", "San Marcos", "San Quintin", "Santa Maria", "Santo Domingo"
        ],
        "Asipulo": [
          "Amduntog", "Antipolo", "Camandag", "Cawayan", "Hallap", "Liwon", "Namal", "Nungawa",
          "Panubtuban", "Pula"
        ],
        "Banaue": [
          "Amganad", "Anaba", "Balawis", "Banao", "Bangaan", "Batad", "Bocos", "Cambulo", "Ducligan",
          "Gohang", "Kinakin", "Ohaj", "Poblacion", "Poitan", "Pula", "San Fernando", "Tam-an",
          "View Point"
        ],
        "Hingyon": [
          "Anao", "Bangtinon", "Bitu", "Cababuyan", "Mompolia", "Namulditan", "Northern Cababuyan",
          "O-ong", "Piwong", "Poblacion", "Ubuag", "Umalbong"
        ],
        "Hungduan": [
          "Abatan", "Ba-ang", "Bangbang", "Bokiawan", "Hapao", "Lubo-ong", "Maggok", "Nungulunan",
          "Poblacion"
        ],
        "Kiangan": [
          "Ambabag", "Baguinge", "Bokiawan", "Bolog", "Dalligan", "Duit", "Hucab", "Julongan",
          "Lingay", "Mungayang", "Nagacadan", "Pindongan", "Poblacion", "Tuplac"
        ],
        "Lagawe": [
          "Abinuan", "Banga", "Boliwong", "Burnay", "Buyabuyan", "Caba", "Cudog", "Dulao", "Jucbong",
          "Luta", "Montabiong", "Olilicon", "Poblacion East", "Poblacion North", "Poblacion South",
          "Poblacion West", "Ponghal", "Pullaan", "Tungngod", "Tupaya"
        ],
        "Lamut": [
          "Ambasa", "Bimpal", "Hapid", "Holowon", "Lawig", "Lucban", "Mabatobato", "Magulon", "Nayon",
          "Panopdopan", "Payawan", "Pieza", "Poblacion East", "Poblacion West", "Pugol", "Salamague",
          "Sanafe", "Umilag"
        ],
        "Mayoyao": [
          "Aduyongan", "Alimit", "Ayangan", "Balangbang", "Banao", "Banhal", "Bato-Alatbang", "Bongan",
          "Buninan", "Chaya", "Chumang", "Epeng", "Guinihon", "Inwaloy", "Langayan", "Liwo", "Maga",
          "Magulon", "Mapawoy", "Mayoyao Proper", "Mongol", "Nalbu", "Nattum", "Palaad", "Poblacion",
          "Talboc", "Tulaed"
        ],
        "Tinoc": [
          "Ahin", "Ap-apid", "Binablayan", "Danggo", "Eheb", "Gumhang", "Impugong", "Luhong", "Tinoc",
          "Tukucan", "Tulludan", "Wangwang"
        ]
      },

    },
    "Ilocos Norte": {
      cities: {
        "Bacarra": [
          "Adams",
          "Bani",
          "Buyon",
          "Cabaruan",
          "Cabulalaan",
          "Cabusligan",
          "Cadaratan",
          "Calioet-Libong",
          "Casilian",
          "Corocor",
          "Duripes",
          "Ganagan",
          "Libtong",
          "Macupit",
          "Nambaran",
          "Natba",
          "Paninaan",
          "Pasiocan",
          "Pasngal",
          "Pipias",
          "Pulangi",
          "Pungto",
          "San Agustin I",
          "San Agustin II",
          "San Andres I",
          "San Andres II",
          "San Gabriel I",
          "San Gabriel II",
          "San Pedro I",
          "San Pedro II",
          "San Roque I",
          "San Roque II",
          "San Simon I",
          "San Simon II",
          "San Vicente",
          "Sangil",
          "Santa Filomena I",
          "Santa Filomena II",
          "Santa Rita",
          "Santo Cristo I",
          "Santo Cristo II",
          "Tambidao",
          "Teppang",
          "Tubburan"
        ],
        "Badoc": [
          "Alay-Nangbabaan",
          "Alogoog",
          "Ar-arusip",
          "Aring",
          "Balbaldez",
          "Bato",
          "Camanga",
          "Canaan",
          "Caraitan",
          "Gabut Norte",
          "Gabut Sur",
          "Garreta",
          "La Virgen Milagrosa",
          "Labut",
          "Lacuben",
          "Lubigan",
          "Mabusag Norte",
          "Mabusag Sur",
          "Madupayas",
          "Morong",
          "Nagrebcan",
          "Napu",
          "Pagsanahan Norte",
          "Pagsanahan Sur",
          "Paltit",
          "Parang",
          "Pasuc",
          "Santa Cruz Norte",
          "Santa Cruz Sur",
          "Saud",
          "Turod"
        ],
        "Bangui": [
          "Abaca",
          "Bacsil",
          "Banban",
          "Baruyen",
          "Dadaor",
          "Lanao",
          "Malasin",
          "Manayon",
          "Masikil",
          "Nagbalagan",
          "Payac",
          "San Lorenzo",
          "Taguiporo",
          "Utol"
        ],
        "Banna": [
          "Balioeg",
          "Bangsar",
          "Barbarangay",
          "Binacag",
          "Bomitog",
          "Bugasi",
          "Caestebanan",
          "Caribquib",
          "Catagtaguen",
          "Crispina",
          "Hilario",
          "Imelda",
          "Lorenzo",
          "Macayepyep",
          "Marcos",
          "Nagpatayan",
          "Sinamar",
          "Tabtabagan",
          "Valdez",
          "Valenciano"
        ],
        "Batac": [
          "Ablan Poblacion",
          "Acosta Poblacion",
          "Aglipay",
          "Baay",
          "Baligat",
          "Baoa East",
          "Baoa West",
          "Barani",
          "Ben-agan",
          "Bil-loca",
          "Biningan",
          "Bungon",
          "Callaguip",
          "Camandingan",
          "Camguidan",
          "Cangrunaan",
          "Capacuan",
          "Caunayan",
          "Colo",
          "Dariwdiw",
          "Lacub",
          "Mabaleng",
          "Magnuang",
          "Maipalig",
          "Nagbacalan",
          "Naguirangan",
          "Palongpong",
          "Palpalicong",
          "Parangopong",
          "Payao",
          "Pimentel",
          "Quiling Norte",
          "Quiling Sur",
          "Quiom",
          "Rayuray",
          "Ricarte Poblacion",
          "San Julian",
          "San Mateo",
          "San Pedro",
          "Suabit",
          "Sumader",
          "Tabug",
          "Valdez Poblacion"
        ],
        "Burgos": [
          "Ablan Sarat",
          "Agaga",
          "Bayog",
          "Bobon",
          "Buduan",
          "Nagsurot",
          "Paayas",
          "Pagali",
          "Poblacion",
          "Saoit",
          "Tanap"
        ],
        "Carasi": [
          "Angset",
          "Barbaqueso",
          "Virbira"
        ],
        "Currimao": [
          "Anggapang Norte",
          "Anggapang Sur",
          "Bimmanga",
          "Cabuusan",
          "Comcomloong",
          "Gaang",
          "Lang-ayan-Baramban",
          "Lioes",
          "Maglaoi Centro",
          "Maglaoi Norte",
          "Maglaoi Sur",
          "Paguludan-Salindeg",
          "Pangil",
          "Pias Norte",
          "Pias Sur",
          "Poblacion I",
          "Poblacion II",
          "Salugan",
          "San Simeon",
          "Santa Cruz",
          "Tapao-Tigue",
          "Torre",
          "Victoria"
        ],
        "Dingras": [
          "Albano",
          "Bacsil",
          "Bagut",
          "Baresbes",
          "Barong",
          "Bungcag",
          "Cali",
          "Capasan",
          "Dancel",
          "Elizabeth",
          "Espiritu",
          "Foz",
          "Guerrero",
          "Lanas",
          "Lumbad",
          "Madamba",
          "Mandaloque",
          "Medina",
          "Parado",
          "Peralta",
          "Puruganan",
          "Root",
          "Sagpatan",
          "Saludares",
          "San Esteban",
          "San Francisco",
          "San Marcelino",
          "San Marcos",
          "Sulquiano",
          "Suyo",
          "Ver"
        ],
        "Dumalneg": [
          "Cabaritan",
          "Kalaw",
          "Quibel",
          "San Isidro"
        ],
        "Laoag": [
          "Barangay No. 1, San Lorenzo",
          "Barangay No. 10, San Jose",
          "Barangay No. 11, Santa Balbina",
          "Barangay No. 12, San Isidro",
          "Barangay No. 13, Nuestra Señora de Visitacion",
          "Barangay No. 14, Santo Tomas",
          "Barangay No. 15, San Guillermo",
          "Barangay No. 16, San Jacinto",
          "Barangay No. 17, San Francisco",
          "Barangay No. 18, San Quirino",
          "Barangay No. 19, Santa Marcela",
          "Barangay No. 2, Santa Joaquina",
          "Barangay No. 20, San Miguel",
          "Barangay No. 21, San Pedro",
          "Barangay No. 22, San Andres",
          "Barangay No. 23, San Matias",
          "Barangay No. 24, Nuestra Señora de Consolacion",
          "Barangay No. 25, Santa Cayetana",
          "Barangay No. 26, San Marcelino",
          "Barangay No. 27, Nuestra Señora de Soledad",
          "Barangay No. 28, San Bernardo",
          "Barangay No. 29, Santo Tomas",
          "Barangay No. 3, Nuestra Señora del Rosario",
          "Barangay No. 30-A, Suyo",
          "Barangay No. 30-B, Santa Maria",
          "Barangay No. 31, Talingaan",
          "Barangay No. 32-A, La Paz East",
          "Barangay No. 32-B, La Paz West",
          "Barangay No. 32-C La Paz East",
          "Barangay No. 33-A, La Paz Proper",
          "Barangay No. 33-B, La Paz Proper",
          "Barangay No. 34-A, Gabu Norte West",
          "Barangay No. 34-B, Gabu Norte East",
          "Barangay No. 35, Gabu Sur",
          "Barangay No. 36, Araniw",
          "Barangay No. 37, Calayab",
          "Barangay No. 38-A, Mangato East",
          "Barangay No. 38-B, Mangato West",
          "Barangay No. 39, Santa Rosa",
          "Barangay No. 4, San Guillermo",
          "Barangay No. 40, Balatong",
          "Barangay No. 41, Balacad",
          "Barangay No. 42, Apaya",
          "Barangay No. 43, Cavit",
          "Barangay No. 44, Zamboanga",
          "Barangay No. 45, Tangid",
          "Barangay No. 46, Nalbo",
          "Barangay No. 47, Bengcag",
          "Barangay No. 48-A, Cabungaan North",
          "Barangay No. 48-B, Cabungaan South",
          "Barangay No. 49-A, Darayday",
          "Barangay No. 49-B, Raraburan",
          "Barangay No. 5, San Pedro",
          "Barangay No. 50, Buttong",
          "Barangay No. 51-A, Nangalisan East",
          "Barangay No. 51-B, Nangalisan West",
          "Barangay No. 52-A, San Mateo",
          "Barangay No. 52-B, Lataag",
          "Barangay No. 53, Rioeng",
          "Barangay No. 54-A, Lagui-Sail",
          "Barangay No. 54-B, Camangaan",
          "Barangay No. 55-A, Barit-Pandan",
          "Barangay No. 55-B, Salet-Bulangon",
          "Barangay No. 55-C, Vira",
          "Barangay No. 56-A, Bacsil North",
          "Barangay No. 56-B, Bacsil South",
          "Barangay No. 57, Pila",
          "Barangay No. 58, Casili",
          "Barangay No. 59-A, Dibua South",
          "Barangay No. 59-B, Dibua North",
          "Barangay No. 6, San Agustin",
          "Barangay No. 60-A, Caaoacan",
          "Barangay No. 60-B, Madiladig",
          "Barangay No. 61, Cataban",
          "Barangay No. 62-A, Navotas North",
          "Barangay No. 62-B, Navotas South",
          "Barangay No. 63-A, Antangin",
          "Barangay No. 63-B, Sipa",
          "Barangay No. 64, Patipunan",
          "Barangay No. 65, Carcay-Cabasat",
          "Barangay No. 66-A, Bacarra East",
          "Barangay No. 66-B, Bacarra West"
        ],
        "Paoay": [
          "Alae",
          "Bucao",
          "Caradang",
          "Cayanga",
          "Dammay",
          "Dulag",
          "Lomboy",
          "Nagbalayong",
          "Pagturay",
          "Paoay Proper",
          "San Juan",
          "San Pedro",
          "San Vicente",
          "Sina",
          "Santo Niño",
          "Santo Tomas",
          "Saray",
          "Talingaan"
        ],
        "Pasuquin": [
          "Bantay",
          "Bantayuan",
          "Basing",
          "Cabugao",
          "Calaocan",
          "Capangpang",
          "Darbayan",
          "Dumnag",
          "Gumawid",
          "Lumboy",
          "Magatol",
          "Malaca",
          "Malangog",
          "Maringnasan",
          "Minggoy",
          "San Andres",
          "San Emilio",
          "San Fernando",
          "San Juan",
          "San Isidro",
          "San Mateo",
          "San Pascual",
          "San Roque",
          "San Vicente",
          "Sinaol",
          "Sung-an"
        ],
        "Piddig": [
          "Aglipay",
          "Aladanan",
          "Alicia",
          "Basilan",
          "Bedia",
          "Burlangit",
          "Cagayan",
          "Calubcub",
          "Canayunan",
          "Cabugao",
          "Colaguing",
          "Dale",
          "Diddig",
          "Librada",
          "Lunas",
          "Malalag",
          "Man-Agit",
          "Matnog",
          "Naguilian",
          "San Juan",
          "San Roque",
          "Santa Fe",
          "Santiago",
          "Tagudin"
        ],
        "San Nicolas": [
          "Alicia",
          "Bacuit",
          "Bangon",
          "Bansad",
          "Batac",
          "Bongalon",
          "Cabadiangan",
          "Cabul-an",
          "Caitlangued",
          "Camises",
          "Capoocan",
          "Casalmingan",
          "Cerrera",
          "Guibang",
          "Lipay",
          "Lomo-lomo",
          "Macabago",
          "Magsangit",
          "Malasin",
          "Maringal",
          "Masiray",
          "Santo Niño",
          "Santo Tomas",
          "San Vicente",
          "Santa Maria",
          "Saray",
          "Talaga"
        ],
        "Sarrat": [
          "Abay",
          "Batuan",
          "Batino",
          "Biliw",
          "Cacapag",
          "Capitangan",
          "Causip",
          "Calumbuyan",
          "Dablon",
          "Dinnow",
          "Dumadar",
          "Gabut Norte",
          "Gacayan",
          "Malabon",
          "Mabisog",
          "Macupit",
          "Magsangit",
          "Manangkil",
          "Nalbo",
          "Nagparabuhan",
          "San Guillermo",
          "San Jose",
          "San Juan",
          "San Pedro",
          "Santa Maria",
          "Suyo"
        ],
        "Solsona": [
          "Alicia",
          "Bato",
          "Bica",
          "Catacbacan",
          "Cabayao",
          "Caranglaan",
          "Cagaluan",
          "Dacuya",
          "Dumalayap",
          "Gam-ud",
          "Pangil",
          "Pantaran",
          "Parpan",
          "Poblacion I",
          "Poblacion II",
          "San Isidro",
          "San Juan",
          "San Marcos",
          "San Mateo",
          "San Roque",
          "San Vicente",
          "Santa Cruz",
          "Tabag"
        ],
        "Vintar": [
          "Abao",
          "Abang",
          "Alimbuyog",
          "Balbalan",
          "Bangbang",
          "Bating",
          "Binagbagan",
          "Calaga",
          "Canio",
          "Cautit",
          "Cerca",
          "Guinoyuran",
          "Lactudan",
          "Lagip",
          "Lumanog",
          "Malaya",
          "Matasam",
          "Nagcalibang",
          "Pallaruan",
          "Paracan",
          "Piddig",
          "San Antonio",
          "San Isidro",
          "San Julian",
          "San Pedro",
          "San Vicente"
        ]
      },

    }, "Ilocos Sur": {
      cities: {
        "Alilem": [
          "Daya", "Alilem", "Amilongan", "Alilem", "Anaao", "Alilem", "Apang", "Alilem", "Apaya", "Alilem",
          "Batbato", "Alilem", "Daddaay", "Alilem", "Dalawa", "Alilem", "Kiat", "Alilem"
        ],
        "Banayoyo": [
          "Bagbagotot", "Banayoyo", "Banbanaal", "Banayoyo", "Bisangol", "Banayoyo", "Cadanglaan", "Banayoyo",
          "Casilagan Norte", "Banayoyo", "Casilagan Sur", "Banayoyo", "Elefante", "Banayoyo", "Guardia", "Banayoyo",
          "Lintic", "Banayoyo", "Lopez", "Banayoyo", "Montero", "Banayoyo", "Naguimba", "Banayoyo", "Pila", "Banayoyo",
          "Poblacion", "Banayoyo"
        ],
        "Bantay": [
          "Aggay", "Bantay", "An-annam", "Bantay", "Balaleng", "Bantay", "Banaoang", "Bantay", "Barangay 1", "Bantay",
          "Barangay 2", "Bantay", "Barangay 3", "Bantay", "Barangay 4", "Bantay", "Barangay 5", "Bantay", "Barangay 6", "Bantay",
          "Bulag", "Bantay", "Buquig", "Bantay", "Cabalanggan", "Bantay", "Cabaroan", "Bantay", "Cabusligan", "Bantay",
          "Capangdanan", "Bantay", "Guimod", "Bantay", "Lingsat", "Bantay", "Malingeb", "Bantay", "Mira", "Bantay",
          "Naguiddayan", "Bantay", "Ora", "Bantay", "Paing", "Bantay", "Puspus", "Bantay", "Quimmarayan", "Bantay",
          "Sagneb", "Bantay", "Sagpat", "Bantay", "San Isidro", "Bantay", "San Julian", "Bantay", "San Mariano", "Bantay",
          "Sinabaan", "Bantay", "Taguiporo", "Bantay", "Taleb", "Bantay", "Tay-ac", "Bantay"
        ],
        "Burgos": [
          "Ambugat", "Burgos", "Balugang", "Burgos", "Bangbangar", "Burgos", "Bessang", "Burgos", "Cabcaburao", "Burgos",
          "Cadacad", "Burgos", "Callitong", "Burgos", "Dayanki", "Burgos", "Dirdirig", "Burgos", "Lesseb", "Burgos",
          "Lubing", "Burgos", "Lucaban", "Burgos", "Luna", "Burgos", "Macaoayan", "Burgos", "Mambug", "Burgos",
          "Manaboc", "Burgos", "Mapanit", "Burgos", "Nagpanaoan", "Burgos", "Paduros", "Burgos", "Patac", "Burgos",
          "Poblacion Norte", "Burgos", "Poblacion Sur", "Burgos", "Sabangan Pinggan", "Burgos", "Subadi Norte", "Burgos",
          "Subadi Sur", "Burgos", "Taliao", "Burgos"
        ],
        "Cabugao": [
          "Alinaay", "Cabugao", "Aragan", "Cabugao", "Arnap", "Cabugao", "Baclig", "Cabugao", "Bato", "Cabugao",
          "Bonifacio", "Cabugao", "Bungro", "Cabugao", "Cacadiran", "Cabugao", "Caellayan", "Cabugao", "Carusipan", "Cabugao",
          "Catucdaan", "Cabugao", "Cuancabal", "Cabugao", "Cuantacla", "Cabugao", "Daclapan", "Cabugao", "Dardarat", "Cabugao",
          "Lipit", "Cabugao", "Maradodon", "Cabugao", "Margaay", "Cabugao", "Nagsantaan", "Cabugao", "Nagsincaoan", "Cabugao",
          "Namruangan", "Cabugao", "Pila", "Cabugao", "Pug-os", "Cabugao", "Quezon", "Cabugao", "Reppaac", "Cabugao",
          "Rizal", "Cabugao", "Sabang", "Cabugao", "Sagayaden", "Cabugao", "Salapasap", "Cabugao", "Salomague", "Cabugao",
          "Sisim", "Cabugao", "Turod", "Cabugao", "Turod-Patac", "Cabugao"
        ],
        "Caoayan": [
          "Bambang", "Caoayan", "Banaoang", "Caoayan", "Barit", "Caoayan", "Baraoas", "Caoayan", "Bati", "Caoayan",
          "Cabaroan", "Caoayan", "Cabrera", "Caoayan", "Caloocan", "Caoayan", "Cataggaman", "Caoayan", "Dandan", "Caoayan",
          "Dardarat", "Caoayan", "Dumlao", "Caoayan", "Liwan", "Caoayan", "Madang", "Caoayan", "Maranao", "Caoayan",
          "Masi", "Caoayan", "San Antonio", "Caoayan", "San Isidro", "Caoayan", "San Juan", "Caoayan", "San Pedro", "Caoayan",
          "San Vicente", "Caoayan", "Sungadan", "Caoayan"
        ],
        "Candon": [
          "Alayap", "Candon", "Bangcusay", "Candon", "Batac", "Candon", "Bubuneg", "Candon", "Bura", "Candon",
          "Dadao", "Candon", "Dalangpan", "Candon", "Dinaig", "Candon", "Gabel", "Candon", "Gapang", "Candon",
          "Guinaang", "Candon", "Gumatdang", "Candon", "Laoag", "Candon", "Naburot", "Candon", "Narvacan", "Candon",
          "Poblao", "Candon", "Pugar", "Candon", "Sagana", "Candon", "San Pedro", "Candon", "San Vicente", "Candon",
          "San Jose", "Candon", "Sinait", "Candon", "Sison", "Candon"
        ],
        "Cervantes": [
          "Alilem", "Cervantes", "Anonang", "Cervantes", "Atap", "Cervantes", "Balatoc", "Cervantes", "Balili", "Cervantes",
          "Banag", "Cervantes", "Banaoang", "Cervantes", "Dummun", "Cervantes", "Kabalawan", "Cervantes", "Kalinggag", "Cervantes",
          "Naguirib", "Cervantes", "Suyoc", "Cervantes", "Timmag", "Cervantes", "Tupay", "Cervantes"
        ],
        "Galimuyod": [
          "Banang", "Galimuyod", "Barangay 1", "Galimuyod", "Barangay 2", "Galimuyod", "Barangay 3", "Galimuyod",
          "Barangay 4", "Galimuyod", "Barangay 5", "Galimuyod", "Barangay 6", "Galimuyod", "Barangay 7", "Galimuyod",
          "Barangay 8", "Galimuyod", "Dapdap", "Galimuyod", "Macupang", "Galimuyod", "Magsangit", "Galimuyod",
          "Manaoag", "Galimuyod", "Manilag", "Galimuyod", "Manlapig", "Galimuyod", "San Jose", "Galimuyod"
        ],
        "Nagbukel": [
          "Ananman", "Nagbukel", "Bangbang", "Nagbukel", "Baritan", "Nagbukel", "Biga", "Nagbukel", "Dapdapan", "Nagbukel",
          "Dinaig", "Nagbukel", "Lamao", "Nagbukel", "Malasin", "Nagbukel", "Pagabuan", "Nagbukel", "Pangis", "Nagbukel",
          "San Agustin", "Nagbukel", "San Isidro", "Nagbukel", "San Jose", "Nagbukel", "San Pedro", "Nagbukel"
        ],
        "Paoay": [
          "Agbay", "Paoay", "Alagao", "Paoay", "Bamba", "Paoay", "Bangui", "Paoay", "Banug", "Paoay",
          "Cabanglasan", "Paoay", "Cachipil", "Paoay", "Dila", "Paoay", "Loquillo", "Paoay", "Nagpartian", "Paoay",
          "Pansur", "Paoay", "San Antonio", "Paoay", "San Juan", "Paoay", "San Miguel", "Paoay", "Sangay", "Paoay"
        ],
        "Santa": [
          "Alangigan", "Santa", "Baclong", "Santa", "Bancao", "Santa", "Bangui", "Santa", "Banneng", "Santa",
          "Cacar", "Santa", "Capangpangan", "Santa", "Caoayan", "Santa", "Danan", "Santa", "Dagupan", "Santa",
          "Libsang", "Santa", "Mabileng", "Santa", "Poblacion", "Santa", "San Juan", "Santa", "San Nicolas", "Santa",
          "San Vicente", "Santa", "Talisay", "Santa"
        ],
        "Santo Domingo": [
          "Bagumbayan", "Santo Domingo", "Cabanbanan", "Santo Domingo", "Casibarag", "Santo Domingo", "Guisit", "Santo Domingo",
          "Ilas", "Santo Domingo", "La Paz", "Santo Domingo", "Mapang", "Santo Domingo", "Pangasinan", "Santo Domingo",
          "Poblacion", "Santo Domingo", "San Isidro", "Santo Domingo", "San Julian", "Santo Domingo"
        ],
        "Vigan": [
          "Barangay 1", "Vigan", "Barangay 2", "Vigan", "Barangay 3", "Vigan", "Barangay 4", "Vigan",
          "Barangay 5", "Vigan", "Barangay 6", "Vigan", "Barangay 7", "Vigan", "Barangay 8", "Vigan",
          "Barangay 9", "Vigan", "Barangay 10", "Vigan", "Barangay 11", "Vigan", "Barangay 12", "Vigan",
          "Barangay 13", "Vigan", "Barangay 14", "Vigan", "Barangay 15", "Vigan", "Barangay 16", "Vigan",
          "Barangay 17", "Vigan", "Barangay 18", "Vigan", "Barangay 19", "Vigan", "Barangay 20", "Vigan"
        ]
      },

    },
    "Iloilo": {
      cities: {
        "Ajuy": [
          "Adcadarao",
          "Ajuy",
          "Agbobolo",
          "Badiangan",
          "Barrido",
          "Bato Biasong",
          "Bay-ang",
          "Bucana Bunglas",
          "Central",
          "Culasi",
          "Lanjagan",
          "Luca",
          "Malayu-an",
          "Mangorocoro",
          "Nasidman",
          "Pantalan Nabaye",
          "Pantalan Navarro",
          "Pedada",
          "Pili",
          "Pinantan Diel",
          "Pinantan Elizalde",
          "Pinay Espinosa",
          "Poblacion",
          "Progreso",
          "Puente Bunglas",
          "Punta Buri",
          "Rojas",
          "San Antonio",
          "Santo Rosario",
          "Silagon",
          "Tagubanhan",
          "Taguhangin",
          "Tanduyan",
          "Tipacla",
          "Tubogan"
        ],
        "Alimodian": [
          "Abang-abang",
          "Agsing",
          "Atabay",
          "Ba-ong",
          "Bagsakan",
          "Baguingin-Lanot",
          "Bagumbayan-Ilajas",
          "Balabago",
          "Ban-ag",
          "Bancal",
          "Binalud",
          "Bugang",
          "Buhay",
          "Bulod",
          "Cabacanan Proper",
          "Cabacanan Rizal",
          "Cagay",
          "Coline",
          "Coline-Dalag",
          "Cunsad",
          "Cuyad",
          "Dalid",
          "Dao",
          "Gines",
          "Ginomoy",
          "Ingwan",
          "Laylayan",
          "Lico",
          "Luan-luan",
          "Malamboy-Bondolan",
          "Malamhay",
          "Mambawi",
          "Manasa",
          "Manduyog",
          "Pajo",
          "Pianda-an Norte",
          "Pianda-an Sur",
          "Poblacion",
          "Punong",
          "Quinaspan",
          "Sinamay",
          "Sulong",
          "Taban-Manguining",
          "Tabug",
          "Tarug",
          "Tugaslon",
          "Ubodan",
          "Ugbo",
          "Ulay-Bugang",
          "Ulay-Hinablan",
          "Umingan"
        ],
        "Anilao": [
          "Agbatuan",
          "Badiang",
          "Balabag",
          "Balunos",
          "Cag-an",
          "Camiros",
          "Dangula-an",
          "Guipis",
          "Manganese",
          "Medina",
          "Mostro",
          "Palaypay",
          "Pantalan",
          "Poblacion",
          "Sambag Culob",
          "San Carlos",
          "San Juan Crisostomo",
          "Santa Rita",
          "Santo Rosario",
          "Serallo",
          "Vista Alegre"
        ],
        "Badiangan": [
          "Agusipan",
          "Astorga",
          "Bingauan",
          "Bita-oyan",
          "Botong",
          "Budiawe",
          "Cabanga-an",
          "Cabayogan",
          "Calansanan",
          "Catubig",
          "Guinawahan",
          "Ilongbukid",
          "Indorohan",
          "Iniligan",
          "Latawan",
          "Linayuan",
          "Mainguit",
          "Malublub",
          "Manaolan",
          "Mapili Grande",
          "Mapili Sanjo",
          "Odiongan",
          "Poblacion",
          "San Julian",
          "Sariri",
          "Sianon",
          "Sinuagan",
          "Talaba",
          "Tamocol",
          "Teneclan",
          "Tina"
        ],
        "Balasan": [
          "Aranjuez",
          "Bacolod",
          "Balanti-an",
          "Batuan",
          "Cabalic",
          "Camambugan",
          "Dolores",
          "Gimamanay",
          "Ipil",
          "Kinalkalan",
          "Lawis",
          "Malapoc",
          "Mamhut Norte",
          "Mamhut Sur",
          "Maya",
          "Pani-an",
          "Poblacion Norte",
          "Poblacion Sur",
          "Quiasan",
          "Salong",
          "Salvacion",
          "Tingui-an",
          "Zaragosa"
        ],
        "Banate": [
          "Alacaygan",
          "Bariga",
          "Belen",
          "Bobon",
          "Bularan",
          "Carmelo",
          "De La Paz",
          "Dugwakan",
          "Fuentes",
          "Juanico",
          "Libertad",
          "Magdalo",
          "Managopaya",
          "Merced",
          "Poblacion",
          "San Salvador",
          "Talokgangan",
          "Zona Sur"
        ],
        "Barotac Nuevo": [
          "Acuit",
          "Agcuyawan Calsada",
          "Agcuyawan Pulo",
          "Bagongbong",
          "Baras",
          "Bungca",
          "Cabilauan",
          "Cruz",
          "Guintas",
          "Igbong",
          "Ilaud Poblacion",
          "Ilaya Poblacion",
          "Jalaud",
          "Lagubang",
          "Lanas",
          "Lico-an",
          "Linao",
          "Monpon",
          "Palaciawan",
          "Patag",
          "Salihid",
          "So-ol",
          "Sohoton",
          "Tabuc-Suba",
          "Tabucan",
          "Talisay",
          "Tinorian",
          "Tiwi",
          "Tubungan"
        ],
        "Barotac Viejo": [
          "Bugnay",
          "California",
          "De la Peña",
          "Del Pilar",
          "General Luna",
          "La Fortuna",
          "Lipata",
          "Natividad",
          "Nueva Invencion",
          "Nueva Sevilla",
          "Poblacion",
          "Puerto Princesa",
          "Rizal",
          "San Antonio",
          "San Fernando",
          "San Francisco",
          "San Geronimo",
          "San Juan",
          "San Lucas",
          "San Miguel",
          "San Roque",
          "Santiago",
          "Santo Domingo",
          "Santo Tomas",
          "Ugasan",
          "Vista Alegre"
        ],
        "Batad": [
          "Alapasco",
          "Alinsolong",
          "Banban",
          "Batad Viejo",
          "Binon-an",
          "Bolhog",
          "Bulak Norte",
          "Bulak Sur",
          "Cabagohan",
          "Calangag",
          "Caw-i",
          "Drancalan",
          "Embarcadero",
          "Hamod",
          "Malico",
          "Nangka",
          "Pasayan",
          "Poblacion",
          "Quiazan Florete",
          "Quiazan Lopez",
          "Salong",
          "Santa Ana",
          "Tanao",
          "Tapi-an"
        ],
        "Bingawan": [
          "Agba-o",
          "Alabidhan",
          "Bulabog",
          "Cairohan",
          "Guinhulacan",
          "Inamyungan",
          "Malitbog Ilawod",
          "Malitbog Ilaya",
          "Ngingi-an",
          "Poblacion",
          "Quinangyana",
          "Quinar-upan",
          "Tapacon",
          "Tubod"
        ],
        "Dumangas": [
          "Sapao",
          "Sulangan",
          "Tabucan",
          "Talusan",
          "Tambobo",
          "Tamboilan",
          "Victorias"
        ],
        "Estancia": [
          "Bayas",
          "Bayuyan",
          "Botongon",
          "Bulaqueña",
          "Calapdan",
          "Cano-an",
          "Daan Banua",
          "Daculan",
          "Gogo",
          "Jolog",
          "Loguingot",
          "Lonoy",
          "Lumbia",
          "Malbog",
          "Manipulon",
          "Pa-on",
          "Poblacion Zone 1",
          "Poblacion Zone II",
          "Poblacion Zone III",
          "San Roque",
          "Santa Ana",
          "Tabu-an",
          "Tacbuyan",
          "Tanza",
          "Villa Pani-an"
        ],
        "Guimbal": [
          "Anono-o",
          "Bacong",
          "Bagumbayan Poblacion",
          "Balantad-Carlos Fruto",
          "Baras",
          "Binanua-an",
          "Bongol San Miguel",
          "Bongol San Vicente",
          "Bulad",
          "Buluangan",
          "Burgos-Gengos",
          "Cabasi",
          "Cabubugan",
          "Calampitao",
          "Camangahan",
          "Generosa-Cristobal Colon",
          "Gerona-Gimeno",
          "Girado-Magsaysay",
          "Gotera",
          "Igcocolo",
          "Iyasan",
          "Libo-on Gonzales",
          "Lubacan",
          "Nahapay",
          "Nalundan",
          "Nanga",
          "Nito-an Lupsag",
          "Particion",
          "Pescadores",
          "Rizal-Tuguisan",
          "Santa Rosa-Laguna",
          "Sipitan-Badiang",
          "Torreblanca-Blumentritt"
        ],
        "Igbaras": [
          "Alameda",
          "Amorogtong",
          "Anilawan",
          "Bagacay",
          "Bagacayan",
          "Bagay",
          "Balibagan",
          "Barangay 1 Poblacion",
          "Barangay 2 Poblacion",
          "Barangay 3 Poblacion",
          "Barangay 4 Poblacion",
          "Barangay 5 Poblacion",
          "Barangay 6 Poblacion",
          "Barasan",
          "Binanua-an",
          "Boclod",
          "Buenavista",
          "Buga",
          "Bugnay",
          "Calampitao",
          "Cale",
          "Catiringan",
          "Corucuan",
          "Igcabugao",
          "Igpigus",
          "Igtalongon",
          "Indaluyon",
          "Jovellar",
          "Kinagdan",
          "Lab-on",
          "Lacay Dol-Dol",
          "Lumangan",
          "Lutungan",
          "Mantangon",
          "Mulangan",
          "Pasong",
          "Passi",
          "Pinaopawan",
          "Riro-an",
          "San Ambrosio",
          "Santa Barbara",
          "Signe",
          "Tabiac",
          "Talayatay",
          "Taytay",
          "Tigbanaba"
        ],
        "Janiuay": [
          "Abangay",
          "Agcarope",
          "Aglobong",
          "Aguingay",
          "Anhawan",
          "Aquino Nobleza East",
          "Aquino Nobleza West",
          "Atimonan",
          "Balanac",
          "Barasalon",
          "Bongol",
          "Cabantog",
          "Calmay",
          "Canawili",
          "Canawillian",
          "Capt. A. Tirador",
          "Caranas",
          "Caraudan",
          "Carigangan",
          "Concepcion Poblacion",
          "Crispin Salazar North",
          "Crispin Salazar South",
          "Cunsad",
          "Dabong",
          "Damires",
          "Damo-ong",
          "Danao",
          "Don T. Lutero Center",
          "Don T. Lutero East",
          "Don T. Lutero West Poblacion",
          "Gines",
          "Golgota",
          "Guadalupe",
          "Jibolo",
          "Kuyot",
          "Locsin",
          "Madong",
          "Manacabac",
          "Mangil",
          "Matag-ub",
          "Monte-Magapa",
          "Pangilihan",
          "Panuran",
          "Pararinga",
          "Patong-patong",
          "Quipot",
          "R. Armada",
          "S. M. Villa",
          "San Julian",
          "San Pedro",
          "Santa Rita",
          "Santo Tomas",
          "Sarawag",
          "Tambal",
          "Tamu-an",
          "Tiringanan",
          "Tolarucan",
          "Tuburan",
          "Ubian",
          "Yabon"
        ],
        "Lambunao": [
          "Agsirab",
          "Agtuman",
          "Alugmawa",
          "Badiangan",
          "Balagiao",
          "Banban",
          "Bansag",
          "Bayuco",
          "Binaba-an Armada",
          "Binaba-an Labayno",
          "Binaba-an Limoso",
          "Binaba-an Portigo",
          "Binaba-an Tirador",
          "Bogongbong",
          "Bonbon",
          "Bontoc",
          "Buri",
          "Burirao",
          "Buwang",
          "Cabatangan",
          "Cabugao",
          "Cabunlawan",
          "Caguisanan",
          "Caloy-ahan",
          "Caninguan",
          "Capangyan",
          "Cayan Este",
          "Cayan Oeste",
          "Corot-on",
          "Coto",
          "Cubay",
          "Cunarum",
          "Daanbanwa",
          "Gines",
          "Hipgos",
          "Jayubo",
          "Jorog",
          "Lanot Grande",
          "Lanot Pequeño",
          "Legayada",
          "Lumanay",
          "Madarag",
          "Magbato",
          "Maite Grande",
          "Maite Pequeño",
          "Malag-it",
          "Manaulan",
          "Maribong",
          "Marong",
          "Misi",
          "Natividad",
          "Pajo",
          "Pandan",
          "Panuran",
          "Pasig",
          "Patag",
          "Poblacion Ilawod",
          "Poblacion Ilaya",
          "Poong",
          "Pughanan",
          "Pungsod",
          "Quiling",
          "Sagcup",
          "San Gregorio",
          "Sibacungan",
          "Sibaguan",
          "Simsiman",
          "Supoc",
          "Tampucao",
          "Tranghawan",
          "Tubungan",
          "Tuburan",
          "Walang"
        ],
        "Leganes": [
          "Bigke",
          "Buntatala",
          "Cagamutan Norte",
          "Cagamutan Sur",
          "Calaboa",
          "Camangay",
          "Cari Mayor",
          "Cari Minor",
          "Gua-an",
          "Guihaman",
          "Guinobatan",
          "Guintas",
          "Lapayon",
          "M. V. Hechanova",
          "Nabitasan",
          "Napnud",
          "Poblacion",
          "San Vicente"
        ],
        "Lemery": [
          "Agpipili",
          "Alcantara",
          "Almeñana",
          "Anabo",
          "Bankal",
          "Buenavista",
          "Cabantohan",
          "Capiñahan",
          "Dalipe",
          "Dapdapan",
          "Gerongan",
          "Imbaulan",
          "Layogbato",
          "Marapal",
          "Milan",
          "Nagsulang",
          "Nasapahan",
          "Omio",
          "Pacuan",
          "Poblacion NW Zone",
          "Poblacion SE Zone",
          "Pontoc",
          "San Antonio",
          "San Diego",
          "San Jose Moto",
          "Sepanton",
          "Sincua",
          "Tabunan",
          "Tugas",
          "Velasco",
          "Yawyawan"
        ],
        "New Lucena": [
          "Bololacao", "Burot", "Cabilauan", "Cabugao", "Cagban", "Calumbuyan", "Damires",
          "Dawis", "General Delgado", "Guinobatan", "Janipa-an Oeste", "Jelicuon Este",
          "Jelicuon Oeste", "Pasil", "Poblacion", "Wari-wari"
        ],
        "Oton": [
          "Abilay Norte", "Abilay Sur", "Alegre", "Batuan Ilaud", "Batuan Ilaya", "Bita Norte",
          "Bita Sur", "Botong", "Buray", "Cabanbanan", "Caboloan Norte", "Caboloan Sur",
          "Cadinglian", "Cagbang", "Calam-isan", "Galang", "Lambuyao", "Mambog", "Pakiad",
          "Poblacion East", "Poblacion North", "Poblacion South", "Poblacion West", "Polo Maestra Bita",
          "Rizal", "Salngan", "Sambaludan", "San Antonio", "San Nicolas", "Santa Clara", "Santa Monica",
          "Santa Rita", "Tagbac Norte", "Tagbac Sur", "Trapiche", "Tuburan", "Turog-Turog"
        ],
        "Passi": [
          "Agdahon", "Agdayao", "Aglalana", "Agtabo", "Agtambo", "Alimono", "Arac", "Ayuyan",
          "Bacuranan", "Bagacay", "Batu", "Bayan", "Bitaogan", "Buenavista", "Buyo", "Cabunga",
          "Cadilang", "Cairohan", "Dalicanan", "Gegachac", "Gemat-y", "Gemumua-agahon", "Gines Viejo",
          "Imbang Grande", "Jaguimitan", "Libo-o", "Maasin", "Magdungao", "Malag-it Grande",
          "Malag-it Pequeño", "Mambiranan Grande", "Mambiranan Pequeño", "Man-it", "Mantulang",
          "Mulapula", "Nueva Union", "Pagaypay", "Pangi", "Poblacion Ilawod", "Poblacion Ilaya",
          "Punong", "Quinagaringan Grande", "Quinagaringan Pequeño", "Sablogon", "Salngan", "Santo Tomas",
          "Sarapan", "Tagubong", "Talongonan", "Tubod", "Tuburan"
        ],
        "Pavia": [
          "Aganan", "Amparo", "Anilao", "Balabag", "Cabugao Norte", "Cabugao Sur", "Jibao-an",
          "Mali-ao", "Pagsanga-an", "Pal-agon", "Pandac", "Purok I", "Purok II", "Purok III",
          "Purok IV", "Tigum", "Ungka I", "Ungka II"
        ],
        "Pototan": [
          "Abangay", "Amamaros", "Bagacay", "Barasan", "Batuan", "Bongco", "Cahaguichican",
          "Callan", "Cansilayan", "Casalsagan", "Cato-ogan", "Cau-ayan", "Culob", "Danao", "Dapitan",
          "Dawis", "Dongsol", "Fernando Parcon Ward", "Fundacion", "Guibuangan", "Guinacas", "Igang",
          "Intaluan", "Iwa Ilaud", "Iwa Ilaya", "Jamabalud", "Jebioc", "Lay-ahan", "Lopez Jaena Ward",
          "Lumbo", "Macatol", "Malusgod", "Nabitasan", "Naga", "Nanga", "Naslo", "Pajo", "Palanguia",
          "Pitogo", "Polot-an", "Primitivo Ledesma Ward", "Purog", "Rumbang", "San Jose Ward", "Sinuagan",
          "Tuburan", "Tumcon Ilaud", "Tumcon Ilaya", "Ubang", "Zarrague"
        ],
        "San Dionisio": [
          "Agdaliran", "Amayong", "Bagacay", "Batuan", "Bondulan", "Boroñgon", "Canas", "Capinang",
          "Cubay", "Cudionan", "Dugman", "Hacienda Conchita", "Madanlog", "Mandu-awak", "Moto",
          "Naborot", "Nipa", "Odiongan", "Pangi", "Pase", "Poblacion", "San Nicolas", "Santol",
          "Siempreviva", "Sua", "Talo-ato", "Tamangi", "Tiabas", "Tuble"
        ],
        "San Enrique": [
          "Abaca", "Asisig", "Bantayan", "Braulan", "Cabugao Nuevo", "Cabugao Viejo", "Camiri",
          "Catan-agan", "Compo", "Cubay", "Dacal", "Dumiles", "Garita", "Gines Nuevo", "Imbang Pequeño",
          "Imbesad-an", "Iprog", "Lip-ac", "Madarag", "Mapili", "Paga", "Palje", "Poblacion Ilawod",
          "Poblacion Ilaya", "Quinolpan", "Rumagayray", "San Antonio", "Tambunac"
        ],
        "San Joaquin": [
          "Amboyu-an", "Andres Bonifacio", "Antalon", "Bad-as", "Bagumbayan", "Balabago", "Baybay",
          "Bayunan", "Bolbogan", "Bonga", "Bucaya", "Bulho", "Cadluman", "Cadoldolan", "Camaba-an",
          "Camia", "Cata-an", "Crossing Dapuyan", "Cubay", "Cumarascas", "Dacdacanan", "Danawan",
          "Doldol", "Dongoc", "Escalantera", "Ginot-an", "Guibongan Bayunan", "Huna", "Igbaje",
          "Igbangcal", "Igbinangon", "Igburi", "Igcabutong", "Igcadlum", "Igcaphang", "Igcaratong",
          "Igcondao", "Igcores", "Igdagmay", "Igdomingding", "Iglilico", "Igpayong", "Jawod", "Langca",
          "Languanan", "Lawigan", "Lomboy", "Lomboyan", "Lopez Vito", "Mabini Norte", "Mabini Sur",
          "Manhara", "Maninila", "Masagud", "Matambog", "Mayunoc", "Montinola", "Nadsadan", "Nagquirisan",
          "Nagsipit", "New Gumawan", "Panatan", "Pitogo", "Purok 1", "Purok 2", "Purok 3", "Purok 4",
          "Purok 5", "Qui-anan", "Roma", "San Luis", "San Mateo Norte", "San Mateo Sur", "Santa Rita",
          "Santiago", "Sinogbuhan", "Siwaragan", "Talagutac", "Tapikan", "Taslan", "Tiglawa", "Tiolas",
          "To-og", "Torocadan", "Ulay"
        ],
        "San Miguel": [
          "Barangay 1 Poblacion", "Barangay 10", "Barangay 11 Poblacion", "Barangay 12 Poblacion",
          "Barangay 13 Poblacion", "Barangay 14 Poblacion", "Barangay 15 Poblacion", "Barangay 16 Poblacion",
          "Barangay 2 Poblacion", "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion",
          "Barangay 6 Poblacion", "Barangay 7 Poblacion", "Barangay 8 Poblacion", "Barangay 9 Poblacion",
          "Consolacion", "Igtambo", "San Antonio", "San Jose", "Santa Cruz", "Santa Teresa", "Santo Angel",
          "Santo Niño"
        ],
        "San Rafael": [
          "Aripdip", "Bagacay", "Calaigang", "Ilongbukid", "Poblacion", "Poscolon", "San Andres",
          "San Dionisio", "San Florentino"
        ],
        "Santa Barbara": [
          "Agusipan", "Agutayan", "Bagumbayan", "Balabag", "Balibagan Este", "Balibagan Oeste", "Ban-ag",
          "Bantay", "Barangay Zone I", "Barangay Zone II", "Barangay Zone III", "Barangay Zone IV",
          "Barangay Zone V", "Barangay Zone VI", "Barasan Este", "Barasan Oeste", "Binangkilan", "Bitaog-Taytay",
          "Bolong Este", "Bolong Oeste", "Buayahon", "Buyo", "Cabugao Norte", "Cabugao Sur", "Cadagmayan Norte",
          "Cadagmayan Sur", "Cafe", "Calaboa Este", "Calaboa Oeste", "Camambugan", "Canipayan", "Conaynay",
          "Daga", "Dalid", "Duyanduyan", "Gen. Martin T. Delgado", "Guno", "Inangayan", "Jibao-an", "Lacadon",
          "Lanag", "Lupa", "Magancina", "Malawog", "Mambuyo", "Manhayang", "Miraga-Guibuangan", "Nasugban",
          "Omambog", "Pal-agon", "Pungsod", "San Sebastian", "Sangcate", "Tagsing", "Talanghauan",
          "Talongadian", "Tigtig", "Tuburan", "Tugas", "Tungay"
        ],
        "Sara": [
          "Aguirre", "Aldeguer", "Alibayog", "Anoring", "Apelo", "Apologista", "Aposaga", "Arante",
          "Ardemil", "Aspera", "Aswe-Pabriaga", "Bagaygay", "Bakabak", "Batitao", "Bato", "Castor",
          "Crespo", "Del Castillo", "Devera", "Domingo", "Ferraris", "Gildore", "Improgo", "Juaneza",
          "Labigan", "Lanciola", "Latawan", "Malapaya", "Muyco", "Padios", "Pasig", "Poblacion Ilawod",
          "Poblacion Ilaya", "Poblacion Market", "Posadas", "Preciosa", "Salcedo", "San Luis", "Tady",
          "Tentay", "Villahermosa", "Zerrudo"
        ],
        "Tigbauan": [
          "Alupidian", "Atabayan", "Bagacay", "Baguingin", "Bagumbayan", "Bangkal", "Bantud", "Barangay 1",
          "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8",
          "Barangay 9", "Barosong", "Barroc", "Bayuco", "Binaliuan Mayor", "Binaliuan Menor", "Bitas",
          "Buenavista", "Bugasongan", "Buyu-an", "Canabuan", "Cansilayan", "Cordova Norte", "Cordova Sur",
          "Danao", "Dapdap", "Dorong-an", "Guisian", "Isauan", "Isian", "Jamog", "Lanag", "Linobayan",
          "Lubog", "Nagba", "Namocon", "Napnapan Norte", "Napnapan Sur", "Olo Barroc", "Parara Norte",
          "Parara Sur", "San Rafael", "Sermon", "Sipitan", "Supa", "Tan Pael", "Taro"
        ],
        "Tubungan": [
          "Adgao", "Ago", "Ambarihon", "Ayubo", "Bacan", "Badiang", "Bagunanay", "Balicua", "Bantayanan",
          "Barongan", "Bulalacao", "Calagcalag", "Caluway", "Campo", "Canggi", "Cala", "Cuamo", "Danao",
          "Dolong", "Dumarao", "Duran", "Looc", "Maga", "Macapayag", "Malobago", "Man-ug", "Mansuag", "Manuyas",
          "Pagbobol", "Palo", "Pitas", "Pitongan", "Poblacion", "Sambitan", "San Agustin", "San Juan", "San Nicolas",
          "San Roque", "Sapang", "Santo Niño", "Sipital", "Tabutong", "Tambayan", "Tabuan", "Tubungan Barrio"
        ]
      },

    },
    "Isabela": {
      cities: {
        "Alicia": [
          "Amistad", "Antonino", "Apanay", "Aurora", "Bagnos", "Bagong Sikat", "Bantug-Petines", "Bonifacio",
          "Burgos", "Calaocan", "Callao", "Dagupan", "Inanama", "Linglingay", "M. H. del Pilar", "Mabini",
          "Magsaysay", "Mataas na Kahoy", "Paddad", "Rizal", "Rizaluna", "Salvacion", "San Antonio", "San Fernando",
          "San Francisco", "San Juan", "San Pablo", "San Pedro", "Santa Cruz", "Santa Maria", "Santo Domingo",
          "Santo Tomas", "Victoria", "Zamora"
        ],
        "Angadanan": [
          "Allangigan", "Aniog", "Baniket", "Bannawag", "Bantug", "Barangcuag", "Baui", "Bonifacio", "Buenavista",
          "Bunnay", "Calabayan-Minanga", "Calaccab", "Calaocan", "Campanario", "Canangan", "Centro I", "Centro II",
          "Centro III", "Consular", "Cumu", "Dalakip", "Dalenat", "Dipaluda", "Duroc", "Esperanza", "Fugaru",
          "Ingud Norte", "Ingud Sur", "Kalusutan", "La Suerte", "Liwliwa", "Lomboy", "Loria", "Lourdes", "Mabuhay",
          "Macalauat", "Macaniao", "Malannao", "Malasin", "Mangandingay", "Minanga Proper", "Pappat", "Pissay",
          "Ramona", "Rancho Bassit", "Rang-ayan", "Salay", "San Ambrocio", "San Guillermo", "San Isidro",
          "San Marcelo", "San Roque", "San Vicente", "Santo Niño", "Saranay", "Sinabbaran", "Victory", "Viga",
          "Villa Domingo"
        ],
        "Aurora": [
          "Apiat", "Bagnos", "Bagong Tanza", "Ballesteros", "Bannagao", "Bannawag", "Bolinao", "Caipilan",
          "Camarunggayan", "Dalig-Kalinga", "Diamantina", "Divisoria", "Esperanza East", "Esperanza West", "Kalabaza",
          "Macatal", "Malasin", "Nampicuan", "Panecien", "Rizaluna", "San Andres", "San Jose", "San Juan",
          "San Pedro-San Pablo", "San Rafael", "San Ramon", "Santa Rita", "Santa Rosa", "Saranay", "Sili", "Victoria",
          "Villa Fugu", "Villa Nuesa"
        ],
        "Benito Soliven": [
          "Andabuen", "Ara", "Balliao", "Binogtungan", "Capuseran", "Dagupan", "Danipa", "District I", "District II",
          "Gomez", "Guilingan", "La Salette", "Lucban", "Makindol", "Maluno Norte", "Maluno Sur", "Nacalma",
          "New Magsaysay", "Placer", "Punit", "San Carlos", "San Francisco", "Santa Cruz", "Santiago", "Sevillana",
          "Sinipit", "Villaluz", "Yeban Norte", "Yeban Sur"
        ],
        "Burgos": [
          "Bacnor East", "Bacnor West", "Caliguian", "Catabban", "Cullalabo San Antonio", "Cullalabo del Norte",
          "Cullalabo del Sur", "Dalig", "Malasin", "Masigun", "Raniag", "San Bonifacio", "San Miguel", "San Roque"
        ],
        "Cabagan": [
          "Aggub", "Anao", "Angancasilian", "Balasig", "Cansan", "Casibarag Norte", "Casibarag Sur", "Catabayungan",
          "Centro", "Cubag", "Garita", "Luquilu", "Mabangug", "Magassi", "Masipi East", "Masipi West", "Ngarag",
          "Pilig Abajo", "Pilig Alto", "San Antonio", "San Bernardo", "San Juan", "Saui", "Tallag", "Ugad", "Union"
        ],
        "Cabatuan": [
          "Calaocan", "Canan", "Centro", "Culing Centro", "Culing East", "Culing West", "Del Corpuz", "Del Pilar",
          "Diamantina", "La Paz", "Luzon", "Macalaoat", "Magdalena", "Magsaysay", "Namnama", "Nueva Era", "Paraiso",
          "Rang-ay", "Sampaloc", "San Andres", "Saranay", "Tandul"
        ],
        "Cauayan": [
          "Alicaocao", "Alinam", "Amobocan", "Andarayan", "Baculod", "Baringin Norte", "Baringin Sur", "Buena Suerte",
          "Bugallon", "Buyon", "Cabaruan", "Cabugao", "Carabatan Bacareno", "Carabatan Chica", "Carabatan Grande",
          "Carabatan Punta", "Casalatan", "Cassap Fuera", "Catalina", "Culalabat", "Dabburab", "De Vera", "Dianao",
          "Disimuray", "District I", "District II", "District III", "Duminit", "Faustino", "Gagabutan", "Gappal",
          "Guayabal", "Labinab", "Linglingay", "Mabantad", "Maligaya", "Manaoag", "Marabulig I", "Marabulig II",
          "Minante I", "Minante II", "Naganacan", "Nagcampegan", "Nagrumbuan", "Nungnungan I", "Nungnungan II",
          "Pinoma", "Rizal", "Rogus", "San Antonio", "San Fermin", "San Francisco", "San Isidro", "San Luis",
          "San Pablo", "Santa Luciana", "Santa Maria", "Sillawit", "Sinippil", "Tagaran", "Turayong", "Union",
          "Villa Concepcion", "Villa Luna", "Villaflor"
        ],
        "Cordon": [
          "Aguinaldo", "Anonang", "Calimaturod", "Camarao", "Capirpiriwan", "Caquilingan", "Dallao", "Gayong",
          "Laurel", "Magsaysay", "Malapat", "Osmeña", "Quezon", "Quirino", "Rizaluna", "Roxas Poblacion", "Sagat",
          "San Juan", "Taliktik", "Tanggal", "Tarinsing", "Turod Norte", "Turod Sur", "Villamarzo", "Villamiemban",
          "Wigan"
        ],
        "Delfin Albano": [
          "Aga", "Andarayan", "Aneg", "Bayabo", "Calinaoan Sur", "Caloocan", "Capitol", "Carmencita", "Concepcion",
          "Maui", "Quibal", "Ragan Almacen", "Ragan Norte", "Ragan Sur", "Rizal", "San Andres", "San Antonio",
          "San Isidro", "San Jose", "San Juan", "San Macario", "San Nicolas", "San Patricio", "San Roque",
          "Santo Rosario", "Santor", "Villa Luz", "Villa Pereda", "Visitacion"
        ],
        "Dinapigue": [
          "Ayod", "Bucal Norte", "Bucal Sur", "Dibulo", "Digumased", "Dimaluade"
        ],
        "Divilacan": [
          "Bicobian", "Dibulos", "Dicambangan", "Dicaroyan", "Dicatian", "Dilakit", "Dimapnat", "Dimapula",
          "Dimasalansan", "Dipudo", "Ditarum", "Sapinit"
        ], "Echague": [
          "Angoluan",
          "Annafunan",
          "Arabiat",
          "Aromin",
          "Babaran",
          "Bacradal",
          "Benguet",
          "Buneg",
          "Busilelao",
          "Cabugao",
          "Caniguing",
          "Carulay",
          "Castillo",
          "Dammang East",
          "Dammang West",
          "Diasan",
          "Dicaraoyan",
          "Dugayong",
          "Fugu",
          "Garit Norte",
          "Garit Sur",
          "Gucab",
          "Gumbauan",
          "Ipil",
          "Libertad",
          "Mabbayad",
          "Mabuhay",
          "Madadamian",
          "Magleticia",
          "Malibago",
          "Maligaya",
          "Malitao",
          "Narra",
          "Nilumisu",
          "Pag-asa",
          "Pangal Norte",
          "Pangal Sur",
          "Rumang-ay",
          "Salay",
          "Salvacion",
          "San Antonio Minit",
          "San Antonio Ugad",
          "San Carlos",
          "San Fabian",
          "San Felipe",
          "San Juan",
          "San Manuel",
          "San Miguel",
          "San Salvador",
          "Santa Ana",
          "Santa Cruz",
          "Santa Maria",
          "Santa Monica",
          "Santo Domingo",
          "Silauan Norte",
          "Silauan Sur",
          "Sinabbaran",
          "Soyung",
          "Taggappan",
          "Tuguegarao",
          "Villa Campo",
          "Villa Fermin",
          "Villa Rey",
          "Villa Victoria"
        ],
        "Gamu": [
          "Barcolan",
          "Buenavista",
          "Dammao",
          "District I",
          "District II",
          "District III",
          "Furao",
          "Guibang",
          "Lenzon",
          "Linglingay",
          "Mabini",
          "Pintor",
          "Rizal",
          "Songsong",
          "Union",
          "Upi"
        ],
        "Ilagan": [
          "Aggasian",
          "Alibagu",
          "Allinguigan 1st",
          "Allinguigan 2nd",
          "Allinguigan 3rd",
          "Arusip",
          "Baculod",
          "Bagong Silang",
          "Bagumbayan",
          "Baligatan",
          "Ballacong",
          "Bangag",
          "Batong-Labang",
          "Bigao",
          "Cabannungan 1st",
          "Cabannungan 2nd",
          "Cabeseria 10",
          "Cabeseria 14 and 16",
          "Cabeseria 17 and 21",
          "Cabeseria 19",
          "Cabeseria 2",
          "Cabeseria 22",
          "Cabeseria 23",
          "Cabeseria 25",
          "Cabeseria 27",
          "Cabeseria 3",
          "Cabeseria 4",
          "Cabeseria 5",
          "Cabeseria 6 & 24",
          "Cabeseria 7",
          "Cabeseria 9 and 11",
          "Cadu",
          "Calamagui 1st",
          "Calamagui 2nd",
          "Camunatan",
          "Capellan",
          "Capo",
          "Carikkikan Norte",
          "Carikkikan Sur",
          "Centro Poblacion",
          "Centro-San Antonio",
          "Fugu",
          "Fuyo",
          "Gayong-Gayong Norte",
          "Gayong-Gayong Sur",
          "Guinatan",
          "Imelda Bliss Village",
          "Lullutan",
          "Malalam",
          "Malasin",
          "Manaring",
          "Mangcuram",
          "Marana I",
          "Marana II",
          "Marana III",
          "Minabang",
          "Morado",
          "Naguilian Norte",
          "Naguilian Sur",
          "Namnama",
          "Nanaguan",
          "Osmeña",
          "Paliueg",
          "Pasa",
          "Pilar",
          "Quimalabasa",
          "Rang-ayan",
          "Rugao",
          "Salindingan",
          "San Andres",
          "San Felipe",
          "San Ignacio",
          "San Isidro",
          "San Juan",
          "San Lorenzo",
          "San Pablo",
          "San Rodrigo",
          "San Vicente",
          "Santa Barbara",
          "Santa Catalina",
          "Santa Isabel Norte",
          "Santa Isabel Sur",
          "Santa Maria",
          "Santa Victoria",
          "Santo Tomas",
          "Siffu",
          "Sindon Bayabo",
          "Sindon Maride",
          "Sipay",
          "Tangcul",
          "Villa Imelda"
        ],
        "Jones": [
          "Abulan",
          "Addalam",
          "Arubub",
          "Bannawag",
          "Bantay",
          "Barangay I",
          "Barangay II",
          "Barangcuag",
          "Dalibubon",
          "Daligan",
          "Diarao",
          "Dibuluan",
          "Dicamay I",
          "Dicamay II",
          "Dipangit",
          "Disimpit",
          "Divinan",
          "Dumawing",
          "Fugu",
          "Lacab",
          "Linamanan",
          "Linomot",
          "Malannit",
          "Minuri",
          "Namnama",
          "Napaliong",
          "Palagao",
          "Papan Este",
          "Papan Weste",
          "Payac",
          "Pongpongan",
          "San Antonio",
          "San Isidro",
          "San Jose",
          "San Roque",
          "San Sebastian",
          "San Vicente",
          "Santa Isabel",
          "Santo Domingo",
          "Tupax",
          "Usol",
          "Villa Bello"
        ],
        "Luna": [
          "Bustamante",
          "Centro 1",
          "Centro 2",
          "Centro 3",
          "Concepcion",
          "Dadap",
          "Harana",
          "Lalog 1",
          "Lalog 2",
          "Luyao",
          "Macañao",
          "Macugay",
          "Mambabanga",
          "Pulay",
          "Puroc",
          "San Isidro",
          "San Miguel",
          "Santo Domingo",
          "Union Kalinga"
        ],
        "Maconacon": [
          "Aplaya",
          "Canadam",
          "Diana",
          "Eleonor",
          "Fely",
          "Lita",
          "Malasin",
          "Minanga",
          "Reina Mercedes",
          "Santa Marina"
        ],
        "Mallig": [
          "Binmonton",
          "Casili",
          "Centro I",
          "Centro II",
          "Holy Friday",
          "Maligaya",
          "Manano",
          "Olango",
          "Rang-ayan",
          "San Jose Norte I",
          "San Jose Norte II",
          "San Jose Sur",
          "San Pedro",
          "San Ramon",
          "Siempre Viva Norte",
          "Siempre Viva Sur",
          "Trinidad",
          "Victoria"
        ],
        "Naguilian": [
          "Aguinaldo",
          "Bagong Sikat",
          "Burgos",
          "Cabaruan",
          "Flores",
          "La Union",
          "Magsaysay",
          "Manaring",
          "Mansibang",
          "Minallo",
          "Minanga",
          "Palattao",
          "Quezon",
          "Quinalabasa",
          "Quirino",
          "Rangayan",
          "Rizal",
          "Roxas",
          "San Manuel",
          "Santa Victoria",
          "Santo Tomas",
          "Sunlife",
          "Surcoc",
          "Tomines",
          "Villa Paz"
        ],
        "Palanan": [
          "Alomanay",
          "Bisag",
          "Culasi",
          "Dialaoyao",
          "Dicabisagan East",
          "Dicabisagan West",
          "Dicadyuan",
          "Diddadungan",
          "Didiyan",
          "Dimalicu-licu",
          "Dimasari",
          "Dimatican",
          "Maligaya",
          "Marikit",
          "San Isidro",
          "Santa Jacinta",
          "Villa Robles"
        ],
        "Quezon": [
          "Abut",
          "Alunan",
          "Arellano",
          "Aurora",
          "Barucboc Norte",
          "Calangigan",
          "Dunmon",
          "Estrada",
          "Lepanto",
          "Mangga",
          "Minagbag",
          "Samonte",
          "San Juan",
          "Santos",
          "Turod"
        ],
        "Quirino": [
          "Binarzang",
          "Cabaruan",
          "Camaal",
          "Dolores",
          "Luna",
          "Manaoag",
          "Rizal",
          "San Isidro",
          "San Jose",
          "San Juan",
          "San Mateo",
          "San Vicente",
          "Santa Catalina",
          "Santa Lucia",
          "Santiago",
          "Santo Domingo",
          "Sinait",
          "Suerte",
          "Villa Bulusan",
          "Villa Miguel",
          "Vintar"
        ],
        "Ramon": [
          "Ambatali",
          "Bantug",
          "Bugallon Norte",
          "Bugallon Proper",
          "Burgos",
          "General Aguinaldo",
          "Nagbacalan",
          "Oscariz",
          "Pabil",
          "Pagrang-ayan",
          "Planas"
        ]
      }


    }, "Kalinga": {
      cities: {
        "Balbalan": [
          "Ababa-an",
          "Balantoy",
          "Balbalan Proper",
          "Balbalasang",
          "Buaya",
          "Dao-angan",
          "Gawa-an",
          "Mabaca",
          "Maling",
          "Pantikian",
          "Poblacion",
          "Poswoy",
          "Talalang",
          "Tawang"
        ],
        "Lubuagan": [
          "Antonio Canao",
          "Dangoy",
          "Lower Uma",
          "Mabilong",
          "Mabongtot",
          "Poblacion",
          "Tanglag",
          "Uma del Norte",
          "Upper Uma"
        ],
        "Pasil": [
          "Ableg",
          "Bagtayan",
          "Balatoc",
          "Balenciagao Sur",
          "Balinciagao Norte",
          "Cagaluan",
          "Colayo",
          "Dalupa",
          "Dangtalan",
          "Galdang",
          "Guina-ang",
          "Magsilay",
          "Malucsad",
          "Pugong"
        ],
        "Pinukpuk": [
          "Aciga",
          "Allaguia",
          "Ammacian",
          "Apatan",
          "Asibanglan",
          "Ba-ay",
          "Ballayangon",
          "Bayao",
          "Camalog",
          "Cawagayan",
          "Dugpa",
          "Katabbogan",
          "Limos",
          "Magaogao",
          "Malagnat",
          "Mapaco",
          "Pakawit",
          "Pinococ",
          "Pinukpuk Junction",
          "Socbot",
          "Taga",
          "Taggay",
          "Wagud"
        ],
        "Rizal": [
          "Babalag East",
          "Babalag West",
          "Bulbol",
          "Calaocan",
          "Kinama",
          "Liwan East",
          "Liwan West",
          "Macutay",
          "Romualdez",
          "San Francisco",
          "San Pascual",
          "San Pedro",
          "San Quintin",
          "Santor"
        ],
        "Tabuk": [
          "Agbannawag",
          "Amlao",
          "Appas",
          "Bado Dangwa",
          "Bagumbayan",
          "Balawag",
          "Balong",
          "Bantay",
          "Bulanao",
          "Bulanao Norte",
          "Bulo",
          "Cabaritan",
          "Cabaruan",
          "Calaccad",
          "Calanan",
          "Casigayan",
          "Cudal",
          "Dagupan Centro",
          "Dagupan Weste",
          "Dilag",
          "Dupag",
          "Gobgob",
          "Guilayon",
          "Ipil",
          "Lacnog",
          "Lacnog West",
          "Lanna",
          "Laya East",
          "Laya West",
          "Lucog",
          "Magnao",
          "Magsaysay",
          "Malalao",
          "Malin-awa",
          "Masablang",
          "Nambaran",
          "Nambucayan",
          "Naneng",
          "New Tanglag",
          "San Juan",
          "San Julian",
          "Suyang",
          "Tuga"
        ],
        "Tanudan": [
          "Anggacan",
          "Anggacan Sur",
          "Babbanoy",
          "Dacalan",
          "Dupligan",
          "Gaang",
          "Lay-asan",
          "Lower Lubo",
          "Lower Mangali",
          "Lower Taloctoc",
          "Mabaca",
          "Mangali Centro",
          "Pangol",
          "Poblacion",
          "Upper Lubo",
          "Upper Taloctoc"
        ],
        "Tinglayan": [
          "Ambato Legleg",
          "Bangad Centro",
          "Basao",
          "Belong Manubal",
          "Bugnay",
          "Buscalan",
          "Butbut",
          "Dananao",
          "Loccong",
          "Lower Bangad",
          "Luplupa",
          "Mallango",
          "Ngibat",
          "Old Tinglayan",
          "Poblacion",
          "Sumadel 1",
          "Sumadel 2",
          "Tulgao East",
          "Tulgao West",
          "Upper Bangad"
        ]
      }

    },
    "Laguna": {
      cities: {
        "Alaminos": [
          "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Del Carmen", "Palma",
          "San Agustin", "San Andres", "San Benito", "San Gregorio", "San Ildefonso", "San Juan",
          "San Miguel", "San Roque", "Santa Rosa"
        ],
        "Bay": [
          "Bitin", "Calo", "Dila", "Maitim", "Masaya", "Paciano Rizal", "Puypuy", "San Agustin",
          "San Antonio", "San Isidro", "San Nicolas", "Santa Cruz", "Santo Domingo", "Tagumpay",
          "Tranca"
        ],
        "Biñan": [
          "Biñan", "Bungahan", "Canlalay", "Casile", "De La Paz", "Ganado", "Langkiwa", "Loma",
          "Malaban", "Malamig", "Mampalasan", "Platero", "Poblacion", "San Antonio", "San Francisco",
          "San Jose", "San Vicente", "Santo Domingo", "Santo Niño", "Santo Tomas", "Soro-soro",
          "Timbao", "Tubigan", "Zapote"
        ],
        "Cabuyao": [
          "Baclaran", "Banaybanay", "Banlic", "Barangay Dos", "Barangay Tres", "Barangay Uno",
          "Bigaa", "Butong", "Casile", "Diezmo", "Gulod", "Mamatid", "Marinig", "Niugan", "Pittland",
          "Pulo", "Sala", "San Isidro"
        ],
        "Calamba": [
          "Bagong Kalsada", "Banadero", "Banlic", "Barandal", "Barangay 1", "Barangay 2", "Barangay 3",
          "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Batino", "Bubuyan", "Bucal", "Bunggo",
          "Burol", "Camaligan", "Canlubang", "Halang", "Hornalan", "Kay-Anlog", "La Mesa", "Laguerta",
          "Lawa", "Lecheria", "Lingga", "Looc", "Mabato", "Majada Labas", "Makiling", "Mapagong", "Masili",
          "Maunong", "Mayapa", "Milagrosa", "Paciano Rizal", "Palingon", "Palo-Alto", "Pansol", "Parian",
          "Prinza", "Punta", "Puting Lupa", "Real", "Saimsim", "Sampiruhan", "San Cristobal", "San Jose",
          "San Juan", "Sirang Lupa", "Sucol", "Turbina", "Ulango", "Uwisan"
        ],
        "Calauan": [
          "Balayhangin", "Bangyas", "Dayap", "Hanggan", "Imok", "Kanluran", "Lamot 1", "Lamot 2", "Limao",
          "Mabacan", "Masiit", "Paliparan", "Perez", "Prinza", "San Isidro", "Santo Tomas", "Silangan"
        ],
        "Cavinti": [
          "Anglas", "Bangco", "Bukal", "Bulajo", "Cansuso", "Duhat", "Inao-awan", "Kanluran Talaongan",
          "Labayo", "Layasin", "Layug", "Mahipon", "Paowin", "Poblacion", "Silangan Talaongan", "Sisilmin",
          "Sumucab", "Tibatib", "Udia"
        ],
        "Famy": [
          "Asana", "Bacong-Sigsigan", "Bagong Pag-asa", "Balitoc", "Banaba", "Batuhan", "Bulihan", "Caballero",
          "Calumpang", "Cuebang Bato", "Damayan", "Kapatalan", "Kataypuanan", "Liyang", "Maate", "Magdalo",
          "Mayatba", "Minayutan", "Salangbato", "Tunhac"
        ],
        "Liliw": [
          "Bagong Anyo", "Bayate", "Bongkol", "Bubukal", "Cabuyao", "Calumpang", "Culoy", "Dagatan", "Daniw",
          "Dita", "Ibabang Palina", "Ibabang San Roque", "Ibabang Sungi", "Ibabang Taykin", "Ilayang Palina",
          "Ilayang San Roque", "Ilayang Sungi", "Ilayang Taykin", "Kanlurang Bukal", "Laguan", "Luquin",
          "Malabo-Kalantukan", "Masikap", "Maslun", "Mojon", "Novaliches", "Oples", "Pag-asa", "Palayan",
          "Rizal", "San Isidro", "Silangang Bukal", "Tuy-Baanan"
        ],
        "Los Baños": [
          "Anos", "Bagong Silang", "Bambang", "Batong Malake", "Baybayin", "Bayog", "Lalakay", "Maahas",
          "Malinta", "Mayondon", "Putho Tuntungin", "San Antonio", "Tadlak", "Timugan"
        ],
        "Luisiana": [
          "Barangay Zone I", "Barangay Zone II", "Barangay Zone III", "Barangay Zone IV", "Barangay Zone V",
          "Barangay Zone VI", "Barangay Zone VII", "Barangay Zone VIII", "De La Paz", "San Antonio",
          "San Buenaventura", "San Diego", "San Isidro", "San Jose", "San Juan", "San Luis", "San Pablo",
          "San Pedro", "San Rafael", "San Roque", "San Salvador", "Santo Domingo", "Santo Tomas"
        ],
        "Lumban": [
          "Bagong Silang", "Balimbingan", "Balubad", "Caliraya", "Concepcion", "Lewin", "Maracta", "Maytalang I",
          "Maytalang II", "Primera Parang", "Primera Pulo", "Salac", "Santo Niño", "Segunda Parang",
          "Segunda Pulo", "Wawa"
        ],
        "Mabitac": [
          "Amuyong",
          "Bayanihan",
          "Lambac",
          "Libis ng Nayon",
          "Lucong",
          "Maligaya",
          "Masikap",
          "Matalatala",
          "Nanguma",
          "Numero",
          "Paagahan",
          "Pag-asa",
          "San Antonio",
          "San Miguel",
          "Sinagtala"
        ],
        "Magdalena": [
          "Alipit",
          "Baanan",
          "Balanac",
          "Bucal",
          "Buenavista",
          "Bungkol",
          "Buo",
          "Burlungan",
          "Cigaras",
          "Halayhayin",
          "Ibabang Atingay",
          "Ibabang Butnong",
          "Ilayang Atingay",
          "Ilayang Butnong",
          "Ilog",
          "Malaking Ambling",
          "Malinao",
          "Maravilla",
          "Munting Ambling",
          "Poblacion",
          "Sabang",
          "Salasad",
          "Tanawan",
          "Tipunan"
        ],
        "Majayjay": [
          "Amonoy",
          "Bakia",
          "Balanac",
          "Balayong",
          "Banilad",
          "Banti",
          "Bitaoy",
          "Botocan",
          "Bukal",
          "Burgos",
          "Burol",
          "Coralao",
          "Gagalot",
          "Ibabang Banga",
          "Ibabang Bayucain",
          "Ilayang Banga",
          "Ilayang Bayucain",
          "Isabang",
          "Malinao",
          "May-it",
          "Munting Kawayan",
          "Olla",
          "Oobi",
          "Origuel",
          "Panalaban",
          "Pangil",
          "Panglan",
          "Piit",
          "Pook",
          "Rizal",
          "San Francisco",
          "San Isidro",
          "San Miguel",
          "San Roque",
          "Santa Catalina",
          "Suba",
          "Talortor",
          "Tanawan",
          "Taytay",
          "Villa Nogales"
        ],
        "Nagcarlan": [
          "Abo",
          "Alibungbungan",
          "Alumbrado",
          "Balayong",
          "Balimbing",
          "Balinacon",
          "Bambang",
          "Banago",
          "Banca-banca",
          "Bangcuro",
          "Banilad",
          "Bayaquitos",
          "Buboy",
          "Buenavista",
          "Buhanginan",
          "Bukal",
          "Bunga",
          "Cabuyew",
          "Calumpang",
          "Kanluran Kabubuhayan",
          "Kanluran Lazaan",
          "Labangan",
          "Lagulo",
          "Lawaguin",
          "Maiit",
          "Malaya",
          "Malinao",
          "Manaol",
          "Maravilla",
          "Nagcalbang",
          "Oples",
          "Palayan",
          "Palina",
          "Poblacion I",
          "Poblacion II",
          "Poblacion III",
          "Sabang",
          "San Francisco",
          "Santa Lucia",
          "Sibulan",
          "Silangan Ilaya",
          "Silangan Kabubuhayan",
          "Silangan Lazaan",
          "Silangan Napapatid",
          "Sinipian",
          "Sulsuguin",
          "Talahib",
          "Talangan",
          "Taytay",
          "Tipacan",
          "Wakat",
          "Yukos"
        ],
        "Paete": [
          "Bagumbayan",
          "Bangkusay",
          "Ermita",
          "Ibaba del Norte",
          "Ibaba del Sur",
          "Ilaya del Norte",
          "Ilaya del Sur",
          "Maytoong",
          "Quinale"
        ],
        "Pagsanjan": [
          "Anibong",
          "Barangay I",
          "Barangay II",
          "Biñan",
          "Buboy",
          "Cabanbanan",
          "Calusiche",
          "Dingin",
          "Lambac",
          "Layugan",
          "Magdapio",
          "Maulawin",
          "Pinagsanjan",
          "Sabang",
          "Sampaloc",
          "San Isidro"
        ],
        "Pakil": [
          "Banilan",
          "Baño",
          "Burgos",
          "Casa Real",
          "Casinsin",
          "Dorado",
          "Gonzales",
          "Kabulusan",
          "Matikiw",
          "Rizal",
          "Saray",
          "Taft",
          "Tavera"
        ],
        "Pangil": [
          "Balian",
          "Dambo",
          "Galalan",
          "Isla",
          "Mabato-Azufre",
          "Natividad",
          "San Jose",
          "Sulib"
        ],
        "Pila": [
          "Aplaya",
          "Bagong Pook",
          "Bukal",
          "Bulilan Norte",
          "Bulilan Sur",
          "Concepcion",
          "Labuin",
          "Linga",
          "Masico",
          "Mojon",
          "Pansol",
          "Pinagbayanan",
          "San Antonio",
          "San Miguel",
          "Santa Clara Norte",
          "Santa Clara Sur",
          "Tubuan"
        ],
        "Rizal": [
          "Antipolo",
          "East Poblacion",
          "Entablado",
          "Laguan",
          "Paule 1",
          "Paule 2",
          "Pook",
          "Tala",
          "Talaga",
          "Tuy",
          "West Poblacion"
        ],
        "San Pablo": [
          "Atisan",
          "Bagong Bayan II-A",
          "Bagong Pook VI-C",
          "Barangay I-A",
          "Barangay I-B",
          "Barangay II-A",
          "Barangay II-B",
          "Barangay II-C",
          "Barangay II-D",
          "Barangay II-E",
          "Barangay II-F",
          "Barangay III-A",
          "Barangay III-B",
          "Barangay III-C",
          "Barangay III-D",
          "Barangay III-E",
          "Barangay III-F",
          "Barangay IV-A",
          "Barangay IV-B",
          "Barangay IV-C",
          "Barangay V-A",
          "Barangay V-B",
          "Barangay V-C",
          "Barangay V-D",
          "Barangay VI-A",
          "Barangay VI-B",
          "Barangay VI-D",
          "Barangay VI-E",
          "Barangay VII-A",
          "Barangay VII-B",
          "Barangay VII-C",
          "Barangay VII-D",
          "Barangay VII-E",
          "Bautista",
          "Concepcion",
          "Del Remedio",
          "Dolores",
          "San Antonio 1",
          "San Antonio 2",
          "San Bartolome",
          "San Buenaventura",
          "San Crispin",
          "San Cristobal",
          "San Diego",
          "San Francisco",
          "San Gabriel",
          "San Gregorio",
          "San Ignacio",
          "San Isidro",
          "San Joaquin",
          "San Jose",
          "San Juan",
          "San Lorenzo",
          "San Lucas 1",
          "San Lucas 2",
          "San Marcos",
          "San Mateo",
          "San Miguel",
          "San Nicolas",
          "San Pedro",
          "San Rafael",
          "San Roque",
          "San Vicente",
          "Santa Ana",
          "Santa Catalina",
          "Santa Cruz",
          "Santa Elena",
          "Santa Felomina",
          "Santa Isabel",
          "Santa Maria",
          "Santa Maria Magdalena",
          "Santa Monica",
          "Santa Veronica",
          "Santiago I",
          "Santiago II",
          "Santisimo Rosario",
          "Santo Angel",
          "Santo Cristo",
          "Santo Niño",
          "Soledad"
        ],
        "San Pedro": [
          "Bagong Silang",
          "Calendola",
          "Chrysanthemum",
          "Cuyab",
          "Estrella",
          "Fatima",
          "G.S.I.S.",
          "Landayan",
          "Langgam",
          "Laram",
          "Magsaysay",
          "Maharlika",
          "Narra",
          "Nueva",
          "Pacita 1",
          "Pacita 2",
          "Poblacion",
          "Riverside",
          "Rosario",
          "Sampaguita Village",
          "San Antonio",
          "San Lorenzo Ruiz",
          "San Roque",
          "San Vicente",
          "San Pedro",
          "Santo Niño",
          "United Bayanihan",
          "United Better Living"
        ],
        "Santa Cruz": [
          "Alipit",
          "Bagumbayan",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Bubukal",
          "Calios",
          "Duhat",
          "Gatid",
          "Jasaan",
          "Labuin",
          "Malinao",
          "Oogong",
          "Pandan",
          "Poblacion",
          "San Antonio",
          "San Isidro",
          "San Juan",
          "San Jose",
          "San Juan",
          "San Rafael",
          "Santa Isabel"
        ],
        "Santa Maria": [
          "Alangilan",
          "Asal",
          "Balibago",
          "Balon-balon",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Barangay VI",
          "Bubuyog",
          "Kagubatan",
          "Maligaya",
          "Pandan",
          "San Juan",
          "San Luis",
          "San Pedro",
          "San Vicente",
          "Santo Niño",
          "Tumana",
          "Tubung Lapu-lapu"
        ],
        "Siniloan": [
          "Balungay",
          "Bangon",
          "Bansud",
          "Banwao",
          "Bugan",
          "Bulong",
          "Dampalit",
          "Darayon",
          "Dulong Bayan",
          "Gabao",
          "Guinabaan",
          "San Isidro",
          "San Pedro",
          "San Rafael",
          "San Vicente",
          "Santa Rosa"
        ],
        "Victoria": [
          "Bait-Bait",
          "Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Barangay 7",
          "Barangay 8",
          "Barangay 9",
          "Barangay 10",
          "Bangbang",
          "Bantol",
          "Bulong-Bulong",
          "Casing",
          "Casinatan",
          "Ilaya",
          "Isla"
        ]
      }

    },
    "Lanao del Norte": {
      cities: {
        "Bacolod": [
          "Alegria", "Babalaya", "Babalayan Townsite", "Binuni", "Delabayan West", "Demologan", "Dimarao", "Esperanza", "Kahayag", "Liangan East", "Mati", "Minaulon", "Pagayawan", "Poblacion Bacolod", "Punod", "Rupagan"
        ],
        "Baloi": [
          "Abaga", "Adapun-Ali", "Angandog", "Angayen", "Bangko", "Batolacongan", "Buenavista", "Cadayonan", "Landa", "Lumbac", "Mamaanun", "Maria-Cristina", "Matampay", "Nangka", "Pacalundo", "Poblacion East", "Poblacion West", "Sandor", "Sangcad", "Sarip-Alawi", "Sigayan"
        ],
        "Baroy": [
          "Andil", "Bagong Dawis", "Baroy Daku", "Bato", "Cabasagan", "Dalama", "Libertad", "Limwag", "Lindongan", "Maliwanag", "Manan-ao", "Pange", "Pindolonan", "Poblacion", "Princesa", "Rawan Point", "Riverside", "Sagadan", "Sagadan Upper", "Salong", "San Juan", "Tinubdan", "Village"
        ],
        "Kapatagan": [
          "Bagong Badian", "Bagong Silang", "Balili", "Bansarvil", "Belis", "Buenavista", "Butadon", "Cathedral Falls", "Concepcion", "Curvada", "De Asis", "Donggoan", "Durano", "Kahayagan", "Kidalos", "La Libertad", "Lapinig", "Mahayahay", "Malinas", "Maranding", "Margos", "Poblacion", "Pulang Yuta", "San Isidro", "San Vicente", "Santa Cruz", "Santo Tomas", "Suso", "Taguitic", "Tiacongan", "Tipolo", "Tulatulahan", "Waterfalls"
        ],
        "Kauswagan": [
          "Bagumbayan", "Bara-ason", "Cayontor", "Delabayan", "Inudaran", "Kawit Occidental", "Kawit Oriental", "Libertad", "Paiton", "Poblacion", "Tacub", "Tingintingin", "Tugar"
        ],
        "Kolambugan": [
          "Austin Heights", "Baybay", "Bubong", "Caromatan", "Inudaran", "Kulasihan", "Libertad", "Lumbac", "Manga", "Matampay", "Mukas", "Muntay", "Pagalungan", "Palao", "Pantaon", "Pantar", "Poblacion", "Rebucon", "Riverside", "San Roque", "Santo Niño", "Simbuco", "Small Banisilan", "Sucodan", "Tabigue", "Titunod"
        ],
        "Lala": [
          "Abaga", "Andil", "Cabasagan", "Camalan", "Darumawang Bucana", "Darumawang Ilaya", "El Salvador", "Gumagamot", "Lala Proper", "Lanipao", "Magpatao", "Maranding", "Matampay Bucana", "Matampay Ilaya", "Pacita", "Pendolonan", "Pinoyak", "Raw-an", "Rebe", "San Isidro Lower", "San Isidro Upper", "San Manuel", "Santa Cruz Lower", "Santa Cruz Upper", "Simpak", "Tenazas", "Tuna-an"
        ],
        "Linamon": [
          "Busque", "Larapan", "Magoong", "Napo", "Poblacion", "Purakan", "Robocon", "Samburon"
        ],
        "Magsaysay": [
          "Babasalon", "Baguiguicon", "Daan Campo", "Durianon", "Ilihan", "Lamigadato", "Lemoncret", "Lower Caningag", "Lubo", "Lumbac", "Malabaogan", "Mapantao", "Olango", "Pangao", "Pelingkingan", "Poblacion", "Rarab", "Somiorang", "Talambo", "Tambacon", "Tawinian", "Tipaan", "Tombador", "Upper Caningag"
        ],
        "Maigo": [
          "Balagatasa", "Camp 1", "Claro M. Recto", "Inoma", "Kulasihan", "Labuay", "Liangan West", "Mahayahay", "Maliwanag", "Mentring", "Poblacion", "Santa Cruz", "Segapod"
        ],
        "Matungao": [
          "Bangco", "Batal", "Batangan", "Bubong Radapan", "Cadayonan", "Matampay", "Pangi", "Pasayanon", "Poblacion", "Puntod", "Santa Cruz", "Somiorang"
        ],
        "Munai": [
          "Bacayawan", "Balabacun", "Balintad", "Dalama", "Kadayonan", "Lindongan", "Lingco-an", "Lininding", "Lumba-Bayabao", "Madaya", "Maganding", "Matampay", "North Cadulawan", "Old Poblacion", "Panggao", "Pantao", "Pantao-A-Munai", "Pantaon", "Pindolonan", "Punong", "Ramain", "Sandigamunai", "Tagoranao", "Tambo", "Tamparan", "Taporog"
        ],
        "Nunungan": [
          "Abaga", "Bangco", "Cabasaran", "Canibongan", "Dimayon", "Inayawan", "Kaludan", "Karcum", "Katubuan", "Liangan", "Lupitan", "Malaig", "Mangan", "Masibay", "Notongan", "Panganapan", "Pantar", "Paridi", "Petadun", "Poblacion", "Rarab", "Raraban", "Rebucon", "Songgod", "Taraka"
        ],
        "Pantao Ragat": [
          "Aloon", "Banday", "Bobonga Pantao Ragat", "Bobonga Radapan", "Cabasagan", "Calawe", "Culubun", "Dilimbayan", "Dimayon", "Lomidong", "Madaya", "Maliwanag", "Matampay", "Natangcopan", "Pansor", "Pantao Marug", "Poblacion East", "Poblacion West", "Tangcal", "Tongcopan"
        ],
        "Pantar": [
          "Bangcal", "Bowi", "Bubong Madaya", "Cabasaran", "Cadayonan", "Campong", "Dibarosan", "Kalanganan East", "Kalanganan Lower", "Kalilangan", "Lumba-Punod", "Pantao-Marug", "Pantao-Ranao", "Pantar East", "Pitubo", "Poblacion", "Poona-Punod", "Punod", "Sundiga-Punod", "Tawanan", "West Pantar"
        ],
        "Poona Piagapo": [
          "Alowin", "Bubong-Dinaig", "Cabasaran", "Cadayonan", "Caromatan", "Daramba", "Dinaig", "Kablangan", "Linindingan", "Lumbatan", "Lupitan", "Madamba", "Madaya", "Maliwanag", "Nunang", "Nunungan", "Pantao Raya", "Pantaon", "Pendolonan", "Pened", "Piangamangaan", "Poblacion", "Sulo", "Tagoranao", "Tangclao", "Timbangalan"
        ],
        "Salvador": [
          "Barandia", "Bulacon", "Buntong", "Calimodan", "Camp III", "Curva-Miagao", "Daligdigan", "Inasagan", "Kilala", "Mabatao", "Madaya", "Mamaanon", "Mapantao", "Mindalano", "Padianan", "Pagalongan", "Pagayawan", "Panaliwad-on", "Pangantapan", "Pansor", "Patidon", "Pawak", "Poblacion", "Saumay", "Sudlon"
        ],
        "Sapad": [
          "Baning", "Buriasan", "Dansalan", "Gamal", "Inudaran I", "Inudaran II", "Karkum", "Katipunan", "Mabugnao", "Maito Salug", "Mala Salug", "Mama-anon", "Mapurog", "Pancilan", "Panoloon", "Pili", "Sapad"
        ],
        "Sultan Naga Dimaporo": [
          "Bangaan", "Bangco", "Bansarvil II", "Bauyan", "Cabongbongan", "Calibao", "Calipapa", "Calube", "Campo Islam", "Capocao", "Dabliston", "Dalama", "Dangulaan", "Ditago", "Ilian", "Kauswagan", "Kirapan", "Koreo", "Lantawan", "Mabuhay", "Maguindanao", "Mahayahay", "Mamagum", "Mina", "Pandanan", "Payong", "Pikalawag", "Pikinit", "Piraka", "Poblacion", "Ramain", "Rebucon", "Sigayan", "Sugod", "Tagulo", "Tantaon", "Topocon"
        ],
        "Tagoloan": [
          "Dalamas", "Darimbang", "Dimayon", "Inagongan", "Kiazar", "Malimbato", "Panalawan"
        ],
        "Tangcal": [
          "Bayabao", "Berwar", "Big Banisilon", "Big Meladoc", "Bubong", "Lamaosa", "Linao", "Lindongan", "Lingco-an", "Papan", "Pelingkingan", "Poblacion", "Poona Kapatagan", "Punod", "Small Banisilon", "Small Meladoc", "Somiorang", "Tangcal Proper"
        ],
        "Tubod": [
          "Barakanas", "Baris", "Bualan", "Bulod", "Camp V", "Candis", "Caniogan", "Dalama", "Kakai Renabor", "Kalilangan", "Licapao", "Malingao", "Palao", "Patudan", "Pigcarangan", "Pinpin", "Poblacion", "Pualas", "San Antonio", "Santo Niño", "Taden", "Taguranao", "Tangueguiron", "Tubaran"
        ]
      }


    }, "Lanao del Sur": {
      cities: {
        "Amai Manabilang": [
          "Bagumbayan",
          "Bandara-Ingud",
          "Comara",
          "Frankfort",
          "Lambanogan",
          "Lico",
          "Mansilano",
          "Natangcopan",
          "Pagalamatan",
          "Pagonayan",
          "Piagma",
          "Poblacion",
          "Punud",
          "Ranao-Baning",
          "Sagua-an",
          "Salam",
          "Sumugot"
        ],
        "Bacolod-Kalawi": [
          "Ampao",
          "Bagoaingud",
          "Balut",
          "Barua",
          "Buadiawani",
          "Bubong",
          "Daramoyod",
          "Dilabayan",
          "Dipatuan",
          "Gandamato",
          "Gurain",
          "Ilian",
          "Lama",
          "Liawao",
          "Lumbaca-Ingud",
          "Madanding",
          "Orong",
          "Pindolonan",
          "Poblacion I",
          "Poblacion II",
          "Raya",
          "Rorowan",
          "Sugod",
          "Tambo",
          "Tuka I",
          "Tuka II"
        ],
        "Balabagan": [
          "Bagoaingud",
          "Banago",
          "Barorao",
          "Batuan",
          "Budas",
          "Buenavista",
          "Buisan",
          "Calilangan",
          "Igabay",
          "Ilian",
          "Lalabuan",
          "Lorenzo",
          "Lower Itil",
          "Lumbac",
          "Macao",
          "Magulalung Occidental",
          "Magulalung Oriental",
          "Matampay",
          "Matanog",
          "Molimoc",
          "Narra",
          "Pindolonan",
          "Plasan",
          "Poblacion",
          "Purakan",
          "Tataya",
          "Upper Itil"
        ],
        "Balindong": [
          "Abaga",
          "Bantoga Wato",
          "Barit",
          "Bolinsong",
          "Borakis",
          "Bualan",
          "Bubong",
          "Bubong Cadapaan",
          "Cadapaan",
          "Cadayonan",
          "Dadayag",
          "Dado",
          "Dibarusan",
          "Dilausan",
          "Dimarao",
          "Ingud",
          "Kaluntay",
          "Lalabuan",
          "Lati",
          "Lilod",
          "Limbo",
          "Lumbac Lalan",
          "Lumbac Wato",
          "Lumbayao",
          "Magarang",
          "Malaig",
          "Nusa Lumba Ranao",
          "Padila",
          "Pagayawan",
          "Paigoay",
          "Pantaragoo",
          "Poblacion",
          "Raya",
          "Salipongan",
          "Talub",
          "Tantua Raya",
          "Tomarompong",
          "Tuka Bubong"
        ],
        "Bayang": [
          "Bagoaingud",
          "Bairan",
          "Bandingun",
          "Biabi",
          "Bialaan",
          "Bubong Lilod",
          "Bubong Raya",
          "Cadayonan",
          "Cadingilan Occidental",
          "Cadingilan Oriental",
          "Condaraan Poblacion",
          "Cormatan",
          "Gandamato",
          "Ilian",
          "Lalapung Central",
          "Lalapung Proper",
          "Lalapung Upper",
          "Linao",
          "Linuk",
          "Liong",
          "Lumbac",
          "Lumbac Cadayonan",
          "Maliwanag",
          "Mapantao",
          "Mimbalawag",
          "Palao",
          "Pama-an",
          "Pamacotan",
          "Pantar",
          "Parao",
          "Patong",
          "Poblacion",
          "Porotan",
          "Rantian",
          "Raya Cadayonan",
          "Rinabor",
          "Samporna",
          "Sapa",
          "Silid",
          "Sugod",
          "Sultan Pandapatan",
          "Sumbag",
          "Tagoranao",
          "Tangcal",
          "Tangcal Proper",
          "Tomarompong",
          "Tomongcal Ligi",
          "Torogan",
          "Tuca"
        ],
        "Binidayan": [
          "Badak",
          "Baguiangun",
          "Balut Maito",
          "Basak",
          "Bubong",
          "Bubonga-Ranao",
          "Dansalan Dacsula",
          "Ingud",
          "Kialilidan",
          "Lumbac",
          "Macaguiling",
          "Madaya",
          "Magonaya",
          "Maindig",
          "Masolun",
          "Olama",
          "Pagalamatan",
          "Pantar",
          "Picalilangan",
          "Picotaan",
          "Pindolonan",
          "Poblacion",
          "Soldaroro",
          "Tambac",
          "Timbangan",
          "Tuca"
        ],
        "Buadiposo-Buntong": [
          "Bacolod",
          "Bangon",
          "Bangon Proper",
          "Boto Ragondingan",
          "Buadiposo Lilod",
          "Buadiposo Proper",
          "Buadiposo Raya",
          "Bubong",
          "Buntong Proper",
          "Cadayonan",
          "Dansalan",
          "Datu Tambara",
          "Dirisan",
          "Gata",
          "Kalakala",
          "Katogonan",
          "Lumbac",
          "Lumbatan Manacab",
          "Lumbatan Pataingud",
          "Lunduban",
          "Manacab",
          "Minanga",
          "Paling",
          "Pindolonan",
          "Pualas",
          "Ragondingan East",
          "Ragondingan Proper",
          "Ragondingan West",
          "Raya Buntong",
          "Sapot",
          "Tangcal",
          "Tarik",
          "Tuka"
        ],
        "Lumba-Bayabao": [
          "Bacolod I",
          "Bacolod II",
          "Bantayao",
          "Barit",
          "Baugan",
          "Buad Lumbac",
          "Cabasaran",
          "Calilangan",
          "Carandangan-Mipaga",
          "Cormatan Langban",
          "Dialongana",
          "Dilindongan-Cadayonan",
          "Gadongan",
          "Galawan",
          "Gambai",
          "Kasola",
          "Lalangitun",
          "Lama",
          "Lindongan Dialongana",
          "Lobo Basara",
          "Lumbac Bacayawan",
          "Macaguiling",
          "Mapantao",
          "Mapoling",
          "Maribo",
          "Minaring Diladigan",
          "Pagayawan",
          "Posudaragat",
          "Rumayas",
          "Sabala Bantayao",
          "Salaman",
          "Salolodun Berwar",
          "Sarigidan Madiar",
          "Sunggod",
          "Taluan",
          "Tamlang",
          "Tongcopan",
          "Turogan"
        ],
        "Lumbaca-Unayan": [
          "Bangon",
          "Beta",
          "Calalon",
          "Calipapa",
          "Dilausan",
          "Dimapaok",
          "Lumbac Dilausan",
          "Oriental Beta",
          "Tringun"
        ],
        "Lumbatan": [
          "Alog",
          "Basayungun",
          "Buad",
          "Bubong Macadar",
          "Budi",
          "Dago-ok",
          "Dalama",
          "Dalipuga",
          "Lalapung",
          "Ligue",
          "Lumbac",
          "Lumbac Bacayawan",
          "Lunay",
          "Macadar",
          "Madaya",
          "Minanga",
          "Pantar",
          "Penaring",
          "Picotaan",
          "Poblacion",
          "Tambac"
        ],
        "Lumbayanague": [
          "Bagoaingud",
          "Balaigay",
          "Bualan",
          "Cabuntungan",
          "Cadayonan",
          "Cadingilan",
          "Cadingilan A",
          "Casalayan",
          "Dala",
          "Dilimbayan",
          "Diromoyod",
          "Kabasaran",
          "Lamin",
          "Mapantao-Balangas",
          "Miniros",
          "Nanagun",
          "Pantaon",
          "Pindolonan",
          "Pitatanglan",
          "Poctan",
          "Singcara",
          "Wago"
        ],
        "Madalum": [
          "Abaga",
          "Bacayawan",
          "Bagoaingud",
          "Basak",
          "Bato",
          "Bubong",
          "Cabasaran",
          "Cadayonan",
          "Dandamun",
          "Delausan",
          "Diampaca",
          "Dibarosan",
          "Gadongan",
          "Gurain",
          "Kormatan",
          "Liangan",
          "Liangan I",
          "Lilitun",
          "Linao",
          "Linuk",
          "Lumbac",
          "Madaya",
          "Padian Torogan I",
          "Pagayawan",
          "Paridi-Kalimodan",
          "Poblacion",
          "Punud",
          "Racotan",
          "Raya",
          "Riray",
          "Sabanding",
          "Salongabanding",
          "Sogod Kaloy",
          "Sugod",
          "Tamporong",
          "Tongantongan",
          "Udangun"
        ],
        "Madamba": [
          "Balagunun",
          "Balintad",
          "Bawang",
          "Biabe",
          "Bubong Uyaan",
          "Cabasaran",
          "Dibarusan",
          "Ilian",
          "Lakitan",
          "Liangan",
          "Linuk",
          "Lumbaca Ingud",
          "Madamba",
          "Pagayonan",
          "Palao",
          "Pangadapan",
          "Pantaon",
          "Pantar",
          "Punud",
          "Tambo",
          "Tubaran",
          "Tuca",
          "Tulay",
          "Uyaan Proper"
        ],
        "Maguing": [
          "Agagan",
          "Balagunun",
          "Balawag",
          "Balintao",
          "Bato-bato",
          "Bolao",
          "Borocot",
          "Borrowa",
          "Botud",
          "Buadiangkay",
          "Bubong",
          "Bubong Bayabao",
          "Camalig",
          "Cambong",
          "Dilausan",
          "Dilimbayan",
          "Ilalag",
          "Kianodan",
          "Lilod Borocot",
          "Lilod Maguing",
          "Lumbac",
          "Lumbac-Dimarao",
          "Madanding",
          "Madaya",
          "Maguing Proper",
          "Malungun",
          "Malungun Borocot",
          "Malungun Pagalongan",
          "Pagalongan",
          "Panayangan",
          "Pilimoknan",
          "Pindolonan",
          "Ragayan",
          "Sabala Dilausan"
        ],
        "Malabang": [
          "BPS Village",
          "Bacayawan",
          "Badak Lumao",
          "Bagoaingud",
          "Banday",
          "Betayan",
          "Boniga",
          "Bunk House",
          "Cabasaran",
          "Calibagat",
          "Calumbog",
          "Campo Muslim",
          "China Town",
          "Corahab",
          "Diamaro",
          "Inandayan",
          "Jose Abad Santos",
          "Lamin",
          "Mable",
          "Macuranding",
          "Madaya",
          "Mananayo",
          "Manggahan",
          "Masao",
          "Matalin",
          "Matampay",
          "Matling",
          "Montay",
          "Pasir",
          "Pialot",
          "Rebocun",
          "Sarang",
          "Sumbagarogong",
          "Tacub",
          "Tambara",
          "Tiongcop",
          "Tuboc"
        ],
        "Marantao": [
          "Bacayawan",
          "Bacong",
          "Banga-Pantar",
          "Batal-Punud",
          "Bubong Madanding",
          "Camalig",
          "Camalig Bandara Ingud",
          "Camalig Bubong",
          "Cawayan",
          "Cawayan Bacolod",
          "Cawayan Kalaw",
          "Cawayan Linuk",
          "Daanaingud",
          "Ilian",
          "Inudaran Campong",
          "Inudaran Loway",
          "Inudaran Lumbac",
          "Kialdan",
          "Lubo",
          "Lumbac Kialdan",
          "Mantapoli",
          "Matampay",
          "Maul",
          "Maul Ilian",
          "Maul Lumbaca Ingud",
          "Nataron",
          "Pagalongan Bacayawan",
          "Palao",
          "Pataimas",
          "Poblacion",
          "Poona Marantao",
          "Punud Proper",
          "Tacub",
          "Tuca Kialdan"
        ],
        "Marawi": [
          "Ambolong",
          "Amito Marantao",
          "Bacolod Chico Proper",
          "Banga",
          "Bangco",
          "Banggolo Poblacion",
          "Bangon",
          "Basak Malutlut",
          "Beyaba-Damag",
          "Bito Buadi Itowa",
          "Bito Buadi Parba",
          "Boganga",
          "Boto Ambolong",
          "Buadi Sacayo",
          "Bubong Lumbac",
          "Bubonga Cadayonan",
          "Bubonga Lilod Madaya",
          "Bubonga Marawi",
          "Bubonga Pagalamatan",
          "Bubonga Punod",
          "Cabasaran",
          "Cabingan",
          "Cadayonan",
          "Cadayonan I",
          "Calocan East",
          "Calocan West",
          "Daguduban",
          "Dansalan",
          "Datu Naga",
          "Datu sa Dansalan",
          "Dayawan",
          "Dimaluna",
          "Dulay",
          "Dulay West",
          "East Basak",
          "Emie Punud",
          "Fort",
          "Gadongan",
          "Gadongan Mapantao",
          "Guimba",
          "Kapantaran",
          "Kilala",
          "Kormatan Matampay",
          "Lilod Madaya",
          "Lilod Saduc",
          "Lomidong",
          "Lumbac Marinaut",
          "Lumbaca Madaya",
          "Lumbaca Toros",
          "Malimono",
          "Marawi Poblacion",
          "Marinaut East",
          "Marinaut West",
          "Matampay",
          "Mipaga Proper",
          "Moncado Colony",
          "Moncado Kadingilan",
          "Moriatao Loksadato",
          "Navarro",
          "Norhaya Village",
          "Olawa Ambolong",
          "Pagalamatan Gambai",
          "Pagayawan",
          "Panggao Saduc",
          "Pantaon",
          "Papandayan",
          "Papandayan Caniogan",
          "Paridi",
          "Patani",
          "Pindolonan",
          "Poona Marantao",
          "Pugaan",
          "Rapasun MSU",
          "Raya Madaya I",
          "Raya Madaya II",
          "Raya Saduc",
          "Rorogagus East",
          "Rorogagus Proper",
          "Sabala Manao",
          "Sabala Manao Proper",
          "Saduc Proper",
          "Sagonsongan",
          "Sangcay Dansalan",
          "Somiorang",
          "South Madaya Proper",
          "Sugod Proper",
          "Tampilong",
          "Timbangalan",
          "Tolali",
          "Tongantongan-Tuca Timbangalan",
          "Toros",
          "Tuca",
          "Tuca Ambolong",
          "Tuca Marinaut",
          "Wawalayan Calocan",
          "Wawalayan Marinaut"
        ],
        "Marogong": [
          "Bagumbayan",
          "Balut",
          "Bitayan",
          "Bolawan",
          "Bonga",
          "Cabasaran",
          "Cadayonan",
          "Cahera",
          "Cairantang",
          "Calumbog",
          "Canibongan",
          "Diragun",
          "Mantailoco",
          "Mapantao",
          "Marogong East",
          "Marogong Proper",
          "Mayaman",
          "Pabrica",
          "Paigoay Coda",
          "Pasayanan",
          "Piangologan",
          "Puracan",
          "Romagondong",
          "Sarang"
        ],
        "Masiu": [
          "Abdullah Buisan",
          "Alip Lalabuan",
          "Alumpang Paino Mimbalay",
          "Buadi Amloy",
          "Caramian Alim Raya",
          "Dalog Balut",
          "Gindolongan Alabat",
          "Gondarangin Asa Adigao",
          "Kalilangan",
          "Laila Lumbac Bacon",
          "Lakadun"
        ],
        "Masiu": [
          "Lanco Dimapatoy",
          "Lomigis Sucod",
          "Lumbaca Ingud",
          "Macabangan Imbala",
          "Macadaag Talaguian",
          "Macalupang Lumbac Caramian",
          "Macompara Apa Mimbalay",
          "Magayo Bagoaingud",
          "Mai Ditimbang Balindong",
          "Mai Sindaoloan Dansalan",
          "Manalocon Talub",
          "Maranat Bontalis",
          "Matao Araza",
          "Mocamad Tangul",
          "Moriatao-Bai Labay",
          "Pantao",
          "Putad Marandang Buisan",
          "Sambowang Atawa",
          "Sawir",
          "Talub Langi",
          "Tamboro Cormatan",
          "Tomambiling Lumbaca Ingud",
          "Towanao Arangga",
          "Unda Dayawan"
        ],
        "Mulondo": [
          "Bagoaingud",
          "Bangon",
          "Buadi-Abala",
          "Buadi-Bayawa",
          "Buadi-Insuba",
          "Bubong",
          "Bubonga Guilopa",
          "Cabasaran",
          "Cairatan",
          "Cormatan",
          "Dalama",
          "Dansalan",
          "Dimarao",
          "Guilopa",
          "Ilian",
          "Kitambugun",
          "Lama",
          "Lilod",
          "Lilod Raybalai",
          "Lumbac",
          "Lumbaca Ingud",
          "Madaya",
          "Pindolonan",
          "Poblacion",
          "Salipongan",
          "Sugan"
        ],
        "Pagayawan": [
          "Ayong",
          "Bandara Ingud",
          "Bangon",
          "Biala-an",
          "Diampaca",
          "Guiarong",
          "Ilian",
          "Kalaludan",
          "Linindingan",
          "Madang",
          "Mapantao",
          "Ngingir",
          "Padas",
          "Paigoay",
          "Pinalangca",
          "Poblacion",
          "Rangiran",
          "Rubokun"
        ],
        "Piagapo": [
          "Aposong",
          "Bagoaingud",
          "Bangco",
          "Bansayan",
          "Basak",
          "Bobo",
          "Bualan",
          "Bubong Ilian",
          "Bubong Tawa-an",
          "Bubonga Mamaanun",
          "Gacap",
          "Ilian",
          "Ilian Poblacion",
          "Kalanganan",
          "Katumbacan",
          "Lininding",
          "Lumbaca Mamaan",
          "Mamaanun",
          "Mentring",
          "Olango",
          "Palacat",
          "Palao",
          "Paling",
          "Pantaon",
          "Pantar",
          "Paridi",
          "Pindolonan",
          "Radapan",
          "Radapan Poblacion",
          "Rantian",
          "Sapingit",
          "Talao",
          "Tambo",
          "Tapocan",
          "Taporug",
          "Tawaan",
          "Udalo"
        ],
        "Picong": [
          "Anas",
          "Bara-as",
          "Biasong",
          "Bulangos",
          "Durian",
          "Ilian",
          "Liangan",
          "Maganding",
          "Maladi",
          "Mapantao",
          "Micalubo",
          "Mimbalawag",
          "Pindolonan",
          "Punong",
          "Ramitan",
          "Torogan",
          "Tual",
          "Tuca",
          "Ubanoban"
        ],
        "Poona Bayabao": [
          "Ataragadong",
          "Bangon",
          "Bansayan",
          "Bualan",
          "Bubong-Dimunda",
          "Bugaran",
          "Cadayonan",
          "Calilangan Dicala",
          "Calupaan",
          "Dilausan",
          "Dimayon",
          "Dongcoan",
          "Gadongan",
          "Liangan",
          "Lumbac",
          "Lumbaca Ingud",
          "Madanding",
          "Pantao",
          "Poblacion",
          "Punud",
          "Ragayan",
          "Rogan Cairan",
          "Rogan Tandiong Dimayon",
          "Talaguian",
          "Taporog"
        ],
        "Pualas": [
          "Badak",
          "Bantayan",
          "Basagad",
          "Bolinsong",
          "Boring",
          "Bualan",
          "Danugan",
          "Dapao",
          "Diamla",
          "Gadongan",
          "Ingud",
          "Linuk",
          "Lumbac",
          "Maligo",
          "Masao",
          "Notong",
          "Porug",
          "Romagondong",
          "Tambo",
          "Tamlang",
          "Tomarompong",
          "Tuka",
          "Yaran"
        ],
        "Saguiaran": [
          "Alinun",
          "Bagoaingud",
          "Basak Maito",
          "Batangan",
          "Bubong",
          "Cadayon",
          "Cadingilan",
          "Comonal",
          "Dilausan",
          "Dilimbayan",
          "Gadongan",
          "Limogao",
          "Linao",
          "Lumbac Toros",
          "Lumbayanague",
          "Maliwanag",
          "Mapantao",
          "Mipaga",
          "Natangcopan",
          "Pagalamatan",
          "Pamacotan",
          "Panggao",
          "Pantao Raya",
          "Pantaon",
          "Patpangkat",
          "Pawak",
          "Pindolonan",
          "Poblacion",
          "Salocad",
          "Sungcod"
        ],
        "Sultan Dumalondong": [
          "Bacayawan",
          "Buta",
          "Dinganun Guilopa",
          "Lumbac",
          "Malalis",
          "Pagalongan",
          "Tagoranao"
        ],
        "Tagoloan II": [
          "Bagoaingud",
          "Bantalan",
          "Bayog",
          "Cadayonan",
          "Dagonalan",
          "Dimalama",
          "Gayakay",
          "Inodaran",
          "Kalilangan",
          "Kianibong",
          "Kingan",
          "Kitaon",
          "Maimbaguiang",
          "Malinao",
          "Malingon",
          "Mama-an Pagalongan",
          "Marawi",
          "Sigayan",
          "Tagoloan Poblacion"
        ],
        "Tamparan": [
          "Balutmadiar",
          "Bangon",
          "Beruar",
          "Bocalan",
          "Cabasaran",
          "Dasomalong",
          "Dilausan",
          "Ginaopan",
          "Lalabuan",
          "Lilod Tamparan",
          "Lilod Tubok",
          "Lindongan",
          "Linuk",
          "Linuk Oriental",
          "Lumbac",
          "Lumbaca Ingud",
          "Lumbaca Lilod",
          "Lumbacaingud South",
          "Maidan Linuk",
          "Mala-abangon",
          "Maliwanag",
          "Mariatao Datu",
          "Minanga",
          "Miondas",
          "New Lumbacaingud",
          "Occidental Linuk",
          "Pagalamatan Linuk",
          "Pagayawan",
          "Picarabawan",
          "Pimbago-Pagalongan",
          "Pindolonan Mariatao Sarip",
          "Poblacion I",
          "Poblacion II",
          "Poblacion III",
          "Poblacion IV",
          "Raya Buadi Barao",
          "Raya Niondas",
          "Raya Tamparan",
          "Salongabanding",
          "Saminunggay",
          "Talub",
          "Tatayawan North",
          "Tatayawan South",
          "Tubok"
        ],
        "Taraka": [
          "Bandera Buisan",
          "Boriongan",
          "Borowa",
          "Buadi Amao",
          "Buadi Amunta",
          "Buadi Amunud",
          "Buadi Arorao",
          "Buadi Atopa",
          "Buadi Dayomangga",
          "Buadi Dingun",
          "Buadi Ongcalo",
          "Bucalan",
          "Cadayonan Bagumbayan",
          "Caramat",
          "Carandangan Calopaan",
          "Datu Ma-as",
          "Dilabayan",
          "Dimayon",
          "Gapao Balindong",
          "Ilian",
          "Lumasa",
          "Lumasa Proper",
          "Lumbac Bagoaingud",
          "Lumbac Bubong Maindang",
          "Lumbac Pitakus",
          "Malungun",
          "Mangayao",
          "Maruhom",
          "Masolun",
          "Moriatao Loksa Datu",
          "Pagalamatan",
          "Pindolonan",
          "Pitakus",
          "Ririk",
          "Salipongan",
          "Sambolawan",
          "Samporna Salamatollah",
          "Sigayan Proper",
          "Somiorang Bandingun",
          "Sunding",
          "Sunggod",
          "Supangan",
          "Tupa-an Buadiatupa"
        ],
        "Tubaran": [
          "Alog",
          "Bagiangun",
          "Beta",
          "Campo",
          "Datumanong",
          "Dinaigan",
          "Gadongan",
          "Gaput",
          "Guiarong",
          "Madaya",
          "Malaganding",
          "Metadicop",
          "Mindamudag",
          "Pagalamatan",
          "Paigoay-Pimbataan",
          "Poblacion",
          "Polo",
          "Riantaran",
          "Tangcal",
          "Tubaran Proper",
          "Wago"
        ],
        "Tugaya": [
          "Bagoaingud",
          "Buadi Alawang",
          "Buadi Dico",
          "Bubong",
          "Campong Talao",
          "Cayagan",
          "Dandanun",
          "Dilimbayan",
          "Gurain",
          "Lumbac",
          "Maidan",
          "Mapantao",
          "Pagalamatan",
          "Pandiaranao",
          "Pindolonan I",
          "Pindolonan II",
          "Poblacion",
          "Putad",
          "Raya",
          "Sugod I",
          "Sugod Mawatan",
          "Sumbaga Rogong",
          "Tangcal"
        ],
        "Wao": [
          "Amoyong",
          "Balatin",
          "Banga",
          "Bo-ot",
          "Buntongun",
          "Cebuano Group",
          "Christian Village",
          "Eastern Wao",
          "Extension Poblacion",
          "Gata",
          "Kabatangan",
          "Kadingilan",
          "Katutungan",
          "Kilikili East",
          "Kilikili West",
          "Malaigang",
          "Manila Group",
          "Milaya",
          "Mimbuaya",
          "Muslim Village",
          "Pagalongan",
          "Panang",
          "Park Area",
          "Pilintangan",
          "Serran Village",
          "Western Wao"
        ]
      }


    },
    "Lanao Union": {
      cities: {
        "Agoo": [
          "Ambitacay", "Balawarte", "Capas", "Consolacion", "Macalva Central", "Macalva Norte", "Macalva Sur",
          "Nazareno", "Purok", "San Agustin East", "San Agustin Norte", "San Agustin Sur", "San Antonino",
          "San Antonio", "San Francisco", "San Isidro", "San Joaquin Norte", "San Joaquin Sur", "San Jose Norte",
          "San Jose Sur", "San Juan", "San Julian Central", "San Julian East", "San Julian Norte", "San Julian West",
          "San Manuel Norte", "San Manuel Sur", "San Marcos", "San Miguel", "San Nicolas Central", "San Nicolas East",
          "San Nicolas Norte", "San Nicolas Sur", "San Nicolas West", "San Pedro", "San Roque East", "San Roque West",
          "San Vicente Norte", "San Vicente Sur", "Santa Ana", "Santa Barbara", "Santa Fe", "Santa Maria", "Santa Monica",
          "Santa Rita", "Santa Rita East", "Santa Rita Norte", "Santa Rita Sur", "Santa Rita West"
        ],
        "Aringay": [
          "Alaska", "Basca", "Dulao", "Gallano", "Macabato", "Manga", "Pangao-aoan East", "Pangao-aoan West", "Poblacion",
          "Samara", "San Antonio", "San Benito Norte", "San Benito Sur", "San Eugenio", "San Juan East", "San Juan West",
          "San Simon East", "San Simon West", "Santa Cecilia", "Santa Lucia", "Santa Rita East", "Santa Rita West",
          "Santo Rosario East", "Santo Rosario West"
        ],
        "Bacnotan": [
          "Agtipal", "Arosip", "Bacqui", "Bacsil", "Bagutot", "Ballogo", "Baroro", "Bitalag", "Bulala", "Burayoc",
          "Bussaoit", "Cabaroan", "Cabarsican", "Cabugao", "Calautit", "Carcarmay", "Casiaman", "Galongen", "Guinabang",
          "Legleg", "Lisqueb", "Mabanengbeng 1st", "Mabanengbeng 2nd", "Maragayap", "Nagatiran", "Nagsaraboan",
          "Nagsimbaanan", "Nangalisan", "Narra", "Ortega", "Oya-oy", "Paagan", "Pandan", "Pang-pang", "Poblacion",
          "Quirino", "Raois", "Salincob", "San Martin", "Santa Cruz", "Santa Rita", "Sapilang", "Sayoan", "Sipulo",
          "Tammocalao", "Ubbog", "Zaragosa"
        ],
        "Bagulin": [
          "Alibangsay", "Baay", "Cambaly", "Cardiz", "Dagup", "Libbo", "Suyo", "Tagudtud", "Tio-angan", "Wallayan"
        ],
        "Balaoan": [
          "Almieda", "Antonino", "Apatut", "Ar-arampang", "Baracbac Este", "Baracbac Oeste", "Bet-ang", "Bulbulala",
          "Bungol", "Butubut Este", "Butubut Norte", "Butubut Oeste", "Butubut Sur", "Cabuaan Oeste", "Calliat",
          "Calungbuyan", "Camiling", "Dr. Camilo Osias Poblacion", "Guinaburan", "Masupe", "Nagsabaran Norte",
          "Nagsabaran Sur", "Nalasin", "Napaset", "Pa-o", "Pagbennecan", "Pagleddegan", "Pantar Norte", "Pantar Sur",
          "Paraoir", "Patpata", "Sablut", "San Pablo", "Sinapangan Norte", "Sinapangan Sur", "Tallipugo"
        ],
        "Bangar": [
          "Agdeppa", "Alzate", "Bangaoilan East", "Bangaoilan West", "Barraca", "Cadapli", "Caggao", "Central East No. 1",
          "Central East No. 2", "Central West No. 1", "Central West No. 2", "Central West No. 3", "Consuegra",
          "General Prim East", "General Prim West", "General Terrero", "Luzong Norte", "Luzong Sur", "Maria Cristina East",
          "Maria Cristina West", "Mindoro", "Nagsabaran", "Paratong No. 3", "Paratong No. 4", "Paratong Norte",
          "Quintarong", "Reyna Regente", "Rissing", "San Blas", "San Cristobal", "Sinapangan Norte", "Sinapangan Sur",
          "Ubbog"
        ],
        "Bauang": [
          "Acao", "Baccuit Norte", "Baccuit Sur", "Bagbag", "Ballay", "Bawanta", "Boy-utan", "Bucayab", "Cabalayangan",
          "Cabisilan", "Calumbaya", "Carmay", "Casilagan", "Central East", "Central West", "Dili", "Disso-or", "Guerrero",
          "Lower San Agustin", "Nagrebcan", "Pagdalagan Sur", "Palintucang", "Palugsi-Limmansangan", "Parian Este",
          "Parian Oeste", "Paringao", "Payocpoc Norte Este", "Payocpoc Norte Oeste", "Payocpoc Sur", "Pilar", "Pottot",
          "Pudoc", "Pugo", "Quinavite", "Santa Monica", "Santiago", "Taberna", "Upper San Agustin", "Urayong"
        ],
        "Burgos": [
          "Agpay",
          "Bilis",
          "Caoayan",
          "Dalacdac",
          "Delles",
          "Imelda",
          "Libtong",
          "Linuan",
          "Lower Tumapoc",
          "New Poblacion",
          "Old Poblacion",
          "Upper Tumapoc"
        ],
        "Caba": [
          "Bautista",
          "Gana",
          "Juan Cartas",
          "Las-ud",
          "Liquicia",
          "Poblacion Norte",
          "Poblacion Sur",
          "San Carlos",
          "San Cornelio",
          "San Fermin",
          "San Gregorio",
          "San Jose",
          "Santiago Norte",
          "Santiago Sur",
          "Sobredillo",
          "Urayong",
          "Wenceslao"
        ],
        "Luna": [
          "Alcala",
          "Ayaoan",
          "Barangobong",
          "Barrientos",
          "Bungro",
          "Buselbusel",
          "Cabalitocan",
          "Cantoria No. 1",
          "Cantoria No. 2",
          "Cantoria No. 3",
          "Cantoria No. 4",
          "Carisquis",
          "Darigayos",
          "Magallanes",
          "Magsiping",
          "Mamay",
          "Nagrebcan",
          "Nalvo Norte",
          "Nalvo Sur",
          "Napaset",
          "Oaqui No. 1",
          "Oaqui No. 2",
          "Oaqui No. 3",
          "Oaqui No. 4",
          "Pila",
          "Pitpitac",
          "Rimos No. 1",
          "Rimos No. 2",
          "Rimos No. 3",
          "Rimos No. 4",
          "Rimos No. 5",
          "Rissing",
          "Salcedo",
          "Santo Domingo Norte",
          "Santo Domingo Sur",
          "Sucoc Norte",
          "Sucoc Sur",
          "Suyo",
          "Tallaoen",
          "Victoria"
        ],
        "Naguilian": [
          "Aguioas",
          "Al-alinao Norte",
          "Al-alinao Sur",
          "Ambaracao Norte",
          "Ambaracao Sur",
          "Angin",
          "Balecbec",
          "Bancagan",
          "Baraoas Norte",
          "Baraoas Sur",
          "Bariquir",
          "Bato",
          "Bimmotobot",
          "Cabaritan Norte",
          "Cabaritan Sur",
          "Casilagan",
          "Dal-lipaoen",
          "Daramuangan",
          "Guesset",
          "Gusing Norte",
          "Gusing Sur",
          "Imelda",
          "Lioac Norte",
          "Lioac Sur",
          "Magungunay",
          "Mamat-ing Norte",
          "Mamat-ing Sur",
          "Nagsidorisan",
          "Natividad",
          "Ortiz",
          "Ribsuan",
          "San Antonio",
          "San Isidro",
          "Sili",
          "Suguidan Norte",
          "Suguidan Sur",
          "Tuddingan"
        ],
        "Pugo": [
          "Ambalite",
          "Ambangonan",
          "Cares",
          "Cuenca",
          "Duplas",
          "Maoasoas Norte",
          "Maoasoas Sur",
          "Palina",
          "Poblacion East",
          "Poblacion West",
          "San Luis",
          "Saytan",
          "Tavora East",
          "Tavora Proper"
        ],
        "Rosario": [
          "Alipang",
          "Ambangonan",
          "Amlang",
          "Bacani",
          "Bangar",
          "Bani",
          "Benteng-Sapilang",
          "Cadumanian",
          "Camp One",
          "Carunuan East",
          "Carunuan West",
          "Casilagan",
          "Cataguingtingan",
          "Concepcion",
          "Damortis",
          "Gumot-Nagcolaran",
          "Inabaan Norte",
          "Inabaan Sur",
          "Marcos",
          "Nagtagaan",
          "Nangcamotian",
          "Parasapas",
          "Poblacion East",
          "Poblacion West",
          "Puzon",
          "Rabon",
          "San Jose",
          "Subusub",
          "Tabtabungao",
          "Tanglag",
          "Tay-ac",
          "Udiao",
          "Vila"
        ],
        "San Fernando": [
          "Abut",
          "Apaleng",
          "Bacsil",
          "Bangbangolan",
          "Bangcusay",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Baraoas",
          "Bato",
          "Biday",
          "Birunget",
          "Bungro",
          "Cabaroan",
          "Cabarsican",
          "Cadaclan",
          "Calabugao",
          "Camansi",
          "Canaoay",
          "Carlatan",
          "Catbangen",
          "Dallangayan Este",
          "Dallangayan Oeste",
          "Dalumpinas Este",
          "Dalumpinas Oeste",
          "Ilocanos Norte",
          "Ilocanos Sur",
          "Langcuas",
          "Lingsat",
          "Madayegdeg",
          "Mameltac",
          "Masicong",
          "Nagyubuyuban",
          "Namtutan",
          "Narra Este",
          "Narra Oeste",
          "Pacpaco",
          "Pagdalagan",
          "Pagdaraoan",
          "Pagudpud",
          "Pao Norte",
          "Pao Sur",
          "Parian",
          "Pias",
          "Poro",
          "Puspus",
          "Sacyud",
          "Sagayad",
          "San Agustin",
          "San Francisco",
          "San Vicente",
          "Santiago Norte",
          "Santiago Sur",
          "Saoay",
          "Sevilla",
          "Siboan-Otong",
          "Tanqui",
          "Tanquigan"
        ],
        "San Gabriel": [
          "Amontoc",
          "Apayao",
          "Balbalayang",
          "Bayabas",
          "Bucao",
          "Bumbuneg",
          "Daking",
          "Lacong",
          "Lipay Este",
          "Lipay Norte",
          "Lipay Proper",
          "Lipay Sur",
          "Lon-oy",
          "Poblacion",
          "Polipol"
        ],
        "San Juan": [
          "Allangigan",
          "Aludaid",
          "Bacsayan",
          "Balballosa",
          "Bambanay",
          "Bugbugcao",
          "Caarusipan",
          "Cabaroan",
          "Cabugnayan",
          "Cacapian",
          "Caculangan",
          "Calincamasan",
          "Casilagan",
          "Catdongan",
          "Dangdangla",
          "Dasay",
          "Dinanum",
          "Duplas",
          "Guinguinabang",
          "Ili Norte",
          "Ili Sur",
          "Legleg",
          "Lubing",
          "Nadsaag",
          "Nagsabaran",
          "Naguirangan",
          "Naguituban",
          "Nagyubuyuban",
          "Oaquing",
          "Pacpacac",
          "Pagdildilan",
          "Panicsican",
          "Quidem",
          "San Felipe",
          "Santa Rosa",
          "Santo Rosario",
          "Saracat",
          "Sinapangan",
          "Taboc",
          "Talogtog",
          "Urbiztondo"
        ],
        "Santo Tomas": [
          "Ambitacay",
          "Bail",
          "Balaoc",
          "Balsaan",
          "Baybay",
          "Cabaruan",
          "Casantaan",
          "Casilagan",
          "Cupang",
          "Damortis",
          "Fernando",
          "Linong",
          "Lomboy",
          "Malabago",
          "Namboongan",
          "Namonitan",
          "Narvacan",
          "Patac",
          "Poblacion",
          "Pongpong",
          "Raois",
          "Tococ",
          "Tubod",
          "Ubagan"
        ],
        "Santol": [
          "Corrooy",
          "Lettac Norte",
          "Lettac Sur",
          "Mangaan",
          "Paagan",
          "Poblacion",
          "Puguil",
          "Ramot",
          "Sapdaan",
          "Sasaba",
          "Tubaday"
        ],
        "Sudipen": [
          "Bigbiga",
          "Bulalaan",
          "Castro",
          "Duplas",
          "Ilocano",
          "Ipet",
          "Maliclico",
          "Namaltugan",
          "Old Central",
          "Poblacion",
          "Porporiket",
          "San Francisco Norte",
          "San Francisco Sur",
          "San Jose",
          "Sengngat",
          "Turod",
          "Up-uplas"
        ],
        "Tubao": [
          "Amallapay",
          "Anduyan",
          "Caoigue",
          "Francia Sur",
          "Francia West",
          "Garcia",
          "Gonzales",
          "Halog East",
          "Halog West",
          "Leones East",
          "Leones West",
          "Linapew",
          "Lloren",
          "Magsaysay",
          "Pideg",
          "Poblacion",
          "Rizal",
          "Santa Teresa"
        ]
      }
    },
    "Leyte": {
      cities: {
        "Abuyog": [
          "Alangilan",
          "Anibongan",
          "Bagacay",
          "Bahay",
          "Balinsasayao",
          "Balocawe",
          "Balocawehay",
          "Barayong",
          "Bayabas",
          "Bito",
          "Buaya",
          "Buenavista",
          "Bulak",
          "Bunga",
          "Buntay",
          "Burubud-an",
          "Cadac-an",
          "Cagbolo",
          "Can-aporong",
          "Can-uguib",
          "Canmarating",
          "Capilian",
          "Combis",
          "Dingle",
          "Guintagbucan",
          "Hampipila",
          "Katipunan",
          "Kikilo",
          "Laray",
          "Lawa-an",
          "Libertad",
          "Loyonsawang",
          "Mag-atubang",
          "Mahagna",
          "Mahayahay",
          "Maitum",
          "Malaguicay",
          "Matagnao",
          "Nalibunan",
          "Nebga",
          "New Taligue",
          "Odiongan",
          "Old Taligue",
          "Pagsang-an",
          "Paguite",
          "Parasanon",
          "Picas Sur",
          "Pilar",
          "Pinamanagan",
          "Salvacion",
          "San Francisco",
          "San Isidro",
          "San Roque",
          "Santa Fe",
          "Santa Lucia",
          "Santo Niño",
          "Tabigue",
          "Tadoc",
          "Tib-o",
          "Tinalian",
          "Tinocolan",
          "Tuy-a",
          "Victory"
        ],
        "Alangalang": [
          "Aslum",
          "Astorga",
          "Bato",
          "Binongto-an",
          "Binotong",
          "Blumentritt",
          "Bobonon",
          "Borseth",
          "Buenavista",
          "Bugho",
          "Buri",
          "Cabadsan",
          "Calaasan",
          "Cambahanon",
          "Cambolao",
          "Canvertudes",
          "Capiz",
          "Cavite",
          "Cogon",
          "Dapdap",
          "Divisoria",
          "Ekiran",
          "Hinapolan",
          "Holy Child I",
          "Holy Child II",
          "Hubang",
          "Hupit",
          "Langit",
          "Lingayon",
          "Lourdes",
          "Lukay",
          "Magsaysay",
          "Milagrosa",
          "Mudboron",
          "P. Barrantes",
          "Pepita",
          "Peñalosa",
          "Salvacion",
          "Salvacion Poblacion",
          "San Antonio",
          "San Antonio Poblacion",
          "San Diego",
          "San Francisco East",
          "San Francisco West",
          "San Isidro",
          "San Pedro",
          "San Roque",
          "San Vicente",
          "Santiago",
          "Santo Niño",
          "Santol",
          "Tabangohay",
          "Tombo",
          "Veteranos"
        ],
        "Albuera": [
          "Antipolo",
          "Balugo",
          "Benolho",
          "Cambalading",
          "Damula-an",
          "Doña Maria",
          "Mahayag",
          "Mahayahay",
          "Poblacion",
          "Salvacion",
          "San Pedro",
          "Seguinon",
          "Sherwood",
          "Tabgas",
          "Talisayan",
          "Tinag-an"
        ],
        "Babatngon": [
          "Bacong",
          "Bagong Silang",
          "Biasong",
          "Gov. E. Jaro",
          "Guintigui-an",
          "Lukay",
          "Magcasuang",
          "Malibago",
          "Naga-asan",
          "Pagsulhugon",
          "Planza",
          "Poblacion District I",
          "Poblacion District II",
          "Poblacion District III",
          "Poblacion District IV",
          "Rizal I",
          "Rizal II",
          "San Agustin",
          "San Isidro",
          "San Ricardo",
          "Sangputan",
          "Taguite",
          "Uban",
          "Victory",
          "Villa Magsaysay"
        ],
        "Barugo": [
          "Abango",
          "Amahit",
          "Balire",
          "Balud",
          "Bukid",
          "Bulod",
          "Busay",
          "Cabarasan",
          "Cabolo-an",
          "Calingcaguing",
          "Can-isak",
          "Canomantag",
          "Cuta",
          "Domogdog",
          "Duka",
          "Guindaohan",
          "Hiagsam",
          "Hilaba",
          "Hinugayan",
          "Ibag",
          "Minuhang",
          "Minuswang",
          "Pikas",
          "Pitogo",
          "Poblacion Dist. I",
          "Poblacion Dist. II",
          "Poblacion Dist. III",
          "Poblacion Dist. IV",
          "Poblacion Dist. V",
          "Poblacion Dist. VI",
          "Pongso",
          "Roosevelt",
          "San Isidro",
          "San Roque",
          "Santa Rosa",
          "Santarin",
          "Tutug-an"
        ],
        "Bato": [
          "Alegria",
          "Alejos",
          "Amagos",
          "Anahawan",
          "Bago",
          "Bagong Bayan District",
          "Buli",
          "Cebuana",
          "Daan Lungsod",
          "Dawahon",
          "Dolho",
          "Domagocdoc",
          "Guerrero District",
          "Himamaa",
          "Imelda",
          "Iniguihan District",
          "Kalanggaman District",
          "Katipunan",
          "Liberty",
          "Mabini",
          "Marcelo",
          "Naga",
          "Osmeña",
          "Plaridel",
          "Ponong",
          "Rivilla",
          "San Agustin",
          "Santo Niño",
          "Tabunok",
          "Tagaytay",
          "Tinago District",
          "Tugas"
        ],
        "Baybay": [
          "Altavista",
          "Ambacan",
          "Amguhan",
          "Ampihanon",
          "Balao",
          "Banahao",
          "Biasong",
          "Bidlinan",
          "Bitanhuan",
          "Bubon",
          "Buenavista",
          "Bunga",
          "Butigan",
          "Candadam",
          "Caridad",
          "Ciabo",
          "Cogon",
          "Ga-as",
          "Gabas",
          "Gakat",
          "Guadalupe",
          "Gubang",
          "Hibunawan",
          "Higuloan",
          "Hilapnitan",
          "Hipusngo",
          "Igang",
          "Imelda",
          "Jaena",
          "Kabalasan",
          "Kabatuan",
          "Kabungaan",
          "Kagumay",
          "Kambonggan",
          "Kan-ipa",
          "Kansungka",
          "Kantagnos",
          "Kilim",
          "Lintaon",
          "Maganhan",
          "Mahayahay",
          "Mailhi",
          "Maitum",
          "Makinhas",
          "Mapgap",
          "Marcos",
          "Maslug",
          "Matam-is",
          "Maybog",
          "Maypatag",
          "Monte Verde",
          "Monterico",
          "Palhi",
          "Pangasungan",
          "Pansagan",
          "Patag",
          "Plaridel",
          "Poblacion Zone 1",
          "Poblacion Zone 10",
          "Poblacion Zone 11",
          "Poblacion Zone 12",
          "Poblacion Zone 13",
          "Poblacion Zone 14",
          "Poblacion Zone 15",
          "Poblacion Zone 16",
          "Poblacion Zone 17",
          "Poblacion Zone 18",
          "Poblacion Zone 19",
          "Poblacion Zone 2",
          "Poblacion Zone 20",
          "Poblacion Zone 21",
          "Poblacion Zone 22",
          "Poblacion Zone 23",
          "Poblacion Zone 3",
          "Poblacion Zone 4",
          "Poblacion Zone 5",
          "Poblacion Zone 6",
          "Poblacion Zone 7",
          "Poblacion Zone 8",
          "Poblacion Zone 9",
          "Pomponan",
          "Punta",
          "Sabang",
          "San Agustin",
          "San Isidro",
          "San Juan",
          "Santa Cruz",
          "Santo Rosario",
          "Sapa",
          "Villa Mag-aso",
          "Villa Solidaridad",
          "Zacarito"
        ],
        "Carigara": [
          "Parina", "Piloro", "Ponong", "Rizal", "Sagkahan", "San Isidro", "San Juan", "San Mateo", "Santa Fe", "Sawang", "Tagak", "Tangnan", "Tigbao", "Tinaguban", "Upper Hiraan", "Upper Sogod", "Uyawan", "West Visoria"
        ],
        "Dagami": [
          "Abaca", "Abre", "Balilit", "Balugo", "Banayon", "Bayabas", "Bolirao", "Buenavista", "Buntay", "Caanislagan", "Cabariwan", "Cabuloran", "Cabunga-an", "Calipayan", "Calsadahay", "Caluctogan", "Calutan", "Camono-an", "Candagara", "Canlingga", "Cansamada East", "Cansamada West", "Capulhan", "Digahongan", "Guinarona", "Hiabangan", "Hilabago", "Hinabuyan", "Hinologan", "Hitumnog", "Katipunan", "Lapu-lapu Poblacion", "Lobe-lobe", "Lobe-lobe East", "Los Martires", "Lusad Poblacion", "Macaalang", "Maliwaliw", "Maragondong", "Ormocay", "Palacio", "Panda", "Paraiso", "Patoc", "Plaridel", "Poponton", "Rizal", "Salvacion", "Sampaguita", "Sampao East Poblacion", "Sampao West Poblacion", "San Antonio Poblacion", "San Benito", "San Jose Poblacion", "San Roque Poblacion", "Santa Mesa Poblacion", "Santo Domingo", "Sawahon", "Sirab", "Tagkip", "Talinhugon", "Tin-ao", "Tunga Poblacion", "Tuya", "Victoria"
        ],
        "Dulag": [
          "Alegre", "Arado", "Barbo", "Batug", "Bolongtohan", "Bulod", "Buntay", "Cabacungan", "Cabarasan", "Cabato-an", "Calipayan", "Calubian", "Cambula District", "Camitoc", "Camote", "Candao", "Catmonan", "Combis", "Dacay", "Del Carmen", "Del Pilar", "Fatima", "General Roxas", "Highway", "Luan", "Magsaysay", "Maricum", "Market Site", "Rawis", "Rizal", "Romualdez", "Sabang Daguitan", "Salvacion", "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Miguel", "San Rafael", "San Vicente", "Serrano", "Sungi", "Tabu", "Tigbao", "Victory"
        ],
        "Hilongos": [
          "Agutayan", "Atabay", "Baas", "Bagong Lipunan", "Bagumbayan", "Baliw", "Bantigue", "Bon-ot", "Bung-aw", "Cacao", "Campina", "Catandog 1", "Catandog 2", "Central Barangay", "Concepcion", "Eastern Barangay", "Hampangan", "Himo-aw", "Hitudpan", "Imelda Marcos", "Kang-iras", "Kangha-as", "Lamak", "Libertad", "Liberty", "Lunang", "Magnangoy", "Manaul", "Marangog", "Matapay", "Naval", "Owak", "Pa-a", "Pontod", "Proteccion", "San Agustin", "San Antonio", "San Isidro", "San Juan", "San Roque", "Santa Cruz", "Santa Margarita", "Santo Niño", "Tabunok", "Tagnate", "Talisay", "Tambis", "Tejero", "Tuguipa", "Utanan", "Western Barangay"
        ],
        "Hindang": [
          "Anahaw", "Anolon", "Baldoza", "Bontoc", "Bulacan", "Canha-ayon", "Capudlosan", "Doos del Norte", "Doos del Sur", "Himacugo", "Himokilan Island", "Katipunan", "Maasin", "Mabagon", "Mahilum", "Poblacion 1", "Poblacion 2", "San Vicente", "Tabok", "Tagbibi"
        ],
        "Inopacan": [
          "Apid", "Cabulisan", "Caminto", "Can-angay", "Caulisihan", "Conalum", "De los Santos", "Esperanza", "Guadalupe", "Guinsanga-an", "Hinabay", "Jubasan", "Linao", "Macagoco", "Maljo", "Marao", "Poblacion", "Tahud", "Taotaon", "Tinago"
        ],
        "Isabel": [
          "Anislag", "Antipolo", "Apale", "Bantigue", "Benog", "Bilwang", "Can-andan", "Cangag", "Consolacion", "Honan", "Libertad", "Mahayag", "Marvel", "Matlang", "Monte Alegre", "Puting Bato", "San Francisco", "San Roque", "Santa Cruz", "Santo Niño", "Santo Rosario", "Tabunok", "Tolingon", "Tubod"
        ],
        "Jaro": [
          "Alahag", "Anibongan", "Atipolo", "Badiang", "Batug", "Bias Zabala", "Buenavista", "Bukid", "Burabod", "Buri", "Canapuan", "Canhandugan", "Crossing Rubas", "Daro", "District I", "District II", "District III", "District IV", "Hiagsam", "Hibucawan", "Hibunawon", "Kaglawaan", "Kalinawan", "La Paz", "Likod", "Macanip", "Macopa", "Mag-aso", "Malobago", "Olotan", "Palanog", "Pange", "Parasan", "Pitogo", "Sagkahan", "San Agustin", "San Pedro", "San Roque", "Santa Cruz", "Santo Niño", "Sari-sari", "Tinambacan", "Tuba", "Uguiao", "Villa Paz", "Villagonzoilo"
        ],
        "Javier": [
          "Abuyogay", "Andres Bonifacio", "Batug", "Binulho", "Calzada", "Cancayang", "Caranhug", "Caraye", "Casalungan", "Comatin", "Guindapunan", "Inayupan", "Laray", "Magsaysay", "Malitbogay", "Manarug", "Manlilisid", "Naliwatan", "Odiong", "Picas Norte", "Pinocawan", "Poblacion Zone 1", "Poblacion Zone 2", "Rizal", "San Sotero", "Santa Cruz", "Talisayan", "Ulhay"
        ],
        "Julita": [
          "Alegria", "Anibong", "Aslum", "Balante", "Bongdo", "Bonifacio", "Bugho", "Calbasag", "Caridad", "Cuya-e", "Dita", "Gitabla", "Hindang", "Inawangan", "Jurao", "Poblacion District I", "Poblacion District II", "Poblacion District III", "Poblacion District IV", "San Andres", "San Pablo", "Santa Cruz", "Santo Niño", "Tagkip", "Tolosahay", "Villa Hermosa"
        ],
        "Kananga": [
          "Aguiting", "Cacao", "Hiluctogan", "Kawayan", "Libertad", "Libongao", "Lim-ao", "Lonoy", "Mahawan", "Masarayao", "Monte Alegre", "Monte Bello", "Naghalin", "Natubgan", "Poblacion", "Rizal", "San Ignacio", "San Isidro", "Santo Domingo", "Santo Niño", "Tagaytay", "Tongonan", "Tugbong"
        ],
        "La Paz": [
          "Bagacay East", "Bagacay West", "Bocawon", "Bongtod", "Buracan", "Caabangan", "Cacao", "Cagngaran", "Calabnian", "Calaghusan", "Caltayan", "Canbañez", "Cogon", "Duyog", "Gimenarat East", "Gimenarat West", "Limba", "Lubi-lubi", "Luneta", "Mag-aso", "Moroboro", "Pansud", "Pawa", "Piliway", "Poblacion District 1", "Poblacion District 2", "Poblacion District 3", "Poblacion District 4", "Quiong", "Rizal", "San Victoray", "Santa Ana", "Santa Elena", "Tabang", "Tarugan"
        ],
        "Leyte": [
          "Bachao", "Baco", "Bagaba-o", "Basud", "Belen", "Burabod", "Calaguise", "Consuegra", "Culasi", "Danus", "Elizabeth", "Kawayan", "Libas", "Maanda", "Macupa", "Mataloto", "Palarao", "Palid I", "Palid II", "Parasan", "Poblacion", "Salog", "Sambulawan", "Tag-abaca", "Tapol", "Tigbawan", "Tinocdugan", "Toctoc", "Ugbon", "Wague"
        ],
        "MacArthur": [
          "Batug", "Burabod", "Capudlosan", "Casuntingan", "Causwagan", "Danao", "Doña Josefa", "General Luna", "Kiling", "Lanawan", "Liwayway", "Maya", "Oguisan", "Osmeña", "Palale 1", "Palale 2", "Poblacion District 1", "Poblacion District 2", "Poblacion District 3", "Pongon", "Quezon", "Romualdez", "Salvacion", "San Antonio", "San Isidro", "San Pedro", "San Vicente", "Santa Isabel", "Tinawan", "Tuyo", "Villa Imelda"
        ],
        "Mahaplag": [
          "Campin", "Cuatro de Agosto", "Hiluctogan", "Hilusig", "Himamara", "Hinaguimitan", "Liberacion", "Mabuhay", "Mabunga", "Magsuganao", "Mahayag", "Mahayahay", "Maligaya", "Malinao", "Malipoon", "Palañogan", "Paril", "Pinamonoan", "Poblacion", "Polahongon", "San Isidro", "San Juan", "Santa Cruz", "Santo Niño", "Tagaytay", "Uguis", "Union", "Upper Mahaplag"
        ],
        "Matag-ob": [
          "Balagtas", "Bonoy", "Bulak", "Cambadbad", "Candelaria", "Cansoso", "Imelda", "Malazarte", "Mansahaon", "Mansalip", "Masaba", "Naulayan", "Riverside", "San Dionisio", "San Guillermo", "San Marcelino", "San Sebastian", "San Vicente", "Santa Rosa", "Santo Rosario", "Talisay"
        ],
        "Matalom": [
          "Agbanga", "Altavista", "Bagong Lipunan", "Cahagnaan", "Calumpang", "Caningag", "Caridad Norte", "Caridad Sur", "Elevado", "Esperanza", "Hitoog", "Itum", "Lowan", "Monte Alegre", "President Garcia", "Punong", "San Isidro", "San Juan", "San Pedro", "San Salvador", "San Vicente", "Santa Fe", "Santa Paz", "Santo Niño", "Tag-os", "Taglibas Imelda", "Templanza", "Tigbao", "Waterloo", "Zaragoza"
        ],
        "Mayorga": [
          "A. Bonifacio", "Burgos", "Calipayan", "Camansi", "General Antonio Luna", "Liberty", "Mabini", "Ormocay", "Poblacion Zone 1", "Poblacion Zone 2", "Poblacion Zone 3", "San Roque", "Santa Cruz", "Talisay", "Union", "Wilson"
        ],
        "Merida": [
          "Binabaye", "Cabaliwan", "Calunangan", "Calunasan", "Cambalong", "Can-unzo", "Canbantug", "Casilda", "Lamanoc", "Libas", "Libjo", "Lundag", "Macario", "Mahalit", "Mahayag", "Masumbang", "Mat-e", "Poblacion", "Puerto Bello", "San Isidro", "San Jose", "Tubod"
        ],
        "Ormoc": [
          "Airport", "Alegria", "Alta Vista", "Bagong", "Bagong Buhay", "Bantigue", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14", "Barangay 15", "Barangay 16", "Barangay 17", "Barangay 18", "Barangay 19", "Barangay 2", "Barangay 20", "Barangay 21", "Barangay 22", "Barangay 23", "Barangay 24", "Barangay 25", "Barangay 26", "Barangay 27", "Barangay 28", "Barangay 29", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Batuan", "Bayog", "Biliboy", "Borok", "Cabaon-an", "Cabintan", "Cabulihan", "Cagbuhangin", "Camp Downes", "Can-adieng", "Can-untog", "Catmon", "Cogon Combado", "Concepcion", "Curva", "Danao", "Danhug", "Dayhagan", "Dolores", "Domonar", "Don Felipe Larrazabal", "Don Potenciano Larrazabal", "Donghol", "Doña Feliza Z. Mejia", "Esperanza", "Gaas", "Green Valley", "Guintigui-an", "Hibunawon", "Hugpa", "Ipil", "Juaton", "Kadaohan", "Labrador", "Lao", "Leondoni", "Libertad", "Liberty", "Licuma", "Liloan", "Linao", "Luna", "Mabato", "Mabini", "Macabug", "Magaswi", "Mahayag", "Mahayahay", "Manlilinao", "Margen", "Mas-in", "Matica-a", "Milagro", "Monterico", "Nasunogan", "Naungan", "Nueva Sociedad", "Nueva Vista", "Patag", "Punta", "Quezon, Jr.", "Rufina M. Tan", "Sabang Bao", "Salvacion", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Pablo", "San Vicente", "Santo Niño", "Sumangga", "Tambulilid", "Tongonan", "Valencia"
        ],
        "Palo": [
          "Anahaway", "Arado", "Baras", "Barayong", "Buri", "Cabarasan Daku", "Cabarasan Guti", "Campetik", "Candahug", "Cangumbang", "Canhidoc", "Capirawan", "Castilla", "Cavite East", "Cavite West", "Cogon", "Gacao", "Guindapunan", "Libertad", "Luntad", "Naga-naga", "Pawing", "Salvacion", "San Agustin", "San Antonio", "San Fernando", "San Isidro", "San Joaquin", "San Jose", "San Miguel", "Santa Cruz", "Tacuranga", "Teraza"
        ],
        "Palompon": [
          "Baguinbin", "Belen", "Bitaog Poblacion", "Buenavista", "Caduhaan", "Cambakbak", "Cambinoy", "Cangcosme", "Cangmuya", "Canipaan", "Cantandoy", "Cantuhaon", "Catigahan", "Central 1", "Central 2", "Cruz", "Duljugan", "Guiwan 1", "Guiwan 2", "Himarco", "Hinablayan Poblacion", "Hinagbuan", "Lat-osan", "Liberty", "Lomonon", "Mabini", "Magsaysay", "Masaba", "Mazawalo Poblacion", "Parilla", "Pinagdait Poblacion", "Pinaghi-usa Poblacion", "Plaridel", "Rizal", "Sabang", "San Guillermo", "San Isidro", "San Joaquin", "San Juan", "San Miguel", "San Pablo", "San Pedro", "San Roque", "Santiago", "Taberna", "Tabunok", "Tambis", "Tinabilan", "Tinago", "Tinubdan"
        ],
        "Pastrana": [
          "Arabunog", "Aringit", "Bahay", "Cabaohan", "Calsadahay", "Cancaraja", "Caninoan", "Capilla", "Colawen", "District 1", "District 2", "District 3", "District 4", "Dumarag", "Guindapunan", "Halaba", "Jones", "Lanawan", "Lima", "Lourdes", "Macalpiay", "Malitbogay", "Manaybanay", "Maricum", "Patong", "Sapsap", "Socsocon", "Tingib", "Yapad"
        ],
        "San Isidro": [
          "Banat-e", "Basud", "Bawod", "Biasong", "Bunacan", "Busay", "Cabungaan", "Capiñahan", "Crossing", "Daja-daku", "Daja-diot", "Hacienda Maria", "Linao", "Matungao", "Paril", "San Jose", "San Miguel", "Taglawigan", "Tinago"
        ],
        "San Miguel": [
          "Bagacay", "Bahay", "Bairan", "Cabatianuhan", "Canap", "Capilihan", "Caraycaray", "Cayare", "Guinciaman", "Impo", "Kinalumsan", "Libtong", "Lukay", "Malaguinabot", "Malpag", "Mawodpawod", "Patong", "Pinarigusan", "San Andres", "Santa Cruz", "Santol"
        ],
        "Santa Fe": [
          "Baculanad", "Badiangay", "Bulod", "Catoogan", "Cutay", "Gapas", "Katipunan", "Milagrosa", "Pilit", "Pitogo", "San Isidro", "San Juan", "San Miguelay", "San Roque", "Tibak", "Victoria", "Zone 1", "Zone 2", "Zone 3", "Zone 4 Poblacion"
        ],
        "Tabango": [
          "Butason I", "Butason II", "Campokpok", "Catmon", "Gibacungan", "Gimarco", "Inangatan", "Manlawaan", "Omaganhan", "Poblacion", "Santa Rosa", "Tabing", "Tugas"
        ],
        "Tabontabon": [
          "Amandangay", "Aslum", "Balingasag", "Belisong", "Cambucao", "Capahuan", "District I Poblacion", "District II Poblacion", "District III Poblacion", "District IV Poblacion", "Guingawan", "Jabong", "Mercadohay", "Mering", "Mohon", "San Pablo"
        ],
        "Tanauan": [
          "Ada", "Amanluran", "Arado", "Atipolo", "Balud", "Bangon", "Bantagan", "Baras", "Binolo", "Binongto-an", "Bislig", "Buntay", "Cabalagnan", "Cabarasan Guti", "Cabonga-an", "Cabuynan", "Cahumayhumayan", "Calogcog", "Calsadahay", "Camire", "Canbalisara", "Canramos", "Catigbian", "Catmon", "Cogon", "Guindag-an", "Guingawan", "Hilagpad", "Kiling", "Lapay", "Licod", "Limbuhan Daku", "Limbuhan Guti", "Linao", "Magay", "Maghulod", "Malaguicay", "Maribi", "Mohon", "Pago", "Pasil", "Pikas", "Sacme", "Salvador", "San Isidro", "San Miguel", "San Roque", "San Victor", "Santa Cruz", "Santa Elena", "Santo Niño Poblacion", "Solano", "Tanolora", "Tugop"
        ],
        "Tolosa": [
          "Burak", "Canmogsay", "Cantariwis", "Capangihan", "Doña Brigida", "Imelda", "Malbog", "Olot", "Opong", "Poblacion", "Quilao", "San Roque", "San Vicente", "Tanghas", "Telegrafo"
        ],
        "Tunga": [
          "Astorga", "Balire", "Banawang", "San Antonio", "San Pedro", "San Roque", "San Vicente", "Santo Niño"
        ],
        "Villaba": [
          "Abijao", "Balite", "Bangcal", "Bugabuga", "Cabunga-an", "Cabungahan", "Cagnocot", "Cahigan", "Calbugos", "Camporog", "Canquiason", "Capinyahan", "Casili-on", "Catagbacan", "Fatima", "Hibulangan", "Hinabuyan", "Iligay", "Jalas", "Jordan", "Libagong", "New Balanac", "Payao", "Poblacion Norte", "Poblacion Sur", "Sambulawan", "San Francisco", "San Vicente", "Santa Cruz", "Silad", "Suba", "Sulpa", "Tabunok", "Tagbubunga", "Tinghub"
        ]
      }

    }, "Maguindanao del Norte": {
      cities: {
        "Ampatuan": [
          "Dicalongan", "Kakal", "Kamasi", "Kapinpilan", "Kauran", "Malatimon",
          "Matagabong", "Salman", "Saniag", "Tomicor", "Tubak"
        ],
        "Barira": [
          "Barira", "Bualan", "Gadung", "Korosoyan", "Lamin", "Liong", "Lipa",
          "Lipawan", "Marang", "Minabay", "Nabalawag", "Panggao", "Rominimbang", "Togaig"
        ],
        "Buldon": [
          "Ampuan", "Aratuc", "Cabayuan", "Calaan", "Dinganen", "Edcor", "Karim",
          "Kulimpang", "Mataya", "Minabay", "Nuyo", "Oring", "Pantawan", "Piers", "Rumidas"
        ],
        "Buluan": [
          "Digal", "Lower Siling", "Maslabeng", "Poblacion", "Popol", "Talitay",
          "Upper Siling"
        ],
        "Datu Abdullah Sangki": [
          "Banaba", "Dimampao", "Guinibon", "Kaya-kaya", "Maganoy", "Mao", "Maranding",
          "Sugadol", "Talisawa", "Tukanolocong"
        ],
        "Datu Anggal Midtimbang": [
          "Adaon", "Brar", "Mapayag", "Midtimbang", "Nunangan", "Tugal", "Tulunan"
        ],
        "Datu Blah T. Sinsuat": [
          "Kinimi", "Laguitan", "Lapaken", "Matuber", "Meti", "Nalkan", "Penansaran",
          "Pura", "Resa", "Sedem", "Sinipak", "Tambak", "Tubuan"
        ],
        "Datu Hoffer Ampatuan": [
          "Kubentong", "Labu-labu I", "Labu-labu II", "Limpongo", "Macalag", "Sayap",
          "Taib", "Talibadok", "Tuayan", "Tuayan I", "Tuntungan"
        ],
        "Datu Montawal": [
          "Balatungkayo", "Bulit", "Bulod", "Dungguan", "Limbalud", "Maridagao", "Nabundas",
          "Pagagawan", "Talapas", "Talitay", "Tunggol"
        ],
        "Datu Odin Sinsuat": [
          "Ambolodto", "Awang", "Badak", "Bagoenged", "Baka", "Benolen", "Bitu",
          "Bongued", "Bugawas", "Capiton", "Dados", "Dalican Poblacion", "Dinaig Proper",
          "Dulangan", "Kakar", "Kenebeka", "Kurintem", "Kusiong", "Labungan", "Linek",
          "Makir", "Margues", "Mompong", "Nekitan", "Sapalan", "Semba", "Sibuto",
          "Sifaren", "Tambak", "Tamontaka", "Tanuel", "Tapian", "Taviran", "Tenonggos"
        ],
        "Datu Paglas": [
          "Alip", "Bonawan", "Bulod", "Damalusay", "Damawato", "Datang", "Elbebe", "Kalumenga",
          "Katil", "Lipao", "Lomoyon", "Madidis", "Makat", "Malala", "Mangadeg", "Manindolo",
          "Mao", "Napok", "Palao sa Buto", "Poblacion", "Puya", "Salendab", "Sepaka"
        ],
        "Datu Piang": [
          "Alonganan", "Ambadao", "Balanakan", "Balong", "Buayan", "Dado", "Damabalas",
          "Duaminanga", "Kalipapa", "Kanguan", "Liong", "Magaslong", "Masigay", "Montay", "Poblacion", "Reina Regente"
        ],
        "Datu Salibo": [
          "Alonganan", "Andavit", "Balanakan", "Buayan", "Butilen", "Dado", "Damabalas",
          "Duaminanga", "Kalipapa", "Liong", "Magaslong", "Masigay", "Pagatin", "Pandi",
          "Penditen", "Sambulawan", "Tee"
        ],
        "Datu Saudi-Ampatuan": [
          "Dapiawan", "Elian", "Gawang", "Kabengi", "Kitango", "Kitapok", "Madia",
          "Salbu"
        ],
        "Datu Unsay": [
          "Bulayan", "Iganagampong", "Macalag", "Maitumaig", "Malangog", "Meta",
          "Panangeti", "Tuntungan"
        ],
        "General Salipada K. Pendatun": [
          "Badak", "Bulod", "Kaladturan", "Kulasi", "Lao-lao", "Lasangan", "Lower Idtig",
          "Lumabao", "Makainis", "Midconding", "Midpandacan", "Panosolen", "Pidtiguian",
          "Quipolot", "Ramcor", "Sadangen", "Sumakubay", "Tonggol", "Upper Lasangan"
        ],
        "Guindulungan": [
          "Ahan", "Bagan", "Datalpandan", "Kalumamis", "Kateman", "Lambayao",
          "Macasampen", "Muslim", "Muti", "Sampao", "Tambunan II"
        ],
        "Kabuntalan": [
          "Bagumbayan", "Buterin", "Dadtumog", "Gambar", "Ganta", "Katidtuan", "Langeban",
          "Liong", "Lower Taviran", "Maitong", "Matilak", "Pagalungan", "Payan", "Pedtad",
          "Pened", "Poblacion", "Upper Taviran"
        ],
        "Mamasapano": [
          "Bagumbong", "Dabenayan", "Daladap", "Dasikil", "Liab", "Libutan", "Lusay",
          "Mamasapano", "Manongkaling", "Pidsandawan", "Pimbalakan", "Sapakan", "Tuka",
          "Tukanalipao"
        ],
        "Mangudadatu": [
          "Daladagan", "Kalian", "Luayan", "Paitan", "Panapan", "Tenok", "Tinambulan",
          "Tumbao"
        ],
        "Matanog": [
          "Bayanga Norte", "Bayanga Sur", "Bugasan Norte", "Bugasan Sur", "Kidama", "Langco",
          "Langkong", "Sapad"
        ],
        "Northern Kabuntalan": [
          "Balong", "Damatog", "Gayonga", "Guiawa", "Indatuan", "Kapimpilan", "Libungan",
          "Montay", "Paulino Labio", "Sabaken", "Tumaguinting"
        ],
        "Pagalungan": [
          "Bagoenged", "Buliok", "Dalgan", "Damalasak", "Galakit", "Inug-ug", "Kalbugan",
          "Kilangan", "Kudal", "Layog", "Linandangan", "Poblacion"
        ],
        "Paglat": [
          "Campo", "Damakling", "Damalusay", "Kakal", "Paglat", "Salam", "Tual", "Upper Idtig"
        ],
        "Pandag": [
          "Kabuling", "Kayaga", "Kayupo", "Lepak", "Lower Dilag", "Malangit", "Pandag",
          "Upper Dilag"
        ],
        "Parang": [
          "Bongo Island", "Campo Islam", "Cotongan", "Datu Macarimbang Biruar", "Gadungan",
          "Gadunganpedpandaran", "Guiday T. Biruar", "Gumagadong Calawag", "Kabuan", "Landasan",
          "Limbayan", "Macasandag", "Magsaysay", "Making", "Manion", "Moro Point", "Nituan",
          "Orandang", "Pinantao"
        ],
        "Parang": [
          "Poblacion", "Poblacion II", "Polloc", "Samberen", "Tagudtongan", "Tuca-Maror"
        ],
        "Rajah Buayan": [
          "Baital", "Bakat", "Dapantis", "Gaunan", "Malibpolok", "Mileb", "Panadtaban",
          "Pidsandawan", "Sampao", "Sapakan", "Tabungao"
        ],
        "Shariff Aguak": [
          "Bagong", "Bialong", "Kuloy", "Labu-labu", "Lapok", "Malingao", "Poblacion",
          "Poblacion I", "Poblacion II", "Satan", "Tapikan", "Timbangan", "Tina"
        ],
        "Shariff Saydona Mustapha": [
          "Bakat", "Dale-Bong", "Dasawao", "Datu Bakal", "Datu Kilay", "Duguengen", "Ganta",
          "Inaladan", "Libutan", "Linantangan", "Nabundas", "Pagatin", "Pamalian", "Pikeg",
          "Pusao"
        ],
        "South Upi": [
          "Biarong", "Bongo", "Itaw", "Kigan", "Kuya", "Lamud", "Looy", "Pandan", "Pilar",
          "Romangaob", "San Jose"
        ],
        "Sultan Kudarat": [
          "Alamada", "Banatin", "Banubo", "Bulalo", "Bulibod", "Calsada", "Crossing Simuay",
          "Dalumangcob", "Damaniog", "Darapanan", "Gang", "Inawan", "Kabuntalan", "Kakar",
          "Kapimpilan", "Katamlangan", "Katidtuan", "Katuli", "Ladia", "Limbo", "Maidapa",
          "Makaguiling", "Matengen", "Mulaug", "Nalinan", "Nara", "Nekitan", "Olas", "Panatan",
          "Pigcalagan", "Pigkelegan", "Pinaring", "Pingping", "Raguisi", "Rebuken", "Salimbao",
          "Sambolawan", "Senditan", "Ungap"
        ],
        "Sultan Mastura": [
          "Balut", "Boliok", "Bungabong", "Dagurongan", "Kirkir", "Macabico", "Namuken",
          "Simuay/Seashore", "Solon", "Tambo", "Tapayan", "Tariken", "Tuka"
        ],
        "Sultan Sumagka": [
          "Bintan", "Gadungan", "Kiladap", "Kilalan", "Kuden", "Makadayon", "Manggay",
          "Pageda", "Talitay"
        ],
        "Sultan sa Barongis": [
          "Angkayamat", "Barurao", "Bulod", "Darampua", "Gadungan", "Kulambog", "Langgapanan",
          "Masulot", "Paldong", "Papakan", "Tugal", "Tukanakuden"
        ],
        "Talayan": [
          "Binangga North", "Binangga South", "Boboguiron", "Damablac", "Fugotan", "Fukol",
          "Katibpuan", "Kedati", "Lanting", "Linamunan", "Marader", "Talayan", "Tamar",
          "Tambunan I", "Timbaluan"
        ],
        "Upi": [
          "Bantek", "Bayabas", "Blensong", "Borongotan", "Bugabungan", "Bungcog", "Darugao",
          "Ganasi", "Kabakaba", "Kibleg", "Kibucay", "Kiga", "Kinitan", "Mirab", "Nangi",
          "Nuro Poblacion", "Ranao Pilayan", "Rempes", "Renede", "Renti", "Rifao", "Sefegefen",
          "Tinungkaan"
        ]
      }

    },
    "Marinduque": {
      cities: {
        "Boac": [
          "Agot", "Agumaymayan", "Amoingon", "Apitong", "Balagasan", "Balaring", "Balimbing",
          "Balogo", "Bamban", "Bangbangalon", "Bantad", "Bantay", "Bayuti", "Binunga", "Boi",
          "Boton", "Buliasnin", "Bunganay", "Caganhao", "Canat", "Catubugan", "Cawit", "Daig",
          "Daypay", "Duyay", "Hinapulan", "Ihatub", "Isok I", "Isok II Poblacion", "Laylay",
          "Lupac", "Mahinhin", "Mainit", "Malbog", "Maligaya", "Malusak", "Mansiwat", "Mataas na Bayan",
          "Maybo", "Mercado", "Murallon", "Ogbac", "Pawa", "Pili", "Poctoy", "Poras", "Puting Buhangin",
          "Puyog", "Sabong", "San Miguel", "Santol", "Sawi", "Tabi", "Tabigue", "Tagwak", "Tambunan",
          "Tampus", "Tanza", "Tugos", "Tumagabok", "Tumapon"
        ],
        "Buenavista": [
          "Bagacay", "Bagtingon", "Barangay I", "Barangay II", "Barangay III", "Barangay IV",
          "Bicas-bicas", "Caigangan", "Daykitin", "Libas", "Malbog", "Sihi", "Timbo", "Tungib-Lipata",
          "Yook"
        ],
        "Gasan": [
          "Antipolo", "Bachao Ibaba", "Bachao Ilaya", "Bacongbacong", "Bahi", "Bangbang", "Banot",
          "Banuyo", "Barangay I", "Barangay II", "Barangay III", "Bognuyan", "Cabugao", "Dawis",
          "Dili", "Libtangin", "Mahunig", "Mangiliol", "Masiga", "Matandang Gasan", "Pangi", "Pingan",
          "Tabionan", "Tapuyan", "Tiguion"
        ],
        "Mogpog": [
          "Anapog-Sibucao", "Argao", "Balanacan", "Banto", "Bintakay", "Bocboc", "Butansapa", "Candahon",
          "Capayang", "Danao", "Dulong Bayan", "Gitnang Bayan", "Guisian", "Hinadharan", "Hinanggayon",
          "Ino", "Janagdong", "Lamesa", "Laon", "Magapua", "Malayak", "Malusak", "Mampaitan",
          "Mangyan-Mababad", "Market Site", "Mataas na Bayan", "Mendez", "Nangka I", "Nangka II", "Paye",
          "Pili", "Puting Buhangin", "Sayao", "Silangan", "Sumangga", "Tarug", "Villa Mendez"
        ],
        "Santa Cruz": [
          "Alobo", "Angas", "Aturan", "Bagong Silang Poblacion", "Baguidbirin", "Baliis", "Balogo",
          "Banahaw Poblacion", "Bangcuangan", "Banogbog", "Biga", "Botilao", "Buyabod", "Dating Bayan",
          "Devilla", "Dolores", "Haguimit", "Hupi", "Ipil", "Jolo", "Kaganhao", "Kalangkang", "Kamandugan",
          "Kasily", "Kilo-kilo", "Kiñaman", "Labo", "Lamesa", "Landy", "Lapu-lapu Poblacion", "Libjo",
          "Lipa", "Lusok", "Maharlika Poblacion", "Makulapnit", "Maniwaya", "Manlibunan", "Masaguisi",
          "Masalukot", "Matalaba", "Mongpong", "Morales", "Napo", "Pag-asa Poblacion", "Pantayin", "Polo",
          "Pulong-Parang", "Punong", "San Antonio", "San Isidro", "Tagum", "Tamayo", "Tambangan",
          "Tawiran", "Taytay"
        ],
        "Torrijos": [
          "Bangwayin", "Bayakbakin", "Bolo", "Bonliw", "Buangan", "Cabuyo", "Cagpo", "Dampulan",
          "Kay Duke", "Mabuhay", "Makawayan", "Malibago", "Malinao", "Maranlig", "Marlangga",
          "Matuyatuya", "Nangka", "Pakaskasan", "Payanas", "Poblacion", "Poctoy", "Sibuyao", "Suha",
          "Talawan", "Tigwi"
        ]
      }

    }, "Masbate": {
      cities: {
        "Aroroy": [
          "Ambolong",
          "Amoroy",
          "Amotag",
          "Bagauma",
          "Balawing",
          "Balete",
          "Bangon",
          "Cabangcalan",
          "Cabas-an",
          "Calanay",
          "Capsay",
          "Concepcion",
          "Dayhagan",
          "Don Pablo Dela Rosa",
          "Gumahang",
          "Jaboyoan",
          "Lanang",
          "Luy-a",
          "Macabug",
          "Malubi",
          "Managanaga",
          "Manamoc",
          "Mariposa",
          "Mataba",
          "Matalangtalang",
          "Matongog",
          "Nabongsoran",
          "Pangle",
          "Panique",
          "Pinanaan",
          "Poblacion",
          "Puro",
          "San Agustin",
          "San Isidro",
          "Sawang",
          "Syndicate",
          "Talabaan",
          "Talib",
          "Tigbao",
          "Tinago",
          "Tinigban"
        ],
        "Baleno": [
          "Baao",
          "Banase",
          "Batuila",
          "Cagara",
          "Cagpandan",
          "Cancahorao",
          "Canjunday",
          "Docol",
          "Eastern Capsay",
          "Gabi",
          "Gangao",
          "Lagta",
          "Lahong Interior",
          "Lahong Proper",
          "Lipata",
          "Madangcalan",
          "Magdalena",
          "Manoboc",
          "Obongon Diot",
          "Poblacion",
          "Polot",
          "Potoson",
          "Sog-ong",
          "Tinapian"
        ],
        "Balud": [
          "Baybay",
          "Bongcanaway",
          "Calumpang",
          "Cantil",
          "Casamongan",
          "Danao",
          "Dao",
          "Guinbanwahan",
          "Ilaya",
          "Jangan",
          "Jintotolo",
          "Mabuhay",
          "Mapili",
          "Mapitogo",
          "Pajo",
          "Palane",
          "Panguiranan",
          "Panubigan",
          "Poblacion",
          "Pulanduta",
          "Quinayangan Diotay",
          "Quinayangan Tonga",
          "Salvacion",
          "Sampad",
          "San Andres",
          "San Antonio",
          "Sapatos",
          "Talisay",
          "Tonga",
          "Ubo",
          "Victory",
          "Villa Alvarez"
        ],
        "Batuan": [
          "Burgos",
          "Cambañez",
          "Canares",
          "Costa Rica",
          "Danao",
          "Gibraltar",
          "Mabuhay",
          "Matabao",
          "Nasandig",
          "Panisihan",
          "Poblacion",
          "Rizal",
          "Royroy",
          "Sawang"
        ],
        "Cataingan": [
          "Abaca",
          "Aguada",
          "Badiang",
          "Bagumbayan",
          "Cadulawan",
          "Cagbatang",
          "Chimenea",
          "Concepcion",
          "Curvada",
          "Divisoria",
          "Domorog",
          "Estampar",
          "Gahit",
          "Libtong",
          "Liong",
          "Maanahao",
          "Madamba",
          "Malobago",
          "Matayum",
          "Matubinao",
          "Mintac",
          "Nadawisan",
          "Osmeña",
          "Pawican",
          "Pitogo",
          "Poblacion",
          "Quezon",
          "San Isidro",
          "San Jose",
          "San Pedro",
          "San Rafael",
          "Santa Teresita",
          "Santo Niño",
          "Tagboan",
          "Tuybo",
          "Villa Pogado"
        ],
        "Cawayan": [
          "Begia",
          "Cabayugan",
          "Cabungahan",
          "Calapayan",
          "Calumpang",
          "Chico Island",
          "Dalipe",
          "Divisoria",
          "Gilotongan",
          "Guiom",
          "Iraya",
          "Itombato",
          "Lague-lague",
          "Libertad",
          "Looc",
          "Mactan",
          "Madbad",
          "Mahayahay",
          "Maihao",
          "Malbug",
          "Naro",
          "Palobandera",
          "Pananawan",
          "Peña Island",
          "Pin-as",
          "Poblacion",
          "Pulot",
          "Punta Batsan",
          "R. M. Magbalon",
          "Recodo",
          "San Jose",
          "San Vicente",
          "Taberna",
          "Talisay",
          "Tubog",
          "Tuburan",
          "Villahermosa"
        ],
        "Claveria": [
          "Albasan",
          "Boca Engaño",
          "Buyo",
          "Calpi",
          "Canomay",
          "Cawayan",
          "Imelda",
          "Mababang Baybay",
          "Mabiton",
          "Manapao",
          "Nabasagan",
          "Nonoc",
          "Osmeña",
          "Pasig",
          "Peñafrancia",
          "Poblacion District I",
          "Poblacion District II",
          "Quezon",
          "San Isidro",
          "San Ramon",
          "San Vicente",
          "Taguilid"
        ],
        "Dimasalang": [
          "Balantay",
          "Balocawe",
          "Banahao",
          "Buenaflor",
          "Buracan",
          "Cabanoyoan",
          "Cabrera",
          "Cadulan",
          "Calabad",
          "Canomay",
          "Divisoria",
          "Gaid",
          "Gregorio Alino",
          "Magcaraguit",
          "Mambog",
          "Poblacion",
          "Rizal",
          "San Vicente",
          "Suba",
          "T. R. Yangco"
        ],
        "Esperanza": [
          "Agoho",
          "Almero",
          "Baras",
          "Domorog",
          "Guadalupe",
          "Iligan",
          "Labangtaytay",
          "Labrador",
          "Libertad",
          "Magsaysay",
          "Masbaranon",
          "Poblacion",
          "Potingbato",
          "Rizal",
          "San Roque",
          "Santiago",
          "Sorosimbajan",
          "Tawad",
          "Tunga",
          "Villa"
        ],
        "Mandaon": [
          "Alas",
          "Ayat",
          "Bat-ongan",
          "Bugtong",
          "Buri",
          "Cabitan",
          "Cagmasoso",
          "Canomoy",
          "Centro",
          "Dayao",
          "Guincaiptan",
          "Laguinbanwa",
          "Lantangan",
          "Looc",
          "Mabatobato",
          "Maolingon",
          "Nailaban",
          "Nanipsan",
          "Pinamangcaan",
          "Poblacion",
          "Polo Dacu",
          "San Juan",
          "San Pablo",
          "Santa Fe",
          "Tagpu",
          "Tumalaytay"
        ],
        "Masbate City": [
          "Anas",
          "Asid",
          "B. Titong",
          "Bagumbayan",
          "Bantigue",
          "Bapor",
          "Batuhan",
          "Bayombon",
          "Biyong",
          "Bolo",
          "Cagay",
          "Cawayan Exterior",
          "Cawayan Interior",
          "Centro",
          "Espinosa",
          "F. Magallanes",
          "Ibingay",
          "Igang",
          "Kalipay",
          "Kinamaligan",
          "Malinta",
          "Mapiña",
          "Mayngaran",
          "Nursery",
          "Pating",
          "Pawa",
          "Sinalongan",
          "Tugbo",
          "Ubongan Dacu",
          "Usab"
        ],
        "Milagros": [
          "Bacolod",
          "Bangad",
          "Bara",
          "Bonbon",
          "Calasuche",
          "Calumpang",
          "Capaculan",
          "Cayabon",
          "Guinluthangan",
          "Jamorawon",
          "Magsalangi",
          "Matagbac",
          "Matanglad",
          "Matiporon",
          "Moises R. Espinosa",
          "Narangasan",
          "Pamangpangon",
          "Paraiso",
          "Poblacion East",
          "Poblacion West",
          "San Antonio",
          "San Carlos",
          "Sawmill",
          "Tagbon",
          "Tawad",
          "Tigbao",
          "Tinaclipan"
        ],
        "Mobo": [
          "Baang",
          "Bagacay",
          "Balatucan",
          "Barag",
          "Dacu",
          "Fabrica",
          "Guintorelan",
          "Holjogon",
          "Lalaguna",
          "Lomocloc",
          "Luyong Catungan",
          "Mabuhay",
          "Mandali",
          "Mapuyo",
          "Marintoc",
          "Nasunduan",
          "Pinamalatican",
          "Pinamarbuhan",
          "Poblacion Dist. I",
          "Poblacion Dist. II",
          "Polot",
          "Sambulawan",
          "Santa Maria",
          "Sawmill",
          "Tabuc",
          "Tugawe",
          "Tugbo",
          "Umabay Exterior",
          "Umabay Interior"
        ],
        "Monreal": [
          "Cantorna",
          "Famosa",
          "Guinhadap",
          "Macarthur",
          "Maglambong",
          "Morocborocan",
          "Poblacion",
          "Real",
          "Rizal",
          "Santo Niño",
          "Torogon"
        ], "Palanas": [
          "Antipolo",
          "Banco",
          "Biga-a",
          "Bontod",
          "Buenasuerte",
          "Intusan",
          "Jose A. Abenir Sr.",
          "Maanahao",
          "Mabini",
          "Malatawan",
          "Malibas",
          "Maravilla",
          "Matugnao",
          "Miabas",
          "Nabangig",
          "Nipa",
          "Parina",
          "Piña",
          "Poblacion",
          "Salvacion",
          "San Antonio",
          "San Carlos",
          "San Isidro",
          "Santa Cruz"
        ],
        "Pio V. Corpuz": [
          "Alegria",
          "Buenasuerte",
          "Bugang",
          "Bugtong",
          "Bunducan",
          "Cabangrayan",
          "Calongongan",
          "Casabangan",
          "Guindawahan",
          "Labigan",
          "Lampuyang",
          "Mabuhay",
          "Palho",
          "Poblacion",
          "Salvacion",
          "Tanque",
          "Tubigan",
          "Tubog"
        ],
        "Placer": [
          "Aguada",
          "Ban-ao",
          "Burabod",
          "Cabangcalan",
          "Calumpang",
          "Camayabsan",
          "Daanlungsod",
          "Dangpanan",
          "Daraga",
          "Guin-awayan",
          "Guinhan-ayan",
          "Katipunan",
          "Libas",
          "Locso-an",
          "Luna",
          "Mahayag",
          "Mahayahay",
          "Manlut-od",
          "Matagantang",
          "Naboctot",
          "Nagarao",
          "Nainday",
          "Naocondiot",
          "Pasiagon",
          "Pili",
          "Poblacion",
          "Puro",
          "Quibrada",
          "San Marcos",
          "Santa Cruz",
          "Taboc",
          "Tan-awan",
          "Taverna",
          "Tubod",
          "Villa Inocencio"
        ],
        "San Fernando": [
          "Altavista",
          "Bayanihan Poblacion",
          "Baybaydagat Poblacion",
          "Benitinan",
          "Buenasuerte",
          "Buenavista",
          "Buenos Aires",
          "Buyo",
          "Cañelas",
          "Corbada",
          "Daplian",
          "Del Rosario",
          "Ipil",
          "Lahong",
          "Lumbia",
          "Magkaipit",
          "Magsasaka Poblacion",
          "Minio",
          "Pinamoghaan",
          "Progreso",
          "Resurreccion",
          "Salvacion",
          "Silangan Poblacion",
          "Sowa",
          "Talisay",
          "Valparaiso"
        ],
        "San Jacinto": [
          "Almiñe",
          "Bagacay",
          "Bagahanglad",
          "Bartolabac",
          "Burgos",
          "Calipat-an",
          "Danao",
          "District I",
          "District II",
          "District III",
          "District IV",
          "Dorong-an Daplian",
          "Interior",
          "Jagna-an",
          "Luna",
          "Mabini",
          "Piña",
          "Roosevelt",
          "San Isidro",
          "Santa Rosa",
          "Washington"
        ],
        "San Pascual": [
          "Boca Chica",
          "Bolod",
          "Busing",
          "Cueva",
          "Dangcalan",
          "Halabangbaybay",
          "Iniwaran",
          "Ki-Buaya",
          "Ki-Romero",
          "Laurente",
          "Mabini",
          "Mabuhay",
          "Malaking Ilog",
          "Mapanique",
          "Nazareno",
          "Pinamasingan",
          "Quintina",
          "San Jose",
          "San Pedro",
          "San Rafael",
          "Santa Cruz",
          "Terraplin"
        ],
        "Uson": [
          "Arado",
          "Armenia",
          "Aurora",
          "Badling",
          "Bonifacio",
          "Buenasuerte",
          "Buenavista",
          "Campana",
          "Candelaria",
          "Centro",
          "Crossing",
          "Dapdap",
          "Del Carmen",
          "Del Rosario",
          "Libertad",
          "Mabini",
          "Mabuhay",
          "Madao",
          "Magsaysay",
          "Marcella",
          "Miaga",
          "Mongahay",
          "Morocborocan",
          "Paguihaman",
          "Panicijan",
          "Poblacion",
          "Quezon",
          "San Isidro",
          "San Jose",
          "San Mateo",
          "San Ramon",
          "San Vicente",
          "Santo Cristo",
          "Sawang",
          "Simawa"
        ]
      }

    },
    "Misamis Occidental": {
      cities: {
        "Aloran": [
          "Balintonga", "Banisilon", "Burgos", "Calube", "Caputol", "Casusan", "Conat", "Culpan",
          "Dalisay", "Dullan", "Ibabao", "Labo", "Lawa-an", "Lobogon", "Lumbayao", "Macubon",
          "Makawa", "Manamong", "Matipaz", "Maular", "Mitazan", "Mohon", "Monterico", "Nabuna",
          "Ospital", "Palayan", "Pelong", "Roxas", "San Pedro", "Santa Ana", "Sinampongan", "Taguanao",
          "Tawi-tawi", "Toril", "Tubod", "Tuburan", "Tugaya", "Zamora"
        ],
        "Baliangao": [
          "Del Pilar", "Landing", "Lumipac", "Lusot", "Mabini", "Magsaysay", "Misom", "Mitacas",
          "Naburos", "Northern Poblacion", "Punta Miray", "Punta Sulong", "Sinian", "Southern Poblacion",
          "Tugas"
        ],
        "Bonifacio": [
          "Bag-ong Anonang", "Bagumbang", "Baybay", "Bolinsong", "Buenavista", "Buracan", "Calolot",
          "Demetrio Fernan", "Digson", "Dimalco", "Dullan", "Kanaokanao", "Liloan", "Linconan", "Lodiong",
          "Lower Usugan", "Mapurog", "Migpange", "Montol", "Pisa-an", "Poblacion", "Remedios", "Rufino Lumapas",
          "Sibuyon", "Tangab", "Tiaman", "Tusik", "Upper Usogan"
        ],
        "Calamba": [
          "Bonifacio", "Bunawan", "Calaran", "Dapacan Alto", "Dapacan Bajo", "Don Bernardo Nery Poblacion",
          "Langub", "Libertad", "Magcamiguing", "Mamalad", "Mauswagon", "Northern Poblacion", "Salvador",
          "San Isidro", "Siloy", "Singalat", "Solinog", "Southwestern Poblacion", "Sulipat"
        ],
        "Clarin": [
          "Bernad", "Bito-on", "Cabunga-an", "Canibungan Daku", "Canibungan Putol", "Canipacan", "Dalingap",
          "Dela Paz", "Dolores", "Gata Daku", "Gata Diot", "Guba", "Kinangay Norte", "Kinangay Sur", "Lapasan",
          "Lupagan", "Malibangcao", "Masabud", "Mialen", "Pan-ay", "Penacio", "Poblacion I", "Poblacion II",
          "Poblacion III", "Poblacion IV", "Sebasi", "Segatic Daku", "Segatic Diot", "Tinacla-an"
        ],
        "Concepcion": [
          "Bagong Nayon", "Capule", "Guiban", "Laya-an", "Lingatongan", "Maligubaan", "Mantukoy", "Marugang",
          "New Casul", "Poblacion", "Pogan", "Small Potongan", "Soso-on", "Upper Dapitan", "Upper Dioyo",
          "Upper Potongan", "Upper Salimpono", "Virayan"
        ],
        "Don Victoriano Chiongbian": [
          "Bagong Clarin", "Gandawan", "Lake Duminagat", "Lalud", "Lampasan", "Liboron", "Maramara", "Napangan",
          "Nueva Vista", "Petianan", "Tuno"
        ],
        "Jimenez": [
          "Adorable", "Butuay", "Carmen", "Corrales", "Dicoloc", "Gata", "Guintomoyan", "Macabayao", "Malibacsan",
          "Matugas Alto", "Matugas Bajo", "Mialem", "Nacional", "Naga", "Palilan", "Rizal", "San Isidro", "Santa Cruz",
          "Seti", "Sibaroc", "Sinara Alto", "Sinara Bajo", "Tabo-o", "Taraka"
        ],
        "Lopez Jaena": [
          "Alegria", "Bagong Silang", "Biasong", "Bonifacio", "Burgos", "Dalacon", "Dampalan", "Don Andres Soriano",
          "Eastern Poblacion", "Estante", "Jasa-an", "Katipa", "Luzaran", "Mabas", "Macalibre Alto", "Macalibre Bajo",
          "Mahayahay", "Manguehan", "Mansabay Alto", "Mansabay Bajo", "Molatuhan Alto", "Molatuhan Bajo", "Peniel",
          "Puntod", "Rizal", "Sibugon", "Sibula", "Western Poblacion"
        ],
        "Oroquieta": [
          "Apil", "Binuangan", "Bolibol", "Buenavista", "Bunga", "Buntawan", "Burgos", "Canubay", "Ciriaco C. Pastrano",
          "Clarin Settlement", "Dolipos Alto", "Dolipos Bajo", "Dulapo", "Dullan Norte", "Dullan Sur", "Lamac Lower",
          "Lamac Upper", "Langcangan Lower", "Langcangan Proper", "Langcangan Upper", "Layawan", "Loboc Lower",
          "Loboc Upper", "Malindang", "Mialen", "Mobod", "Paypayan", "Pines", "Poblacion I", "Poblacion II",
          "Rizal Lower", "Rizal Upper", "San Vicente Alto", "San Vicente Bajo", "Sebucal", "Senote", "Taboc Norte",
          "Taboc Sur", "Talairon", "Talic", "Tipan", "Toliyok", "Tuyabang Alto", "Tuyabang Bajo", "Tuyabang Proper",
          "Victoria", "Villaflor"
        ],
        "Ozamiz": [
          "50th District", "Aguada", "Bacolod", "Bagakay", "Balintawak", "Banadero", "Baybay San Roque", "Baybay Santa Cruz",
          "Baybay Triunfo", "Bongbong", "Calabayan", "Capucao C.", "Capucao P.", "Carangan", "Carmen", "Catadman-Manabay",
          "Cavinte", "Cogon", "Dalapang", "Diguan", "Dimaluna", "Doña Consuelo", "Embargo", "Gala", "Gango", "Gotokan Daku",
          "Gotokan Diot", "Guimad", "Guingona", "Kinuman Norte", "Kinuman Sur", "Labinay", "Labo", "Lam-an", "Liposong",
          "Litapan", "Malaubang", "Manaka", "Maningcol", "Mentering", "Molicay", "Pantaon", "Pulot", "San Antonio",
          "Sangay Daku", "Sangay Diot", "Sinuza", "Stimson Abordo", "Tabid", "Tinago", "Trigos"
        ],
        "Panaon": [
          "Baga", "Bangko", "Camanucan", "Dela Paz", "Lutao", "Magsaysay", "Map-an", "Mohon", "Poblacion", "Punta",
          "Salimpuno", "San Andres", "San Juan", "San Roque", "Sumasap", "Villalin"
        ],
        "Plaridel": [
          "Agunod", "Bato", "Buena Voluntad", "Calaca-an", "Cartagena Proper", "Catarman", "Cebulin", "Clarin", "Danao",
          "Deboloc", "Divisoria", "Eastern Looc", "Ilisan", "Katipunan", "Kauswagan", "Lao Proper", "Lao Santa Cruz",
          "Looc Proper", "Mamanga Daku", "Mamanga Gamay", "Mangidkid", "New Cartagena", "New Look", "Northern Poblacion",
          "Panalsalan", "Puntod", "Quirino", "Santa Cruz", "Southern Looc", "Southern Poblacion", "Tipolo", "Unidos",
          "Usocan"
        ],
        "Sapang Dalaga": [
          "Agapito Yap, Sr.", "Bautista", "Bitibut", "Boundary", "Caluya", "Capundag", "Casul", "Dalumpinas", "Dasa",
          "Dioyo", "Disoy", "El Paraiso", "Guinabot", "Libertad", "Locus", "Macabibo", "Manla", "Masubong", "Medallo",
          "Poblacion", "Salimpuno", "San Agustin", "Sapang Ama", "Sinaad", "Sipac", "Sixto Velez, Sr.", "Upper Bautista",
          "Ventura"
        ],
        "Sinacaban": [
          "Cagay-anon", "Camanse", "Colupan Alto", "Colupan Bajo", "Dinas", "Estrella", "Katipunan", "Libertad Alto",
          "Libertad Bajo", "Poblacion", "San Isidro Alto", "San Isidro Bajo", "San Lorenzo Ruiz", "San Vicente", "Señor",
          "Sinonoc", "Tipan"
        ],
        "Tangub": [
          "Aquino", "Balatacan", "Baluk", "Banglay", "Barangay I-City Hall", "Barangay II-Marilou Annex",
          "Barangay III-Market Kalubian", "Barangay IV-Saint Michael", "Barangay V-Malubog", "Barangay VI-Lower Polao",
          "Barangay VII-Upper Polao", "Bintana", "Bocator", "Bongabong", "Caniangan", "Capalaran", "Catagan", "Garang",
          "Guinabot", "Guinalaban", "Huyohoy", "Isidro D. Tan", "Kauswagan", "Kimat", "Labuyo", "Lorenzo Tan", "Lumban",
          "Maloro", "Manga", "Mantic", "Maquilao", "Matugnaw", "Migcanaway", "Minsubong", "Owayan", "Paiton",
          "Panalsalan", "Pangabuan", "Prenza", "Salimpuno", "San Antonio", "San Apolinario", "San Vicente", "Santa Cruz",
          "Santa Maria", "Santo Niño", "Sicot", "Silanga", "Silangit", "Simasay", "Sumirap", "Taguite", "Tituron", "Tugas",
          "Villaba"
        ],
        "Tudela": [
          "Balon", "Barra", "Basirang", "Bongabong", "Buenavista", "Cabol-anonan", "Cahayag", "Calambutan Bajo",
          "Calambutan Settlement", "Camating", "Canibungan Proper", "Casilak San Agustin", "Centro Hulpa", "Centro Napu",
          "Centro Upper", "Duanguican", "Gala", "Gumbil", "Locso-on", "Maikay", "Maribojoc", "Mitugas", "Nailon", "Namut",
          "Napurog", "Pan-ay Diot", "San Nicolas", "Sebac", "Silongon", "Sinuza", "Taguima", "Tigdok", "Yahong"
        ]
      }
    },
    "Misamis Oriental": {
      cities: {
        "Alubijid": [
          "Baybay", "Alubijid", "Benigwayan", "Alubijid", "Calatcat", "Alubijid", "Lagtang", "Alubijid", "Lanao", "Alubijid",
          "Loguilo", "Alubijid", "Lourdes", "Alubijid", "Lumbo", "Alubijid", "Molocboloc", "Alubijid", "Poblacion", "Alubijid",
          "Sampatulog", "Alubijid", "Sungay", "Alubijid", "Talaba", "Alubijid", "Taparak", "Alubijid", "Tugasnon", "Alubijid",
          "Tula", "Alubijid"
        ],
        "Balingasag": [
          "Balagnan", "Balingasag", "Baliwagan", "Balingasag", "Barangay 1", "Balingasag", "Barangay 2", "Balingasag",
          "Barangay 3", "Balingasag", "Barangay 4", "Balingasag", "Barangay 5", "Balingasag", "Barangay 6", "Balingasag",
          "Binitinan", "Balingasag", "Blanco", "Balingasag", "Calawag", "Balingasag", "Camuayan", "Balingasag", "Cogon", "Balingasag",
          "Dansuli", "Balingasag", "Dumarait", "Balingasag", "Hermano", "Balingasag", "Kibanban", "Balingasag", "Linabu", "Balingasag",
          "Linggangao", "Balingasag", "Mambayaan", "Balingasag", "Mandangoa", "Balingasag", "Napaliran", "Balingasag", "Quezon", "Balingasag",
          "Rosario", "Balingasag", "Samay", "Balingasag", "San Francisco", "Balingasag", "San Isidro", "Balingasag", "San Juan", "Balingasag",
          "Talusan", "Balingasag", "Waterfall", "Balingasag"
        ],
        "Balingoan": [
          "Baukbauk Poblacion", "Balingoan", "Dahilig", "Balingoan", "Kabangasan", "Balingoan", "Kabulakan", "Balingoan",
          "Kauswagan", "Balingoan", "Lapinig", "Balingoan", "Mantangale", "Balingoan", "Mapua", "Balingoan", "San Alonzo", "Balingoan"
        ],
        "Binuangan": [
          "Dampias", "Binuangan", "Kitamban", "Binuangan", "Kitambis", "Binuangan", "Mabini", "Binuangan", "Mosangot", "Binuangan",
          "Nabataan", "Binuangan", "Poblacion", "Binuangan", "Valdeconcha", "Binuangan"
        ],
        "Claveria": [
          "Ani-e", "Claveria", "Aposkahoy", "Claveria", "Bulahan", "Claveria", "Cabacungan", "Claveria", "Gumaod", "Claveria",
          "Hinaplanan", "Claveria", "Kalawitan", "Claveria", "Lanise", "Claveria", "Luna", "Claveria", "Madaguing", "Claveria",
          "Malagana", "Claveria", "Mat-i", "Claveria", "Minalwang", "Claveria", "Pambugas", "Claveria", "Panampawan", "Claveria",
          "Patrocenio", "Claveria", "Pelaez", "Claveria", "Plaridel", "Claveria", "Poblacion", "Claveria", "Punong", "Claveria",
          "Rizal", "Claveria", "Santa Cruz", "Claveria", "Tamboboan", "Claveria", "Tipolohon", "Claveria"
        ],
        "El Salvador": [
          "Amoros", "El Salvador", "Bolisong", "El Salvador", "Bolobolo", "El Salvador", "Calongonan", "El Salvador", "Cogon", "El Salvador",
          "Himaya", "El Salvador", "Hinigdaan", "El Salvador", "Kalabaylabay", "El Salvador", "Kibonbon", "El Salvador", "Molugan", "El Salvador",
          "Poblacion", "El Salvador", "Sambulawan", "El Salvador", "Sinaloc", "El Salvador", "Taytay", "El Salvador", "Ulaliman", "El Salvador"
        ],
        "Gingoog": [
          "Agay-ayan", "Gingoog", "Alagatan", "Gingoog", "Anakan", "Gingoog", "Bagubad", "Gingoog", "Bakidbakid", "Gingoog",
          "Bal-ason", "Gingoog", "Bantaawan", "Gingoog", "Barangay 1", "Gingoog", "Barangay 10", "Gingoog", "Barangay 11", "Gingoog",
          "Barangay 12", "Gingoog", "Barangay 13", "Gingoog", "Barangay 14", "Gingoog", "Barangay 15", "Gingoog", "Barangay 16", "Gingoog",
          "Barangay 17", "Gingoog", "Barangay 18", "Gingoog", "Barangay 18-A", "Gingoog", "Barangay 19", "Gingoog", "Barangay 2", "Gingoog",
          "Barangay 20", "Gingoog", "Barangay 21", "Gingoog", "Barangay 22", "Gingoog", "Barangay 22-A", "Gingoog", "Barangay 23", "Gingoog",
          "Barangay 24", "Gingoog", "Barangay 24-A", "Gingoog", "Barangay 25", "Gingoog", "Barangay 26", "Gingoog", "Barangay 3", "Gingoog",
          "Barangay 4", "Gingoog", "Barangay 5", "Gingoog", "Barangay 6", "Gingoog", "Barangay 7", "Gingoog", "Barangay 8", "Gingoog",
          "Barangay 9", "Gingoog", "Binakalan", "Gingoog", "Capitulangan", "Gingoog", "Daan-Lungsod", "Gingoog", "Dinawehan", "Gingoog",
          "Eureka", "Gingoog", "Hindangon", "Gingoog", "Kalagonoy", "Gingoog", "Kalipay", "Gingoog", "Kamanikan", "Gingoog", "Kianlagan", "Gingoog",
          "Kibuging", "Gingoog", "Kipuntos", "Gingoog", "Lawaan", "Gingoog", "Lawit", "Gingoog", "Libertad", "Gingoog", "Libon", "Gingoog",
          "Lunao", "Gingoog", "Lunotan", "Gingoog", "Malibud", "Gingoog", "Malinao", "Gingoog", "Maribucao", "Gingoog", "Mimbalagon", "Gingoog",
          "Mimbunga", "Gingoog", "Mimbuntong", "Gingoog", "Minsapinit", "Gingoog", "Murallon", "Gingoog", "Odiongan", "Gingoog", "Pangasihan", "Gingoog",
          "Pigsaluhan", "Gingoog", "Punong", "Gingoog", "Ricoro", "Gingoog", "Samay", "Gingoog", "San Jose", "Gingoog", "San Juan", "Gingoog",
          "San Luis", "Gingoog", "San Miguel", "Gingoog", "Sangalan", "Gingoog", "Santiago", "Gingoog", "Tagpako", "Gingoog", "Talisay", "Gingoog",
          "Talon", "Gingoog", "Tinabalan", "Gingoog", "Tinulongan", "Gingoog"
        ]
      }
    }, "Mountain Province": {
      cities: {
        "Alubijid": [
          "Baybay", "Alubijid", "Benigwayan", "Alubijid", "Calatcat", "Alubijid", "Lagtang", "Alubijid", "Lanao", "Alubijid",
          "Loguilo", "Alubijid", "Lourdes", "Alubijid", "Lumbo", "Alubijid", "Molocboloc", "Alubijid", "Poblacion", "Alubijid",
          "Sampatulog", "Alubijid", "Sungay", "Alubijid", "Talaba", "Alubijid", "Taparak", "Alubijid", "Tugasnon", "Alubijid",
          "Tula", "Alubijid"
        ],
        "Balingasag": [
          "Balagnan", "Balingasag", "Baliwagan", "Balingasag", "Barangay 1", "Balingasag", "Barangay 2", "Balingasag",
          "Barangay 3", "Balingasag", "Barangay 4", "Balingasag", "Barangay 5", "Balingasag", "Barangay 6", "Balingasag",
          "Binitinan", "Balingasag", "Blanco", "Balingasag", "Calawag", "Balingasag", "Camuayan", "Balingasag", "Cogon", "Balingasag",
          "Dansuli", "Balingasag", "Dumarait", "Balingasag", "Hermano", "Balingasag", "Kibanban", "Balingasag", "Linabu", "Balingasag",
          "Linggangao", "Balingasag", "Mambayaan", "Balingasag", "Mandangoa", "Balingasag", "Napaliran", "Balingasag", "Quezon", "Balingasag",
          "Rosario", "Balingasag", "Samay", "Balingasag", "San Francisco", "Balingasag", "San Isidro", "Balingasag", "San Juan", "Balingasag",
          "Talusan", "Balingasag", "Waterfall", "Balingasag"
        ],
        "Balingoan": [
          "Baukbauk Poblacion", "Balingoan", "Dahilig", "Balingoan", "Kabangasan", "Balingoan", "Kabulakan", "Balingoan",
          "Kauswagan", "Balingoan", "Lapinig", "Balingoan", "Mantangale", "Balingoan", "Mapua", "Balingoan", "San Alonzo", "Balingoan"
        ],
        "Binuangan": [
          "Dampias", "Binuangan", "Kitamban", "Binuangan", "Kitambis", "Binuangan", "Mabini", "Binuangan", "Mosangot", "Binuangan",
          "Nabataan", "Binuangan", "Poblacion", "Binuangan", "Valdeconcha", "Binuangan"
        ],
        "Claveria": [
          "Ani-e", "Claveria", "Aposkahoy", "Claveria", "Bulahan", "Claveria", "Cabacungan", "Claveria", "Gumaod", "Claveria",
          "Hinaplanan", "Claveria", "Kalawitan", "Claveria", "Lanise", "Claveria", "Luna", "Claveria", "Madaguing", "Claveria",
          "Malagana", "Claveria", "Mat-i", "Claveria", "Minalwang", "Claveria", "Pambugas", "Claveria", "Panampawan", "Claveria",
          "Patrocenio", "Claveria", "Pelaez", "Claveria", "Plaridel", "Claveria", "Poblacion", "Claveria", "Punong", "Claveria",
          "Rizal", "Claveria", "Santa Cruz", "Claveria", "Tamboboan", "Claveria", "Tipolohon", "Claveria"
        ],
        "El Salvador": [
          "Amoros", "El Salvador", "Bolisong", "El Salvador", "Bolobolo", "El Salvador", "Calongonan", "El Salvador", "Cogon", "El Salvador",
          "Himaya", "El Salvador", "Hinigdaan", "El Salvador", "Kalabaylabay", "El Salvador", "Kibonbon", "El Salvador", "Molugan", "El Salvador",
          "Poblacion", "El Salvador", "Sambulawan", "El Salvador", "Sinaloc", "El Salvador", "Taytay", "El Salvador", "Ulaliman", "El Salvador"
        ],
        "Gingoog": [
          "Agay-ayan", "Gingoog", "Alagatan", "Gingoog", "Anakan", "Gingoog", "Bagubad", "Gingoog", "Bakidbakid", "Gingoog",
          "Bal-ason", "Gingoog", "Bantaawan", "Gingoog", "Barangay 1", "Gingoog", "Barangay 10", "Gingoog", "Barangay 11", "Gingoog",
          "Barangay 12", "Gingoog", "Barangay 13", "Gingoog", "Barangay 14", "Gingoog", "Barangay 15", "Gingoog", "Barangay 16", "Gingoog",
          "Barangay 17", "Gingoog", "Barangay 18", "Gingoog", "Barangay 18-A", "Gingoog", "Barangay 19", "Gingoog", "Barangay 2", "Gingoog",
          "Barangay 20", "Gingoog", "Barangay 21", "Gingoog", "Barangay 22", "Gingoog", "Barangay 22-A", "Gingoog", "Barangay 23", "Gingoog",
          "Barangay 24", "Gingoog", "Barangay 24-A", "Gingoog", "Barangay 25", "Gingoog", "Barangay 26", "Gingoog", "Barangay 3", "Gingoog",
          "Barangay 4", "Gingoog", "Barangay 5", "Gingoog", "Barangay 6", "Gingoog", "Barangay 7", "Gingoog", "Barangay 8", "Gingoog",
          "Barangay 9", "Gingoog", "Binakalan", "Gingoog", "Capitulangan", "Gingoog", "Daan-Lungsod", "Gingoog", "Dinawehan", "Gingoog",
          "Eureka", "Gingoog", "Hindangon", "Gingoog", "Kalagonoy", "Gingoog", "Kalipay", "Gingoog", "Kamanikan", "Gingoog", "Kianlagan", "Gingoog",
          "Kibuging", "Gingoog", "Kipuntos", "Gingoog", "Lawaan", "Gingoog", "Lawit", "Gingoog", "Libertad", "Gingoog", "Libon", "Gingoog",
          "Lunao", "Gingoog", "Lunotan", "Gingoog", "Malibud", "Gingoog", "Malinao", "Gingoog", "Maribucao", "Gingoog", "Mimbalagon", "Gingoog",
          "Mimbunga", "Gingoog", "Mimbuntong", "Gingoog", "Minsapinit", "Gingoog", "Murallon", "Gingoog", "Odiongan", "Gingoog", "Pangasihan", "Gingoog",
          "Pigsaluhan", "Gingoog", "Punong", "Gingoog", "Ricoro", "Gingoog", "Samay", "Gingoog", "San Jose", "Gingoog", "San Juan", "Gingoog",
          "San Luis", "Gingoog", "San Miguel", "Gingoog", "Sangalan", "Gingoog", "Santiago", "Gingoog", "Tagpako", "Gingoog", "Talisay", "Gingoog",
          "Talon", "Gingoog", "Tinabalan", "Gingoog", "Tinulongan", "Gingoog"
        ]
      }

    },
    "Negros Occidental": {
      cities: {
        "Bago": [
          "Abuanan", "Alianza", "Atipuluan", "Bacong-Montilla", "Bagroy", "Balingasag", "Binubuhan", "Busay",
          "Calumangan", "Caridad", "Dulao", "Ilijan", "Jorge L. Araneta", "Lag-asan", "Ma-ao Barrio", "Mailum",
          "Malingin", "Napoles", "Pacol", "Poblacion", "Sagasa", "Sampinit", "Tabunan", "Taloc"
        ],
        "Binalbagan": [
          "Amontay", "Bagroy", "Bi-ao", "Canmoros", "Enclaro", "Marina", "Paglaum", "Payao", "Progreso", "San Jose",
          "San Juan", "San Pedro", "San Teodoro", "San Vicente", "Santo Rosario", "Santol"
        ],
        "Cadiz": [
          "Andres Bonifacio", "Banquerohan", "Barangay 1 Poblacion", "Barangay 2 Poblacion", "Barangay 3 Poblacion",
          "Barangay 4 Poblacion", "Barangay 5 Poblacion", "Barangay 6 Poblacion", "Burgos", "Cabahug", "Cadiz Viejo",
          "Caduha-an", "Celestino Villacin", "Daga", "Jerusalem", "Luna", "Mabini", "Magsaysay", "Sicaba", "Tiglawigan",
          "Tinampa-an", "V. F. Gustilo"
        ],
        "Calatrava": [
          "Agpangi", "Ani-e", "Bagacay", "Bantayanon", "Buenavista", "Cabungahan", "Calampisawan", "Cambayobo",
          "Castellano", "Cruz", "Dolis", "Hilub-ang", "Hinab-ongan", "Ilaya", "Laga-an", "Lalong", "Lemery", "Lipat-on",
          "Lo-ok", "Ma-aslob", "Macasilao", "Mahilum", "Malanog", "Malatas", "Marcelo", "Menchaca", "Mina-utok",
          "Minapasuk", "Paghumayan", "Pantao", "Patun-an", "Pinocutan", "Refugio", "San Benito", "San Isidro", "Suba",
          "Telim", "Tigbao", "Tigbon", "Winaswasan"
        ],
        "Candoni": [
          "Agboy", "Banga", "Cabia-an", "Caningay", "Gatuslao", "Haba", "Payauan", "Poblacion East", "Poblacion West"
        ],
        "Cauayan": [
          "Abaca", "Baclao", "Basak", "Bulata", "Caliling", "Camalanda-an", "Camindangan", "Elihan", "Guiljungan",
          "Inayawan", "Isio", "Linaon", "Lumbia", "Mambugsay", "Man-Uling", "Masaling", "Molobolo", "Poblacion",
          "Sura", "Talacdan", "Tambad", "Tiling", "Tomina", "Tuyom", "Yao-yao"
        ],
        "Enrique B. Magalona": [
          "Alacaygan", "Alicante", "Batea", "Canlusong", "Consing", "Cudangdang", "Damgo", "Gahit", "Latasan", "Madalag",
          "Manta-angan", "Nanca", "Pasil", "Poblacion I", "Poblacion II", "Poblacion III", "San Isidro", "San Jose",
          "Santo Niño", "Tabigue", "Tanza", "Tomongtong", "Tuburan"
        ],
        "Escalante": [
          "Alimango", "Balintawak", "Binaguiohan", "Buenavista", "Cervantes", "Dian-ay", "Hacienda Fe", "Japitan",
          "Jonobjonob", "Langub", "Libertad", "Mabini", "Magsaysay", "Malasibog", "Old Poblacion", "Paitan", "Pinapugasan",
          "Rizal", "Tamlang", "Udtongan", "Washington"
        ],
        "Himamaylan": [
          "Aguisan", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Buenavista", "Cabadiangan", "Cabanbanan",
          "Carabalan", "Caradio-an", "Libacao", "Mahalang", "Mambagaton", "Nabali-an", "San Antonio", "Sara-et", "Su-ay",
          "Talaban", "To-oy"
        ],
        "Hinigaran": [
          "Anahaw", "Aranda"
        ], "Hinigaran": [
          "Baga-as", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Bato", "Calapi", "Camalobalo", "Camba-og",
          "Cambugsa", "Candumarao", "Gargato", "Himaya", "Miranda", "Nanunga", "Narauis", "Palayog", "Paticui", "Pilar",
          "Quiwi", "Tagda", "Tuguis"
        ],
        "Hinoba-an": [
          "Alim", "Asia", "Bacuyangan", "Barangay I", "Barangay II", "Bulwangan", "Culipapa", "Damutan", "Daug", "Po-ok",
          "San Rafael", "Sangke", "Talacagay"
        ],
        "Ilog": [
          "Andulauan", "Balicotoc", "Barangay I", "Barangay II", "Bocana", "Calubang", "Canlamay", "Consuelo", "Dancalan",
          "Delicioso", "Galicia", "Manalad", "Pinggot", "Tabu", "Vista Alegre"
        ],
        "Isabela": [
          "Amin", "Banogbanog", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7",
          "Barangay 8", "Barangay 9", "Bulad", "Bungahin", "Cabcab", "Camangcamang", "Camp Clark", "Cansalongon", "Guintubhan",
          "Libas", "Limalima", "Makilignit", "Mansablay", "Maytubig", "Panaquiao", "Riverside", "Rumirang", "San Agustin",
          "Sebucawan", "Sikatuna", "Tinongan"
        ],
        "Kabankalan": [
          "Bantayan", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7",
          "Barangay 8", "Barangay 9", "Binicuil", "Camansi", "Camingawan", "Camugao", "Carol-an", "Daan Banua", "Hilamonan",
          "Inapoy", "Linao", "Locotan", "Magballo", "Oringao", "Orong", "Pinaguinpinan", "Salong", "Tabugon", "Tagoc",
          "Tagukon", "Talubangi", "Tampalon", "Tan-awan", "Tapi"
        ],
        "La Carlota": [
          "Ara-al", "Ayungon", "Balabag", "Barangay I", "Barangay II", "Barangay III", "Batuan", "Cubay", "Haguimit",
          "La Granja", "Nagasi", "Roberto S. Benedicto", "San Miguel", "Yubo"
        ],
        "La Castellana": [
          "Biaknabato", "Cabacungan", "Cabagnaan", "Camandag", "Lalagsan", "Manghanoy", "Mansalanao", "Masulog", "Nato",
          "Puso", "Robles", "Sag-ang", "Talaptap"
        ],
        "Manapla": [
          "Barangay I", "Barangay I-A", "Barangay I-B", "Barangay II", "Barangay II-A", "Chambery", "Punta Mesa", "Punta Salong",
          "Purisima", "San Pablo", "Santa Teresa", "Tortosa"
        ],
        "Moises Padilla": [
          "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Crossing Magallon",
          "Guinpana-an", "Inolingan", "Macagahay", "Magallon Cadre", "Montilla", "Odiong", "Quintin Remo"
        ],
        "Murcia": [
          "Abo-abo", "Alegria", "Amayco", "Blumentritt", "Buenavista", "Caliban", "Canlandog", "Cansilayan", "Damsite", "Iglau-an",
          "Lopez Jaena", "Minoyan", "Pandanon", "Salvacion", "San Miguel", "Santa Cruz", "Santa Rosa", "Talotog", "Zone I",
          "Zone II", "Zone III", "Zone IV", "Zone V"
        ],
        "Pontevedra": [
          "Antipolo", "Barangay I", "Barangay II", "Barangay III", "Buenavista Gibong", "Buenavista Rizal", "Burgos", "Cambarus",
          "Canroma", "Don Salvador Benedicto", "General Malvar", "Gomez", "M. H. del Pilar", "Mabini", "Miranda", "Pandan", "Recreo", "San Isidro", "San Juan", "Zamora"
        ],
        "Pulupandan": [
          "Barangay Zone 1", "Barangay Zone 1-A", "Barangay Zone 2", "Barangay Zone 3", "Barangay Zone 4",
          "Barangay Zone 4-A", "Barangay Zone 5", "Barangay Zone 6", "Barangay Zone 7", "Canjusa",
          "Crossing Pulupandan", "Culo", "Mabini", "Pag-ayon", "Palaka Norte", "Palaka Sur", "Patic", "Tapong", "Ubay", "Utod"
        ],
        "Sagay": [
          "Andres Bonifacio", "Bato", "Baviera", "Bulanon", "Campo Himoga-an", "Campo Santiago", "Colonia Divina",
          "Fabrica", "General Luna", "Himoga-an Baybay", "Lopez Jaena", "Makiling", "Malubon", "Molocaboc", "Old Sagay",
          "Paraiso", "Plaridel", "Poblacion I", "Poblacion II", "Puey", "Rafaela Barrera", "Rizal", "Taba-ao", "Tadlong", "Vito"
        ],
        "Salvador Benedicto": [
          "Bago", "Bagong Silang", "Bunga", "Igmaya-an", "Kumaliskis", "Pandanon", "Pinowayan"
        ],
        "San Carlos": [
          "Bagonbon", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Buluangan",
          "Codcod", "Ermita", "Guadalupe", "Nataban", "Palampas", "Prosperidad", "Punao", "Quezon", "Rizal", "San Juan"
        ],
        "San Enrique": [
          "Bagonawa", "Baliwagan", "Batuan", "Guintorilan", "Nayon", "Poblacion", "Sibucao", "Tabao Baybay", "Tabao Rizal",
          "Tibsoc"
        ],
        "Silay": [
          "Bagtic", "Balaring", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI Poblacion",
          "Eustaquio Lopez", "Guimbala-on", "Guinhalaran", "Kapitan Ramon", "Lantad", "Mambulac", "Patag", "Rizal"
        ],
        "Sipalay": [
          "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Cabadiangan", "Camindangan", "Canturay",
          "Cartagena", "Cayhagan", "Gil Montilla", "Mambaroto", "Manlucahoc", "Maricalum", "Nabulao", "Nauhang", "San Jose"
        ],
        "Talisay": [
          "Bubog", "Cabatangan", "Concepcion", "Dos Hermanas", "Efigenio Lizares", "Katilingban", "Matab-ang", "San Fernando",
          "Zone 1", "Zone 10", "Zone 11", "Zone 12", "Zone 12-A", "Zone 14", "Zone 14-A", "Zone 14-B", "Zone 15", "Zone 16",
          "Zone 2", "Zone 3", "Zone 4", "Zone 4-A", "Zone 5", "Zone 6", "Zone 7", "Zone 8", "Zone 9"
        ],
        "Toboso": [
          "Bandila", "Bug-ang", "General Luna", "Magticol", "Poblacion", "Salamanca", "San Isidro", "San Jose", "Tabun-ac"
        ],
        "Valladolid": [
          "Alijis", "Ayungon", "Bagumbayan", "Batuan", "Bayabas", "Central Tabao", "Doldol", "Guintorilan", "Lacaron", "Mabini",
          "Pacol", "Palaka", "Paloma", "Poblacion", "Sagua Banua", "Tabao Proper"
        ],
        "Victorias": [
          "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay IX", "Barangay V", "Barangay VI", "Barangay VI-A",
          "Barangay VII", "Barangay VIII", "Barangay X", "Barangay XI", "Barangay XII", "Barangay XIII", "Barangay XIV", "Barangay XIX",
          "Barangay XIX-A", "Barangay XV", "Barangay XV-A", "Barangay XVI", "Barangay XVI-A", "Barangay XVII", "Barangay XVIII",
          "Barangay XVIII-A", "Barangay XX", "Barangay XXI"
        ]

      }

    },
    "Negros Oriental": {
      cities: {
        "Amlan": [
          "Bio-os", "Jantianon", "Jugno", "Mag-abo", "Poblacion", "Silab", "Tambojangin", "Tandayag"
        ],
        "Ayungon": [
          "Amdus", "Anibong", "Atabay", "Awa-an", "Ban-ban", "Calagcalag", "Candana-ay", "Carol-an", "Gomentoc",
          "Inacban", "Iniban", "Jandalamanon", "Kilaban", "Lamigan", "Maaslum", "Mabato", "Manogtong", "Nabhang",
          "Poblacion", "Tambo", "Tampocon I", "Tampocon II", "Tibyawan", "Tiguib"
        ],
        "Bacong": [
          "Balayagmanok", "Banilad", "Buntis", "Buntod", "Calangag", "Combado", "Doldol", "Isugan", "Liptong",
          "Lutao", "Magsuhot", "Malabago", "Mampas", "North Poblacion", "Sacsac", "San Miguel", "South Poblacion",
          "Sulodpan", "Timbanga", "Timbao", "Tubod", "West Poblacion"
        ],
        "Bais": [
          "Barangay I", "Barangay II", "Basak", "Biñohon", "Cabanlutan", "Calasga-an", "Cambagahan", "Cambaguio",
          "Cambanjao", "Cambuilao", "Canlargo", "Capiñahan", "Consolacion", "Dansulan", "Hangyad", "Katacgahan",
          "La Paz", "Lo-oc", "Lonoy", "Mabunao", "Manlipac", "Mansangaban", "Okiot", "Olympia", "Panala-an",
          "Panam-angan", "Rosario", "Sab-ahan", "San Isidro", "Tagpo", "Talungon", "Tamisu", "Tamogong", "Tangculogan",
          "Valencia"
        ],
        "Basay": [
          "Actin", "Bal-os", "Bongalonan", "Cabalayongan", "Cabatuanan", "Linantayan", "Maglinao", "Nagbo-alao",
          "Olandao", "Poblacion"
        ],
        "Bayawan": [
          "Ali-is", "Banaybanay", "Banga", "Boyco", "Bugay", "Cansumalig", "Dawis", "Kalamtukan", "Kalumboyan",
          "Malabugas", "Mandu-ao", "Maninihon", "Minaba", "Nangka", "Narra", "Pagatban", "Poblacion", "San Isidro",
          "San Jose", "San Miguel", "San Roque", "Suba", "Tabuan", "Tayawan", "Tinago", "Ubos", "Villareal", "Villasol"
        ],
        "Bindoy": [
          "Atotes", "Batangan", "Bulod", "Cabcaban", "Cabugan", "Camudlas", "Canluto", "Danao", "Danawan", "Domolog",
          "Malaga", "Manseje", "Matobato", "Nagcasunog", "Nalundan", "Pangalaycayan", "Peñahan", "Poblacion",
          "Salong", "Tagaytay", "Tinaogan", "Tubod"
        ],
        "Canlaon": [
          "Bayog", "Binalbagan", "Bucalan", "Budlasan", "Linothangan", "Lumapao", "Mabigo", "Malaiba", "Masulog",
          "Ninoy Aquino", "Panubigan", "Pula"
        ],
        "Dauin": [
          "Anahawan", "Apo Island", "Bagacay", "Baslay", "Batuhon Dacu", "Boloc-boloc", "Bulak", "Bunga", "Casile",
          "Libjo", "Lipayo", "Maayongtubig", "Mag-aso", "Magsaysay", "Malongcay Dacu", "Masaplod Norte", "Masaplod Sur",
          "Panubtuban", "Poblacion I", "Poblacion II", "Poblacion III", "Tugawe", "Tunga-tunga"
        ],
        "Dumaguete": [
          "Balugo", "Banilad", "Bantayan", "Batinguel", "Bunao", "Cadawinonan", "Calindagan", "Camanjac", "Candau-ay",
          "Cantil-e", "Daro", "Junob", "Looc", "Mangnao-Canal", "Motong", "Piapi", "Poblacion No. 1", "Poblacion No. 2",
          "Poblacion No. 3", "Poblacion No. 4", "Poblacion No. 5", "Poblacion No. 6", "Poblacion No. 7", "Poblacion No. 8",
          "Pulantubig", "Tabuctubig", "Taclobo", "Talay"
        ],
        "Guihulngan": [
          "Bakid", "Balogo", "Banwaque", "Basak", "Binobohan", "Buenavista", "Bulado", "Calamba", "Calupa-an", "Hibaiyo",
          "Hilaitan", "Hinakpan", "Humayhumay", "Imelda", "Kagawasan", "Linantuyan", "Luz", "Mabunga", "Magsaysay",
          "Malusay", "Maniak", "Mckinley", "Nagsaha", "Padre Zamora", "Plagatasanon", "Planas", "Poblacion", "Sandayao",
          "Tacpao", "Tinayunan Beach", "Tinayunan Hill", "Trinidad", "Villegas"
        ],
        "Jimalalud": [
          "Aglahug", "Agutayon", "Apanangon", "Bae", "Bala-as", "Bangcal", "Banog", "Buto", "Cabang", "Camandayon",
          "Cangharay", "Canlahao", "Dayoyo", "Eli", "Lacaon", "Mahanlud", "Malabago", "Mambaid", "Mongpong",
          "North Poblacion", "Owacan", "Pacuan", "Panglaya-an", "Polopantao", "Sampiniton", "South Poblacion", "Talamban",
          "Tamao"
        ],
        "La Libertad": [
          "Aniniaw", "Aya", "Bagtic", "Biga-a", "Busilak", "Cangabo", "Cantupa", "Elecia", "Eli", "Guihob", "Kansumandig",
          "Mambulod", "Mandapaton", "Manghulyawon", "Manluminsag", "Mapalasan", "Maragondong", "Martilo", "Nasungan",
          "Pacuan", "Pangca", "Pisong", "Pitogo", "Poblacion North", "Poblacion South", "San Jose", "Solongon", "Tala-on",
          "Talayong"
        ],
        "Mabinay": [
          "Abis", "Arebasore", "Bagtic", "Banban", "Barras", "Bato", "Bugnay", "Bulibulihan", "Bulwang", "Campanun-an",
          "Canggohob", "Cansal-ing", "Dagbasan", "Dahile", "Hagtu", "Himocdongon", "Inapoy", "Lamdas", "Lumbangan", "Luyang",
          "Manlingay", "Mayaposi", "Napasu-an", "New Namangka", "Old Namangka", "Pandanon", "Paniabonan", "Pantao",
          "Poblacion", "Samac", "Tadlong", "Tara"
        ],
        "Manjuyod": [
          "Alangilanan", "Bagtic", "Balaas", "Bantolinao", "Bolisong", "Butong", "Campuyo", "Candabong", "Concepcion",
          "Dungo-an", "Kauswagan", "Lamogong", "Libjo", "Maaslum", "Mandalupang", "Panciao", "Poblacion", "Sac-sac",
          "Salvacion", "San Isidro", "San Jose", "Santa Monica", "Suba", "Sundo-an", "Tanglad", "Tubod", "Tupas"
        ],
        "Pamplona": [
          "Abante", "Balayong", "Banawe", "Calicanan", "Datagon", "Fatima", "Inawasan", "Magsusunog", "Malalangsi", "Mamburao", "Mangoto", "Poblacion", "San Isidro", "Santa Agueda", "Simborio", "Yupisan"
        ],
        "San Jose": [
          "Basak", "Basiao", "Cambaloctot", "Cancawas", "Janayjanay", "Jilocon", "Naiba", "Poblacion", "San Roque",
          "Santo Niño", "Señora Ascion", "Siapo", "Tampi", "Tapon Norte"
        ],
        "Santa Catalina": [
          "Alangilan", "Amio", "Buenavista", "Caigangan", "Caranoche", "Cawitan", "Fatima", "Kabulacan", "Mabuhay",
          "Manalongon", "Mansagomayon", "Milagrosa", "Nagbalaye", "Nagbinlod", "Obat", "Poblacion", "San Francisco",
          "San Jose", "San Miguel", "San Pedro", "Santo Rosario", "Talalak"
        ],
        "Siaton": [
          "Albiga", "Apoloy", "Bonawon", "Bonbonon", "Cabangahan", "Canaway", "Casala-an", "Caticugan", "Datag",
          "Giliga-on", "Inalad", "Malabuhan", "Maloh", "Mantiquil", "Mantuyop", "Napacao", "Poblacion I", "Poblacion II",
          "Poblacion III", "Poblacion IV", "Salag", "San Jose", "Sandulot", "Si-it", "Sumaliring", "Tayak"
        ],
        "Sibulan": [
          "Agan-an", "Ajong", "Balugo", "Bolocboloc", "Calabnugan", "Cangmating", "Enrique Villanueva", "Looc",
          "Magatas", "Maningcao", "Maslog", "Poblacion", "San Antonio", "Tubigon", "Tubtubon"
        ],
        "Tanjay": [
          "Azagra", "Bahi-an", "Luca", "Manipis", "Novallas", "Obogon", "Pal-ew", "Poblacion I", "Poblacion II",
          "Poblacion III", "Poblacion IV", "Poblacion IX", "Poblacion V", "Poblacion VI", "Poblacion VII", "Poblacion VIII",
          "Polo", "San Isidro", "San Jose", "San Miguel", "Santa Cruz Nuevo", "Santa Cruz Viejo", "Santo Niño", "Tugas"
        ],
        "Tayasan": [
          "Bacong", "Bago", "Banga", "Cabulotan", "Cambaye", "Dalaupon", "Guincalaban", "Ilaya-Tayasan", "Jilabangan",
          "Lag-it", "Linao", "Lutay", "Maglihe", "Magtuhao", "Matauta", "Matuog", "Numnum", "Palaslan", "Pinalubngan",
          "Pindahan", "Pinocawan", "Poblacion", "Santa Cruz", "Saying", "Suquib", "Tamao", "Tambulan", "Tanlad"
        ],
        "Valencia": [
          "Apolong", "Balabag East", "Balabag West", "Balayagmanok", "Balili", "Balugo", "Bong-ao", "Bongbong",
          "Caidiocan", "Calayugan", "Cambucad", "Dobdob", "Jawa", "Liptong", "Lunga", "Malabo", "Malaunay", "Mampas",
          "North Poblacion", "Palinpinon", "Puhagan", "Pulangbato", "Sagbang", "South Poblacion"
        ],
        "Vallehermoso": [
          "Bagawines", "Bairan", "Cabulihan", "Don Espiridion Villegas", "Guba", "Macapso", "Maglahos", "Malangsa",
          "Molobolo", "Pinocawan", "Poblacion", "Puan", "Tabon", "Tagbino", "Ulay"
        ],
        "Zamboanguita": [
          "Basac", "Calango", "Lotuban", "Malongcay Diot", "Maluay", "Mayabon", "Nabago", "Najandig", "Nasig-id",
          "Poblacion"
        ]
      }

    }, "Northern Samar": {
      cities: {
        "Allen": [
          "Alejandro Village",
          "Bonifacio",
          "Cabacungan",
          "Calarayan",
          "Frederic",
          "Guin-arawayan",
          "Imelda",
          "Jubasan",
          "Kinabranan Zone I",
          "Kinabranan Zone II",
          "Kinaguitman",
          "Lagundi",
          "Lipata",
          "Lo-oc",
          "Londres",
          "Sabang Zone I",
          "Sabang Zone II",
          "Santa Rita",
          "Tasvilla",
          "Victoria"
        ],
        "Biri": [
          "Kauswagan",
          "MacArthur",
          "Pio del Pilar",
          "Poblacion",
          "Progresso",
          "San Antonio",
          "San Pedro",
          "Santo Niño"
        ],
        "Bobon": [
          "Acerida",
          "Arellano",
          "Balat-balud",
          "Calantiao",
          "Dancalan",
          "E. Duran",
          "Gen. Lucban",
          "Jose Abad Santos",
          "Jose P. Laurel",
          "Magsaysay",
          "Quezon",
          "Salvacion",
          "San Isidro",
          "San Juan",
          "Santa Clara",
          "Santander",
          "Somoroy",
          "Trojello"
        ],
        "Capul": [
          "Aguin",
          "Jubang",
          "Landusan",
          "Oson",
          "Poblacion Barangay 1",
          "Poblacion Barangay 2",
          "Poblacion Barangay 3",
          "Poblacion Barangay 4",
          "Poblacion Barangay 5",
          "Sagaosawan",
          "San Luis",
          "Sawang"
        ],
        "Catarman": [
          "Acacia",
          "Aguinaldo",
          "Airport Village",
          "Bangkerohan",
          "Baybay",
          "Bocsol",
          "Cabayhan",
          "Cag-abaca",
          "Cal-igang",
          "Calachuchi",
          "Cawayan",
          "Cervantes",
          "Cularima",
          "Daganas",
          "Dalakit",
          "Doña Pulqueria",
          "Galutan",
          "Gebalagnan",
          "Gebulwangan",
          "General Malvar",
          "Guba",
          "Hinatad",
          "Imelda",
          "Ipil-ipil",
          "Jose Abad Santos",
          "Jose P. Rizal",
          "Kasoy",
          "Lapu-lapu",
          "Liberty",
          "Libjo",
          "Mabini",
          "Mabolo",
          "Macagtas",
          "Mckinley",
          "Molave",
          "Narra",
          "New Rizal",
          "Old Rizal",
          "Paticua",
          "Polangi",
          "Quezon",
          "Salvacion",
          "Sampaguita",
          "San Julian",
          "San Pascual",
          "Santol",
          "Somoge",
          "Talisay",
          "Tinowaran",
          "Trangue",
          "UEP I",
          "UEP II",
          "UEP III",
          "Washington",
          "Yakal"
        ],
        "Catubig": [
          "Anongo",
          "Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Barangay 7",
          "Barangay 8",
          "Bonifacio",
          "Boring",
          "Cagbugna",
          "Cagmanaba",
          "Cagogobngan",
          "Calingnan",
          "Canuctan",
          "Claro M. Recto",
          "D. Mercader",
          "Guibwangan",
          "Hinagonoyan",
          "Hiparayan",
          "Hitapi-an",
          "Inoburan",
          "Irawahan",
          "Lenoyahan",
          "Libon",
          "Magongon",
          "Magtuad",
          "Manering",
          "Nabulo",
          "Nagoocan",
          "Nahulid",
          "Opong",
          "Osang",
          "Osmeña",
          "P. Rebadulla",
          "Roxas",
          "Sagudsuron",
          "San Antonio",
          "San Francisco",
          "San Jose",
          "San Vicente",
          "Santa Fe",
          "Sulitan",
          "Tangbo",
          "Tungodnon",
          "Vienna Maria"
        ],
        "Gamay": [
          "Anito",
          "Bangon",
          "Bato",
          "Baybay District",
          "Bonifacio",
          "Burabod",
          "Cabarasan",
          "Cadac-an",
          "Cade-an",
          "Cagamutan del Norte",
          "Cagamutan del Sur",
          "Dao",
          "G. M. Osias",
          "Gamay Central",
          "Gamay Occidental I",
          "Gamay Oriental I",
          "Guibuangan",
          "Henogawe",
          "Libertad",
          "Lonoy",
          "Luneta",
          "Malidong",
          "Occidental II",
          "Oriental II",
          "Rizal",
          "San Antonio"
        ],
        "Laoang": [
          "Abaton",
          "Aguadahan",
          "Aroganga",
          "Atipolo",
          "Bawang",
          "Baybay",
          "Binatiklan",
          "Bobolosan",
          "Bongliw",
          "Burabud",
          "Cabadiangan",
          "Cabagngan",
          "Cabago-an",
          "Cabulaloan",
          "Cagaasan",
          "Cagdara-o",
          "Cahayagan",
          "Calintaan Poblacion",
          "Calomotan",
          "Candawid",
          "Cangcahipos",
          "Canyomanao",
          "Catigbian",
          "E. J. Dulay",
          "G. B. Tan",
          "Gibatangan",
          "Guilaoangi",
          "Inamlan",
          "La Perla",
          "Langob",
          "Lawaan",
          "Little Venice",
          "Magsaysay",
          "Marubay",
          "Mualbual",
          "Napotiocan",
          "Oleras",
          "Onay",
          "Palmera",
          "Pangdan",
          "Rawis",
          "Rombang",
          "San Antonio",
          "San Miguel Heights",
          "Sangcol",
          "Sibunot",
          "Simora",
          "Suba",
          "Talisay",
          "Tan-awan",
          "Tarusan",
          "Tinoblan",
          "Tumaguingting",
          "Vigo",
          "Yabyaban",
          "Yapas"
        ],
        "Lapinig": [
          "Alang-alang",
          "Bagacay",
          "Cahagwayan",
          "Can Maria",
          "Can Omanio",
          "Imelda",
          "Lapinig del Norte",
          "Lapinig del Sur",
          "Lo-ok",
          "Mabini",
          "May-igot",
          "Palanas",
          "Pio del Pilar",
          "Potong",
          "Potong del Sur"
        ], "Las Navas": [
          "Balugo", "Bugay", "Bugtosan", "Bukid", "Bulao", "Caputoan", "Catoto-ogan", "Cuenco", "Dapdap", "Del Pilar",
          "Dolores", "Epaw", "Geguinta", "Geracdo", "Guyo", "H. Jolejole", "H. Jolejole District", "Hangi", "Imelda", "L. Empon",
          "Lakandula", "Lourdes", "Lumala-og", "Mabini", "Macarthur", "Magsaysay", "Matelarag", "Osmeña", "Paco", "Palanas",
          "Perez", "Poponton", "Quezon", "Quirino", "Quirino District", "Rebong", "Rizal", "Roxas", "Rufino", "Sag-od",
          "San Andres", "San Antonio", "San Fernando", "San Francisco", "San Isidro", "San Jorge", "San Jose", "San Miguel",
          "Santo Tomas", "Tagab-iran", "Tagan-ayan", "Taylor", "Victory"
        ],
        "Lavezares": [
          "Balicuatro", "Bani", "Barobaybay", "Caburihan", "Caragas", "Cataogan", "Chansvilla", "Datag", "Enriqueta", "Libas",
          "Libertad", "Macarthur", "Magsaysay", "Maravilla", "Ocad", "Sabong-Tabok", "Salvacion", "San Agustin", "San Isidro",
          "San Jose", "San Juan", "San Miguel", "To-og", "Urdaneta", "Villa", "Villahermosa"
        ],
        "Lope de Vega": [
          "Bayho", "Bonifacio", "Cag-aguingay", "Cagamesarag", "Curry", "Gebonawan", "Gen. Luna", "Getigo", "Henaronagan",
          "Lope de Vega", "Lower Caynaga", "Maghipid", "Magsaysay", "Osmeña", "Paguite", "Roxas", "Sampaguita", "San Francisco",
          "San Jose", "San Miguel", "Somoroy", "Upper Caynaga"
        ],
        "Mapanas": [
          "Burgos", "Del Norte", "Del Sur", "E. Laodenio", "Jubasan", "Magsaysay", "Magtaon", "Manaybanay", "Naparasan",
          "Quezon", "San Jose", "Santa Potenciana", "Siljagon"
        ],
        "Mondragon": [
          "Bagasbas", "Bugko", "Cablangan", "Cagmanaba", "Cahicsan", "Chitongco", "De Maria", "Doña Lucia", "Eco", "Flormina",
          "Hinabangan", "Imelda", "La Trinidad", "Makiwalo", "Mirador", "Nenita", "Roxas", "San Agustin", "San Antonio",
          "San Isidro", "San Jose", "San Juan", "Santa Catalina", "Talolora"
        ],
        "Palapag": [
          "Asum", "Bagacay", "Bangon", "Benigno S. Aquino, Jr.", "Binay", "Cabariwan", "Cabatuan", "Campedico", "Capacujan",
          "Jangtud", "Laniwan", "Mabaras", "Magsaysay", "Manajao", "Mapno", "Maragano", "Matambag", "Monbon", "Nagbobtac",
          "Napo", "Natawo", "Nipa", "Osmeña", "Pangpang", "Paysud", "Sangay", "Simora", "Sinalaran", "Sumoroy", "Talolora",
          "Tambangan", "Tinampo"
        ],
        "Pambujan": [
          "Cababto-an", "Cabari-an", "Cagbigajo", "Camparanga", "Canjumadal", "Doña Anecita", "Ge-adgawan", "Geparayan",
          "Ginulgan", "Igot", "Inanahawan", "Manahao", "Paninirongan", "Poblacion District 1", "Poblacion District 2",
          "Poblacion District 3", "Poblacion District 4", "Poblacion District 5", "Poblacion District 6", "Poblacion District 7",
          "Poblacion District 8", "San Ramon", "Senonogan", "Sixto T. Balanguit, Sr.", "Tula", "Ynaguingayan"
        ],
        "Rosario": [
          "Aguada", "Bantolinao", "Buenavista", "Commonwealth", "Guindaulan", "Jamoog", "Kailingan", "Ligaya", "Poblacion",
          "Salhag", "San Lorenzo"
        ],
        "San Antonio": [
          "Burabod", "Dalupirit", "Manraya", "Pilar", "Rizal", "San Nicolas", "Vinisitahan", "Ward I", "Ward II", "Ward III"
        ],
        "San Isidro": [
          "Alegria", "Balite", "Buenavista", "Caglanipao", "Happy Valley", "Mabuhay", "Palanit", "Poblacion Norte", "Poblacion Sur",
          "Salvacion", "San Juan", "San Roque", "Seven Hills", "Veriato"
        ],
        "San Jose": [
          "Aguadahan", "Bagong Sabang", "Balite", "Barangay East", "Barangay North", "Barangay South", "Barangay West", "Bonglas",
          "Da-o", "Gengarog", "Geratag", "Layuhan", "Mandugang", "P. Tingzon", "San Lorenzo", "Tubigdanao"
        ],
        "San Roque": [
          "Balnasan", "Balud", "Bantayan", "Coroconog", "Dale", "Ginagdanan", "Lao-angan", "Lawaan", "Malobago", "Pagsang-an",
          "Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6"
        ],
        "San Vicente": [
          "Destacado Poblacion", "Maragat", "Mongol Bongol Poblacion", "Punta Poblacion", "Sangputan", "Sila", "Tarnate"
        ],
        "Silvino Lobos": [
          "Balud", "Cababayogan", "Cabunga-an", "Cagda-o", "Caghilot", "Camanggaran", "Camaya-an", "Deit de Suba", "Deit de Turag",
          "Gebolwangan", "Gebonawan", "Gecbo-an", "Genagasan", "Geparayan de Turag", "Giguimitan", "Gusaran", "Imelda", "Montalban",
          "Poblacion I", "Poblacion II", "San Antonio", "San Isidro", "Senonogan de Tubang", "Suba", "Tobgon", "Victory"
        ],
        "Victoria": [
          "Acedillo", "Buenasuerte", "Buenos Aires", "Colab-og", "Erenas", "Libertad", "Luisita", "Lungib", "Maxvilla", "Pasabuena",
          "San Lazaro", "San Miguel", "San Roman", "Zone I", "Zone II", "Zone III"
        ]
      }

    },
    "Nueva Ecija": {
      cities: {
        "Aliaga": [
          "Betes",
          "Bibiclat",
          "Bucot",
          "La Purisima",
          "Macabucod",
          "Magsaysay",
          "Pantoc",
          "Poblacion Centro",
          "Poblacion East I",
          "Poblacion East II",
          "Poblacion West III",
          "Poblacion West IV",
          "San Carlos",
          "San Emiliano",
          "San Eustacio",
          "San Felipe Bata",
          "San Felipe Matanda",
          "San Juan",
          "San Pablo Bata",
          "San Pablo Matanda",
          "Santa Monica",
          "Santiago",
          "Santo Rosario",
          "Santo Tomas",
          "Sunson",
          "Umangan"
        ],
        "Bongabon": [
          "Antipolo",
          "Ariendo",
          "Bantug",
          "Calaanan",
          "Commercial",
          "Cruz",
          "Curva",
          "Digmala",
          "Kaingin",
          "Labi",
          "Larcon",
          "Lusok",
          "Macabaclay",
          "Magtanggol",
          "Mantile",
          "Olivete",
          "Palo Maria",
          "Pesa",
          "Rizal",
          "Sampalucan",
          "San Roque",
          "Santor",
          "Sinipit",
          "Sisilang na Ligaya",
          "Social",
          "Tugatug",
          "Tulay na Bato",
          "Vega"
        ],
        "Cabanatuan": [
          "Aduas Centro",
          "Aduas Norte",
          "Aduas Sur",
          "Bagong Buhay",
          "Bagong Sikat",
          "Bakero",
          "Bakod Bayan",
          "Balite",
          "Bangad",
          "Bantug Bulalo",
          "Bantug Norte",
          "Barlis",
          "Barrera District",
          "Bernardo District",
          "Bitas",
          "Bonifacio District",
          "Buliran",
          "Caalibangbangan",
          "Cabu",
          "Calawagan",
          "Campo Tinio",
          "Caridad",
          "Caudillo",
          "Cinco-Cinco",
          "City Supermarket",
          "Communal",
          "Cruz Roja",
          "Daang Sarile",
          "Dalampang",
          "Dicarma",
          "Dimasalang",
          "Dionisio S. Garcia",
          "Fatima",
          "General Luna",
          "Hermogenes C. Concepcion, Sr.",
          "Ibabao Bana",
          "Imelda District",
          "Isla",
          "Kalikid Norte",
          "Kalikid Sur",
          "Kapitan Pepe",
          "Lagare",
          "Lourdes",
          "M. S. Garcia",
          "Mabini Extension",
          "Mabini Homesite",
          "Macatbong",
          "Magsaysay District",
          "Magsaysay South",
          "Maria Theresa",
          "Matadero",
          "Mayapyap Norte",
          "Mayapyap Sur",
          "Melojavilla",
          "Nabao",
          "Obrero",
          "Padre Burgos",
          "Padre Crisostomo",
          "Pagas",
          "Palagay",
          "Pamaldan",
          "Pangatian",
          "Patalac",
          "Polilio",
          "Pula",
          "Quezon District",
          "Rizdelis",
          "Samon",
          "San Isidro",
          "San Josef Norte",
          "San Josef Sur",
          "San Juan Poblacion",
          "San Roque Norte",
          "San Roque Sur",
          "Sanbermicristi",
          "Sangitan",
          "Sangitan East",
          "Santa Arcadia",
          "Santo Niño",
          "Sapang",
          "Sumacab Este",
          "Sumacab Norte",
          "Sumacab South",
          "Talipapa",
          "Valdefuente",
          "Valle Cruz",
          "Vijandre District",
          "Villa Ofelia-Caridad",
          "Zulueta District"
        ],
        "Cabiao": [
          "Bagong Buhay",
          "Bagong Sikat",
          "Bagong Silang",
          "Concepcion",
          "Entablado",
          "Maligaya",
          "Natividad North",
          "Natividad South",
          "Palasinan",
          "Polilio",
          "San Antonio",
          "San Carlos",
          "San Fernando Norte",
          "San Fernando Sur",
          "San Gregorio",
          "San Juan North",
          "San Juan South",
          "San Roque",
          "San Vicente",
          "Santa Ines",
          "Santa Isabel",
          "Santa Rita",
          "Sinipit"
        ],
        "Carranglan": [
          "Bantug",
          "Bunga",
          "Burgos",
          "Capintalan",
          "D. L. Maglanoc Poblacion",
          "F. C. Otic Poblacion",
          "G. S. Rosario Poblacion",
          "General Luna",
          "Joson",
          "Minuli",
          "Piut",
          "Puncan",
          "Putlan",
          "R. A. Padilla",
          "Salazar",
          "San Agustin",
          "T. L. Padilla Poblacion"
        ],
        "Cuyapo": [
          "Baloy",
          "Bambanaba",
          "Bantug",
          "Bentigan",
          "Bibiclat",
          "Bonifacio",
          "Bued",
          "Bulala",
          "Burgos",
          "Cabatuan",
          "Cabileo",
          "Cacapasan",
          "Calancuasan Norte",
          "Calancuasan Sur",
          "Colosboa",
          "Columbitin",
          "Curva",
          "District I",
          "District II",
          "District IV",
          "District V",
          "District VI",
          "District VII",
          "District VIII",
          "Landig",
          "Latap",
          "Loob",
          "Luna",
          "Malbeg-Patalan",
          "Malineng",
          "Matindeg",
          "Maycaban",
          "Nacuralan",
          "Nagmisahan",
          "Paitan Norte",
          "Paitan Sur",
          "Piglisan",
          "Pugo",
          "Rizal",
          "Sabit",
          "Salagusog",
          "San Antonio",
          "San Jose",
          "San Juan",
          "Santa Clara",
          "Santa Cruz",
          "Sinimbaan",
          "Tagtagumbao",
          "Tutuloy",
          "Ungab",
          "Villaflores"
        ],
        "Gabaldon": [
          "Bagong Sikat",
          "Bagting",
          "Bantug",
          "Bitulok",
          "Bugnan",
          "Calabasa",
          "Camachile",
          "Cuyapa",
          "Ligaya",
          "Macasandal",
          "Malinao",
          "Pantoc",
          "Pinamalisan",
          "Sawmill",
          "South Poblacion",
          "Tagumpay"
        ],
        "Gapan": [
          "Balante",
          "Bayanihan",
          "Bulak",
          "Bungo",
          "Kapalangan",
          "Mabunga",
          "Maburak",
          "Mahipon",
          "Makabaclay",
          "Malimba",
          "Mangino",
          "Marelo",
          "Pambuan",
          "Parcutela",
          "Puting Tubig",
          "San Lorenzo",
          "San Nicolas",
          "San Roque",
          "San Vicente",
          "Santa Cruz",
          "Santo Cristo Norte",
          "Santo Cristo Sur",
          "Santo Niño"
        ],
        "General Mamerto Natividad": [
          "Balangkare Norte",
          "Balangkare Sur",
          "Balaring",
          "Belen",
          "Bravo",
          "Burol",
          "Kabulihan",
          "Mag-asawang Sampaloc",
          "Manarog",
          "Mataas na Kahoy",
          "Panacsac", "Picaleon", "Pinahan", "Platero", "Poblacion", "Pula",
          "Pulong Singkamas", "Sapang Bato", "Talabutab Norte", "Talabutab Sur"
        ], "General Tinio": [
          "Bago", "Concepcion", "Nazareth", "Padolina", "Palale", "Pias",
          "Poblacion Central", "Poblacion East", "Poblacion West", "Pulong Matong",
          "Rio Chico", "Sampaguita", "San Pedro"
        ],
        "Guimba": [
          "Agcano", "Ayos Lomboy", "Bacayao", "Bagong Barrio", "Balbalino", "Balingog East",
          "Balingog West", "Banitan", "Bantug", "Bulakid", "Bunol", "Caballero", "Cabaruan",
          "Caingin Tabing Ilog", "Calem", "Camiling", "Cardinal", "Casongsong", "Catimon",
          "Cavite", "Cawayan Bugtong", "Consuelo", "Culong", "Escano", "Faigal", "Galvan",
          "Guiset", "Lamorito", "Lennec", "Macamias", "Macapabellag", "Macatcatuit", "Manacsac",
          "Manggang Marikit", "Maturanoc", "Maybubon", "Naglabrahan", "Nagpandayan", "Narvacan I",
          "Narvacan II", "Pacac", "Partida I", "Partida II", "Pasong Inchic", "Saint John District",
          "San Agustin", "San Andres", "San Bernardino", "San Marcelino", "San Miguel", "San Rafael",
          "San Roque", "Santa Ana", "Santa Cruz", "Santa Lucia", "Santa Veronica District",
          "Santo Cristo District", "Saranay District", "Sinulatan", "Subol", "Tampac I", "Tampac II & III",
          "Triala", "Yuson"
        ],
        "Jaen": [
          "Calabasa", "Dampulan", "Don Mariano Marcos", "Hilera", "Imbunia", "Imelda Poblacion",
          "Lambakin", "Langla", "Magsalisi", "Malabon-Kaingin", "Marawa", "Niyugan",
          "Ocampo-Rivera District", "Pakol", "Pamacpacan", "Pinanggaan", "Putlod", "San Jose",
          "San Josef", "San Pablo", "San Roque", "San Vicente", "Santa Rita", "Santo Tomas North",
          "Santo Tomas South", "Sapang", "Ulanin-Pitak"
        ],
        "Laur": [
          "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Betania", "Canantong",
          "Nauzon", "Pangarulong", "Pinagbayanan", "Sagana", "San Felipe", "San Fernando",
          "San Isidro", "San Josef", "San Juan", "San Vicente", "Siclong"
        ],
        "Licab": [
          "Aquino", "Linao", "Poblacion Norte", "Poblacion Sur", "San Casimiro", "San Cristobal",
          "San Jose", "San Juan", "Santa Maria", "Tabing Ilog", "Villarosa"
        ],
        "Llanera": [
          "A. Bonifacio", "Bagumbayan", "Bosque", "Caridad Norte", "Caridad Sur", "Casile",
          "Florida Blanca", "General Luna", "General Ricarte", "Gomez", "Inanama", "Ligaya",
          "Mabini", "Murcon", "Plaridel", "San Felipe", "San Francisco", "San Nicolas", "San Vicente",
          "Santa Barbara", "Victoria", "Villa Viniegas"
        ],
        "Lupao": [
          "Agupalo Este", "Agupalo Weste", "Alalay Chica", "Alalay Grande", "Bagong Flores",
          "Balbalungao", "Burgos", "Cordero", "J. U. Tienzo", "Mapangpang", "Namulandayan",
          "Parista", "Poblacion East", "Poblacion North", "Poblacion South", "Poblacion West",
          "Salvacion I", "Salvacion II", "San Antonio Este", "San Antonio Weste", "San Isidro",
          "San Pedro", "San Roque", "Santo Domingo"
        ],
        "Muñoz": [
          "Bagong Sikat", "Balante", "Bantug", "Bical", "Cabisuculan", "Calabalabaan", "Calisitan",
          "Catalanacan", "Curva", "Franza", "Gabaldon", "Labney", "Licaong", "Linglingay", "Magtanggol",
          "Maligaya", "Mangandingay", "Mapangpang", "Maragol", "Matingkis", "Naglabrahan", "Palusapis",
          "Pandalla", "Poblacion East", "Poblacion North", "Poblacion South", "Poblacion West", "Rang-ayan",
          "Rizal", "San Andres", "San Antonio", "San Felipe", "Sapang Cawayan", "Villa Cuizon",
          "Villa Isla", "Villa Nati", "Villa Santos"
        ],
        "Nampicuan": [
          "Alemania", "Ambasador Alzate Village", "Cabaducan East", "Cabaducan West", "Cabawangan",
          "East Central Poblacion", "Edy", "Estacion", "Maeling", "Mayantoc", "Medico", "Monic",
          "North Poblacion", "Northwest Poblacion", "Recuerdo", "South Central Poblacion",
          "Southeast Poblacion", "Southwest Poblacion", "Tony", "West Central Poblacion",
          "West Poblacion"
        ],
        "Palayan": [
          "Atate", "Aulo", "Bagong Buhay", "Bo. Militar", "Caballero", "Caimito", "Doña Josefa",
          "Ganaderia", "Imelda Valley", "Langka", "Malate", "Maligaya", "Manacnac", "Mapait",
          "Marcos Village", "Popolon Pagas", "Santolan", "Sapang Buho", "Singalat"
        ],
        "Pantabangan": [
          "Cadaclan", "Cambitala", "Conversion", "Fatima", "Ganduz", "Liberty", "Malbang", "Marikit",
          "Napon-Napon", "Poblacion East", "Poblacion West", "Sampaloc", "San Juan", "Villarica"
        ],
        "Peñaranda": [
          "Callos", "Las Piñas", "Poblacion I", "Poblacion II", "Poblacion III",
          "Poblacion IV",
          "San Josef",
          "San Mariano",
          "Santo Tomas",
          "Sinasajan"
        ],
        "Quezon": [
          "Barangay I",
          "Barangay II",
          "Bertese",
          "Doña Lucia",
          "Dulong Bayan",
          "Ilog Baliwag",
          "Pulong Bahay",
          "San Alejandro",
          "San Andres I",
          "San Andres II",
          "San Manuel",
          "San Miguel",
          "Santa Clara",
          "Santa Rita",
          "Santo Cristo",
          "Santo Tomas Feria"
        ],
        "Rizal": [
          "Agbannawag",
          "Aglipay",
          "Bicos",
          "Cabucbucan",
          "Calaocan District",
          "Canaan East",
          "Canaan West",
          "Casilagan",
          "Del Pilar",
          "Estrella",
          "General Luna",
          "Macapsing",
          "Maligaya",
          "Paco Roman",
          "Pag-asa",
          "Poblacion Central",
          "Poblacion East",
          "Poblacion Norte",
          "Poblacion Sur",
          "Poblacion West",
          "Portal",
          "San Esteban",
          "San Gregorio",
          "Santa Monica",
          "Villa Labrador",
          "Villa Paraiso"
        ],
        "San Antonio": [
          "Buliran",
          "Cama Juan",
          "Julo",
          "Lawang Kupang",
          "Luyos",
          "Maugat",
          "Panabingan",
          "Papaya",
          "Poblacion",
          "San Francisco",
          "San Jose",
          "San Mariano",
          "Santa Barbara",
          "Santa Cruz",
          "Santo Cristo",
          "Tikiw"
        ],
        "San Isidro": [
          "Alua",
          "Calaba",
          "Malapit",
          "Mangga",
          "Poblacion",
          "Pulo",
          "San Roque",
          "Santo Cristo",
          "Tabon"
        ],
        "San Jose": [
          "A. Pascual",
          "Abar 2nd",
          "Abar Ist",
          "Bagong Sikat",
          "Caanawan",
          "Calaocan",
          "Camanacsacan",
          "Canuto Ramos Poblacion",
          "Crisanto Sanchez Poblacion",
          "Culaylay",
          "Dizol",
          "Ferdinand E. Marcos Poblacion",
          "Kaliwanagan",
          "Kita-Kita",
          "Malasin",
          "Manicla",
          "Palestina",
          "Parang Mangga",
          "Pinili",
          "Porais",
          "Rafael Rueda, Sr. Poblacion",
          "Raymundo Eugenio Poblacion",
          "San Agustin",
          "San Juan",
          "San Mauricio",
          "Santo Niño 1st",
          "Santo Niño 2nd",
          "Santo Niño 3rd",
          "Santo Tomas",
          "Sibut",
          "Sinipit Bubon",
          "Tabulac",
          "Tayabo",
          "Tondod",
          "Tulat",
          "Villa Floresca",
          "Villa Joson",
          "Villa Marina"
        ],
        "San Leonardo": [
          "Bonifacio District",
          "Burgos District",
          "Castellano",
          "Diversion",
          "Magpapalayoc",
          "Mallorca",
          "Mambangnan",
          "Nieves",
          "Rizal District",
          "San Anton",
          "San Bartolome",
          "San Roque",
          "Tabuating",
          "Tagumpay",
          "Tambo Adorable"
        ],
        "Santa Rosa": [
          "Aguinaldo",
          "Berang",
          "Burgos",
          "Cojuangco",
          "Del Pilar",
          "Gomez",
          "Inspector",
          "Isla",
          "La Fuente",
          "Liwayway",
          "Lourdes",
          "Luna",
          "Mabini",
          "Malacañang",
          "Maliolio",
          "Mapalad",
          "Rajal Centro",
          "Rajal Norte",
          "Rajal Sur",
          "Rizal",
          "San Gregorio",
          "San Isidro",
          "San Josep",
          "San Mariano",
          "San Pedro",
          "Santa Teresita",
          "Santo Rosario",
          "Sapsap",
          "Soledad",
          "Tagpos",
          "Tramo",
          "Valenzuela",
          "Zamora"
        ],
        "Santo Domingo": [
          "Baloc",
          "Buasao",
          "Burgos",
          "Cabugao",
          "Casulucan",
          "Comitang",
          "Concepcion",
          "Dolores",
          "General Luna",
          "Hulo",
          "Mabini",
          "Malasin",
          "Malaya",
          "Malayantoc",
          "Mambarao",
          "Poblacion",
          "Pulong Buli",
          "Sagaba",
          "San Agustin",
          "San Fabian",
          "San Francisco",
          "San Pascual",
          "Santa Rita",
          "Santo Rosario"
        ],
        "Talavera": [
          "Andal Alino",
          "Bagong Sikat",
          "Bagong Silang",
          "Bakal I",
          "Bakal II",
          "Bakal III",
          "Baluga",
          "Bantug",
          "Bantug Hacienda",
          "Bantug Hamog",
          "Bugtong na Buli",
          "Bulac",
          "Burnay",
          "Caaniplahan",
          "Cabubulaonan",
          "Calipahan",
          "Campos",
          "Caputican",
          "Casulucan Este",
          "Collado",
          "Dimasalang Norte",
          "Dimasalang Sur",
          "Dinarayat",
          "Esguerra District",
          "Gulod",
          "Homestead I",
          "Homestead II",
          "Kinalanguyan",
          "La Torre",
          "Lomboy",
          "Mabuhay",
          "Maestrang Kikay",
          "Mamandil",
          "Marcos District",
          "Matingkis",
          "Minabuyoc",
          "Pag-asa",
          "Paludpod",
          "Pantoc Bulac",
          "Pinagpanaan",
          "Poblacion Sur",
          "Pula",
          "Pulong San Miguel",
          "Purok Matias",
          "Sampaloc",
          "San Miguel na Munti",
          "San Pascual",
          "San Ricardo",
          "Sibul",
          "Sicsican Matanda",
          "Tabacao",
          "Tagaytay",
          "Valle"
        ],
        "Talugtug": [
          "Alula",
          "Baybayabas",
          "Buted",
          "Cabiangan",
          "Calisitan",
          "Cinense",
          "Culiat",
          "Maasin",
          "Magsaysay",
          "Mayamot I",
          "Mayamot II",
          "Nangabulan",
          "Osmeña",
          "Pangit",
          "Patola",
          "Quezon",
          "Quirino",
          "Roxas",
          "Saguing",
          "Sampaloc",
          "Santa Catalina",
          "Santo Domingo",
          "Saringaya",
          "Saverona",
          "Tandoc",
          "Tibag",
          "Villa Boado",
          "Villa Rosario"
        ],
        "Zaragoza": [
          "Batitang",
          "Carmen",
          "Concepcion",
          "Del Pilar",
          "General Luna",
          "H. Romero",
          "Macarse",
          "Manaul",
          "Mayamot",
          "Pantoc",
          "San Isidro",
          "San Rafael",
          "San Vicente",
          "Santa Cruz",
          "Santa Lucia Old",
          "Santa Lucia Young",
          "Santo Rosario Old",
          "Santo Rosario Young",
          "Valeriana"
        ]
      }


    },
    "Nueva Vizcaya": {
      cities: {
        "Alfonso Castañeda": [
          "Abuyo", "Cauayan", "Galintuja", "Lipuga", "Lublub", "Pelaway"
        ],
        "Ambaguio": [
          "Ammueg", "Camandag", "Dulli", "Labang", "Napo", "Poblacion", "Salingsingan", "Tiblac"
        ],
        "Aritao": [
          "Anayo", "Baan", "Balite", "Banganan", "Beti", "Bone North", "Bone South", "Calitlitan",
          "Canabuan", "Canarem", "Comon", "Cutar", "Darapidap", "Kirang", "Latar-Nocnoc-San Francisco",
          "Nagcuartelan", "Ocao-Capiniaan", "Poblacion", "Santa Clara", "Tabueng", "Tucanon", "Yaway"
        ],
        "Bagabag": [
          "Bakir", "Baretbet", "Careb", "Lantap", "Murong", "Nangalisan", "Paniki", "Pogonsino",
          "Quirino", "San Geronimo", "San Pedro", "Santa Cruz", "Santa Lucia", "Tuao North", "Tuao South",
          "Villa Coloma", "Villaros"
        ],
        "Bambang": [
          "Abian", "Abinganan", "Aliaga", "Almaguer North", "Almaguer South", "Banggot", "Barat", "Buag",
          "Calaocan", "Dullao", "Homestead", "Indiana", "Mabuslo", "Macate", "Magsaysay Hills", "Manamtam",
          "Mauan", "Pallas", "Salinas", "San Antonio North", "San Antonio South", "San Fernando", "San Leonardo",
          "Santo Domingo", "Santo Domingo West"
        ],
        "Bayombong": [
          "Bansing", "Bonfal East", "Bonfal Proper", "Bonfal West", "Buenavista", "Busilac", "Cabuaan", "Casat",
          "District III Poblacion", "District IV", "Don Domingo Maddela Poblacion", "Don Mariano Marcos",
          "Don Tomas Maddela Poblacion", "Ipil-Cuneg", "La Torre North", "La Torre South", "Luyang", "Magapuy",
          "Magsaysay", "Masoc", "Paitan", "Salvacion", "San Nicolas North", "Santa Rosa", "Vista Alegre"
        ],
        "Diadi": [
          "Ampakling", "Arwas", "Balete", "Bugnay", "Butao", "Decabacan", "Duruarog", "Escoting", "Langca",
          "Lurad", "Nagsabaran", "Namamparan", "Pinya", "Poblacion", "Rosario", "San Luis", "San Pablo",
          "Villa Aurora", "Villa Florentino"
        ],
        "Dupax del Norte": [
          "Belance", "Binnuangan", "Bitnong", "Bulala", "Inaban", "Ineangan", "Lamo", "Mabasa", "Macabenga",
          "Malasin", "Munguia", "New Gumiad", "Oyao", "Parai", "Yabbi"
        ],
        "Dupax del Sur": [
          "Abaca", "Bagumbayan", "Balsain", "Banila", "Biruk", "Canabay", "Carolotan", "Domang", "Dopaj",
          "Gabut", "Ganao", "Kimbutan", "Kinabuan", "Lukidnon", "Mangayang", "Palabotan", "Sanguit",
          "Santa Maria", "Talbek", "Unib"
        ],
        "Kasibu": [
          "Alimit", "Alloy", "Antutot", "Bilet", "Binogawan", "Biyoy", "Bua", "Camamasi", "Capisaan",
          "Catarawan", "Cordon", "Didipio", "Dine", "Kakiduguen", "Kongkong", "Lupa", "Macalong", "Malabing",
          "Muta", "Nantawacan", "Pacquet", "Pao", "Papaya", "Poblacion", "Pudi", "Seguem", "Tadji", "Tokod",
          "Wangal", "Watwat"
        ],
        "Kayapa": [
          "Acacia", "Alang-Salacsac", "Amilong Labeng", "Ansipsip", "Baan", "Babadi", "Balangabang", "Balete",
          "Banao", "Besong", "Binalian", "Buyasyas", "Cabalatan-Alang", "Cabanglasan", "Cabayo", "Castillo Village",
          "Kayapa Proper East", "Kayapa Proper West", "Latbang", "Lawigan", "Mapayao", "Nansiakan", "Pampang",
          "Pangawan", "Pinayag", "Pingkian", "San Fabian", "Talecabcab", "Tidang Village", "Tubongan"
        ],
        "Quezon": [
          "Aurora", "Baresbes", "Bonifacio", "Buliwao", "Calaocan", "Caliat", "Dagupan", "Darubba", "Maasin",
          "Maddiangat", "Nalubbunan", "Runruno"
        ],
        "Santa Fe": [
          "Atbu", "Bacneng", "Balete", "Baliling", "Bantinan", "Baracbac", "Buyasyas", "Canabuan", "Imugan",
          "Malico", "Poblacion", "Santa Rosa", "Sinapaoan", "Tactac", "Unib", "Villa Flores"
        ],
        "Solano": [
          "Aggub", "Bagahabag", "Bangaan", "Bangar", "Bascaran", "Communal", "Concepcion", "Curifang", "Dadap",
          "Lactawan", "Osmeña", "Pilar D. Galima", "Poblacion North", "Poblacion South", "Quezon", "Quirino",
          "Roxas", "San Juan", "San Luis", "Tucal", "Uddiawan", "Wacal"
        ],
        "Villaverde": [
          "Bintawan Norte", "Bintawan Sur", "Cabuluan", "Ibung", "Nagbitin", "Ocapon", "Pieza", "Poblacion",
          "Sawmill"
        ]
      }
    }, "Occidental Mindoro": {
      cities: {
        "Abra de Ilog": [
          "Armado", "Balao", "Cabacao", "Lumangbayan", "Poblacion", "San Vicente", "Santa Maria", "Tibag",
          "Udalo", "Wawa"
        ],
        "Calintaan": [
          "Concepcion", "Iriron", "Malpalon", "New Dagupan", "Poblacion", "Poypoy", "Tanyag"
        ],
        "Looc": [
          "Agkawayan", "Ambil", "Balikyas", "Bonbon", "Bulacan", "Burol", "Guitna", "Kanluran", "Talaotao"
        ],
        "Lubang": [
          "Araw at Bituin", "Bagong Sikat", "Banaag at Pag-asa", "Binakas", "Cabra", "Likas ng Silangan", "Maginhawa",
          "Maligaya", "Maliig", "Ninikat ng Pag-asa", "Paraiso", "Surville", "Tagbac", "Tangal", "Tilik", "Vigo"
        ],
        "Magsaysay": [
          "Alibog", "Caguray", "Calawag", "Gapasan", "Laste", "Lourdes", "Nicolas", "Paclolo", "Poblacion", "Purnaga",
          "Santa Teresa", "Sibalat"
        ],
        "Mamburao": [
          "Balansay", "Fatima", "Payompon", "Poblacion 1", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5",
          "Poblacion 6", "Poblacion 7", "Poblacion 8", "San Luis", "Talabaan", "Tangkalan", "Tayamaan"
        ],
        "Paluan": [
          "Alipaoy", "Bagong Silang Poblacion", "Handang Tumulong Poblacion", "Harrison", "Lumangbayan", "Mananao",
          "Mapalad Poblacion", "Marikit", "Pag-asa ng Bayan Poblacion", "San Jose Poblacion", "Silahis ng Pag-asa Poblacion",
          "Tubili"
        ],
        "Rizal": [
          "Adela", "Aguas", "Magsikap", "Malawaan", "Manoot", "Pitogo", "Rizal", "Rumbang", "Salvacion", "San Pedro",
          "Santo Niño"
        ],
        "Sablayan": [
          "Batong Buhay", "Buenavista", "Burgos", "Claudio Salgado", "General Emilio Aguinaldo", "Ibud", "Ilvita", "Lagnas",
          "Ligaya", "Malisbong", "Paetan", "Pag-asa", "Poblacion", "San Agustin", "San Francisco", "San Nicolas",
          "San Vicente", "Santa Lucia", "Santo Niño", "Tagumpay", "Tuban", "Victoria"
        ],
        "San Jose": [
          "Ambulong", "Ansiray", "Bagong Sikat", "Bangkal", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4",
          "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Batasan", "Bayotbot", "Bubog", "Buri", "Camburay",
          "Caminawit", "Catayungan", "Central", "Iling Proper", "Inasakan", "Ipil", "La Curva", "Labangan Iling",
          "Labangan Poblacion", "Mabini", "Magbay", "Mangarin", "Mapaya", "Monte Claro", "Murtha", "Naibuan", "Natandol",
          "Pag-asa", "Pawican", "San Agustin", "San Isidro", "San Roque"
        ],
        "Santa Cruz": [
          "Alacaak", "Barahan", "Casague", "Dayap", "Kurtinganan", "Lumangbayan", "Mulawin", "Pinagturilan", "Poblacion I",
          "Poblacion II", "San Vicente"
        ]
      }

    },
    "Oriental Mindoro": {
      cities: {
        "Baco": [
          "Alag", "Bangkatan", "Baras", "Bayanan", "Burbuli", "Catwiran I", "Catwiran II", "Dulangan I", "Dulangan II",
          "Lantuyang", "Lumang Bayan", "Malapad", "Mangangan I", "Mangangan II", "Mayabig", "Pambisan", "Poblacion",
          "Pulang-Tubig", "Putican-Cabulo", "San Andres", "San Ignacio", "Santa Cruz", "Santa Rosa I", "Santa Rosa II",
          "Tabon-tabon", "Tagumpay", "Water"
        ],
        "Bansud": [
          "Alcadesma", "Bato", "Conrazon", "Malo", "Manihala", "Pag-asa", "Poblacion", "Proper Bansud", "Proper Tiguisan",
          "Rosacara", "Salcedo", "Sumagui", "Villa Pag-asa"
        ],
        "Bongabong": [
          "Anilao", "Aplaya", "Bagumbayan I", "Bagumbayan II", "Batangan", "Bukal", "Camantigue", "Carmundo", "Cawayan",
          "Dayhagan", "Formon", "Hagan", "Hagupit", "Ipil", "Kaligtasan", "Labasan", "Labonan", "Libertad", "Lisap",
          "Luna", "Malitbog", "Mapang", "Masaguisi", "Mina de Oro", "Morente", "Ogbot", "Orconuma", "Poblacion", "Polusahi",
          "Sagana", "San Isidro", "San Jose", "San Juan", "Santa Cruz", "Sigange", "Tawas"
        ],
        "Bulalacao": [
          "Bagong Sikat", "Balatasan", "Benli", "Cabugao", "Cambunang", "Campaasan", "Maasin", "Maujao", "Milagrosa",
          "Nasukob", "Poblacion", "San Francisco", "San Isidro", "San Juan", "San Roque"
        ],
        "Calapan": [
          "Balingayan", "Balite", "Baruyan", "Batino", "Bayanan I", "Bayanan II", "Biga", "Bondoc", "Bucayao", "Buhuan",
          "Bulusan", "Calero", "Camansihan", "Camilmil", "Canubing I", "Canubing II", "Comunal", "Guinobatan", "Gulod",
          "Gutad", "Ibaba East", "Ibaba West", "Ilaya", "Lalud", "Lazareto", "Libis", "Lumang Bayan", "Mahal na Pangalan",
          "Maidlang", "Malad", "Malamig", "Managpi", "Masipit", "Nag-iba I", "Nag-iba II", "Navotas", "Pachoca", "Palhi",
          "Panggalaan", "Parang", "Patas", "Personas", "Putingtubig", "Salong", "San Antonio", "San Vicente Central",
          "San Vicente East", "San Vicente North", "San Vicente South", "San Vicente West", "Santa Cruz", "Santa Isabel", "Santa Maria Village", "Santa Rita", "Santo Niño", "Sapul", "Silonay", "Suqui", "Tawagan",
          "Tawiran", "Tibag", "Wawa"
        ],
        "Gloria": [
          "Agos", "Agsalin", "Alma Villa", "Andres Bonifacio", "Balete", "Banus", "Banutan", "Bulaklakan", "Buong Lupa",
          "Gaudencio Antonino", "Guimbonan", "Kawit", "Lucio Laurel", "Macario Adriatico", "Malamig", "Malayong", "Maligaya",
          "Malubay", "Manguyang", "Maragooc", "Mirayan", "Narra", "Papandungin", "San Antonio", "Santa Maria", "Santa Theresa",
          "Tambong"
        ],
        "Mansalay": [
          "B. del Mundo", "Balugo", "Bonbon", "Budburan", "Cabalwa", "Don Pedro", "Maliwanag", "Manaul", "Panaytayan",
          "Poblacion", "Roma", "Santa Brigida", "Santa Maria", "Santa Teresita", "Villa Celestial", "Wasig", "Waygan"
        ],
        "Naujan": [
          "Adrialuna", "Andres Ilagan", "Antipolo", "Apitong", "Arangin", "Aurora", "Bacungan", "Bagong Buhay", "Balite",
          "Bancuro", "Banuton", "Barcenaga", "Bayani", "Buhangin", "Caburo", "Concepcion", "Dao", "Del Pilar", "Estrella",
          "Evangelista", "Gamao", "General Esco", "Herrera", "Inarawan", "Kalinisan", "Laguna", "Mabini", "Magtibay",
          "Mahabang Parang", "Malaya", "Malinao", "Malvar", "Masagana", "Masaguing", "Melgar A", "Melgar B", "Metolza",
          "Montelago", "Montemayor", "Motoderazo", "Mulawin", "Nag-iba I", "Nag-iba II", "Pagkakaisa", "Paitan", "Paniquian",
          "Pinagsabangan I", "Pinagsabangan II", "Piñahan", "Poblacion I", "Poblacion II", "Poblacion III", "Sampaguita",
          "San Agustin I", "San Agustin II", "San Andres", "San Antonio", "San Carlos", "San Isidro", "San Jose", "San Luis",
          "San Nicolas", "San Pedro", "Santa Cruz", "Santa Isabel", "Santa Maria", "Santiago", "Santo Niño", "Tagumpay",
          "Tigkan"
        ],
        "Pinamalayan": [
          "Anoling", "Bacungan", "Bangbang", "Banilad", "Buli", "Cacawan", "Calingag", "Del Razon", "Guinhawa", "Inclanay",
          "Lumangbayan", "Malaya", "Maliangcog", "Maningcol", "Marayos", "Marfrancisco", "Nabuslot", "Pagalagala", "Palayan", "Pambisan Malaki", "Pambisan Munti", "Panggulayan", "Papandayan", "Pili", "Quinabigan",
          "Ranzo", "Rosario", "Sabang", "Santa Isabel", "Santa Maria", "Santa Rita", "Santo Niño", "Wawa", "Zone I", "Zone II",
          "Zone III", "Zone IV"
        ],
        "Pola": [
          "Bacawan", "Bacungan", "Batuhan", "Bayanan", "Biga", "Buhay na Tubig", "Calima", "Calubasanhon", "Campamento",
          "Casiligan", "Malibago", "Maluanluan", "Matulatula", "Misong", "Pahilahan", "Panikihan", "Pula", "Puting Cacao",
          "Tagbakin", "Tagumpay", "Tiguihan", "Zone I", "Zone II"
        ],
        "Puerto Galera": [
          "Aninuan", "Baclayan", "Balatero", "Dulangan", "Palangan", "Poblacion", "Sabang", "San Antonio", "San Isidro",
          "Santo Niño", "Sinandigan", "Tabinay", "Villaflor"
        ],
        "Roxas": [
          "Bagumbayan", "Cantil", "Dangay", "Happy Valley", "Libertad", "Libtong", "Little Tanauan", "Mabuhay", "Maraska",
          "Odiong", "Paclasan", "San Aquilino", "San Isidro", "San Jose", "San Mariano", "San Miguel", "San Rafael", "San Vicente",
          "Uyao", "Victoria"
        ],
        "San Teodoro": [
          "Bigaan", "Caagutayan", "Calangatan", "Calsapa", "Ilag", "Lumangbayan", "Poblacion", "Tacligan"
        ],
        "Socorro": [
          "Bagsok", "Batong Dalig", "Bayuin", "Bugtong na Tuog", "Calocmoy", "Calubayan", "Catiningan", "Fortuna", "Happy Valley",
          "Leuteboro I", "Leuteboro II", "Ma. Concepcion", "Mabuhay I", "Mabuhay II", "Malugay", "Matungao", "Monteverde", "Pasi I",
          "Pasi II", "Santo Domingo", "Subaan", "Villareal", "Zone I", "Zone II", "Zone III", "Zone IV"
        ],
        "Victoria": [
          "Alcate", "Antonino", "Babangonan", "Bagong Buhay", "Bagong Silang", "Bambanin", "Bethel", "Canaan", "Concepcion",
          "Duongan", "Jose Leido Jr.", "Loyal", "Mabini", "Macatoc", "Malabo", "Merit", "Ordovilla", "Pakyas", "Poblacion I",
          "Poblacion II", "Poblacion III", "Poblacion IV", "Sampaguita", "San Antonio", "San Cristobal", "San Gabriel", "San Gelacio",
          "San Isidro", "San Juan", "San Narciso", "Urdaneta", "Villa Cerveza"
        ]
      }

    },
    "Palawan": {
      cities: {
        "Aborlan": [
          "Apo-Aporawan", "Apoc-apoc", "Aporawan", "Barake", "Cabigaan", "Culandanum", "Gogognan", "Iraan", "Isaub", "Jose Rizal",
          "Mabini", "Magbabadil", "Plaridel", "Poblacion", "Ramon Magsaysay", "Sagpangan", "San Juan", "Tagpait", "Tigman"
        ],
        "Agutaya": [
          "Abagat", "Algeciras", "Bangcal", "Cambian", "Concepcion", "Diit", "Maracanao", "Matarawis", "Villafria", "Villasol"
        ],
        "Araceli": [
          "Balogo", "Dagman", "Dalayawon", "Lumacad", "Madoldolon", "Mauringuen", "Osmeña", "Poblacion", "San Jose de Oro",
          "Santo Niño", "Taloto", "Tinintinan", "Tudela"
        ],
        "Balabac": [
          "Agutayan", "Bancalaan", "Bugsuk", "Catagupan", "Indalawan", "Malaking Ilog", "Mangsee", "Melville", "Pandanan", "Pasig",
          "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion V", "Poblacion VI", "Rabor", "Ramos", "Salang",
          "Sebaring", "Bono-bono"
        ],
        "Bataraza": [
          "Bulalacao", "Buliluyan", "Culandanum", "Igang-igang", "Inogbong", "Iwahig", "Malihud", "Malitub", "Marangas", "Ocayan",
          "Puring", "Rio Tuba", "Sandoval", "Sapa", "Sarong", "Sumbiling", "Tabud", "Tagnato", "Tagolango", "Taratak", "Tarusan"
        ],
        "Brooke's Point": [
          "Amas", "Aribungos", "Barong-barong", "Calasaguen", "Imulnod", "Ipilan", "Maasin", "Mainit", "Malis", "Mambalot",
          "Oring-oring", "Pangobilian", "Poblacion I", "Poblacion II", "Salogon", "Samareñana", "Saraza", "Tubtub"
        ],
        "Busuanga": [
          "Bogtong", "Buluang", "Cheey", "Concepcion", "Maglalambay", "New Busuanga", "Old Busuanga", "Panlaitan", "Quezon", "Sagrada",
          "Salvacion", "San Isidro", "San Rafael", "Santo Niño"
        ],
        "Cagayancillo": [
          "Bantayan", "Calsada", "Convento", "Lipot North", "Lipot South", "Magsaysay", "Mampio", "Nusa", "Santa Cruz", "Tacas", "Talaga", "Wahig"
        ],
        "Coron": [
          "Banuang Daan", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Bintuan", "Borac",
          "Buenavista", "Bulalacao", "Cabugao", "Decabobo", "Decalachao", "Guadalupe", "Lajala", "Malawig", "Marcilla", "San Jose",
          "San Nicolas", "Tagumpay", "Tara", "Turda"
        ],
        "Culion": [
          "Balala", "Baldat", "Binudac", "Burabod", "Culango", "De Carabao", "Galoc", "Halsey", "Jardin", "Libis", "Luac", "Malaking Patag",
          "Osmeña", "Tiza"
        ],
        "Cuyo": [
          "Balading", "Bangcal", "Cabigsing", "Caburian", "Caponayan", "Catadman", "Funda", "Lagaoriao", "Lubid", "Lungsod", "Manamoc",
          "Maringian", "Pawa", "San Carlos", "Suba", "Tenga-tenga", "Tocadan"
        ],
        "Dumaran": [
          "Bacao", "Bohol", "Calasag", "Capayas", "Catep", "Culasian", "Danleg", "Dumaran", "Ilian", "Itangil", "Magsaysay", "San Juan",
          "Santa Maria", "Santa Teresita", "Santo Tomas", "Tanatanaon"
        ],
        "El Nido": [
          "Aberawan", "Bagong Bayan", "Barotuan", "Bebeladan", "Bucana", "Buena Suerte Poblacion", "Corong-corong Poblacion", "Mabini",
          "Maligaya Poblacion", "Manlag", "Masagana Poblacion", "New Ibajay", "Pasadeña", "San Fernando", "Sibaltan", "Teneguiban",
          "Villa Libertad", "Villa Paz"
        ],
        "Kalayaan": [
          "Pag-asa"
        ],
        "Linapacan": [
          "Barangonan", "Cabunlawan", "Calibangbangan", "Decabaitot", "Maroyogroyog", "Nangalao", "New Culaylayan", "Pical", "San Miguel",
          "San Nicolas"
        ],
        "Magsaysay": [
          "Alcoba", "Balaguen", "Canipo", "Cocoro", "Danawan", "Emilod", "Igabas", "Lacaren", "Los Angeles", "Lucbuan", "Rizal"
        ],
        "Narra": [
          "Antipuluan", "Aramaywan", "Bagong Sikat", "Batang-batang", "Bato-bato", "Burirao", "Caguisan", "Calategas", "Dumagueña", "Elvita", "Estrella Village", "Ipilan", "Malatgao", "Malinao", "Narra", "Panacan", "Panacan 2", "Princess Urduja",
          "Sandoval", "Tacras", "Taritien", "Teresa", "Tinagong Dagat"
        ],
        "Quezon": [
          "Alfonso XIII", "Aramaywan", "Berong", "Calatagbak", "Calumpang", "Isugod", "Maasin", "Malatgao", "Panitian", "Pinaglabanan",
          "Quinlogan", "Sowangan", "Tabon", "Tagusao"
        ],
        "Rizal": [
          "Bunog", "Campong Ulay", "Candawaga", "Canipaan", "Culasian", "Iraan", "Latud", "Panalingaan", "Punta Baja", "Ransang", "Taburi"
        ],
        "Roxas": [
          "Abaroan", "Antonino", "Bagong Bayan", "Barangay 1", "Barangay II", "Barangay III", "Barangay IV", "Barangay V Poblacion",
          "Barangay VI Poblacion", "Caramay", "Dumarao", "Iraan", "Jolo", "Magara", "Malcampo", "Mendoza", "Narra", "New Barbacan",
          "New Cuyo", "Nicanor Zabala", "Rizal", "Salvacion", "San Isidro", "San Jose", "San Miguel", "San Nicolas", "Sandoval", "Tagumpay",
          "Taradungan", "Tinitian", "Tumarbong"
        ],
        "San Vicente": [
          "Alimanguan", "Binga", "Caruray", "Kemdeng", "New Agutaya", "New Canipo", "Poblacion", "Port Barton", "San Isidro", "Santo Niño"
        ],
        "Sofronio Española": [
          "Abo-abo", "Iraray", "Isumbo", "Labog", "Panitian", "Pulot Center", "Pulot Interior", "Pulot Shore", "Punang"
        ],
        "Taytay": [
          "Abongan", "Alacalian", "Banbanan", "Bantulan", "Baras", "Batas", "Bato", "Beton", "Busy Bees", "Calawag", "Casian", "Cataban",
          "Debangan", "Depla", "Libertad", "Liminangcong", "Meytegued", "Minapla", "New Guinlo", "Old Guinlo", "Paglaum", "Paly",
          "Pamantolon", "Pancol", "Poblacion", "Pularaquen", "San Jose", "Sandoval", "Silanga", "Talog", "Tumbod"
        ]
      }

    }, "Pampanga": {
      cities: {
        "Apalit": [
          "Balucuc", "Calantipe", "Cansinala", "Capalangan", "Colgante", "Paligui", "Sampaloc", "San Juan", "San Vicente", "Sucad",
          "Sulipan", "Tabuyuc"
        ],
        "Arayat": [
          "Arenas", "Baliti", "Batasan", "Buensuceso", "Candating", "Cupang", "Gatiawin", "Guemasan", "Kaledian", "La Paz", "Lacmit",
          "Lacquios", "Mangga-Cacutud", "Mapalad", "Matamo", "Panlinlang", "Paralaya", "Plazang Luma", "Poblacion", "San Agustin Norte",
          "San Agustin Sur", "San Antonio", "San Jose Mesulo", "San Juan Bano", "San Mateo", "San Nicolas", "San Roque Bitas", "Santo Niño Tabuan",
          "Suclayin", "Telapayong"
        ],
        "Bacolor": [
          "Balas", "Cabalantian", "Cabambangan", "Cabetican", "Calibutbut", "Concepcion", "Dolores", "Duat", "Macabacle", "Magliman", "Maliwalu",
          "Mesalipit", "Parulog", "Potrero", "San Antonio", "San Isidro", "San Vicente", "Santa Barbara", "Santa Ines", "Talba", "Tinajero"
        ],
        "Candaba": [
          "Bahay Pare", "Bambang", "Barangca", "Barit", "Buas", "Cuayang Bugtong", "Dalayap", "Dulong Ilog", "Gulap", "Lanang", "Lourdes",
          "Magumbali", "Mandasig", "Mandili", "Mangga", "Mapaniqui", "Paligui", "Pangclara", "Pansinao", "Paralaya", "Pasig", "Pescadores",
          "Pulong Gubat", "Pulong Palazan", "Salapungan", "San Agustin", "Santo Rosario", "Tagulod", "Talang", "Tenejero", "Vizal San Pablo",
          "Vizal Santo Cristo", "Vizal Santo Niño"
        ],
        "Floridablanca": [
          "Anon", "Apalit", "Basa Air Base", "Benedicto", "Bodega", "Cabangcalan", "Calantas", "Carmencita", "Consuelo", "Dampe", "Del Carmen",
          "Fortuna", "Gutad", "Mabical", "Maligaya", "Mawacat", "Nabuclod", "Pabanlag", "Paguiruan", "Palmayo", "Pandaguirig", "Poblacion",
          "San Antonio", "San Isidro", "San Jose", "San Nicolas", "San Pedro", "San Ramon", "San Roque", "Santa Monica", "Santo Rosario", "Solib",
          "Valdez"
        ],
        "Guagua": [
          "Ascomo", "Bancal", "Jose Abad Santos", "Lambac", "Magsaysay", "Maquiapo", "Natividad", "Plaza Burgos", "Pulungmasle", "Rizal",
          "San Agustin", "San Antonio", "San Isidro", "San Jose", "San Juan", "San Juan Bautista", "San Juan Nepomuceno", "San Matias", "San Miguel",
          "San Nicolas 1st", "San Nicolas 2nd", "San Pablo", "San Pedro", "San Rafael", "San Roque", "San Vicente", "Santa Filomena", "Santa Ines",
          "Santa Ursula", "Santo Cristo", "Santo Niño"
        ],
        "Lubao": [
          "Balantacan", "Bancal Pugad", "Bancal Sinubli", "Baruya", "Calangain", "Concepcion", "De La Paz", "Del Carmen", "Don Ignacio Dimson", "Lourdes", "Prado Siongco", "Remedios", "San Agustin", "San Antonio", "San Francisco", "San Isidro", "San Jose Apunan", "San Jose Gumi",
          "San Juan", "San Matias", "San Miguel", "San Nicolas 1st", "San Nicolas 2nd", "San Pablo 1st", "San Pablo 2nd", "San Pedro Palcarangan",
          "San Pedro Saug", "San Roque Arbol", "San Roque Dau", "San Vicente", "Santa Barbara", "Santa Catalina", "Santa Cruz", "Santa Lucia",
          "Santa Maria", "Santa Monica", "Santa Rita", "Santa Teresa 1st", "Santa Teresa 2nd", "Santiago", "Santo Cristo", "Santo Domingo",
          "Santo Niño", "Santo Tomas"
        ],
        "Lubao": [
          "Lourdes", "Prado Siongco", "Remedios", "San Agustin", "San Antonio", "San Francisco", "San Isidro", "San Jose Apunan", "San Jose Gumi",
          "San Juan", "San Matias", "San Miguel", "San Nicolas 1st", "San Nicolas 2nd", "San Pablo 1st", "San Pablo 2nd", "San Pedro Palcarangan",
          "San Pedro Saug", "San Roque Arbol", "San Roque Dau", "San Vicente", "Santa Barbara", "Santa Catalina", "Santa Cruz", "Santa Lucia",
          "Santa Maria", "Santa Monica", "Santa Rita", "Santa Teresa 1st", "Santa Teresa 2nd", "Santiago", "Santo Cristo", "Santo Domingo",
          "Santo Niño", "Santo Tomas"
        ],
        "Mabalacat": [
          "Atlu-Bola", "Bical", "Bundagul", "Cacutud", "Calumpang", "Camachiles", "Dapdap", "Dau", "Dolores", "Duquit", "Lakandula", "Mabiga",
          "Macapagal Village", "Mamatitang", "Mangalit", "Marcos Village", "Mawaque", "Paralayunan", "Poblacion", "San Francisco", "San Joaquin",
          "Santa Ines", "Santa Maria", "Santo Rosario", "Sapang Balen", "Sapang Biabas", "Tabun"
        ],
        "Macabebe": [
          "Batasan", "Caduang Tete", "Candelaria", "Castuli", "Consuelo", "Dalayap", "Mataguiti", "San Esteban", "San Francisco", "San Gabriel",
          "San Isidro", "San Jose", "San Juan", "San Rafael", "San Roque", "San Vicente", "Santa Cruz", "Santa Lutgarda", "Santa Maria",
          "Santa Rita", "Santo Niño", "Santo Rosario", "Saplad David", "Tacasan", "Telacsan"
        ],
        "Magalang": [
          "Ayala", "Bucanan", "Camias", "Dolores", "Escaler", "La Paz", "Navaling", "San Agustin", "San Antonio", "San Franciso", "San Ildefonso",
          "San Isidro", "San Jose", "San Miguel", "San Nicolas 1st", "San Nicolas 2nd", "San Pablo", "San Pedro I", "San Pedro II", "San Roque",
          "San Vicente", "Santa Cruz", "Santa Lucia", "Santa Maria", "Santo Niño", "Santo Rosario", "Turu"
        ],
        "Masantol": [
          "Alauli", "Bagang", "Balibago", "Bebe Anac", "Bebe Matua", "Bulacus", "Cambasi", "Malauli", "Nigui", "Palimpe", "Puti", "Sagrada",
          "San Agustin", "San Isidro Anac", "San Isidro Matua", "San Nicolas", "San Pedro", "Santa Cruz", "Santa Lucia Anac", "Santa Lucia Matua",
          "Santa Lucia Paguiba", "Santa Lucia Wakas", "Santa Monica", "Santo Niño", "Sapang Kawayan", "Sua"
        ],
        "Mexico": [
          "Acli", "Anao", "Balas", "Buenavista", "Camuning", "Cawayan", "Concepcion", "Culubasa", "Divisoria", "Dolores", "Eden", "Gandus",
          "Lagundi", "Laput", "Laug", "Masamat", "Masangsang", "Nueva Victoria", "Pandacaqui", "Pangatlan", "Panipuan", "Parian", "Sabanilla",
          "San Antonio", "San Carlos", "San Jose Malino", "San Jose Matulid", "San Juan", "San Lorenzo", "San Miguel", "San Nicolas", "San Pablo", "San Patricio", "San Rafael", "San Roque", "San Vicente", "Santa Cruz", "Santa Maria",
          "Santo Domingo", "Santo Rosario", "Sapang Maisac", "Suclaban", "Tangle"
        ],
        "Minalin": [
          "Bulac", "Dawe", "Lourdes", "Maniango", "San Francisco 1st", "San Francisco 2nd", "San Isidro", "San Nicolas", "San Pedro",
          "Santa Catalina", "Santa Maria", "Santa Rita", "Santo Domingo", "Santo Rosario", "Saplad"
        ],
        "Porac": [
          "Babo Pangulo", "Babo Sacan", "Balubad", "Calzadang Bayu", "Camias", "Cangatba", "Diaz", "Dolores", "Inararo", "Jalung", "Mancatian",
          "Manibaug Libutad", "Manibaug Paralaya", "Manibaug Pasig", "Manuali", "Mitla Proper", "Palat", "Pias", "Pio", "Planas", "Poblacion",
          "Pulong Santol", "Salu", "San Jose Mitla", "Santa Cruz", "Sapang Uwak", "Sepung Bulaun", "Sinura", "Villa Maria"
        ],
        "San Fernando": [
          "Alasas", "Baliti", "Bulaon", "Calulut", "Del Carmen", "Del Pilar", "Del Rosario", "Dela Paz Norte", "Dela Paz Sur", "Dolores",
          "Juliana", "Lara", "Lourdes", "Magliman", "Maimpis", "Malino", "Malpitic", "Pandaras", "Panipuan", "Pulung Bulu", "Quebiauan", "Saguin",
          "San Agustin", "San Felipe", "San Isidro", "San Jose", "San Juan", "San Nicolas", "San Pedro", "Santa Lucia", "Santa Teresita", "Santo Niño",
          "Santo Rosario", "Sindalan", "Telabastagan"
        ],
        "San Luis": [
          "San Agustin", "San Carlos", "San Isidro", "San Jose", "San Juan", "San Nicolas", "San Roque", "San Sebastian", "Santa Catalina",
          "Santa Cruz Pambilog", "Santa Cruz Poblacion", "Santa Lucia", "Santa Monica", "Santa Rita", "Santo Niño", "Santo Rosario", "Santo Tomas"
        ],
        "San Simon": [
          "Concepcion", "De La Paz", "San Agustin", "San Isidro", "San Jose", "San Juan", "San Miguel", "San Nicolas", "San Pablo Libutad",
          "San Pablo Proper", "San Pedro", "Santa Cruz", "Santa Monica", "Santo Niño"
        ],
        "Santa Ana": [
          "San Agustin", "San Bartolome", "San Isidro", "San Joaquin", "San Jose", "San Juan", "San Nicolas", "San Pablo", "San Pedro",
          "San Roque", "Santa Lucia", "Santa Maria", "Santiago", "Santo Rosario"
        ],
        "Santa Rita": [
          "Becuran", "Dila-dila", "San Agustin", "San Basilio", "San Isidro", "San Jose", "San Juan", "San Matias", "San Vicente",
          "Santa Monica"
        ],
        "Santo Tomas": [
          "Moras de La Paz", "Poblacion", "San Bartolome", "San Matias", "San Vicente", "Santo Rosario", "Sapa"
        ],
        "Sasmuan": [
          "Batang 1st", "Batang 2nd", "Mabuanbuan", "Malusac", "Sabitanan", "San Antonio", "San Nicolas 1st", "San Nicolas 2nd", "San Pedro",
          "Santa Lucia", "Santa Monica", "Santo Tomas"
        ]
      }

    },
    "Pangasinan": {
      cities: {
        "Agno": [
          "Allabon", "Aloleng", "Bangan-Oda", "Baruan", "Boboy", "Cayungnan", "Dangley", "Gayusan",
          "Macaboboni", "Magsaysay", "Namatucan", "Patar", "Poblacion East", "Poblacion West", "San Juan",
          "Tupa", "Viga"
        ],
        "Aguilar": [
          "Bayaoas", "Baybay", "Bocacliw", "Bocboc East", "Bocboc West", "Buer", "Calsib", "Laoag", "Manlocboc",
          "Ninoy", "Panacol", "Poblacion", "Pogomboa", "Pogonsili", "San Jose", "Tampac"
        ],
        "Alaminos": [
          "Alos", "Amandiego", "Amangbangan", "Balangobong", "Balayang", "Baleyadaan", "Bisocol", "Bolaney", "Bued",
          "Cabatuan", "Cayucay", "Dulacac", "Inerangan", "Landoc", "Linmansangan", "Lucap", "Maawi", "Macatiw",
          "Magsaysay", "Mona", "Palamis", "Pandan", "Pangapisan", "Poblacion", "Pocalpocal", "Pogo", "Polo",
          "Quibuar", "Sabangan", "San Antonio", "San Jose", "San Roque", "San Vicente", "Santa Maria", "Tanaytay",
          "Tangcarang", "Tawintawin", "Telbang", "Victoria"
        ],
        "Alcala": [
          "Anulid", "Atainan", "Bersamin", "Canarvacanan", "Caranglaan", "Curareng", "Gualsic", "Kasikis", "Laoac",
          "Macayo", "Pindangan Centro", "Pindangan East", "Pindangan West", "Poblacion East", "Poblacion West",
          "San Juan", "San Nicolas", "San Pedro Apartado", "San Pedro III", "San Vicente", "Vacante"
        ],
        "Anda": [
          "Awag", "Awile", "Batiarao", "Cabungan", "Carot", "Dolaoan", "Imbo", "Macaleeng", "Macandocandong",
          "Mal-ong", "Namagbagan", "Poblacion", "Roxas", "Sablig", "San Jose", "Siapar", "Tondol", "Toritori"
        ],
        "Asingan": [
          "Ariston Este", "Ariston Weste", "Bantog", "Baro", "Bobonan", "Cabalitian", "Calepaan", "Carosucan Norte",
          "Carosucan Sur", "Coldit", "Domanpot", "Dupac", "Macalong", "Palaris", "Poblacion East", "Poblacion West",
          "San Vicente Este", "San Vicente Weste", "Sanchez", "Sobol", "Toboy"
        ],
        "Balungao": [
          "Angayan Norte", "Angayan Sur", "Capulaan", "Esmeralda", "Kita-kita", "Mabini", "Mauban", "Poblacion",
          "Pugaro", "Rajal", "San Andres", "San Aurelio 1st", "San Aurelio 2nd", "San Aurelio 3rd", "San Joaquin",
          "San Julian", "San Leon", "San Marcelino", "San Miguel", "San Raymundo"
        ],
        "Bani": [
          "Ambabaay", "Aporao", "Arwas", "Ballag", "Banog Norte", "Banog Sur", "Calabeng", "Centro Toma", "Colayo",
          "Dacap Norte", "Dacap Sur", "Garrita", "Luac", "Macabit", "Masidem", "Poblacion", "Quinaoayanan", "Ranao",
          "Ranom Iloco", "San Jose", "San Miguel", "San Simon", "San Vicente", "Tiep", "Tipor", "Tugui Grande",
          "Tugui Norte"
        ],
        "Basista": [
          "Anambongan", "Bayoyong", "Cabeldatan", "Dumpay", "Malimpec East", "Mapolopolo", "Nalneran", "Navatat",
          "Obong", "Osmeña Sr.", "Palma", "Patacbo", "Poblacion", "Artacho", "Bautista", "Baluyot", "Cabuaan",
          "Cacandongan", "Diaz", "Ketegan", "Nandacan", "Nibaliw Norte", "Nibaliw Sur", "Palisoc", "Poblacion East",
          "Poblacion West", "Pogo", "Poponto", "Primicias", "Sinabaan", "Vacante", "Villanueva"
        ],
        "Bayambang": [
          "Alinggan", "Amamperez", "Amancosiling Norte", "Amancosiling Sur", "Ambayat I", "Ambayat II", "Apalen",
          "Asin", "Ataynan", "Bacnono", "Balaybuaya", "Banaban", "Bani", "Batangcawa", "Beleng", "Bical Norte",
          "Bical Sur", "Bongato East", "Bongato West", "Buayaen", "Buenlag 1st", "Buenlag 2nd", "Cadre Site", "Carungay",
          "Caturay", "Darawey", "Duera", "Dusoc", "Hermoza", "Idong", "Inanlorenzana", "Inirangan", "Iton", "Langiran",
          "Ligue", "M. H. del Pilar", "Macayocayo", "Magsaysay", "Maigpa", "Malimpec", "Malioer", "Managos", "Manambong Norte",
          "Manambong Parte", "Manambong Sur", "Mangayao", "Nalsian Norte", "Nalsian Sur", "Pangdel", "Pantol", "Paragos",
          "Poblacion Sur", "Pugo", "Reynado", "San Gabriel 1st", "San Gabriel 2nd", "San Vicente", "Sangcagulis",
          "Sanlibo", "Sapang", "Tamaro", "Tambac", "Tampog", "Tanolong", "Tatarao", "Telbang", "Tococ East", "Tococ West",
          "Warding", "Wawa", "Zone I", "Zone II", "Zone III", "Zone IV", "Zone V", "Zone VI", "Zone VII"
        ],
        "Binalonan": [
          "Balangobong", "Bued", "Bugayong", "Camangaan", "Canarvacanan", "Capas", "Cili", "Dumayat", "Linmansangan",
          "Mangcasuy", "Moreno", "Pasileng Norte", "Pasileng Sur", "Poblacion", "San Felipe Central", "San Felipe Sur",
          "San Pablo", "Santa Catalina", "Santa Maria Norte", "Santiago", "Santo Niño", "Sumabnit", "Tabuyoc", "Vacante"
        ],
        "Binmaley": [
          "Amancoro", "Balagan", "Balogo", "Basing", "Baybay Lopez", "Baybay Polong", "Biec", "Buenlag", "Calit",
          "Caloocan Dupo", "Caloocan Norte", "Caloocan Sur", "Camaley", "Canaoalan", "Dulag", "Gayaman", "Linoc",
          "Lomboy", "Malindong", "Manat", "Nagpalangan", "Naguilayan", "Pallas", "Papagueyan", "Parayao", "Poblacion",
          "Pototan", "Sabangan", "Salapingao", "San Isidro Norte", "San Isidro Sur", "Santa Rosa", "Tombor"
        ], "Dagupan": [
          "Mangin",
          "Mayombo",
          "Pantal",
          "Poblacion Oeste",
          "Pogo Chico",
          "Pogo Grande",
          "Pugaro Suit",
          "Salapingao",
          "Salisay",
          "Tambac",
          "Tapuac",
          "Tebeng"
        ],
        "Dasol": [
          "Alilao",
          "Amalbalan",
          "Bobonot",
          "Eguia",
          "Gais-Guipe",
          "Hermosa",
          "Macalang",
          "Magsaysay",
          "Malacapas",
          "Malimpin",
          "Osmeña",
          "Petal",
          "Poblacion",
          "San Vicente",
          "Tambac",
          "Tambobong",
          "Uli",
          "Viga"
        ],
        "Infanta": [
          "Babuyan",
          "Bamban",
          "Batang",
          "Bayambang",
          "Cato",
          "Doliman",
          "Fatima",
          "Maya",
          "Nangalisan",
          "Nayom",
          "Pita",
          "Poblacion",
          "Potol"
        ],
        "Labrador": [
          "Bolo",
          "Bongalon",
          "Dulig",
          "Laois",
          "Magsaysay",
          "Poblacion",
          "San Gonzalo",
          "San Jose",
          "Tobuan",
          "Uyong"
        ],
        "Laoac": [
          "Anis",
          "Balligi",
          "Banuar",
          "Botique",
          "Caaringayan",
          "Cabilaoan West",
          "Cabulalaan",
          "Calaoagan",
          "Calmay",
          "Casampagaan",
          "Casanestebanan",
          "Casantiagoan",
          "Domingo Alarcio",
          "Inmanduyan",
          "Lebueg",
          "Maraboc",
          "Nanbagatan",
          "Panaga",
          "Poblacion",
          "Talogtog",
          "Turko",
          "Yatyat"
        ],
        "Lingayen": [
          "Aliwekwek",
          "Baay",
          "Balangobong",
          "Balococ",
          "Bantayan",
          "Basing",
          "Capandanan",
          "Domalandan Center",
          "Domalandan East",
          "Domalandan West",
          "Dorongan",
          "Dulag",
          "Estanza",
          "Lasip",
          "Libsong East",
          "Libsong West",
          "Malawa",
          "Malimpuec",
          "Maniboc",
          "Matalava",
          "Naguelguel",
          "Namolan",
          "Pangapisan North",
          "Pangapisan Sur",
          "Poblacion",
          "Quibaol",
          "Rosario",
          "Sabangan",
          "Talogtog",
          "Tonton",
          "Tumbar",
          "Wawa"
        ],
        "Mabini": [
          "Bacnit",
          "Barlo",
          "Caabiangaan",
          "Cabanaetan",
          "Cabinuangan",
          "Calzada",
          "Caranglaan",
          "De Guzman",
          "Luna",
          "Magalong",
          "Nibaliw",
          "Patar",
          "Poblacion",
          "San Pedro",
          "Tagudin",
          "Villacorta"
        ],
        "Malasiqui": [
          "Abonagan",
          "Agdao",
          "Alacan",
          "Aliaga",
          "Amacalan",
          "Anolid",
          "Apaya",
          "Asin Este",
          "Asin Weste",
          "Bacundao Este",
          "Bacundao Weste",
          "Bakitiw",
          "Balite",
          "Banawang",
          "Barang",
          "Bawer",
          "Binalay",
          "Bobon",
          "Bolaoit",
          "Bongar",
          "Butao",
          "Cabatling",
          "Cabueldatan",
          "Calbueg",
          "Canan Norte",
          "Canan Sur",
          "Cawayan Bogtong",
          "Don Pedro",
          "Gatang",
          "Goliman",
          "Gomez",
          "Guilig",
          "Ican",
          "Ingalagala",
          "Lareg-lareg",
          "Lasip",
          "Lepa",
          "Loqueb Este",
          "Loqueb Norte",
          "Loqueb Sur",
          "Lunec",
          "Mabulitec",
          "Malimpec",
          "Manggan-Dampay",
          "Nalsian Norte",
          "Nalsian Sur",
          "Nancapian",
          "Nansangaan",
          "Olea",
          "Pacuan",
          "Palapar Norte",
          "Palapar Sur",
          "Palong",
          "Pamaranum",
          "Pasima",
          "Payar",
          "Poblacion",
          "Polong Norte",
          "Polong Sur",
          "Potiocan",
          "San Julian",
          "Tabo-Sili",
          "Talospatang",
          "Taloy",
          "Taloyan",
          "Tambac",
          "Tobor",
          "Tolonguat",
          "Tomling",
          "Umando",
          "Viado",
          "Waig",
          "Warey"
        ],
        "Manaoag": [
          "Babasit",
          "Baguinay",
          "Baritao",
          "Bisal",
          "Bucao",
          "Cabanbanan",
          "Calaocan",
          "Inamotan",
          "Lelemaan",
          "Licsi",
          "Lipit Norte",
          "Lipit Sur",
          "Matolong",
          "Mermer",
          "Nalsian",
          "Oraan East",
          "Oraan West",
          "Pantal",
          "Pao",
          "Parian",
          "Poblacion",
          "Pugaro",
          "San Ramon",
          "Santa Ines",
          "Sapang",
          "Tebuel"
        ],
        "Mangaldan": [
          "Alitaya",
          "Amansabina",
          "Anolid",
          "Banaoang",
          "Bantayan",
          "Bari",
          "Bateng",
          "Buenlag",
          "David",
          "Embarcadero",
          "Gueguesangen",
          "Guesang",
          "Guiguilonen",
          "Guilig",
          "Inlambo",
          "Lanas",
          "Landas",
          "Maasin",
          "Macayug",
          "Malabago",
          "Navaluan",
          "Nibaliw",
          "Osiem",
          "Palua",
          "Poblacion",
          "Pogo",
          "Salaan",
          "Salay",
          "Talogtog",
          "Tebag"
        ],
        "Mangatarem": [
          "Andangin",
          "Arellano Street",
          "Bantay",
          "Bantocaling",
          "Baracbac",
          "Bogtong Bolo",
          "Bogtong Bunao",
          "Bogtong Centro",
          "Bogtong Niog",
          "Bogtong Silag",
          "Buaya",
          "Buenlag",
          "Bueno",
          "Bunagan",
          "Bunlalacao",
          "Burgos Street",
          "Cabaluyan 1st",
          "Cabaluyan 2nd",
          "Cabarabuan",
          "Cabaruan",
          "Cabayaoasan",
          "Cabayugan",
          "Cacaoiten",
          "Calumboyan Norte",
          "Calumboyan Sur",
          "Calvo",
          "Casilagan",
          "Catarataraan",
          "Caturay Norte",
          "Caturay Sur",
          "Caviernesan",
          "Dorongan Ketaket",
          "Dorongan Linmansangan",
          "Dorongan Punta",
          "Dorongan Sawat",
          "Dorongan Valerio",
          "General Luna",
          "Historia",
          "Lawak Langka",
          "Linmansangan",
          "Lopez",
          "Mabini",
          "Macarang",
          "Malabobo",
          "Malibong",
          "Malunec",
          "Maravilla",
          "Maravilla-Arellano Ext.",
          "Muelang",
          "Naguilayan East",
          "Naguilayan West",
          "Nancasalan",
          "Niog-Cabison-Bulaney",
          "Olegario-Caoile",
          "Olo Cacamposan",
          "Olo Cafabrosan",
          "Olo Cagarlitan",
          "Osmeña",
          "Pacalat",
          "Pampano",
          "Parian",
          "Paul",
          "Peania Pedania",
          "Pogon-Aniat",
          "Pogon-Lomboy",
          "Ponglo-Baleg",
          "Ponglo-Muelag",
          "Quetegan",
          "Quezon",
          "Salavante",
          "Sapang",
          "Sonson Ongkit",
          "Suaco",
          "Tagac",
          "Takipan",
          "Talogtog",
          "Tococ Barikir",
          "Torre 1st",
          "Torre 2nd",
          "Torres Bugallon",
          "Umangan",
          "Zamora"
        ],
        "Mapandan": [
          "Amanoaoac",
          "Apaya",
          "Aserda",
          "Baloling",
          "Coral",
          "Golden",
          "Jimenez",
          "Lambayan",
          "Luyan",
          "Nilombot",
          "Pias",
          "Poblacion",
          "Primicias",
          "Santa Maria",
          "Torres"
        ],
        "Natividad": [
          "Barangobong",
          "Batchelor East",
          "Batchelor West",
          "Burgos",
          "Cacandungan",
          "Calapugan",
          "Canarem",
          "Luna",
          "Poblacion East",
          "Poblacion West",
          "Rizal",
          "Salud",
          "San Eugenio",
          "San Macario Norte",
          "San Macario Sur",
          "San Maximo",
          "San Miguel",
          "Silag"
        ],
        "Pozorrubio": [
          "Alipangpang",
          "Amagbagan",
          "Balacag",
          "Banding",
          "Bantugan",
          "Batakil",
          "Bobonan",
          "Buneg",
          "Cablong",
          "Casanfernandoan",
          "Castaño",
          "Dilan",
          "Don Benito",
          "Haway",
          "Imbalbalatong",
          "Inoman",
          "Laoac",
          "Maambal",
          "Malasin",
          "Malokiat",
          "Manaol",
          "Nama",
          "Nantangalan",
          "Palacpalac",
          "Palguyod",
          "Poblacion I",
          "Poblacion II",
          "Poblacion III",
          "Poblacion IV",
          "Rosario",
          "Sugcong",
          "Talogtog",
          "Tulnac",
          "Villegas"
        ],
        "Rosales": [
          "Acop",
          "Bakitbakit",
          "Balingcanaway",
          "Cabalaoangan Norte",
          "Cabalaoangan Sur",
          "Calanutan",
          "Camangaan",
          "Capitan Tomas",
          "Carmay East",
          "Carmay West",
          "Carmen East",
          "Carmen West",
          "Casanicolasan",
          "Coliling",
          "Don Antonio Village",
          "Guiling",
          "Palakipak",
          "Pangaoan",
          "Rabago",
          "Rizal",
          "Salvacion",
          "San Angel",
          "San Antonio",
          "San Bartolome",
          "San Isidro",
          "San Luis",
          "San Pedro East",
          "San Pedro West",
          "San Vicente",
          "Station District",
          "Tomana East",
          "Tomana West",
          "Zone I",
          "Zone II",
          "Zone III",
          "Zone IV",
          "Zone V"
        ],
        "San Carlos": [
          "Abanon",
          "Agdao",
          "Anando",
          "Ano",
          "Antipangol",
          "Aponit",
          "Bacnar",
          "Balaya",
          "Balayong",
          "Baldog",
          "Balite Sur",
          "Balococ",
          "Bani",
          "Bega",
          "Bocboc",
          "Bogaoan",
          "Bolingit"
        ], "San Carlos": [
          "Bolosan",
          "Bonifacio",
          "Buenglat",
          "Bugallon-Posadas Street",
          "Burgos Padlan",
          "Cacaritan",
          "Caingal",
          "Calobaoan",
          "Calomboyan",
          "Caoayan-Kiling",
          "Capataan",
          "Cobol",
          "Coliling",
          "Cruz",
          "Doyong",
          "Gamata",
          "Guelew",
          "Ilang",
          "Inerangan",
          "Isla",
          "Libas",
          "Lilimasan",
          "Longos",
          "Lucban",
          "M. Soriano",
          "Mabalbalino",
          "Mabini",
          "Magtaking",
          "Malacañang",
          "Maliwara",
          "Mamarlao",
          "Manzon",
          "Matagdem",
          "Mestizo Norte",
          "Naguilayan",
          "Nilentap",
          "PNR Station Site",
          "Padilla-Gomez",
          "Pagal",
          "Paitan-Panoypoy",
          "Palaming",
          "Palaris",
          "Palospos",
          "Pangalangan",
          "Pangoloan",
          "Pangpang",
          "Parayao",
          "Payapa",
          "Payar",
          "Perez Boulevard",
          "Polo",
          "Quezon Boulevard",
          "Quintong",
          "Rizal",
          "Roxas Boulevard",
          "Salinap",
          "San Juan",
          "San Pedro-Taloy",
          "Sapinit",
          "Supo",
          "Talang",
          "Tamayo",
          "Tandang Sora",
          "Tandoc",
          "Tarece",
          "Tarectec",
          "Tayambani",
          "Tebag",
          "Turac"
        ],
        "San Fabian": [
          "Alacan",
          "Ambalangan-Dalin",
          "Angio",
          "Anonang",
          "Aramal",
          "Bigbiga",
          "Binday",
          "Bolaoen",
          "Bolasi",
          "Cabaruan",
          "Cayanga",
          "Colisao",
          "Gomot",
          "Inmalog",
          "Inmalog Norte",
          "Lekep-Butao",
          "Lipit-Tomeeng",
          "Longos",
          "Longos Proper",
          "Longos-Amangonan-Parac-Parac Fabrica",
          "Mabilao",
          "Nibaliw Central",
          "Nibaliw East",
          "Nibaliw Magliba",
          "Nibaliw Narvarte",
          "Nibaliw Vidal",
          "Palapad",
          "Poblacion",
          "Rabon",
          "Sagud-Bahley",
          "Sobol",
          "Tempra-Guilig",
          "Tiblong",
          "Tocok"
        ],
        "San Jacinto": [
          "Awai",
          "Bagong Pag-asa",
          "Bolo",
          "Capaoay",
          "Casibong",
          "Guibel",
          "Imelda",
          "Labney",
          "Lobong",
          "Macayug",
          "Magsaysay",
          "San Guillermo",
          "San Jose",
          "San Juan",
          "San Roque",
          "San Vicente",
          "Santa Cruz",
          "Santa Maria",
          "Santo Tomas"
        ],
        "San Manuel": [
          "Cabacaraan",
          "Cabaritan",
          "Flores",
          "Guiset Norte",
          "Guiset Sur",
          "Lapalo",
          "Nagsaag",
          "Narra",
          "San Antonio-Arzadon",
          "San Bonifacio",
          "San Juan",
          "San Roque",
          "San Vicente",
          "Santo Domingo"
        ],
        "San Nicolas": [
          "Bensican",
          "Cabitnongan",
          "Caboloan",
          "Cacabugaoan",
          "Calanutian",
          "Calaocan",
          "Camanggaan",
          "Camindoroan",
          "Casaratan",
          "Dalumpinas",
          "Fianza",
          "Lungao",
          "Malico",
          "Malilion",
          "Nagkaysa",
          "Nining",
          "Poblacion East",
          "Poblacion West",
          "Salingcob",
          "Salpad",
          "San Felipe East",
          "San Felipe West",
          "San Isidro",
          "San Jose",
          "San Rafael Centro",
          "San Rafael East",
          "San Rafael West",
          "San Roque",
          "Santa Maria East",
          "Santa Maria West",
          "Santo Tomas",
          "Siblot",
          "Sobol"
        ],
        "San Quintin": [
          "Alac",
          "Baligayan",
          "Bantog",
          "Bolintaguen",
          "Cabalaoangan",
          "Cabangaran",
          "Calomboyan",
          "Carayacan",
          "Casantamarian",
          "Gonzalo",
          "Labuan",
          "Lagasit",
          "Lumayao",
          "Mabini",
          "Mantacdang",
          "Nangapugan",
          "Poblacion Zone I",
          "Poblacion Zone II",
          "Poblacion Zone III",
          "San Pedro",
          "Ungib"
        ],
        "Santa Barbara": [
          "Alibago",
          "Balingueo",
          "Banaoang",
          "Banzal",
          "Botao",
          "Cablong",
          "Carusocan",
          "Dalongue",
          "Erfe",
          "Gueguesangen",
          "Leet",
          "Malanay",
          "Maningding",
          "Maronong",
          "Maticmatic",
          "Minien East",
          "Minien West",
          "Nilombot",
          "Patayac",
          "Payas",
          "Poblacion Norte",
          "Poblacion Sur",
          "Primicias",
          "Sapang",
          "Sonquil",
          "Tebag East",
          "Tebag West",
          "Tuliao",
          "Ventinilla"
        ],
        "Santa Maria": [
          "Bal-loy",
          "Bantog",
          "Caboluan",
          "Cal-litang",
          "Capandanan",
          "Cauplasan",
          "Dalayap",
          "Libsong",
          "Namagbagan",
          "Paitan",
          "Pataquid",
          "Pilar",
          "Poblacion East",
          "Poblacion West",
          "Pugot",
          "Samon",
          "San Alejandro",
          "San Mariano",
          "San Pablo",
          "San Patricio",
          "San Vicente",
          "Santa Cruz",
          "Santa Rosa"
        ],
        "Santo Tomas": [
          "La Luna",
          "Poblacion East",
          "Poblacion West",
          "Salvacion",
          "San Agustin",
          "San Antonio",
          "San Jose",
          "San Marcos",
          "Santo Domingo",
          "Santo Niño"
        ],
        "Sison": [
          "Agat",
          "Alibeng",
          "Amagbagan",
          "Artacho",
          "Asan Norte",
          "Asan Sur",
          "Bantay Insik",
          "Bila",
          "Binmeckeg",
          "Bulaoen East",
          "Bulaoen West",
          "Cabaritan",
          "Calunetan",
          "Camangaan",
          "Cauringan",
          "Dungon",
          "Esperanza",
          "Inmalog",
          "Killo",
          "Labayug",
          "Paldit",
          "Pindangan",
          "Pinmilapil",
          "Poblacion Central",
          "Poblacion Norte",
          "Poblacion Sur",
          "Sagunto",
          "Tara-tara"
        ],
        "Sual": [
          "Baquioen",
          "Baybay Norte",
          "Baybay Sur",
          "Bolaoen",
          "Cabalitian",
          "Calumbuyan",
          "Camagsingalan",
          "Caoayan",
          "Capantolan",
          "Macaycayawan",
          "Paitan East",
          "Paitan West",
          "Pangascasan",
          "Poblacion",
          "Santo Domingo",
          "Seselangen",
          "Sioasio East",
          "Sioasio West",
          "Victoria"
        ],
        "Tayug": [
          "Agno",
          "Amistad",
          "Barangay A",
          "Barangay B",
          "Barangay C",
          "Barangay D",
          "Barangobong",
          "C. Lichauco",
          "Carriedo",
          "Evangelista",
          "Guzon",
          "Lawak",
          "Legaspi",
          "Libertad",
          "Magallanes",
          "Panganiban",
          "Saleng",
          "Santo Domingo",
          "Toketec",
          "Trenchera",
          "Zamora"
        ],
        "Umingan": [
          "Abot Molina",
          "Alo-o",
          "Amaronan",
          "Annam",
          "Bantug",
          "Baracbac",
          "Barat",
          "Buenavista",
          "Cabalitian",
          "Cabangaran",
          "Cabaruan",
          "Cabatuan",
          "Cadiz",
          "Calitlitan",
          "Capas",
          "Carayungan Sur",
          "Carosalesan",
          "Casilan",
          "Caurdanetaan",
          "Concepcion",
          "Decreto",
          "Del Rosario",
          "Diaz",
          "Diket",
          "Don Justo Abalos",
          "Don Montano",
          "Esperanza",
          "Evangelista",
          "Flores",
          "Fulgosino",
          "Gonzales",
          "La Paz",
          "Labuan",
          "Lauren",
          "Lubong",
          "Luna Este",
          "Luna Weste",
          "Mantacdang",
          "Maseil-seil",
          "Nampalcan",
          "Nancalabasaan",
          "Pangangaan",
          "Papallasen",
          "Pemienta",
          "Poblacion East",
          "Poblacion West",
          "Prado",
          "Resurreccion",
          "Ricos",
          "San Andres",
          "San Juan",
          "San Leon",
          "San Pablo",
          "San Vicente",
          "Santa Maria",
          "Santa Rosa",
          "Sinabaan",
          "Tanggal Sawang"
        ],
        "Urbiztondo": [
          "Angatel",
          "Balangay",
          "Batangcaoa",
          "Baug",
          "Bayaoas",
          "Bituag",
          "Camambugan",
          "Dalangiring",
          "Duplac",
          "Galarin",
          "Gueteb",
          "Malaca",
          "Malayo",
          "Malibong",
          "Pasibi East",
          "Pasibi West",
          "Pisuac",
          "Poblacion",
          "Real",
          "Salavante",
          "Sawat"
        ],
        "Urdaneta": [
          "Anonas",
          "Bactad East",
          "Bayaoas",
          "Bolaoen",
          "Cabaruan",
          "Cabuloan",
          "Camanang",
          "Camantiles",
          "Casantaan",
          "Catablan",
          "Cayambanan",
          "Consolacion",
          "Dilan Paurido",
          "Dr. Pedro T. Orata",
          "Labit Proper",
          "Labit West",
          "Mabanogbog",
          "Macalong",
          "Nancalobasaan",
          "Nancamaliran East",
          "Nancamaliran West",
          "Nancayasan",
          "Oltama",
          "Palina East",
          "Palina West",
          "Pinmaludpod",
          "Poblacion",
          "San Jose",
          "San Vicente",
          "Santa Lucia",
          "Santo Domingo",
          "Sugcong",
          "Tipuso",
          "Tulong"
        ],
        "Villasis": [
          "Amamperez",
          "Bacag",
          "Barangobong",
          "Barraca",
          "Capulaan",
          "Caramutan",
          "La Paz",
          "Labit",
          "Lipay",
          "Lomboy",
          "Piaz",
          "Puelay",
          "San Blas",
          "San Nicolas",
          "Tombod",
          "Unzad",
          "Zone I",
          "Zone II",
          "Zone III",
          "Zone IV",
          "Zone V"
        ]
      }

    },
    "Quezon": {
      cities: {
        "Agdangan": [
          "Binagbag",
          "Dayap",
          "Ibabang Kinagunan",
          "Ilayang Kinagunan",
          "Kanlurang Calutan",
          "Kanlurang Maligaya",
          "Poblacion I",
          "Poblacion II",
          "Salvacion",
          "Silangang Calutan",
          "Silangang Maligaya",
          "Sildora"
        ],
        "Alabat": [
          "Angeles",
          "Bacong",
          "Balungay",
          "Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Buenavista",
          "Caglate",
          "Camagong",
          "Gordon",
          "Pambilan Norte",
          "Pambilan Sur",
          "Villa Esperanza",
          "Villa Jesus Este",
          "Villa Jesus Weste",
          "Villa Norte",
          "Villa Victoria"
        ],
        "Atimonan": [
          "Angeles",
          "Balubad",
          "Balugohin",
          "Barangay Zone 1",
          "Barangay Zone 2",
          "Barangay Zone 3",
          "Barangay Zone 4",
          "Buhangin",
          "Caridad Ibaba",
          "Caridad Ilaya",
          "Habingan",
          "Inaclagan",
          "Inalig",
          "Kilait",
          "Kulawit",
          "Lakip",
          "Lubi",
          "Lumutan",
          "Magsaysay",
          "Malinao Ibaba",
          "Malinao Ilaya",
          "Malusak",
          "Manggalayan Bundok",
          "Manggalayan Labak",
          "Matanag",
          "Montes Balaon",
          "Montes Kallagan",
          "Ponon",
          "Rizal",
          "San Andres Bundok",
          "San Andres Labak",
          "San Isidro",
          "San Jose Balatok",
          "San Rafael",
          "Santa Catalina",
          "Sapaan",
          "Sokol",
          "Tagbakin",
          "Talaba",
          "Tinandog",
          "Villa Ibaba",
          "Villa Ilaya"
        ],
        "Buenavista": [
          "Bagong Silang",
          "Batabat Norte",
          "Batabat Sur",
          "Buenavista",
          "Bukal",
          "Bulo",
          "Cabong",
          "Cadlit",
          "Catulin",
          "Cawa",
          "De La Paz",
          "Del Rosario",
          "Hagonghong",
          "Ibabang Wasay",
          "Ilayang Wasay",
          "Lilukin",
          "Mabini",
          "Mabutag",
          "Magallanes",
          "Maligaya",
          "Manlana",
          "Masaya",
          "Poblacion",
          "Rizal",
          "Sabang Pinamasagan",
          "Sabang Piris",
          "San Diego",
          "San Isidro Ibaba",
          "San Isidro Ilaya",
          "San Pablo",
          "San Pedro",
          "San Vicente",
          "Siain",
          "Villa Aurora",
          "Villa Batabat",
          "Villa Magsaysay",
          "Villa Veronica"
        ],
        "Burdeos": [
          "Aluyon",
          "Amot",
          "Anibawan",
          "Bonifacio",
          "Cabugao",
          "Cabungalunan",
          "Calutcot",
          "Caniwan",
          "Carlagan",
          "Mabini",
          "Palasan",
          "Poblacion",
          "San Rafael"
        ],
        "Calauag": [
          "Agoho",
          "Anahawan",
          "Anas",
          "Apad Lutao",
          "Apad Quezon",
          "Apad Taisan",
          "Atulayan",
          "Baclaran",
          "Bagong Silang",
          "Balibago",
          "Bangkuruhan",
          "Bantolinao",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Bigaan",
          "Binutas",
          "Biyan",
          "Bukal",
          "Buli",
          "Dapdap",
          "Dominlog",
          "Doña Aurora",
          "Guinosayan",
          "Ipil",
          "Kalibo",
          "Kapaluhan",
          "Katangtang",
          "Kigtan",
          "Kinalin Ibaba",
          "Kinalin Ilaya",
          "Kinamaligan",
          "Kumaludkud",
          "Kunalum",
          "Kuyaoyao",
          "Lagay",
          "Lainglaingan",
          "Lungib",
          "Mabini",
          "Madlangdungan",
          "Maglipad",
          "Maligaya",
          "Mambaling",
          "Manhulugin",
          "Marilag",
          "Mulay",
          "Pandanan",
          "Pansol",
          "Patihan",
          "Pinagbayanan",
          "Pinagkamaligan",
          "Pinagsakahan",
          "Pinagtalleran",
          "Rizal Ibaba",
          "Rizal Ilaya",
          "Sabang I",
          "Sabang II",
          "Salvacion",
          "San Quintin",
          "San Roque Ibaba",
          "San Roque Ilaya",
          "Santa Cecilia",
          "Santa Maria",
          "Santa Milagrosa",
          "Santa Rosa",
          "Santo Angel",
          "Santo Domingo",
          "Sinag",
          "Sumilang",
          "Sumulong",
          "Tabansak",
          "Talingting",
          "Tamis",
          "Tikiwan",
          "Tiniguiban",
          "Villa Magsino",
          "Villa San Isidro",
          "Viñas",
          "Yaganak"
        ],
        "Candelaria": [
          "Buenavista East",
          "Buenavista West",
          "Bukal Norte",
          "Bukal Sur",
          "Kinatihan I",
          "Kinatihan II",
          "Malabanban Norte",
          "Malabanban Sur",
          "Mangilag Norte",
          "Mangilag Sur",
          "Masalukot I",
          "Masalukot II",
          "Masalukot III",
          "Masalukot IV",
          "Masalukot V",
          "Masin Norte",
          "Masin Sur",
          "Mayabobo",
          "Pahinga Norte",
          "Pahinga Sur",
          "Poblacion",
          "San Andres",
          "San Isidro",
          "Santa Catalina Norte",
          "Santa Catalina Sur"
        ],
        "Catanauan": [
          "Ajos",
          "Anusan",
          "Barangay 1",
          "Barangay 10",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Barangay 7",
          "Barangay 8",
          "Barangay 9",
          "Bolo",
          "Bulagsong",
          "Camandiison",
          "Canculajao",
          "Catumbo",
          "Cawayanin Ibaba",
          "Cawayanin Ilaya",
          "Cutcutan",
          "Dahican",
          "Doongan Ibaba",
          "Doongan Ilaya",
          "Gatasan",
          "Macpac",
          "Madulao",
          "Matandang Sabang Kanluran",
          "Matandang Sabang Silangan",
          "Milagrosa",
          "Navitas",
          "Pacabit",
          "San Antonio Magkupa",
          "San Antonio Pala",
          "San Isidro",
          "San Jose",
          "San Pablo",
          "San Roque",
          "San Vicente Kanluran",
          "San Vicente Silangan",
          "Santa Maria",
          "Tagabas Ibaba",
          "Tagabas Ilaya",
          "Tagbacan Ibaba",
          "Tagbacan Ilaya",
          "Tagbacan Silangan",
          "Tuhian"
        ],
        "Gumaca": [
          "Camohaguin",
          "Casasahan Ibaba",
          "Casasahan Ilaya",
          "Cawayan",
          "Gayagayaan",
          "Gitnang Barrio",
          "Hagakhakin",
          "Hardinan",
          "Inaclagan",
          "Inagbuhan Ilaya",
          "Labnig",
          "Laguna",
          "Lagyo",
          "Mabini",
          "Mabunga",
          "Malabtog",
          "Manlayaan",
          "Marcelo H. del Pilar",
          "Mataas na Bundok",
          "Maunlad",
          "Pagsabangan",
          "Panikihan",
          "Peñafrancia",
          "Pipisik",
          "Progreso",
          "Rizal",
          "Rosario",
          "San Agustin",
          "San Diego",
          "San Diego Poblacion",
          "San Isidro Kanluran",
          "San Isidro Silangan",
          "San Juan de Jesus",
          "San Vicente",
          "Sastre",
          "Tabing Dagat",
          "Tumayan",
          "Villa Arcaya",
          "Villa Bota",
          "Villa Fuerte",
          "Villa M. Principe",
          "Villa Mendoza",
          "Villa Nava",
          "Villa Padua",
          "Villa Perez",
          "Villa Tañada",
          "Villa Victoria"
        ],
        "Infanta": [
          "Abiawin",
          "Agos-agos",
          "Alitas",
          "Amolongin",
          "Anibong",
          "Antikin",
          "Bacong",
          "Balobo",
          "Bantilan",
          "Banugao",
          "Batican",
          "Binonoan",
          "Binulasan",
          "Boboin",
          "Catambungan",
          "Cawaynin",
          "Comon",
          "Dinahican",
          "Gumian",
          "Ilog",
          "Ingas",
          "Langgas",
          "Libjo",
          "Lual",
          "Magsaysay",
          "Maypulot",
          "Miswa",
          "Pilaway",
          "Pinaglapatan",
          "Poblacion 1",
          "Poblacion 38",
          "Poblacion 39",
          "Pulo",
          "Silangan",
          "Tongohin",
          "Tudturan"
        ],
        "Jomalig": [
          "Apad",
          "Bukal",
          "Casuguran",
          "Gango",
          "Talisoy"
        ],
        "Lopez": [
          "Bacungan",
          "Bagacay",
          "Banabahin Ibaba",
          "Banabahin Ilaya",
          "Bayabas",
          "Bebito",
          "Bigajo",
          "Binahian A",
          "Binahian B",
          "Binahian C",
          "Bocboc",
          "Buenavista",
          "Burgos",
          "Buyacanin",
          "Cagacag",
          "Calantipayan",
          "Canda Ibaba",
          "Canda Ilaya",
          "Cawayan",
          "Cawayanin",
          "Cogorin Ibaba",
          "Cogorin Ilaya",
          "Concepcion",
          "Danlagan",
          "De La Paz",
          "Del Pilar",
          "Del Rosario",
          "Esperanza Ibaba",
          "Esperanza Ilaya",
          "Gomez",
          "Guihay",
          "Guinuangan",
          "Guites",
          "Hondagua",
          "Ilayang Ilog A",
          "Ilayang Ilog B",
          "Inalusan",
          "Jongo",
          "Lalaguna",
          "Lourdes",
          "Mabanban",
          "Mabini",
          "Magallanes",
          "Magsaysay",
          "Maguilayan",
          "Mahayod-Hayod",
          "Mal-ay",
          "Mandoog",
          "Manguisian",
          "Matinik",
          "Monteclaro",
          "Pamampangin",
          "Pansol",
          "Peñafrancia",
          "Pisipis",
          "Rizal (Poblacion)",
          "Rizal (Rural)",
          "Roma",
          "Rosario",
          "Samat",
          "San Andres",
          "San Antonio",
          "San Francisco A",
          "San Francisco B",
          "San Isidro",
          "San Jose",
          "San Miguel",
          "San Pedro",
          "San Rafael",
          "San Roque",
          "Santa Catalina",
          "Santa Elena",
          "Santa Jacobe",
          "Santa Lucia",
          "Santa Maria",
          "Santa Rosa",
          "Santa Teresa",
          "Santo Niño Ibaba",
          "Santo Niño Ilaya",
          "Silang",
          "Sugod",
          "Sumalang",
          "Talolong",
          "Tan-ag Ibaba",
          "Tan-ag Ilaya",
          "Tocalin",
          "Vegaflor",
          "Vergaña",
          "Veronica",
          "Villa Aurora",
          "Villa Espina",
          "Villa Geda",
          "Villa Hermosa",
          "Villamonte",
          "Villanacaob"
        ],
        "Lucban": [
          "Abang",
          "Aliliw",
          "Atulinao",
          "Ayuti",
          "Barangay 1",
          "Barangay 10",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Barangay 7",
          "Barangay 8",
          "Barangay 9",
          "Igang",
          "Kabatete",
          "Kakawit",
          "Kalangay",
          "Kalyaat",
          "Kilib",
          "Kulapi",
          "Mahabang Parang",
          "Malupak",
          "Manasa",
          "May-it",
          "Nagsinamo",
          "Nalunao",
          "Palola",
          "Piis",
          "Samil",
          "Tiawe",
          "Tinamnan"
        ],
        "Macalelon": [
          "Amontay",
          "Anos",
          "Buyao",
          "Calantas",
          "Candangal",
          "Castillo",
          "Damayan",
          "Lahing",
          "Luctob",
          "Mabini Ibaba",
          "Mabini Ilaya",
          "Malabahay",
          "Mambog",
          "Masipag",
          "Olongtao Ibaba",
          "Olongtao Ilaya",
          "Padre Herrera",
          "Pag-asa",
          "Pajarillo",
          "Pinagbayanan",
          "Rizal",
          "Rodriquez",
          "San Isidro",
          "San Jose",
          "San Nicolas",
          "San Vicente",
          "Taguin",
          "Tubigan Ibaba",
          "Tubigan Ilaya",
          "Vista Hermosa"
        ],
        "Mauban": [
          "Abo-abo",
          "Alitap",
          "Baao",
          "Bagong Bayan",
          "Balaybalay",
          "Bato",
          "Cagbalete I",
          "Cagbalete II",
          "Cagsiay I",
          "Cagsiay II",
          "Cagsiay III",
          "Concepcion",
          "Daungan",
          "Liwayway",
          "Lual",
          "Lual Rural",
          "Lucutan",
          "Luya-luya",
          "Mabato",
          "Macasin",
          "Polo",
          "Remedios I",
          "Remedios II",
          "Rizaliana",
          "Rosario",
          "Sadsaran",
          "San Gabriel",
          "San Isidro",
          "San Jose",
          "San Lorenzo",
          "San Miguel",
          "San Rafael",
          "San Roque",
          "San Vicente",
          "Santa Lucia",
          "Santo Angel",
          "Santo Niño",
          "Santol",
          "Soledad",
          "Tapucan"
        ],
        "Mulanay": [
          "Ajos",
          "Amuguis",
          "Anonang",
          "Bagong Silang",
          "Bagupaye",
          "Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Bolo",
          "Buenavista",
          "Burgos",
          "Butanyog",
          "Canuyep",
          "F. Nanadiego",
          "Ibabang Cambuga",
          "Ibabang Yuni",
          "Ilayang Cambuga",
          "Ilayang Yuni",
          "Latangan",
          "Magsaysay",
          "Matataja",
          "Pakiing",
          "Patabog",
          "Sagongon",
          "San Isidro",
          "San Pedro",
          "Santa Rosa"
        ],
        "Padre Burgos": [
          "Basiao",
          "Burgos",
          "Cabuyao Norte",
          "Cabuyao Sur",
          "Campo",
          "Danlagan",
          "Duhat",
          "Hinguiwin",
          "Kinagunan Ibaba",
          "Kinagunan Ilaya",
          "Lipata",
          "Marao",
          "Marquez",
          "Punta",
          "Rizal",
          "San Isidro",
          "San Vicente",
          "Sipa",
          "Tulay Buhangin",
          "Villapaz",
          "Walay",
          "Yawe"
        ],
        "Pagbilao": [
          "Alupaye",
          "Antipolo",
          "Añato",
          "Bantigue",
          "Barangay 1 Castillo",
          "Barangay 2 Daungan",
          "Barangay 3 del Carmen",
          "Barangay 4 Parang",
          "Barangay 5 Santa Catalina",
          "Barangay 6 Tambak",
          "Bigo",
          "Binahaan",
          "Bukal",
          "Ibabang Bagumbungan",
          "Ibabang Palsabangon",
          "Ibabang Polo",
          "Ikirin",
          "Ilayang Bagumbungan",
          "Ilayang Palsabangon",
          "Ilayang Polo",
          "Kanluran Malicboy",
          "Mapagong",
          "Mayhay",
          "Pinagbayanan",
          "Silangan Malicboy",
          "Talipan",
          "Tukalan"
        ],
        "Panukulan": [
          "Balungay",
          "Bato",
          "Bonbon",
          "Calasumanga",
          "Kinalagti",
          "Libo",
          "Lipata",
          "Matangkap",
          "Milawid",
          "Pagitan",
          "Pandan",
          "Rizal",
          "San Juan"
        ],
        "Patnanungan": [
          "Amaga",
          "Busdak",
          "Kilogan",
          "Luod",
          "Patnanungan Norte",
          "Patnanungan Sur"
        ],
        "Perez": [
          "Bagong Pag-asa Poblacion",
          "Bagong Silang Poblacion",
          "Maabot",
          "Mainit Norte",
          "Mainit Sur",
          "Mapagmahal Poblacion",
          "Pagkakaisa Poblacion",
          "Pambuhan",
          "Pinagtubigan Este",
          "Pinagtubigan Weste",
          "Rizal",
          "Sangirin",
          "Villamanzano Norte",
          "Villamanzano Sur"
        ],
        "Pitogo": [
          "Amontay",
          "Biga",
          "Bilucao",
          "Cabulihan",
          "Castillo",
          "Cawayanin",
          "Cometa",
          "Dalampasigan", "Dulong Bayan",
          "Gangahin",
          "Ibabang Burgos",
          "Ibabang Pacatin",
          "Ibabang Piña",
          "Ibabang Soliyao",
          "Ilayang Burgos",
          "Ilayang Pacatin",
          "Ilayang Piña",
          "Ilayang Soliyao",
          "Maaliw",
          "Manggahan",
          "Masaya",
          "Mayubok",
          "Nag-Cruz",
          "Osmeña",
          "Pag-asa",
          "Pamilihan",
          "Payte",
          "Pinagbayanan",
          "Poctol",
          "Quezon",
          "Quinagasan",
          "Rizalino",
          "Saguinsinan",
          "Sampaloc",
          "San Roque",
          "Sisirin",
          "Sumag Este",
          "Sumag Norte",
          "Sumag Weste"
        ],
        "Plaridel": [
          "Central",
          "Concepcion",
          "Duhat",
          "Ilaya",
          "Ilosong",
          "M. L. Tumagay Poblacion",
          "Paang Bundok",
          "Pampaaralan",
          "Tanauan"
        ],
        "Polillo": [
          "Anawan",
          "Atulayan",
          "Balesin",
          "Bañadero",
          "Binibitinan",
          "Bislian",
          "Bucao",
          "Canicanian",
          "Kalubakis",
          "Languyin",
          "Libjo",
          "Pamatdan",
          "Pilion",
          "Pinaglubayan",
          "Poblacion",
          "Sabang",
          "Salipsip",
          "Sibulan",
          "Taluong",
          "Tamulaya-Anitong"
        ],
        "Quezon": [
          "Apad",
          "Argosino",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Barangay V",
          "Barangay VI",
          "Cagbalogo",
          "Caridad",
          "Cometa",
          "Del Pilar",
          "Guinhawa",
          "Gumubat",
          "Magsino",
          "Mascariña",
          "Montaña",
          "Sabang",
          "Silangan",
          "Tagkawa",
          "Villa Belen",
          "Villa Francia",
          "Villa Gomez",
          "Villa Mercedes"
        ],
        "Real": [
          "Bagong Silang",
          "Capalong",
          "Cawayan",
          "Kiloloran",
          "Llavac",
          "Lubayat",
          "Malapad",
          "Maragondon",
          "Masikap",
          "Maunlad",
          "Pandan",
          "Poblacion 61",
          "Poblacion I",
          "Tagumpay",
          "Tanauan",
          "Tignoan",
          "Ungos"
        ],
        "Sampaloc": [
          "Alupay",
          "Apasan",
          "Banot",
          "Bataan",
          "Bayongon",
          "Bilucao",
          "Caldong",
          "Ibabang Owain",
          "Ilayang Owain",
          "Mamala",
          "San Bueno",
          "San Isidro",
          "San Roque",
          "Taquico"
        ],
        "San Andres": [
          "Alibihaban",
          "Camflora",
          "Mangero",
          "Pansoy",
          "Poblacion",
          "Tala",
          "Talisay"
        ],
        "San Antonio": [
          "Arawan",
          "Bagong Niing",
          "Balat Atis",
          "Briones",
          "Bulihan",
          "Buliran",
          "Callejon",
          "Corazon",
          "Loob",
          "Magsaysay",
          "Manuel del Valle, Sr.",
          "Matipunso",
          "Niing",
          "Poblacion",
          "Pulo",
          "Pury",
          "Sampaga",
          "Sampaguita",
          "San Jose",
          "Sinturisan"
        ],
        "San Francisco": [
          "Butanguiad",
          "Casay",
          "Cawayan I",
          "Cawayan II",
          "Don Juan Vercelos",
          "Huyon-Uyon",
          "Ibabang Tayuman",
          "Ilayang Tayuman",
          "Inabuan",
          "Mabuñga",
          "Nasalaan",
          "Pagsangahan",
          "Poblacion",
          "Pugon",
          "Santo Niño",
          "Silongin"
        ],
        "San Narciso": [
          "Abuyon",
          "Andres Bonifacio",
          "Bani",
          "Bayanihan",
          "Binay",
          "Buenavista",
          "Busokbusokan",
          "Calwit",
          "Guinhalinan",
          "Lacdayan",
          "Maguiting",
          "Maligaya",
          "Manlampong",
          "Pagdadamayan",
          "Pagkakaisa",
          "Punta",
          "Rizal",
          "San Isidro",
          "San Juan",
          "San Vicente",
          "Vigo Central",
          "Villa Aurin",
          "Villa Reyes",
          "White Cliff"
        ],
        "Sariaya": [
          "Antipolo",
          "Balubal",
          "Barangay 1",
          "Barangay 2",
          "Barangay 3",
          "Barangay 4",
          "Barangay 5",
          "Barangay 6",
          "Bignay 1",
          "Bignay 2",
          "Bucal",
          "Canda",
          "Castañas",
          "Concepcion Banahaw",
          "Concepcion No. 1",
          "Concepcion Palasan",
          "Concepcion Pinagbakuran",
          "Gibanga",
          "Guisguis-San Roque",
          "Guisguis-Talon",
          "Janagdong 1",
          "Janagdong 2",
          "Limbon",
          "Lutucan 1",
          "Lutucan Bata",
          "Lutucan Malabag",
          "Mamala I",
          "Mamala II",
          "Manggalang 1",
          "Manggalang Tulo-tulo",
          "Manggalang-Bantilan",
          "Manggalang-Kiling",
          "Montecillo",
          "Morong",
          "Pili",
          "Sampaloc 1",
          "Sampaloc 2",
          "Sampaloc Bogon",
          "Sampaloc Santo Cristo",
          "Talaan Aplaya",
          "Talaanpantoc",
          "Tumbaga 1",
          "Tumbaga 2"
        ],
        "Tagkawayan": [
          "Aldavoc",
          "Aliji",
          "Bagong Silang",
          "Bamban",
          "Bosigon",
          "Bukal",
          "Cabibihan",
          "Cabugwang",
          "Cagascas",
          "Candalapdap",
          "Casispalan",
          "Colong-colong",
          "Del Rosario",
          "Katimo",
          "Kinatakutan",
          "Landing",
          "Laurel",
          "Magsaysay",
          "Maguibuay",
          "Mahinta",
          "Malbog",
          "Manato Central",
          "Manato Station",
          "Mangayao",
          "Mansilay",
          "Mapulot",
          "Munting Parang",
          "Payapa",
          "Poblacion",
          "Rizal",
          "Sabang",
          "San Diego",
          "San Francisco",
          "San Isidro",
          "San Roque",
          "San Vicente",
          "Santa Cecilia",
          "Santa Monica",
          "Santo Niño I",
          "Santo Niño II",
          "Santo Tomas",
          "Seguiwan",
          "Tabason",
          "Tunton",
          "Victoria"
        ],
        "Tayabas": [
          "Alitao",
          "Alsam Ibaba",
          "Alsam Ilaya",
          "Alupay",
          "Angeles Zone I",
          "Angeles Zone II",
          "Angeles Zone III",
          "Angeles Zone IV",
          "Angustias Zone I",
          "Angustias Zone II",
          "Angustias Zone III",
          "Angustias Zone IV",
          "Anos",
          "Ayaas",
          "Baguio",
          "Banilad",
          "Bukal Ibaba",
          "Bukal Ilaya",
          "Calantas",
          "Calumpang",
          "Camaysa",
          "Dapdap",
          "Domoit Kanluran",
          "Domoit Silangan",
          "Gibanga",
          "Ibas",
          "Ilasan Ibaba",
          "Ilasan Ilaya",
          "Ipilan",
          "Isabang",
          "Katigan Kanluran",
          "Katigan Silangan",
          "Lakawan",
          "Lalo",
          "Lawigue",
          "Lita",
          "Malaoa",
          "Masin",
          "Mate",
          "Mateuna",
          "Mayowe",
          "Nangka Ibaba",
          "Nangka Ilaya",
          "Opias",
          "Palale Ibaba",
          "Palale Ilaya",
          "Palale Kanluran",
          "Palale Silangan",
          "Pandakaki",
          "Pook",
          "Potol",
          "San Diego Zone I",
          "San Diego Zone II",
          "San Diego Zone III",
          "San Diego Zone IV",
          "San Isidro Zone I",
          "San Isidro Zone II",
          "San Isidro Zone III",
          "San Isidro Zone IV",
          "San Roque Zone I",
          "San Roque Zone II",
          "Talolong",
          "Tamlong",
          "Tongko",
          "Valencia",
          "Wakas"
        ],
        "Tiaong": [
          "Anastacia",
          "Aquino",
          "Ayusan I",
          "Ayusan II",
          "Barangay I",
          "Barangay II",
          "Barangay III",
          "Barangay IV",
          "Behia",
          "Bukal",
          "Bula",
          "Bulakin",
          "Cabatang",
          "Cabay",
          "Del Rosario",
          "Lagalag",
          "Lalig",
          "Lumingon",
          "Lusacan",
          "Paiisa",
          "Palagaran",
          "Quipot",
          "San Agustin",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Juan",
          "San Pedro",
          "Tagbakin",
          "Talisay",
          "Tamisian"
        ],
        "Unisan": [
          "Almacen",
          "Balagtas",
          "Balanacan",
          "Bonifacio",
          "Bulo Ibaba",
          "Bulo Ilaya",
          "Burgos",
          "Cabulihan Ibaba",
          "Cabulihan Ilaya",
          "Caigdal",
          "F. de Jesus",
          "General Luna",
          "Kalilayan Ibaba",
          "Kalilayan Ilaya",
          "Mabini",
          "Mairok Ibaba",
          "Mairok Ilaya",
          "Malvar",
          "Maputat",
          "Muliguin",
          "Pagaguasan",
          "Panaon Ibaba",
          "Panaon Ilaya",
          "Plaridel",
          "Poctol",
          "Punta",
          "R. Lapu-lapu",
          "R. Magsaysay",
          "Raja Soliman",
          "Rizal Ibaba",
          "Rizal Ilaya",
          "San Roque",
          "Socorro",
          "Tagumpay",
          "Tubas",
          "Tubigan"
        ]
      }

    }, "Quirino": {
      cities: {
        "Aglipay": [
          "Alicia", "Cabugao", "Dagupan", "Diodol", "Dumabel", "Dungo", "Guinalbin", "Ligaya", "Nagabgaban", "Palacian",
          "Pinaripad Norte", "Pinaripad Sur", "Progreso", "Ramos", "Rang-ayan", "San Antonio", "San Benigno", "San Francisco",
          "San Leonardo", "San Manuel", "San Ramon", "Victoria", "Villa Pagaduan", "Villa Santiago", "Villa Ventura"
        ],
        "Cabarroguis": [
          "Banuar", "Burgos", "Calaocan", "Del Pilar", "Dibibi", "Dingasan", "Eden", "Gomez", "Gundaway", "Mangandingay",
          "San Marcos", "Santo Domingo", "Tucod", "Villa Peña", "Villamor", "Villarose", "Zamora"
        ],
        "Diffun": [
          "Aklan Village", "Andres Bonifacio", "Aurora East", "Aurora West", "Baguio Village", "Balagbag", "Bannawag", "Cajel",
          "Campamento", "Diego Silang", "Don Faustino Pagaduan", "Don Mariano Perez, Sr.", "Doña Imelda", "Dumanisi",
          "Gabriela Silang", "Gregorio Pimentel", "Gulac", "Guribang", "Ifugao Village", "Isidro Paredes", "Liwayway",
          "Luttuad", "Magsaysay", "Makate", "Maria Clara", "Rafael Palma", "Ricarte Norte", "Ricarte Sur", "Rizal", "San Antonio",
          "San Isidro", "San Pascual", "Villa Pascua"
        ],
        "Maddela": [
          "Abbag", "Balligui", "Buenavista", "Cabaruan", "Cabua-an", "Cofcaville", "Diduyon", "Dipintin", "Divisoria Norte",
          "Divisoria Sur", "Dumabato Norte", "Dumabato Sur", "Jose Ancheta", "Lusod", "Manglad", "Pedlisan", "Poblacion Norte",
          "Poblacion Sur", "San Bernabe", "San Dionisio I", "San Martin", "San Pedro", "San Salvador", "Santa Maria", "Santo Niño",
          "Santo Tomas", "Villa Agullana", "Villa Gracia", "Villa Hermosa Norte", "Villa Hermosa Sur", "Villa Jose V Ylanan", "Ysmael"
        ],
        "Nagtipunan": [
          "Anak", "Asaklat", "Dipantan", "Dissimungal", "Guino", "La Conwap", "Landingan", "Mataddi", "Matmad", "Old Gumiad",
          "Ponggo", "San Dionisio II", "San Pugo", "San Ramos", "Sangbay", "Wasid"
        ],
        "Saguday": [
          "Cardenas", "Dibul", "Gamis", "La Paz", "Magsaysay", "Rizal", "Salvacion", "Santo Tomas", "Tres Reyes"
        ]
      }

    },
    "Rizal": {
      cities: {
        "Angono": [
          "Bagumbayan", "Kalayaan", "Mahabang Parang", "Poblacion Ibaba", "Poblacion Itaas", "San Isidro", "San Pedro", "San Roque",
          "San Vicente", "Santo Niño"
        ],
        "Antipolo": [
          "Bagong Nayon", "Beverly Hills", "Calawis", "Cupang", "Dalig", "Dela Paz", "Inarawan", "Mambugan", "Mayamot", "Muntingdilaw",
          "San Isidro", "San Jose", "San Juan", "San Luis", "San Roque", "Santa Cruz"
        ],
        "Baras": [
          "Concepcion", "Evangelista", "Mabini", "Pinugay", "Rizal", "San Jose", "San Juan", "San Miguel", "San Salvador", "Santiago"
        ],
        "Binangonan": [
          "Bangad", "Batingan", "Bilibiran", "Binitagan", "Bombong", "Buhangin", "Calumpang", "Ginoong Sanay", "Gulod", "Habagatan",
          "Ithan", "Janosa", "Kalawaan", "Kalinawan", "Kasile", "Kaytome", "Kinaboogan", "Kinagatan", "Layunan", "Libid", "Libis",
          "Limbon-limbon", "Lunsad", "Macamot", "Mahabang Parang", "Malakaban", "Mambog", "Pag-asa", "Palangoy", "Pantok", "Pila Pila",
          "Pinagdilawan", "Pipindan", "Rayap", "San Carlos", "Sapang", "Tabon", "Tagpos", "Tatala", "Tayuman"
        ],
        "Cainta": [
          "San Andres", "San Isidro", "San Juan", "San Roque", "Santa Rosa", "Santo Domingo", "Santo Niño"
        ],
        "Cardona": [
          "Balibago", "Boor", "Calahan", "Dalig", "Del Remedio", "Iglesia", "Lambac", "Looc", "Malanggam-Calubacan", "Nagsulo",
          "Navotas", "Patunhay", "Real", "Sampad", "San Roque", "Subay", "Ticulio", "Tuna"
        ],
        "Jalajala": [
          "Bagumbong", "Bayugo", "Lubo", "Paalaman", "Pagkalinawan", "Palaypalay", "Punta", "Second District", "Sipsipin",
          "Special District", "Third District"
        ],
        "Morong": [
          "Bombongan", "Can-Cal-Lan", "Lagundi", "Maybancal", "San Guillermo", "San Jose", "San Juan", "San Pedro"
        ],
        "Pililla": [
          "Bagumbayan", "Halayhayin", "Hulo", "Imatong", "Malaya", "Niogan", "Quisao", "Takungan", "Wawa"
        ],
        "Rodriguez": [
          "Balite", "Burgos", "Geronimo", "Macabud", "Manggahan", "Mascap", "Puray", "Rosario", "San Isidro", "San Jose",
          "San Rafael"
        ],
        "San Mateo": [
          "Ampid I", "Ampid II", "Banaba", "Dulong Bayan 1", "Dulong Bayan 2", "Guinayang", "Guitnang Bayan I", "Guitnang Bayan II",
          "Gulod Malaya", "Malanday", "Maly", "Pintong Bocawe", "Santa Ana", "Santo Niño", "Silangan"
        ],
        "Tanay": [
          "Cayabu", "Cuyambay", "Daraitan", "Katipunan-Bayan", "Kaybuto", "Laiban", "Madilay-dilay", "Mag-Ampon", "Mamuyao",
          "Pinagkamaligan", "Plaza Aldea", "Sampaloc", "San Andres", "San Isidro", "Santa Inez", "Santo Niño", "Tabing Ilog",
          "Tandang Kutyo", "Tinucan", "Wawa"
        ],
        "Taytay": [
          "Dolores", "Muzon", "San Isidro", "San Juan", "Santa Ana"
        ],
        "Teresa": [
          "Bagumbayan", "Calumpang Santo Cristo", "Dalig", "Dulumbayan", "May-iba", "Poblacion", "Prinza", "San Gabriel", "San Roque"
        ]
      }

    },
    "Romblon": {
      cities: {
        "Alcantara": [
          "Bagsik", "Bonlao", "Calagonsao", "Camili", "Camod-om", "Gui-ob", "Lawan", "Madalag", "Poblacion", "San Isidro",
          "San Roque", "Tugdan"
        ],
        "Banton": [
          "Balogo", "Banice", "Hambi-an", "Lagang", "Libtong", "Mainit", "Nabalay", "Nasunogan", "Poblacion", "Sibay",
          "Tan-ag", "Toctoc", "Togbongan", "Togong", "Tumalum", "Tungonan", "Yabawon"
        ],
        "Cajidiocan": [
          "Alibagon", "Cambajao", "Cambalo", "Cambijang", "Cantagda", "Danao", "Gutivan", "Lico", "Lumbang Este", "Lumbang Weste",
          "Marigondon", "Poblacion", "Sugod", "Taguilos"
        ],
        "Calatrava": [
          "Balogo", "Linao", "Pagsangahan", "Pangulo", "Poblacion", "San Roque", "Talisay"
        ],
        "Concepcion": [
          "Bachawan", "Calabasahan", "Dalajican", "Masadya", "Masudsud", "Poblacion", "Sampong", "San Pedro", "San Vicente"
        ],
        "Corcuera": [
          "Alegria", "Ambulong", "Colongcolong", "Gobon", "Guintiguiban", "Ilijan", "Labnig", "Mabini", "Mahaba", "Mangansag",
          "Poblacion", "San Agustin", "San Roque", "San Vicente", "Tacasan"
        ],
        "Ferrol": [
          "Agnonoc", "Bunsoran", "Claro M. Recto", "Hinaguman", "Poblacion", "Tubigon"
        ],
        "Looc": [
          "Agojo", "Balatucan", "Buenavista", "Camandao", "Guinhayaan", "Limon Norte", "Limon Sur", "Manhac", "Pili", "Poblacion",
          "Punta", "Tuguis"
        ],
        "Magdiwang": [
          "Agsao", "Agutay", "Ambulong", "Dulangan", "Ipil", "Jao-asan", "Poblacion", "Silum", "Tampayan"
        ],
        "Odiongan": [
          "Amatong", "Anahao", "Bangon", "Batiano", "Budiong", "Canduyong", "Dapawan", "Gabawan", "Libertad", "Ligaya",
          "Liwanag", "Liwayway", "Malilico", "Mayha", "Panique", "Pato-o", "Poctoy", "Progreso Este", "Progreso Weste", "Rizal",
          "Tabing Dagat", "Tabobo-an", "Tuburan", "Tulay", "Tumingad"
        ],
        "Romblon": [
          "Agbaluto", "Agbudia", "Agnaga", "Agnay", "Agnipa", "Agpanabat", "Agtongo", "Alad", "Bagacay", "Barangay I",
          "Barangay II", "Barangay III", "Barangay IV", "Cajimos", "Calabogo", "Capaclan", "Cobrador", "Ginablan", "Guimpingan",
          "Ilauran", "Lamao", "Li-o", "Logbon", "Lonos", "Lunas", "Macalas", "Mapula", "Palje", "Sablayan", "Sawang", "Tambac"
        ],
        "San Agustin": [
          "Bachawan", "Binongahan", "Binugusan", "Buli", "Cabolutan", "Cagbuaya", "Camantaya", "Carmen", "Cawayan", "Doña Juana",
          "Dubduban", "Lusong", "Mahabang Baybay", "Poblacion", "Sugod"
        ],
        "San Andres": [
          "Agpudlos", "Calunacon", "Doña Trinidad", "Juncarlo", "Linawan", "Mabini", "Marigondon Norte", "Marigondon Sur", "Matutuna",
          "Pag-alad", "Poblacion", "Tan-agan", "Victoria"
        ],
        "San Fernando": [
          "Agtiwa", "Azarga", "Campalingo", "Canjalon", "España", "Mabini", "Mabulo", "Otod", "Panangcalan", "Pili", "Poblacion",
          "Taclobo"
        ],
        "San Jose": [
          "Busay", "Combot", "Lanas", "Pinamihagan", "Poblacion"
        ],
        "Santa Fe": [
          "Agmanic", "Canyayo", "Danao Norte", "Danao Sur", "Guinbirayan", "Guintigbasan", "Magsaysay", "Mat-i", "Pandan", "Poblacion",
          "Tabugon"
        ],
        "Santa Maria": [
          "Bonga", "Concepcion Norte", "Concepcion Sur", "Paroyhog", "San Isidro", "Santo Niño"
        ]
      }

    }, "Samar": {
      cities: {
        "Almagro": [
          "Bacjao", "Biasong I", "Biasong II", "Costa Rica", "Costa Rica II", "Guin-ansan", "Imelda",
          "Kerikite", "Lunang I", "Lunang II", "Mabuhay", "Magsaysay", "Malobago", "Marasbaras",
          "Panjobjoban I", "Panjobjoban II", "Poblacion", "Roño", "San Isidro", "San Jose", "Talahid",
          "Tonga-tonga", "Veloso"
        ],
        "Basey": [
          "Amandayehan", "Anglit", "Bacubac", "Balante", "Baloog", "Basiao", "Baybay", "Binongtu-an",
          "Buenavista", "Bulao", "Burgos", "Buscada", "Cambayan", "Can-abay", "Cancaiyas", "Canmanila",
          "Catadman", "Cogon", "Del Pilar", "Dolongan", "Guintigui-an", "Guirang", "Iba", "Inuntan",
          "Lawa-an", "Loog", "Loyo", "Mabini", "Magallanes", "Manlilinab", "May-it", "Mercado",
          "Mongabong", "New San Agustin", "Nouvelas Occidental", "Old San Agustin", "Palaypay",
          "Panugmonon", "Pelit", "Roxas", "Salvacion", "San Antonio", "San Fernando", "Sawa", "Serum",
          "Sugca", "Sugponon", "Sulod", "Tinaogan", "Tingib", "Villa Aurora"
        ],
        "Calbayog": [
          "Acedillo", "Aguit-itan", "Alibaba", "Amampacang", "Anislag", "Awang East", "Awang West", "Ba-ay",
          "Bagacay", "Bagong Lipunan", "Baja", "Balud", "Bante", "Bantian", "Basud", "Bayo", "Begaho",
          "Binaliw", "Bontay", "Buenavista", "Bugtong", "Cabacungan", "Cabatuan", "Cabicahan", "Cabugawan",
          "Cacaransan", "Cag-anahaw", "Cag-anibong", "Cag-olango", "Cagbanayacao", "Cagbayang", "Cagbilwang",
          "Cagboborac", "Caglanipao Sur", "Cagmanipes Norte", "Cagmanipes Sur", "Cagnipa", "Cagsalaosao",
          "Cahumpan", "Calocnayan", "Cangomaod", "Canhumadac", "Capacuhan", "Capoocan", "Carayman", "Carmen",
          "Catabunan", "Caybago", "Central", "Cogon", "Dagum", "Danao I", "Danao II", "Dawo", "De Victoria",
          "Dinabongan", "Dinagan", "Dinawacan", "Esperanza", "Gabay", "Gadgaran", "Gasdo", "Geraga-an",
          "Guimbaoyan Norte", "Guimbaoyan Sur", "Guin-on", "Hamorawon", "Helino", "Hibabngan", "Hibatang",
          "Higasaan", "Himalandrog", "Hugon Rosales", "Jacinto", "Jimautan", "Jose A. Roño", "Kalilihan",
          "Kilikili", "La Paz", "Langoyon", "Lapaan", "Libertad", "Limarayon", "Longsob", "Lonoy", "Looc",
          "Mabini I", "Mabini II", "Macatingog", "Mag-ubay", "Maguino-o", "Malaga", "Malajog", "Malayog",
          "Malopalo", "Mancol", "Mantaong", "Manuel Barral, Sr.", "Marcatubig", "Matobato", "Mawacat",
          "Maybog", "Maysalong", "Migara", "Nabang", "Naga", "Naguma", "Navarro", "Nijaga", "Oboob", "Obrero",
          "Olera", "Oquendo", "Osmeña", "Pagbalican", "Palanas", "Palanogan", "Panlayahan", "Panonongan",
          "Panoypoy", "Patong", "Payahan", "Peña", "Pilar", "Pinamorotan", "Quezon", "Rawis", "Rizal I",
          "Rizal II", "Roxas I", "Roxas II", "Saljag", "Salvacion", "San Antonio", "San Isidro", "San Joaquin",
          "San Jose", "San Policarpio", "San Rufino", "Saputan", "Sigo", "Sinantan", "Sinidman Occidental",
          "Sinidman Oriental", "Tabawan", "Talahiban", "Tanval", "Tapa-e", "Tarabucan", "Tigbe", "Tinambacan Norte",
          "Tinambacan Sur", "Tinaplacan", "Tomaliguez", "Trinidad", "Victory", "Villahermosa"
        ],
        "Calbiga": [
          "Antol", "Bacyaran", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5",
          "Barangay 6", "Barangay 7", "Barobaybay", "Beri", "Binanggaran", "Borong", "Bulao", "Buluan",
          "Caamlongan", "Calayaan", "Calingonan", "Canbagtic", "Canticum", "Daligan", "Guinbanga", "Hindang",
          "Hubasan", "Literon", "Lubang", "Macaalan", "Mahangcao", "Malabal", "Minata", "Otoc", "Panayuran",
          "Pasigay", "Patong", "Polangi", "Rawis", "San Ignacio", "San Mauricio", "Sinalangtan", "Timbangan",
          "Tinago"
        ],
        "Catbalogan": [
          "Albalate", "Bagongon", "Bangon", "Basiao", "Buluan", "Bunuanan", "Cabugawan", "Cagudalo",
          "Cagusipan", "Cagutian", "Cagutsan", "Canhawan Gote", "Canlapwas", "Cawayan", "Cinco",
          "Darahuway Daco", "Darahuway Gote", "Estaka", "Guindaponan", "Guinsorongan", "Ibol", "Iguid",
          "Lagundi", "Libas", "Lobo", "Manguehay", "Maulong", "Mercedes", "Mombon", "Muñoz", "New Mahayag",
          "Old Mahayag", "Palanyogon", "Pangdan", "Payao", "Poblacion 1", "Poblacion 10", "Poblacion 11",
          "Poblacion 12", "Poblacion 13", "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5",
          "Poblacion 6", "Poblacion 7",
          "Poblacion 8",
          "Poblacion 9",
          "Pupua",
          "Rama",
          "San Andres",
          "San Pablo",
          "San Roque",
          "San Vicente",
          "Silanga",
          "Socorro",
          "Totoringon"
        ],
        "Daram": [
          "Arawane",
          "Astorga",
          "Bachao",
          "Baclayan",
          "Bagacay",
          "Daram Bayog",
          "Betaug",
          "Birawan",
          "Bono-anon",
          "Buenavista",
          "Burgos",
          "Cabac",
          "Cabil-isan",
          "Cabiton-an",
          "Cabugao",
          "Cagboboto",
          "Calawan-an",
          "Cambuhay",
          "Campelipa",
          "Candugue",
          "Canloloy",
          "Cansaganay",
          "Casab-ahan",
          "Guindapunan",
          "Guintampilan",
          "Iquiran",
          "Jacopon",
          "Losa",
          "Lucob-lucob",
          "Mabini",
          "Macalpe",
          "Mandoyucan",
          "Marupangdan",
          "Mayabay",
          "Mongolbongol",
          "Nipa",
          "Parasan",
          "Poblacion 1",
          "Poblacion 2",
          "Poblacion 3",
          "Pondang",
          "Poso",
          "Real",
          "Rizal",
          "San Antonio",
          "San Jose",
          "San Miguel",
          "San Roque",
          "San Vicente",
          "Saugan",
          "So-ong",
          "Sua",
          "Sugod",
          "Talisay",
          "Tugas",
          "Ubo",
          "Valles-Bello",
          "Yangta"
        ],
        "Gandara": [
          "Adela Heights",
          "Arong",
          "Balocawe",
          "Bangahon",
          "Beslig",
          "Buao",
          "Bunyagan",
          "Burabod I",
          "Burabod II",
          "Calirocan",
          "Canhumawid",
          "Caparangasan",
          "Caranas",
          "Carmona",
          "Casab-ahan",
          "Casandig",
          "Catorse de Agosto",
          "Caugbusan",
          "Concepcion",
          "Diaz",
          "Dumalo-ong",
          "Elcano",
          "Gerali",
          "Gereganan",
          "Giaboc",
          "Hampton",
          "Hetebac",
          "Himamaloto",
          "Hinayagan",
          "Hinugacan",
          "Hiparayan",
          "Jasminez",
          "Lungib",
          "Mabuhay",
          "Macugo",
          "Malayog",
          "Marcos",
          "Minda",
          "Nacube",
          "Nalihugan",
          "Napalisan",
          "Natimonan",
          "Ngoso",
          "Palambrag",
          "Palanas",
          "Pizarro",
          "Piñaplata",
          "Pologon",
          "Purog",
          "Rawis",
          "Rizal",
          "Samoyao",
          "San Agustin",
          "San Antonio",
          "San Enrique",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Miguel",
          "San Pelayo",
          "San Ramon",
          "Santa Elena",
          "Santo Niño",
          "Senibaran",
          "Sidmon",
          "Tagnao",
          "Tambongan",
          "Tawiran",
          "Tigbawon"
        ],
        "Hinabangan": [
          "Bagacay",
          "Binobucalan",
          "Bucalan",
          "Cabalagnan",
          "Cabang",
          "Canano",
          "Concord",
          "Consolabao",
          "Dalosdoson",
          "Fatima",
          "Lim-ao",
          "Malihao",
          "Mugdo",
          "Osmeña",
          "Poblacion 1",
          "Poblacion 2",
          "Rawis",
          "San Jose",
          "San Rafael",
          "Tabay",
          "Yabon"
        ],
        "Jiabong": [
          "Barangay No. 1",
          "Barangay No. 2",
          "Barangay No. 3",
          "Barangay No. 4",
          "Barangay No. 5",
          "Barangay No. 6",
          "Barangay No. 7",
          "Barangay No. 8",
          "Bawang",
          "Bugho",
          "Camarobo-an",
          "Candayao",
          "Cantongtong",
          "Casapa",
          "Catalina",
          "Cristina",
          "Dogongan",
          "Garcia",
          "Hinaga",
          "Jia-an",
          "Jidanao",
          "Lulugayan",
          "Macabetas",
          "Malino",
          "Malobago",
          "Mercedes",
          "Nagbac",
          "Parina",
          "Salvacion",
          "San Andres",
          "San Fernando",
          "San Miguel",
          "Tagbayaon",
          "Victory"
        ],
        "Marabut": [
          "Amambucale",
          "Amantillo",
          "Binukyahan",
          "Caluwayan",
          "Canyoyo",
          "Catato Poblacion",
          "Ferreras",
          "Legaspi",
          "Lipata",
          "Logero",
          "Mabuhay",
          "Malobago",
          "Odoc",
          "Osmeña",
          "Panan-awan",
          "Pinalanga",
          "Pinamitinan",
          "Roño",
          "San Roque",
          "Santa Rita",
          "Santo Niño Poblacion",
          "Tagalag",
          "Tinabanan",
          "Veloso"
        ],
        "Matuguinao": [
          "Angyap",
          "Bag-otan",
          "Barruz",
          "Camonoan",
          "Carolina",
          "Deit",
          "Del Rosario",
          "Inubod",
          "Libertad",
          "Ligaya",
          "Mabuligon Poblacion",
          "Maduroto Poblacion",
          "Mahanud",
          "Mahayag",
          "Nagpapacao",
          "Rizal",
          "Salvacion",
          "San Isidro",
          "San Roque",
          "Santa Cruz"
        ],
        "Motiong": [
          "Angyap",
          "Barayong",
          "Bayog",
          "Beri",
          "Bonga",
          "Calantawan",
          "Calapi",
          "Caluyahan",
          "Canatuan",
          "Candomacol",
          "Canvais",
          "Capaysagan",
          "Caranas",
          "Caulayanan",
          "Hinica-an",
          "Inalad",
          "Linonoban",
          "Malobago",
          "Malonoy",
          "Mararangsi",
          "Maypange",
          "New Minarog",
          "Oyandic",
          "Pamamasan",
          "Poblacion I",
          "Poblacion I-A",
          "Pusongan",
          "San Andres",
          "Santo Niño",
          "Sarao"
        ],
        "Pagsanghan": [
          "Bangon",
          "Buenos Aires",
          "Calanyugan",
          "Caloloma",
          "Cambaye",
          "Canlapwas",
          "Libertad",
          "Pañge",
          "San Luis",
          "Santo Niño",
          "Viejo",
          "Villahermosa Occidental",
          "Villahermosa Oriental"
        ],
        "Paranas": [
          "Anagasi",
          "Apolonia",
          "Bagsa",
          "Balbagan",
          "Bato",
          "Buray",
          "Cantaguic",
          "Cantao-an",
          "Cantato",
          "Casandig I",
          "Casandig II",
          "Cawayan",
          "Concepcion",
          "Jose Roño",
          "Lawaan I",
          "Lawaan II",
          "Lipata",
          "Lokilokon",
          "Mangcal",
          "Maylobe",
          "Minarog",
          "Nawi",
          "Pabanog",
          "Paco",
          "Pagsa-ogan",
          "Pagsanjan",
          "Patag",
          "Pequit",
          "Poblacion 1",
          "Poblacion 2",
          "Poblacion 3",
          "Poblacion 4",
          "Poblacion 5",
          "Poblacion 6",
          "Salay",
          "San Isidro", "Santo Niño", "Sulopan", "Tabucan", "Tapul", "Tenani", "Tigbawon", "Tula", "Tutubigan"
        ],
        "Pinabacdao": [
          "Bangon", "Barangay I", "Barangay II", "Botoc", "Bugho", "Calampong", "Canlobo", "Catigawan",
          "Dolores", "Lale", "Lawaan", "Laygayon", "Layo", "Loctob", "Madalunot", "Magdawat", "Mambog",
          "Manaing", "Nabong", "Obayan", "Pahug", "Parasanon", "Pelaon", "San Isidro"
        ],
        "San Jorge": [
          "Anquiana", "Aurora", "Bay-ang", "Blanca Aurora", "Buenavista I", "Buenavista II", "Bulao", "Bungliw",
          "Cabugao", "Cag-olo-olo", "Calundan", "Cantaguic", "Canyaki", "Cogtoto-og", "Erenas", "Gayondato",
          "Guadalupe", "Guindapunan", "Hernandez", "Himay", "Janipon", "La Paz", "Libertad", "Lincoro", "Mabuhay",
          "Mancol", "Matalud", "Mobo-ob", "Mombon", "Puhagan", "Quezon", "Ranera", "Rawis", "Rosalim",
          "San Isidro", "San Jorge I", "San Jorge II", "San Juan", "Sapinit", "Sinit-an", "Tomogbong"
        ],
        "San Jose de Buan": [
          "Aguingayan", "Babaclayon", "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Can-aponte",
          "Cataydongan", "Gusa", "Hagbay", "Hibaca-an", "Hiduroma", "Hilumot", "San Nicolas"
        ],
        "San Sebastian": [
          "Balogo", "Bontod", "Cabaywa", "Camanhagay", "Campiyak", "Canduyucan", "Dolores", "Hita-asan I",
          "Hita-asan II", "Inobongan", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3",
          "Poblacion Barangay 4"
        ],
        "Santa Margarita": [
          "Agrupacion", "Arapison", "Avelino", "Bahay", "Balud", "Bana-ao", "Burabod", "Cagsumji", "Campeig",
          "Camperito", "Can-ipulan", "Canmoros", "Cautod", "Cinco", "Curry", "Gajo", "Hindang", "Ilo", "Imelda",
          "Inoraguiao", "Jolacao", "Lambao", "Mabuhay", "Mahayag", "Matayonas", "Monbon", "Nabulo", "Napuro",
          "Napuro II", "Palale", "Panabatan", "Panaruan", "Roxas", "Salvacion", "Solsogon", "Sundara"
        ],
        "Santa Rita": [
          "Alegria", "Anibongan", "Aslum", "Bagolibas", "Binanalan", "Bokinggan Poblacion", "Bougainvilla Poblacion",
          "Cabacungan", "Cabunga-an", "Camayse", "Cansadong", "Caticugan", "Dampigan", "Guinbalot-an", "Gumamela Poblacion",
          "Hinangudtan", "Igang-igang", "La Paz", "Lupig", "Magsaysay", "Maligaya", "New Manunca", "Old Manunca",
          "Pagsulhogon", "Rosal Poblacion", "Salvacion", "San Eduardo", "San Isidro", "San Juan", "San Pascual", "San Pedro",
          "San Roque", "Santa Elena", "Santan Poblacion", "Tagacay", "Tominamos", "Tulay", "Union"
        ],
        "Santo Niño": [
          "Balatguti", "Baras", "Basud", "Buenavista", "Cabunga-an", "Corocawayan", "Ilijan", "Ilo", "Lobelobe",
          "Pinanangnan", "Sevilla", "Takut", "Villahermosa"
        ],
        "Tagapul-an": [
          "Baguiw", "Balocawe", "Guinbarucan", "Labangbaybay", "Luna", "Mataluto", "Nipa", "Pantalan", "Pulangbato",
          "San Jose", "San Vicente", "Suarez", "Sugod", "Trinidad"
        ],
        "Talalora": [
          "Bo. Independencia", "Malaguining", "Mallorga", "Navatas Daku", "Navatas Guti", "Placer", "Poblacion Barangay 1",
          "Poblacion Barangay 2", "San Juan", "Tatabunan", "Victory"
        ],
        "Tarangnan": [
          "Alcazar", "Awang", "Bahay", "Balonga-as", "Balugo", "Bangon Gote", "Baras", "Binalayan", "Bisitahan", "Bonga",
          "Cabunga-an", "Cagtutulo", "Cambatutay Nuevo", "Cambatutay Viejo", "Canunghan", "Catan-agan", "Dapdap",
          "Gallego", "Imelda Poblacion", "Lahong", "Libucan Dacu", "Libucan Gote", "Lucerdoni", "Majacob", "Mancares",
          "Marabut", "Oeste-A", "Oeste-B", "Pajo", "Palencia", "Poblacion A", "Poblacion B", "Poblacion C", "Poblacion D",
          "Poblacion E", "San Vicente", "Santa Cruz", "Sugod", "Talinga", "Tigdaranao", "Tizon"
        ],
        "Villareal": [
          "Banquil", "Bino-ongan", "Burabod", "Cambaguio", "Canmucat", "Central", "Conant", "Guintarcan", "Himyangan",
          "Igot", "Inarumbacan", "Inasudlan", "Lam-awan", "Lamingao", "Lawa-an", "Macopa", "Mahayag", "Malonoy",
          "Mercado", "Miramar", "Nagcaduha", "Pacao", "Pacoyoy", "Pangpang", "Patag", "Plaridel", "Polangi", "San Andres",
          "San Fernando", "San Rafael", "San Roque", "Santa Rosa", "Santo Niño", "Soledad", "Tayud", "Tomabe", "Ulayan",
          "Villarosa Poblacion"
        ],
        "Zumarraga": [
          "Alegria", "Arteche", "Bioso", "Boblaran", "Botaera", "Buntay", "Camayse", "Canwarak", "Ibarra", "Lumalantang",
          "Macalunod", "Maga-an", "Maputi", "Marapilit", "Monbon", "Mualbual", "Pangdan", "Poblacion 1", "Poblacion 2",
          "Poro", "San Isidro", "Sugod", "Talib", "Tinaugan", "Tubigan"
        ]
      }

    },
    "Sarangani": {
      cities: {
        "Alabel": [
          "Alegria", "Bagacay", "Baluntay", "Datal Anggas", "Domolok", "Kawas", "Ladol", "Maribulan",
          "Pag-asa", "Paraiso", "Poblacion", "Spring", "Tokawal"
        ],
        "Glan": [
          "Baliton", "Batotuling", "Batulaki", "Big Margus", "Burias", "Cablalan", "Calabanit", "Calpidong",
          "Congan", "Cross", "Datalbukay", "E. Alegado", "Glan Padidu", "Gumasa", "Ilaya", "Kaltuad", "Kapatan",
          "Lago", "Laguimit", "Mudan", "New Aklan", "Pangyan", "Poblacion", "Rio del Pilar", "San Jose", "San Vicente",
          "Small Margus", "Sufatubo", "Taluya", "Tango", "Tapon"
        ],
        "Kiamba": [
          "Badtasan", "Datu Dani", "Gasi", "Kapate", "Katubao", "Kayupo", "Kling", "Lagundi", "Lebe", "Lomuyon",
          "Luma", "Maligang", "Nalus", "Poblacion", "Salakit", "Suli", "Tablao", "Tamadang", "Tambilil"
        ],
        "Maasim": [
          "Amsipit", "Bales", "Colon", "Daliao", "Kabatiol", "Kablacan", "Kamanga", "Kanalo", "Lumasal",
          "Lumatil", "Malbang", "Nomoh", "Pananag", "Poblacion", "Seven Hills", "Tinoto"
        ],
        "Maitum": [
          "Bati-an", "Kalaneg", "Kalaong", "Kiambing", "Kiayap", "Mabay", "Maguling", "Malalag", "Mindupok",
          "New La Union", "Old Poblacion", "Pangi", "Pinol", "Sison", "Ticulab", "Tuanadatu", "Upo", "Wali", "Zion"
        ],
        "Malapatan": [
          "Daan Suyan", "Kihan", "Kinam", "Libi", "Lun Masla", "Lun Padidu", "Patag", "Poblacion", "Sapu Masla",
          "Sapu Padidu", "Tuyan", "Upper Suyan"
        ],
        "Malungon": [
          "Alkikan", "Ampon", "Atlae", "B'Laan", "Banahaw", "Banate", "Datal Batong", "Datal Bila", "Datal Tampal",
          "J. P. Laurel", "Kawayan", "Kibala", "Kiblat", "Kinabalan", "Lower Mainit", "Lutay", "Malabod",
          "Malalag Cogon", "Malandag", "Malungon Gamay", "Nagpan", "Panamin", "Poblacion", "San Juan", "San Miguel",
          "San Roque", "Talus", "Tamban", "Upper Biangan", "Upper Lumabat", "Upper Mainit"
        ]
      }

    },
    "Siquijor": {
      cities: {
        "Enrique Villanueva": [
          "Balolong", "Bino-ongan", "Bitaug", "Bolot", "Camogao", "Cangmangki", "Libo", "Lomangcapan",
          "Lotloton", "Manan-ao", "Olave", "Parian", "Poblacion", "Tulapos"
        ],
        "Larena": [
          "Bagacay", "Balolang", "Basac", "Bintangan", "Bontod", "Cabulihan", "Calunasan", "Candigum",
          "Cang-allas", "Cang-apa", "Cangbagsa", "Cangmalalag", "Canlambo", "Canlasog", "Catamboan", "Helen",
          "Nonoc", "North Poblacion", "Ponong", "Sabang", "Sandugan", "South Poblacion", "Taculing"
        ],
        "Lazi": [
          "Campalanas", "Cangclaran", "Cangomantong", "Capalasanan", "Catamboan", "Gabayan", "Kimba",
          "Kinamandagan", "Lower Cabangcalan", "Nagerong", "Po-o", "Simacolong", "Tagmanocan", "Talayong",
          "Tigbawan", "Tignao", "Upper Cabangcalan", "Ytaya"
        ],
        "Maria": [
          "Bogo", "Bonga", "Cabal-asan", "Calunasan", "Candaping A", "Candaping B", "Cantaroc A", "Cantaroc B",
          "Cantugbas", "Lico-an", "Lilo-an", "Logucan", "Looc", "Minalulan", "Nabutay", "Olang", "Pisong A",
          "Pisong B", "Poblacion Norte", "Poblacion Sur", "Saguing", "Sawang"
        ],
        "San Juan": [
          "Canasagan", "Candura", "Cangmunag", "Cansayang", "Catulayan", "Lala-o", "Maite", "Napo",
          "Paliton", "Poblacion", "Solangon", "Tag-ibo", "Tambisan", "Timbaon", "Tubod"
        ],
        "Siquijor": [
          "Banban", "Bolos", "Caipilan", "Caitican", "Calalinan", "Canal", "Candanay Norte", "Candanay Sur",
          "Cang-adieng", "Cang-agong", "Cang-alwang", "Cang-asa", "Cang-atuyom", "Cang-inte", "Cang-isad",
          "Canghunoghunog", "Cangmatnog", "Cangmohao", "Cantabon", "Caticugan", "Dumanhog", "Ibabao",
          "Lambojon", "Luyang", "Luzong", "Olo", "Pangi", "Panlautan", "Pasihagon", "Pili", "Poblacion",
          "Polangyuta", "Ponong", "Sabang", "San Antonio", "Songculan", "Tacdog", "Tacloban", "Tambisan",
          "Tebjong", "Tinago", "Tongo"
        ]
      }

    }, "Sorsogon": {
      cities: {
        "Barcelona": [
          "Alegria", "Bagacay", "Bangate", "Bugtong", "Cagang", "Fabrica", "Jibong", "Lago", "Layog",
          "Luneta", "Macabari", "Mapapac", "Olandia", "Paghaluban", "Poblacion Central", "Poblacion Norte",
          "Poblacion Sur", "Putiao", "San Antonio", "San Isidro", "San Ramon", "San Vicente", "Santa Cruz",
          "Santa Lourdes", "Tagdon"
        ],
        "Bulan": [
          "A. Bonifacio", "Abad Santos", "Aguinaldo", "Antipolo", "Beguin", "Benigno S. Aquino", "Bical", "Bonga",
          "Butag", "Cadandanan", "Calomagon", "Calpi", "Cocok-Cabitan", "Daganas", "Danao", "Dolos", "E. Quirino",
          "Fabrica", "G. del Pilar", "Gate", "Inararan", "J. Gerona", "J. P. Laurel", "Jamorawon", "Lajong", "Libertad",
          "M. Roxas", "Magsaysay", "Managanaga", "Marinab", "Montecalvario", "N. Roque", "Namo", "Nasuje", "Obrero",
          "Osmeña", "Otavi", "Padre Diaz", "Palale", "Quezon", "R. Gerona", "Recto", "Sagrada", "San Francisco",
          "San Isidro", "San Juan Bag-o", "San Juan Daan", "San Rafael", "San Ramon", "San Vicente", "Santa Remedios",
          "Santa Teresita", "Sigad", "Somagongsong", "Taromata", "Zone I Poblacion", "Zone II Poblacion", "Zone III Poblacion",
          "Zone IV Poblacion", "Zone V Poblacion", "Zone VI Poblacion", "Zone VII Poblacion", "Zone VIII Poblacion"
        ],
        "Bulusan": [
          "Bagacay", "Central", "Cogon", "Dancalan", "Dapdap", "Lalud", "Looban", "Mabuhay", "Madlawon", "Poctol",
          "Porog", "Sabang", "Salvacion", "San Antonio", "San Bernardo", "San Francisco", "San Isidro", "San Jose",
          "San Rafael", "San Roque", "San Vicente", "Santa Barbara", "Sapngan", "Tinampo"
        ],
        "Casiguran": [
          "Adovis", "Boton", "Burgos", "Casay", "Cawit", "Central", "Cogon", "Colambis", "Escuala", "Inlagadian",
          "Lungib", "Mabini", "Ponong", "Rizal", "San Antonio", "San Isidro", "San Juan", "San Pascual", "Santa Cruz",
          "Somal-ot", "Tigbao", "Timbayog", "Tiris", "Trece Martirez", "Tulay"
        ],
        "Castilla": [
          "Amomonting", "Bagalayag", "Bagong Sirang", "Bonga", "Buenavista", "Burabod", "Caburacan", "Canjela",
          "Cogon", "Cumadcad", "Dangcalan", "Dinapa", "La Union", "Libtong", "Loreto", "Macalaya", "Maracabac", "Mayon",
          "Maypangi", "Milagrosa", "Miluya", "Monte Carmelo", "Oras", "Pandan", "Poblacion", "Quirapi", "Saclayan",
          "Salvacion", "San Isidro", "San Rafael", "San Roque", "San Vicente", "Sogoy", "Tomalaytay"
        ],
        "Donsol": [
          "Alin", "Awai", "Banban", "Bandi", "Banuang Gurang", "Baras", "Bayawas", "Bororan Barangay 1", "Cabugao",
          "Central Barangay 2", "Cristo", "Dancalan", "De Vera", "Gimagaan", "Girawan", "Gogon", "Gura", "Juan Adre", "Lourdes",
          "Mabini", "Malapoc", "Malinao", "Market Site Barangay 3", "New Maguisa", "Ogod", "Old Maguisa", "Orange",
          "Pangpang", "Parina", "Pawala", "Pinamanaan", "Poso Poblacion", "Punta Waling-Waling Poblacion", "Rawis",
          "San Antonio", "San Isidro", "San Jose", "San Rafael", "San Ramon", "San Vicente", "Santa Cruz", "Sevilla",
          "Sibago", "Suguian", "Tagbac", "Tinanogan", "Tongdol", "Tres Marias", "Tuba", "Tupas", "Vinisitahan"
        ],
        "Gubat": [
          "Ariman", "Bagacay", "Balud del Norte", "Balud del Sur", "Benguet", "Bentuco", "Beriran", "Buenavista",
          "Bulacao", "Cabigaan", "Cabiguhan", "Carriedo", "Casili", "Cogon", "Cota na Daco", "Dita", "Jupi", "Lapinig",
          "Luna-Candol", "Manapao", "Manook", "Naagtan", "Nato", "Nazareno", "Ogao", "Paco", "Panganiban", "Paradijon",
          "Patag", "Payawin", "Pinontingan", "Rizal", "San Ignacio", "Sangat", "Santa Ana", "Tabi", "Tagaytay", "Tigkiw",
          "Tiris", "Togawe", "Union", "Villareal"
        ],
        "Irosin": [
          "Bacolod", "Bagsangan", "Batang", "Bolos", "Buenavista", "Bulawan", "Carriedo", "Casini", "Cawayan", "Cogon",
          "Gabao", "Gulang-Gulang", "Gumapia", "Liang", "Macawayan", "Mapaso", "Monbon", "Patag", "Salvacion", "San Agustin",
          "San Isidro", "San Juan", "San Julian", "San Pedro", "Santo Domingo", "Tabon-Tabon", "Tinampo", "Tongdol"
        ],
        "Juban": [
          "Anog", "Aroroy", "Bacolod", "Binanuahan", "Biriran", "Buraburan", "Calateo", "Calmayon", "Carohayon", "Catanagan",
          "Catanusan", "Cogon", "Embarcadero", "Guruyan", "Lajong", "Maalo", "North Poblacion", "Puting Sapa", "Rangas",
          "Sablayan", "Sipaya", "South Poblacion", "Taboc", "Tinago", "Tughan"
        ],
        "Magallanes": [
          "Aguada Norte", "Aguada Sur", "Anibong", "Bacalon", "Bacolod", "Banacud", "Behia", "Biga", "Binisitahan del Norte",
          "Binisitahan del Sur", "Biton", "Bulala", "Busay", "Caditaan", "Cagbolo", "Cagtalaba", "Cawit Extension",
          "Cawit Proper", "Ginangra", "Hubo", "Incarizan", "Lapinig", "Magsaysay", "Malbog", "Pantalan", "Pawik", "Pili",
          "Poblacion", "Salvacion", "Santa Elena", "Siuton", "Tagas", "Tulatula Norte", "Tulatula Sur"
        ],
        "Matnog": [
          "Balocawe", "Banogao", "Banuangdaan", "Bariis", "Bolo", "Bon-ot Big", "Bon-ot Small", "Cabagahan", "Calayuan",
          "Calintaan", "Caloocan", "Calpi", "Camachiles", "Camcaman", "Coron-coron", "Culasi", "Gadgaron", "Genablan Occidental",
          "Genablan Oriental", "Hidhid", "Laboy", "Lajong", "Mambajog", "Manjunlad", "Manurabi", "Naburacan",
          "Paghuliran", "Pangi", "Pawa", "Poropandan", "Santa Isabel", "Sinalmacan", "Sinang-atan", "Sinibaran",
          "Sisigon", "Sua", "Sulangan", "Tablac", "Tabunan", "Tugas"
        ],
        "Pilar": [
          "Abas", "Abucay", "Bantayan", "Banuyo", "Bayasong", "Bayawas", "Binanuahan", "Cabiguan", "Cagdongon",
          "Calongay", "Calpi", "Catamlangan", "Comapo-capo", "Danlog", "Dao", "Dapdap", "Del Rosario", "Esmerada",
          "Esperanza", "Ginablan", "Guiron", "Inang", "Inapugan", "Leona", "Lipason", "Lourdes", "Lubiano", "Lumbang",
          "Lungib", "Mabanate", "Malbog", "Marifosque", "Mercedes", "Migabod", "Naspi", "Palanas", "Pangpang", "Pinagsalog",
          "Pineda", "Poctol", "Pudo", "Putiao", "Sacnangan", "Salvacion", "San Antonio (Millabas)", "San Antonio (Sapa)",
          "San Jose", "San Rafael", "Santa Fe"
        ],
        "Prieto Diaz": [
          "Brillante", "Bulawan", "Calao", "Carayat", "Diamante", "Gogon", "Lupi", "Maningcay de Oro", "Manlabong",
          "Perlas", "Quidolog", "Rizal", "San Antonio", "San Fernando", "San Isidro", "San Juan", "San Rafael", "San Ramon",
          "Santa Lourdes", "Santo Domingo", "Talisayan", "Tupaz", "Ulag"
        ],
        "Santa Magdalena": [
          "Barangay Poblacion I", "Barangay Poblacion II", "Barangay Poblacion III", "Barangay Poblacion IV", "La Esperanza",
          "Peñafrancia", "Salvacion", "San Antonio", "San Bartolome", "San Eugenio", "San Isidro", "San Rafael", "San Roque",
          "San Sebastian"
        ],
        "Sorsogon City": [
          "Abuyog", "Almendras-Cogon", "Balete", "Balogo (Bacon District)", "Balogo (Sorsogon East District)", "Barayong",
          "Basud", "Bato", "Bibincahan", "Bitan-o/Dalipay", "Bogña", "Bon-ot", "Bucalbucalan", "Buenavista",
          "Buenavista (Bacon District)", "Buhatan", "Bulabog", "Burabod", "Cabarbuhan", "Cabid-an", "Cambulaga", "Capuy",
          "Caricaran", "Del Rosario", "Gatbo", "Gimaloto", "Guinlajon", "Jamislagan", "Macabog", "Maricrum", "Marinas",
          "Osiao", "Pamurayan", "Pangpang", "Panlayaan", "Peñafrancia", "Piot", "Poblacion", "Polvorista", "Rawis",
          "Rizal", "Salog", "Salvacion", "Salvacion (Bacon District)", "Sampaloc", "San Isidro", "San Isidro (Bacon District)",
          "San Juan (Bacon District)", "San Juan (Roro)", "San Pascual", "San Ramon", "San Roque", "San Vicente",
          "Santa Cruz", "Santa Lucia", "Santo Domingo", "Santo Niño", "Sawanga", "Sirangan", "Sugod", "Sulucan", "Talisay",
          "Ticol", "Tugos"
        ]
      }

    },
    "South Cotabato": {
      cities: {
        "Banga": [
          "Benitez", "Cabudian", "Cabuling", "Cinco", "Derilon", "El Nonok", "Improgo Village", "Kusan", "Lam-apos",
          "Lamba", "Lambingi", "Lampari", "Liwanay", "Malaya", "Punong Grande", "Rang-ay", "Reyes", "Rizal",
          "Rizal Poblacion", "San Jose", "San Vicente", "Yangco Poblacion"
        ],
        "Koronadal": [
          "Assumption", "Avanceña", "Cacub", "Caloocan", "Carpenter Hill", "Concepcion", "Esperanza",
          "General Paulino Santos", "Mabini", "Magsaysay", "Mambucal", "Morales", "Namnama", "New Pangasinan",
          "Paraiso", "Rotonda", "San Isidro", "San Jose", "San Roque", "Santa Cruz", "Santo Niño", "Sarabia",
          "Zone I", "Zone II", "Zone III", "Zone IV", "Zulueta"
        ],
        "Lake Sebu": [
          "Bacdulong", "Denlag", "Halilan", "Hanoon", "Klubi", "Lake Lahit", "Lamcade", "Lamdalag", "Lamfugon",
          "Lamlahak", "Lower Maculan", "Luhib", "Ned", "Poblacion", "Siluton", "Takunel", "Talisay", "Tasiman",
          "Upper Maculan"
        ],
        "Norala": [
          "Benigno Aquino, Jr.", "Dumaguil", "Esperanza", "Kibid", "Lapuz", "Liberty", "Lopez Jaena", "Matapol",
          "Poblacion", "Puti", "San Jose", "San Miguel", "Simsiman", "Tinago"
        ],
        "Polomolok": [
          "Bentung", "Cannery Site", "Crossing Palkan", "Glamang", "Kinilis", "Klinan 6", "Koronadal Proper",
          "Lam-Caliaf", "Landan", "Lapu", "Lumakil", "Magsaysay", "Maligo", "Pagalungan", "Palkan", "Poblacion",
          "Polo", "Rubber", "Silway 7", "Silway 8", "Sulit", "Sumbakil", "Upper Klinan"
        ],
        "Santo Niño": [
          "Ambalgan", "Guinsang-an", "Katipunan", "Manuel Roxas", "Panay", "Poblacion", "Sajaneba", "San Isidro",
          "San Vicente", "Teresita"
        ],
        "Surallah": [
          "Buenavista", "Canahay", "Centrala", "Colongulo", "Dajay", "Duengas", "Lambontong", "Lamian", "Lamsugod",
          "Libertad", "Little Baguio", "Moloy", "Naci", "Talahik", "Tubiala", "Upper Sepaka", "Veterans"
        ],
        "T'Boli": [
          "Aflek", "Afus", "Basag", "Datal Bob", "Desawo", "Dlanag", "Edwards", "Kematu", "Laconon", "Lambangan",
          "Lambuling", "Lamhako", "Lamsalome", "Lemsnolon", "Maan", "Malugong", "Mongocayo", "New Dumangas", "Poblacion",
          "Salacafe", "Sinolon", "T'bolok", "Talcon", "Talufo", "Tudok"
        ],
        "Tampakan": [
          "Albagan", "Buto", "Danlag", "Kipalbig", "Lambayong", "Lampitak", "Liberty", "Maltana", "Palo", "Poblacion",
          "Pula-bato", "San Isidro", "Santa Cruz", "Tablu"
        ],
        "Tantangan": [
          "Bukay Pait", "Cabuling", "Dumadalig", "Libas", "Magon", "Maibo", "Mangilala", "New Cuyapo", "New Iloilo",
          "New Lambunao", "Poblacion", "San Felipe", "Tinongcop"
        ],
        "Tupi": [
          "Acmonan", "Bololmala", "Bunao", "Cebuano", "Crossing Rubber", "Kablon", "Kalkam", "Linan", "Lunen",
          "Miasong", "Palian", "Poblacion", "Polonuling", "Simbo", "Tubeng"
        ]
      }

    },
    "Southern Leyte": {
      cities: {
        "Anahawan": [
          "Amagusan", "Calintaan", "Canlabian", "Capacuhan", "Cogon", "Kagingkingan", "Lewing", "Lo-ok", "Mahalo",
          "Mainit", "Manigawong", "Poblacion", "San Vicente", "Tagup-on"
        ],
        "Bontoc": [
          "Anahao", "Banahao", "Baugo", "Beniton", "Buenavista", "Bunga", "Casao", "Catmon", "Catoogan", "Cawayanan",
          "Dao", "Divisoria", "Esperanza", "Guinsangaan", "Hibagwan", "Hilaan", "Himakilo", "Hitawos", "Lanao",
          "Lawgawan", "Mahayahay", "Malbago", "Mauylab", "Olisihan", "Paku", "Pamahawan", "Pamigsian", "Pangi",
          "Poblacion", "Pong-on", "Sampongon", "San Ramon", "San Vicente", "Santa Cruz", "Santo Niño", "Taa",
          "Talisay", "Taytagan", "Tuburan", "Union"
        ],
        "Hinunangan": [
          "Ambacon", "Badiangon", "Bangcas A", "Bangcas B", "Biasong", "Bugho", "Calag-itan", "Calayugan", "Calinao",
          "Canipaan", "Catublian", "Ilaya", "Ingan", "Labrador", "Libas", "Lumbog", "Manalog", "Manlico", "Matin-ao",
          "Nava", "Nueva Esperanza", "Otama", "Palongpong", "Panalaron", "Patong", "Poblacion", "Pondol", "Salog",
          "Salvacion", "San Pablo Island", "San Pedro Island", "Santo Niño I", "Santo Niño II", "Tahusan", "Talisay",
          "Tawog", "Toptop", "Tuburan", "Union", "Upper Bantawon"
        ],
        "Hinundayan": [
          "Amaga", "Ambao", "An-an", "Baculod", "Biasong", "Bugho", "Cabulisan", "Cat-iwing", "District I",
          "District II", "District III", "Hubasan", "Lungsodaan", "Navalita", "Plaridel", "Sabang", "Sagbok"
        ],
        "Libagon": [
          "Biasong", "Bogasong", "Cawayan", "Gakat", "Jubas", "Magkasag", "Mayuga", "Nahaong", "Nahulid", "Otikon",
          "Pangi", "Punta", "Talisay", "Tigbao"
        ],
        "Liloan": [
          "Amaga", "Anilao", "Bahay", "Cagbungalon", "Calian", "Caligangan", "Candayuman", "Catig", "Estela", "Fatima",
          "Gud-an", "Guintoylan", "Himayangan", "Ilag", "Magaupas", "Malangsa", "Molopolo", "Pandan", "Poblacion",
          "Pres. Quezon", "President Roxas", "San Isidro", "San Roque", "Tabugon"
        ],
        "Limasawa": [
          "Cabulihan", "Lugsongan", "Magallanes", "San Agustin", "San Bernardo", "Triana"
        ],
        "Maasin": [
          "Abgao", "Acasia", "Asuncion", "Bactul I", "Bactul II", "Badiang", "Bagtican", "Basak", "Bato I", "Bato II",
          "Batuan", "Baugo", "Bilibol", "Bogo", "Cabadiangan", "Cabulihan", "Cagnituan", "Cambooc", "Cansirong", "Canturing", "Canyuom",
          "Combado", "Dongon", "Gawisan", "Guadalupe", "Hanginan", "Hantag", "Hinapu Daku", "Hinapu Gamay", "Ibarra",
          "Isagani", "Laboon", "Lanao", "Lib-og", "Libertad", "Libhu", "Lonoy", "Lunas", "Mahayahay", "Malapoc Norte",
          "Malapoc Sur", "Mambajao", "Manhilo", "Mantahan", "Maria Clara", "Matin-ao", "Nasaug", "Nati", "Nonok Norte",
          "Nonok Sur", "Panan-awan", "Pansaan", "Pasay", "Pinascohan", "Rizal", "San Agustin", "San Isidro", "San Jose",
          "San Rafael", "Santa Cruz", "Santa Rosa", "Santo Niño", "Santo Rosario", "Soro-soro", "Tagnipa", "Tam-is",
          "Tawid", "Tigbawan", "Tomoy-tomoy", "Tunga-tunga"
        ],
        "Macrohon": [
          "Aguinaldo", "Amparo", "Asuncion", "Bagong Silang", "Buscayan", "Cambaro", "Canlusay", "Danao", "Flordeliz",
          "Guadalupe", "Ichon", "Ilihan", "Laray", "Lower Villa Jacinta", "Mabini", "Mohon", "Molopolo", "Rizal", "Salvador",
          "San Isidro", "San Joaquin", "San Roque", "San Vicente", "San Vicente Poblacion", "Santa Cruz", "Santo Niño",
          "Santo Rosario", "Sindangan", "Upper Ichon", "Upper Villa Jacinta"
        ],
        "Malitbog": [
          "Abgao", "Asuncion", "Aurora", "Benit", "Caaga", "Cabul-anonan", "Cadaruhan", "Cadaruhan Sur", "Candatag",
          "Cantamuac", "Caraatan", "Concepcion", "Fatima", "Guinabonan", "Iba", "Juangon", "Kauswagan", "Lambonao", "Mahayahay",
          "Maningning", "Maujo", "New Katipunan", "Pancil", "Pasil", "Sabang", "San Antonio", "San Isidro", "San Jose",
          "San Roque", "San Vicente", "Sangahon", "Santa Cruz", "Santo Niño", "Taliwa", "Tigbawan I", "Tigbawan II", "Timba"
        ],
        "Padre Burgos": [
          "Buenavista", "Bunga", "Cantutang", "Dinahugan", "Laca", "Lungsodaan", "Poblacion", "San Juan", "Santa Sofia",
          "Santo Rosario", "Tangkaan"
        ],
        "Pintuyan": [
          "Badiang", "Balongbalong", "Buenavista", "Bulawan", "Canlawis", "Catbawan", "Caubang", "Cogon", "Dan-an", "Lobo",
          "Mainit", "Manglit", "Nueva Estrella Norte", "Nueva Estrella Sur", "Poblacion Ibabao", "Poblacion Ubos",
          "Pociano D. Equipilag", "Ponod", "San Roque", "Santa Cruz", "Son-ok I", "Son-ok II", "Tautag"
        ],
        "Saint Bernard": [
          "Atuyan", "Ayahag", "Bantawon", "Bolodbolod", "Cabagawan", "Carnaga", "Catmon", "Guinsaugon", "Himatagon", "Himbangan", "Himos-onan", "Hinabian", "Hindag-an", "Kauswagan", "Libas", "Lipanto", "Magatas",
          "Magbagacay", "Mahayag", "Mahayahay", "Malibago", "Malinao", "Nueva Esperanza", "Panian", "San Isidro",
          "Santa Cruz", "Sug-angon", "Tabontabon", "Tambis I", "Tambis II"
        ],
        "San Francisco": [
          "Anislagon", "Bongawisan", "Bongbong", "Cahayag", "Causi", "Central", "Dakit", "Gabi", "Habay", "Malico",
          "Marayag", "Napantao", "Pasanon", "Pinamudlan", "Punta", "Santa Cruz", "Santa Paz Norte", "Santa Paz Sur",
          "Sudmon", "Tinaan", "Tuno", "Ubos"
        ],
        "San Juan": [
          "Agay-ay", "Basak", "Bobon A", "Bobon B", "Dayanog", "Garrido", "Minoyho", "Osao", "Pong-oy", "San Jose",
          "San Roque", "San Vicente", "Santa Cruz", "Santa Filomena", "Santo Niño", "Somoje", "Sua", "Timba"
        ],
        "San Ricardo": [
          "Benit", "Bitoon", "Cabutan", "Camang", "Esperanza", "Esperanza Dos", "Inolinan", "Kinachawa", "Looc", "Pinut-an",
          "Poblacion", "San Antonio", "San Ramon", "Saub", "Timba"
        ],
        "Silago": [
          "Balagawan", "Catmon", "Hingatungan", "Imelda", "Katipunan", "Laguma", "Mercedes", "Poblacion District I",
          "Poblacion District II", "Puntana", "Salvacion", "Sap-ang", "Sudmon", "Tuba-on", "Tubod"
        ],
        "Sogod": [
          "Benit", "Buac Daku", "Buac Gamay", "Cabadbaran", "Concepcion", "Consolacion", "Dagsa", "Hibod-hibod",
          "Hindangan", "Hipantag", "Javier", "Kahupian", "Kanangkaan", "Kauswagan", "La Purisima Concepcion", "Libas",
          "Lum-an", "Mabicay", "Mac", "Magatas", "Mahayahay", "Malinao", "Maria Plana", "Milagroso", "Olisihan",
          "Pancho Villa", "Pandan", "Rizal", "Salvacion", "San Francisco Mabuhay", "San Isidro", "San Jose", "San Juan",
          "San Miguel", "San Pedro", "San Roque", "San Vicente", "Santa Maria", "Suba", "Tampoong", "Zone I", "Zone II",
          "Zone III", "Zone IV", "Zone V"
        ],
        "Tomas Oppus": [
          "Anahawan", "Banday", "Biasong", "Bogo", "Cabascan", "Camansi", "Cambite", "Canlupao", "Carnaga", "Cawayan",
          "Higosoan", "Hinagtikan", "Hinapo", "Hugpa", "Iniguihan Poblacion", "Looc", "Luan", "Maanyag", "Mag-ata", "Mapgap",
          "Maslog", "Ponong", "Rizal", "San Agustin", "San Antonio", "San Isidro", "San Miguel", "San Roque", "Tinago"
        ]
      }

    }, "Sultan Kudarat": {
      cities: {
        "Bagumbayan": [
          "Bai Sarifinang", "Biwang", "Busok", "Chua", "Daguma", "Daluga", "Kabulanan", "Kanulay", "Kapaya", "Kinayao",
          "Masiag", "Monteverde", "Poblacion", "Santo Niño", "Sison", "South Sepaka", "Sumilil", "Titulok", "Tuka"
        ],
        "Columbio": [
          "Bantangan", "Datablao", "Eday", "Elbebe", "Lasak", "Libertad", "Lomoyon", "Makat", "Maligaya", "Mayo",
          "Natividad", "Poblacion", "Polomolok", "Sinapulan", "Sucob", "Telafas"
        ],
        "Esperanza": [
          "Ala", "Daladap", "Dukay", "Guiamalia", "Ilian", "Kangkong", "Laguinding", "Magsaysay", "Margues", "New Panay",
          "Numo", "Paitan", "Pamantingan", "Poblacion", "Sagasa", "Salabaca", "Saliao", "Salumping", "Villamor"
        ],
        "Isulan": [
          "Bambad", "Bual", "D'Lotilla", "Dansuli", "Impao", "Kalawag I", "Kalawag II", "Kalawag III", "Kenram", "Kolambog",
          "Kudanding", "Lagandang", "Laguilayan", "Mapantig", "New Pangasinan", "Sampao", "Tayugo"
        ],
        "Kalamansig": [
          "Bantogon", "Cadiz", "Datu Ito Andong", "Datu Wasay", "Dumangas Nuevo", "Hinalaan", "Limulan", "Nalilidan", "Obial",
          "Pag-asa", "Paril", "Poblacion", "Sabanal", "Sangay", "Santa Maria"
        ],
        "Lambayong": [
          "Caridad", "Didtaras", "Gansing", "Kabulakan", "Kapingkong", "Katitisan", "Lagao", "Lilit", "Madanding", "Maligaya",
          "Mamali", "Matiompong", "Midtapok", "New Cebu", "Palumbi", "Pidtiguian", "Pimbalayan", "Pinguiaman", "Poblacion",
          "Sadsalan", "Seneben", "Sigayan", "Tambak", "Tinumigues", "Tumiao", "Udtong"
        ],
        "Lebak": [
          "Aurelio F. Freires", "Barurao", "Barurao II", "Basak", "Bolebok", "Bululawan", "Capilan", "Christiannuevo", "Datu Karon",
          "Kalamongog", "Keytodac", "Kinodalan", "New Calinog", "Nuling", "Pansud", "Pasandalan", "Poblacion", "Poblacion III",
          "Poloy-poloy", "Purikay", "Ragandang", "Salaman", "Salangsang", "Taguisa", "Tibpuan", "Tran", "Villamonte"
        ],
        "Lutayan": [
          "Antong", "Bayasong", "Blingkong", "Lutayan Proper", "Maindang", "Mamali", "Manili", "Palavilla", "Sampao", "Sisiman",
          "Tamnag"
        ],
        "Palimbang": [
          "Akol", "Badiangon", "Baliango", "Balwan", "Bambanen", "Baranayan", "Barongis", "Batang-baglas", "Butril", "Colobe",
          "Datu Maguiales", "Domolol", "Kabuling", "Kalibuhan", "Kanipaan", "Kidayan", "Kiponget", "Kisek", "Kraan", "Kulong-kulong",
          "Langali", "Libua", "Ligao", "Lopoken", "Lumitan", "Maganao", "Maguid", "Malatuneng", "Malisbong", "Medol", "Milbuk",
          "Mina", "Molon", "Namat Masla", "Napnapon", "Poblacion", "San Roque", "Tibuhol", "Wal", "Wasag"
        ],
        "President Quirino": [
          "Bagumbayan", "Bannawag", "Bayawa", "C. Mangilala", "Estrella", "Kalanawe I", "Kalanawe II", "Katico", "Malingon",
          "Mangalen", "Pedtubo", "Poblacion", "Romualdez", "San Jose", "San Pedro", "Sinakulay", "Suben", "Tinaungan", "Tual"
        ],
        "Senator Ninoy Aquino": [
          "Banali", "Basag", "Buenaflores", "Bugso", "Buklod", "Gapok", "Kadi", "Kapatagan", "Kiadsam", "Kuden", "Kulaman",
          "Lagubang", "Langgal", "Limuhay", "Malegdeg", "Midtungok", "Nati", "Sewod", "Tacupis", "Tinalon"
        ],
        "Tacurong": [
          "Baras", "Buenaflor", "Calean", "Carmen", "D'Ledesma", "Enrique JC Montilla", "Kalandagan", "Lancheta", "New Isabela",
          "New Lagao", "New Passi", "Poblacion", "Rajah Nuda", "San Antonio", "San Emmanuel", "San Pablo", "San Rafael", "Tina",
          "Upper Katungal", "Virginia Griño"
        ]
      }

    },
    "Sulu": {
      cities: {
        "Banguingui": [
          "Bakkaan", "Bangalaw", "Danao", "Dungon", "Kahikukuk", "Luuk", "North Paarol", "Sigumbal", "South Paarol",
          "Tabialan", "Tainga-Bakkao", "Tambun-bun", "Tattalan", "Tinutungan"
        ],
        "Hadji Panglima Tahil": [
          "Bangas", "Bubuan", "Kabuukan", "Pag-asinan", "Teomabal"
        ],
        "Indanan": [
          "Adjid", "Bangalan", "Bato-bato", "Buanza", "Bud-Taran", "Bunut", "Jati-Tunggal", "Kabbon Maas", "Kagay",
          "Kajatian", "Kan Islam", "Kandang Tukay", "Karawan", "Katian", "Kuppong", "Lambayong", "Langpas", "Licup",
          "Malimbaya", "Manggis", "Manilop", "Paligue", "Panabuan", "Panglima Misuari", "Pasil", "Poblacion", "Sapah Malaum",
          "Sawaki", "Sionogan", "Tagbak", "Timbangan", "Tubig Dakulah", "Tubig Parang", "Tumantangis"
        ],
        "Jolo": [
          "Alat", "Asturias", "Bus-bus", "Chinese Pier", "San Raymundo", "Takut-takut", "Tulay", "Walled City"
        ],
        "Kalingalan Caluang": [
          "Kambing", "Kanlagay", "Karungdong", "Masjid Bayle", "Masjid Punjungan", "Pang", "Pangdan Pangdan", "Pitogo", "Tunggol"
        ],
        "Lugus": [
          "Alu Bus-Bus", "Alu-Duyong", "Bas Lugus", "Gapas Rugasan", "Gapas Tubig Tuwak", "Huwit-huwit Bas Nonok",
          "Huwit-huwit Proper", "Kutah Parang", "Laha", "Larap", "Lugus Proper", "Mangkallay", "Mantan", "Pait",
          "Parian Kayawan", "Sibul", "Tingkangan"
        ],
        "Luuk": [
          "Bual", "Guimbaun", "Kan-Bulak", "Kan-Mindus", "Lambago", "Lianutan", "Lingah", "Mananti", "Niog-niog", "Tandu-Bato",
          "Tubig-Puti", "Tulayan Island"
        ],
        "Maimbung": [
          "Anak Jati", "Bato Ugis", "Bualo Lahi", "Bualo Lipid", "Bulabog", "Duhol Kabbon", "Gulangan", "Ipil", "Kandang",
          "Kapok-Punggol", "Kulasi", "Labah", "Lagasan Asibih", "Lantong", "Lapa", "Laud Kulasi", "Laum Maimbung",
          "Lower Tambaking", "Lunggang", "Matatal", "Patao", "Poblacion", "Ratag Limbon", "Tabu-Bato", "Tandu Patong",
          "Tubig-Samin", "Upper Tambaking"
        ],
        "Old Panamao": [
          "Asin", "Bakud", "Bangday", "Baunoh", "Bitanag", "Bud Seit", "Bulangsi", "Datag", "Kamalig", "Kan Asaali",
          "Kan Ukol", "Kan-Dayok", "Kan-Sipat", "Kawasan", "Kulay-kulay", "Lakit", "Lower Patibulan", "Lunggang", "Parang", "Pugad Manaul",
          "Puhagan", "Seit Higad", "Seit Lake", "Su-uh", "Tabu Manuk", "Tandu-tandu", "Tayungan", "Tinah", "Tubig Gantang",
          "Tubig Jati", "Upper Patibulan"
        ],
        "Omar": [
          "Andalan", "Angilan", "Capual Island", "Huwit-huwit", "Lahing-Lahing", "Niangkaan", "Sucuban", "Tangkuan"
        ],
        "Pandami": [
          "Baligtang", "Bud Sibaud", "Hambilan", "Kabbon", "Lahi", "Lapak", "Laud Sibaud", "Malanta", "Mamanok", "North Manubul",
          "Parian Dakula", "Sibaud Proper", "Siganggang", "South Manubul", "Suba-suba", "Tenga Manubul"
        ],
        "Panglima Estino": [
          "Gagguil", "Gata-gata", "Jinggan", "Kamih-Pungud", "Lihbug Kabaw", "Likbah", "Lubuk-lubuk", "Marsada", "Paiksa",
          "Pandakan", "Punay", "Tiptipon"
        ],
        "Pangutaran": [
          "Alu Bunah", "Bangkilay", "Kawitan", "Kehi Niog", "Lantong Babag", "Lumah Dapdap", "Pandan Niog", "Panducan", "Panitikan",
          "Patutol", "Se-ipang", "Simbahan", "Suang Bunah", "Tonggasang", "Tubig Nonok", "Tubig Sallang"
        ],
        "Parang": [
          "Alu Layag-Layag", "Alu Pangkoh", "Bagsak", "Bawisan", "Biid", "Bukid", "Buli Bawang", "Buton", "Buton Mahablo", "Danapa",
          "Duyan Kabao", "Gimba Lagasan", "Kaha", "Kahoy Sinah", "Kanaway", "Kutah Sairap", "Lagasan Higad", "Lanao Dakula",
          "Laum Buwahan", "Laum Suwah", "Liang", "Linuho", "Lipunos", "Lower Sampunay", "Lumbaan Mahaba", "Lungan Gitong",
          "Lupa Abu", "Nonokan", "Paugan", "Payuhan", "Piyahan", "Poblacion", "Saldang", "Sampunay", "Silangkan", "Taingting",
          "Tikong", "Tukay", "Tumangas", "Wanni Piyanjihan"
        ],
        "Pata": [
          "Andalan", "Daungdong", "Kamawi", "Kanjarang", "Kayawan", "Kiput", "Likud", "Luuk-tulay", "Niog-niog", "Patian",
          "Pisak-pisak", "Saimbangon", "Sangkap", "Timuddas"
        ],
        "Patikul": [
          "Anuling", "Bakong", "Bangkal", "Bonbon", "Buhanginan", "Bungkaung", "Danag", "Gandasuli", "Igasan", "Kabbon Takas",
          "Kadday Mampallam", "Kan Ague", "Kaunayan", "Langhub", "Latih", "Liang", "Maligay", "Mauboh", "Pangdanon", "Panglayahan", "Pansul",
          "Patikul Higad", "Sandah", "Taglibi", "Tandu-Bagua", "Tanum", "Taung", "Timpok", "Tugas", "Umangay"
        ],
        "Siasi": [
          "Bakud", "Buan", "Bulansing Tara", "Bulihkullul", "Campo Islam", "Duggo", "Duhol Tara", "East Kungtad",
          "East Sisangat", "Ipil", "Jambangan", "Kabubu", "Kong-Kong Laminusa", "Kud-kud", "Kungtad West", "Latung",
          "Luuk Laminusa", "Luuk Tara", "Manta", "Minapan", "Nipa-nipa", "North Laud", "North Manta", "North Musu Laud",
          "North Silumpak", "Pislong", "Poblacion", "Punungan", "Puukan Laminusa", "Ratag", "Sablay", "Sarukot", "Siburi",
          "Singko", "Siolakan", "Siowing", "Sipanding", "Sisangat", "Siundoh", "South Musu Laud", "South Silumpak",
          "Southwestern Bulikullul", "Subah Buaya", "Tampakan Laminusa", "Tengah Laminusa", "Tong Laminusa", "Tong-tong",
          "Tonglabah", "Tubig Kutah", "Tulling"
        ],
        "Talipao": [
          "Andalan", "Bagsak", "Bandang", "Bilaan", "Bud Bunga", "Buntod", "Buroh", "Dalih", "Gata", "Kabatuhan Bilaan",
          "Kabatuhan Tiis", "Kabungkol", "Kagay", "Kahawa", "Kandaga", "Kanlibot", "Kiutaan", "Kuhaw", "Kulamboh", "Kuttong",
          "Lagtoh", "Lambanah", "Liban", "Liu-Bud Pantao", "Lower Binuang", "Lower Kamuntayan", "Lower Laus", "Lower Sinumaan",
          "Lower Talipao", "Lumbayao", "Lumping Pigih Daho", "Lungkiaban", "Mabahay", "Mahala", "Mampallam", "Marsada",
          "Mauboh", "Mungit-mungit", "Niog-Sangahan", "Pantao", "Samak", "Talipao Proper", "Tampakan", "Tiis", "Tinggah",
          "Tubod", "Tuyang", "Upper Binuang", "Upper Kamuntayan", "Upper Laus", "Upper Sinumaan", "Upper Talipao"
        ],
        "Tapul": [
          "Alu-Kabingaan", "Banting", "Hawan", "Kalang", "Kamaunggi", "Kanaway", "Kanmangon", "Kaumpang", "Pagatpat",
          "Pangdan", "Puok", "Sayli", "Sumambat", "Tangkapaan", "Tulakan"
        ]
      }

    },
    "Surigao del Norte": {
      cities: {
        "Alegria": [
          "Alipao", "Anahaw", "Budlingin", "Camp Eduard", "Ferlda", "Gamuton", "Julio Ouano", "Ombong", "Poblacion",
          "Pongtud", "San Juan", "San Pedro"
        ],
        "Bacuag": [
          "Cabugao", "Cambuayon", "Campo", "Dugsangon", "Pautao", "Payapag", "Poblacion", "Pungtod", "Santo Rosario"
        ],
        "Burgos": [
          "Baybay", "Bitaug", "Matin-ao", "Poblacion 1", "Poblacion 2", "San Mateo"
        ],
        "Claver": [
          "Bagakay", "Cabugo", "Cagdianao", "Daywan", "Hayanggabon", "Ladgaron", "Lapinigan", "Magallanes", "Panatao",
          "Sapa", "Taganito", "Tayaga", "Urbiztondo", "Wangke"
        ],
        "Dapa": [
          "Bagakay", "Barangay 1", "Barangay 10", "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 2", "Barangay 3",
          "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Buenavista", "Cabawa",
          "Cambas-ac", "Consolacion", "Corregidor", "Dagohoy", "Don Paulino", "Jubang", "Montserrat", "Osmeña", "San Carlos",
          "San Miguel", "Santa Fe", "Santa Felomina", "Union"
        ],
        "Del Carmen": [
          "Antipolo", "Bagakay", "Bitoon", "Cabugao", "Cancohoy", "Caub", "Del Carmen", "Domoyog", "Esperanza", "Halian",
          "Jamoyaon", "Katipunan", "Lobogon", "Mabuhay", "Mahayahay", "Quezon", "San Fernando", "San Jose", "Sayak", "Tuboran"
        ],
        "General Luna": [
          "Anajawan", "Cabitoonan", "Catangnan", "Consuelo", "Corazon", "Daku", "La Januza", "Libertad", "Magsaysay",
          "Malinao", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", "Poblacion V", "Santa Cruz", "Santa Fe",
          "Suyangan", "Tawin-tawin"
        ],
        "Gigaquit": [
          "Alambique", "Anibongan", "Cam-boayon", "Camam-onan", "Ipil", "Lahi", "Mahanub", "Poniente", "San Antonio",
          "San Isidro", "Sico-sico", "Villaflor", "Villafranca"
        ],
        "Mainit": [
          "Binga", "Bobona-on", "Cantugas", "Dayano", "Mabini", "Magpayang", "Magsaysay", "Mansayao", "Marayag", "Matin-ao",
          "Paco", "Quezon", "Roxas", "San Francisco", "San Isidro", "San Jose", "Siana", "Silop", "Tagbuyawan", "Tapi-an",
          "Tolingon"
        ],
        "Malimono": [
          "Bunyasan", "Cagtinae", "Can-aga", "Cansayong", "Cantapoy", "Cayawan", "Doro", "Hanagdong", "Karihatag", "Masgad",
          "Pili", "San Isidro", "Tinago", "Villariza"
        ],
        "Pilar": [
          "Asinan", "Caridad", "Centro", "Consolacion", "Datu", "Dayaohay", "Jaboy", "Katipunan", "Maasin", "Mabini",
          "Mabuhay", "Pilaring", "Punta", "Salvacion", "San Roque"
        ],
        "Placer": [
          "Amoslog", "Anislagan", "Bad-as", "Boyongan", "Bugas-bugas", "Central", "Ellaperal", "Ipil", "Lakandula", "Mabini",
          "Macalaya", "Magsaysay", "Magupange", "Pananay-an", "Panhutongan", "San Isidro", "Sani-sani", "Santa Cruz",
          "Suyoc", "Tagbongabong"
        ],
        "San Benito": [
          "Bongdo", "Maribojoc", "Nuevo Campo", "San Juan", "Santa Cruz", "Talisay"
        ],
        "San Francisco": [
          "Amontay", "Balite", "Banbanon", "Diaz", "Honrado", "Jubgan", "Linongganan", "Macopa", "Magtangale", "Oslao",
          "Poblacion"
        ],
        "San Isidro": [
          "Buhing Calipay", "Del Carmen", "Del Pilar", "Macapagal", "Pacifico", "Pelaez", "Roxas", "San Miguel", "Santa Paz",
          "Santo Niño", "Tambacan", "Tigasao"
        ],
        "Santa Monica": [
          "Abad Santos", "Alegria", "Bailan", "Garcia", "Libertad", "Mabini", "Mabuhay", "Magsaysay", "Rizal", "T. Arlan",
          "Tangbo"
        ],
        "Sison": [
          "Biyabid", "Gacepan", "Ima", "Lower Patag", "Mabuhay", "Mayag", "Poblacion", "San Isidro", "San Pablo", "Tagbayani",
          "Tinogpahan", "Upper Patag"
        ],
        "Socorro": [
          "Albino Taruc", "Del Pilar", "Helene", "Honrado", "Navarro", "Nueva Estrella", "Pamosaingan", "Rizal", "Salog",
          "San Roque", "Santa Cruz", "Sering", "Songkoy", "Sudlon"
        ],
        "Surigao City": [
          "Alang-alang", "Alegria", "Anomar", "Aurora", "Balibayon", "Baybay", "Bilabid", "Bitaugan", "Bonifacio", "Buenavista",
          "Cabongbongan", "Cagniog", "Cagutsan", "Canlanipa", "Cantiasay", "Capalayan", "Catadman", "Danao", "Danawan",
          "Day-asan", "Ipil", "Libuac", "Lipata", "Lisondra", "Luna", "Mabini", "Mabua", "Manyagao", "Mapawa", "Mat-i", "Nabago",
          "Nonoc", "Orok", "Poctoy", "Punta Bilar", "Quezon", "Rizal", "Sabang", "San Isidro", "San Jose", "San Juan", "San Pedro",
          "San Roque", "Serna", "Sidlakan", "Silop", "Sugbay", "Sukailang", "Taft", "Talisay", "Togbongon", "Trinidad", "Washington",
          "Zaragoza"
        ],
        "Tagana-an": [
          "Aurora", "Azucena", "Banban", "Cawilan", "Fabio", "Himamaug", "Laurel", "Lower Libas", "Opong", "Patino", "Sampaguita",
          "Talavera", "Union", "Upper Libas"
        ],
        "Tubod": [
          "Capayahan", "Cawilan", "Del Rosario", "Marga", "Motorpool", "Poblacion", "San Isidro", "San Pablo", "Timamana"
        ]
      }

    }, "Surigao del Sur": {
      cities: {
        "Barobo": [
          "Amaga", "Bahi", "Cabacungan", "Cambagang", "Causwagan", "Dapdap", "Dughan", "Gamut", "Javier", "Kinayan", "Mamis", "Poblacion", "Rizal", "San Jose", "San Roque", "San Vicente", "Sua", "Sudlon", "Tambis", "Unidad", "Wakat"
        ],
        "Bayabas": [
          "Amag", "Balete", "Cabugo", "Cagbaoto", "La Paz", "Magobawok", "Panaosawon"
        ],
        "Bislig": [
          "Bucto", "Burboanan", "Caguyao", "Coleto", "Comawas", "Kahayag", "Labisma", "Lawigan", "Maharlika", "Mangagoy", "Mone", "Pamanlinan", "Pamaypayan", "Poblacion", "San Antonio", "San Fernando", "San Isidro", "San Jose", "San Roque", "San Vicente", "Santa Cruz", "Sibaroy", "Tabon", "Tumanan"
        ],
        "Cagwait": [
          "Aras-asan", "Bacolod", "Bitaugan East", "Bitaugan West", "La Purisima", "Lactudan", "Mat-e", "Poblacion", "Tawagan", "Tubo-tubo", "Unidad"
        ],
        "Cantilan": [
          "Bugsukan", "Buntalid", "Cabangahan", "Cabas-an", "Calagdaan", "Consuelo", "General Island", "Lininti-an", "Lobo", "Magasang", "Magosilom", "Pag-antayan", "Palasao", "Parang", "San Pedro", "Tapi", "Tigabong"
        ],
        "Carmen": [
          "Antao", "Cancavan", "Carmen", "Esperanza", "Hinapoyan", "Puyat", "San Vicente", "Santa Cruz"
        ],
        "Carrascal": [
          "Adlay", "Babuyan", "Bacolod", "Baybay", "Bon-ot", "Caglayag", "Dahican", "Doyos", "Embarcadero", "Gamuton", "Panikian", "Pantukan", "Saca", "Tag-Anito"
        ],
        "Cortes": [
          "Balibadon", "Burgos", "Capandan", "Mabahin", "Madrelino", "Manlico", "Matho", "Poblacion", "Tag-anongan", "Tigao", "Tuboran", "Uba"
        ],
        "Hinatuan": [
          "Baculin", "Benigno Aquino", "Bigaan", "Cambatong", "Campa", "Dugmanon", "Harip", "La Casa", "Loyola", "Maligaya", "Pagtigni-an", "Pocto", "Port Lamon", "Roxas", "San Juan", "Sasa", "Tagasaka", "Tagbobonga", "Talisay", "Tarusan", "Tidman", "Tiwi", "Zone II", "Zone III Maharlika"
        ],
        "Lanuza": [
          "Agsam", "Bocawe", "Bunga", "Gamuton", "Habag", "Mampi", "Nurcia", "Pakwan", "Sibahay", "Zone I", "Zone II", "Zone III", "Zone IV"
        ],
        "Lianga": [
          "Anibongan", "Ban-as", "Banahao", "Baucawe", "Diatagon", "Ganayon", "Liatimco", "Manyayay", "Payasan", "Poblacion", "Saint Christine", "San Isidro", "San Pedro"
        ],
        "Lingig": [
          "Anibongan", "Barcelona", "Bogak", "Bongan", "Handamayan", "Mahayahay", "Mandus", "Mansa-ilao", "Pagtila-an", "Palo Alto", "Poblacion", "Rajah Cabungso-an", "Sabang", "Salvacion", "San Roque", "Tagpoporan", "Union", "Valencia"
        ],
        "Madrid": [
          "Bagsac", "Bayogo", "Linibonan", "Magsaysay", "Manga", "Panayogon", "Patong Patong", "Quirino", "San Antonio", "San Juan", "San Roque", "San Vicente", "Songkit", "Union"
        ],
        "Marihatag": [
          "Alegria", "Amontay", "Antipolo", "Arorogan", "Bayan", "Mahaba", "Mararag", "Poblacion", "San Antonio", "San Isidro", "San Pedro", "Santa Cruz"
        ],
        "San Agustin": [
          "Bretania", "Buatong", "Buhisan", "Gata", "Hornasan", "Janipaan", "Kauswagan", "Oteiza", "Poblacion", "Pong-on", "Pongtod", "Salvacion", "Santo Niño"
        ],
        "San Miguel": [
          "Bagyang", "Baras", "Bitaugan", "Bolhoon", "Calatngan", "Carromata", "Castillo", "Libas Gua", "Libas Sud", "Magroyong", "Mahayag", "Patong", "Poblacion", "Sagbayan", "San Roque", "Siagao", "Tina", "Umalag"
        ],
        "Tagbina": [
          "Batunan", "Carpenito", "Doña Carmen", "Hinagdanan", "Kahayagan", "Lago", "Maglambing", "Maglatab", "Magsaysay", "Malixi", "Manambia", "Osmeña", "Poblacion", "Quezon", "San Vicente", "Santa Cruz", "Santa Fe", "Santa Juana", "Santa Maria", "Sayon", "Soriano", "Tagongon", "Trinidad", "Ugoban", "Villaverde"
        ],
        "Tago": [
          "Alba", "Anahao Bag-o", "Anahao Daan", "Badong", "Bajao", "Bangsud", "Cabangahan", "Cagdapao", "Camagong", "Caras-an", "Cayale", "Dayo-an", "Gamut", "Jubang", "Kinabigtasan", "Layog", "Lindoy", "Mercedes", "Purisima", "Sumo-sumo", "Umbay", "Unaban", "Unidos", "Victoria"
        ],
        "Tandag": [
          "Awasian", "Bagong Lungsod", "Bioto", "Bongtod Poblacion", "Buenavista", "Dagocdoc", "Mabua", "Mabuhay", "Maitum", "Maticdum", "Pandanon", "Pangi", "Quezon", "Rosario", "Salvacion", "San Agustin Norte", "San Agustin Sur", "San Antonio", "San Isidro", "San Jose", "Telaje"
        ]
      }

    },
    "Tarlac": {
      cities: {
        "Anao": [
          "Baguindoc",
          "Bantog",
          "Campos",
          "Carmen",
          "Casili",
          "Don Ramon",
          "Hernando",
          "Poblacion",
          "Rizal",
          "San Francisco East",
          "San Francisco West",
          "San Jose North",
          "San Jose South",
          "San Juan",
          "San Roque",
          "Santo Domingo",
          "Sinense",
          "Suaverdez"
        ],
        "Bamban": [
          "Anupul",
          "Banaba",
          "Bangcu",
          "Culubasa",
          "Dela Cruz",
          "La Paz",
          "Lourdes",
          "Malonzo",
          "San Nicolas",
          "San Pedro",
          "San Rafael",
          "San Roque",
          "San Vicente",
          "Santo Niño",
          "Virgen de los Remedios"
        ],
        "Camiling": [
          "Anoling 1st",
          "Anoling 2nd",
          "Anoling 3rd",
          "Bacabac",
          "Bacsay",
          "Bancay 1st",
          "Bilad",
          "Birbira",
          "Bobon 1st",
          "Bobon 2nd",
          "Bobon Caarosipan",
          "Cabanabaan",
          "Cacamilingan Norte",
          "Cacamilingan Sur",
          "Caniag",
          "Carael",
          "Cayaoan",
          "Cayasan",
          "Florida",
          "Lasong",
          "Libueg",
          "Malacampa",
          "Manakem",
          "Manupeg",
          "Marawi",
          "Matubog",
          "Nagrambacan",
          "Nagserialan",
          "Palimbo Proper",
          "Palimbo-Caarosipan",
          "Pao 1st",
          "Pao 2nd",
          "Pao 3rd",
          "Papaac",
          "Pindangan 1st",
          "Pindangan 2nd",
          "Poblacion A",
          "Poblacion B",
          "Poblacion C",
          "Poblacion D",
          "Poblacion E",
          "Poblacion F",
          "Poblacion G",
          "Poblacion H",
          "Poblacion I",
          "Poblacion J",
          "San Isidro",
          "Santa Maria",
          "Sawat",
          "Sinilian 1st",
          "Sinilian 2nd",
          "Sinilian 3rd",
          "Sinilian Cacalibosoan",
          "Sinulatan 1st",
          "Sinulatan 2nd",
          "Surgui 1st",
          "Surgui 2nd",
          "Surgui 3rd",
          "Tambugan",
          "Telbang",
          "Tuec"
        ],
        "Capas": [
          "Aranguren",
          "Bueno",
          "Cristo Rey",
          "Cubcub",
          "Cutcut 1st",
          "Cutcut 2nd",
          "Dolores",
          "Estrada",
          "Lawy",
          "Manga",
          "Manlapig",
          "Maruglu",
          "O'Donnell",
          "Santa Juliana",
          "Santa Lucia",
          "Santa Rita",
          "Santo Domingo 1st",
          "Santo Domingo 2nd",
          "Santo Rosario",
          "Talaga"
        ],
        "Concepcion": [
          "Alfonso",
          "Balutu",
          "Cafe",
          "Calius Gueco",
          "Caluluan",
          "Castillo",
          "Corazon de Jesus",
          "Culatingan",
          "Dungan",
          "Dutung-A-Matas",
          "Green Village",
          "Lilibangan",
          "Mabilog",
          "Magao",
          "Malupa",
          "Minane",
          "Panalicsian",
          "Pando",
          "Parang",
          "Parulung",
          "Pitabunan",
          "San Agustin",
          "San Antonio",
          "San Bartolome",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Juan",
          "San Martin",
          "San Nicolas",
          "San Nicolas Balas",
          "San Vicente",
          "Santa Cruz",
          "Santa Maria",
          "Santa Monica",
          "Santa Rita",
          "Santa Rosa",
          "Santiago",
          "Santo Cristo",
          "Santo Niño",
          "Santo Rosario",
          "Talimunduc Marimla",
          "Talimunduc San Miguel",
          "Telabanca",
          "Tinang"
        ],
        "Gerona": [
          "Abagon",
          "Amacalan",
          "Apsayan",
          "Ayson",
          "Bawa",
          "Buenlag",
          "Bularit",
          "Calayaan",
          "Carbonel",
          "Cardona",
          "Caturay",
          "Danzo", "Dicolor",
          "Don Basilio",
          "Luna",
          "Mabini",
          "Magaspac",
          "Malayep",
          "Matapitap",
          "Matayumcab",
          "New Salem",
          "Oloybuaya",
          "Padapada",
          "Parsolingan",
          "Pinasling",
          "Plastado",
          "Poblacion 1",
          "Poblacion 2",
          "Poblacion 3",
          "Quezon",
          "Rizal",
          "Salapungan",
          "San Agustin",
          "San Antonio",
          "San Bartolome",
          "San Jose",
          "Santa Lucia",
          "Santiago",
          "Sembrano",
          "Singat",
          "Sulipa",
          "Tagumbao",
          "Tangcaran",
          "Villa Paz"
        ],
        "La Paz": [
          "Balanoy",
          "Bantog-Caricutan",
          "Caramutan",
          "Caut",
          "Comillas",
          "Dumarais",
          "Guevarra",
          "Kapanikian",
          "La Purisima",
          "Lara",
          "Laungcupang",
          "Lomboy",
          "Macalong",
          "Matayumtayum",
          "Mayang",
          "Motrico",
          "Paludpud",
          "Rizal",
          "San Isidro",
          "San Roque",
          "Sierra"
        ],
        "Mayantoc": [
          "Ambalingit",
          "Baybayaoas",
          "Bigbiga",
          "Binbinaca",
          "Calabtangan",
          "Caocaoayan",
          "Carabaoan",
          "Cubcub",
          "Gayonggayong",
          "Gossood",
          "Labney",
          "Mamonit",
          "Maniniog",
          "Mapandan",
          "Nambalan",
          "Pedro L. Quines",
          "Pitombayog",
          "Poblacion Norte",
          "Poblacion Sur",
          "Rotrottooc",
          "San Bartolome",
          "San Jose",
          "Taldiapan",
          "Tangcarang"
        ],
        "Moncada": [
          "Ablang-Sapang",
          "Aringin",
          "Atencio",
          "Banaoang East",
          "Banaoang West",
          "Baquero Norte",
          "Baquero Sur",
          "Burgos",
          "Calamay",
          "Calapan",
          "Camangaan East",
          "Camangaan West",
          "Camposanto 1-Norte",
          "Camposanto 1-Sur",
          "Camposanto 2",
          "Capaoayan",
          "Lapsing",
          "Mabini",
          "Maluac",
          "Poblacion 1",
          "Poblacion 2",
          "Poblacion 3",
          "Poblacion 4",
          "Rizal",
          "San Juan",
          "San Julian",
          "San Leon",
          "San Pedro",
          "San Roque",
          "Santa Lucia East",
          "Santa Lucia West",
          "Santa Maria",
          "Santa Monica",
          "Tolega Norte",
          "Tolega Sur",
          "Tubectubang",
          "Villa"
        ],
        "Paniqui": [
          "Abogado",
          "Acocolao",
          "Aduas",
          "Apulid",
          "Balaoang",
          "Barang",
          "Brillante",
          "Burgos",
          "Cabayaoasan",
          "Canan",
          "Carino",
          "Cayanga",
          "Colibangbang",
          "Coral",
          "Dapdap",
          "Estacion",
          "Mabilang",
          "Manaois",
          "Matalapitap",
          "Nagmisaan",
          "Nancamarinan",
          "Nipaco",
          "Patalan",
          "Poblacion Norte",
          "Poblacion Sur",
          "Rang-ayan",
          "Salumague",
          "Samput",
          "San Carlos",
          "San Isidro",
          "San Juan de Milla",
          "Santa Ines",
          "Sinigpit",
          "Tablang",
          "Ventenilla"
        ],
        "Pura": [
          "Balite",
          "Buenavista",
          "Cadanglaan",
          "Estipona",
          "Linao",
          "Maasin",
          "Matindeg",
          "Maungib",
          "Naya",
          "Nilasin 1st",
          "Nilasin 2nd",
          "Poblacion 1",
          "Poblacion 2",
          "Poblacion 3",
          "Poroc",
          "Singat"
        ],
        "Ramos": [
          "Coral-Iloco",
          "Guiteb",
          "Pance",
          "Poblacion Center",
          "Poblacion North",
          "Poblacion South", "San Juan",
          "San Raymundo",
          "Toledo"
        ],
        "San Clemente": [
          "Balloc",
          "Bamban",
          "Casipo",
          "Catagudingan",
          "Daldalayap",
          "Doclong 1",
          "Doclong 2",
          "Maasin",
          "Nagsabaran",
          "Pit-ao",
          "Poblacion Norte",
          "Poblacion Sur"
        ],
        "San Jose": [
          "Burgos",
          "David",
          "Iba",
          "Labney",
          "Lawacamulag",
          "Lubigan",
          "Maamot",
          "Mababanaba",
          "Moriones",
          "Pao",
          "San Juan de Valdez",
          "Sula",
          "Villa Aglipay"
        ],
        "San Manuel": [
          "Colubot",
          "Lanat",
          "Legaspi",
          "Mangandingay",
          "Matarannoc",
          "Pacpaco",
          "Poblacion",
          "Salcedo",
          "San Agustin",
          "San Felipe",
          "San Jacinto",
          "San Miguel",
          "San Narciso",
          "San Vicente",
          "Santa Maria"
        ],
        "Santa Ignacia": [
          "Baldios",
          "Botbotones",
          "Caanamongan",
          "Cabaruan",
          "Cabugbugan",
          "Caduldulaoan",
          "Calipayan",
          "Macaguing",
          "Nambalan",
          "Padapada",
          "Pilpila",
          "Pinpinas",
          "Poblacion East",
          "Poblacion West",
          "Pugo-Cecilio",
          "San Francisco",
          "San Sotero",
          "San Vicente",
          "Santa Ines Centro",
          "Santa Ines East",
          "Santa Ines West",
          "Taguiporo",
          "Timmaguab",
          "Vargas"
        ],
        "Tarlac City": [
          "Aguso",
          "Alvindia Segundo",
          "Amucao",
          "Armenia",
          "Asturias",
          "Atioc",
          "Balanti",
          "Balete",
          "Balibago I",
          "Balibago II",
          "Balingcanaway",
          "Banaba",
          "Bantog",
          "Baras-baras",
          "Batang-batang",
          "Binauganan",
          "Bora",
          "Buenavista",
          "Buhilit",
          "Burot",
          "Calingcuan",
          "Capehan",
          "Carangian",
          "Care",
          "Central",
          "Culipat",
          "Cut-cut I",
          "Cut-cut II",
          "Dalayap",
          "Dela Paz",
          "Dolores",
          "Laoang",
          "Ligtasan",
          "Lourdes",
          "Mabini",
          "Maligaya",
          "Maliwalo",
          "Mapalacsiao",
          "Mapalad",
          "Matadero",
          "Matatalaib",
          "Paraiso",
          "Poblacion",
          "Salapungan",
          "San Carlos",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Jose de Urquico",
          "San Juan de Mata",
          "San Luis",
          "San Manuel",
          "San Miguel",
          "San Nicolas",
          "San Pablo",
          "San Pascual",
          "San Rafael",
          "San Roque",
          "San Sebastian",
          "San Vicente",
          "Santa Cruz",
          "Santa Maria",
          "Santo Cristo",
          "Santo Domingo",
          "Santo Niño",
          "Sapang Maragul",
          "Sapang Tagalog",
          "Sepung Calzada",
          "Sinait",
          "Suizo",
          "Tariji",
          "Tibag",
          "Tibagan",
          "Trinidad",
          "Ungot",
          "Villa Bacolor"
        ],
        "Victoria": [
          "Baculong",
          "Balayang",
          "Balbaloto",
          "Bangar",
          "Bantog",
          "Batangbatang",
          "Bulo",
          "Cabuluan",
          "Calibungan",
          "Canarem",
          "Cruz",
          "Lalapac",
          "Maluid",
          "Mangolago",
          "Masalasa",
          "Palacpalac",
          "San Agustin",
          "San Andres",
          "San Fernando",
          "San Francisco",
          "San Gavino",
          "San Jacinto",
          "San Nicolas",
          "San Vicente",
          "Santa Barbara",
          "Santa Lucia"
        ]
      }

    },
    "Tawi-Tawi": {
      cities: {
        "Bongao": [
          "Bongao Poblacion",
          "Ipil",
          "Kamagong",
          "Karungdong",
          "Lagasan",
          "Lakit Lakit",
          "Lamion",
          "Lapid Lapid",
          "Lato Lato",
          "Luuk Pandan",
          "Luuk Tulay",
          "Malassa",
          "Mandulan",
          "Masantong",
          "Montay Montay",
          "Nalil",
          "Pababag",
          "Pag-asa",
          "Pagasinan",
          "Pagatpat",
          "Pahut",
          "Pakias",
          "Paniongan",
          "Pasiagan",
          "Sanga-sanga",
          "Silubog",
          "Simandagit",
          "Sumangat",
          "Tarawakan",
          "Tongsinah",
          "Tubig Basag",
          "Tubig Tanah",
          "Tubig-Boh",
          "Tubig-Mampallam",
          "Ungus-ungus"
        ],
        "Languyan": [
          "Adnin",
          "Bakaw-bakaw",
          "Bakong",
          "Bas-bas Proper",
          "BasLikud",
          "Basnunuk",
          "Darussalam",
          "Jakarta",
          "Kalupag",
          "Kiniktal",
          "Languyan Proper",
          "Marang-marang",
          "Maraning",
          "Parang Pantay",
          "Sikullis",
          "Simalak",
          "Tubig Dakula",
          "Tuhog-tuhog",
          "Tumahubong",
          "Tumbagaan"
        ],
        "Mapun": [
          "Boki",
          "Duhul Batu",
          "Erok-erok",
          "Guppah",
          "Kompang",
          "Liyubud",
          "Lubbak Parang",
          "Lupa Pula",
          "Mahalo",
          "Pawan",
          "Sapa",
          "Sikub",
          "Tabulian",
          "Tanduan",
          "Umus Mataha"
        ],
        "Panglima Sugala": [
          "Balimbing Proper",
          "Batu-batu",
          "Bauno Garing",
          "Belatan Halu",
          "Buan",
          "Dungon",
          "Karaha",
          "Kulape",
          "Liyaburan",
          "Luuk Buntal",
          "Magsaggaw",
          "Malacca",
          "Parangan",
          "Sumangday",
          "Tabunan",
          "Tundon",
          "Tungbangkaw"
        ],
        "Sapa-Sapa": [
          "Baldatal Islam",
          "Butun",
          "Dalo-dalo",
          "Kohec",
          "Lakit-lakit",
          "Latuan",
          "Look Natuh",
          "Lookan Banaran",
          "Lookan Latuan",
          "Malanta",
          "Mantabuan Tabunan",
          "Nunuk Likud Sikubong",
          "Palate Gadjaminah",
          "Pamasan",
          "Sapa-sapa",
          "Sapaat",
          "Sukah-sukah",
          "Tabunan Likud Sikubong",
          "Tangngah",
          "Tapian Bohe North",
          "Tapian Bohe South",
          "Tonggusong Banaran",
          "Tup-tup Banaran"
        ],
        "Sibutu": [
          "Ambulong Sapal",
          "Datu Amilhamja Jaafar",
          "Hadji Imam Bidin",
          "Hadji Mohtar Sulayman",
          "Hadji Taha",
          "Imam Hadji Mohammad",
          "Ligayan",
          "Nunukan",
          "Sheik Makdum",
          "Sibutu",
          "Talisay",
          "Tandu Banak",
          "Taungoh",
          "Tongehat",
          "Tongsibalo",
          "Ungus-ungus"
        ],
        "Simunul": [
          "Bagid",
          "Bakong",
          "Doh-Tong",
          "Luuk Datan",
          "Manuk Mangkaw",
          "Maruwa",
          "Mongkay",
          "Pagasinan",
          "Panglima Mastul",
          "Sukah-Bulan",
          "Tampakan",
          "Timundon",
          "Tonggosong",
          "Tubig Indangan",
          "Ubol"
        ],
        "Sitangkai": [
          "Datu Baguinda Putih",
          "Imam Sapie",
          "North Larap",
          "Panglima Alari",
          "Sipangkot",
          "Sitangkai Poblacion",
          "South Larap",
          "Tongmageng",
          "Tongusong"
        ],
        "South Ubian": [
          "Babagan",
          "Bengkol",
          "Bintawlan",
          "Bohe",
          "Bubuan",
          "Bunay Bunay Center",
          "Bunay Bunay Lookan",
          "Bunay Bunay Tong",
          "East Talisay",
          "Lahad Dampong",
          "Laitan",
          "Lambi-lambian",
          "Laud",
          "Likud Dampong",
          "Likud Tabawan",
          "Nunuk",
          "Nusa",
          "Nusa-nusa",
          "Pampang",
          "Putat",
          "Sollogan",
          "Talisay",
          "Tampakan Dampong",
          "Tangngah",
          "Tinda-tindahan",
          "Tong Tampakan",
          "Tubig Dayang",
          "Tubig Dayang Center",
          "Tubig Dayang Riverside",
          "Tukkai",
          "Unas-unas"
        ],
        "Tandubas": [
          "Baliungan",
          "Ballak",
          "Butun",
          "Himbah",
          "Kakoong",
          "Kalang-kalang",
          "Kepeng",
          "Lahay-lahay",
          "Naungan",
          "Salamat",
          "Sallangan",
          "Sapa",
          "Sibakloon",
          "Silantup",
          "Tandubato",
          "Tangngah",
          "Tapian",
          "Tapian Sukah",
          "Taruk",
          "Tongbangkaw"
        ],
        "Turtle Islands": [
          "Likud Bakkao",
          "Taganak Poblacion"
        ]
      }

    }, "Zambales": {
      cities: {
        "Botolan": [
          "Bancal",
          "Bangan",
          "Batonlapoc",
          "Belbel",
          "Beneg",
          "Binuclutan",
          "Burgos",
          "Cabatuan",
          "Capayawan",
          "Carael",
          "Danacbunga",
          "Maguisguis",
          "Malomboy",
          "Mambog",
          "Moraza",
          "Nacolcol",
          "Owaog-Nibloc",
          "Paco",
          "Palis",
          "Panan",
          "Parel",
          "Paudpod",
          "Poonbato",
          "Porac",
          "San Isidro",
          "San Juan",
          "San Miguel",
          "Santiago",
          "Tampo",
          "Taugtog",
          "Villar"
        ],
        "Cabangan": [
          "Anonang",
          "Apo-apo",
          "Arew",
          "Banuambayo",
          "Cadmang-Reserva",
          "Camiling",
          "Casabaan",
          "Del Carmen",
          "Dolores",
          "Felmida-Diaz",
          "Laoag",
          "Lomboy",
          "Longos",
          "Mabanglit",
          "New San Juan",
          "San Antonio",
          "San Isidro",
          "San Juan",
          "San Rafael",
          "Santa Rita",
          "Santo Niño",
          "Tondo"
        ],
        "Candelaria": [
          "Babancal",
          "Binabalian",
          "Catol",
          "Dampay",
          "Lauis",
          "Libertador",
          "Malabon",
          "Malimanga",
          "Pamibian",
          "Panayonan",
          "Pinagrealan",
          "Poblacion",
          "Sinabacan",
          "Taposo",
          "Uacon",
          "Yamot"
        ],
        "Castillejos": [
          "Balaybay",
          "Buenavista",
          "Del Pilar",
          "Looc",
          "Magsaysay",
          "Nagbayan",
          "Nagbunga",
          "San Agustin",
          "San Jose",
          "San Juan",
          "San Nicolas",
          "San Pablo",
          "San Roque",
          "Santa Maria"
        ],
        "Iba": [
          "Amungan",
          "Bangantalinga",
          "Dirita-Baloguen",
          "Lipay-Dingin-Panibuatan",
          "Palanginan",
          "San Agustin",
          "Santa Barbara",
          "Santo Rosario",
          "Zone 1 Poblacion",
          "Zone 2 Poblacion",
          "Zone 3 Poblacion",
          "Zone 4 Poblacion",
          "Zone 5 Poblacion",
          "Zone 6 Poblacion"
        ],
        "Masinloc": [
          "Baloganon",
          "Bamban",
          "Bani",
          "Collat",
          "Inhobol",
          "North Poblacion",
          "San Lorenzo",
          "San Salvador",
          "Santa Rita",
          "Santo Rosario",
          "South Poblacion",
          "Taltal",
          "Tapuac"
        ],
        "Palauig": [
          "Alwa",
          "Bato",
          "Bulawen",
          "Cauyan",
          "East Poblacion",
          "Garreta",
          "Libaba",
          "Liozon",
          "Lipay",
          "Locloc",
          "Macarang",
          "Magalawa",
          "Pangolingan",
          "Salaza",
          "San Juan",
          "Santo Niño",
          "Santo Tomas",
          "Tition",
          "West Poblacion"
        ],
        "San Antonio": [
          "Angeles",
          "Antipolo",
          "Burgos",
          "East Dirita",
          "Luna",
          "Pundaquit",
          "Rizal",
          "San Esteban",
          "San Gregorio",
          "San Juan",
          "San Miguel",
          "San Nicolas",
          "Santiago",
          "West Dirita"
        ],
        "San Felipe": [
          "Amagna",
          "Apostol",
          "Balincaguing",
          "Farañal",
          "Feria",
          "Maloma",
          "Manglicmot",
          "Rosete",
          "San Rafael",
          "Santo Niño",
          "Sindol"
        ],
        "San Marcelino": [
          "Aglao",
          "Buhawen",
          "Burgos",
          "Central",
          "Consuelo Norte",
          "Consuelo Sur",
          "La Paz",
          "Laoag",
          "Linasin",
          "Linusungan",
          "Lucero",
          "Nagbunga",
          "Rabanes",
          "Rizal",
          "San Guillermo",
          "San Isidro",
          "San Rafael",
          "Santa Fe"
        ],
        "San Narciso": [
          "Alusiis",
          "Beddeng",
          "Candelaria",
          "Dallipawen",
          "Grullo",
          "La Paz",
          "Libertad",
          "Namatacan",
          "Natividad",
          "Omaya",
          "Paite",
          "Patrocinio",
          "San Jose",
          "San Juan",
          "San Pascual",
          "San Rafael",
          "Siminublan"
        ],
        "Santa Cruz": [
          "Babuyan",
          "Bangcol",
          "Bayto",
          "Biay",
          "Bolitoc",
          "Bulawon",
          "Canaynayan",
          "Gama",
          "Guinabon",
          "Guisguis",
          "Lipay",
          "Lomboy",
          "Lucapon North",
          "Lucapon South",
          "Malabago",
          "Naulo",
          "Pagatpat",
          "Pamonoran",
          "Poblacion North",
          "Poblacion South",
          "Sabang",
          "San Fernando",
          "Tabalong",
          "Tubotubo North",
          "Tubotubo South"
        ],
        "Subic": [
          "Aningway Sacatihan",
          "Asinan Poblacion",
          "Asinan Proper",
          "Baraca-Camachile",
          "Batiawan",
          "Calapacuan",
          "Calapandayan",
          "Cawag",
          "Ilwas",
          "Mangan-Vaca",
          "Matain",
          "Naugsol",
          "Pamatawan",
          "San Isidro",
          "Santo Tomas",
          "Wawandue"
        ]
      }

    },
    "Zamboanga del Norte": {
      cities: {
        "Baliguian": [
          "Alegria",
          "Diangas",
          "Diculom",
          "Guimotan",
          "Kauswagan",
          "Kilalaban",
          "Linay",
          "Lumay",
          "Malinao",
          "Mamad",
          "Mamawan",
          "Milidan",
          "Nonoyan",
          "Poblacion",
          "San Jose",
          "Tamao",
          "Tan-awan"
        ],
        "Dapitan": [
          "Aliguay",
          "Antipolo",
          "Aseniero",
          "Ba-ao",
          "Bagting",
          "Banbanan",
          "Banonong",
          "Barcelona",
          "Baylimango",
          "Burgos",
          "Canlucani",
          "Carang",
          "Cawa-cawa",
          "Dampalan",
          "Daro",
          "Dawo",
          "Diwa-an",
          "Guimputlan",
          "Hilltop",
          "Ilaya",
          "Kauswagan",
          "Larayan",
          "Linabo",
          "Liyang",
          "Maria Cristina",
          "Maria Uray",
          "Masidlakon",
          "Matagobtob Poblacion",
          "Napo",
          "Opao",
          "Oro",
          "Owaon",
          "Oyan",
          "Polo",
          "Potol",
          "Potungan",
          "San Francisco",
          "San Nicolas",
          "San Pedro",
          "San Vicente",
          "Santa Cruz",
          "Santo Niño",
          "Selinog",
          "Sicayab-Bucana",
          "Sigayan",
          "Sinonoc",
          "Sulangon",
          "Tag-ulo",
          "Taguilon",
          "Tamion"
        ],
        "Dipolog": [
          "Barra",
          "Biasong",
          "Central",
          "Cogon",
          "Dicayas",
          "Diwan",
          "Estaca",
          "Galas",
          "Gulayon",
          "Lugdungan",
          "Minaog",
          "Miputak",
          "Olingan",
          "Punta",
          "San Jose",
          "Sangkol",
          "Santa Filomena",
          "Santa Isabel",
          "Sicayab",
          "Sinaman",
          "Turno"
        ],
        "Godod": [
          "Baluno",
          "Banuangan",
          "Bunawan",
          "Dilucot",
          "Dipopor",
          "Guisapong",
          "Limbonga",
          "Lomogom",
          "Mauswagon",
          "Miampic",
          "Poblacion",
          "Raba",
          "Rambon",
          "San Pedro",
          "Sarawagan",
          "Sianan",
          "Sioran"
        ],
        "Gutalac": [
          "Bacong",
          "Bagong Silang",
          "Banganon",
          "Bayanihan",
          "Buenavista",
          "Canupong",
          "Cocob",
          "Datagan",
          "Imelda",
          "Immaculada Concepcion",
          "La Libertad",
          "Loay",
          "Lower Lux",
          "Lux",
          "Malian",
          "Mamawan",
          "Map",
          "Matunoy",
          "New Dapitan",
          "Panganuran",
          "Pitawe",
          "Pitogo",
          "Poblacion",
          "Salvador",
          "San Isidro",
          "San Juan",
          "San Roque",
          "San Vicente",
          "Santo Niño",
          "Sas",
          "Sibalic",
          "Tipan",
          "Upper Gutalac"
        ],
        "Jose Dalman": [
          "Balatakan",
          "Bitoon",
          "Dinasan",
          "Ilihan",
          "Labakid",
          "Lipay",
          "Litalip",
          "Lopero",
          "Lumanping",
          "Madalag",
          "Manawan",
          "Marupay",
          "Poblacion",
          "Sigamok",
          "Siparok",
          "Tabon",
          "Tamarok",
          "Tamil"
        ],
        "Kalawit": [
          "Batayan",
          "Botong",
          "Concepcion",
          "Daniel Maing",
          "Fatima",
          "Gatas",
          "Kalawit",
          "Marcelo",
          "New Calamba",
          "Palalian",
          "Paraiso",
          "Pianon",
          "San Jose",
          "Tugop"
        ],
        "Katipunan": [
          "Balok",
          "Barangay Dos",
          "Barangay Uno",
          "Basagan",
          "Biniray",
          "Bulawan",
          "Carupay",
          "Daanglungsod",
          "Dabiak",
          "Dr. Jose Rizal",
          "Fimagas",
          "Loyuran",
          "Malasay",
          "Malugas",
          "Matam",
          "Mias",
          "Miatan",
          "Nanginan",
          "New Tambo",
          "Patik",
          "San Antonio",
          "San Vicente",
          "Sanao",
          "Santo Niño",
          "Seres",
          "Seroan",
          "Singatong",
          "Sinuyak",
          "Sitog",
          "Tuburan"
        ],
        "La Libertad": [
          "El Paraiso",
          "La Union",
          "La Victoria",
          "Mauswagon",
          "Mercedes",
          "New Argao",
          "New Bataan",
          "New Carcar",
          "Poblacion",
          "San Jose",
          "Santa Catalina",
          "Santa Cruz",
          "Singaran"
        ],
        "Labason": [
          "Antonino",
          "Balas",
          "Bobongan",
          "Dansalan",
          "Gabu",
          "Gil Sanchez",
          "Imelda",
          "Immaculada",
          "Kipit",
          "La Union",
          "Lapatan",
          "Lawagan",
          "Lawigan",
          "Lopoc",
          "Malintuboan",
          "New Salvacion",
          "Osukan",
          "Patawag", "San Isidro",
          "Ubay"
        ],
        "Leon B. Postigo": [
          "Bacungan",
          "Bogabongan",
          "Delusom",
          "Mangop",
          "Manil",
          "Mawal",
          "Midatag",
          "Morob",
          "Nasibac",
          "Rizon",
          "Santa Maria",
          "Sipacong",
          "Talinga",
          "Tinaplan",
          "Tiniguiban",
          "Tinuyop",
          "Tiogan",
          "Titik"
        ],
        "Liloy": [
          "Banigan",
          "Baybay",
          "Cabangcalan",
          "Canaan",
          "Candelaria",
          "Causwagan",
          "Communal",
          "Compra",
          "Dela Paz",
          "El Paraiso",
          "Fatima",
          "Ganase",
          "Goaw",
          "Goin",
          "Kayok",
          "La Libertad",
          "Lamao",
          "Mabuhay",
          "Maigang",
          "Malila",
          "Mauswagon",
          "New Bethlehem",
          "Overview",
          "Panabang",
          "Patawag",
          "Punta",
          "San Francisco",
          "San Isidro",
          "San Miguel",
          "San Roque",
          "Santa Cruz",
          "Santo Niño",
          "Silucap",
          "Tapican",
          "Timan",
          "Villa Calixto Sudiacal",
          "Villa M. Tejero"
        ],
        "Manukan": [
          "Dipane",
          "Disakan",
          "Don Jose Aguirre",
          "East Poblacion",
          "Gupot",
          "Libuton",
          "Linay",
          "Lingatongan",
          "Lupasang",
          "Mate",
          "Meses",
          "Palaranan",
          "Pangandao",
          "Patagan",
          "Poblacion",
          "Punta Blanca",
          "Saluyong",
          "San Antonio",
          "Serongan",
          "Suisayan",
          "Upper Disakan",
          "Villaramos"
        ],
        "Mutia": [
          "Alvenda",
          "Buenasuerte",
          "Diland",
          "Diolen",
          "Head Tipan",
          "New Casul",
          "New Siquijor",
          "Newland",
          "Paso Rio",
          "Poblacion",
          "San Miguel",
          "Santo Tomas",
          "Tinglan",
          "Totongon",
          "Tubac",
          "Unidos"
        ],
        "Piñan": [
          "Adante",
          "Bacuyong",
          "Bagong Silang",
          "Calican",
          "Del Pilar",
          "Desin",
          "Dilawa",
          "Dionum",
          "Lapu-lapu",
          "Lower Gumay",
          "Luzvilla",
          "Poblacion North",
          "Poblacion South",
          "Santa Fe",
          "Segabe",
          "Sikitan",
          "Silano",
          "Teresita",
          "Tinaytayan",
          "Ubay",
          "Upper Gumay",
          "Villarico"
        ],
        "Polanco": [
          "Anastacio",
          "Bandera",
          "Bethlehem",
          "Dangi",
          "Dansullan",
          "De Venta Perla",
          "Guinles",
          "Isis",
          "Labrador",
          "Lapayanbaja",
          "Letapan",
          "Linabo",
          "Lingasad",
          "Macleodes",
          "Magangon",
          "Maligaya",
          "Milad",
          "New Lebangon",
          "New Sicayab",
          "Obay",
          "Pian",
          "Poblacion North",
          "Poblacion South",
          "San Antonio",
          "San Miguel",
          "San Pedro",
          "Santo Niño",
          "Sianib",
          "Silawe",
          "Villahermosa"
        ],
        "President Manuel A. Roxas": [
          "Balubo",
          "Banbanan",
          "Canibongan",
          "Capase",
          "Cape",
          "Denoman",
          "Dohinob",
          "Galokso",
          "Gubat",
          "Irasan",
          "Labakid",
          "Langatian",
          "Lipakan",
          "Marupay",
          "Moliton",
          "Nabilid",
          "Panampalay",
          "Pangologon",
          "Piao",
          "Piñalan",
          "Piñamar",
          "Pongolan",
          "Salisig",
          "Sebod",
          "Sibatog",
          "Situbo",
          "Tanayan",
          "Tantingon",
          "Upper Irasan",
          "Upper Minang",
          "Villahermoso"
        ],
        "Rizal": [
          "Balubohan",
          "Birayan",
          "Damasing",
          "East Poblacion",
          "La Esperanza",
          "Mabuhay",
          "Mabunao",
          "Mitimos",
          "Nangca",
          "Nangcaan",
          "Napilan",
          "Nasipang",
          "New Dapitan",
          "Nilabo",
          "North Mapang",
          "Rizalina",
          "San Roque",
          "Sebaca",
          "Sipaon",
          "South Mapang",
          "Tolon",
          "West Poblacion"
        ],
        "Salug": [
          "Bacong",
          "Balakan",
          "Binoni",
          "Calucap",
          "Canawan",
          "Caracol",
          "Danao",
          "Dinoan",
          "Dipolod",
          "Fatima",
          "Ipilan",
          "Lanawan",
          "Liguac",
          "Lipakan",
          "Mucas",
          "Pacuhan",
          "Poblacion",
          "Poblacion East",
          "Pukay",
          "Ramon Magsaysay",
          "Santo Niño",
          "Tambalang",
          "Tapalan"
        ],
        "Sergio Osmeña Sr.": [
          "Antonino",
          "Bagong Baguio",
          "Bagumbayan",
          "Biayon",
          "Buenavista",
          "Dampalan",
          "Danao",
          "Don Eleno", "Kauswagan",
          "Labiray",
          "Liwanag",
          "Mabuhay",
          "Macalibre",
          "Mahayahay",
          "Marapong",
          "Nazareth",
          "Nebo",
          "New Rizal",
          "New Tangub",
          "Nuevavista",
          "Pedagan",
          "Penacio",
          "Poblacion Alto",
          "Poblacion Bajo",
          "Princesa Freshia",
          "Princesa Lamaya",
          "San Antonio",
          "San Francisco",
          "San Isidro",
          "San Jose",
          "San Juan",
          "Sinaad",
          "Sinai",
          "Situbo",
          "Tinago",
          "Tinindugan",
          "Tuburan",
          "Venus",
          "Wilben"
        ],
        "Siayan": [
          "Balok",
          "Balunokan",
          "Datagan",
          "Denoyan",
          "Diongan",
          "Domogok",
          "Dumpilas",
          "Gonayen",
          "Guibo",
          "Gunyan",
          "Litolet",
          "Macasing",
          "Mangilay",
          "Moyo",
          "Muñoz",
          "Pange",
          "Paranglumba",
          "Polayo",
          "Sayaw",
          "Seriac",
          "Siayan Proper",
          "Suguilon"
        ],
        "Sibuco": [
          "Anongan",
          "Basak",
          "Bongalao",
          "Cabbunan",
          "Cawit-cawit",
          "Culaguan",
          "Cusipan",
          "Dinulan",
          "Jatian",
          "Kamarangan",
          "Lakiki",
          "Lambagoan",
          "Limpapa",
          "Lingayon",
          "Lintangan",
          "Litawan",
          "Lunday",
          "Malayal",
          "Mantivo",
          "Nala",
          "Panganuran",
          "Pangian",
          "Paniran",
          "Pasilnahut",
          "Poblacion",
          "Puliran",
          "Santo Niño",
          "Tangarak"
        ],
        "Sibutad": [
          "Bagacay",
          "Calilic",
          "Calube",
          "Delapa",
          "Kanim",
          "Libay",
          "Magsaysay",
          "Marapong",
          "Minlasag",
          "Oyan",
          "Panganuran",
          "Poblacion",
          "Sawang",
          "Sibuloc",
          "Sinipay",
          "Sipaloc"
        ],
        "Sindangan": [
          "Bago",
          "Balok",
          "Bantayan",
          "Bato",
          "Benigno Aquino Jr.",
          "Binuangan",
          "Bitoon",
          "Bucana",
          "Calatunan",
          "Caluan",
          "Calubian",
          "Dagohoy",
          "Dapaon",
          "Datagan",
          "Datu Tangkilan",
          "Dicoyong",
          "Disud",
          "Don Ricardo Macias",
          "Doña Josefa",
          "Dumalogdog",
          "Fatima",
          "Gampis",
          "Goleo",
          "Imelda",
          "Inuman",
          "Joaquin Macias",
          "La Concepcion",
          "La Roche San Miguel",
          "Labakid",
          "Lagag",
          "Lapero",
          "Lawis",
          "Magsaysay",
          "Mandih",
          "Maras",
          "Mawal",
          "Misok",
          "Motibot",
          "Nato",
          "Nipaan",
          "Pangalalan",
          "Piao",
          "Poblacion",
          "Santo Niño",
          "Santo Rosario",
          "Siare",
          "Talinga",
          "Tigbao",
          "Tinaplan",
          "Titik",
          "Upper Inuman",
          "Upper Nipaan"
        ],
        "Siocon": [
          "Andres Micubo Jr.",
          "Balagunan",
          "Bucana",
          "Bulacan",
          "Candiz",
          "Datu Sailila",
          "Dionisio Riconalla",
          "Jose P. Brillantes, Sr.",
          "Latabon",
          "Makiang",
          "Malambuhangin",
          "Malipot",
          "Manaol",
          "Mateo Francisco",
          "Matiag",
          "New Lituban",
          "Pangian",
          "Pisawak",
          "Poblacion",
          "S. Cabral",
          "Santa Maria",
          "Siay",
          "Suhaile Arabi",
          "Tabayo",
          "Tagaytay",
          "Tibangao"
        ],
        "Sirawai": [
          "Balatakan",
          "Balonkan",
          "Balubuan",
          "Bitugan",
          "Bongon",
          "Catuyan",
          "Culasian",
          "Danganon",
          "Doña Cecilia",
          "Guban",
          "Lagundi",
          "Libucon",
          "Lubok",
          "Macuyon",
          "Minanga",
          "Motong",
          "Napulan",
          "Panabutan",
          "Piacan",
          "Pisa Itom",
          "Pisa Puti",
          "Piña",
          "Pugos",
          "Pula Bato",
          "Pulang Lupa",
          "Saint Mary",
          "San Nicolas",
          "San Roque",
          "San Vicente",
          "Sipakit",
          "Sipawa",
          "Sirawai Proper",
          "Talabiga",
          "Tapanayan"
        ],
        "Tampilisan": [
          "Balacbaan",
          "Banbanan",
          "Barili",
          "Cabong",
          "Camul",
          "Farmington",
          "Galingon",
          "Lawaan",
          "Lumbayao",
          "Malila-t",
          "Molos",
          "New Dapitan",
          "Poblacion",
          "Sandayong",
          "Santo Niño",
          "Situbo",
          "Tilubog",
          "Tininggaan",
          "Tubod",
          "Znac"
        ]
      }

    },
    "Zamboanga del Sur": {
      cities: {
        "Aurora": [
          "Acad",
          "Alang-alang",
          "Alegria",
          "Anonang",
          "Bagong Mandaue",
          "Bagong Maslog",
          "Bagong Oslob",
          "Bagong Pitogo",
          "Baki",
          "Balas",
          "Balide",
          "Balintawak",
          "Bayabas",
          "Bemposa",
          "Cabilinan",
          "Campo Uno",
          "Ceboneg",
          "Commonwealth",
          "Gubaan",
          "Inasagan",
          "Inroad",
          "Kahayagan East",
          "Kahayagan West",
          "Kauswagan",
          "La Paz",
          "La Victoria",
          "Lantungan",
          "Libertad",
          "Lintugop",
          "Lubid",
          "Maguikay",
          "Mahayahay",
          "Monte Alegre",
          "Montela",
          "Napo",
          "Panaghiusa",
          "Poblacion",
          "Resthouse",
          "Romarate",
          "San Jose",
          "San Juan",
          "Sapa Loboc",
          "Tagulalo",
          "Waterfall"
        ],
        "Bayog": [
          "Baking",
          "Balukbahan",
          "Balumbunan",
          "Bantal",
          "Bobuan",
          "Camp Blessing",
          "Canoayan",
          "Conacon",
          "Dagum",
          "Damit",
          "Datagan",
          "Depase",
          "Depili",
          "Depore",
          "Deporehan",
          "Dimalinao",
          "Kahayagan",
          "Kanipaan",
          "Lamare",
          "Liba",
          "Matin-ao",
          "Matun-og",
          "Pangi",
          "Poblacion",
          "Pulang Bato",
          "Salawagan",
          "Sigacad",
          "Supon"
        ],
        "Dimataling": [
          "Bacayawan",
          "Baha",
          "Balanagan",
          "Baluno",
          "Binuay",
          "Buburay",
          "Grap",
          "Josefina",
          "Kagawasan",
          "Lalab",
          "Libertad",
          "Magahis",
          "Mahayag",
          "Mercedes",
          "Poblacion",
          "Saloagan",
          "San Roque",
          "Sugbay Uno",
          "Sumbato",
          "Sumpot",
          "Tinggabulong",
          "Tiniguangan",
          "Tipangi",
          "Upper Ludiong"
        ],
        "Dinas": [
          "Bacawan",
          "Benuatan",
          "Beray",
          "Don Jose",
          "Dongos",
          "East Migpulao",
          "Guinicolalay",
          "Ignacio Garrata",
          "Kinacap",
          "Legarda 1",
          "Legarda 2",
          "Legarda 3",
          "Lower Dimaya",
          "Lucoban",
          "Ludiong",
          "Nangka",
          "Nian",
          "Old Mirapao",
          "Pisa-an",
          "Poblacion",
          "Proper Dimaya",
          "Sagacad",
          "Sambulawan",
          "San Isidro",
          "Songayan",
          "Sumpotan",
          "Tarakan",
          "Upper Dimaya",
          "Upper Sibul",
          "West Migpulao"
        ],
        "Dumalinao": [
          "Anonang",
          "Bag-ong Misamis",
          "Bag-ong Silao",
          "Baga",
          "Baloboan",
          "Banta-ao",
          "Bibilik",
          "Calingayan",
          "Camalig",
          "Camanga",
          "Cuatro-cuatro",
          "Locuban",
          "Malasik",
          "Mama",
          "Matab-ang",
          "Mecolong",
          "Metokong",
          "Motosawa",
          "Pag-asa",
          "Paglaum",
          "Pantad",
          "Piniglibano",
          "Rebokon",
          "San Agustin",
          "Sibucao",
          "Sumadat",
          "Tikwas",
          "Tina",
          "Tubo-Pait",
          "Upper Dumalinao"
        ],
        "Dumingag": [
          "Bag-ong Valencia",
          "Bagong Kauswagan",
          "Bagong Silang",
          "Bucayan",
          "Calumanggi",
          "Canibongan",
          "Caridad",
          "Danlugan",
          "Dapiwak",
          "Datu Totocan",
          "Dilud",
          "Ditulan",
          "Dulian",
          "Dulop",
          "Guintananan",
          "Guitran",
          "Gumpingan",
          "La Fortuna",
          "Labangon",
          "Libertad",
          "Licabang",
          "Lipawan",
          "Lower Landing",
          "Lower Timonan",
          "Macasing",
          "Mahayahay",
          "Malagalad",
          "Manlabay",
          "Maralag",
          "Marangan",
          "New Basak",
          "Saad",
          "Salvador",
          "San Juan",
          "San Pablo",
          "San Pedro",
          "San Vicente",
          "Senote",
          "Sinonok",
          "Sunop",
          "Tagun",
          "Tamurayan",
          "Upper Landing",
          "Upper Timonan"
        ],
        "Guipos": [
          "Bagong Oroquieta",
          "Baguitan",
          "Balongating",
          "Canunan",
          "Dacsol",
          "Dagohoy",
          "Dalapang",
          "Datagan",
          "Guling",
          "Katipunan",
          "Lintum",
          "Litan",
          "Magting",
          "Poblacion",
          "Regla",
          "Sikatuna",
          "Singclot"
        ],
        "Josefina": [
          "Bogo Calabat",
          "Dawa",
          "Ebarle",
          "Gumahan",
          "Leonardo",
          "Litapan",
          "Lower Bagong Tudela",
          "Mansanas",
          "Moradji",
          "Nemeño", "Nopulan",
          "Sebukang",
          "Tagaytay Hill",
          "Upper Bagong Tudela"
        ],
        "Kumalarang": [
          "Bogayo",
          "Bolisong",
          "Boyugan East",
          "Boyugan West",
          "Bualan",
          "Diplo",
          "Gawil",
          "Gusom",
          "Kitaan Dagat",
          "Lantawan",
          "Limamawan",
          "Mahayahay",
          "Pangi",
          "Picanan",
          "Poblacion",
          "Salagmanok",
          "Secade",
          "Suminalum"
        ],
        "Labangan": [
          "Bagalupa",
          "Balimbingan",
          "Binayan",
          "Bokong",
          "Bulanit",
          "Cogonan",
          "Combo",
          "Dalapang",
          "Dimasangca",
          "Dipaya",
          "Langapod",
          "Lantian",
          "Lower Campo Islam",
          "Lower Pulacan",
          "Lower Sang-an",
          "New Labangan",
          "Noboran",
          "Old Labangan",
          "San Isidro",
          "Santa Cruz",
          "Tapodoc",
          "Tawagan Norte",
          "Upper Campo Islam",
          "Upper Pulacan",
          "Upper Sang-an"
        ],
        "Lakewood": [
          "Bagong Kahayag",
          "Baking",
          "Biswangan",
          "Bululawan",
          "Dagum",
          "Gasa",
          "Gatub",
          "Lukuan",
          "Matalang",
          "Poblacion",
          "Sapang Pinoles",
          "Sebuguey",
          "Tiwales",
          "Tubod"
        ],
        "Lapuyan": [
          "Bulawan",
          "Carpoc",
          "Danganan",
          "Dansal",
          "Dumara",
          "Linokmadalum",
          "Luanan",
          "Lubusan",
          "Mahalingeb",
          "Mandeg",
          "Maralag",
          "Mariuing",
          "Molum",
          "Pampang",
          "Pantad",
          "Pingalay",
          "Poblacion",
          "Salambuyan",
          "San Jose",
          "Sayog",
          "Tabon",
          "Talabab",
          "Tiguha",
          "Tininghalang",
          "Tipasan",
          "Tugaya"
        ],
        "Mahayag": [
          "Bag-ong Balamban",
          "Bag-ong Dalaguete",
          "Boniao",
          "Delusom",
          "Diwan",
          "Guripan",
          "Kaangayan",
          "Kabuhi",
          "Lourmah",
          "Lower Salug Daku",
          "Lower Santo Niño",
          "Malubo",
          "Manguiles",
          "Marabanan",
          "Panagaan",
          "Paraiso",
          "Pedagan",
          "Poblacion",
          "Pugwan",
          "San Isidro",
          "San Jose",
          "San Vicente",
          "Santa Cruz",
          "Sicpao",
          "Tuboran",
          "Tulan",
          "Tumapic",
          "Upper Salug Daku",
          "Upper Santo Niño"
        ],
        "Margosatubig": [
          "Balintawak",
          "Bularong",
          "Digon",
          "Guinimanan",
          "Igat Island",
          "Josefina",
          "Kalian",
          "Kolot",
          "Limamawan",
          "Limbatong",
          "Lumbog",
          "Magahis",
          "Poblacion",
          "Sagua",
          "Talanusa",
          "Tiguian",
          "Tulapok"
        ],
        "Midsalip": [
          "Bacahan",
          "Balonai",
          "Bibilop",
          "Buloron",
          "Cabaloran",
          "Canipay Norte",
          "Canipay Sur",
          "Cumaron",
          "Dakayakan",
          "Duelic",
          "Dumalinao",
          "Ecuan",
          "Golictop",
          "Guinabot",
          "Guitalos",
          "Guma",
          "Kahayagan",
          "Licuro-an",
          "Lumpunid",
          "Matalang",
          "New Katipunan",
          "New Unidos",
          "Palili",
          "Pawan",
          "Pili",
          "Pisompongan",
          "Piwan",
          "Poblacion A",
          "Poblacion B",
          "Sigapod",
          "Timbaboy",
          "Tulbong",
          "Tuluan"
        ],
        "Molave": [
          "Alicia",
          "Ariosa",
          "Bagong Argao",
          "Bagong Gutlang",
          "Blancia",
          "Bogo Capalaran",
          "Culo",
          "Dalaon",
          "Dipolo",
          "Dontulan",
          "Gonosan",
          "Lower Dimalinao",
          "Lower Dimorok",
          "Mabuhay",
          "Madasigon",
          "Makuguihon",
          "Maloloy-on",
          "Miligan",
          "Parasan",
          "Rizal",
          "Santo Rosario",
          "Silangit",
          "Simata",
          "Sudlon",
          "Upper Dimorok"
        ],
        "Pagadian": [
          "Alegria",
          "Balangasan",
          "Balintawak",
          "Baloyboan",
          "Banale",
          "Bogo",
          "Bomba",
          "Buenavista",
          "Bulatok",
          "Bulawan",
          "Dampalan",
          "Danlugan",
          "Dao",
          "Datagan",
          "Deborok",
          "Ditoray",
          "Dumagoc",
          "Gatas",
          "Gubac",
          "Gubang",
          "Kagawasan",
          "Kahayagan",
          "Kalasan",
          "Kawit",
          "La Suerte",
          "Lala",
          "Lapidian",
          "Lenienza",
          "Lizon Valley",
          "Lourdes",
          "Lower Sibatang",
          "Lumad",
          "Lumbia",
          "Macasing",
          "Manga",
          "Muricay", "Napolan",
          "Palpalan",
          "Pedulonan",
          "Poloyagan",
          "San Francisco",
          "San Jose",
          "San Pedro",
          "Santa Lucia",
          "Santa Maria",
          "Santiago",
          "Santo Niño",
          "Tawagan Sur",
          "Tiguma",
          "Tuburan",
          "Tulangan",
          "Tulawas",
          "Upper Sibatang",
          "White Beach"
        ],
        "Pitogo": [
          "Balabawan",
          "Balong-balong",
          "Colojo",
          "Liasan",
          "Liguac",
          "Limbayan",
          "Lower Paniki-an",
          "Matin-ao",
          "Panubigan",
          "Poblacion",
          "Punta Flecha",
          "San Isidro",
          "Sugbay Dos",
          "Tongao",
          "Upper Paniki-an"
        ],
        "Ramon Magsaysay": [
          "Bagong Opon",
          "Bambong Daku",
          "Bambong Diut",
          "Bobongan",
          "Campo IV",
          "Campo V",
          "Caniangan",
          "Dipalusan",
          "Eastern Bobongan",
          "Esperanza",
          "Gapasan",
          "Katipunan",
          "Kauswagan",
          "Lower Sambulawan",
          "Mabini",
          "Magsaysay",
          "Malating",
          "Paradise",
          "Pasingkalan",
          "Poblacion",
          "San Fernando",
          "Santo Rosario",
          "Sapa Anding",
          "Sinaguing",
          "Switch",
          "Upper Laperian",
          "Wakat"
        ],
        "San Miguel": [
          "Betinan",
          "Bulawan",
          "Calube",
          "Concepcion",
          "Dao-an",
          "Dumalian",
          "Fatima",
          "Langilan",
          "Lantawan",
          "Laperian",
          "Libuganan",
          "Limonan",
          "Mati",
          "Ocapan",
          "Poblacion",
          "San Isidro",
          "Sayog",
          "Tapian"
        ],
        "San Pablo": [
          "Bag-ong Misamis",
          "Bubual",
          "Buton",
          "Culasian",
          "Daplayan",
          "Kalilangan",
          "Kapamanok",
          "Kondum",
          "Lumbayao",
          "Mabuhay",
          "Marcos Village",
          "Miasin",
          "Molansong",
          "Pantad",
          "Pao",
          "Payag",
          "Poblacion",
          "Pongapong",
          "Sacbulan",
          "Sagasan",
          "San Juan",
          "Senior",
          "Songgoy",
          "Tandubuay",
          "Taniapan",
          "Ticala Island",
          "Tubo-pait",
          "Villakapa"
        ],
        "Sominot": [
          "Bag-ong Baroy",
          "Bag-ong Oroquieta",
          "Barubuhan",
          "Bulanay",
          "Datagan",
          "Eastern Poblacion",
          "Lantawan",
          "Libertad",
          "Lumangoy",
          "New Carmen",
          "Picturan",
          "Poblacion",
          "Rizal",
          "San Miguel",
          "Santo Niño",
          "Sawa",
          "Tungawan",
          "Upper Sicpao"
        ],
        "Tabina": [
          "Abong-abong",
          "Baganian",
          "Baya-baya",
          "Capisan",
          "Concepcion",
          "Culabay",
          "Doña Josefina",
          "Lumbia",
          "Mabuhay",
          "Malim",
          "Manikaan",
          "New Oroquieta",
          "Poblacion",
          "San Francisco",
          "Tultolan"
        ],
        "Tambulig": [
          "Alang-alang",
          "Angeles",
          "Bag-ong Kauswagan",
          "Bag-ong Tabogon",
          "Balugo",
          "Cabgan",
          "Calolot",
          "Dimalinao",
          "Fabian",
          "Gabunon",
          "Happy Valley",
          "Kapalaran",
          "Libato",
          "Limamawan",
          "Lower Liasan",
          "Lower Lodiong",
          "Lower Tiparak",
          "Lower Usogan",
          "Maya-maya",
          "New Village",
          "Pelocoban",
          "Riverside",
          "Sagrada Familia",
          "San Jose",
          "San Vicente",
          "Sumalig",
          "Tuluan",
          "Tungawan",
          "Upper Liason",
          "Upper Lodiong",
          "Upper Tiparak"
        ],
        "Tigbao": [
          "Begong",
          "Busol",
          "Caluma",
          "Diana Countryside",
          "Guinlin",
          "Lacarayan",
          "Lacupayan",
          "Libayoy",
          "Limas",
          "Longmot",
          "Maragang",
          "Mate",
          "Nangan-nangan",
          "New Tuburan",
          "Nilo",
          "Tigbao",
          "Timolan",
          "Upper Nilo"
        ],
        "Tukuran": [
          "Alindahaw",
          "Baclay",
          "Balimbingan",
          "Buenasuerte",
          "Camanga",
          "Curvada",
          "Laperian",
          "Libertad",
          "Lower Bayao",
          "Luy-a",
          "Manilan",
          "Manlayag",
          "Militar",
          "Navalan",
          "Panduma Senior",
          "Sambulawan",
          "San Antonio",
          "San Carlos",
          "Santo Niño",
          "Santo Rosario",
          "Sugod",
          "Tabuan",
          "Tagulo",
          "Tinotungan",
          "Upper Bayao",
          "Upper Bayao"
        ],
        "Vincenzo A. Sagun": [
          "Ambulon",
          "Bui-os",
          "Cogon",
          "Danan",
          "Kabatan",
          "Kapatagan",
          "Limason",
          "Linoguayan",
          "Lumbal",
          "Lunib",
          "Maculay",
          "Maraya",
          "Sagucan",
          "Waling-waling"
        ]
      }

    }, "Zamboanga Sibugay": {
      cities: {
        "Alicia": [
          "Alegria", "Bagong Buhay", "Bella", "Calades", "Concepcion", "Dawa-dawa", "Gulayon", "Ilisan", "Kapatagan", "Kauswagan", "Kawayan", "La Paz", "Lambuyogan", "Lapirawan", "Litayon", "Lutiman", "Milagrosa", "Naga-naga", "Pandan-pandan", "Payongan", "Poblacion", "Santa Maria", "Santo Niño", "Talaptap", "Tampalan", "Tandiong Muslim", "Timbang-timbang"
        ],
        "Buug": [
          "Agutayan", "Bagong Borbon", "Basalem", "Bawang", "Bliss", "Bulaan", "Compostela", "Danlugan", "Datu Panas", "Del Monte", "Guintuloan", "Guitom", "Guminta", "Labrador", "Lantawan", "Mabuhay", "Maganay", "Manlin", "Muyo", "Pamintayan", "Pling", "Poblacion", "Pulog", "San Jose", "Talairan", "Talamimi", "Villacastor"
        ],
        "Diplahan": [
          "Balangao", "Butong", "Ditay", "Gaulan", "Goling", "Guinoman", "Kauswagan", "Lindang", "Lobing", "Luop", "Manangon", "Mejo", "Natan", "Paradise", "Pilar", "Poblacion", "Sampoli A", "Sampoli B", "Santa Cruz", "Songcuya", "Tinongtongan", "Tuno"
        ],
        "Imelda": [
          "Balugo", "Balungisan", "Baluyan", "Cana-an", "Dumpoc", "Gandiangan", "Israel", "La Victoria", "Little Baguio", "Lower Baluran", "Lumbog", "Lumpanac", "Mali Little Baguio", "Poblacion", "Pulawan", "San Jose", "Santa Barbara", "Upper Baluran"
        ],
        "Ipil": [
          "Bacalan", "Bangkerohan", "Bulu-an", "Caparan", "Domandan", "Don Andres", "Doña Josefa", "Guituan", "Ipil Heights", "Labi", "Logan", "Lower Ipil Heights", "Lower Taway", "Lumbia", "Maasin", "Magdaup", "Makilas", "Pangi", "Poblacion", "Sanito", "Suclema", "Taway", "Tenan", "Tiayon", "Timalang", "Tomitom", "Upper Pangi", "Veteran's Village"
        ],
        "Kabasalan": [
          "Banker", "Bolo Batallion", "Buayan", "Cainglet", "Calapan", "Calubihan", "Concepcion", "Diampak", "Dipala", "Gacbusan", "Goodyear", "Lacnapan", "Little Baguio", "Lumbayao", "Nazareth", "Palinta", "Peñaranda", "Poblacion", "Riverside", "Sanghanan", "Santa Cruz", "Sayao", "Shiolan", "Simbol", "Sininan", "Tamin", "Tampilisan", "Tigbangagan", "Timuay Danda"
        ],
        "Mabuhay": [
          "Abunda", "Bagong Silang", "Bangkaw-bangkaw", "Caliran", "Catipan", "Kauswagan", "Ligaya", "Looc-Barlak", "Malinao", "Pamansaan", "Pinalim", "Poblacion", "Punawan", "Santo Niño", "Sawa", "Sioton", "Taguisian", "Tandu-Comot"
        ],
        "Malangas": [
          "Bacao", "Basak-bawang", "Bontong", "Camanga", "Candiis", "Catituan", "Dansulao", "Del Pilar", "Guilawa", "Kigay", "La Dicha", "Lipacan", "Logpond", "Mabini", "Malungon", "Mulom", "Overland", "Palalian", "Payag", "Poblacion", "Rebocon", "San Vicente", "Sinusayan", "Tackling", "Tigabon"
        ],
        "Naga": [
          "Aguinaldo", "Baga", "Baluno", "Bangkaw-bangkaw", "Cabong", "Crossing Santa Clara", "Gubawang", "Guintoloan", "Kaliantana", "La Paz", "Lower Sulitan", "Mamagon", "Marsolo", "Poblacion", "San Isidro", "Sandayong", "Santa Clara", "Sulo", "Tambanan", "Taytay Manubo", "Tilubog", "Tipan", "Upper Sulitan"
        ],
        "Olutanga": [
          "Bateria", "Calais", "Esperanza", "Fama", "Galas", "Gandaan", "Kahayagan", "Looc Sapi", "Matim", "Noque", "Pulo Laum", "Pulo Mabao", "San Isidro", "San Jose", "Santa Maria", "Solar", "Tambanan", "Villacorte", "Villagonzalo"
        ],
        "Payao": [
          "Balian", "Balogo", "Balungisan", "Binangonan", "Bulacan", "Bulawan", "Calape", "Dalama", "Fatima", "Guintolan", "Guiwan", "Katipunan", "Kima", "Kulasian", "Kulisap", "La Fortuna", "Labatan", "Mayabo", "Minundas", "Mountain View", "Nanan", "Poblacion", "San Isidro", "San Roque", "San Vicente", "Silal", "Sumilong", "Talaptap", "Upper Sumilong"
        ],
        "Roseller Lim": [
          "Ali Alsree", "Balansag", "Calula", "Casacon", "Don Perfecto", "Gango", "Katipunan", "Kulambugan", "Mabini", "Magsaysay", "Malubal", "New Antique", "New Sagay", "Palmera", "Pres. Roxas", "Remedios", "San Antonio", "San Fernandino", "San Jose", "Santo Rosario", "Siawang", "Silingan", "Surabay", "Taruc", "Tilasan", "Tupilac"
        ],
        "Siay": [
          "Bagong Silang", "Balagon", "Balingasan", "Balucanan", "Bataan", "Batu", "Buyogan", "Camanga", "Coloran", "Kimos", "Labasan", "Lagting", "Laih", "Logpond", "Magsaysay", "Mahayahay", "Maligaya", "Maniha", "Minsulao", "Mirangan", "Monching", "Paruk", "Poblacion", "Princesa Sumama", "Salinding", "San Isidro", "Sibuguey", "Siloh", "Villagracia"
        ],
        "Talusan": [
          "Aurora", "Baganipay", "Bolingan", "Bualan", "Cawilan", "Florida", "Kasigpitan", "Laparay", "Mahayahay", "Moalboal", "Poblacion", "Sagay", "Samonte", "Tuburan"
        ],
        "Titay": [
          "Achasol", "Azusano", "Bangco", "Camanga", "Culasian", "Dalangin", "Dalangin Muslim", "Dalisay", "Gomotoc", "Imelda", "Kipit", "Kitabog", "La Libertad", "Longilog", "Mabini", "Malagandis", "Mate", "Moalboal", "Namnama", "New Canaan", "Palomoc", "Poblacion", "Poblacion Muslim", "Pulidan", "San Antonio", "San Isidro", "Santa Fe", "Supit", "Tugop", "Tugop Muslim"
        ],
        "Tungawan": [
          "Baluran", "Batungan", "Cayamcam", "Datu Tumanggong", "Gaycon", "Langon", "Libertad", "Linguisan", "Little Margos", "Loboc", "Looc-labuan", "Lower Tungawan", "Malungon", "Masao", "San Isidro", "San Pedro", "San Vicente", "Santo Niño", "Sisay", "Taglibas", "Tigbanuang", "Tigbucay", "Tigpalay", "Timbabauan", "Upper Tungawan"
        ]
      }

    }
  };

  provinceSelect.innerHTML = '<option value="">Choose a province</option>';
  Object.keys(locationData).forEach(province => {
    const option = document.createElement("option");
    option.value = province;
    option.textContent = province;
    provinceSelect.appendChild(option);
  });

  provinceSelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;

    citySelect.innerHTML = '<option value="">Choose a city</option>';
    barangaySelect.innerHTML = '<option value="">Choose a barangay</option>';
    citySelect.disabled = true;
    barangaySelect.disabled = true;
    purokInput.disabled = true;
    zipcodeInput.value = '';

    if (!selectedProvince) return;

    Object.keys(locationData[selectedProvince].cities).forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });

    citySelect.disabled = false;
  });

  // When City changes
  citySelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;
    const selectedCity = citySelect.value;

    barangaySelect.innerHTML = '<option value="">Choose a barangay</option>';
    barangaySelect.disabled = true;
    purokInput.disabled = true;
    zipcodeInput.value = '';

    if (!selectedCity) return;

    const barangays = locationData[selectedProvince].cities[selectedCity] || [];
    barangays.forEach(barangay => {
      const option = document.createElement("option");
      option.value = barangay;
      option.textContent = barangay;
      barangaySelect.appendChild(option);
    });

    barangaySelect.disabled = false;
    purokInput.disabled = false;
  });
}