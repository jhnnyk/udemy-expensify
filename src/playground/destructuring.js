// --------------------
// Object Destructuring
// --------------------

// const person = {
//   name: "John",
//   age: 41,
//   location: {
//     city: "Evergreen",
//     temp: 41
//   }
// };

// const { name = "Anonymous", age } = person;
// console.log(`${name} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin"
//   }
// };

// const { name: publisherName = "Self-Published" } = book.publisher;

// console.log(publisherName);

// -------------------
// Array Destructuring
// -------------------

// const address = ["31057 Shawnee Lane", "Evergreen", "CO", "80439"];
// const [, city = "New York", state = "NY"] = address;
// console.log(`You are in ${city} ${state}.`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [drink, , medium] = item;
console.log(`A medium ${drink} costs ${medium}.`);
