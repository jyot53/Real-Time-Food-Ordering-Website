// console.log("done!!!");
import axios from 'axios';
import notie from 'notie';

let addtodart = document.querySelectorAll('.addtocart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    // sent the pizza data to the server and then server will send it to the cart page
    //for this we will use ajax call we use axios  to make calls  
    axios.post('/update-cart',pizza).then(res =>{
        cartCounter.innerText = res.data.totalQty;
        notie.alert({ type: 'success', text: 'Item Added To Cart!!!', time: 1 , position :"top"});
        // console.log(res);
    }).catch((err)=>{
        console.log("Error in cart updation "+err);
    })
}

addtodart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);       
        // console.log(pizza.name);
        updateCart(pizza);
    })
});