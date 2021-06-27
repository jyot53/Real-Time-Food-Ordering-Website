// console.log("done!!!");
import axios from 'axios';
import notie from 'notie';
import moment from 'moment'
// import {initAdmin} from './admin';

let addtodart = document.querySelectorAll('.addtocart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    // sent the pizza data to the server and then server will send it to the cart page
    //for this we will use ajax call we use axios  to make calls  
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        notie.alert({ type: 'success', text: 'Item Added To Cart!!!', time: 1, position: "top" });
        // console.log(res);
    }).catch((err) => {
        console.log("Error in cart updation " + err);
    })
}

addtodart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        // console.log(pizza.name);
        updateCart(pizza);
    })
});

//remove the order placed success msg after some time
const alertMsg = document.querySelector('#success-alert');
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 4000);
}

function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody');
    let orders = [];
    let markup;

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data;
        markup = generateMarkup(orders);
        orderTableBody.innerHTML = markup;
    }).catch(err => {
        console.log("axios error " + err);
    });
}

function renderItems(items) {
    let parsedItems = Object.values(items);
    return parsedItems.map((menuItem) => {
        return `
            <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
            `
    }).join('');
}

function generateMarkup(orders) {
    return orders.map(order => {
        return `
        <tr>
            <td class="border px-4 py-2 text-green-900">
                <p> <a href="" class="link"> ${order._id} </a></p>
                <div>${renderItems(order.items)}</div>
            </td>
            <td class="border px-4 py-2 text-green-900">
                <p>${order.customerId.name}</p>
            </td>
            <td class="border px-4 py-2 text-green-900">
                <p>${order.address}</p>
            </td>
            <td class="border px-4 py-2 text-green-900">
                <p>${order.phone}</p>
            </td>
            <td class="border px-4 py-2 text-green-900">
                <div class="inline-block relative w-64">
                    <form action="/admin/order/status" method="POST">
                        <input type="hidden" name="orderId" value="${order._id}">
                        <select name="status" onchange="this.form.submit()" class="block apperance-none
                        w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none 
                        focus:shadow-outline">
                            <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>Placed</option>
                            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>Prepared</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </form>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i class="fas fa-sort-down"></i>
                    </div>
                </div>
            </td>
            <td class="border px-4 py-2">
                ${moment(order.createdAt).format('hh:mm A')}
            </td>
        </tr>`;
    }).join('');
}

initAdmin();