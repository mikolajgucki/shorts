<!-- #random -->

# Code to generate a random string

```js
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const randomString = (length = 16) => Array.from(crypto.getRandomValues(new Uint8Array(length))).map((value) => alphabet[value % alphabet.length]).join('');
```