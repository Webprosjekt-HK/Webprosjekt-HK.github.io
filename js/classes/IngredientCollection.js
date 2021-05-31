export default class IngredientCollection {
    //Function to retrieve all locally stored Ingredient objects
    fetchIngredient = () => {
        return JSON.parse(localStorage.getItem("ingredients"));
    }
    /**
     * Function to retrieve all locally stored Ingredient objects
     * that match name in function parameter
     * **/
    filterByName = (ingredientName) => {
        return this.fetchIngredient().find((e) => e.name == ingredientName);
    };
}