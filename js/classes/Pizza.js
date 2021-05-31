export default class Pizza {
    //Class constructor for Pizza objects
    name;
    ingredients;
    inPrice;
    outPrice;
    profit;
    constructor(
        name,
        ingredients,
        inPrice,
        outPrice,
        profit
    ){
        this.name = name;
        this.ingredients = ingredients;
        this.inPrice = inPrice;
        this.outPrice = outPrice;
        this.profit = profit;
    }
}