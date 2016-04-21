/*
Client library for the libraries.io api.

Copyright 2016 Robin Millette
http://robin.millette.info/
robin@millette.info

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

/*
API Docs: https://libraries.io/api

For platforms, see <https://github.com/librariesio/package-managers>
(using 2acbd6cd5eed9d8d9560c42b40ccde0a7571813e)
*/

// core
const url = require('url')

// npm
const got = require('got')

// https://libraries.io/account
// export LIBRARIES_IO_TOKEN=d8de9f...
const LIBRARIES_IO_TOKEN = process.env['LIBRARIES_IO_TOKEN']
const LIBRARIES_IO_ENDPOINT = process.env['LIBRARIES_IO_ENDPOINT'] || 'https://libraries.io/api'

// https://raw.githubusercontent.com/librariesio/package-managers/2acbd6cd5eed9d8d9560c42b40ccde0a7571813e/package-managers.json
exports.packageManagers = require('librarian-package-managers')

const apiMethod = function (method, qs) {
  if (!qs) { qs = {} }
  if (!qs.api_key) { qs.api_key = LIBRARIES_IO_TOKEN }
  let urlObj = url.parse(LIBRARIES_IO_ENDPOINT)
  urlObj.pathname += '/' + method
  urlObj.query = qs
  return got(url.format(urlObj)).then((x) => JSON.parse(x.body))
}

exports.search = function (q) {
  return apiMethod('search', { q: q })
}

exports.platform = function (platform, name) {
// ### Project
// https://libraries.io/api/:platform/:name
  return apiMethod(platform + '/' + name)
}

exports.platform.dependencies = function (platform, name, version) {
// ### Project Dependencies
// https://libraries.io/api/:platform/:name/:version/dependencies
  const args = Array.prototype.slice.call(arguments)
  args.push('dependencies')
  return apiMethod(args.join('/'))
}

exports.platform.dependents = function (platform, name) {
// ### Project Dependents
// https://libraries.io/api/:platform/:name/dependents
  const args = Array.prototype.slice.call(arguments)
  args.push('dependents')
  return apiMethod(args.join('/'))
}

exports.platform.dependent_repositories = function (platform, name) {
// ### Project Dependent Repositories
// https://libraries.io/api/:platform/:name/dependent_repositories
  const args = Array.prototype.slice.call(arguments)
  args.push('dependent_repositories')
  return apiMethod(args.join('/'))
}

exports.github = function (owner, name) {
// ### GitHub Repository
// https://libraries.io/api/github/:owner/:name
  const args = Array.prototype.slice.call(arguments)
  args.unshift('github')
  return apiMethod(args.join('/'))
}

exports.github.dependencies = function (owner, name) {
// ### GitHub Repository Dependencies
// https://libraries.io/api/github/:owner/:name/dependencies
  const args = Array.prototype.slice.call(arguments)
  args.unshift('github')
  args.push('dependencies')
  return apiMethod(args.join('/'))
}

exports.github.projects = function (owner, name) {
// ### GitHub Repository Projects
// https://libraries.io/api/github/:owner/:name/projects
  const args = Array.prototype.slice.call(arguments)
  args.unshift('github')
  args.push('projects')
  return apiMethod(args.join('/'))
}
