const puppeteer = require("puppeteer")
const PCR = require("puppeteer-chromium-resolver");

// const puppeteerCore = require('puppeteer-core');
// const path = require('path');
// const os = require('os');

// async function downloadChromium() {
//   const cacheDirectory =
//     process.env['PUPPETEER_CACHE_DIR'] ||
//     process.env['npm_config_puppeteer_cache_dir'] ||
//     process.env['npm_package_config_puppeteer_cache_dir'] ||
//     path.join(os.homedir(), '.cache', 'puppeteer');

//   const executablePath = path.join(
//     cacheDirectory,
//     'chrome',
//     'win64-114.0.5735.133',
//     'chrome-win64',
//     'chrome.exe'
//   );

//   const browserFetcher = puppeteerCore.createBrowserFetcher({
//     path: cacheDirectory,
//   });

//   console.log('Baixando Chromium...');
//   await browserFetcher.download('114.0.5735.133');

//   console.log('Configurando executável...');
//   await puppeteerCore.launch({
//     executablePath,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   console.log('Chromium e dependências baixados com sucesso!');
// }

// downloadChromium().catch((error) => {
//   console.error('Erro ao baixar o Chromium:', error);
// });

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

    const options = {};
    const stats = await PCR(options);

    const browser = await stats.puppeteer.launch({
        headless: 'new',
        args: ["--no-sandbox"],
        executablePath: stats.executablePath
    }).catch(function(error) {
        console.log(error);
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
