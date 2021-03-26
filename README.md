<h1 align="center">
  <img src="seeker.png" alt=""><br>
  seeker<br>
  <p align="center">
    <a href="https://www.codacy.com/gh/upsect/seeker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=upsect/seeker&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/52b7a816d8e14600914773b0a9347411"/></a>
  </p>
</h1>

Seeker has the features that we all wish Node's `require` had from day one, like requiring a module and optionally falling back to another module if it's missing, or requiring a directory of modules and getting all of their exports conveniently organized by file name. Perfect for local development in a team environment, and for projects that frequently require batches of modules.

## Install
```
% npm install @upsect/seeker
```

## API

#### `.import({ module: [ list ]})`
- `list` `<string[]>` list of module names or paths

Returns the first module that resolves, otherwise returns `null`.
```js
const Seeker = require('seeker');

const Module = Seeker.import({ module: ['./module1', 'module2']});
```

#### `.import({ index: [ path ]})`
- `path` `<string>` path to modules directory

Returns an object with module exports, otherwise returns `null`. Supports CJS modules that export a function, array, plain object, or class. Index.js and dot files are ignored.

```js
const Seeker = require('seeker');

const Index = Seeker.import({ index: './my_modules' });

// my_modules/
// ├─ .dotfile
// ├─ index.js
// ├─ foo.service.js > function
// ├─ bar.plugins.js > [ function, function, ... ]
// ├─ baz.routes.js  > { get: function, post: function }
// ├─ qux.class.js   > class { ... }

// Returns {
//   foo: function,
//   bar: [ function, function ],
//   baz: { get: function, post: function },
//   qux: class { ... }
// }
```
