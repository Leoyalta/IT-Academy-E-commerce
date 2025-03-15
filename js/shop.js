// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cartList = document.getElementById("cart_list");
const totalPrice = document.getElementById("total_price");

const cart = [];

const total = 0;

const buy = (id) => {
  const productToAdd = products.find((product) => product.id === id);

  const cartItem = cart.find((item) => item.id === id);
  cartItem
    ? (cartItem.quantity += 1)
    : cart.push({ ...productToAdd, quantity: 1 });
  applyPromotionsCart(cart);
  printCart();
  return cart;
};

// Exercise 2
function cleanCart() {
  cart.length = 0;
  cartList.innerHTML = "";
  totalPrice.innerHTML = "0";
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  const total = cart.reduce((acc, item) => {
    return (acc += item.subtotalWithDiscount
      ? item.subtotalWithDiscount
      : item.price * item.quantity);
  }, 0);
  console.log(total);

  return total;
}

// Exercise 4
function applyPromotionsCart(cart) {
  //   Apply promotions to each item in the array "cart"
  cart.forEach((item) => {
    if (item.name === "cooking oil" && item.quantity >= item.offer.number) {
      item.subtotalWithDiscount = Number(
        (item.price * item.quantity * 0.8).toFixed(2)
      );
    } else if (
      item.name === "Instant cupcake mixture" &&
      item.quantity >= item.offer.number
    ) {
      item.subtotalWithDiscount = Number(
        (item.price * item.quantity * 0.7).toFixed(2)
      );
    } else {
      return;
    }
  });
}

// Exercise 5

function printCart() {
  applyPromotionsCart(cart);
  // Fill the shopping cart modal manipulating the shopping cart dom
  const listMarkup = cart.reduce((acc, elem) => {
    const { id, name, price, quantity, subtotalWithDiscount } = elem;
    const totalProductPrice = subtotalWithDiscount
      ? subtotalWithDiscount
      : price * quantity;
    return (
      acc +
      `	<tr>
           <th scope="row">${name}</th>
           <td>${price}</td>
           <td>${quantity}</td>
           <td>${totalProductPrice}</td>
          <td>
          <div class="d-flex gap-1"><button class="on-remove-btn 
          btn btn-outline-warning" type="button" data-id="${id}">
          Remove</button>
           <button class="on-add-btn btn btn-outline-success" type="button" data-id="${id}">Add one</button>
           </div>

          </td>
    </tr>
    `
    );
  }, "");

  cartList.innerHTML = listMarkup;
  totalPrice.innerHTML = calculateTotal();
}

// ** Nivell II **

// Exercise 7
// Has de completar la funció removeFromCart(), que rep l'identificador del producte per al qual s'ha de decrementar la seva quantitat en una unitat.

// Recorda que si la quantitat del producte a decrementar és 1, has d'eliminar-lo del carret, no reduir la seva quantitat a 0.

// No oblidis actualitzar les promocions.

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("on-remove-btn")) {
    const productId = Number(event.target.getAttribute("data-id"));

    removeFromCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("on-add-btn")) {
    const productId = Number(event.target.getAttribute("data-id"));
    addToCart(productId);
    printCart();
  }
});

function addToCart(id) {
  const cartItem = cart.find((item) => item.id === id);
  console.log(cartItem);
  cartItem && (cartItem.quantity += 1);
  applyPromotionsCart(cart);
  printCart();
}

function removeFromCart(id) {
  const cartItem = cart.find((item) => item.id === id);
  console.log(cartItem);

  const cartItemIndex = cart.findIndex((item) => item.id === id);
  console.log(cartItemIndex);

  cartItem && (cartItem.quantity -= 1);
  if (cartItem.name === "cooking oil" && cartItem.quantity < 3) {
    delete cartItem.subtotalWithDiscount;
  }
  if (cartItem.name === "Instant cupcake mixture" && cartItem.quantity < 10) {
    delete cartItem.subtotalWithDiscount;
  }

  if (cartItem.quantity === 0) {
    cart.splice(cartItemIndex, 1);
  }
  applyPromotionsCart(cart);
  printCart();
}

function open_modal() {
  printCart();
}
