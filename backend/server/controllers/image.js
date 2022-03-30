/* eslint-disable no-console */
import bucket from '../../config/cloudstorage'
import { Readable } from 'stream'

// Upload a file to the storage, then create attachment object to be appended into the Database.
async function uploadImageToBucket(buffer, filename, mimetype) {
  const stream = Readable.from(buffer)

  const writeStream = bucket.file(`images/${filename}`).createWriteStream({
    metadata: {
      contentType: mimetype,
    },
  })

  const pipedStreams = stream.pipe(writeStream)

  const result = new Promise((resolve, reject) => {
    pipedStreams.on('finish', () => {
      resolve({
        imageURI: `${process.env.BACKEND_URL}images/${filename}`,
      })
    })

    pipedStreams.on('error', (err) => {
      console.log(err)
      reject(err)
    })
  })

  return result
}

// Download a file from the storage
async function downloadImageFromBucket(res, filename) {
  const image = bucket.file(`images/${filename}`)

  const stream = image.createReadStream()
  stream.on('data', (data) => {
    res.write(data)
  })
  stream.on('end', () => {
    res.status(200).send()
  })
  stream.on('error', (err) => {
    res.status(err.code).send(err.message)
  })
}

// Example method for downloading File from Cloud Storage
export const getImage = async (req, res) => {
  return downloadImageFromBucket(res, req.params.filename)
}

export const uploadImage = async (req, res) => {
  if (req.files) {
    const file = req.files.attachments
    if (!!file && file.constructor === Array) {
      file.forEach(async (x) => {
        uploadImageToBucket(x.data, x.name, x.mimetype)
      })
    } else {
      uploadImageToBucket(file.data, file.name, file.mimetype)
    }
  }
  res.status(200).send()
}
