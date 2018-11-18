![Current Version](https://img.shields.io/npm/v/retry-if-fails.svg)
![NPM Minified size](https://img.shields.io/bundlephobia/min/retry-if-fails.svg)
![Github Code Size](https://img.shields.io/github/languages/code-size/wjsc/retry-if-fails.svg)
![Downloads/Year](https://img.shields.io/npm/dy/retry-if-fails.svg)
![Issues](https://img.shields.io/github/issues/wjsc/retry-if-fails.svg)
![License](https://img.shields.io/github/license/wjsc/retry-if-fails.svg)
![Contributors](https://img.shields.io/github/contributors/wjsc/retry-if-fails.svg)

[![NPM](https://nodei.co/npm/retry-if-fails.png)](https://nodei.co/npm/retry-if-fails)


# Retry-If-Fails

This module helps to you to manage retries of function execution

## Usage

```
// 1. Import module 
const retrier = require('retry-if-fails');

// 2. Define your function
const flipCoin = () => {
  return Math.random() > 0.5 ? 'Heads' : 'Tails';
}

// 3. Define your test function
const resultChecker = coinFlip => {
  console.log(coinFlip);
  return coinFlip === 'Heads'
}

// 4. Run the Retrier
const retries = 3;
retrier(flipCoin, resultChecker, retries)
.then( result => console.log(`Finally! ${result}`))
.catch( lastResult => console.log(`Error: Last result was: ${lastResult}`));

```

The retrier function returns a Promise, and it will execute until it hits the desired result
or it' will return the last failed result.

## Wait between tries

You can also set a wait time between tries with the optional last parameter.
This can be useful when your functions consume a remote resource.

```
const retries = 3;
const wait = 200; // 200 milliseconds
retrier(flipCoin, resultChecker, retries, wait);
```

## Example fetching remote API

```
const retrier = require('retry-if-fails');
const fetch = require('node-fetch');

const fetchResource = () => {
  return fetch('http://domain.com/resource/12345', { timeout: 3000 })
    .catch(err => console.log(err));
}

const resultChecker = response => {
  return response && response.status == 200;
}

const retries = 3;
const wait = 1000;
retrier(fetchResource, resultChecker, retries, wait)
  .then( res => res.json())
  .then( object => console.log(object))
  .catch( lastResponse => console.log(`It fails. Last result was: ${lastResponse}`));


```

## Using async await to get result
```
const foo = async () =>{
  try{
    const result = await retrier(process, checkCorrect, retries, wait);
    console.log(`It's correct! ${result}`);
  }
  catch(lastResult){
    console.log(console.log(`It fails. Last result was: ${lastResult}`))
  }
};
```