// navigator相关
let navigatorOption = ()=> {
    const ua = navigator.userAgent;
    const isChrome = ua.indexOf('Chrome');

    console.log(isChrome);  // 76
}


(()=> {
    // navigatorOption();  // navigator相关

    // screen相关
    // console.log(screen.width);
    // console.log(screen.height);

    // location相关
    console.log(location.href);  // 获取完整地址
    console.log(location.protocol);  // 获取协议 http还是https
    console.log(location.pathname);  // 域名
    console.log(location.search);  // 查询参数(?后面)
    console.log(location.hash);  // 哈希值，即#后面的东西

    // history
    // history.back();  // 后退
    // history.forward();  // 前进
})();