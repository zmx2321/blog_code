### flex 属性大全

```html
<div
  flex="main:center cross:center"
  style="width:500px; height: 500px; background: #108423">
  <div style="background: #fff">看看我是不是居中的</div>
</div>
```

### dir：主轴方向

    top：从上到下
    right：从右到左
    bottom：从下到上
    left：从左到右（默认）

### main：主轴对齐方式

    right：从右到左
    left：从左到右（默认）
    justify：两端对齐
    center：居中对齐

### cross：交叉轴对齐方式

    top：从上到下（默认）
    bottom：从上到下
    baseline：基线对齐
    center：居中对齐
    stretch：高度并排铺满

### box：子元素设置

    mean：子元素平分空间
    first：第一个子元素不要多余空间，其他子元素平分多余空间
    last：最后一个子元素不要多余空间，其他子元素平分多余空间
    justify：两端第一个元素不要多余空间，其他子元素平分多余空间

### flex-box 属性说明

取值范围(0-10)，单独设置子元素多余空间的如何分配，设置为 0，则子元素不占用多余的多余空间
多余空间分配 = 当前 flex-box 值/子元素的 flex-box 值相加之和
