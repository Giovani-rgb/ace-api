const db = require('../services/firebase');
const collection = db.collection('members');

module.exports = {
  async getAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(data) {
    const docRef = await collection.add(data);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  },

  async getById(id) {
    const doc = await collection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
};
