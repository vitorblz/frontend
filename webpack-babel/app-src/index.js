class Foo{
    teste(){
        console.log("Ola teste!")
    }
}

const arr = [1, 2, 3];
let arr2 = [1, 2, 3];
arr2.push(4);
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;

console.log('teste: ',arr2);

let teste = new Foo();
teste.teste();