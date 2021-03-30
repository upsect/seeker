<h1 align="center">
  <img src="seeker.png" alt=""><br>
  seeker<br>
  <p align="center">
    <a href="https://www.codacy.com/gh/upsect/seeker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=upsect/seeker&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/52b7a816d8e14600914773b0a9347411"/></a>
    <a href="https://www.codacy.com/gh/upsect/seeker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=upsect/seeker&amp;utm_campaign=Badge_Coverage"><img src="https://app.codacy.com/project/badge/Coverage/52b7a816d8e14600914773b0a9347411"/></a>
  </p>
</h1>

Seeker is a Node.js utility for effortlessly requiring one or many modules, whether they exist or not. Require a module and optionally fall back to another module if it's missing, or require a directory of modules and get all of their exports conveniently organized by file name. Perfect for local development in a team environment, and for projects that frequently require batches of modules.

## Install
```text
% npm install @upsect/seeker
```

## API

### `.import({ module: [ list ]})`
- `list` `<string[]>` list of module names or paths

Returns the first module that resolves, otherwise returns `null`.
```js
const Seeker = require('seeker');

const Module = Seeker.import({ module: ['./module1', 'module2']});
```

### `.import({ index: [ path ]})`
- `path` `<string>` path to modules directory

Returns an object with module exports, otherwise returns `null`. Supports CJS modules that export a function, array, plain object, or class. Index.js and dot files are ignored. Refer to the test folder for examples.

```js
const Seeker = require('seeker');

const Index = Seeker.import({ index: './my_modules' });
```
