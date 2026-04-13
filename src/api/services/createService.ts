import { IS_MOCK } from '../mock'
import { apiClient } from '../client'
import { createHandler } from '../mock/createHandler'

/**
 * IS_MOCK 환경 변수 하나로 mock/real을 전환하는 범용 서비스 팩토리.
 * mock: createHandler(repo) 호출 → IndexedDB CRUD
 * real: axios → REST API 호출
 *
 * 서비스 함수 시그니처는 mock/real 전환 시에도 변경되지 않는다.
 */
export const createService = <T extends { id: string }, CreateDto, UpdateDto>(
  endpoint: string,
  repo: {
    getAll: () => Promise<T[]>
    getById: (id: string) => Promise<T | undefined>
    put: (record: T) => Promise<void>
    delete: (id: string) => Promise<void>
    count: () => Promise<number>
  }
) => {
  const handler = createHandler<T, CreateDto, UpdateDto>(repo)

  return {
    getAll: (): Promise<T[]> =>
      IS_MOCK ? handler.getAll() : apiClient.get<T[]>(endpoint).then((r) => r.data),

    getById: (id: string): Promise<T> =>
      IS_MOCK ? handler.getById(id) : apiClient.get<T>(`${endpoint}/${id}`).then((r) => r.data),

    create: (dto: CreateDto): Promise<T> =>
      IS_MOCK ? handler.create(dto) : apiClient.post<T>(endpoint, dto).then((r) => r.data),

    update: (id: string, dto: UpdateDto): Promise<T> =>
      IS_MOCK ? handler.update(id, dto) : apiClient.patch<T>(`${endpoint}/${id}`, dto).then((r) => r.data),

    remove: (id: string): Promise<void> =>
      IS_MOCK ? handler.remove(id) : apiClient.delete(`${endpoint}/${id}`).then(() => undefined),
  }
}
