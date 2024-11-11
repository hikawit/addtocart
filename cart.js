let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})
let products = null;
fetch('product.json')
.then(response => response.json())
.then(data =>{
    products = data;
    addDataToHtml();
})
function addDataToHtml(){
    let listProductHTML = document.querySelector('.listProduct')
   listProductHTML.innerHTML='';
   if (products != null){
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = 
            ` <img src="${product.image}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button onclick="addCart(${product.id})">Add To Cart</button>`;
           listProductHTML.appendChild(newProduct);
    });
   }
 }
 let listCart =[];
 function checkCart(){
    var cookieValue = document.cookie
    .split(';')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
    }
    checkCart();
    
 function addCart($idproduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    if (!listCart[$idproduct]){
        let  dataProduct = productCopy.filter(product => product.id == $idproduct)[0];
        listCart[$idproduct] = dataProduct;
        listCart[$idproduct].quantity = 1;
    }else{
        listCart[$idproduct].quantity++;
    }
    let timeSave = "expires=thu, 31 dec 2026 23:59:59 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+";  path=/";
    addCartToHtml();


 }
 addCartToHtml();
 function addCartToHtml(){
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let toalQuantity = 0;

if(listCart){
    listCart.forEach(product =>{
if(product){
    let newCart = document.createElement('div');
    newCart.classList.add('item');
    newCart.innerHTML =
    ` <img src="${product.image}">
            <div class="content">
                <div class="name">
                ${product.name}
                </div>
                <div class="price">
                    $${product.price}/1 product
            </div>
        </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                    listCartHTML.appendChild(newCart);
                    toalQuantity = toalQuantity +  product.quantity;

}
    })
}
totalHTML.innerText  = toalQuantity;

 }
function changeQuantity($idproduct, $type){
switch($type){
    case '+':
        listCart[$idproduct].quantity++;
        break;
        case '-':
            listCart[$idproduct].quantity--;
            if(listCart[$idproduct].quantity<=0){
                delete listCart[$idproduct];
            }
            break;
        default:
            break;
}
let timeSave = "expires=thu, 31 dec 2026 23:59:59 UTC";
document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+";  path=/";
addCartToHtml();
}

