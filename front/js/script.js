//  Data recovery from API -----------------------------

fetch("http://localhost:3000/api/products")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) =>{

      productsCouch(products);
    })
    .catch((error) => {
      console.log(error);
    })


// Function to display products from API ---------------

function productsCouch (index) {
  let displayProduct = document.querySelector("#items");
  for (let article of index) {
    displayProduct.innerHTML += 
    `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}