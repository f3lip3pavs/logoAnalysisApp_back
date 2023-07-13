const route = require('express').Router()
const multer = require('multer')
const {post} = require('./handler')
const {verifyDirectory} = require('./handler')
const fs = require('fs')

const dir = 'files'
const cacheDir = '.cache'
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

  verifyDirectory(cacheDir).then(()=>{

    fs.chmod(`C:\\workspace\\temp-test\\${cacheDir}`, '777', (err) => {
      if (err) {
       console.error('Erro ao modificar as permissões do diretório:', err);
        return;
     }
    
      console.log('Permissões do diretório modificadas com sucesso.');
    });

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
})

module.exports = route