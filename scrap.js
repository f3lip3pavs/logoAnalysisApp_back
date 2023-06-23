const puppeteer = require("puppeteer")

function delay(time) {

    return new Promise(r => setTimeout(r, time)) //r é função disparada apos a resolução da promise no then()

}

//recebe um arquivo de imagem e a pagina atual como parametros e envia o arquivo de imagem
async function sendFile(imgFile, actualPage){

    const [fileChooser] = await Promise.all([
        actualPage.waitForFileChooser(),
        actualPage.click('#upload')
    ])

    await fileChooser.accept([`./files/${imgFile}`])
}

async function getData(time, actualPage){

    const scrapObj = delay(time).then(async () => {    
        
        let scrapObj = []
        

        scrapObj.push(actualPage.evaluate(() => {
        
            const containers = document.querySelectorAll('.col-md-12 .progressbar-text')
            
            const results = []
          
            containers.forEach(index => {

                if(index.innerHTML != undefined)
                {
                    
                    results.push(index.innerHTML)
                    return results
                }
            })
            
            return results
        })
        )
        
        return scrapObj[0].then(res => {return res})
    })

    return scrapObj
}

async function getParsedBody(url, img){

    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage()

    await page.goto(url)

    sendFile(img, page)

    const scrapObj = await getData(5000, page)

    browser.close()
    
    return scrapObj

}

module.exports = {
    getParsedBody,
    delay
    }
