// import "css-loader!../css/style.css";
import "../css/style.css";
import "../css/title.less";

const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "hello";

document.body.appendChild(divEl);

// 设置背景图片
import "../css/image.css";
const bgDivEl = document.createElement('div');
bgDivEl.className = "image-bg";
document.body.appendChild(bgDivEl);

// 设置img元素的src
import zzhnImage from '../img/zznh.png';
const imgEl = document.createElement('img');
imgEl.src = zzhnImage;
document.body.appendChild(imgEl);

// i元素
import "../font/iconfont.css";  // 引入依赖图
const iEl = document.createElement('i');
iEl.className = "iconfont icon-ashbin";
document.body.appendChild(iEl);