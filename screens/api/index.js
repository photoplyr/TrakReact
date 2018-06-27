// @flow

const recipes = require("./recipes");


export type Ingredient = {
    checked: boolean,
    name: string,
    quantity: string
};



const api: Food = {
    recipes: recipes.recipes
};

export default api;
