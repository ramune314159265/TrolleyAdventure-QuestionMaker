import Dexie from 'dexie'

export const db = new Dexie('ramune314159265.trolleyadventurequestionmaker')

db.version(1).stores({
	questions: 'id',
	files: 'id',
})
