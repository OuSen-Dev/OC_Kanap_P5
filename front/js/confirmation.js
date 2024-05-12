// Recovery of the order ID from the querystring

const queryString_url_id = window.location.search;
console.log (queryString_url_id); 

// Slice method to extract only ID

const IdOrder = queryString_url_id.slice(1);
console.log(IdOrder);

// Display ID

let orderNumber = document.getElementById ("orderId");
orderNumber.innerHTML = IdOrder;