import axios from 'axios'
import moment from 'moment'

function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody');
    let orders = [];
    let markup;

    axios.get('/admin/orders',{
        headers : {
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res=>{
        orders = res.data;
        markup = generateMarkup(orders);
        orderTableBody.innerHTML = markup;
    }).catch(err=>{
        console.log("axios error "+err);
    });
}

function renderItems(items){
    let parsedItems = Object.values(items);
    return parsedItems.map((menuItem)=>{
        return `
            <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
            `
    }).join('');
}

function generateMarkup(orders){
    return orders.map(order =>{
        return `
        <tr>
            <td class="border px-4 py-2 text-green-900">
                <p>${order._id}</p>
                <div>${renderItems(order.items) }</div>
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
                        <section name="status" onchange="this.form.submit()" class="block apperance-none
                        w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none 
                        focus:shadow-outline">
                            <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>Placed</option>
                            <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                            <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>Prepared</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </section>
                    </form>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        svg image
                    </div>
                </div>
            </td>
            <td class="border px-4 py-2">
                ${moment(order.createdAt).format('hh:mm A')}
            </td>
        </tr>`;
    }).join('');
}

// module.exports = initAdmin;
// export default initAdmin;