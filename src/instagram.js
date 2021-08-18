import puppeteer from "https://deno.land/x/puppeteer@9.0.0/mod.ts";
/**
 * Instagram
 * 使用する場合はmain.jsでインスタンスを作成し、次の行でbuildを実行して下さい
 * 一回のみで大丈夫です
 */
export class Instagram{
    constructor(){
        this.scene = null;
    }
/**
 * インスタンス作成時にawaitで実行して下さい
 *
 * @param {string} executablePath chrome.exeのパス
 */
    async build(executablePath = 'C:\\Program Files\ (x86)\\Google\\Chrome\\Application\\Chrome.exe'){
        this.browser = await puppeteer.launch({
            executablePath: executablePath,
            headless:false
        });
        this.page = await this.browser.newPage();
        this.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36");
    }
/**
 * ログイン関数
 * ログインしないと常にログインページが表示される為
 * @param {string} user {username:"",password:""}
 */
    async login(user){
        await this.page.goto("https://www.instagram.com/accounts/login/");
    
        await this.page.waitFor('input[name=username]', { visible: true });
        await this.wait(300);
        await this.page.type('input[name=username]', user.username, { delay: 27 });
        
        await this.wait(520);
        await this.page.type('input[name=password]', user.password, { delay: 42 });
        
        await this.wait(700);
        //await this.page.click('#loginForm > div > div:nth-child(3) > button',{ delay: 30 });
        await Promise.all([
          this.page.waitForNavigation(),
          this.page.click('#loginForm > div > div:nth-child(3) > button',{ delay: 30 })
        ]);
    }
    async wait(ms){
        new Promise(resolve => setTimeout(resolve, ms));
    }
/**
 * インスタの投稿からLocationを取得する関数
 * @param {string} url 投稿URL
 * @returns {string} Location名とそのurlのJSON
 */
    async getLocation(url){
        await this.page.goto(url,{waitUntil:'domcontentloaded'});
        const data = await this.page.$eval(".O4GlU", item => {
            return {"name":item.href,"url":item.textContent};
        });
        return data;
    }
}

/// example
/*
const ins = new Instagram();
await ins.build();
await ins.login();
console.log(await ins.getLocation("https://www.instagram.com/p/CSqCH3whMpy/"));
console.log(await ins.getLocation("https://www.instagram.com/p/CSshQbZpNHR/"));
ins.page.close();
*/