import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // ?might need to update so there are more than one values?
export const putDb = async (content) => {
  try {
    const contentDb = await openDB('jate', 1)
    const tx = contentDb.transaction('jate', 'readwrite')
    const store = tx.objectStore('jate')
    const { id, ...contentWithoutId } = content
    const req = store.add(contentWithoutId)
    const result = await req
    console.log('database updated', result)
  } catch (error) {
    console.log('error adding to database', error);
  }
}


export const getDb = async () => {
  try {
    const contentDb = await openDB('jate', 1)
    const tx = contentDb.transaction('jate')
    const store = tx.objectStore('jate')
    const req = store.getAll()
    const result = await req
        console.log(result)
        return result.content
  } catch (error) {
    console.log('Error retrieving text from database', error);
  }
}

initdb();
