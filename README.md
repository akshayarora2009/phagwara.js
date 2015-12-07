# phagwara.js
Just-for-fun, interpreted and basic programming language written on top of JavaScript, based on a popular "dialect" spoken exclusively by Computer Science class of '17, PEC University.

### Getting Started
The syntax is offered in two flavors - `officialJeha` and `Saukha Kinna`, the former is the one that is actually parsed and interpreted, while the latter is a syntactic sugar - allowing different lines of code to be simply written, just seperated by a newline.

#### Getting the interpreter
The interpreter is just a javascript file which can be found <a href="https://github.com/akshayarora2009/phagwara.js/blob/master/src/main.js">here.</a> Be sure to include it before your own code.

#### Getting the package
Saukha kinna syntax can be converted to `officialJeha` using the node module for phagwara.js. 
```
npm install phagwarajs
```

This will download an `index.js` file in the `node_modules` folder. Feel the thrill.

##### CLI Usage

```
node index.js input.khapp output.js
```

`input.khapp` is a standard `khapp` file. All code written must be saved in a file with this extension. This file is converted to a javascript file named `output`. Relative paths can also be used here. 

### Examples
#### Program to calculate sum of numbers from 1 to 10

##### Saukha kinna

```
korKor(dindaa(total,0)
dindaa(count,1)
jadoTak(<(count,11)
korKor(dindaa(total,+(total,count))
dindaa(count, +(count,1))))
dasdaa(total))
```
This is parsed using the npm module to produce the actual code accepted in the `officialJeha` syntax.

##### Official Jeha

```
officialJeha("korKor(dindaa(total,0),",
    "dindaa(count,1),",
    "jadoTak(<(count,11),",
    "korKor(dindaa(total,+(total,count)),",
    "dindaa(count, +(count,1)))),",
    "dasdaa(total))"
);
```



