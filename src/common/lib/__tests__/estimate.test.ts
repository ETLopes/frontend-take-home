import { calculateSectionTotal, calculateEstimateTotal } from '../estimate'
import { Estimate, UnitOfMeasure } from '@/data'

describe('calculateSectionTotal', () => {
  it('calculates the total of a section with multiple rows', () => {
    const section = {
      id: '1',
      title: 'Test Section',
      rows: [
        { id: '1', title: 'Item 1', price: 100, quantity: 2, uom: 'EA' as UnitOfMeasure },
        { id: '2', title: 'Item 2', price: 50, quantity: 3, uom: 'EA' as UnitOfMeasure },
        { id: '3', title: 'Item 3', price: 75, quantity: 1, uom: 'EA' as UnitOfMeasure }
      ]
    }

    expect(calculateSectionTotal(section)).toBe(425)
  })

  it('returns 0 for a section with no rows', () => {
    const section = {
      id: '1',
      title: 'Empty Section',
      rows: []
    }

    expect(calculateSectionTotal(section)).toBe(0)
  })

  it('handles decimal prices correctly', () => {
    const section = {
      id: '1',
      title: 'Decimal Section',
      rows: [
        { id: '1', title: 'Item 1', price: 10.5, quantity: 2, uom: 'EA' as UnitOfMeasure },
        { id: '2', title: 'Item 2', price: 5.75, quantity: 4, uom: 'EA' as UnitOfMeasure }
      ]
    }

    expect(calculateSectionTotal(section)).toBe(44)
  })
})

describe('calculateEstimateTotal', () => {
  it('calculates the total of an estimate with multiple sections', () => {
    const estimate: Estimate = {
      id: '1',
      title: 'Test Estimate',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [
        {
          id: '1',
          title: 'Section 1',
          rows: [
            { id: '1', title: 'Item 1', price: 100, quantity: 2, uom: 'EA' as UnitOfMeasure },
            { id: '2', title: 'Item 2', price: 50, quantity: 1, uom: 'EA' as UnitOfMeasure }
          ]
        },
        {
          id: '2',
          title: 'Section 2',
          rows: [
            { id: '3', title: 'Item 3', price: 75, quantity: 3, uom: 'EA' as UnitOfMeasure },
            { id: '4', title: 'Item 4', price: 25, quantity: 4, uom: 'EA' as UnitOfMeasure }
          ]
        }
      ]
    }

    expect(calculateEstimateTotal(estimate)).toBe(575)
  })

  it('returns 0 for an estimate with no sections', () => {
    const estimate: Estimate = {
      id: '1',
      title: 'Empty Estimate',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: []
    }

    expect(calculateEstimateTotal(estimate)).toBe(0)
  })

  it('returns 0 for an estimate with sections but no rows', () => {
    const estimate: Estimate = {
      id: '1',
      title: 'Estimate with Empty Sections',
      createdAt: new Date(),
      updatedAt: new Date(),
      sections: [
        {
          id: '1',
          title: 'Empty Section 1',
          rows: []
        },
        {
          id: '2',
          title: 'Empty Section 2',
          rows: []
        }
      ]
    }

    expect(calculateEstimateTotal(estimate)).toBe(0)
  })
})
