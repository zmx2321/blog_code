// 添加js和cssdom
/* let addJs = (url)=> {
    let newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.src = url; 
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(newScript);
}

let addClss = (url)=> {
    var headHTML = document.getElementsByTagName('head')[0].innerHTML;
    headHTML += `<link type="text/css" rel="stylesheet" href="${url}">`;
    document.getElementsByTagName('head')[0].innerHTML = headHTML;
} */

// test1
let test1 = ()=> {
    return new Promise((resolve, reject) => {
        // 返回写函数里面你要执行的内容
        resolve(
            console.log("test1, 1111")
        );
    })
}

// test2
let test2 = () => {
    setTimeout(function () {
        console.log("test2, 2222");
    }, 2000)
}

// 先执行test1，再执行test2
test1().then(() => {
    test2();
}) 