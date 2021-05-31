export default class MenuItems {
    apply = (name, ingredients, inPrice, outPrice, profit) => {
        /**
         * Adding a new table row to the empty menu section. 
         * Parameters defines value of each cell (Object values) 
         * **/
        let addPizza = `
            <tr>
                <td>${ name }</td>
                <td>${ ingredients }</td>
                <td>${ inPrice }</td>
                <td>${ outPrice }</td>
                <td>${ profit }</td>
                <td><i class='bx bxs-x-circle remove-btn'></i></td>
                <td><img src="./images/triple_dots.png" width="24px" height="24px"></td>
            </tr>
        `;

        //Applying table row to menu table
        document.getElementById("menu-body").innerHTML += addPizza;
    };
}