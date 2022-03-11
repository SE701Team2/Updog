// import { initializeApp, cert } from 'firebase-admin/app'
// import { getStorage } from 'firebase-admin/storage'
const firebaseAdmin = require('firebase-admin')

const serviceAccount = require('../updog-attachments-firebase-adminsdk-ygs6y-00f7d2000f.json')

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'gs://updog-attachments.appspot.com',
})
const bucket = firebaseAdmin.storage().bucket()

export default bucket
