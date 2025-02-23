#!/usr/bin/env -S npx tsx

/**
 * Convert OKLCH color values to RGB, reading from stdin.
 *
 * Usage:
 *
 *     $ echo -n "--color-my-var-name: oklch(0.985 0.002 247.839);" | oklch2rgb.ts
 *     --color-my-var-name: rgb(250, 250, 250);
 */

import fs from 'fs'

import * as culori from 'culori'

function oklch2rgb(oklchString: string): string {
  const [, valuesString] = oklchString.match(/oklch\((.*?)\)/)!
  const values = valuesString.split('/').map((v) => parseFloat(v))

  const [l, c, h, alpha] = values

  const parsed = culori.oklch({
    mode: 'oklch',
    l: l,
    c: c || 0,
    h: h || 0,
    alpha: alpha !== undefined ? alpha : 1,
  })

  const rgbConverted = culori.rgb(parsed)

  const r = Math.round(rgbConverted.r * 255)
  const g = Math.round(rgbConverted.g * 255)
  const b = Math.round(rgbConverted.b * 255)
  const a = rgbConverted.alpha

  if (a !== undefined && a !== 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

if (require.main === module) {
  const text = fs.readFileSync(process.stdin.fd, 'utf-8')
  const converted = text.replaceAll(/oklch\((.*?)\)/g, oklch2rgb)
  console.log(converted) // eslint-disable-line no-console
}
