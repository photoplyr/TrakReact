// @flow

const todo = require("./todo");
const users = require("./users");

export type User = {
    id: string,
    name: string,
    picture: string,
    caption: string,
    cover: Picture
};

export type Ingredient = {
    checked: boolean,
    name: string,
    quantity: string
};



const api: todoList = {
    todo: todo.recipes,
     me: (): User => users.filter(user => user.id === "schavez")[0],
};

export default api;
