let counter = 1
export const generateId = () => `mock-${Date.now()}-${counter++}`
