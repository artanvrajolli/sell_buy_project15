import { join } from 'path'
import multer from 'multer'
import { randomID } from '../utils/utils'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${join(__dirname, '../../public/images')}`)
    },
    filename: function (req, file, cb) {
        let id = randomID()
      cb(null, id + '.jpg')
    }
})

var upload = multer({ storage: storage })
export let productImages = upload.fields([{ name: 'photos', maxCount: 12 }])