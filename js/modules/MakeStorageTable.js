export default class MakeStorageTable {
    apply = () => {
        //Empty div-tag with format according to style
        let div = `
            <div id="storage-container" class="columns is-multiline"></div>
        `;
        //Empty table to store current product stock
        let productsLeft = `
        <div class="column is-12">
            <table id="products-left-table" class="table is-striped" width="90%">
                <thead>
                    <tr>
                        <th>Varenavn</th>
                        <th>Antall på lager</th>
                        <th>Dato oppdatert</th>
                        <th>Lagerstatus</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="storage-body">
                </tbody>
            </table>
        </div>
        `;
        //Empty table to store products that are to be ordered
        let orderTable = `
        <div class="column is-12">
            <table id="order-list-table" class="table is-striped" width="90%">
                <thead>
                    <tr>
                        <th>Varenavn</th>
                        <th>Antall</th>
                        <th>Neste levering</th>
                        <th>Pris pr enhet</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="order-body">
                </tbody>
            </table>
        </div>
        `;

        //Deploys empty div to main and the two empty tables to the div mentioned
        document.getElementById("main").innerHTML += div;
        document.getElementById("storage-container").innerHTML += productsLeft;
        document.getElementById("storage-container").innerHTML += orderTable;
    };
}