# librarian-api
[![Build Status](https://travis-ci.org/millette/librarian-api.svg?branch=master)](https://travis-ci.org/millette/librarian-api)
[![Coverage Status](https://coveralls.io/repos/github/millette/librarian-api/badge.svg?branch=master)](https://coveralls.io/github/millette/librarian-api?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/librarian-api.svg)](https://gemnasium.com/github.com/millette/librarian-api)

> Client library for the libraries.io api.

## Install
```
$ npm install --save librarian-api
```
## New since version 0.1.0
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Usage
```js
const librarianApi = require('librarian-api');

librarianApi('unicorns');
//=> 'unicorns & rainbows'
```

## Environment variables
You'll need a token from <https://libraries.io/account> to call the API.

Define it as an environment variable:

```sh
export LIBRARIES_IO_TOKEN=abcd1234...
```

If you use another instance of libraries.io, you can define it the
same way:

```sh
export LIBRARIES_IO_ENDPOINT=http://example.com/api
```

Otherwise https://libraries.io/api is used.


## API
API Docs: https://libraries.io/api

### librarianApi.search(query)
#### query
Type: `string`

Lorem ipsum.

### librarianApi.platform(platform, name)
#### platform
Type: `string`

#### name
Type: `string`

Lorem ipsum.

### librarianApi.platform.dependencies(platform, name, version)
#### platform
Type: `string`

#### name
Type: `string`

#### version
Type: `string`

Lorem ipsum.

### librarianApi.platform.dependents(platform, name)
#### platform
Type: `string`

#### name
Type: `string`

Lorem ipsum.

### librarianApi.platform.dependent_repositories(platform, name)
#### platform
Type: `string`

#### name
Type: `string`

Lorem ipsum.


### librarianApi.github(owner, name)
#### owner
Type: `string`

#### name
Type: `string`

Lorem ipsum.

### librarianApi.github.dependencies(owner, name)
#### owner
Type: `string`

#### name
Type: `string`

Lorem ipsum.

### librarianApi.github.projects(owner, name)
#### owner
Type: `string`

#### name
Type: `string`

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

[update-notifier]: <https://github.com/yeoman/update-notifier>
