import { add } from './basic.js'

console.log(`This is arrow function result: 1+2 = ${add(1, 2)}`)

// Block-Scoped Variables
let callbacks = []
for (let i=0; i<=2; i++) {
    callbacks[i] = () => i * 2;
}

console.log(`${callbacks[0]() === 0}`)
console.log(`${callbacks[1]() === 2}`)
console.log(`${callbacks[2]() === 4}`)

let evens = []
for (let i=0; i <= 10; i++) {
    if(i % 2 === 0) {
        evens.push(i);
    }
}

function printArray(arr) {
    for (const item of arr) {
        console.log(item)
    }
}

console.log("Evens:")
printArray(evens)

let odds = evens.map(x => x + 1);
console.log("Odds:")
printArray(odds)


// rest of paras
function f(x, y, ...a) {
    console.log(`You pass ${2+a.length} parameters`);
    console.log(`${x}`);
    console.log(`${y}`);
    for (const i of a) {
        console.log(`${i}`);
    }
}

f(1, 2, "hello", "world");

const alphatables = ["a", "b", "c", "d", "e"];
f(1, 2, ...alphatables);
f(1, 2, ..."hello");

const n = 0b111;
console.log(n)



