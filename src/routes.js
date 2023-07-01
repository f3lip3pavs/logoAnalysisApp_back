const route = require('express').Router()
const multer = require('multer')
const {post} = require('./handler')
const {verifyDirectory} = require('./handler')

const dir = 'files'
let storage

verifyDirectory(dir).then(()=>{
  storage = multer.diskStorage({
      destination: function (req, file, cb) {
        verifyDirectory(dir)
        cb(null, dir)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
      }
    }
  )

  const upload = multer({ storage: storage })

route.post('/up', upload.single('file'), (req, res, next) => {

  try{

    console.log('arquivo enviado para porta 3001')
    console.log(req.file)

    post(req, res).then( json => {
      res.json( json )
    })

    }catch(err){
      console.log(err)
    }
  })
})

module.exports = route