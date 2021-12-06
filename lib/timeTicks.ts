const ticks = [1, 5, 10, 30, 60, 120, 300, 600, 600*3, 3600, 3600*2, 3600*4, 3600*8, 3600*24,
               3600*24*2, 3600*24*4, 3600*24*7]
export default {
  format(val: number): string {
    const units: [number, string][] = [
      [3600*24*7, 'w'],
      [3600*24, 'd'],
      [3600, 'h'],
      [60, 'm'],
    ]
    for (const [v, u] of units) {
      if (val >= v) return `${val/(v as number)}${u}`
    }
    return `${val}s`
  },
  get(vals: number[], transform: any|null): number[] {
    console.log('vals', vals)
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    let first = 0
    let last = 0
    for (let i = 0; i < ticks.length; i++) {
      if (ticks[i] < min) first = i
      if (ticks[i] < max) last = i+2
    }
    const result = ticks.slice(first, last)
    if (!transform) return result
    return result.map(transform)
  },
} 
