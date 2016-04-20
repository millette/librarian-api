# librarian-api [![Build Status](https://travis-ci.org/millette/librarian-api.svg?branch=master)](https://travis-ci.org/millette/librarian-api) [![Coverage Status](https://coveralls.io/repos/github/millette/librarian-api/badge.svg?branch=master)](https://coveralls.io/github/millette/librarian-api?branch=master)
> Client library for the libraries.io api.

## Install
```
$ npm install --save librarian-api
```

## Usage
```js
const librarianApi = require('librarian-api');

librarianApi('unicorns');
//=> 'unicorns & rainbows'
```

## API
### librarianApi(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## CLI
```
$ npm install --global librarian-api
```

```
$ librarian-api --help

  Usage
    librarian-api [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ librarian-api
    unicorns & rainbows
    $ librarian-api ponies
    ponies & rainbows
```


## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)
