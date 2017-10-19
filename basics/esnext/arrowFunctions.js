/**
 * @author Sven Koelpin
 */

function printFn(what) {
    return what;
}
//1. convert printFn to a fat arrow function. call the function and log the result



function sumFn(a, b) {
    return a + b;
}
//2. convert sumFn to a fat arrow function. call the function and log the result


function complexFn() {
    const random = Math.random();
    return random > 0.5;

}
//3. convert complexFn to a fat arrow function. call the function and log the result



function creatorFn(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}
console.log(creatorFn(1)(2)(3));
//4. convert creatorFn to a fat arrow function. call the function and log the result
