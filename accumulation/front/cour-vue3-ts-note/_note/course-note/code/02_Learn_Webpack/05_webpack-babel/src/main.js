import { sum } from "./js/math";
const { priceFormat } = require("./js/format");

import "./js/element";

console.log(sum(20, 30));
console.log(priceFormat());

const message = "Hello World";
const names = ["abc", "cba", "nba"];

names.forEach(item => console.log(item));
console.log(message);

