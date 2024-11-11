let listCart = [];
function checkCart(){
    var cookieValue= document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
addCartToHtml();
function addCartToHtml(){
  let listCartHTML = document.querySelector('.returnCart .list');
  listCartHTML.innerHTML = '';
  let totalQuantityHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');
  let totalPrice = 0;
  let totalQuantity = 0;

  if(listCart){
    listCart.forEach(product =>{
        if(product){
            let newP = document.createElement('div');
            newP.classList.add('item');
            newp.innerHTML =`<img src="${product.image}">
                    <div class="info">
                        <div class="name"> ${product.name}Product 1</div>
                        <div class="price"> $${product.price}</div>
                    </div>
                    <div class="quantity"> ${product.quantity}1</div>
                    <div class="returnPrice">$${ product.price + product.quantity}</div>`;
                     listCartHTML.appendChild(newP);
                     totalQuantity = totalQuantity +product.quantity;
                     totalPrice = totalPrice + ( product.price + product.quantity);
        }
    })
  }
 totalQuantityHTML.innerText = totalQuantity;
 totalPriceHTML.innerText = '$' + totalPrice;

}