const superagent = require('superagent');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');

let movieURL = [] //存放链接
var movieIdex = 0  //计数
let index=3 //点击次数

getFile('img')
puppData()

// 先使用puppeteer爬取链接
async function puppData() {
    const browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ["--enable-automation"] });
    const page = await browser.newPage();
    await page.goto(`https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=&start=0`);
    await page.setDefaultNavigationTimeout(600000);
    await page.waitFor('.more');
    let timer = setInterval(async function () {//3秒点一次加载更多
        await page.click('.more');
        movieIdex++
        if (movieIdex >= index) {
            clearInterval(timer)
            let a = await page.$$eval('.list-wp>.item', e => {
                let arr = []
                for (var i = 0; i < e.length; i++) {
                    arr.push(e[i].href)
                }
                return arr
            })
            await browser.close(); //爬取链接完成，关闭无头浏览器
            movieURL.push(...a)
            fs.writeFile('b.json', JSON.stringify(movieURL), { flag: 'a', encoding: 'utf-8', mode: '0666' }, function (err) { //保存在b.json
                if (err) throw err;
                fs.readFile('b.json', 'utf8', (err, doc) => {//由于怕中途出错误，所以先把链接保存到b.json，再读取b.json
                    if (err) throw err;
                    let bItem = JSON.parse(doc)
                    bItem.map((item) => {
                        getVideo(item)
                    })
                })
            })
        }
    }, 3000)
}

// 用superagent爬取电影数据
async function getVideo(url) {
    let html = await superagent.get(url);
    let $ = cheerio.load(html.text);
    let protagonist = ''
    $('#info>span').eq('2').find('a').text(function (index, item) {
        return protagonist += item + '|'
    })
   var info = {
        url: getImg($('#mainpic img').attr('src')),  //图片
        name: $('h1').find('span').text(),  //片名
        year: $('h1 .year').text(),  //时间
        grade: $('.rating_num').text(), //评分
        rating_people: $('.rating_people span').text(), //影评数
        director: $('#info>span').eq('0').find('a').text(), //导演
        scriptwriter: $('#info>span').eq('1').find('a').text(), //编剧
        protagonist, //主演
        type: $('#info>span').eq('5').text() + '|' + $('#info>span').eq('6').text(), //类型
        releaseDate: $('#info>span').eq('-5').text(),//上映日期
        min: $('#info>span').eq('-3').text(),//片长
        brief:$('#link-report span').text()//简介
    }
    fs.writeFile('a.json', JSON.stringify(info)+',', { flag: 'a', encoding: 'utf-8', mode: '0666' }, function (err) {
        if (err) throw err;
    })
}

//爬取图片
function getImg(imgUrl) {
    let name = randomString(32) + '.jpg'
    superagent
        .get(imgUrl)
        .end(function (err, sres) {
            if (err) throw err;
            fs.writeFile("./img/" + name, sres.body, "binary", function (err) {
                if (err) throw err;
            })
        })
    return name
}


//创建img文件
function getFile(file) {
    if (!fs.existsSync(file)) {
        fs.mkdirSync(file);
    }
}

//对图片重命名
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}