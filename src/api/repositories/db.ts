import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'integrated-material-platform'
const DB_VERSION = 1

let _db: IDBPDatabase | null = null

export const getDB = async (): Promise<IDBPDatabase> => {
  if (_db) return _db
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const stores = [
        'seasons', 'styles', 'articles', 'boms', 'items',
        'fabrics', 'materials', 'trims', 'buttons', 'buttonHoles',
        'zippers', 'graphics', 'topStitches', 'subTopStitches',
        'physicalPropertyTypes',
      ]
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: 'id' })
        }
      }
      if (!db.objectStoreNames.contains('materialTextures')) {
        db.createObjectStore('materialTextures', { keyPath: ['materialId', 'textureType'] })
      }
    },
  })
  return _db
}
