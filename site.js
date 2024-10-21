import { products } from "./products.js";

{
  /* <div class="card" draggable="true">
        <div
          class="card-img"
          style="background-image: url('/images/waterbottle.jpg')"
        ></div>
        <div class="card-content">
          <div class="card-title">Water Bottle</div>
          <div class="card-description">A 500ml reusable water bottle.</div>
          <div class="card-price">$10.99</div>
          <div class="card-quantity">Quantity: 3</div>
        </div>
      </div> */
}

function LoadItemsList() {
  products.forEach((product) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.id = `card-${product.title}`;
    cardElement.draggable = true;

    const cardImageElement = document.createElement("div");
    cardImageElement.classList.add("card-img");
    cardImageElement.style = `background-image: url('${product.image}')`;

    const cardContentElement = document.createElement("div");
    cardContentElement.classList.add("card-content");

    const cardTitleElement = document.createElement("div");
    cardTitleElement.classList.add("card-title");
    cardTitleElement.textContent = `${product.title}`;

    const cardDescriptionElement = document.createElement("div");
    cardDescriptionElement.classList.add("card-description");
    cardDescriptionElement.textContent = `${product.description}`;

    const cardPriceElement = document.createElement("div");
    cardPriceElement.classList.add("card-price");
    cardPriceElement.textContent = `${product.price}`;

    const cardQuantityElement = document.createElement("div");
    cardQuantityElement.classList.add("card-quantity");
    cardQuantityElement.textContent = `${product.quantity}`;

    cardContentElement.appendChild(cardTitleElement);
    cardContentElement.appendChild(cardDescriptionElement);
    cardContentElement.appendChild(cardPriceElement);
    cardContentElement.appendChild(cardQuantityElement);

    cardElement.appendChild(cardImageElement);
    cardElement.appendChild(cardContentElement);

    cardElement.addEventListener("dragstart", dragStart);

    const productsContainerElement =
      document.getElementById("products-container");
    productsContainerElement.appendChild(cardElement);
  });
}

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dropCart(e) {
  const id = e.dataTransfer.getData("text/plain");

  const draggable = document.getElementById(id);

  const containerTargetElelement = document.getElementById("cartList");

  containerTargetElelement.appendChild(draggable);
}

function dropProduct(e) {
  const id = e.dataTransfer.getData("text/plain");

  const draggable = document.getElementById(id);

  const containerTargetElelement = document.getElementById("products-container");

  containerTargetElelement.appendChild(draggable);
}

LoadItemsList();

const cartContainerElement = document.getElementById("cartList");

cartContainerElement.addEventListener("dragenter", dragEnter);
cartContainerElement.addEventListener("dragover", dragOver);
cartContainerElement.addEventListener("drop", dropCart);

const productContainerElement = document.getElementById("products-container");

productContainerElement.addEventListener("dragenter", dragEnter);
productContainerElement.addEventListener("dragover", dragOver);
productContainerElement.addEventListener("drop", dropProduct);
