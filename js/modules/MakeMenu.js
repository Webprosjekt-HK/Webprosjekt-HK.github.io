export default class MakeMenu {
    apply = () => {
        //Empty menu table deployed to main-section of HTML document
        let emptyTable = `
            <table id="menu-table" class="table is-striped column is-12" width="90%">
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Ingredienser</th>
                        <th>Innkjøpspris</th>
                        <th>Utsalgspris</th>
                        <th>Profitt</th>
                        <th>Ta bort</th>
                    </tr>
                </thead>
                <tbody id="menu-body">
                </tbody>
            </table>
        `;

        let dropdown = `
        <select name="pizzavalg" id="pizza-valg">
            <option value="0">Quattro Formaggi</option>
            <option value="1">Diavolo</option>
            <option value="2">Særingen</option>
        </select>
        <button id="add-pizza" class="button">Add Pizza</button>
        `;

        let div = `
        <div class="column" id="dropdowndiv"></div>
        `;
        //Sending emptyTable (Empty menu) to main-section
        document.getElementById("main").innerHTML += div;
        document.getElementById("dropdowndiv").innerHTML += dropdown;
        document.getElementById("main").innerHTML += emptyTable;
    };
}