export type Priority = 1 | 2 | 3 | 4 | 5
export const priorityHighest: Priority = 1
export const priorityHigh: Priority = 2
export const priorityMedium: Priority = 3
export const priorityLow: Priority = 4
export const priorityLowest: Priority = 5
export const allPriorities: Priority[] = [
  priorityHighest,
  priorityHigh,
  priorityMedium,
  priorityLow,
  priorityLowest,
]

export function priority2Name(value: Priority): string {
  switch (value) {
    case priorityHighest:
      return "Highest"
    case priorityHigh:
      return "High"
    case priorityMedium:
      return "Medium"
    case priorityLow:
      return "Low"
    case priorityLowest:
      return "Lowest"
  }
  return "Unknown"
}