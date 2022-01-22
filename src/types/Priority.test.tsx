import {
  priority2Name,
  priorityHigh,
  priorityHighest,
  priorityLow,
  priorityLowest,
  priorityMedium,
} from './Priority'

describe('priority2Name', () => {
  const testCases = [
    {
      description: '正常系: Highest',
      inPriority: priorityHighest,
      want: 'Highest',
    },
    {
      description: '正常系: High',
      inPriority: priorityHigh,
      want: 'High',
    },
    {
      description: '正常系: Medium',
      inPriority: priorityMedium,
      want: 'Medium',
    },
    {
      description: '正常系: Low',
      inPriority: priorityLow,
      want: 'Low',
    },
    {
      description: '正常系: Lowest',
      inPriority: priorityLowest,
      want: 'Lowest',
    },
  ]

  for (const testCase of testCases) {
    const { description, inPriority, want } = testCase

    test(description, () => {
      const got = priority2Name(inPriority)
      expect(got).toEqual(want)
    })
  }
})
