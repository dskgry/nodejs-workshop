/**
 * @author Sven Koelpin
 */

function printFn(what) {
    return what;
}
//1. convert printFn to a fat arrow function. call the function and log the result
const print = what => what;
console.log(print('hello'));


function sumFn(a, b) {
    return a + b;
}
//2. convert sumFn to a fat arrow function. call the function and log the result
const sum = (a, b) => a + b;
console.log(sum(1, 2));

function complexFn() {
    const random = Math.random();
    return random > 0.5;

}
//3. convert complexFn to a fat arrow function. call the function and log the result
const complex = () => {
    const random = Math.random();
    return random > 0.5
};
console.log(complex());


function creatorFn(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}
console.log(creatorFn(1)(2)(3));
//4. convert complexFn to a fat arrow function. call the function and log the result
const creator = a => b => c => a + b + c;
console.log(creator(1)(2)(3));