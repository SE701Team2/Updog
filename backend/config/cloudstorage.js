const firebaseAdmin = require('firebase-admin')

// path to the Firebase API key.
const serviceAccount = require('../updog-attachments-firebase-adminsdk-ygs6y-00f7d2000f.json')

// Initialising the app and storage bucket
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'gs://updog-attachments.appspot.com',
})
const bucket = firebaseAdmin.storage().bucket()

export default bucket
