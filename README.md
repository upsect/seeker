<h1 align="center">
  <img src="seeker.png" alt=""><br>
  seeker<br>
  <p align="center">
    <a href="https://twitter.com/nallenscott">
      <img src="https://img.shields.io/badge/contact-nallenscott-blue?style=flat" alt="contact">
    </a>
  </p>
</h1>

Seeker is a Node utility that checks if a module is installed and optionally falls back to another module if it's missing. Perfect for development – use local packages while the rest of your team uses the registery.

## Install
```bash
$ npm install @upsect/seeker
```

## API

### .exists(module)
- `module` \<string\> module name or path

Returns `true` if the module resolves, otherwise returns `false`.

```js
const { seeker } = require('seeker')

const module = seeker.exists('module')
```

### .import(module1 [,module2 ...])
- `module` \<string\> module name or path

Returns the first module that resolves, otherwise returns `null`.
```js
const { seeker } = require('seeker')

const module = seeker.import('./module1', 'module2')
```
