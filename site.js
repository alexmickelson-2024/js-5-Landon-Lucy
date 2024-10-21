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

function CreateCard(product) {
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
  cardQuantityElement.id = `${product.title}-quantity`;

  cardContentElement.appendChild(cardTitleElement);
  cardContentElement.appendChild(cardDescriptionElement);
  cardContentElement.appendChild(cardPriceElement);
  cardContentElement.appendChild(cardQuantityElement);

  cardElement.appendChild(cardImageElement);
  cardElement.appendChild(cardContentElement);

  cardElement.addEventListener("dragstart", dragStart);

  return cardElement;
}

function LoadItemsList() {
  products.forEach((product) => {
    const cardElementCreated = CreateCard(product);

    const productsContainerElement =
      document.getElementById("products-container");
    productsContainerElement.appendChild(cardElementCreated);
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

  const draggableCopy = products.filter((product) => {
    if (draggable.id === `card-${product.title}`) return product;
  });

  const draggableCopyElement = CreateCard(draggableCopy[0]);
  draggableCopyElement.id = `${draggableCopyElement.id}-copy`;

  const totalElement = document.getElementById("amount");
  totalElement.textContent = parseFloat(parseFloat(totalElement.textContent) + parseFloat(draggable.lastChild.childNodes[2].textContent)).toFixed(2);


  if (
    !containerTargetElelement.contains(
      document.getElementById(draggableCopyElement.id)
    )
  ) {
    containerTargetElelement.appendChild(draggableCopyElement);

    draggableCopyElement.lastChild.removeChild(
      draggableCopyElement.lastChild.lastChild
    );

    const cardQuantityElementCopy = document.createElement("div");
    cardQuantityElementCopy.classList.add("card-quantity");
    cardQuantityElementCopy.textContent = `1`;
    cardQuantityElementCopy.id = `${draggableCopyElement.id}-quantity`;

    draggableCopyElement.lastChild.appendChild(cardQuantityElementCopy);

    if (draggable.lastChild.lastChild.textContent - 1 === 0) {
      draggable.remove();
    }

    draggable.lastChild.lastChild.textContent = `${
      draggable.lastChild.lastChild.textContent - 1
    }`;
  } else {
    const existingCopyElement = document.getElementById(
      draggableCopyElement.id
    );

    if (draggable.lastChild.lastChild.textContent - 1 === 0) {
      draggable.remove();
    }

    existingCopyElement.lastChild.lastChild.textContent = `${
      existingCopyElement.lastChild.lastChild.textContent - -1
    }`;
    draggable.lastChild.lastChild.textContent = `${
      draggable.lastChild.lastChild.textContent - 1
    }`;
  }
}

function dropProduct(e) {
  const id = e.dataTransfer.getData("text/plain");

  const draggable = document.getElementById(id);

  const containerTargetElelement = document.getElementById("productList");

  const draggableCopy = products.filter((product) => {
    if (draggable.id === `card-${product.title}-copy`) return product;
  });

  const draggableCopyElement = CreateCard(draggableCopy[0]);
  console.log(draggableCopyElement.id);

  const totalElement = document.getElementById("amount");
  totalElement.textContent = parseFloat(parseFloat(totalElement.textContent) - parseFloat(draggable.lastChild.childNodes[2].textContent)).toFixed(2);

  if (
    !containerTargetElelement.contains(
      document.getElementById(draggableCopyElement.id)
    )
  ) {
    containerTargetElelement.appendChild(draggableCopyElement);

    draggableCopyElement.lastChild.removeChild(
      draggableCopyElement.lastChild.lastChild
    );

    const cardQuantityElementCopy = document.createElement("div");
    cardQuantityElementCopy.classList.add("card-quantity");
    cardQuantityElementCopy.textContent = `1`;
    cardQuantityElementCopy.id = `${draggableCopyElement.id}-quantity`;

    draggableCopyElement.lastChild.appendChild(cardQuantityElementCopy);

    if (draggable.lastChild.lastChild.textContent - 1 === 0) {
      draggable.remove();
    }

    draggable.lastChild.lastChild.textContent = `${
      draggable.lastChild.lastChild.textContent - 1
    }`;
  } else {
    const existingCopyElement = document.getElementById(
      draggableCopyElement.id
    );
    console.log(existingCopyElement);

    if (draggable.lastChild.lastChild.textContent - 1 === 0) {
      draggable.remove();
    }

    existingCopyElement.lastChild.lastChild.textContent = `${
      existingCopyElement.lastChild.lastChild.textContent - -1
    }`;
    draggable.lastChild.lastChild.textContent = `${
      draggable.lastChild.lastChild.textContent - 1
    }`;
  }

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


