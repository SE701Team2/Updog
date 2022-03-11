import { initializeApp, cert } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

const serviceAccount = require('../updog-attachments-firebase-adminsdk-ygs6y-00f7d2000f.json')

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://updog-attachments.appspot.com',
})
const bucket = getStorage().bucket()

export default bucket
