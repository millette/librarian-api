/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('search', async t => {
  const result = await fn.search('rollodeqc')
  t.is(result[0].repository_url.indexOf('https://github.com/millette/'), 0)
})

test('npm got', async t => {
  const result = await fn.platform('npm', 'got')
  t.is(result.name, 'got')
  t.is(result.platform, 'NPM')
  t.is(result.repository_url, 'https://github.com/sindresorhus/got')
  t.is(result.package_manager_url, 'https://www.npmjs.com/package/got')
})

test('npm got dependencies', async t => {
  const result = await fn.platform.dependencies('npm', 'got', '6.3.0')
  t.is(result.name, 'got') // FIXME
})

test('npm got dependents', async t => {
  const result = await fn.platform.dependents('npm', 'got')
  t.true(result.length > 5)
})

test('npm got dependent_repositories', async t => {
  const result = await fn.platform.dependent_repositories('npm', 'got')
  t.true(result.length > 5)
})

test('github', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github(a[0], a[1])
  t.is(result.full_name, a.join('/'))
})

test('github dependencies', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github.dependencies(a[0], a[1])
  t.is(result.full_name, a.join('/'))
  t.true(result.dependencies.length > 5)
})

test('github projects', async t => {
  const a = ['millette', 'rollodeqc-gh-utils']
  const result = await fn.github.projects(a[0], a[1])
  t.true(result.length > 0)
  t.is(result[0].name, a[1])
  t.is(result[0].platform, 'NPM')
})

test('package managers', t => {
  const result = Object.keys(fn.packageManagers)
  t.is(result.length, 26)
})

test.only('github projects 404', async t => {
  const a = ['kudlaj', 'jamendo-contest']
  const result = await fn.github.projects(a[0], a[1])
  t.is(result.length, 0)
})
