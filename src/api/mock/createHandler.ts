import { generateId } from './utils'

/**
 * 단일 keyPath('id') repository에 대한 범용 CRUD mock handler를 생성한다.
 * repository를 직접 호출해 실제 IndexedDB CRUD가 동작한다.
 */
export const createHandler = <T extends { id: string }, CreateDto, UpdateDto>(repo: {
  getAll: () => Promise<T[]>
  getById: (id: string) => Promise<T | undefined>
  put: (record: T) => Promise<void>
  delete: (id: string) => Promise<void>
}) => ({
  getAll: (): Promise<T[]> => repo.getAll(),

  getById: async (id: string): Promise<T> => {
    const item = await repo.getById(id)
    if (!item) throw new Error(`Not found: ${id}`)
    return item
  },

  create: async (dto: CreateDto): Promise<T> => {
    const record = { ...dto, id: generateId() } as unknown as T
    await repo.put(record)
    return record
  },

  update: async (id: string, dto: UpdateDto): Promise<T> => {
    const existing = await repo.getById(id)
    if (!existing) throw new Error(`Not found: ${id}`)
    const updated = { ...existing, ...dto } as T
    await repo.put(updated)
    return updated
  },

  remove: async (id: string): Promise<void> => {
    await repo.delete(id)
  },
})
