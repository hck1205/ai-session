import { getDB } from './db'

/**
 * 단일 keyPath('id') store에 대한 범용 CRUD repository를 생성한다.
 * 엔티티별 반복 코드를 제거하기 위해 팩토리 패턴 사용.
 */
export const createRepository = <T extends { id: string }>(storeName: string) => ({
  getAll: async (): Promise<T[]> => {
    const db = await getDB()
    return db.getAll(storeName) as Promise<T[]>
  },
  getById: async (id: string): Promise<T | undefined> => {
    const db = await getDB()
    return db.get(storeName, id) as Promise<T | undefined>
  },
  put: async (record: T): Promise<void> => {
    const db = await getDB()
    await db.put(storeName, record)
  },
  bulkPut: async (records: T[]): Promise<void> => {
    if (records.length === 0) return
    const db = await getDB()
    const tx = db.transaction(storeName, 'readwrite')
    await Promise.all(records.map((record) => tx.store.put(record)))
    await tx.done
  },
  delete: async (id: string): Promise<void> => {
    const db = await getDB()
    await db.delete(storeName, id)
  },
  count: async (): Promise<number> => {
    const db = await getDB()
    return db.count(storeName)
  },
})
