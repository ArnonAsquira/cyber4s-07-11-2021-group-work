const puppeteer = require('puppeteer');

const baseUrl = 'http://127.0.0.1:5500/dist/index.html'
let browser;
let page;
let alertMessage;
let entryName;

async function testPhoneNumber(name, number) {
   browser = await puppeteer.launch({headless: false, slowMo: 40});
   page =  await browser.newPage();
   await page.goto(baseUrl);
   page.on('dialog', async dialog => {
    alertMessage = dialog.message();
    await dialog.dismiss();
   });
   await page.click('body > main > nav > ul > li:nth-child(2)');
   await page.type('#contents > form > input.create-entry-name', name);
   await page.type('#contents > form > input.create-entry-number', number);
   await page.click('#contents > form > button');
   await page.waitForTimeout(10000);
   await browser.close();
}

async function checkForNewEntry () {
    browser = await puppeteer.launch({headless: false, slowMo: 100});
    page =  await browser.newPage();
    await page.goto(baseUrl);
    await page.click('body > main > nav > ul > li:nth-child(1)');
    await page.waitForTimeout(2000);
    entryName =  await page.evaluate(() => {
         try {
             const entry = document.querySelector('table').lastElementChild.firstElementChild.textContent;
            return entry;
        } catch (error)  {
            return 'not recieved';
        }
    })
    await browser.close();
}


test('entering an invalid phone number should cause an alert', async () => {
    await testPhoneNumber('jimbob', 'whateva');
    expect(alertMessage).toBe('this is not a valid phone number');
}, 100000) 

test('enterin a valid phone number and name should create a new entry', async () => {
    await testPhoneNumber('ernio the great', '0503422553');
    await checkForNewEntry ();
    expect(entryName).toBe('ernio the great');
}, 100000)