'use strict'

// environment from .env
// require('dotenv').load() // doing it in index.js, is that enough?

import test from 'ava'
import fn from './'

test.serial('search', async t => {
  const result = await fn.search('rollodeqc')
  t.is(result[0].repository_url.indexOf('https://github.com/millette/'), 0)
})

test.serial('search paged', async t => {
  const result = await fn.search({ q: 'rollodeqc', per_page: 5, raw: true })
  // console.log(result.headers)
  t.is(result.body.length, 5)
  t.is(result.body[0].repository_url.indexOf('https://github.com/millette/'), 0)

  const result2 = await fn.search({ q: 'rollodeqc', page: 2, per_page: 5, raw: true })
  // console.log(result2.headers)
  t.is(result2.body.length, 5)
  t.is(result2.body[0].repository_url.indexOf('https://github.com/millette/'), 0)

  const result3 = await fn.search({ q: 'rollodeqc', page: 3, per_page: 5, raw: true })
  // console.log(result3.headers)
  t.is(result3.body.length, 5)
  t.is(result3.body[0].repository_url.indexOf('https://github.com/millette/'), 0)
})

test.serial('search raw', async t => {
  const result = await fn.search({ q: 'rollodeqc', raw: true })
  t.is(result.body[0].repository_url.indexOf('https://github.com/millette/'), 0)
})

test.serial('npm got', async t => {
  const result = await fn.platform('npm', 'got')
  t.is(result.name, 'got')
  t.is(result.platform, 'NPM')
  t.is(result.repository_url, 'https://github.com/sindresorhus/got')
  t.is(result.package_manager_url, 'https://www.npmjs.com/package/got')
})

test.serial('npm got raw', async t => {
  const result = await fn.platform('npm', 'got', { raw: true })
  const r2 = result.body
  // console.log(result.headers)

  t.is(r2.name, 'got')
  t.is(r2.platform, 'NPM')
  t.is(r2.repository_url, 'https://github.com/sindresorhus/got')
  t.is(r2.package_manager_url, 'https://www.npmjs.com/package/got')
})

test.serial('npm got dependencies', async t => {
  const result = await fn.platform.dependencies('npm', 'got', '6.3.0')
  t.is(result.name, 'got') // FIXME
})

test.serial('npm got dependencies', async t => {
  const result = await fn.platform.dependencies('npm', 'got', '6.3.0', { raw: true })
  // console.log(result.headers)
  t.is(result.body.name, 'got') // FIXME
})

test.serial('npm got dependents', async t => {
  const result = await fn.platform.dependents('npm', 'got')
  t.true(result.length > 5)
})

test.serial('npm got dependent_repositories', async t => {
  const result = await fn.platform.dependent_repositories('npm', 'got')
  t.true(result.length > 5)
})

test.serial('github', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github(a[0], a[1])
  t.is(result.full_name, a.join('/'))
})

test.serial('github dependencies', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github.dependencies(a[0], a[1])
  t.is(result.full_name, a.join('/'))
  t.true(result.dependencies.length > 5)
})

test.serial('github projects', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github.projects(a[0], a[1])
  t.true(result.length > 0)
  t.is(result[0].name, a[1])
  t.is(result[0].platform, 'NPM')
})

test.serial('github projects 404', async t => {
  const a = ['kudlaj', 'jamendo-contest']
  const result = await fn.github.projects(a[0], a[1])
  t.is(result.length, 0)
})
