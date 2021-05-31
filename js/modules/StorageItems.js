export default class StorageItems {
    apply = (name, amount, date, status) => {
        /**
         * Table row for empty storage table.
         * Parameters define each cell value (Object values)
         * **/
        let addItem =  `
            <tr>
                <td>${ name }</td>
                <td>${ amount } stk</td>
                <td>${ date }</td>
                <td>${ status }</td>
                <td><a class="button is-dark is-rounded">Bestill</a></td>
                <td></td>
            </tr>
        `;

        //Applying the table row to storage table
        document.getElementById("storage-body").innerHTML += addItem;
    };
}