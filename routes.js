const route = require('express').Router()
const multer = require('multer')
const {getParsedBody} = require('./scrap')
const file = require('fs')


const dir = 'files'

function verifyDirectory(dir){

  return new Promise((resolve, reject)=>{
    file.stat(dir, (err, stats) => {
      if(err){
        if(err.code === 'ENOENT'){
          console.log('O diretorio não existe');
          file.mkdir('files', (err)=>{
            if(err){
              console.log('Ocorreu um erro ao criar o diretorio: ', err)
            }
          })
        }else{
          console.log('Ocorreu um erro ao verificar o diretorio: ', err)
        }
      }else{
        if(stats.isDirectory()){
          console.log('O diretório existe')
        }else{
          console.log('O caminho fornecido não é um diretório.');
          file.mkdir('files', (err)=>{
            if(err){
              console.log('Ocorreu um erro ao criar o diretorio: ', err)
            }
          })
        }
      }
    })

    resolve('Diretorio : ok')
  })

   
}

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

  let list = []

  route.post('/up', upload.single('file'), (req, res, next) => {
        
    try{

      console.log('arquivo enviado para porta 3001')
      console.log(req.file)
      
      getParsedBody('https://brandmark.io/logo-rank/', req.file.filename)
      .then(result => {
        list.push(...result)
        setTimeout(()=>{console.log(list)}, 3000)
        file.unlink(`files/${req.file.path.slice(6)}`, (err)=>{
          if(err)
            console.log(err)
        })
        const obj = {'uniqueness':list[0], 'legibility':list[1], 'color': list[2], 'overall': list[3]}
        //veriicar if(list[0] == ''){chamar função post()}
        res.json(JSON.stringify(obj))
        return list
      })
        list = []
    }catch(err){
        console.log(err)
    }
  })
})

function post(){

  
}
  



module.exports = route