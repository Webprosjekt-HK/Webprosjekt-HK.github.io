import MakeStorageTable from "/js/modules/MakeStorageTable.js";
import * as setup from "/js/tools/setup.js";
import IngredientCollection from "/js/classes/IngredientCollection.js";
import StorageItems from "/js/modules/StorageItems.js";
import OrderItems from "/js/modules/OrderItems.js";

const storage = (() => {
    const init = () => {
        //Creating necessary objects to manipulate and deploy to HTML document
        //Clears main-section
        const mainElement = document.getElementById("main");
        mainElement.innerHTML = ``;
        //Checks if list of ingredients is present in localStorage. Adds them if they are not
        if(!localStorage.getItem("ingredients")) setup.saveIngredients();
        let ingredientList = new IngredientCollection();
        let ingredients = ingredientList.fetchIngredient();
        const makeStorageTable = new MakeStorageTable();
        const storageItems = new StorageItems();
        const orderItems = new OrderItems();
        makeStorageTable.apply();
        let stockStatus = "";
        //Norwegian date format
        let currentTime = new Date().toLocaleString("nb-NO", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })
        
        //Deploys all base ingredients to storage-section
        for (let i = 0; i < 4; i++){
            if(ingredients[i].status == 1) stockStatus = `<div class="storage-empty">Tomt</div>`;
            if(ingredients[i].status == 2) stockStatus = `<div class="storage-low">Lav</div>`;
            if(ingredients[i].status == 3) stockStatus = `<div class="storage-normal">Normal</div>`;
            storageItems.apply(
                `${ingredients[i].name}`,
                `${ingredients[i].stock}`,
                `${currentTime}`,
                `${stockStatus}`
            );
        }

        //Functionality to order products from storage-section and add to order-list
        var index,
            table = document.getElementById("products-left-table");
        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[4].onclick = function () {
                let name = this.parentElement.cells[0].innerHTML;
                let currentTr;
                for (let i = 0; i < ingredients.length; i++){
                    if(ingredients[i].name == name) currentTr = ingredients[i];
                }
                //Confirmation of ordering product
                var c = confirm(
                    "Er du sikker på at du vil Bestille dette produktet?"
                );
                if (c === true) {
                    //Adds product ordered to order-list
                    index = this.parentElement.rowIndex;
                    orderItems.apply(
                        `${currentTr.name}`,
                        `10 stk`,
                        `${currentTr.price / 10}`,
                        `${currentTr.price}`
                    );
                }
            };
        }

    };
    return { init };
})();

export default storage;