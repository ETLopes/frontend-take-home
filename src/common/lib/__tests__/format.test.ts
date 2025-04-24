import { formatCurrency } from '../format'

describe('formatCurrency', () => {
  it('formats whole numbers with two decimal places', () => {
    expect(formatCurrency(100)).toBe('100.00')
    expect(formatCurrency(0)).toBe('0.00')
    expect(formatCurrency(1000)).toBe('1,000.00')
  })

  it('formats decimal numbers with two decimal places', () => {
    expect(formatCurrency(100.5)).toBe('100.50')
    expect(formatCurrency(100.55)).toBe('100.55')
    expect(formatCurrency(100.555)).toBe('100.56') // rounds up
    expect(formatCurrency(100.554)).toBe('100.55') // rounds down
  })

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-100)).toBe('-100.00')
    expect(formatCurrency(-100.55)).toBe('-100.55')
  })

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1000000)).toBe('1,000,000.00')
    expect(formatCurrency(1234567.89)).toBe('1,234,567.89')
  })
})
