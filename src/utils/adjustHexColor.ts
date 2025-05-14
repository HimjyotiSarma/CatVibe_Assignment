/**
 * Darkens (or lightens, if amt is positive) a hex color by amt.
 * @param hex A string like "#84cfdf" or "84cfdf"
 * @param amt Negative to darken, positive to lighten (range -255..255)
 */
function adjustHexColor(hex: string, amt: number): string {
  let color = hex.replace(/^#/, '')
  if (color.length === 3) {
    // expand shorthand like "abc" → "aabbcc"
    color = color
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) + amt
  let g = ((num >> 8) & 0x00ff) + amt
  let b = (num & 0x0000ff) + amt

  // clamp each channel to [0,255]
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export default adjustHexColor
