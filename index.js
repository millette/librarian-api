/*
Client library for the libraries.io api.

Copyright 2016-2019 Robin Millette
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
For platforms, see https://github.com/librariesio/package-managers
*/

// core
// const url = require('url')
const { URL, URLSearchParams } = require('url')
// const fs = require('fs')

// npm
const got = require('got')
const RLP = require('rate-limit-promise')
const dotenv = require('dotenv')

// console.log('ok...')
// environment from .env
try {
  // fs.accessSync('.env', fs.R_OK)
  // console.log('load!')
  dotenv.config()
} catch (e) {
  // console.log('nope')
}

// console.log('ok222...')

// https://libraries.io/account
// export LIBRARIES_IO_TOKEN=d8de9f...
const LIBRARIES_IO_TOKEN = process.env.LIBRARIES_IO_TOKEN
const LIBRARIES_IO_ENDPOINT = process.env.LIBRARIES_IO_ENDPOINT || 'https://libraries.io/api'

if (!LIBRARIES_IO_TOKEN) {
  console.error('LIBRARIES_IO_TOKEN environment variable is required.')
  console.error('Get one at https://libraries.io/account')
  process.exit(1)
}

// exports.packageManagers = require('librarian-package-managers')
// const platforms = require('librarian-package-managers')

const rateLimter = new RLP(3, 4000)

/*
So...

Query parameters: q, page, per_page, include_prerelease and api_key
Request options: method (GET, POST, etc.)

*/

const callApi = function (api, options) {
  const REPEATS = 5
  const oo = { }
  let r
  if (!options) { options = { } }
  for (r in options) { oo[r] = options[r] }
  delete options.times
  if (typeof oo.times === 'undefined') { oo.times = REPEATS }
  if (!options.api_key) { options.api_key = LIBRARIES_IO_TOKEN }
  const urlObj = new URL(LIBRARIES_IO_ENDPOINT)
  const requestOptions = { }
  const raw = options.raw
  delete options.raw
  if (options.method) {
    requestOptions.method = options.method
    delete options.method
  }
  urlObj.pathname += '/' + api
  urlObj.search = new URLSearchParams(options)

  return rateLimter()
    .then(got.bind(null, urlObj, requestOptions))
    .then((x) => {
      x.body = JSON.parse(x.body)
      return raw ? x : x.body
    })
    .catch((e) => new Promise((resolve, reject) =>
      setTimeout(() => {
        if (e.statusCode >= 500 && --oo.times) { return resolve(callApi(api, oo)) }
        reject(e)
      }, Math.pow(2, (2 + REPEATS - oo.times)) * (11000 - Math.random() * 2000))
    ))
}

exports.search = function (options) {
  if (typeof options === 'string') { options = { q: options } }
  return callApi('search', options)
}

exports.platform = function (platform, name, options) {
// ### Project
// https://libraries.io/api/:platform/:name
  return callApi(platform + '/' + name, options)
}

exports.platform.dependencies = function (platform, name, version, options) {
// ### Project Dependencies
// https://libraries.io/api/:platform/:name/:version/dependencies
  const args = Array.prototype.slice.call(arguments, 0, 3)
  args.push('dependencies')
  return callApi(args.join('/'), options)
}

exports.platform.dependents = function (platform, name, options) {
// ### Project Dependents
// https://libraries.io/api/:platform/:name/dependents
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.push('dependents')
  return callApi(args.join('/'), options)
}

exports.platform.dependent_repositories = function (platform, name, options) {
// ### Project Dependent Repositories
// https://libraries.io/api/:platform/:name/dependent_repositories
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.push('dependent_repositories')
  return callApi(args.join('/'), options)
}

exports.github = function (owner, name, options) {
// ### GitHub Repository
// https://libraries.io/api/github/:owner/:name
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('github')
  return callApi(args.join('/'), options)
}

exports.github.dependencies = function (owner, name, options) {
// ### GitHub Repository Dependencies
// https://libraries.io/api/github/:owner/:name/dependencies
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('github')
  args.push('dependencies')
  return callApi(args.join('/'), options)
}

exports.github.projects = function (owner, name, options) {
// ### GitHub Repository Projects
// https://libraries.io/api/github/:owner/:name/projects
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('github')
  args.push('projects')
  return callApi(args.join('/'), options)
    .catch((e) => e.statusCode === 404 ? [] : Promise.reject(e))
}

exports.githubUser = function (login, options) {
// ### GitHub User
// https://libraries.io/api/github/:login
  const args = Array.prototype.slice.call(arguments, 0, 1)
  args.unshift('github')
  return callApi(args.join('/'), options)
}

exports.githubUser.repositories = function (login, options) {
// ### GitHub User Repositories
// https://libraries.io/api/github/:login/repositories
  const args = Array.prototype.slice.call(arguments, 0, 1)
  args.unshift('github')
  args.push('repositories')
  return callApi(args.join('/'), options)
}

exports.githubUser.projets = function (login, options) {
// ### GitHub User Projets
// https://libraries.io/api/github/:login/projects
  const args = Array.prototype.slice.call(arguments, 0, 1)
  args.unshift('github')
  args.push('projects')
  return callApi(args.join('/'), options)
}

exports.subscriptions = function (options) {
  return callApi('subscriptions', options)
}

exports.subscribe = function (platform, name, options) { // , includePrerelease
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('subscriptions')
  return callApi(args.join('/'), options)
}

exports.subscribed = function (platform, name, options) {
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('subscriptions')
  // GET METHOD!!
  return callApi(args.join('/'), options)
}

exports.updateSubscribe = function (platform, name, options) { // , includePrerelease
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('subscriptions')
  // PUT METHOD!!
  if (!options) { options = { } }
  options.method = 'PUT'
  return callApi(args.join('/'), options)
}

exports.unsubscribe = function (platform, name, options) {
  const args = Array.prototype.slice.call(arguments, 0, 2)
  args.unshift('subscriptions')
  // DELETE METHOD!!
  if (!options) { options = { } }
  options.method = 'DELETE'
  return callApi(args.join('/'), options)
}
