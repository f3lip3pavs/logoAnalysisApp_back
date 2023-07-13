const PCR = require("puppeteer-chromium-resolver");

function delay(time) {

    return new Promise(r => setTimeout(r, time))

}

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


    const options = {downloadPath: 'C:\\workspace\\api_analisysLogo\\.cache'};
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

    const scrapObj = await getData(10000, page)

    browser.close()

    return scrapObj
}  

module.exports = {
    getParsedBody,
    delay
}