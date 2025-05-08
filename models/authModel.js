const db = require('../services/firebase'); // conexão com Firestore

const collection = db.collection('auth_users');

module.exports = {
  async saveUser(userData) {
    if (!userData?.uid) throw new Error('Usuário sem UID');

    const userRef = collection.doc(userData.uid);

    await userRef.set({
      ...userData,
      lastVerified: new Date().toISOString()
    }, { merge: true });

    return { id: userRef.id, ...userData };
  }
};
