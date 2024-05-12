// Data recovery from API & Localstorage ---------------------------


let cartData = JSON.parse(localStorage.getItem("itemForCart"));
function displayCart () {
  let overallPrice = 0;
  for (let kanap of cartData) {
      let retrieveDataItems = 
      {
        id : kanap.id,
        color : kanap.color,
        quantity : kanap.quantity,
      }
        fetch("http://localhost:3000/api/products/"+retrieveDataItems.id)
          .then(function(res) {
            if (res.ok) {
            return res.json();
            }
          })
// Function to display the Cart & the Products in it -------------------
          .then (function (cartProducts){
           let cartSection = document.querySelector("#cart__items");
           let article = document.createElement ("article");
           cartSection.appendChild(article);
           article.classList.add('cart__item');
           article.setAttribute('data-id',retrieveDataItems.id);
           article.setAttribute('data-color',retrieveDataItems.color);
           let cartImg = document.createElement ("div");
           cartImg.classList.add('cart__item__img');
           cartSection.appendChild(cartImg);
           let img = document.createElement ("img");
           img.src = cartProducts.imageUrl;
           img.alt = cartProducts.altTxt;
           cartImg.appendChild(img);
           let cartContent = document.createElement ("div");
           cartContent.classList.add('cart__item__content');
           cartSection.appendChild(cartContent);
           let cartDescription = document.createElement ("div");
           cartDescription.classList.add('cart__item__content__description');
           cartContent.appendChild(cartDescription);
           let cartItemName = document.createElement ("h2");
           cartItemName.innerHTML = cartProducts.name;
           cartDescription.appendChild(cartItemName);
           let cartItemColor = document.createElement ("p");
           cartItemColor.innerHTML = retrieveDataItems.color; 
           cartDescription.appendChild(cartItemColor);
           let cartItemPrice = document.createElement ("p");
           cartItemPrice.innerHTML = cartProducts.price + "\u20AC";
           cartDescription.appendChild(cartItemPrice);
           let cartSettings = document.createElement ("div");
           cartSettings.classList.add('cart__item__content__settings');
           cartContent.appendChild(cartSettings);
           let cartQuantity = document.createElement ("div");
           cartQuantity.classList.add('cart__item__content__settings__quantity');
           cartSettings.appendChild(cartQuantity);
           let cartQuantityTxt = document.createElement ("p");
           cartQuantityTxt.textContent = "Qté :";
           cartQuantity.appendChild(cartQuantityTxt);
           let cartQuantityInput = document.createElement ("input");
           cartQuantityInput.type = "number";
           cartQuantityInput.className = "itemQuantity";
           cartQuantityInput.name = "itemQuantity";
           cartQuantityInput.min = "1";
           cartQuantityInput.max = "100";
           cartQuantityInput.value = retrieveDataItems.quantity
           cartQuantity.appendChild(cartQuantityInput);
           let cartDelete = document.createElement ("div");
           cartDelete.classList.add("cart__item__content__settings__delete");
           cartSettings.appendChild(cartDelete);
           let cartDeleteTxt = document.createElement ("p");
           cartDeleteTxt.classList.add("deleteItem");
           cartDeleteTxt.textContent = "Supprimer";
           cartDelete.appendChild(cartDeleteTxt);
           
// Function to manage quantity --------------------------------------------------------------------
           cartQuantityInput.addEventListener("change", function(d) {
// Function to push new cart
              const modifyLocalStorage = () => {
                cartData.push(retrieveDataItems);
                localStorage.setItem("itemForCart",JSON.stringify(cartData));
              }
        
                if (cartData) {
                  let testQuantity = cartData.find(n => n.id == retrieveDataItems.id && n.color == retrieveDataItems.color);
                  if (cartQuantityInput.value < 1) {
                    let idDelete = retrieveDataItems.id;
                    let colorDelete = retrieveDataItems.color;
                    let filtered = cartData.filter(m => m.id != idDelete || m.color != colorDelete);
                    let testRemove = d.target.closest("#cart__items");
                    testRemove.remove();
                    localStorage.setItem("itemForCart", JSON.stringify(filtered));
                  }
                  else {
                    testQuantity.quantity = Number(cartQuantityInput.value);
                    localStorage.setItem("itemForCart", JSON.stringify(cartData));
                  }
                }
                else {
                 modifyLocalStorage();
                }
                reload ();
           }) 

// Function to delete an element of the cart
             cartDeleteTxt.addEventListener("click", (o) => {
             o.preventDefault ();
             let idDelete = retrieveDataItems.id;
             let colorDelete = retrieveDataItems.color;
             let filtered = cartData.filter(m => m.id != idDelete || m.color != colorDelete);
             let testRemove = o.target.closest("#cart__items");
             testRemove.remove();
             localStorage.setItem("itemForCart", JSON.stringify(filtered));
             reload ();
            }
           ) 
           
// Function to calculate total price 
            fetch("http://localhost:3000/api/products/"+retrieveDataItems.id)
              .then(function(res) {
                if (res.ok) {
                return res.json();
                }
              })
              .then(function (p){
                overallPrice += retrieveDataItems.quantity * p.price;
                let finalPrice = document.querySelector("#totalPrice");
                finalPrice.innerHTML = overallPrice;
              })

         })
  }
}
displayCart();

// Function to calculate and display total quantity
function totalQty () {
  let dataTotal = JSON.parse(localStorage.getItem("itemForCart"))
  let overallQuantity = 0;
  dataTotal.forEach(element => {
    overallQuantity += element.quantity;
  })
  let finalQuantity = document.querySelector("#totalQuantity");
  finalQuantity.innerHTML = overallQuantity;
}
totalQty();

// Function to reload the page after an event
function reload () {
  document.location.reload();
}

// ------------------------------------ ORDER FORM -----------------------------------------

// Const for every element of the form

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// variable for every value

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// First Name eventlistener + regex 

firstName.addEventListener("input", function (f) {
  valueFirstName;
  if (f.target.value.length == 0) {
      firstNameErrorMsg.innerHTML = "";
      valueFirstName = null;
    //  console.log(valueFirstName);
   }

   else if (f.target.value.length < 2 || f.target.value.length > 25){
     firstNameErrorMsg.innerHTML = "Le prénom doit contenir entre 2 et 25 caractères";
     valueFirstName = null;
   }

   if (f.target.value.match(/^[a-z A-Z]{2,25}$/)){
      firstNameErrorMsg.innerHTML = "";
      valueFirstName = f.target.value;
      console.log(valueFirstName);
   }

   if (
    !f.target.value.match(/^[a-z A-Z]{2,25}$/)&&
    f.target.value.length > 2 &&
    f.target.value.length < 25
   ) {
    firstNameErrorMsg.innerHTML = "Le prénom ne doit pas contenir de caractères spéciaux, chiffe ou accent";
    valueFirstName = null;
  //  console.log("error : spe");
   }
})

// Last Name eventlistener + regex 

lastName.addEventListener("input", function (l) {
  valueLastName;
  if (l.target.value.length == 0) {
      lastNameErrorMsg.innerHTML = "";
      valueLastName = null;
    //  console.log(valueLastName);
   }

   else if (l.target.value.length < 2 || l.target.value.length > 25){
     lastNameErrorMsg.innerHTML = "Le nom doit contenir entre 2 et 25 caractères";
     valueLastName = null;
   }

   if (l.target.value.match(/^[a-z A-Z]{2,25}$/)){
      lastNameErrorMsg.innerHTML = "";
      valueLastName = l.target.value;
      console.log(valueLastName);
   }

   if (
    !l.target.value.match(/^[a-z A-Z]{2,25}$/)&&
    l.target.value.length > 2 &&
    l.target.value.length < 25
   ) {
    lastNameErrorMsg.innerHTML = "Le nom ne doit pas contenir de caractères spéciaux, chiffre ou accent";
    valueLastName = null;
  //  console.log("error : spe");
   }
})

// Address eventlistener + regex 

address.addEventListener("input", function (a) {
  valueAddress;
  if (a.target.value.length == 0) {
      addressErrorMsg.innerHTML = "";
      valueAddress = null;
    //  console.log(valueAddress);
   }

   else if (a.target.value.length < 5 || a.target.value.length > 35){
     addressErrorMsg.innerHTML = "Le nom doit contenir entre 5 et 35 caractères";
     valueAddress = null;
   }

   if (a.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/)){
      addressErrorMsg.innerHTML = "";
      valueAddress = a.target.value;
      console.log(valueAddress);
   }

   if (
    !a.target.value.match(/^[0-9]{1,4} [a-z A-Z]{5,35}$/)&&
    a.target.value.length > 5 &&
    a.target.value.length < 35
   ) {
    addressErrorMsg.innerHTML = "L'adresse ne doit pas contenir de caractères spéciaux ou accent";
    valueAddress = null;
  //  console.log("error : spe");
   }
})

// City eventlistener + regex 

city.addEventListener("input", function (c) {
  valueCity;
  if (c.target.value.length == 0) {
      cityErrorMsg.innerHTML = "";
      valueCity = null;
    //  console.log(valueCity);
   }

   else if (c.target.value.length < 2 || c.target.value.length > 25){
     cityErrorMsg.innerHTML = "Le nom de la ville doit contenir entre 2 et 25 caractères";
     valueCity = null;
   }

   if (c.target.value.match(/^[a-z A-Z]{2,25}$/)){
      cityErrorMsg.innerHTML = "";
      valueCity = c.target.value;
      console.log(valueCity);
   }

   if (
    !c.target.value.match(/^[a-z A-Z]{2,25}$/)&&
    c.target.value.length > 2 &&
    c.target.value.length < 25
   ) {
    cityErrorMsg.innerHTML = "Le nom de la ville ne doit pas contenir de caractères spéciaux, chiffe ou accent";
    valueCity = null;
  //  console.log("error : spe");
   }
})

// Email eventlistener + regex 

email.addEventListener("input", (em) => {
  if (em.target.value.length == 0) {
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
  //  console.log(valueEmail);
  }

  else if (em.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailErrorMsg.innerHTML = "";
    valueEmail = em.target.value;
    console.log(valueEmail);
  }

  if(
    !em.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && 
    !em.target.value.length == 0) {
      emailErrorMsg.innerHTML = "Adresse Email invalide, ex : jean.dupont@gmail.com";
      valueEmail = null;
    }
})

// Order

const orderForm = document.getElementsByTagName("form");
// console.log(orderForm);

orderForm[0].addEventListener("submit", function (of) {
  of.preventDefault();

  if (
    valueFirstName &&
    valueLastName&&
    valueAddress &&
    valueCity&&
    valueEmail
  ) {
  
    let idForOrder = []
  //  console.log(finalOrder);
  //  console.log(idForOrder);

    cartData.forEach((product) => {
      idForOrder.push(product.id)
    })

    const dataOrder = {
      contact : {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value,
      },
      products : idForOrder,
    }

    // console.log(dataOrder);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataOrder),
      cache: "default"
    })
      .then((res) => res.json())
      .then((data) => {
        let serverResponse = data;
        console.log(serverResponse);
        localStorage.removeItem("itemForCart");
        document.location.href = "confirmation.html?" + serverResponse.orderId;
      })

  } else {
    console.log("error");
  }
})