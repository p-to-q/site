#!/usr/bin/env node
/**
 * Fails when node_modules and package-lock.json disagree with package.json.
 *
 * Why: on 2026-10-23 node_modules held next 16.2.12 while package.json pinned
 * 16.4.2, so local checks (tests, build, browser measurements) verified a
 * different framework than CI and the deployment ran. Nothing in `npm test`
 * or `npm run build` notices that; `npm ci` is what fixes it.
 *
 * Offline and quick. Wired into `npm run check`, so it runs in CI and in the
 * pre-push hook.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'))
const manifest = readJson('package.json')
const lock = readJson('package-lock.json')

const problems = []

// 1. The lockfile was written from a different package.json (stale `npm install`).
const locked = lock.packages?.[''] ?? {}
for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
  const fromManifest = manifest[field] ?? {}
  const fromLock = locked[field] ?? {}
  for (const [name, range] of Object.entries(fromManifest)) {
    if (fromLock[name] !== range) {
      problems.push(`${field}.${name}: package.json wants ${range}, package-lock.json has ${fromLock[name] ?? 'nothing'} — run npm install`)
    }
  }
  for (const name of Object.keys(fromLock)) {
    if (!(name in fromManifest)) problems.push(`${field}.${name}: in package-lock.json but not in package.json — run npm install`)
  }
}
// `overrides` are not recorded in the lockfile root, but their effect is: the
// pinned versions below are the ones npm installed.

// 2. node_modules was installed from a different lockfile than the current one.
const wanted = { ...(locked.dependencies ?? {}), ...(locked.devDependencies ?? {}) }
for (const [name, range] of Object.entries(wanted)) {
  const expected = lock.packages?.[`node_modules/${name}`]?.version
  if (!expected) {
    problems.push(`${name}: in package.json but missing from package-lock.json — run npm install`)
    continue
  }
  let installed
  try {
    installed = readJson(`node_modules/${name}/package.json`).version
  } catch {
    problems.push(`${name}: not installed (node_modules/${name}) — run npm ci`)
    continue
  }
  if (installed !== expected) {
    problems.push(`${name}: node_modules has ${installed}, package-lock.json has ${expected} — run npm ci`)
  }
  if (/-(alpha|beta|rc|canary|next)/.test(installed) && !/^(canary|next)/.test(range)) {
    problems.push(`${name}: ${installed} is a pre-release while package.json asks for ${range}`)
  }
}

if (problems.length) {
  console.error('[check-install] node_modules does not match package.json / package-lock.json:')
  for (const problem of problems) console.error(`[check-install]   ${problem}`)
  console.error('[check-install] run: npm ci')
  process.exit(1)
}
console.log(`[check-install] node_modules matches package-lock.json (${Object.keys(wanted).length} packages)`)