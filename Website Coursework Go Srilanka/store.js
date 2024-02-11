//Cart
let carttIcon=document.querySelector(".add-cart");
let cart=document.querySelector(".cart");
let closeCart=document.querySelector("#close-cart");
// Open cart
carttIcon.onclick=()=>{
    cart.classList.add("active");
}
//Close Cart
closeCart.onclick=()=>{
    cart.classList.remove("active");
}

//Cart Workin Js
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}

//Making Function
function ready(){
    //Remove Items From Cart
    var reomveCartButtons=document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for(var i=0;i<reomveCartButtons.length;i++){
        var button=reomveCartButtons[i];
        button.addEventListener('click' ,removeCartItem);
    }
    //Quantity Changes
    var quantityInputs=document.getElementsByClassName('cart-quantity');
    for(var i=0;i<quantityInputs.length;i++){
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add to Cart
    var addCart=document.getElementsByClassName('add-cart');
    for(var i=0;i<addCart.length;i++){
        var button=addCart[i];
        button.addEventListener('click',addCartClicked);
    }
}
//Remove Items From Cart
function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Quantity Changed
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
     }
     updatetotal();
}

function addProductTOCart(title,price,productIMG){
   var cartShopBox=document.createElement("div");
   cartShopBox.classList.add('cart-box')
   var cartItems=document.getElementsByClassName('cart-content') [0];
   var cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
   for(var i=0;i<cartItemsNames.length;i++){
    alert(" You have already add this items to cart")
    return;
   }
} 

 var cartBoxContent =`
                        <img src="${productIMG}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                    <div class="cart-price">${price}</div>
                                    <input type="number" value="1" class="cart-quantity"> 
                                    <!--Remove Cart-->
                                    <i class="fa-solid fa-trash-alt cart-remove"></i>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);

    
 
//update total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // if price Contain some Cents value
        total = Math.round(total *100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}