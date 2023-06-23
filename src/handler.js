const {getParsedBody} = require('./scrap')
const file = require('fs')


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

function post(req, res){

    let list = []

    getParsedBody('https://brandmark.io/logo-rank/', req.file.filename)
      .then(result => {
        list.push(...result)
        setTimeout(()=>{console.log(list)}, 3000)
        file.unlink(`files/${req.file.path.slice(6)}`, (err)=>{
          if(err)
            console.log(err)
        })
        const obj = {'uniqueness':list[0], 'legibility':list[1], 'color': list[2], 'overall': list[3]}
        if(list[0] == ''){
          console.log('empty result: recalling the post function')
          post(req, res)
        }
        res.json(JSON.stringify(obj))
        return list
      })

      list = []
}

module.exports = {
    post, 
    verifyDirectory
}
