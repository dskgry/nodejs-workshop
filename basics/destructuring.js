/**
 * @author Sven Koelpin
 */

const person = {
    firstName: "Max",
    lastName: "Mustermann",
    age: 54
};

//1. destructure the firstName and the age and log them to console
//2. destructure the lastName but give the variable a different name.

const {firstName, age} = person;
console.log(firstName, age);
const {lastName: hello} = person;
console.log(hello);

//array destructuring
const arr = [1, 2, 3];
//1. destructure only the second value from the array and log it to console
const [, second] = arr;
console.log(second);