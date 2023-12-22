let productsListEl = document.getElementById("productsList");

const menLayoutBtn = document.getElementById("menLayout");
const wonmenLayoutBtn = document.getElementById("wonmenLayout");
const kidsLayoutBtn = document.getElementById("kidsLayout");
menLayoutBtn.classList.add("active-btn");
let activeLayout = "Men";
let products = null;

const displayLayout = () => {
  console.log(activeLayout);
};

displayLayout();

const addProductsInList = () => {
  const ListEl = document.getElementById("");
  let filteredProducts = products.find(
    (eachItem) => eachItem.category_name === activeLayout
  );
  console.log(filteredProducts);

  filteredProducts.category_products.map((eachItem) => {
    console.log(eachItem);
    const badge = eachItem.badge_text === "null" ? "" : eachItem.badge_text;

    const cardEl = document.createElement("li");
    cardEl.innerHTML = `
      <img src=${eachItem.image} alt=${eachItem.title} class="card-img" />
    `;
    cardEl.classList.add("card");
    productsListEl.appendChild(cardEl);

    const badgeEl = document.createElement("p");
    badgeEl.textContent = badge;
    badgeEl.classList.add("badge");
    eachItem.badge_text !== null && cardEl.appendChild(badgeEl);

    const titleVendorEl = document.createElement("div");
    titleVendorEl.innerHTML = `
      <h1 class="title">${eachItem.title}</h1>
      <p class="vendor"> &#8226; ${eachItem.vendor}</p>
    `;
    titleVendorEl.classList.add("title-vendor-container");
    cardEl.appendChild(titleVendorEl);

    const priceOfferEl = document.createElement("div");
    priceOfferEl.innerHTML = `
      <p><b>RS ${eachItem.price}</b></p>
      <p><strike>${eachItem.compare_at_price}.00</strike></p>
      <p class="percentage">50% OFF</p>
    `;
    priceOfferEl.classList.add("price-offer-container");
    cardEl.appendChild(priceOfferEl);

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Add to Cart";
    cartBtn.classList.add("cart-btn");
    cardEl.appendChild(cartBtn);
  });
};

const getProductsApi = async () => {
  const apiUrl =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(apiUrl, options);
  const responseData = await response.json();
  const data = responseData;
  products = data.categories;
  addProductsInList();
};

const removeAndAddProducts = () => {
  while (productsListEl.firstChild) {
    productsListEl.removeChild(productsListEl.firstChild);
  }
  addProductsInList();
};

getProductsApi();

menLayoutBtn.addEventListener("click", (event) => {
  activeLayout = event.target.value;
  menLayoutBtn.classList.add("active-btn");
  wonmenLayoutBtn.classList.remove("active-btn");
  kidsLayoutBtn.classList.remove("active-btn");
  displayLayout();
  removeAndAddProducts();
});

wonmenLayoutBtn.addEventListener("click", (event) => {
  activeLayout = event.target.value;
  menLayoutBtn.classList.remove("active-btn");
  wonmenLayoutBtn.classList.add("active-btn");
  kidsLayoutBtn.classList.remove("active-btn");
  displayLayout();
  removeAndAddProducts();
});

kidsLayoutBtn.addEventListener("click", (event) => {
  activeLayout = event.target.value;
  menLayoutBtn.classList.remove("active-btn");
  wonmenLayoutBtn.classList.remove("active-btn");
  kidsLayoutBtn.classList.add("active-btn");
  displayLayout();
  removeAndAddProducts();
});
