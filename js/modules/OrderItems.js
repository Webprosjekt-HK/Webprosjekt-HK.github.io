export default class OrderItems {
    apply = (name, amount, price, totalPrice) => {
        /**
         * Table row to be added to order-list table
         * Parameters defines value of each cell (Object values)
         * **/
        let addItem = `
            <tr>
                <td>${ name }</td>
                <td>${ amount } stk</td>
                <td>Tirsdag neste uke</td>
                <td>${ price }</td>
                <td>${ totalPrice }</td>
                <td></td>
            </tr>
        `;

        //Applying the table row to the empty table
        document.getElementById("order-body").innerHTML += addItem;
    };
}