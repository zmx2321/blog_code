// test1
let test1 = ()=> {
    return new Promise((resolve, reject) => {
        // 返回写函数里面你要执行的内容
        resolve(
            console.log("test1, 1111")
        );
    })
}

// 加载地图事件
let test2 = () => {
    setTimeout(function () {
        console.log("test2, 2222");
    }, 2000)
}

// 先执行test1，再执行test2
test1().then(() => {
    test2();
}) 