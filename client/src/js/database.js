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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const contentDb = await openDB('jate', 1)
    contentDb.transaction('jate', 'readwrite').objectStore('jate').add('content')
  } catch (error) {
    console.log('error adding to database', error);
  }



  // const contentDb = await openDB('jate', 1)

  // const tx = contentDb.transaction('jate', 'readwrite')

  // const store = tx.objectStore('jate')

  // const req = store.add({ content})

  // const result = await req

  // console.log('Content Saved!', result)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const contentDb = await openDB('jate', 1)
  contentDb.transaction('jate')
    .objectStore('jate')
    .getAll().onsuccess = (event) =>{
      console.log(contentDb)
      return event.target.result.content
    }

  // const tx = contentDb.transaction('jate', 'readonly')

  // const store = tx.objectStore('jate')

  // const req = store.getAll()

  // const result = await req
  // console.log('result.value', result)
  // return JSON.stringify(result)
}

initdb();
