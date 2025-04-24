import { alphaHexValues, getColorWithAlpha } from '../colors'

describe('alphaHexValues', () => {
  it('contains hex values for all percentage points from 0% to 100%', () => {
    expect(Object.keys(alphaHexValues).length).toBe(101)
    expect(alphaHexValues['0%']).toBe('00')
    expect(alphaHexValues['50%']).toBe('80')
    expect(alphaHexValues['100%']).toBe('FF')
  })

  it('has correct hex values for specific alpha percentages', () => {
    expect(alphaHexValues['25%']).toBe('40')
    expect(alphaHexValues['75%']).toBe('BF')
    expect(alphaHexValues['10%']).toBe('1A')
    expect(alphaHexValues['90%']).toBe('E6')
  })
})

describe('getColorWithAlpha', () => {
  it('appends the correct alpha hex value to a color', () => {
    expect(getColorWithAlpha('#FFFFFF', 100)).toBe('#FFFFFFFF')
    expect(getColorWithAlpha('#000000', 50)).toBe('#00000080')
    expect(getColorWithAlpha('#FF0000', 25)).toBe('#FF000040')
  })

  it('handles colors without # prefix', () => {
    expect(getColorWithAlpha('FFFFFF', 100)).toBe('FFFFFFFF')
    expect(getColorWithAlpha('000000', 50)).toBe('00000080')
  })

  it('defaults to 00 for invalid alpha percentages', () => {
    expect(getColorWithAlpha('#FFFFFF', 101)).toBe('#FFFFFF00')
    expect(getColorWithAlpha('#FFFFFF', -1)).toBe('#FFFFFF00')
  })
})
